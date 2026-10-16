# essentia-patient-journey-language-access

Microsite demo for Essentia + AMN patient journey language access workflows.

## Live site
https://coreyboltamn.github.io/essentia-patient-journey-language-access/

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
