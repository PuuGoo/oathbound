<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 15 — covered-control isolation

## Source finding and change
Title, pause and results are HTML overlays rather than native modal dialogs. Previously the underlying top/chapter/battle/side/roster regions stayed eligible for native focus while covered. Added `syncBackgroundInteraction()` to set those five regions inert outside the play scene and restore interaction on play. The overlay buttons and native reset dialog are outside those regions. No layout, combat, tuning or save format change.

## Verification
Extended the existing actual-helper unit file (`iteration-9-ui-unit.cjs`) with two assertions for the five regions across title/pause/results/figures and restored play. Historical iteration-9 TSV remains unchanged; current 14-check output is retained as `iteration-15-ui-unit.tsv`. All 14 passed.

Prescribed runner, seed617:
- `iteration-15-pause`: reaches pause at step197; state time stays3.28 through step290.
- `iteration-15-resume`: visible resume button returns to active combat at step261, continuing through step414.
- `iteration-15-map`: victory at step507, return to next stage at step737, then select/upgrade Bram. Retained screenshot inspected: stage1-2, Bram level2 and controls intact.
- All three runs report uncaught0; no console/crash/error/nonfinite/not_assessed rows.
- Whitespace check passed; Git's existing LF-to-CRLF notice only.

## Limits
Synthetic driver clicks do not prove native inert Tab/pointer blocking or keyboard focus order. Unit property assertions establish intended state, not browser accessibility conformance. No focus trap or full dialog-navigation claim is made. Native Tab/default activation, actual timeout fight, all skill variants during live combat and full-video motion/audio remain NOT ASSESSED. No layout/style change, so no new small-window claim this iteration.
