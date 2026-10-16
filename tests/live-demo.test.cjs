const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");

const source = readFileSync(resolve(__dirname, "../app.js"), "utf8");
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
    setAttribute() {}
    addEventListener(name, handler) { this.handlers[name] = handler; }
    click() { if (!this.disabled) this.handlers.click(); }
    focus() { focused = this; }
    scrollIntoView() {}
  }
  const document = {
    body: new Element(),
    createElement: () => new Element(),
    getElementById(id) {
      if (!elements.has(id)) elements.set(id, new Element());
      return elements.get(id);
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
    state: () => vm.runInContext("({ pIndex, sIndex, auto, liveDemoId })", context),
    run: (code) => vm.runInContext(code, context),
    focused: () => focused,
    tick: () => tick(),
  };
}

test("handoff pauses autoplay, blocks resume, and returns to the same scenario/stage with focus", () => {
  const app = journey();
  app.el("scenarioGrid").children[2].click();
  app.el("nodes").children[3].click();
  app.el("playBtn").click();
  assert.equal(app.state().auto, 1);
  app.el("live-demo-teladoc").click();
  assert.equal(app.state().auto, null);
  assert.equal(app.state().liveDemoId, "teladoc");
  assert.equal(app.el("playBtn").disabled, true);
  assert.match(app.el("liveDemoList").children[0].children[4].textContent, /Switch to your demo application/);
  app.el("playBtn").click();
  assert.equal(app.state().auto, null);
  app.el("live-demo-teladoc").click();
  assert.equal(app.state().pIndex, 2);
  assert.equal(app.state().sIndex, 3);
  assert.equal(app.state().liveDemoId, null);
  assert.equal(app.state().auto, null);
  assert.equal(app.el("playBtn").disabled, false);
  assert.equal(app.focused(), app.el("live-demo-teladoc"));
});

test("all navigation paths clear handoff, including same-stage selection and restart", () => {
  for (const navigate of [
    (app) => app.el("nextBtn").click(),
    (app) => app.el("prevBtn").click(),
    (app) => app.el("nodes").children[1].click(),
    (app) => app.el("scenarioGrid").children[1].click(),
    (app) => app.el("resetBtn").click(),
  ]) {
    const app = journey();
    app.el("nodes").children[1].click();
    app.el("live-demo-in-person").click();
    navigate(app);
    assert.equal(app.state().liveDemoId, null);
    assert.equal(app.state().auto, null);
    assert.equal(app.el("playBtn").disabled, false);
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
  app.el("nodes").children[1].click();
  assert.equal(app.el("liveDemoList").children.length, 2);
  app.el("live-demo-in-person").click();
  assert.equal(app.el("live-demo-jaide").disabled, true);
  app.el("live-demo-in-person").click();
  assert.equal(app.el("live-demo-jaide").disabled, false);
  assert.equal(app.state().sIndex, 1);
});

test("checkpoint markup is stage-wide, outside tab views and hidden presenter notes", () => {
  const html = readFileSync(resolve(__dirname, "../index.html"), "utf8");
  const start = html.indexOf('<section id="liveDemoCheckpoint"');
  const end = html.indexOf("</section>", start);
  assert.ok(start > html.indexOf('id="demoPanel"'));
  assert.ok(end < html.indexOf('class="view-toggle"'));
  assert.doesNotMatch(html.slice(start, end), /presentation-only/);
  assert.match(html.slice(start, end), /does not launch or connect/);
});
