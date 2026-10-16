# essentia-patient-journey-language-access

Microsite demo for Essentia + AMN patient journey language access workflows.

## Live site
https://coreyboltamn.github.io/essentia-patient-journey-language-access/

## Live-demo presentation checkpoints

The **Live Demo Checkpoint** inside “AMN in Action at This Step” stays visible
in both tabs and in Presentation Mode. A small stage cue scrolls to it.
This is a suggested presentation plan, not a claim about product availability
or actual demo duration:

| Journey step | Suggested demo | Suggested duration |
| --- | --- | --- |
| Awareness & Access | Jaide AI Translation and Live Speech: routine nonclinical written translation | 2 minutes |
| Appointment Confirmation & Pre-Visit | In-person Interpreter using Interpreter Scheduling tool | 3 minutes |
| Arrival & Check-In | VRI/OPI; **VRI / qualified ASL only** for Joanna | 3 minutes |
| Clinical Encounter | Telehealth integration with Teladoc, for Tran only | 3 minutes |

Jaide is not offered for Joanna; AI/live speech and audio-only telephony are not
ASL substitutes. Other stages have no checkpoint. Use Tran’s scenario to include
the telehealth demo rather than forcing it into an unrelated scenario.

### Presenter workflow

1. Walk the journey normally. At a checkpoint, expand **Presenter handoff** for
   the short script, suggested duration and demonstration checklist.
2. Choose **Pause journey for live demo**. Autoplay stops, and an explicit
   handoff state asks you to switch to your own demo application. This page
   launches nothing, opens no external links and requires no credentials.
3. Use fictional data in a prepared demo environment. Scheduling and telehealth
   examples are configured illustrative workflows, not proof of live deployments.
   Use qualified interpretation for clinical decisions/consent and appropriate
   qualified review of translated content.
4. Switch back and choose **Return to journey**. The scenario, stage and selected
   tab stay unchanged, and focus returns to the checkpoint control. Autoplay
   remains paused until you explicitly start it again.
5. Back, Next, direct timeline selection, scenario selection and Restart clear
   the handoff state. Restart retains its existing first-scenario/first-step
   behavior. Presentation Mode and tab changes do not interrupt the handoff.

### Editing the presentation plan

Edit `liveDemoCheckpoints` in `app.js`: `stageIndex` is the zero-based journey
step; `id` references the existing `solutionCatalog` ID, which supplies the
canonical name. `why`, `handoff`, `duration`, `show` and `returnCue` control the
copy. `asl` provides explicit visual/qualified ASL variants. `checkpointsFor`
also requires that solution to be available in the current stage/persona's
connection mapping, preserving its ASL and Tran-only filters. Multiple entries
may share a stage; while a demo is active, other start controls are disabled.

External demo links are intentionally **not supported** by this version.
Configure genuine links only in a future reviewed change with verified URLs,
clear launch labels and appropriate security/accessibility handling; do not
put credentials, PHI or invented demo URLs in this site.

### Checkpoint regression checks

Run `node --test tests/*.test.cjs` (Node 18+) and `node --check app.js`.
The new dependency-free tests cover the four technologies, stage/persona
eligibility, ASL and nonclinical AI safeguards, pause/return focus, autoplay,
navigation/reset/scenario cleanup and stage-wide markup placement. There is no
build step or new dependency. Repeat the browser checks below when changing
the journey or checkpoint controls.

Validation for this change: all 16 Node tests, JavaScript syntax and diff
whitespace checks passed. Local headless Chromium passed all 112 combinations
of four scenarios, seven stages and widths 1440/768/375/320, checking both tabs,
both presentation modes, checkpoint visibility, solution-card counts,
pause/return state and focus, sticky-header scroll clearance and page overflow.
Actual timed autoplay advance/pause, navigation cleanup and native Enter-key
activation also passed. No application JavaScript errors occurred. Google
Fonts failed DNS resolution (fallback fonts were used), and a first-load
favicon request returned 404. The browser-tool connection was unavailable, so
checks used installed Chromium directly. Other browsers, physical devices,
external demo applications and the public deployment were not verified.

**Merge this PR and complete GitHub Pages deployment to update the public site.**
No live technology integration is added.

## AMN solution connections

The existing connection section now uses one eight-solution catalog in `app.js`.
Each stage has explicit solution IDs and patient/staff workflow descriptions.
Patient Line and approved written content support access/preparation; qualified
interpretation and configured endpoints support encounters; Smart TV appears
for inpatient care; discharge and follow-up emphasize reviewed instructions and
continued communication. Teladoc cards appear only in Tran's virtual-visit
preparation, encounter and ongoing-care stages.

Joanna's cards omit Patient Line audio and AI options, use VRI rather than OPI
for ASL, and require qualified ASL interpreters and configured accessible video
workflows for mobile/TV endpoints. AI is not a substitute for qualified medical
interpretation; written clinical materials require appropriate qualified review.
These are editorial examples, not validated integration or language availability.
No APIs, credentials, PHI collection, automatic Epic synchronization or deployed
capabilities were added. The repaired layout, scenarios, controls, tabs and
presentation mode are retained.

### Connection regression checks

Run `node --test tests/connections.test.cjs` (Node 18+). All eight tests passed:
canonical names/IDs, all seven stages, representation of all eight solutions,
stage-specific descriptions across all four personas, ASL-safe variants,
virtual-visit filtering and AI review safeguards. `node --check app.js` and
`git diff --check` also passed. No dependencies or build tools were added.
CodeQL reported zero JavaScript alerts. Automated code review was unavailable
because of a model configuration error; a separate read-only review found no
significant issues.

Local headless Chromium checks served the site under
`/essentia-patient-journey-language-access/`. All 112 combinations of four
personas, seven stages and widths 1440/768/375/320 passed card-content,
text-wrapping and page-overflow checks. Both tabs, touchpoint/interpreter
extensions, Next/Back, timeline selection, restart, stakeholder buttons,
presentation mode and autoplay (including wraparound, pause and cancellation)
passed. All eight local CSS/JS assets returned HTTP 200; no JavaScript exceptions
or application console errors occurred. Google Fonts failed DNS resolution, so
checks used the fallback font; Chromium also requested an absent favicon (404).
Other browsers, physical devices and the public deployment were not verified.
Repeat the manual interaction checks below when editing the mappings.

The latest existing Pages deployment (`38948324313`, commit `b08191ac`) succeeded,
as confirmed by its deployment logs. **This PR must still be merged and deployed
before these new connections appear on the public site.**

## Layout repair

The design reference is commit `bcea34f1d25c1cfd51a21f56b788db2c39c160bb`.
The repair restores its light hero, navy/purple/teal palette, and colored
touchpoint cards while keeping the current patient content and script extensions.
It is a normal repair commit, not a history reset.

The current base stylesheet had lost the touchpoint layout and the color
variables used by the interpreter stylesheet. This left touchpoints as plain
lists and the selected tab with white text on a transparent background.
The timeline also positioned the avatar at the track edges rather than the
centers of its seven steps, and its line, dots, and avatar used different heights.
Presenter-note visibility was reversed from the reference design.

The repair restores those styles and visibility rules, aligns the timeline,
lets header/journey controls wrap, stacks touchpoint cards on mobile, and
allows interpreter cards to fit narrow screens. Only the timeline intentionally
scrolls sideways.

### Regression checks

This is a static HTML/CSS/JavaScript site with no existing test runner or build
dependencies. Browser checks were performed with local Chromium, serving the
site under `/essentia-patient-journey-language-access/`, not just at `/`.
To repeat the checks in a browser:

1. Check widths of 1440, 768, 375, and 320 pixels. Cards and controls should fit;
   only the timeline should scroll horizontally.
2. Select each of the four scenarios and all seven timeline steps. Check the
   patient details, highlighted touchpoints, and marker/line alignment, including
   the first and last steps.
3. Switch between both demo tabs at each step. Only the selected view should be
   visible; Interpreter Experience should show the matching step and summary.
4. Exercise Back, Next, Restart Journey, all stakeholder buttons, and Auto-play
   followed by Pause. Restart should return to the first scenario and step.
5. Presenter Notes should be hidden normally and available in Presentation Mode.

All 112 scenario/stage/width combinations passed overflow, timeline geometry,
and tab/extension synchronization checks. The other controls passed, all eight
local CSS/JS assets returned HTTP 200, and no JavaScript exceptions occurred.
JavaScript syntax and diff whitespace checks also passed. No new testing
dependencies were added.

### Deployment and limitations

Pages run `38933860419` successfully deployed `b0c68667417440d9c8bac12eda4b6b6dd2baad2a`
from `main`; its deployment log confirms the public URL above. No Pages settings
were changed. Direct public-site access failed DNS resolution in the repair
environment, so its live appearance and asset contents could not be verified.
Local checks used the system font fallback when Google Fonts was unavailable;
other browsers and physical devices have not been checked.

**The repair must be merged and GitHub Pages must finish deploying before the
public site changes.** A successful earlier deployment does not publish this PR.
