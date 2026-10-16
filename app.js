const scenarios = [
  {
    id: "scheduled",
    title: "Scheduled Outpatient Visit (Maria)",
    description:
      "Maria's language need is captured during scheduling and reinforced through reminders, check-in, and visit documentation.",
    emphasis:
      "Pre-visit access, scheduled interpreter workflows, and patient notifications.",
  },
  {
    id: "urgent",
    title: "Emergency / Urgent Care (Abdi)",
    description:
      "Abdi arrives with urgent clinical needs and limited English proficiency requiring rapid interpreter access.",
    emphasis:
      "Fast interpreter matching, consent support, discharge comprehension, and follow-up coordination.",
  },
  {
    id: "telehealth",
    title: "Telehealth Encounter",
    description:
      "Virtual visit with three-way communication across clinician, patient mobile device, and interpreter.",
    emphasis:
      "Connection resiliency, handoff process, and fallback to audio interpretation.",
  },
];

const lenses = [
  { id: "patient", label: "Patient Lens" },
  { id: "clinician", label: "Clinician Lens" },
  { id: "interpreter", label: "Interpreter Lens" },
  { id: "admin", label: "Admin Lens" },
];

const stages = [
  {
    id: "awareness",
    label: "Awareness & Access to Care",
    color: "blue",
    summary:
      "Patients identify care options and language support channels before they schedule or arrive.",
    touchpoints: [
      "Website",
      "Call Center",
      "Appointment Scheduling",
      "Patient Portal",
      "Text/Email Reminders",
      "Pre-Visit Instructions",
    ],
    actions: [
      "Offer language preference capture in digital and phone intake",
      "Trigger interpreter requests during scheduling",
      "Provide translated reminders and pre-visit instructions",
    ],
    impact: [
      "Reduces confusion before first visit",
      "Improves show rates and preparedness",
      "Builds trust early in the patient journey",
    ],
    lensContent: {
      patient: [
        "I can request language support while booking.",
        "I receive reminders I can understand.",
      ],
      clinician: [
        "Language needs are visible before the encounter.",
        "Interpreter can be scheduled in advance.",
      ],
      interpreter: [
        "Requests include context and appointment timing.",
        "Matching can occur ahead of visit day.",
      ],
      admin: [
        "Track pre-visit language request completion.",
        "Measure no-show reduction by language support.",
      ],
    },
    decision: {
      prompt:
        "Maria requests Spanish support while scheduling. What should happen next?",
      options: [
        "A) Note language in free text only",
        "B) Capture preferred language + schedule interpreter + send translated reminders",
        "C) Ask family member to interpret at visit",
      ],
      recommended:
        "Recommended: B — structured language capture plus scheduled support and accessible reminders.",
    },
  },
  {
    id: "checkin",
    label: "Arrival & Check-In",
    color: "purple",
    summary:
      "Front desk and triage teams activate language access immediately when the patient arrives.",
    touchpoints: ["Front Desk/Registration", "Kiosk Check-In", "Nurse Triage"],
    actions: [
      "Launch interpreter from EHR/clinical workstation",
      "Verify patient communication needs and consent support",
      "Document interpreter details in encounter record",
    ],
    impact: [
      "Faster intake and triage",
      "Lower risk of miscommunication",
      "Consistent documentation and compliance",
    ],
    lensContent: {
      patient: [
        "I don’t have to repeat my language needs.",
        "I can understand registration and triage questions.",
      ],
      clinician: [
        "One-click interpreter launch from workflow.",
        "Triage can proceed without communication delays.",
      ],
      interpreter: [
        "Session starts with proper patient context.",
        "Can escalate modality based on clinical need.",
      ],
      admin: [
        "Monitor wait times and abandoned requests.",
        "Audit interpreter usage at registration/triage.",
      ],
    },
    decision: {
      prompt:
        "Abdi arrives in urgent care and triage needs immediate communication support. Best response?",
      options: [
        "A) Delay triage until in-person interpreter arrives",
        "B) Start VRI/audio immediately, escalate as needed",
        "C) Proceed with limited communication",
      ],
      recommended:
        "Recommended: B — immediate modality activation protects safety and throughput.",
    },
  },
  {
    id: "clinical",
    label: "Clinical Encounter",
    color: "purple",
    summary:
      "Clinical teams use video, audio, or in-person services based on acuity, setting, and patient preference.",
    touchpoints: ["Physician Consult", "Medication Administration", "Care Planning"],
    actions: [
      "Match interpreter language + specialty",
      "Support dynamic modality switching during encounter",
      "Capture interpreted consent and care-plan understanding",
    ],
    impact: [
      "Safer clinical decisions",
      "Higher patient comprehension",
      "Improved care team confidence",
    ],
    lensContent: {
      patient: [
        "I understand diagnosis and options clearly.",
        "I can ask questions in my preferred language.",
      ],
      clinician: [
        "Accurate history and informed consent conversation.",
        "Care planning is clearer and more efficient.",
      ],
      interpreter: [
        "Specialty-aligned assignments improve communication quality.",
        "Documented handoffs support continuity.",
      ],
      admin: [
        "Quality metrics tied to encounter outcomes.",
        "Compliance support for interpreted consent.",
      ],
    },
    decision: {
      prompt:
        "During a complex consent discussion, video quality drops. What should the team do?",
      options: [
        "A) Continue without interpreter",
        "B) Pause care indefinitely",
        "C) Switch to audio immediately and continue with documented fallback",
      ],
      recommended:
        "Recommended: C — preserve communication continuity using fallback workflow.",
    },
  },
  {
    id: "discharge",
    label: "Discharge & Transition of Care",
    color: "teal",
    summary:
      "Language access extends into instructions, medications, billing, and follow-up planning.",
    touchpoints: [
      "Discharge Instructions",
      "Medication Education",
      "Follow-Up Calls",
      "Billing",
      "Portal Messaging",
    ],
    actions: [
      "Translate discharge and medication materials",
      "Use interpreter-assisted follow-up scheduling",
      "Route post-visit questions through patient line/contact center",
    ],
    impact: [
      "Reduced return visits from misunderstanding",
      "Improved adherence",
      "Stronger continuity of care",
    ],
    lensContent: {
      patient: [
        "I leave with instructions I can understand.",
        "I know who to call and when to follow up.",
      ],
      clinician: [
        "Teach-back confirms patient understanding.",
        "Discharge risk is reduced through clearer communication.",
      ],
      interpreter: [
        "Supports high-risk discharge counseling.",
        "Ensures key medication/follow-up details are clear.",
      ],
      admin: [
        "Track readmission/no-show trends by language support.",
        "Demonstrate ROI and quality impact.",
      ],
    },
    decision: {
      prompt:
        "At discharge, the patient appears to nod but is unsure about medication timing. Best next step?",
      options: [
        "A) Proceed and rely on printed English instructions",
        "B) Re-engage interpreter, provide translated instructions, complete teach-back",
        "C) Ask family to explain later",
      ],
      recommended:
        "Recommended: B — ensure comprehension before discharge completion.",
    },
  },
];

const agenda = [
  "Healthcare Language Access Overview",
  "Solution Architecture and Integration Overview",
  "Patient Access and Scheduling Experience",
  "Point-of-Care Clinical Workflow",
  "Interpreter Experience",
  "Telehealth and Remote Care Workflow",
  "Contact Center and Non-Clinical Workflow",
  "Written Translation Capabilities",
  "End-to-End Scenario: Emergency or Urgent Care Visit",
  "Reporting, Analytics, and Administration",
  "Implementation and Support Model",
];

const endToEnd = [
  "Patient arrival and language preference verification",
  "Registration and triage with immediate interpreter support",
  "Clinical encounter with modality selection (video/audio/in-person)",
  "Consent and diagnostics communication support",
  "Discharge instructions and medication education in preferred language",
  "Follow-up scheduling and documented language services",
];

let selectedScenario = scenarios[0].id;
let selectedStage = stages[0].id;
let selectedLens = lenses[0].id;
let presenterTimer = null;
let seconds = 0;

const scenarioGrid = document.getElementById("scenarioGrid");
const timeline = document.getElementById("timeline");
const stageTitle = document.getElementById("stageTitle");
const stageSummary = document.getElementById("stageSummary");
const touchpointsEl = document.getElementById("touchpoints");
const actionsEl = document.getElementById("actions");
const impactEl = document.getElementById("impact");
const agendaList = document.getElementById("agendaList");
const endToEndList = document.getElementById("endToEndList");
const resetBtn = document.getElementById("resetBtn");

const lensMount = document.createElement("section");
lensMount.className = "panel";
lensMount.innerHTML = `
  <h2>Role Lens + Decision Moment</h2>
  <div id="lensButtons" style="display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:.75rem;"></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;">
    <article style="border:1px solid #d7e3ef;border-radius:10px;padding:.7rem;background:#fcfeff;">
      <h3 style="margin-top:0;">What this looks like in this lens</h3>
      <ul id="lensPoints"></ul>
    </article>
    <article style="border:1px solid #d7e3ef;border-radius:10px;padding:.7rem;background:#fcfeff;">
      <h3 style="margin-top:0;">What would you do?</h3>
      <p id="decisionPrompt" style="margin:.3rem 0 .5rem;"></p>
      <ul id="decisionOptions"></ul>
      <p id="decisionRecommended" style="margin-top:.6rem;font-weight:600;color:#4a2d86;"></p>
    </article>
  </div>
`;
document.querySelector(".stage-panel").after(lensMount);

const presenterMount = document.createElement("section");
presenterMount.className = "panel";
presenterMount.innerHTML = `
  <h2>Presenter Mode</h2>
  <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center;margin-bottom:.75rem;">
    <button id="startTimer" class="ghost-btn" type="button">Start Timer</button>
    <button id="pauseTimer" class="ghost-btn" type="button">Pause Timer</button>
    <button id="resetTimer" class="ghost-btn" type="button">Reset Timer</button>
    <strong id="timerReadout">00:00</strong>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;">
    <article style="border:1px solid #d7e3ef;border-radius:10px;padding:.7rem;background:#fcfeff;">
      <h3 style="margin-top:0;">Speaker Notes</h3>
      <textarea id="speakerNotes" rows="7" style="width:100%;padding:.5rem;border:1px solid #d7e3ef;border-radius:8px;" placeholder="Add your demo talking points here..."></textarea>
    </article>
    <article style="border:1px solid #d7e3ef;border-radius:10px;padding:.7rem;background:#fcfeff;">
      <h3 style="margin-top:0;">Parking Lot</h3>
      <textarea id="parkingLot" rows="7" style="width:100%;padding:.5rem;border:1px solid #d7e3ef;border-radius:8px;" placeholder="Capture client questions and follow-ups..."></textarea>
    </article>
  </div>
`;
document.querySelector(".agenda-panel").before(presenterMount);

function renderScenarios() {
  scenarioGrid.innerHTML = "";
  scenarios.forEach((s) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `scenario-card ${s.id === selectedScenario ? "active" : ""}`;
    card.innerHTML = `<h3>${s.title}</h3><p>${s.description}</p>`;
    card.addEventListener("click", () => {
      selectedScenario = s.id;
      renderScenarios();
      renderStageDetail();
    });
    scenarioGrid.appendChild(card);
  });
}

function renderTimeline() {
  timeline.innerHTML = "";
  stages.forEach((s) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `stage-btn ${s.color} ${s.id === selectedStage ? "active" : ""}`;
    btn.textContent = s.label;
    btn.addEventListener("click", () => {
      selectedStage = s.id;
      renderTimeline();
      renderStageDetail();
      renderLens();
    });
    timeline.appendChild(btn);
  });
}

function renderList(el, values) {
  el.innerHTML = "";
  values.forEach((v) => {
    const li = document.createElement("li");
    li.textContent = v;
    el.appendChild(li);
  });
}

function renderStageDetail() {
  const stage = stages.find((s) => s.id === selectedStage);
  const scenario = scenarios.find((s) => s.id === selectedScenario);
  stageTitle.textContent = `${stage.label} — ${scenario.title}`;
  stageSummary.textContent = `${stage.summary} Scenario focus: ${scenario.emphasis}`;
  renderList(touchpointsEl, stage.touchpoints);
  renderList(actionsEl, stage.actions);
  renderList(impactEl, stage.impact);
}

function renderLensButtons() {
  const mount = document.getElementById("lensButtons");
  mount.innerHTML = "";
  lenses.forEach((l) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "ghost-btn";
    b.style.fontWeight = l.id === selectedLens ? "700" : "500";
    b.textContent = l.label;
    b.addEventListener("click", () => {
      selectedLens = l.id;
      renderLens();
    });
    mount.appendChild(b);
  });
}

function renderLens() {
  const stage = stages.find((s) => s.id === selectedStage);
  renderLensButtons();
  renderList(document.getElementById("lensPoints"), stage.lensContent[selectedLens]);
  document.getElementById("decisionPrompt").textContent = stage.decision.prompt;
  renderList(document.getElementById("decisionOptions"), stage.decision.options);
  document.getElementById("decisionRecommended").textContent = stage.decision.recommended;
}

function renderAgenda() {
  agendaList.innerHTML = "";
  agenda.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "agenda-item";
    div.innerHTML = `<strong>${index + 1}. ${item}</strong>`;
    agendaList.appendChild(div);
  });
}

function renderEndToEnd() {
  endToEndList.innerHTML = "";
  endToEnd.forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step;
    endToEndList.appendChild(li);
  });
}

function formatTime(total) {
  const m = String(Math.floor(total / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function bindPresenterTimer() {
  const readout = document.getElementById("timerReadout");
  document.getElementById("startTimer").addEventListener("click", () => {
    if (presenterTimer) return;
    presenterTimer = setInterval(() => {
      seconds += 1;
      readout.textContent = formatTime(seconds);
    }, 1000);
  });
  document.getElementById("pauseTimer").addEventListener("click", () => {
    clearInterval(presenterTimer);
    presenterTimer = null;
  });
  document.getElementById("resetTimer").addEventListener("click", () => {
    clearInterval(presenterTimer);
    presenterTimer = null;
    seconds = 0;
    readout.textContent = "00:00";
  });
}

resetBtn.addEventListener("click", () => {
  selectedScenario = scenarios[0].id;
  selectedStage = stages[0].id;
  selectedLens = lenses[0].id;
  renderScenarios();
  renderTimeline();
  renderStageDetail();
  renderLens();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

renderScenarios();
renderTimeline();
renderStageDetail();
renderLens();
renderAgenda();
renderEndToEnd();
bindPresenterTimer();