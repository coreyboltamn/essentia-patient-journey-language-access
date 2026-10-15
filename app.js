const scenarios = [
  {
    id: "scheduled",
    title: "Scheduled Outpatient Visit",
    description:
      "Language need captured during scheduling and reinforced through reminders, check-in, and visit documentation.",
    emphasis: "Pre-visit access, scheduled interpreter workflows, and patient notifications.",
  },
  {
    id: "urgent",
    title: "Emergency / Urgent Care",
    description:
      "Patient arrives with immediate clinical needs and limited English proficiency requiring rapid interpreter access.",
    emphasis: "Fast interpreter matching, consent support, discharge comprehension, and follow-up coordination.",
  },
  {
    id: "telehealth",
    title: "Telehealth Encounter",
    description:
      "Virtual visit with three-way communication across clinician, patient mobile device, and interpreter.",
    emphasis: "Connection resiliency, handoff process, and fallback to audio interpretation.",
  },
];

const stages = [
  {
    id: "awareness",
    label: "Awareness & Access to Care",
    color: "blue",
    summary:
      "Patients identify care options and language support channels before they schedule or arrive.",
    touchpoints: ["Website", "Call Center", "Appointment Scheduling", "Patient Portal", "Text/Email Reminders", "Pre-Visit Instructions"],
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
  },
  {
    id: "discharge",
    label: "Discharge & Transition of Care",
    color: "teal",
    summary:
      "Language access extends into instructions, medications, billing, and follow-up planning.",
    touchpoints: ["Discharge Instructions", "Medication Education", "Follow-Up Calls", "Billing", "Portal Messaging"],
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
  },
];

const ecosystem = [
  {
    id: "interpreter-workforce",
    title: "Interpreter Workforce",
    category: "services",
    summary: "In-person, video, and audio interpreting for clinical, complex, and sensitive interactions.",
    stages: ["Arrival & Check-In", "Clinical Encounter", "Treatment/Inpatient Stay", "Discharge"],
    users: ["Registration teams", "Nurses", "Physicians", "Care coordinators"],
    talkingPoints: [
      "Rapid access to medically qualified interpreters",
      "Language and specialty matching",
      "Consistent documentation for interpreted encounters",
    ],
  },
  {
    id: "jaide-translation",
    title: "Jaide Translation",
    category: "services",
    summary: "AI-enabled written translation and routine communication support.",
    stages: ["Pre-Visit", "Clinical Encounter", "Discharge", "Post Visit"],
    users: ["Patient access", "Clinical educators", "Discharge teams"],
    talkingPoints: [
      "Supports forms, consent documents, and instructions",
      "Translation memory and terminology consistency",
      "Human + machine workflow options by turnaround need",
    ],
  },
  {
    id: "patient-line",
    title: "Patient Line",
    category: "services",
    summary: "Language assistance from the first patient call through follow-up interactions.",
    stages: ["Awareness & Access", "Scheduling", "Follow-Up"],
    users: ["Call center reps", "Patient access teams", "Care coordinators"],
    talkingPoints: [
      "Supports referrals, billing, and care coordination",
      "Warm transfer and continuity",
      "Reduced abandonment and clearer communication",
    ],
  },
  {
    id: "equipment-program",
    title: "Equipment Program",
    category: "services",
    summary: "Purpose-built access points across care settings (workstations, carts, tablets, smart TVs).",
    stages: ["Arrival & Check-In", "Clinical Encounter", "Inpatient Stay"],
    users: ["Unit leaders", "Nursing", "IT/Biomed"],
    talkingPoints: [
      "Right device in the right care context",
      "Optimized clinician workflow access",
      "Deployment planning by service line/facility",
    ],
  },
  {
    id: "any-device",
    title: "Any Device, Anywhere",
    category: "tech",
    summary: "Interpreter access across mobile, workstation, smart TVs, and clinical devices.",
    stages: ["All stages"],
    users: ["Clinicians", "Patient access", "Virtual care teams"],
    talkingPoints: [
      "Supports bedside, clinic, and virtual contexts",
      "Improves adoption by meeting teams where they work",
      "Consistent access experience across settings",
    ],
  },
  {
    id: "ehr-integration",
    title: "EHR Integration",
    category: "tech",
    summary: "Interpreter access and data exchange embedded within clinical workflows.",
    stages: ["Check-In", "Clinical Encounter", "Documentation", "Reporting"],
    users: ["Providers", "Nurses", "Informatics", "Compliance teams"],
    talkingPoints: [
      "Launch interpretation from chart context",
      "Capture interpreter details and encounter metadata",
      "Supports HL7/FHIR/API integration patterns",
    ],
  },
  {
    id: "telehealth-integration",
    title: "Telehealth Integration",
    category: "tech",
    summary: "Interpreter access embedded into supported virtual-care encounters.",
    stages: ["Virtual intake", "Virtual encounter", "Post-visit"],
    users: ["Virtual clinicians", "Patients on mobile", "Interpreters"],
    talkingPoints: [
      "Three-way video/audio workflow",
      "Interpreter handoff for continuity",
      "Fallback from video to audio if connection degrades",
    ],
  },
  {
    id: "apis-interoperability",
    title: "APIs & Interoperability",
    category: "tech",
    summary: "Configurable connections with customer and third-party applications.",
    stages: ["Architecture", "Integration", "Administration"],
    users: ["IT integration teams", "Enterprise architects", "Product owners"],
    talkingPoints: [
      "Supports APIs, SDKs, and webhooks",
      "Flexible ecosystem integration approach",
      "Enables future workflow expansion",
    ],
  },
  {
    id: "strategic-partnership",
    title: "Strategic Partnership Solutions",
    category: "strategy",
    summary: "Program strategy, implementation, training, adoption, optimization, and governance.",
    stages: ["Implementation", "Rollout", "Optimization", "Governance"],
    users: ["Executive sponsors", "Operations", "IT", "Clinical leadership"],
    talkingPoints: [
      "Phased rollout by facility/service line",
      "Training and change management support",
      "Continuous performance optimization and governance",
    ],
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
let selectedEco = ecosystem[0].id;

const scenarioGrid = document.getElementById("scenarioGrid");
const timeline = document.getElementById("timeline");
const stageTitle = document.getElementById("stageTitle");
const stageSummary = document.getElementById("stageSummary");
const touchpointsEl = document.getElementById("touchpoints");
const actionsEl = document.getElementById("actions");
const impactEl = document.getElementById("impact");
const agendaList = document.getElementById("agendaList");
const endToEndList = document.getElementById("endToEndList");
const ecosystemGrid = document.getElementById("ecosystemGrid");
const ecoTitle = document.getElementById("ecoTitle");
const ecoSummary = document.getElementById("ecoSummary");
const ecoStages = document.getElementById("ecoStages");
const ecoUsers = document.getElementById("ecoUsers");
const ecoTalkingPoints = document.getElementById("ecoTalkingPoints");
const resetBtn = document.getElementById("resetBtn");

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

function renderEcosystem() {
  ecosystemGrid.innerHTML = "";
  ecosystem.forEach((item) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `ecosystem-card ${item.id === selectedEco ? "active" : ""}`;
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
      <span class="pill ${item.category}">${item.category === "tech" ? "Technology & Connectivity" : item.category === "strategy" ? "Strategic Partnership" : "Services & Access"}</span>
    `;
    card.addEventListener("click", () => {
      selectedEco = item.id;
      renderEcosystem();
      renderEcosystemDetail();
    });
    ecosystemGrid.appendChild(card);
  });
}

function renderEcosystemDetail() {
  const item = ecosystem.find((e) => e.id === selectedEco);
  ecoTitle.textContent = item.title;
  ecoSummary.textContent = item.summary;
  renderList(ecoStages, item.stages);
  renderList(ecoUsers, item.users);
  renderList(ecoTalkingPoints, item.talkingPoints);
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

resetBtn.addEventListener("click", () => {
  selectedScenario = scenarios[0].id;
  selectedStage = stages[0].id;
  selectedEco = ecosystem[0].id;
  renderScenarios();
  renderTimeline();
  renderStageDetail();
  renderEcosystem();
  renderEcosystemDetail();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

renderScenarios();
renderTimeline();
renderStageDetail();
renderEcosystem();
renderEcosystemDetail();
renderAgenda();
renderEndToEnd();
