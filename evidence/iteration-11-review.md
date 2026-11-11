<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 11 — targeted combat-helper edge coverage

## Method
Test-only iteration. The Node unit file extracts the actual targeting, impact, delivery and resolution helpers from index.html. Fixtures use fixed units, the current config, midpoint damage RNG and explicit animation recording. No independent combat loop, player automation, headless probe or runtime save injection was added.

## Results
20 checks passed in `iteration-11-combat-unit.tsv`:
- Retain a living target; replace a dead target with the nearest living foe; return null when none remain.
- Assassin initially prefers a surviving rear-slot foe, otherwise falls back to the front.
- Healing caps at max HP and cannot revive a dead target.
- Shield absorbs before HP, including fully absorbed damage.
- Death clears unreleased action/movement and records death animation; repeated impacts on dead targets do nothing.
- Windup/recovery resist hit-animation interruption; idle living targets can show hit.
- Melee hits at configured reach plus hysteresis, misses beyond it.
- Ranged release queues a projectile without immediate HP damage and ignores dead targets.
- Healer replaces a dead selected ally with the living weakest ally.
- A released single-target attack does not damage a primary target already dead.

## Limits
The tests call the real helpers directly; they do not establish full projectile flight, movement, actual animation playback, live timing interactions or exhaustive correctness. Damage distribution is not tested because RNG is deliberately fixed. No game source/config/assets changed, so no new browser regression was run; iteration 9 retains the latest source's pause/victory observations. Native keyboard focus, full reference-video fidelity, actual timeout fight and all four sprite-skill variants in a live encounter remain unassessed.
