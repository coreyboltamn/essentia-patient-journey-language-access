const personas = [
  { id: "maria", initial: "M", name: "Maria", title: "Scheduled Outpatient Visit", lang: "Spanish",
    desc: "Maria books a follow-up appointment and needs Spanish support from the first click to the final bill." },
  { id: "abdi", initial: "A", name: "Abdi", title: "Emergency / Urgent Care", lang: "Somali",
    desc: "Abdi arrives in urgent distress with limited English and needs an interpreter within moments." },
  { id: "tele", initial: "T", name: "Tran", title: "Telehealth Encounter", lang: "Vietnamese",
    desc: "Tran joins a virtual visit from a phone, with a clinician and interpreter on the same call." },
];

const icons = {
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  pulse: '<path d="M3 12h4l2-6 4 12 2-6h6"/>',
  headset: '<path d="M4 14v-2a8 8 0 0116 0v2"/><rect x="3" y="14" width="4" height="6" rx="1"/><rect x="17" y="14" width="4" height="6" rx="1"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/>',
  phone: '<path d="M5 4h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
  doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h7"/>',
  route: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M6 8.5v3a3 3 0 003 3h6a3 3 0 013 3"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
  rocket: '<path d="M5 19c0-4 2-6 4-8l4-4c3-3 6-3 7-3 0 1 0 4-3 7l-4 4c-2 2-4 4-8 4z"/><circle cx="15" cy="9" r="1.5"/>',
};

/* One stage per agenda topic the client asked to see. */
const stages = [
  {
    label: "Language Access Overview", phase: "The Need", icon: "globe",
    moment: {
      maria: "\u201CI understand a little English, but medical words are hard. I worry I will miss something important.\u201D",
      abdi: "\u201CI am in pain and cannot explain what is happening. Nobody understands me.\u201D",
      tele: "\u201CI do not want to guess at my own health information on a video call.\u201D",
    },
    modality: "All modalities", amn: "AMN Language Services",
    behind: ["Language needs are identified as a safety, equity and compliance priority", "Section 1557 and Joint Commission expectations shape the program", "One program covers phone, video, in-person and written translation"],
    who: ["Patient and family", "Essentia leadership", "Patient experience and compliance teams"],
    outcome: ["Shared definition of what good language access looks like", "Clear link between communication and quality of care"],
  },
  {
    label: "Solution Architecture", phase: "Behind the Scenes", icon: "layers",
    moment: {
      maria: "\u201CI never see the technology, I just know help is there when I need it.\u201D",
      abdi: "\u201CThe interpreter connected quickly and nobody had to hunt for a device.\u201D",
      tele: "\u201CThe interpreter joined my visit link without a second login.\u201D",
    },
    modality: "EHR + devices + telehealth", amn: "Integration layer",
    behind: ["Interpreter access launches from the EHR, carts, phones and telehealth platform", "Single sign-on and role-based access for staff", "Language preference flows between systems of record"],
    who: ["Essentia IT and EHR team", "AMN solution architects", "Security and privacy reviewers"],
    outcome: ["Staff use tools they already know", "Secure, consistent experience across every site"],
  },
  {
    label: "Patient Access & Scheduling", phase: "Before the Visit", icon: "calendar",
    moment: {
      maria: "\u201CWhen I booked, the call center asked my preferred language and said an interpreter would be ready.\u201D",
      abdi: "\u201CMy cousin called ahead. They noted Somali and flagged that I may need help right away.\u201D",
      tele: "\u201CI got my visit reminder in Vietnamese, with a link that works on my phone.\u201D",
    },
    modality: "Scheduled interpreter + translated reminders", amn: "Scheduling integration",
    behind: ["Preferred language captured in a structured field, not free text", "Interpreter automatically requested for the appointment", "Reminders and instructions sent in the patient\u2019s language"],
    who: ["Schedulers and call center agents", "Patient portal", "Interpreter coordinators"],
    outcome: ["Fewer no-shows", "Patient arrives prepared and confident"],
  },
  {
    label: "Point-of-Care Workflow", phase: "At the Visit", icon: "pulse",
    moment: {
      maria: "\u201CAt check-in nobody asked me to repeat my language. The nurse opened the interpreter on the tablet.\u201D",
      abdi: "\u201CTriage started right away. A video interpreter was on screen in under a minute.\u201D",
      tele: "\u201CThe clinic confirmed my language before the doctor joined.\u201D",
    },
    modality: "Video (VRI) / Phone (OPI) / In-person", amn: "Point-of-care interpreting",
    behind: ["One-touch interpreter launch from the workstation or cart", "Right modality chosen by acuity, setting and preference", "Interpreter use documented in the encounter"],
    who: ["Front desk, nurses and physicians", "Qualified medical interpreters"],
    outcome: ["Faster triage and intake", "Lower risk of miscommunication and ad hoc family interpreting"],
  },
  {
    label: "Interpreter Experience", phase: "At the Visit", icon: "headset",
    moment: {
      maria: "\u201CThe interpreter knew we were discussing diabetes medication and explained everything carefully.\u201D",
      abdi: "\u201CThe interpreter stayed calm and helped the team understand my symptoms.\u201D",
      tele: "\u201CThe interpreter introduced herself and confirmed I could hear her clearly.\u201D",
    },
    modality: "Qualified, credentialed interpreters", amn: "Interpreter network",
    behind: ["Interpreters see the language, setting and context before connecting", "Specialty matching for areas like oncology, behavioral health and obstetrics", "Quality monitoring and ongoing training"],
    who: ["AMN interpreters", "Clinical staff"],
    outcome: ["Accurate, professional interpretation", "Patients and clinicians trust the conversation"],
  },
  {
    label: "Telehealth & Remote Care", phase: "At the Visit", icon: "video",
    moment: {
      maria: "\u201CMy follow-up was by video. The interpreter joined in one tap.\u201D",
      abdi: "\u201CWhen the internet dropped, they switched to a phone line and kept going.\u201D",
      tele: "\u201CThree of us on one call: me, the doctor and the interpreter. It felt natural.\u201D",
    },
    modality: "Three-way video with audio fallback", amn: "Telehealth interpreter add-in",
    behind: ["Interpreter added to the virtual visit without extra steps for the patient", "Automatic fallback to audio if video quality drops", "Same documentation as in-person visits"],
    who: ["Telehealth clinicians", "Patient on a mobile device", "Remote interpreter"],
    outcome: ["Equitable access for virtual care", "No interrupted visits from technical issues"],
  },
  {
    label: "Contact Center & Non-Clinical", phase: "Around the Visit", icon: "phone",
    moment: {
      maria: "\u201CI called with a billing question and spoke to someone who could connect me with an interpreter.\u201D",
      abdi: "\u201CMy family called to ask about my medicine and got help in Somali.\u201D",
      tele: "\u201CI asked the portal help line how to join my visit and got an answer in my language.\u201D",
    },
    modality: "Phone interpreting for non-clinical teams", amn: "Contact center language line",
    behind: ["Registration, billing and call center teams reach interpreters on demand", "Same language standards as clinical teams", "Usage tracked by department"],
    who: ["Patient access and billing", "Customer service agents", "Phone interpreters"],
    outcome: ["Consistent support outside the exam room", "Fewer abandoned calls and billing confusion"],
  },
  {
    label: "Written Translation", phase: "After the Visit", icon: "doc",
    moment: {
      maria: "\u201CMy visit summary and medication list came home in Spanish.\u201D",
      abdi: "\u201CMy discharge instructions were translated and also explained to me out loud.\u201D",
      tele: "\u201CThe consent form and after-visit summary were in Vietnamese.\u201D",
    },
    modality: "Document and digital translation", amn: "Translation services",
    behind: ["Vital documents translated by qualified linguists", "Reusable translation memory for consistency", "Portal and patient education content localized"],
    who: ["Clinical content owners", "Translators and reviewers", "Patient portal team"],
    outcome: ["Patients understand what to do after the visit", "Fewer return visits from misunderstanding"],
  },
  {
    label: "End-to-End: Urgent Care Visit", phase: "The Whole Story", icon: "route",
    moment: {
      maria: "\u201CFrom booking to billing, every step was in Spanish. I felt respected.\u201D",
      abdi: "\u201CArrival, triage, consent, treatment and discharge: an interpreter was there each time.\u201D",
      tele: "\u201CEven the follow-up call was in my language.\u201D",
    },
    modality: "Modality switches as needs change", amn: "Full AMN ecosystem",
    behind: ["Arrival and language verification", "Triage with immediate interpreter support", "Consent and diagnostics communicated clearly", "Discharge teach-back and follow-up scheduling in the preferred language"],
    who: ["Entire care team", "Interpreters", "Translators and contact center"],
    outcome: ["Safer care and better comprehension", "Complete documentation for compliance"],
  },
  {
    label: "Reporting & Administration", phase: "Behind the Scenes", icon: "chart",
    moment: {
      maria: "\u201CI will never see this, but it helps the hospital make my next visit even better.\u201D",
      abdi: "\u201CThey review how fast interpreters connected so the next patient is helped faster.\u201D",
      tele: "\u201CThey track whether virtual visits with interpreters run smoothly.\u201D",
    },
    modality: "Dashboards and analytics", amn: "Reporting portal",
    behind: ["Utilization by language, modality, department and site", "Connection speed and abandoned request monitoring", "Cost, compliance and quality reporting"],
    who: ["Language access managers", "Finance and compliance", "Executive sponsors"],
    outcome: ["Data to guide staffing and investment", "Proof of impact on equity and outcomes"],
  },
  {
    label: "Implementation & Support", phase: "Making It Real", icon: "rocket",
    moment: {
      maria: "\u201CThe staff seem comfortable using the tools. That tells me they were trained well.\u201D",
      abdi: "\u201CEvery nurse knew exactly how to get an interpreter.\u201D",
      tele: "\u201CIt just worked the first time.\u201D",
    },
    modality: "Rollout and ongoing support", amn: "Implementation team",
    behind: ["Discovery, integration build and testing", "Site-by-site rollout with staff training and quick reference tools", "24/7 support and regular business reviews"],
    who: ["Essentia project team", "AMN implementation and success managers", "Site champions"],
    outcome: ["Confident staff adoption", "Sustainable program with continuous improvement"],
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
    b.innerHTML = '<span class="badge">' + p.initial + '</span><span><h3>' + p.name + " \u2014 " + p.title + "</h3><p>" + p.desc + "</p></span>";
    b.addEventListener("click", () => { pIndex = i; renderPersonas(); renderStage(); });
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
    b.innerHTML = '<span class="dot"></span><span class="label">' + (i + 1) + ". " + s.label + "</span>";
    b.addEventListener("click", () => { sIndex = i; stopPlay(); render(); });
    nodes.appendChild(b);
  });
  $("avatar").style.left = nodePercent(sIndex) + "%";
  $("trackFill").style.width = nodePercent(sIndex) + "%";
}

function renderStage() {
  const s = stages[sIndex];
  const p = personas[pIndex];
  $("stageIcon").innerHTML = '<svg viewBox="0 0 24 24">' + icons[s.icon] + "</svg>";
  $("stagePhase").textContent = s.phase;
  $("stageTitle").textContent = s.label;
  $("stageCounter").textContent = (sIndex + 1) + " / " + stages.length;
  $("patientMoment").innerHTML = "<strong>" + p.name + " (" + p.lang + "):</strong> " + s.moment[p.id];
  $("statusRow").innerHTML =
    '<span class="chip lang">Patient language: ' + p.lang + "</span>" +
    '<span class="chip mod">Modality: ' + s.modality + "</span>" +
    '<span class="chip amn">AMN: ' + s.amn + "</span>";
  setList("behindList", s.behind);
  setList("whoList", s.who);
  setList("outcomeList", s.outcome);
  const panel = $("stagePanel");
  panel.classList.remove("fade");
  void panel.offsetWidth;
  panel.classList.add("fade");
}

function render() {
  renderTrack();
  renderStage();
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
  timer = setInterval(next, 6000);
}

$("nextBtn").addEventListener("click", () => { stopPlay(); next(); });
$("prevBtn").addEventListener("click", () => { stopPlay(); prev(); });
$("playBtn").addEventListener("click", togglePlay);
$("resetBtn").addEventListener("click", () => {
  stopPlay(); pIndex = 0; sIndex = 0; renderPersonas(); render();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") { stopPlay(); next(); }
  if (e.key === "ArrowLeft") { stopPlay(); prev(); }
});

renderPersonas();
render();
