<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 10 — terminal-state and reward unit coverage

## Method
No game source or balance changed. `iteration-10-terminal-unit.cjs` loads current config and extracts actual `living`, `totalStages`, `reward`, `updateBattle` and `finish` functions. It calls terminal checks with isolated dt=0 fixtures; living fixture units remain in recovery. Animation and persistence are explicit stubs. It is not a replacement simulator, browser probe, robot player or injected headless campaign run.

## Observed unit results
All 9 assertions passed:
- Before the configured timeout, battle remains active.
- Exactly at and beyond timeout, a surviving-vs-surviving battle loses with the timeout explanation.
- Timeout/defeat leave resources and campaign count untouched and do not call save.
- Ordinary defeat takes precedence over timeout wording.
- Enemy elimination takes precedence over timeout and produces victory.
- A first-clear finish call adds exactly the supplied battle reward, advances once and saves once. This is not a claim that finish is idempotent under repeated direct calls.
- Repeat victory awards configured repeat gold and no shards, without increasing clear count.
- Final clear reaches the configured total and completion explanation.
- Defeat emits a defeat event without campaign advancement.

## Not assessed
No new browser run was needed for this test-only iteration; iteration 9 retained the current source's gameplay regression. A real default 90-second fight, movement/action/projectile logic, simultaneous team-wipe design preference, native browser focus and full video fidelity remain NOT ASSESSED. Unit boundary coverage narrows the timeout uncertainty but does not erase the missing runtime observation.

## Scope
Only iteration-10 unit source/output, this review and changes.tsv. No config/source/assets/save modifications, installs, commits or publication.
