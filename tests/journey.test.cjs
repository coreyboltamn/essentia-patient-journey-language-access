const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");

const source = readFileSync(resolve(__dirname, "../app.js"), "utf8");
const html = readFileSync(resolve(__dirname, "../index.html"), "utf8");
const css = readFileSync(resolve(__dirname, "../styles.css"), "utf8");
const dataContext = vm.createContext({});
vm.runInContext(source.slice(0, source.indexOf("const scenarioGrid ="))
  + "\nthis.data = { personas, stages, connectionsFor };", dataContext);
const { personas, stages, connectionsFor } = dataContext.data;

// Minimal DOM/timer harness for the existing dependency-free Node test suite.
function journey() {
  const elements = new Map();
  let tick;
  class Element {
    constructor() {
      this.children = [];
      this.handlers = {};
      this.classList = { toggle() {} };
      this.style = { setProperty() {} };
      this.dataset = {};
    }
    set innerHTML(value) { this.children = []; }
    set id(value) { this.key = value; elements.set(value, this); }
    get id() { return this.key; }
    appendChild(child) { this.children.push(child); }
    setAttribute(name, value) { this[name] = value; }
    addEventListener(name, handler) { this.handlers[name] = handler; }
    click() { if (!this.disabled) this.handlers.click(); }
    scrollIntoView() { assert.fail("Journey controls must not scroll the page"); }
  }
  for (const [, id] of html.matchAll(/\bid="([^"]+)"/g)) {
    const element = new Element();
    element.id = id;
  }
  const document = {
    body: new Element(),
    createElement: () => new Element(),
    getElementById(id) { return elements.get(id) || null; },
  };
  const context = vm.createContext({
    document,
    setInterval(callback) { tick = callback; return 1; },
    clearInterval() { tick = null; },
  });
  vm.runInContext(source, context);
  return {
    el: (id) => document.getElementById(id),
    node: (index) => document.getElementById("nodes").children[index].children[0],
    state: () => vm.runInContext("({ pIndex, sIndex, auto })", context),
    tick: () => tick(),
  };
}

test("live-demo callout, markers, styles, data and handlers are removed", () => {
  assert.doesNotMatch(html, /liveDemo|live-demo|demo-marker|Presenter handoff|Pause journey for live demo/);
  assert.doesNotMatch(source, /liveDemo|LiveDemo|selectedDemoId|checkpointsFor|renderDemoMarkers|node-demos/);
  assert.doesNotMatch(css, /live-demo|demo-controls|demo-choices|demo-marker|demo-chip|node-demos/);
  assert.match(html, /src="touchpoints.js"/);
  const app = journey();
  assert.equal(app.el("liveDemoCheckpoint"), null);
  assert.equal(app.el("nodes").children.length, stages.length);
  for (const stop of app.el("nodes").children) assert.equal(stop.children.length, 1);
});

test("every scenario and timeline stage renders details and AMN mappings without the callout", () => {
  const app = journey();
  personas.forEach((persona, pIndex) => {
    app.el("scenarioGrid").children[pIndex].click();
    assert.equal(app.state().sIndex, 0);
    assert.match(app.el("scenarioName").textContent, new RegExp(persona.name));
    stages.forEach((stage, sIndex) => {
      app.node(sIndex).click();
      assert.equal(app.state().pIndex, pIndex);
      assert.equal(app.state().sIndex, sIndex);
      assert.equal(app.el("stageTitle").textContent, stage.title);
      assert.equal(app.el("patientMoment").textContent, stage.patient[persona.id]);
      assert.deepEqual(
        app.el("connectionGrid").children.map((card) => card.dataset.solutionId),
        Array.from(connectionsFor(stage, persona.id), ({ id }) => id),
      );
      assert.equal(app.node(sIndex)["aria-current"], "step");
      assert.equal(app.el("prevBtn").disabled, sIndex === 0);
      assert.equal(app.el("nextBtn").disabled, sIndex === stages.length - 1);
      assert.equal(app.state().auto, null);
    });
  });
});

test("Back, Next, scenario selection, timeline selection and restart stop autoplay", () => {
  for (const [navigate, expectedStage, expectedPersona] of [
    [(app) => app.el("nextBtn").click(), 2, 2],
    [(app) => app.el("prevBtn").click(), 0, 2],
    [(app) => app.node(4).click(), 4, 2],
    [(app) => app.el("scenarioGrid").children[1].click(), 0, 1],
    [(app) => app.el("resetBtn").click(), 0, 0],
  ]) {
    const app = journey();
    app.el("scenarioGrid").children[2].click();
    app.node(1).click();
    app.el("playBtn").click();
    assert.equal(app.state().auto, 1);
    navigate(app);
    assert.equal(app.state().sIndex, expectedStage);
    assert.equal(app.state().pIndex, expectedPersona);
    assert.equal(app.state().auto, null);
    assert.equal(app.el("playBtn").textContent, "▶ Auto-play");
  }
});

test("autoplay advances, wraps and pauses without demo state", () => {
  const app = journey();
  app.el("playBtn").click();
  for (let index = 1; index <= stages.length; index++) {
    app.tick();
    assert.equal(app.state().sIndex, index % stages.length);
    assert.equal(app.el("stageTitle").textContent, stages[index % stages.length].title);
  }
  app.el("playBtn").click();
  assert.equal(app.state().auto, null);
  assert.equal(app.el("playBtn").textContent, "▶ Auto-play");
});

test("stakeholder selection updates details and restart restores the default", () => {
  const app = journey();
  for (const [index, key] of ["it", "clinical", "ops", "exec"].entries()) {
    app.el("stakeholderStrip").children[index].click();
    assert.equal(app.el("stakeholderDetail").textContent, stages[0].stakeholder[key]);
  }
  app.el("resetBtn").click();
  assert.equal(app.el("stakeholderDetail").textContent, stages[0].stakeholder.it);
});

test("presentation mode still collapses and restores support controls without changing the journey", () => {
  const app = journey();
  app.el("scenarioGrid").children[1].click();
  app.node(3).click();
  for (const checked of [true, false]) {
    app.el("presentationMode").checked = checked;
    app.el("presentationMode").handlers.change();
    assert.equal(app.el("scenarioPicker").open, !checked);
    assert.equal(app.el("touchpointDetails").open, !checked);
    assert.equal(app.state().pIndex, 1);
    assert.equal(app.state().sIndex, 3);
  }
});
