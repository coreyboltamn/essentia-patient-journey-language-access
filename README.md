# essentia-patient-journey-language-access

Microsite demo for Essentia + AMN patient journey language access workflows.

## Live site
https://coreyboltamn.github.io/essentia-patient-journey-language-access/

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
