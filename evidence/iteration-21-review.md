<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 21 — synchronize selected stage and visible chapter

## Reproduced defect
With five stages already cleared in an isolated test profile, clicked chapter1 then pressed ArrowRight five times. `iteration-21-reproduced.png/.tsv` shows `chapter:0, selectedStage:5`: chapter1's map/header remains visible but the side panel is stage2-1 and no map node is selected.

Initial exploratory coordinate click (`iteration-21-before`) missed the chapter tab and did not reproduce the bug. The labeled-control run is the actual reproduction.

## Change
`selectStage` now sets the chapter from the selected stage using configured stagesPerChapter. It also rejects noninteger, negative, out-of-range, locked indices and selections outside active map play. No combat, reward, balance, save-format or asset changes.

## Verification
- Six direct actual-helper unit checks passed for cross-chapter selection, returning to chapter1, locked/invalid indices and scene/battle guards.
- Repeated the identical labeled-control input sequence after the fix: final state is `chapter:1, selectedStage:5`. Normal screenshot shows chapter2 header, chapter2 map and selected2-1 node matching the side panel.
- Same input at800×450 retains the matching selection, inspected screenshot. Text remains small; no mobile readability claim.
- All four exploratory/reproduction/final map logs report uncaught0; no console/crash/error/nonfinite/not_assessed rows. Unit output separately reports native keyboard behavior unassessed.
- An additional prescribed run follows the same selection sequence with Space: retained `iteration-21-battle.png/.tsv` shows active stage2-1 battle at3.5seconds, correct chapter2 setting and uncaught0; no error rows. It is a map-to-battle check, not a completed stage2-1 win.
- Reran all six current helper unit files together:14 UI+9 terminal+22 combat+13 animation+18 save+6 selection=82 checks passed. Keep check reports zero lines/pins.
- Whitespace diff check passed; existing LF-to-CRLF notice only.

## Limits
The prescribed runner exercises the game's keyboard listener with synthetic events. This establishes the game's selection/chapter logic and observed UI, not browser-native Tab/focus behavior. Other existing gaps remain: actual90-second encounter, all four lancer variants in live campaign and full reference-video motion/audio fidelity.
