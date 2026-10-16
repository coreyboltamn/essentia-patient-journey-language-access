# essentia-patient-journey-language-access

Microsite demo for Essentia + AMN patient journey language access workflows.

## Live site
https://coreyboltamn.github.io/essentia-patient-journey-language-access/

## Screen-sharing presentations

The live-demo callout, demo markers and presenter handoff controls have been
removed for a cleaner shared-screen experience. Scenario selection, timeline
navigation, stage details, AMN connections and stakeholders remain available.

### Presenter workflow

1. Enable **Presentation Mode** for screen sharing. It hides the hero and
   collapses the scenario cards and touchpoint lists, keeping timeline navigation
   compact at laptop sizes. **Choose / change** always
   shows the current persona and opens the scenario choices; **Common touchpoints**
   opens supporting detail. Both are keyboard-accessible disclosure controls.
   Leaving Presentation Mode expands these controls again. Other stage, solution
   and stakeholder content remains available below; nothing is fixed-height.
2. Walk the spine or use **Back** and **Next** to explore each stage.
   **Auto-play** advances the journey; **Pause** stops it.
3. Scenario selection, direct timeline selection, Back, Next and Restart stop
   autoplay. Restart returns to the first scenario and first step.
   Normal stage progression does not scroll the page.

Use fictional data for any separate demonstration. Scheduling and telehealth
examples are configured illustrative workflows, not proof of live deployments.
Use qualified interpretation for clinical decisions/consent and appropriate
qualified review of translated content. AI/live speech and audio-only telephony
are not ASL substitutes. Do not put credentials, PHI or invented demo URLs in this site.

### Journey regression checks

Run `node --test tests/*.test.cjs` (Node 18+) and `node --check app.js`.
The dependency-free tests cover callout removal, scenario/stage navigation,
autoplay, restart, stakeholder selection, presentation-mode disclosures, AMN
connection mapping, ASL and nonclinical AI safeguards. There is no build step.
Repeat the browser checks below when changing the journey controls.

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
   In Presentation Mode, the spine and navigation should
   fit together without scrolling. Cards and controls should fit on mobile;
   only the timeline should scroll horizontally.
2. Select each of the four scenarios and all seven timeline steps. Check the
   patient details, highlighted touchpoints, and marker/line alignment, including
   the first and last steps.
3. Confirm no live-demo callout, demo markers or presenter handoff controls appear.
   Joanna must see qualified ASL VRI, never audio OPI or Jaide as ASL substitutes.
4. Exercise Back, Next, Restart Journey, all stakeholder buttons, and Auto-play
   followed by Pause. Restart should return to the first scenario and step.
5. Expand/collapse **Choose / change** and **Common touchpoints** using the
   keyboard. Detail remains available in both modes.
6. Confirm no console errors, layout gaps or orphaned callout borders remain.

### Deployment and limitations

Pages run `38933860419` successfully deployed `b0c68667417440d9c8bac12eda4b6b6dd2baad2a`
from `main`; its deployment log confirms the public URL above. No Pages settings
were changed. Direct public-site access failed DNS resolution in the repair
environment, so its live appearance and asset contents could not be verified.
Local checks used the system font fallback when Google Fonts was unavailable;
other browsers and physical devices have not been checked.

**The repair must be merged and GitHub Pages must finish deploying before the
public site changes.** A successful earlier deployment does not publish this PR.
