<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 13 — animation boundary unit coverage

## Method
Test-only iteration. Directly loaded actual `lancerClip`, `playUnitAnimation`, `advanceAnimations` and `drawLancerSprite` functions with current config. A tiny Canvas-call recorder verifies draw arguments; it is not an image renderer, browser probe, substitute game loop or robot player.

## Results
13 unit checks passed:
- Idle wraps after the configured frame count; negative render time starts at frame zero.
- Attack/hit/death/four skill row render requests clamp at their last frame.
- All configured crops/anchors remain inside the supplied 1086×1448 sheet.
- Draw arguments use the configured row/anchor and facing transform.
- Unavailable sprite produces no draw call and returns false.
- Starting an animation resets time and emits the expected event.
- Death cannot be interrupted by attack/hit/skill requests.
- Non-lancer figures do not enter lancer sprite clips.
- One-shot clips return to idle at their configured duration boundary.
- Death clock can advance while retaining its terminal clip.
- No-battle animation advance is safe.

## Limits
These are helper/crop assertions, not visual fidelity evidence. No game source, balance or asset changed; no new browser run this test-only iteration. All four skill variants during a live fight, native keyboard behavior, actual timeout encounter and full video motion/audio remain NOT ASSESSED. Timing/crop metadata remain inferred from the supplied sheet, not authoritative source metadata.
