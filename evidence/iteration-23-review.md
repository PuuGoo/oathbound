<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 23 — discard pending input on focus loss

## Defect and fix
The previous blur handler cleared held keys (`down`) but not pending presses (`hit`). If P was queued before focus loss, automatic pause changed the scene to pause, then the next update consumed that same P and resumed. Extracted `handleFocusLoss()` and clear both input sets before automatically pausing an active battle. Map/title/results scenes are otherwise unchanged. No combat tuning, resources, save format or assets changed.

## Unit evidence
`iteration-23-focus-loss-unit.cjs` uses the actual current update and focus-loss functions with isolated sets. First reproduces the old handler's pending-P behavior at the function level, then passes four assertions: both sets clear, pending P cannot undo auto-pause, map commands are discarded, and existing pause/results/title scenes are not resumed.

This is not a native OS/browser focus-switch reproduction. Unit output explicitly reports that scope NOT ASSESSED.

## Runtime regression
Prescribed runner, seed617, fresh profiles:
- `iteration-23-pause`: pause at step197, game time remains3.28 through step290. Retained screenshot inspected.
- `iteration-23-resume`: intentional second P resumes at step261; game time advances to5.83 by step414.
- Both logs uncaught0, no console/crash/error/nonfinite/not_assessed rows. These check ordinary pause/resume, not native blur timing.
- Whitespace diff check passes with existing Git LF-to-CRLF notice.

## Limits
Native Alt-Tab/focus-loss timing, native keyboard navigation, actual90-second encounter, all four live skill variants, and full-video motion/audio fidelity remain unassessed. After the targeted checks, reran all seven current unit files together:14 UI+9 terminal+22 combat+13 animation+18 save+6 selection+4 focus-loss=86 checks passed. Combined stdout explicitly retained the native/runtime gaps; passing helpers do not close those gaps.
