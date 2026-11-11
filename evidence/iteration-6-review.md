<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 6 — roster footer containment

## Change
Changed only the roster footer CSS: automatic-save status and keyboard controls now share one flex row with explicit gap, 18px line height and a smaller top margin. Removed the second stacked footer line that extended below the 800px logical canvas after explicit formation controls were added. No game rules, data or asset changes.

## Observed
- `iteration-6-map.png`: all controls and save status visible with lower margin.
- `iteration-6-arrange.png`: pending formation-edit state retains footer space.
- `iteration-6-battle.png`: combat plus contained footer.
- `iteration-6-small.png`: 800×450 capture includes complete footer; fixed-aspect text is still small, so this is containment verification, not a claim of mobile readability.
- `iteration-6-results.png`: stage 1-1 victory after layout-only change.
- Runner text measurement reports keyboard footer `inside`: bounds 576,692,897,707 at 1280×720; 360,433,561,442 at 800×450.
- All five logs: uncaught 0; no console/crash/error/nonfinite rows.
- Keep check: zero lines/pins. Whitespace diff check passed (Git emitted only its existing LF-to-CRLF notice).

## Limitations
Touch hardware, responsive reflow and accessibility reading order are not assessed. Footer containment does not solve the broader small-text limitation. No game balance changes or extra features.

## Next targeted check
Verify seeded combat reproducibility with the same explicit inputs and inspect the available sprite-skill variants in a sufficiently long campaign encounter. Avoid repeating the full campaign merely to accumulate evidence.
