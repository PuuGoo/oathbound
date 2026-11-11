<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 25 — released projectile boundaries

## Scope
Added seven single-step checks of actual `updateBattle` and `impact` extracted from index.html. No game source, config, balance, assets or save edits. No new browser driver or alternate combat loop. Each test invokes the real update once with units held in recovery and living sentinels to keep terminal conditions inactive.

## Results
All seven checks pass:
- Released projectile lands after source death while the encounter continues.
- Dead destination cancels projectile without damage/effects.
- Exact one-step arrival applies damage and removes the projectile.
- Just beyond arrival advances without early damage.
- Homing uses the destination's current position.
- Healing caps HP on arrival.
- A later projectile drops after an earlier arrival kills the shared destination.

Initial test execution failed with `ReferenceError: constrainUnit is not defined`: the test's two allied fixtures shared a position, activating an unrelated separation branch whose dependency was not extracted. Separated those fixtures; no game change was needed. This was a test harness defect, not a game defect or test-first game-fix claim.

Retained targeted output: `iteration-25-projectile-unit.tsv`.
Retained fresh combined run: `iteration-25-combined-unit.tsv`; all eight suites pass, totaling 96 named test cases (17 UI + 9 terminal + 22 combat + 13 animation + 18 save + 6 selection + 4 focus loss + 7 projectile). Named cases may contain multiple assertions; 96 is a case count, not an exact assertion count.

## Limits
No browser run this test-only iteration. Browser projectile rendering, native input/focus/IME, full-encounter timing, actual 90-second timeout and all four live lancer skill variants remain NOT ASSESSED here. Midpoint damage RNG and fixed recovery fixtures do not establish exhaustive action/movement/projectile ordering or mathematical simultaneity. The preliminary UI-refresh inspection established no new defect; no speculative scroll/focus change was made.
