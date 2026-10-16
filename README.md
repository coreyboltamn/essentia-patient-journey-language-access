# essentia-patient-journey-language-access

Microsite demo for Essentia + AMN patient journey language access workflows.

## Live site
https://coreyboltamn.github.io/essentia-patient-journey-language-access/

## Live-demo presentation checkpoints

**Demo** markers now sit directly on the patient journey spine. Select one to
choose its stage and reveal a compact **Live demo opportunity** beside the
timeline, without scrolling to another section. The standalone section 5 and
its action/interpreter tabs have been removed.
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

1. Enable **Presentation Mode** for screen sharing. It hides the hero and
   collapses the scenario cards and touchpoint lists, keeping timeline navigation
   and the compact demo cue together at laptop sizes. **Choose / change** always
   shows the current persona and opens the scenario choices; **Common touchpoints**
   opens supporting detail. Both are keyboard-accessible disclosure controls.
   Leaving Presentation Mode expands these controls again. Other stage, solution
   and stakeholder content remains available below; nothing is fixed-height.
2. Walk the spine or select a **Demo · technology** marker. At a checkpoint,
   expand **Presenter handoff** for the script, suggested duration, demonstration
   checklist and return cue. Multiple technologies at a stage appear as selectable
   chips; only the selected demo's details are shown.
3. Choose **Pause journey for live demo**. Autoplay stops, and an explicit
   handoff state asks you to switch to your own demo application. This page
   launches nothing, opens no external links and requires no credentials.
4. Use fictional data in a prepared demo environment. Scheduling and telehealth
   examples are configured illustrative workflows, not proof of live deployments.
   Use qualified interpretation for clinical decisions/consent and appropriate
   qualified review of translated content.
5. Switch back and choose **Return to journey**. The exact persona and stage
   stay unchanged, and focus stays on the local control without vertical scrolling.
   Autoplay remains paused until you explicitly start it again.
6. Back, Next, direct timeline/marker selection, scenario selection and Restart clear
   the handoff state. Restart retains its existing first-scenario/first-step
   behavior. Presentation Mode does not interrupt the handoff. Stages without
   checkpoints have no demo cue. Normal stage progression does not scroll the page.

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
The dependency-free tests cover the four technologies, stage/persona
eligibility, ASL and nonclinical AI safeguards, pause/return focus, autoplay,
navigation/reset/scenario cleanup, multiple-demo selection, missing DOM lookups,
obsolete-section removal and spine markup placement. There is no
build step or new dependency. Repeat the browser checks below when changing
the journey or checkpoint controls.

Validation of the spine-demo change: all **19 Node tests**, JavaScript syntax
and diff whitespace checks passed. Installed headless Chromium/ChromeDriver
passed **280 combinations** of four personas, seven stages, both presentation
modes and sizes 1366×768, 1440×900, 768×1024, 375×812 and 320×740.
Checks covered filtered markers/cues, unchanged solution-card counts, touchpoint
updates, page overflow, local pause/return focus and laptop viewport fit.
Native Enter/Space activation, multiple-demo chip selection, ASL details, real
3.5-second autoplay advance/pause/return and six navigation cleanup paths passed.
Normal-mode stage navigation and demo pause/return did not scroll vertically.

Laptop, ASL and mobile screenshots were captured; the laptop screenshot was
visually inspected (the image viewer limited further previews). There were no
application JavaScript errors. Google Fonts could not resolve, so checks used
fallback fonts; the existing absent favicon returned 404. The browser MCP
connection was unavailable, so checks used installed ChromeDriver directly.
Other browsers, physical devices, external demo apps and the public deployment
were not verified.

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
capabilities were added. The approved palette, journey visuals, stage mapping,
scenarios and stakeholder sections are retained.

### Connection regression checks

Run `node --test tests/connections.test.cjs` (Node 18+). All eight tests passed:
canonical names/IDs, all seven stages, representation of all eight solutions,
stage-specific descriptions across all four personas, ASL-safe variants,
virtual-visit filtering and AI review safeguards. `node --check app.js` and
`git diff --check` also passed. No dependencies or build tools were added.
CodeQL reported zero JavaScript alerts. Automated code review was unavailable
because of a model configuration error; a separate read-only review found no
significant issues.

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
lets header/journey controls wrap and stacks touchpoint cards on mobile.
Only the timeline intentionally scrolls sideways.

### Regression checks

This is a static HTML/CSS/JavaScript site using Node's built-in test runner,
with no build dependencies. Serve the repository with a static server and check
under `/essentia-patient-journey-language-access/`, not just at `/`.
To repeat the checks in a browser:

1. Check 1366×768 and 1440×900 laptops, plus widths 768, 375 and 320 pixels.
   In Presentation Mode, the spine, navigation and active demo controls should
   fit together without scrolling. Cards and controls should fit on mobile;
   only the timeline should scroll horizontally.
2. Select each of the four scenarios and all seven timeline steps. Check the
   patient details, highlighted touchpoints, and marker/line alignment, including
   the first and last steps.
3. Select each demo marker with Enter/Space; verify stage/persona filters,
   local details and pause/return focus. Joanna must see qualified ASL VRI,
   never audio OPI or Jaide as ASL substitutes.
4. Exercise Back, Next, Restart Journey, all stakeholder buttons, and Auto-play
   followed by Pause. Restart should return to the first scenario and step.
5. Expand/collapse **Choose / change**, **Common touchpoints** and **Presenter
   handoff** using the keyboard. Detail remains available in both modes.
6. Pause autoplay for a demo, switch away manually, and return: same persona
   and stage, no vertical scroll and no automatic autoplay resume. Navigation,
   scenario changes and Restart must clear the paused state and old details.

### Deployment and limitations

Pages run `38933860419` successfully deployed `b0c68667417440d9c8bac12eda4b6b6dd2baad2a`
from `main`; its deployment log confirms the public URL above. No Pages settings
were changed. Direct public-site access failed DNS resolution in the repair
environment, so its live appearance and asset contents could not be verified.
Local checks used the system font fallback when Google Fonts was unavailable;
other browsers and physical devices have not been checked.

**The repair must be merged and GitHub Pages must finish deploying before the
public site changes.** A successful earlier deployment does not publish this PR.
