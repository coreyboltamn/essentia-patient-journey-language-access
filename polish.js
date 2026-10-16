(function () {
  // Executive-ready copy + flow polish for Interpreter Experience tab
  const stageTitles = [
    "Coverage Ready",
    "Assignment Confirmed",
    "Rapid Dispatch",
    "Clinical Session Control",
    "Continuity in Care",
    "Documented Handoff",
    "Quality Feedback Loop",
  ];

  const stageSummaries = [
    "Interpreter capacity is visible and ready before demand spikes.",
    "Best-fit interpreter is confirmed with language and specialty alignment.",
    "On-demand requests route quickly with escalation safeguards.",
    "Live session controls keep communication safe during decisions.",
    "Support stays consistent through handoffs and longer episodes of care.",
    "Session context and notes are captured for safe transition of care.",
    "Performance insights drive coaching and service improvement.",
  ];

  // Replace in-place only when Interpreter Experience tab exists
  const tab = document.getElementById("viewInterpBtn");
  if (!tab) return;

  // Add compact executive summary row in interpreter panel
  const interpView = document.getElementById("interpView");
  if (interpView && !document.getElementById("interpExecRow")) {
    const row = document.createElement("div");
    row.id = "interpExecRow";
    row.className = "interp-exec-row";
    row.innerHTML = `
      <span class="interp-stage-pill" id="interpStagePill"></span>
      <p class="interp-stage-summary" id="interpStageSummary"></p>
    `;
    interpView.insertBefore(row, interpView.firstChild);
  }

  function renderExecPolish() {
    const pill = document.getElementById("interpStagePill");
    const sum = document.getElementById("interpStageSummary");
    if (!pill || !sum) return;
    pill.textContent = stageTitles[sIndex] || "";
    sum.textContent = stageSummaries[sIndex] || "";

    // tighten wording in existing cards for faster readout
    const h3s = interpView.querySelectorAll(".interp-card h3");
    if (h3s.length >= 4) {
      h3s[0].textContent = "Interpreter View";
      h3s[1].textContent = "Platform Response";
      h3s[2].textContent = "Risk Managed";
      h3s[3].textContent = "Capabilities Active";
    }
  }

  const prevRender = render;
  render = function () {
    prevRender();
    if (!document.getElementById("interpView").hidden) renderExecPolish();
  };

  // when user switches tabs, ensure polish row updates immediately
  const prevInterpClick = tab.onclick;
  tab.onclick = function (e) {
    if (typeof prevInterpClick === "function") prevInterpClick.call(this, e);
    renderExecPolish();
  };

  renderExecPolish();
})();
