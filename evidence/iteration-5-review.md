<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 5 — complete campaign regression

## Method
Prescribed one-shot-run.sh with explicit input logs, isolated browser profile, no state injection, balance edits, custom simulator or robot player. The profile persisted earned progress between browser runs. User's own browser/save untouched.

## Observed
- Chapter 1 cleared with evolved Estrilda level 7, Bram level 4, Sylra level 3 and the other two at level 1; chapter 2 selected automatically after boss victory.
- Chapter-2 warm background, stage names and enemy roster shown correctly (`iteration-5-chapter2-map`).
- Stage 2-1 includes assassin and shaman; captured moving combat at 4.5 seconds (`iteration-5-assassin`). Assassin's backline preference is present in source; screenshot alone is insufficient to prove every target/range decision. Exhaustive targeting correctness NOT ASSESSED.
- Sequential wins at 2-1, 2-2, 2-3 and 2-4 with no additional upgrades. These observations expose a possible pressure spike at bosses, not a human balance verdict.
- Return to chapter 1 and repeat 1-1: reward exactly +65 gold, +25 essence, +0 shards; clear count stays 6 (`iteration-5-repeat`).
- Original party lost final boss 2-5 in about 8.1 battle seconds; progress stayed 9.
- Additional earned-resource upgrades/evolutions via visible hero selection enabled final victory (`iteration-5-final-upgraded`). Completion screen reads 'Bình minh đã trở lại!', rewards +304 gold / +114 essence / +2 shards, score 10.
- Reload retained 10/10 completed stages and selected valid stage index 9 (`iteration-5-final-reload`). No out-of-range next-stage crash observed.
- All 11 run logs report uncaught 0; no console/crash/error/nonfinite/not_assessed error rows found.

## Test caveat
The exploratory file named `iteration-5-assassin-approach` remained on stage 2-5: its coordinate click did not select a different stage. Do not cite it as a separate stage-2-1 approach test. The earlier `iteration-5-assassin` capture actually is stage 2-1.

## Changes
Only iteration-5 evidence and change log. No game code, config, balance or assets changed.

## Still open
Timeout path; exhaustive targeting/death/projectile edge cases; human fun/visual approval; all four Estrilda skill variants in an actual fight; full video motion/audio fidelity. At 1280×720 the roster footer can reach the lower edge after the new formation header: next local pass should restore vertical spacing rather than add features.
