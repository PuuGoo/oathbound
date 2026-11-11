<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 29 — small-window pause and retreat

## Method
Two prescribed one-shot-run.sh runs at800x450, seed617, fresh isolated profiles. No source/config/balance/asset changes.
- Pause: Enter Space wait:3 KeyP wait:1.2.
- Retreat: same sequence then click:text=RÚT_LUI wait:1.2.

## Observed
Both logs report measured800x450 and uncaught0, with no reported console/crash/error/nonfinite/not_assessed rows. Inspected both retained screenshots.
- Pause overlay and both resume/retreat controls fit within the viewport. The pause capture ends at step294.
- Exact-label retreat returns to play/map at step265 with battle:null; final step370 remains on stage1-1, cleared0.
- Map screenshot shows unchanged450gold/120essence/0shards. Side panel and roster footer remain contained.

## Limits
Label-based synthetic activation targets a DOM control directly; this does not prove native pointer hit testing, touch usability or native keyboard navigation. Small text remains small due to fixed-aspect scaling; containment is not a mobile-readability pass. No re-entry capture or unit rerun this iteration. Actual90-second timeout, four live lancer skill variants, full video motion/audio fidelity and human visual approval remain unassessed. No new defect established; no speculative UI change.
