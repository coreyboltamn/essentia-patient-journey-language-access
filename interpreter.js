(function () {
  // Interpreter Experience lens: same 7 timeline stages, interpreter-side view
  const stages = [
    { status: "Available", focus: ["Login & availability"], sees: "Signs in, sets availability, languages and specialties; sees coverage demand for the day.", system: "Publishes real-time availability to the routing pool by language, modality and shift.", risk: "Coverage gaps and unstaffed language windows." },
    { status: "Assigned", focus: ["Assignment workflow", "Language & specialty matching"], sees: "Receives the planned assignment with language, specialty, location/modality and visit context.", system: "Matches request to the best-fit interpreter and confirms; backup is identified automatically.", risk: "Wrong-fit assignments and last-minute no-covers." },
    { status: "Dispatching", focus: ["Fast dispatch", "Escalation"], sees: "Gets an on-demand or scheduled alert and accepts or declines within the response window.", system: "Routes to the next qualified interpreter if the response threshold is exceeded.", risk: "Wait-time delays at the front door." },
    { status: "In Session", focus: ["Session controls", "Escalation"], sees: "Joins by video, audio or in person; can mute, request repeat/clarification, transfer or switch modality.", system: "Maintains the connection and supports fallback to a backup interpreter or alternate modality.", risk: "Dropped sessions and communication breakdowns mid-decision." },
    { status: "In Session", focus: ["Continuity", "Workload balance"], sees: "Repeat or follow-on sessions with continuity context across handoffs and units.", system: "Balances workload and prefers continuity where available.", risk: "Fatigue and inconsistent interpretation across a longer stay." },
    { status: "Documenting", focus: ["Interpreter notes", "Handoff context"], sees: "Captures session notes, terminology and handoff context after teach-back and discharge.", system: "Stores notes, completion markers and documentation quality checks.", risk: "Lost context and incomplete documentation." },
    { status: "Complete", focus: ["Quality & performance tools"], sees: "Reviews own metrics, feedback and quality coaching.", system: "Reports response time, connection success, completion and quality scores to supervisors.", risk: "Unmeasured quality and slow improvement cycles." },
  ];

  const overrides = {
    joanna: {
      1: { focus: ["Assignment workflow", "ASL specialty matching"], sees: "Receives an ASL assignment with modality (in person or video) and any communication preferences." },
      3: { focus: ["ASL video session controls", "Escalation"], sees: "Joins by high-quality video or in person; manages sightlines and pacing; can request a team interpreter or backup." },
    },
    tele: {
      1: { focus: ["Assignment workflow", "Telehealth readiness"], sees: "Receives a virtual assignment tied to the Teladoc session with Vietnamese language match." },
      3: { focus: ["Virtual session controls", "Telehealth handoff"], sees: "Joins the Teladoc encounter, with controls to mute, request repeat, or transfer to a backup interpreter." },
    },
  };

  const $ = (id) => document.getElementById(id);
  const setList = (id, items) => { const el = $(id); el.innerHTML = ""; items.forEach((t) => { const li = document.createElement("li"); li.textContent = t; el.appendChild(li); }); };

  function current() {
    const base = stages[sIndex];
    const ov = (overrides[personas[pIndex].id] || {})[sIndex] || {};
    return Object.assign({}, base, ov);
  }

  function renderInterp() {
    const d = current();
    $("interpStatus").textContent = d.status;
    $("interpStep").textContent = "Step " + (sIndex + 1) + ": " + stagesLabel();
    $("interpSees").textContent = d.sees;
    $("interpSystem").textContent = d.system;
    $("interpRisk").textContent = d.risk;
    setList("interpFocus", d.focus);
    renderRail(d);
  }

  function stagesLabel() {
    const t = document.getElementById("stageTitle");
    return t ? t.textContent : "";
  }

  const allCaps = ["Login & availability", "Assignment workflow", "Language & specialty matching", "Fast dispatch", "Session controls", "Escalation", "Continuity", "Interpreter notes", "Quality & performance tools"];
  function renderRail(d) {
    const rail = $("interpRail");
    rail.innerHTML = "";
    allCaps.forEach((c) => {
      const on = d.focus.some((f) => f.toLowerCase().indexOf(c.toLowerCase().split(" ")[0]) === 0 || f.toLowerCase() === c.toLowerCase());
      const chip = document.createElement("span");
      chip.className = "interp-chip" + (on ? " on" : "");
      chip.textContent = c;
      rail.appendChild(chip);
    });
  }

  function setView(v) {
    const interp = v === "interp";
    $("actionView").hidden = interp;
    $("interpView").hidden = !interp;
    $("viewActionBtn").classList.toggle("active", !interp);
    $("viewInterpBtn").classList.toggle("active", interp);
    $("demoTitle").textContent = interp ? "5. Interpreter Experience at This Step" : "5. AMN in Action at This Step";
    if (interp) renderInterp();
  }

  $("viewActionBtn").onclick = () => setView("action");
  $("viewInterpBtn").onclick = () => setView("interp");

  const prevRender = render;
  render = function () {
    prevRender();
    if (!$("interpView").hidden) renderInterp();
  };
  render();
})();
