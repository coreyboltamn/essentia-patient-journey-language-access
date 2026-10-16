const personas = [
  {
    id: "span",
    name: "Maria",
    age: 62,
    language: "Spanish",
    situation: "Managing diabetes and hypertension",
    style: "linear-gradient(135deg,#4fa3dc,#7dc8f3)",
    opening: "\"I understand my care better when information is in Spanish and someone can answer questions in real time.\"",
  },
  {
    id: "som",
    name: "Abdi",
    age: 29,
    language: "Somali",
    situation: "First pregnancy with recurring prenatal visits",
    style: "linear-gradient(135deg,#5bbf88,#87dca9)",
    opening: "\"I want to feel calm and informed at each prenatal step, especially when decisions are made quickly.\"",
  },
  {
    id: "tele",
    name: "Tran",
    age: 41,
    language: "Vietnamese",
    situation: "Post-op follow-up via telehealth",
    style: "linear-gradient(135deg,#5c6fd6,#8a9af2)",
    opening: "\"Virtual visits are easier for me, but only if language support is immediate and clear.\"",
  },
  {
    id: "joanna",
    name: "Joanna",
    age: 33,
    language: "ASL",
    situation: "Emergency department visit requiring immediate communication",
    style: "linear-gradient(135deg,#7b5ad5,#a082f0)",
    opening: "\"In urgent moments, I need communication that is direct, visual, and immediate.\"",
  },
];

const stages = [
  {
    phase: "Pre-Visit",
    title: "1. Awareness & Access to Care",
    icon: "🌐",
    patient: {
      span: "Maria finds Essentia online and needs Spanish language support to understand services and decide where to start care.",
      som: "Abdi learns about maternity services through community outreach and calls in Somali to ask what to expect.",
      tele: "Tran receives discharge guidance and is offered telehealth follow-up options in Vietnamese.",
      joanna: "Joanna seeks urgent care and needs clear ASL access information before arrival.",
    },
    behind: [
      "Patient discovers care options and contact channels.",
      "Essentia receives inquiries through digital and phone channels.",
      "Language preference is captured early to shape next steps.",
    ],
    who: ["Patient / family", "Front-end access staff", "Call center", "Digital team"],
    outcomes: [
      "Patient feels welcomed at first touchpoint.",
      "Care entry starts with fewer delays and less confusion.",
      "Essentia captures demand signals by language and modality.",
    ],
    connections: {
      span: ["Patient Line", "Jaide Website Translation", "Contact center interpreter access"],
      som: ["Patient Line", "Bilingual outreach scripting", "Appointment language capture"],
      tele: ["Discharge follow-up routing", "Telehealth language preference capture", "Patient Line"],
      joanna: ["ASL access triage", "Video relay intake option", "Urgent access routing"],
    },
    stakeholder: {
      it: "Ensure entry points are integrated so language preference data moves downstream.",
      clinical: "Set clear intake prompts to avoid missed language needs.",
      ops: "Align staffing and routing to demand by language.",
      exec: "First-touch experience influences trust, retention, and equity outcomes.",
    },
    impact: "Early language alignment improves access and reduces abandonment before care begins.",
    demo: {
      owner: "AMN",
      focus: "Patient Line + intake language capture",
      time: "45 seconds",
      cue: "Show how language needs are identified at first contact.",
      return: "Return to timeline and advance to appointment.",
      badge: "Front Door",
      headline: "Language access begins before the first appointment.",
      seeTitle: "What to show",
      see: [
        "How inbound requests trigger interpreter-ready pathways.",
        "How preferred language is captured and retained.",
        "How ASL or rare language needs can be escalated.",
      ],
      why: "Getting this right at intake reduces friction for both patients and staff throughout the journey.",
    },
  },
  {
    phase: "Pre-Visit",
    title: "2. Appointment Confirmation & Pre-Visit",
    icon: "🗓️",
    patient: {
      span: "Maria schedules a visit and receives prep instructions in Spanish so she can arrive ready.",
      som: "Abdi gets reminders and prenatal prep guidance, with Somali support for questions.",
      tele: "Tran confirms his telehealth appointment and receives bilingual technical instructions.",
      joanna: "Joanna’s appointment flag indicates ASL support is required at check-in.",
    },
    behind: [
      "Appointments are created with language and modality needs attached.",
      "Reminders and prep instructions are sent through preferred channels.",
      "Interpreter demand is forecasted ahead of the visit.",
    ],
    who: ["Scheduling", "Patient access", "Interpreter operations", "Patient"],
    outcomes: [
      "Patient arrives informed and prepared.",
      "Interpreter resources are better aligned to expected demand.",
      "Reduced no-shows and day-of surprises.",
    ],
    connections: {
      span: ["Scheduling language flags", "Pre-visit translated content", "Reminder workflows"],
      som: ["Outbound interpreter support", "Prenatal education language support", "SMS/voice reminders"],
      tele: ["Telehealth workflow alignment", "Bilingual setup instructions", "Interpreter pre-assignment"],
      joanna: ["ASL scheduling flags", "Visual communication prep", "Visit readiness notes"],
    },
    stakeholder: {
      it: "Support reliable data flow from scheduling to interpreter workflows.",
      clinical: "Confirm pre-visit education is understood.",
      ops: "Reduce avoidable delays through better prep and matching.",
      exec: "Prepared visits improve quality metrics and efficiency.",
    },
    impact: "Preparation with language support improves readiness and operational predictability.",
    demo: {
      owner: "Essentia + AMN",
      focus: "Pre-visit communication and interpreter planning",
      time: "40 seconds",
      cue: "Show reminder + prep flow and language-specific routing.",
      return: "Advance to arrival/check-in stage.",
      badge: "Readiness",
      headline: "Pre-visit coordination reduces day-of delays.",
      seeTitle: "What to show",
      see: [
        "Appointment records carrying language requirements.",
        "How reminders and prep instructions are delivered.",
        "How ASL and specialty needs are queued.",
      ],
      why: "When prep is clear, encounters start faster and with less stress.",
    },
  },
  {
    phase: "During Visit",
    title: "3. Arrival & Check-In",
    icon: "🏥",
    patient: {
      span: "Maria checks in and confirms she will have Spanish interpretation before triage begins.",
      som: "Abdi arrives for prenatal care and confirms Somali support at registration.",
      tele: "Tran arrives for any needed in-person follow-up and needs quick Vietnamese support.",
      joanna: "Joanna needs immediate ASL-enabled communication during intake.",
    },
    behind: [
      "Registration verifies identity, visit purpose, and communication preferences.",
      "Interpreter request is initiated based on language and urgency.",
      "Staff prepare the encounter to avoid delays in care start.",
    ],
    who: ["Front desk", "Nursing intake", "Interpreter operations", "Patient"],
    outcomes: [
      "Patient starts encounter with clear communication.",
      "Staff avoid ad hoc workarounds.",
      "Check-in throughput improves.",
    ],
    connections: {
      span: ["Front-desk quick request tools", "On-demand interpreter dispatch", "Patient identity + language verification"],
      som: ["Rapid request escalation", "Maternity workflow alignment", "Interpreter connection status"],
      tele: ["Hybrid visit support", "Cross-channel interpreter continuity", "Queue visibility"],
      joanna: ["ASL rapid connect", "Video device readiness", "Escalation path"],
    },
    stakeholder: {
      it: "Maintain reliable endpoint and connectivity performance.",
      clinical: "Start clinical intake with communication confidence.",
      ops: "Protect check-in throughput and avoid bottlenecks.",
      exec: "Fast, equitable intake improves experience and reduces risk.",
    },
    impact: "Reliable language support at arrival prevents downstream delays.",
    demo: {
      owner: "AMN",
      focus: "Rapid interpreter request + connection",
      time: "35 seconds",
      cue: "Show how staff request and connect interpreter from intake.",
      return: "Advance to clinical encounter.",
      badge: "Activation",
      headline: "Interpreter activation happens in operational real time.",
      seeTitle: "What to show",
      see: [
        "One-touch request from check-in workflow.",
        "Connection status and fallback options.",
        "ASL/video readiness checks.",
      ],
      why: "Fast activation reduces time-to-care and staff burden.",
    },
  },
  {
    phase: "During Visit",
    title: "4. Clinical Encounter",
    icon: "🩺",
    patient: {
      span: "Maria discusses symptoms, treatment options, and medication changes in Spanish with confidence.",
      som: "Abdi reviews prenatal concerns and asks culturally sensitive questions in Somali.",
      tele: "Tran completes telehealth follow-up with Vietnamese interpretation during provider discussion.",
      joanna: "Joanna communicates directly with clinicians through ASL interpretation during urgent decision-making.",
    },
    behind: [
      "Interpreter joins the clinical conversation in the chosen modality.",
      "Clinical team completes assessment and care planning.",
      "Clarifications are handled in real time to preserve safety.",
    ],
    who: ["Provider", "Nurse", "Interpreter", "Patient"],
    outcomes: [
      "Patient comprehension and trust increase.",
      "Clinical decisions are made with fewer communication gaps.",
      "Care plans are more accurately understood.",
    ],
    connections: {
      span: ["VRI/OPI session controls", "Clinical workflow interoperability", "On-demand escalation"],
      som: ["Specialty interpreter matching", "Complex counseling support", "Shared decision support"],
      tele: ["Teladoc encounter support", "Virtual interpreter controls", "Visit continuity"],
      joanna: ["ASL encounter excellence", "High-clarity video workflow", "Critical communication support"],
    },
    stakeholder: {
      it: "Ensure stable, secure session performance across endpoints.",
      clinical: "Maintain quality of communication during diagnostic and treatment decisions.",
      ops: "Provide consistent support across modalities and departments.",
      exec: "This is where communication quality most directly impacts outcomes.",
    },
    impact: "High-quality interpreted encounters support safer, better-informed care decisions.",
    demo: {
      owner: "AMN + Clinical team",
      focus: "Live interpreted encounter controls",
      time: "50 seconds",
      cue: "Show active session controls and backup path.",
      return: "Advance to treatment/inpatient stage.",
      badge: "Clinical Core",
      headline: "Interpretation is part of care delivery, not an add-on.",
      seeTitle: "What to show",
      see: [
        "In-session controls for providers and interpreters.",
        "How modality can shift if clinical context changes.",
        "How backup escalation protects continuity.",
      ],
      why: "Clear communication here protects both quality and safety.",
    },
  },
  {
    phase: "During Visit",
    title: "5. Treatment / Inpatient Stay",
    icon: "💊",
    patient: {
      span: "Maria receives inpatient updates and medication education in Spanish over multiple touchpoints.",
      som: "Abdi receives treatment and monitoring updates in Somali through different care teams.",
      tele: "Tran has medication and recovery coaching that may alternate between in-person and virtual support.",
      joanna: "Joanna requires continued ASL communication support as care transitions across units.",
    },
    behind: [
      "Care teams hand off information through shifts and units.",
      "Interpreter support is reused across repeated interactions.",
      "Education and consent moments are reinforced over time.",
    ],
    who: ["Inpatient clinicians", "Interpreter services", "Care coordinators", "Patient/family"],
    outcomes: [
      "Reduced miscommunication during transitions.",
      "Improved adherence to treatment plans.",
      "Better patient confidence across longer stays.",
    ],
    connections: {
      span: ["Continuity workflows", "Medication education support", "Interpreter reuse context"],
      som: ["Shift-to-shift communication support", "Family-inclusive counseling", "High-demand language balancing"],
      tele: ["Hybrid continuity", "Cross-modality tracking", "Recovery coaching support"],
      joanna: ["ASL continuity", "Unit-to-unit handoff support", "Escalation safeguards"],
    },
    stakeholder: {
      it: "Keep interoperability and endpoint reliability consistent across care settings.",
      clinical: "Protect communication consistency through complex care episodes.",
      ops: "Balance interpreter utilization while preserving continuity.",
      exec: "Continuity in communication influences quality, satisfaction, and throughput.",
    },
    impact: "Sustained language support improves continuity and treatment adherence.",
    demo: {
      owner: "Essentia + AMN",
      focus: "Continuity and handoff support",
      time: "35 seconds",
      cue: "Show repeated-session continuity and context carry-forward.",
      return: "Advance to discharge and transition.",
      badge: "Continuity",
      headline: "Communication continuity matters most over longer care episodes.",
      seeTitle: "What to show",
      see: [
        "How sessions are linked across teams.",
        "How education touchpoints are reinforced.",
        "How escalations are managed without breaking flow.",
      ],
      why: "Consistency prevents rework and improves patient readiness.",
    },
  },
  {
    phase: "Post-Visit",
    title: "6. Discharge & Transition of Care",
    icon: "📄",
    patient: {
      span: "Maria reviews discharge instructions and medication plans in Spanish before going home.",
      som: "Abdi receives postpartum guidance and warning signs in Somali.",
      tele: "Tran gets recovery instructions and telehealth follow-up details in Vietnamese.",
      joanna: "Joanna reviews discharge and follow-up steps with ASL support to ensure clarity.",
    },
    behind: [
      "Discharge documentation and education are delivered with language support.",
      "Patient understanding is validated before transition.",
      "Follow-up communication paths are set.",
    ],
    who: ["Discharge nurse", "Care coordinator", "Interpreter", "Patient/family"],
    outcomes: [
      "Patient leaves with clearer understanding.",
      "Lower risk of avoidable complications.",
      "Stronger transition into home or next-care setting.",
    ],
    connections: {
      span: ["Translated discharge support", "Medication education interpretation", "Post-care messaging readiness"],
      som: ["Postpartum instruction support", "Family-centered explanation", "Follow-up coordination"],
      tele: ["Telehealth transition support", "Vietnamese discharge reinforcement", "Reminder setup"],
      joanna: ["ASL discharge support", "Visual teach-back support", "Follow-up planning"],
    },
    stakeholder: {
      it: "Support accurate documentation and communication handoff tools.",
      clinical: "Ensure discharge understanding and safe self-management.",
      ops: "Standardize transition workflows with language support.",
      exec: "Clear discharge communication reduces downstream utilization risk.",
    },
    impact: "Effective interpreted discharge improves safety and continuity after leaving care.",
    demo: {
      owner: "AMN + care transition team",
      focus: "Discharge communication quality",
      time: "40 seconds",
      cue: "Show interpreted discharge and patient teach-back support.",
      return: "Advance to post-visit follow-up.",
      badge: "Transition",
      headline: "Discharge clarity is a major predictor of post-visit success.",
      seeTitle: "What to show",
      see: [
        "How instructions are delivered with interpretation.",
        "How comprehension is confirmed.",
        "How follow-up channels are configured.",
      ],
      why: "Strong transition communication lowers avoidable returns.",
    },
  },
  {
    phase: "Post-Visit",
    title: "7. Post Visit & Ongoing Care",
    icon: "🔄",
    patient: {
      span: "Maria receives follow-up outreach, answers medication questions, and stays connected through portal messaging in Spanish.",
      som: "Abdi receives postpartum follow-up and ongoing education support in Somali.",
      tele: "Tran completes virtual check-ins and receives ongoing Vietnamese support for recovery.",
      joanna: "Joanna continues care coordination and follow-up communication with ASL-accessible pathways.",
    },
    behind: [
      "Follow-up calls, messages, and education continue after discharge.",
      "Billing and patient feedback interactions occur.",
      "Performance data informs continuous improvement.",
    ],
    who: ["Care management", "Patient experience", "Revenue cycle", "Interpreter quality teams"],
    outcomes: [
      "Higher follow-up completion and trust.",
      "Improved patient-reported experience.",
      "Data-driven optimization of language access operations.",
    ],
    connections: {
      span: ["Portal messaging support", "Follow-up interpretation", "Quality analytics"],
      som: ["Postpartum continuity outreach", "Survey language support", "Longitudinal engagement"],
      tele: ["Telehealth follow-up interpretation", "Remote recovery support", "Performance insight"],
      joanna: ["ASL follow-up pathways", "Accessible patient feedback", "Quality coaching loops"],
    },
    stakeholder: {
      it: "Keep communication channels connected and measurable.",
      clinical: "Support adherence and longitudinal care quality.",
      ops: "Use data to optimize staffing, routing, and service levels.",
      exec: "Post-visit engagement links experience to measurable outcomes.",
    },
    impact: "Ongoing interpreted engagement strengthens outcomes, loyalty, and operational learning.",
    demo: {
      owner: "Essentia + AMN",
      focus: "Follow-up + quality loop",
      time: "35 seconds",
      cue: "Show post-visit messaging and quality/performance reporting.",
      return: "Close with impact summary.",
      badge: "Sustainment",
      headline: "Language access continues after discharge, where long-term outcomes are shaped.",
      seeTitle: "What to show",
      see: [
        "How follow-up interactions stay language-aligned.",
        "How feedback data is captured.",
        "How quality metrics drive service improvement.",
      ],
      why: "This is where operational maturity and patient trust compound over time.",
    },
  },
];

const stakeholders = [
  { key: "it", label: "IT / Digital", icon: "💻" },
  { key: "clinical", label: "Clinical Leaders", icon: "🩺" },
  { key: "ops", label: "Operations", icon: "⚙️" },
  { key: "exec", label: "Executive Sponsors", icon: "📊" },
];

const scenarioGrid = document.getElementById("scenarioGrid");
const nodesWrap = document.getElementById("nodes");
const trackFill = document.getElementById("trackFill");
const avatar = document.getElementById("avatar");
const stagePhase = document.getElementById("stagePhase");
const stageTitle = document.getElementById("stageTitle");
const stageIcon = document.getElementById("stageIcon");
const stageCounter = document.getElementById("stageCounter");
const patientMoment = document.getElementById("patientMoment");
const behindList = document.getElementById("behindList");
const whoList = document.getElementById("whoList");
const outcomeList = document.getElementById("outcomeList");
const connectionGrid = document.getElementById("connectionGrid");
const stakeholderStrip = document.getElementById("stakeholderStrip");
const stakeholderDetail = document.getElementById("stakeholderDetail");
const impactText = document.getElementById("impactText");
const demoBadge = document.getElementById("demoBadge");
const demoHeadline = document.getElementById("demoHeadline");
const demoLeftTitle = document.getElementById("demoLeftTitle");
const demoSee = document.getElementById("demoSee");
const demoWhy = document.getElementById("demoWhy");
const demoOwner = document.getElementById("demoOwner");
const demoFocus = document.getElementById("demoFocus");
const demoTime = document.getElementById("demoTime");
const demoCue = document.getElementById("demoCue");
const demoReturn = document.getElementById("demoReturn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const playBtn = document.getElementById("playBtn");
const resetBtn = document.getElementById("resetBtn");
const presentationMode = document.getElementById("presentationMode");
const body = document.body;

let pIndex = 0;
let sIndex = 0;
let auto = null;
let activeStakeholder = "it";

function make(tag, cls, text) {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (text) el.textContent = text;
  return el;
}

function populateScenarioCards() {
  personas.forEach((p, i) => {
    const card = make("button", "scenario-card");
    card.type = "button";
    card.style.setProperty("--chip", p.style);
    card.innerHTML = `
      <div class="avatar-dot" aria-hidden="true"></div>
      <h3>${p.name}, ${p.age}</h3>
      <p><strong>Primary communication:</strong> ${p.language}</p>
      <p>${p.situation}</p>
    `;
    card.addEventListener("click", () => {
      pIndex = i;
      sIndex = 0;
      setScenarioActive();
      render();
      stopAuto();
    });
    scenarioGrid.appendChild(card);
  });
  setScenarioActive();
}

function setScenarioActive() {
  [...scenarioGrid.children].forEach((card, i) => {
    card.classList.toggle("active", i === pIndex);
  });
}

function buildNodes() {
  stages.forEach((s, i) => {
    const node = make("button", "node");
    node.type = "button";
    node.setAttribute("aria-label", s.title);
    node.innerHTML = `<span>${s.title}</span>`;
    node.addEventListener("click", () => {
      sIndex = i;
      render();
      stopAuto();
    });
    nodesWrap.appendChild(node);
  });
}

function fillList(el, items) {
  el.innerHTML = "";
  items.forEach((item) => {
    const li = make("li", "", item);
    el.appendChild(li);
  });
}

function renderConnections(stage, personaKey) {
  connectionGrid.innerHTML = "";
  stage.connections[personaKey].forEach((item) => {
    const card = make("article", "connection-card");
    card.innerHTML = `<h3>${item}</h3><p>Connected to this step of ${personas[pIndex].name}’s journey.</p>`;
    connectionGrid.appendChild(card);
  });
}

function renderStakeholders(stage) {
  stakeholderStrip.innerHTML = "";
  stakeholders.forEach((s) => {
    const btn = make("button", "stake-chip", `${s.icon} ${s.label}`);
    btn.type = "button";
    btn.classList.toggle("active", s.key === activeStakeholder);
    btn.addEventListener("click", () => {
      activeStakeholder = s.key;
      renderStakeholders(stage);
    });
    stakeholderStrip.appendChild(btn);
  });
  stakeholderDetail.textContent = stage.stakeholder[activeStakeholder];
}

function renderDemo(stage) {
  const d = stage.demo;
  demoBadge.textContent = d.badge;
  demoHeadline.textContent = d.headline;
  demoLeftTitle.textContent = d.seeTitle;
  demoWhy.textContent = d.why;
  demoOwner.textContent = d.owner;
  demoFocus.textContent = d.focus;
  demoTime.textContent = d.time;
  demoCue.textContent = d.cue;
  demoReturn.textContent = d.return;
  fillList(demoSee, d.see);
}

function renderTimeline() {
  const pct = (sIndex / (stages.length - 1)) * 100;
  trackFill.style.width = `${pct}%`;
  avatar.style.left = `calc(${pct}% - 21px)`;
  [...nodesWrap.children].forEach((n, i) => {
    n.classList.toggle("active", i <= sIndex);
    n.classList.toggle("current", i === sIndex);
  });
}

function render() {
  const persona = personas[pIndex];
  const stage = stages[sIndex];

  stagePhase.textContent = stage.phase;
  stageTitle.textContent = stage.title;
  stageIcon.textContent = stage.icon;
  stageCounter.textContent = `Step ${sIndex + 1} of ${stages.length}`;

  patientMoment.textContent = stage.patient[persona.id];

  fillList(behindList, stage.behind);
  fillList(whoList, stage.who);
  fillList(outcomeList, stage.outcomes);

  renderConnections(stage, persona.id);
  renderStakeholders(stage);
  renderDemo(stage);

  impactText.textContent = stage.impact;

  renderTimeline();
  prevBtn.disabled = sIndex === 0;
  nextBtn.disabled = sIndex === stages.length - 1;
}

function next() {
  if (sIndex < stages.length - 1) {
    sIndex += 1;
  } else {
    sIndex = 0;
  }
  render();
}

function prev() {
  if (sIndex > 0) sIndex -= 1;
  render();
}

function toggleAuto() {
  if (auto) {
    stopAuto();
  } else {
    playBtn.textContent = "❚❚ Pause";
    auto = setInterval(next, 3500);
  }
}

function stopAuto() {
  if (auto) {
    clearInterval(auto);
    auto = null;
    playBtn.textContent = "▶ Auto-play";
  }
}

prevBtn.addEventListener("click", () => {
  prev();
  stopAuto();
});
nextBtn.addEventListener("click", () => {
  next();
  stopAuto();
});
playBtn.addEventListener("click", toggleAuto);
resetBtn.addEventListener("click", () => {
  pIndex = 0;
  sIndex = 0;
  activeStakeholder = "it";
  setScenarioActive();
  render();
  stopAuto();
});
presentationMode.addEventListener("change", () => {
  body.classList.toggle("presentation-mode", presentationMode.checked);
});

populateScenarioCards();
buildNodes();
render();
