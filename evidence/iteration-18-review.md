<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 18 — live duration and skill-variant investigation

## Method
Prescribed one-shot runner with seed617 and explicit visible inputs. An isolated profile (`iteration-18-profile.txt`) carries only legitimately earned test progress. No balance edits, runtime state injection or custom player. User browser data untouched. No game source changes.

## Observed
- Fresh level1 party wins1-1 at global step553 (about9.1 battle seconds).
- Same unupgraded party advances through1-2,1-3 and1-4; results at global steps1382 in the two-stage run,765 in the fresh reload run, and789 in the next run respectively. First-clear count reaches4.
- Late1-4 replay screenshot `iteration-18-fourth-skill.png` shows battle12.9s with Estrilda/Bram/Orren down, Sylra/Lumi alive, one enemy alive. It does NOT show a fourth lancer skill, despite the exploratory filename.
- Earned-resource support upgrades via visible controls permit a repeat1-4 victory, awarding85 gold/33 essence/0 shards. This also ends before the requested late capture; no fourth-variant observation is established by that result screenshot.
- Six runs report uncaught0; no console/crash/error/nonfinite/not_assessed rows in the first five logs, and no console/crash/error/nonfinite rows in the support run.

## Outcome and limits
A longer team fight does not guarantee Estrilda survives long enough to show all four visual variants. This investigation did not close that gap. Do not alter balance just to force a desired screenshot or cite the misleading exploratory filename as proof. The level1 wins through1-4 are a pacing observation, not a human balance verdict or an instruction to rebalance. No further full-campaign replay is warranted for this question.

Native keyboard behavior, actual90-second fight, full-video motion/audio, and four live lancer variants remain NOT ASSESSED. Existing crop/animation helper units remain narrower evidence.
