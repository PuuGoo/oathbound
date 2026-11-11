<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 28 — retreat and re-entry observed

## New evidence / method
Read the prescribed driver's clickText helper. It chooses an exact label before a partial match; a short LUI fragment can also match the underlying sidePause label. Based on this concrete ambiguity, used the full RÚT_LUI label after a1.2-second wait following KeyP. No custom driver, source edits, config edits or dependency installation.

Two prescribed one-shot-run.sh runs, seed617 and fresh isolated profiles:
- exact-retreat: `Enter Space wait:3 KeyP wait:1.2 click:text=RÚT_LUI wait:1.2`
- reenter: same sequence followed by Space.

## Observed
Both runs report uncaught0 and no console/crash/error/nonfinite/not_assessed rows.
- Pause step189: Estrilda484/588HP, state.t3.15.
- Exact-label click returns to play/map at step265 with battle:null; final map step370 remains stage1-1, cleared0.
- Inspected map screenshot shows450gold/120essence/0shards and0/10 campaign clears, unchanged from fresh progress.
- Re-entry final step374 is play/battle, same stage, Estrilda588/588HP. Inspected screenshot shows0.6/90seconds, all ten units at full HP, fresh entry log and normal early skill cooldowns. Resources still450/120/0.

## Interpretation and correction
Iteration27's current blocked route is resolved for this exact full-label-plus-wait input sequence. No game fix was necessary. Short-label ambiguity is supported by source; it is not a complete root-cause proof for all prior coordinate/full-label attempts. Do not claim waiting alone fixed it, that all native clicks work, or that the tool has a confirmed defect. Preserve the failed iteration27 runs rather than relabeling them as passes.

## Limits
The runner truncates state rows. Exact instantaneous new-battle projectile/effect array contents and every unit's internal clock were not independently dumped or proven by these screenshots; source initializes fresh arrays, while runtime evidence here establishes map battle:null and visibly fresh HP/time/log/cooldowns after re-entry. Native input/focus, actual90-second timeout, all four live skill variants and full reference-video fidelity remain unassessed. No new unit suite run.
