<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 26 — progression spending boundaries

## Scope and results
Added 12 named direct checks of actual `fresh`, `upgradeCost`, `upgrade` and `evolve` helpers. All pass; no game source/config/balance/asset changes. The storage write and toast are recorders, not native browser persistence evidence.

Covered exact-cost upgrade, either currency one short, maximum level, last allowed upgrade, selected hero identity after formation reversal, exact evolution requirements, level/gold/shard rejection, repeat evolution rejection, and scene/mode restrictions. Rejection checks compare the complete progress snapshot and require zero save calls. Successful actions require the expected resource/hero change and one save call.

Retained source/output: `iteration-26-progression-unit.cjs` and `iteration-26-progression-unit.tsv`. Previous eight-suite combined run passed 96 named cases during iteration25; only these 12 new cases were run this iteration. There are now 108 named cases across nine files, not a fresh combined108 pass.

## Timeout investigation
Read the prescribed runner options: no tuning override option exists. Did not alter source/config or make a modified copy to force a timeout. No new runtime capture this iteration. Actual default90-second timeout remains NOT ASSESSED. The run skill was consulted; the existing prescribed repository runner remains the testing route.

## Limits
Browser upgrade/evolution presentation was not rerun; native keyboard/focus/IME, persistence quota failures, long-term balance, full encounter timing and four live lancer skill variants remain outside these direct helper checks. No new defect established, no speculative source change.
