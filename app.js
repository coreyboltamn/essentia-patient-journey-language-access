const personas = [
  { id: "maria", initial: "M", name: "Maria", title: "Scheduled Outpatient Visit", lang: "Spanish", desc: "Needs language support from scheduling through follow-up." },
  { id: "abdi", initial: "A", name: "Abdi", title: "Urgent Care Visit", lang: "Somali", desc: "Arrives with immediate communication needs in a high-acuity setting." },
  { id: "tele", initial: "T", name: "Tran", title: "Virtual Follow-Up", lang: "Vietnamese", desc: "Uses mobile telehealth and needs multilingual virtual continuity." },
];

const connectionCatalog = {
  workforce: { name: "Interpreter Workforce", desc: "In-person, video, and audio medical interpreting." },
  jaide: { name: "Jaide Translation", desc: "AI-assisted written translation and routine communication." },
  patientline: { name: "Patient Line", desc: "Phone-based language support at first contact." },
  equipment: { name: "Equipment Program", desc: "Purpose-built devices and access points across care settings." },
  device: { name: "Any Device, Anywhere", desc: "Access from workstations, mobile, carts, and clinical devices." },
  ehr: { name: "EHR Integration", desc: "Interpreter access embedded into clinical workflows." },
  telehealth: { name: "Telehealth Integration", desc: "Interpreter access embedded in virtual encounters." },
  apis: { name: "APIs & Interoperability", desc: "Configurable integration with customer and third-party apps." },
  vriopi: { name: "VRI/OPI Interface", desc: "Live remote interpreting for rapid point-of-care support." },
  scheduler: { name: "Onsite Interpreter Scheduler", desc: "Pre-visit scheduling for planned interpreter coverage." },
};

const icons = {
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  checkin: '<path d="M4 6h16v12H4z"/><path d="M8 10h8M8 14h5"/>',
  steth: '<circle cx="8" cy="6" r="3"/><path d="M8 9v4a4 4 0 008 0v-1"/><circle cx="18" cy="12" r="3"/>',
  bed: '<rect x="3" y="10" width="18" height="6" rx="1"/><path d="M5 10V7h4v3M3 17v2M21 17v2"/>',
  discharge: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h7"/>',
  followup: '<path d="M12 20a8 8 0 100-16 8 8 0 000 16z"/><path d="M12 8v5l3 2"/>',
};

const stages = [
  {
    label: "Awareness & Access to Care",
    phase: "Before the Visit",
    icon: "globe",
    modality: "Patient Line + intake workflows",
    amn: "Language Access Program",
    moment: {
      maria: "I need to know I can receive care safely in Spanish from the first contact.",
      abdi: "My family calls ahead and requests Somali support before arrival.",
      tele: "I need language help before deciding if virtual care is right for me.",
    },
    behind: ["Language needs identified at first contact", "Preferred language captured in structured intake", "Access barriers flagged early"],
    who: ["Patient access team", "Contact center", "Family/caregiver"],
    outcome: ["Improved trust at entry point", "Fewer delays later in journey"],
    impact: "Reduce friction early by securing language support before care begins.",
    connections: ["patientline", "apis"],
    demo: {
      owner: "Journey Narrator",
      focus: "Context setup (no full live tool demo)",
      time: "~1 min",
      cue: "This is where language needs first surface and get captured.",
      see: ["How preferred language is identified", "How access barriers are flagged early"],
      returnCue: "Now let’s show how planned support is secured pre-visit.",
    },
  },
  {
    label: "Appointment Confirmation & Pre-Visit",
    phase: "Before the Visit",
    icon: "calendar",
    modality: "Scheduled support + translated reminders",
    amn: "Scheduling and translation",
    moment: {
      maria: "Scheduling confirmed my language and told me an interpreter would be ready.",
      abdi: "My language need was documented before I arrived.",
      tele: "I received pre-visit instructions in my language.",
    },
    behind: ["Interpreter requests initiated in advance", "Pre-visit instructions localized", "Appointment reminders align to language preference"],
    who: ["Schedulers", "Interpreter coordinators", "Digital messaging team"],
    outcome: ["Lower no-show risk", "Patient arrives prepared"],
    impact: "Prevent no-shows and confusion by preparing language support before arrival.",
    connections: ["patientline", "jaide", "scheduler", "apis"],
    demo: {
      owner: "Access/Scheduling Team",
      focus: "Onsite Interpreter Scheduler Tool",
      time: "~3-4 min",
      cue: "For planned visits, we secure the right interpreter in advance.",
      see: ["Interpreter request creation", "Scheduling confirmation and visibility"],
      returnCue: "With support planned, we move to day-of-arrival workflows.",
    },
  },
  {
    label: "Arrival & Check-In",
    phase: "At the Visit",
    icon: "checkin",
    modality: "Rapid access workflows",
    amn: "Point-of-care readiness",
    moment: {
      maria: "At check-in, they already knew my language and launched support quickly.",
      abdi: "I needed help immediately and support was available right away.",
      tele: "My language preference was confirmed before clinical conversation began.",
    },
    behind: ["Language need verified at check-in", "Interpreter launch options available", "Staff use standardized workflows"],
    who: ["Front desk", "Registration", "Clinical support staff"],
    outcome: ["Faster throughput", "Safer handoff into clinical encounter"],
    impact: "Move from intake to care with no communication gap at the front door.",
    connections: ["device", "ehr", "equipment", "vriopi"],
    demo: {
      owner: "Front Desk / Operations",
      focus: "Quick launch walkthrough (optional)",
      time: "~1-2 min",
      cue: "At check-in, staff can launch language support without delay.",
      see: ["Where launch options appear", "How escalation to VRI/OPI is triggered"],
      returnCue: "Next, let’s demonstrate the live clinical interpreting experience.",
    },
  },
  {
    label: "Clinical Encounter",
    phase: "At the Visit",
    icon: "steth",
    modality: "VRI / OPI / onsite",
    amn: "Interpreter Workforce",
    moment: {
      maria: "The interpreter helped me understand treatment options clearly.",
      abdi: "In triage, language support connected fast so care could proceed safely.",
      tele: "Interpreter, clinician, and patient communicated naturally in one encounter.",
    },
    behind: ["On-demand interpreter connection", "Modality chosen based on acuity and need", "Encounter communication is documented"],
    who: ["Nurses", "Providers", "Qualified interpreters"],
    outcome: ["Reduced risk of miscommunication", "Higher patient comprehension"],
    impact: "Ensure safe, clear communication at the moment clinical decisions are made.",
    connections: ["workforce", "vriopi", "device", "ehr", "equipment"],
    demo: {
      owner: "Clinical + Interpreter Operations",
      focus: "VRI/OPI Remote Interpreting Interface",
      time: "~4-5 min",
      cue: "When communication is needed immediately, we connect in real time.",
      see: ["Live interpreter connection", "Clinical communication flow with interpreter"],
      returnCue: "After treatment, discharge understanding becomes the next priority.",
    },
  },
  {
    label: "Treatment / Inpatient Stay",
    phase: "At the Visit",
    icon: "bed",
    modality: "Continuous bedside support",
    amn: "Interpreter + equipment continuity",
    moment: {
      maria: "As care continued, support remained available whenever new questions came up.",
      abdi: "Across units, language support remained consistent.",
      tele: "Care plans were explained clearly and repeatedly as needed.",
    },
    behind: ["Interpreter continuity through care transitions", "Device availability across units", "Team-wide language support alignment"],
    who: ["Inpatient nursing", "Hospitalists", "Interpreter services"],
    outcome: ["Consistent comprehension during treatment", "Fewer communication-related delays"],
    impact: "Sustain communication quality throughout ongoing inpatient care.",
    connections: ["workforce", "vriopi", "equipment", "device"],
    demo: {
      owner: "Inpatient Operations",
      focus: "Continuity reference",
      time: "~1-2 min",
      cue: "Language support continues across bedside and care planning interactions.",
      see: ["Consistency across units", "Shared workflow for interpreter access"],
      returnCue: "Next, we’ll show discharge communication and patient education.",
    },
  },
  {
    label: "Discharge & Transition of Care",
    phase: "After the Visit",
    icon: "discharge",
    modality: "Translated instructions + teach-back",
    amn: "Jaide + interpreter support",
    moment: {
      maria: "I received discharge instructions in Spanish and understood next steps.",
      abdi: "Instructions were translated and explained clearly before leaving.",
      tele: "Medication and follow-up guidance came in my language.",
    },
    behind: ["Discharge content translated", "Teach-back supported by interpreter", "Medication and follow-up clarity emphasized"],
    who: ["Care transition team", "Patient education", "Interpreters"],
    outcome: ["Improved adherence", "Reduced avoidable return visits"],
    impact: "Improve safety after discharge with clear multilingual instructions.",
    connections: ["jaide", "workforce", "ehr"],
    demo: {
      owner: "Care Transition / Patient Education",
      focus: "Jaide AI Translation Tool",
      time: "~3-4 min",
      cue: "Discharge understanding drives safety, adherence, and outcomes.",
      see: ["Translation workflow for discharge content", "How language clarity is delivered to patient"],
      returnCue: "Finally, support continues in follow-up and ongoing care.",
    },
  },
  {
    label: "Post Visit & Ongoing Care",
    phase: "After the Visit",
    icon: "followup",
    modality: "Portal, telehealth, follow-up",
    amn: "Digital continuity",
    moment: {
      maria: "Follow-up communication stayed in Spanish, including portal and billing questions.",
      abdi: "My family could ask follow-up questions in Somali.",
      tele: "Virtual follow-up remained accessible in my language.",
    },
    behind: ["Portal and outreach support multilingual content", "Virtual follow-up includes interpreter pathways", "Billing/non-clinical communication remains accessible"],
    who: ["Digital health team", "Contact center", "Follow-up clinicians"],
    outcome: ["Higher engagement after visit", "More complete longitudinal communication"],
    impact: "Extend language access beyond discharge into long-term engagement.",
    connections: ["jaide", "telehealth", "apis", "patientline"],
    demo: {
      owner: "Digital / Follow-up Team",
      focus: "Optional quick walkthrough",
      time: "~1-2 min",
      cue: "Language access extends into follow-up, portal, and virtual touchpoints.",
      see: ["Multilingual continuity after discharge", "Channels for ongoing support"],
      returnCue: "That completes the end-to-end language access journey.",
    },
  },
];

let pIndex = 0;
let sIndex = 0;
let timer = null;

const $ = (id) => document.getElementById(id);

function setList(id, items) {
  const el = $(id);
  el.innerHTML = "";
  items.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t;
    el.appendChild(li);
  });
}

function renderPersonas() {
  const grid = $("scenarioGrid");
  grid.innerHTML = "";
  personas.forEach((p, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "scenario-card" + (i === pIndex ? " active" : "");
    b.innerHTML = `<span class="badge">${p.initial}</span><span><h3>${p.name} — ${p.title}</h3><p>${p.desc}</p></span>`;
    b.addEventListener("click", () => { pIndex = i; renderPersonas(); renderStage(); renderConnections(); renderDemo(); });
    grid.appendChild(b);
  });
}

function nodePercent(i) {
  return ((i + 0.5) / stages.length) * 100;
}

function renderTrack() {
  const nodes = $("nodes");
  nodes.innerHTML = "";
  stages.forEach((s, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "node" + (i < sIndex ? " done" : "") + (i === sIndex ? " active" : "");
    b.style.left = nodePercent(i) + "%";
    b.innerHTML = `<span class="dot"></span><span class="label">${i + 1}. ${s.label}</span>`;
    b.addEventListener("click", () => { sIndex = i; stopPlay(); render(); });
    nodes.appendChild(b);
  });
  $("avatar").style.left = nodePercent(sIndex) + "%";
  $("trackFill").style.width = nodePercent(sIndex) + "%";
}

function renderStage() {
  const s = stages[sIndex];
  const p = personas[pIndex];
  $("stageIcon").innerHTML = `<svg viewBox="0 0 24 24">${icons[s.icon]}</svg>`;
  $("stagePhase").textContent = s.phase;
  $("stageTitle").textContent = s.label;
  $("stageCounter").textContent = `${sIndex + 1} / ${stages.length}`;
  $("patientMoment").innerHTML = `<strong>${p.name} (${p.lang}):</strong> ${s.moment[p.id]}`;
  $("statusRow").innerHTML =
    `<span class="chip lang">Patient language: ${p.lang}</span>` +
    `<span class="chip mod">Modality: ${s.modality}</span>` +
    `<span class="chip amn">AMN: ${s.amn}</span>`;
  setList("behindList", s.behind);
  setList("whoList", s.who);
  setList("outcomeList", s.outcome);
  $("impactText").textContent = s.impact;

  const panel = $("stagePanel");
  panel.classList.remove("fade");
  void panel.offsetWidth;
  panel.classList.add("fade");
}

function renderConnections() {
  const s = stages[sIndex];
  const grid = $("connectionGrid");
  grid.innerHTML = "";

  Object.keys(connectionCatalog).forEach((key) => {
    const c = connectionCatalog[key];
    const active = s.connections.includes(key);
    const card = document.createElement("article");
    card.className = "connection-card" + (active ? " active" : "");
    card.innerHTML = `<h3>${c.name}</h3><p>${c.desc}</p>`;
    grid.appendChild(card);
  });
}

function renderDemo() {
  const s = stages[sIndex].demo;
  $("demoOwner").textContent = s.owner;
  $("demoFocus").textContent = s.focus;
  $("demoTime").textContent = s.time;
  $("demoCue").textContent = s.cue;
  $("demoReturn").textContent = s.returnCue;
  setList("demoSee", s.see);
}

function render() {
  renderTrack();
  renderStage();
  renderConnections();
  renderDemo();
  $("prevBtn").disabled = sIndex === 0;
  $("nextBtn").disabled = sIndex === stages.length - 1;
}

function next() { if (sIndex < stages.length - 1) { sIndex++; render(); } else { stopPlay(); } }
function prev() { if (sIndex > 0) { sIndex--; render(); } }

function stopPlay() {
  clearInterval(timer);
  timer = null;
  $("playBtn").innerHTML = "&#9654; Auto-play";
}

function togglePlay() {
  if (timer) { stopPlay(); return; }
  $("playBtn").innerHTML = "&#10074;&#10074; Pause";
  timer = setInterval(next, 7000);
}

$("nextBtn").addEventListener("click", () => { stopPlay(); next(); });
$("prevBtn").addEventListener("click", () => { stopPlay(); prev(); });
$("playBtn").addEventListener("click", togglePlay);
$("resetBtn").addEventListener("click", () => {
  stopPlay(); pIndex = 0; sIndex = 0; renderPersonas(); render();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

$("presentationMode").addEventListener("change", (e) => {
  document.body.classList.toggle("presentation-mode", e.target.checked);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") { stopPlay(); next(); }
  if (e.key === "ArrowLeft") { stopPlay(); prev(); }
});

renderPersonas();
render();
