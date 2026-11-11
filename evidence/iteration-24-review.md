<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 24 — reserve browser/modifier shortcuts

## Source defect and fix
The global game key listener previously accepted Ctrl/Alt/Meta combinations as ordinary game commands. A Ctrl+U keydown could therefore queue a hero upgrade while also invoking a browser command. Added a guard in the existing ownership helper for modifier combinations, composing input and already-prevented events. Unmodified game shortcuts and existing focused-control ownership remain unchanged. No layout, combat, tuning, save-format or asset edits.

## Test-first evidence
Added three focused helper checks to the existing UI unit file. Before the source fix, the first modifier assertion failed with `false !== true` (exit1). After the guard, all17 current UI checks pass; retained output is iteration-24-ui-unit.tsv. Historical iteration-9/15 outputs were not overwritten.

## Browser regression
Prescribed runner, seed617 and fresh isolated profiles:
- iteration-24-upgrade: unmodified Enter/U/U still raises Estrilda to level3; inspected screenshot shows328gold/93essence, matching prior runs.
- iteration-24-results: same unmodified input sequence still wins at step507.
- Both logs report uncaught0, with no console/crash/error/nonfinite/not_assessed rows.
- Whitespace check passed; existing Git LF-to-CRLF notice only.

## Limits
The runner does not faithfully model browser modifier defaults, so native Ctrl+U/Alt shortcuts and IME interaction remain NOT ASSESSED. The unit tests prove helper decisions, not browser-native behavior. Actual90-second combat, all four skill variants in a live encounter and full reference-video motion/audio remain unassessed. Three new assertions bring the current test files to89 total; only the17-check UI file was rerun in this iteration, not a combined89-check pass.
