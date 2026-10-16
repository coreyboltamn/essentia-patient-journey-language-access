const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");

const source = readFileSync(resolve(__dirname, "../app.js"), "utf8");
const html = readFileSync(resolve(__dirname, "../index.html"), "utf8");
const dataContext = vm.createContext({});
vm.runInContext(source.slice(0, source.indexOf("const scenarioGrid ="))
  + "\nthis.data = { personas, stages, solutionCatalog, checkpointsFor, liveDemoCheckpoints };", dataContext);
const { personas, stages, solutionCatalog, checkpointsFor, liveDemoCheckpoints } = dataContext.data;

test("four demo technologies use canonical solution IDs and explicit suggested timings", () => {
  assert.deepEqual(Array.from(liveDemoCheckpoints, ({ id }) => id).sort(),
    ["in-person", "jaide", "teladoc", "vri-opi"]);
  for (const checkpoint of liveDemoCheckpoints) {
    assert.ok(solutionCatalog[checkpoint.id]);
    assert.match(checkpoint.duration, /minutes/);
    for (const key of ["why", "handoff", "returnCue"]) assert.ok(checkpoint[key].length > 40);
    assert.ok(checkpoint.show.length >= 2);
  }
});

test("only relevant stage/scenario checkpoints appear, without repeating later in the journey", () => {
  for (const persona of personas) {
    const expected = [
      persona.id === "joanna" ? [] : ["jaide"],
      ["in-person"],
      ["vri-opi"],
      persona.id === "tele" ? ["teladoc"] : [],
      [], [], [],
    ];
    stages.forEach((stage, index) => {
      const checkpoints = checkpointsFor(stage, persona.id);
      assert.deepEqual(Array.from(checkpoints, ({ id }) => id), expected[index]);
      for (const checkpoint of checkpoints) assert.equal(checkpoint.label, solutionCatalog[checkpoint.id]);
    });
  }
});

test("ASL uses qualified visual support and AI demonstration stays nonclinical", () => {
  const asl = checkpointsFor(stages[2], "joanna")[0];
  assert.match(asl.variant, /VRI.*ASL/);
  assert.match(asl.handoff, /qualified ASL interpreter/);
  assert.match(asl.show.join(" "), /OPI\/audio-only is not an ASL substitute/);
  assert.match(checkpointsFor(stages[1], "joanna")[0].show.join(" "), /qualified in-person ASL/);
  const ai = checkpointsFor(stages[0], "span")[0];
  assert.match(ai.handoff, /nonclinical/);
  assert.match(ai.show.join(" "), /qualified review/);
  assert.match(ai.show.join(" "), /not a replacement.*clinical decisions or consent/);
});

// Minimal DOM/timer harness for the existing dependency-free Node test suite.
function journey() {
  const elements = new Map();
  let focused;
  let focusOptions;
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
    focus(options) { focused = this; focusOptions = options; }
    scrollIntoView() { assert.fail("Journey controls must not scroll the page"); }
  }
  for (const [, id] of html.matchAll(/\bid="([^"]+)"/g)) {
    const element = new Element();
    element.id = id;
  }
  const document = {
    body: new Element(),
    createElement: () => new Element(),
    getElementById(id) {
      return elements.get(id) || null;
    },
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
    state: () => vm.runInContext("({ pIndex, sIndex, auto, liveDemoId, selectedDemoId })", context),
    run: (code) => vm.runInContext(code, context),
    focused: () => focused,
    focusOptions: () => focusOptions,
    tick: () => tick(),
  };
}

test("handoff pauses autoplay, blocks resume, and returns to the same scenario/stage with focus", () => {
  const app = journey();
  app.el("scenarioGrid").children[2].click();
  app.node(3).click();
  app.el("playBtn").click();
  assert.equal(app.state().auto, 1);
  app.el("liveDemoToggle").click();
  assert.equal(app.state().auto, null);
  assert.equal(app.state().liveDemoId, "teladoc");
  assert.equal(app.el("playBtn").disabled, true);
  assert.match(app.el("liveDemoState").textContent, /Switch manually to your own demo application/);
  app.el("playBtn").click();
  assert.equal(app.state().auto, null);
  app.el("liveDemoToggle").click();
  assert.equal(app.state().pIndex, 2);
  assert.equal(app.state().sIndex, 3);
  assert.equal(app.state().liveDemoId, null);
  assert.equal(app.state().auto, null);
  assert.equal(app.el("playBtn").disabled, false);
  assert.equal(app.focused(), app.el("liveDemoToggle"));
  assert.equal(app.focusOptions().preventScroll, true);
});

test("all navigation paths clear handoff, including same-stage selection and restart", () => {
  for (const navigate of [
    (app) => app.el("nextBtn").click(),
    (app) => app.el("prevBtn").click(),
    (app) => app.node(1).click(),
    (app) => app.el("demo-marker-1-in-person").click(),
    (app) => app.el("scenarioGrid").children[1].click(),
    (app) => app.el("resetBtn").click(),
  ]) {
    const app = journey();
    app.node(1).click();
    app.el("liveDemoToggle").click();
    app.el("liveDemoDetails").open = true;
    navigate(app);
    assert.equal(app.state().liveDemoId, null);
    assert.equal(app.state().auto, null);
    assert.equal(app.el("playBtn").disabled, false);
    assert.equal(app.el("liveDemoDetails").open, false);
    assert.equal(app.el("liveDemoState").textContent, "");
  }
});

test("autoplay updates checkpoints and wraps without stale handoff", () => {
  const app = journey();
  app.el("playBtn").click();
  for (let index = 1; index <= 7; index++) {
    app.tick();
    assert.equal(app.state().sIndex, index % 7);
    assert.equal(app.el("liveDemoCheckpoint").hidden, ![0, 1, 2].includes(index % 7));
    assert.equal(app.state().liveDemoId, null);
  }
});

test("multiple checkpoints at one stage disable competing starts until return", () => {
  const app = journey();
  app.run('liveDemoCheckpoints.push({ ...liveDemoCheckpoints[0], stageIndex: 1 })');
  app.node(1).click();
  assert.equal(app.el("liveDemoChoices").children.length, 2);
  assert.equal(app.el("liveDemoChoices").hidden, false);
  app.el("demo-choice-jaide").click();
  assert.equal(app.state().selectedDemoId, "jaide");
  assert.match(app.el("liveDemoHeading").textContent, /Jaide Translation/);
  app.el("liveDemoToggle").click();
  assert.equal(app.state().liveDemoId, "jaide");
  assert.equal(app.el("demo-choice-in-person").disabled, true);
  app.el("demo-choice-in-person").click();
  assert.equal(app.state().selectedDemoId, "jaide");
  app.el("liveDemoToggle").click();
  assert.equal(app.el("demo-choice-in-person").disabled, false);
  app.el("demo-choice-in-person").click();
  assert.equal(app.state().selectedDemoId, "in-person");
  assert.equal(app.state().sIndex, 1);
});

test("checkpoint lives beside the spine and obsolete section, tabs and extensions are absent", () => {
  const start = html.indexOf('<section id="liveDemoCheckpoint"');
  const end = html.indexOf("</section>", start);
  assert.ok(start > html.indexOf('class="panel journey-panel"'));
  assert.ok(end < html.indexOf('id="stagePanel"'));
  assert.doesNotMatch(html.slice(start, end), /presentation-only/);
  assert.doesNotMatch(html.slice(start, end), /Switch manually to your own demo app|does not launch or connect|AI is not a replacement/);
  assert.doesNotMatch(html, /demoPanel|viewActionBtn|viewInterpBtn|actionView|interpView|interpreter\.(js|css)|polish\.(js|css)|5\. AMN in Action/);
  assert.doesNotMatch(source, /renderDemo\(|stage\.demo|liveDemoStageCue|scrollIntoView|scrollTo|scrollBy/);
  assert.match(html, /src="touchpoints.js"/);
});

test("audience-facing checkpoint retains its accessible cue, chips and demo controls", () => {
  const checkpoint = html.slice(html.indexOf('<section id="liveDemoCheckpoint"'));
  const markup = checkpoint.slice(0, checkpoint.indexOf("</section>"));
  assert.match(markup, /aria-labelledby="liveDemoHeading"/);
  assert.match(markup, /<h3 id="liveDemoHeading">Live demo opportunity<\/h3>/);
  assert.match(markup, /id="liveDemoChoices".*role="group" aria-label="Demo technology"/);
  assert.match(markup, /<p id="liveDemoWhy"><\/p>/);
  assert.match(markup, /<button id="liveDemoToggle".*>Pause journey for live demo<\/button>/);
  assert.match(markup, /<summary id="liveDemoSummary">Presenter handoff<\/summary>/);
  assert.match(markup, /id="liveDemoState".*role="status" aria-live="polite"/);
  const app = journey();
  assert.match(app.el("liveDemoHeading").textContent, /Live demo opportunity/);
  assert.equal(app.el("liveDemoWhy").textContent, checkpointsFor(stages[0], personas[0].id)[0].why);
});

test("spine markers follow every stage/persona filter and select local cues without scrolling", () => {
  const app = journey();
  personas.forEach((persona, pIndex) => {
    app.el("scenarioGrid").children[pIndex].click();
    stages.forEach((stage, sIndex) => {
      const markers = app.el("nodes").children[sIndex].children[1].children;
      const expected = checkpointsFor(stage, persona.id);
      assert.deepEqual(markers.map((marker) => marker.dataset.solutionId), Array.from(expected, ({ id }) => id));
      for (const marker of markers) {
        marker.click();
        assert.equal(app.state().pIndex, pIndex);
        assert.equal(app.state().sIndex, sIndex);
        assert.equal(app.state().selectedDemoId, marker.dataset.solutionId);
        assert.equal(app.el("liveDemoCheckpoint").hidden, false);
        assert.equal(app.focused(), app.el(marker.id));
        assert.equal(app.focusOptions().preventScroll, true);
      }
    });
  });
});

test("stages without demos clear the cue and expanded details", () => {
  const app = journey();
  app.el("liveDemoDetails").open = true;
  app.node(5).click();
  assert.equal(app.state().selectedDemoId, null);
  assert.equal(app.el("liveDemoCheckpoint").hidden, true);
  assert.equal(app.el("liveDemoHeading").textContent, "");
  assert.equal(app.el("liveDemoHandoff").textContent, "");
  assert.equal(app.el("liveDemoShow").children.length, 0);
  assert.equal(app.el("liveDemoDetails").open, false);
});

test("presentation mode collapses accessible support controls without interrupting a demo", () => {
  const app = journey();
  app.el("liveDemoToggle").click();
  app.el("presentationMode").checked = true;
  app.el("presentationMode").handlers.change();
  assert.equal(app.el("scenarioPicker").open, false);
  assert.equal(app.el("touchpointDetails").open, false);
  assert.equal(app.state().liveDemoId, "jaide");
  assert.match(app.el("scenarioName").textContent, /Maria/);
  app.el("presentationMode").checked = false;
  app.el("presentationMode").handlers.change();
  assert.equal(app.el("scenarioPicker").open, true);
  assert.equal(app.el("touchpointDetails").open, true);
});
