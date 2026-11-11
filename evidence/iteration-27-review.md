<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 27 — pause/retreat investigation (incomplete)

## Intended check
Observe an active battle, pause, retreat, then re-enter the same stage; check fresh battle state and unchanged campaign resources. Used only the prescribed one-shot-run.sh, seed617, fresh isolated profiles. No source/config/balance/asset edits.

## Actual observations
Ten retained runs completed with uncaught0 and no reported console/crash/error/nonfinite/not_assessed rows. These clean runtime logs do NOT mean the intended interaction succeeded.

- Initial pause run: scene changes to pause at step189; state.t remains3.15 through the final step252. Estrilda's truncated state shows484/588HP before and after. Inspected pause screenshot shows the overlay and visible resume/retreat controls.
- All nine runs intended to exercise retreat or re-entry remain in pause. No successful return-to-map or re-entry occurred. Files named retreat/reenter are attempted inputs, NOT evidence that those actions passed.
- Tried full text label, screenshot-derived coordinate735,420, longer1.2-second waits, a traced frame run, and ASCII label fragmentLUI. None established activation. Do not repeat these attempts without a new hypothesis grounded in evidence.

## Correction of provisional explanation
An interim user-visible update attributed the missed click to render cadence. Longer waits and tracing did not resolve it; that attribution was not established and is withdrawn. Root cause remains undetermined: no confirmed game defect and no confirmed driver defect. Do not modify the game or the verification tool on this evidence alone.

## Limits / next useful investigation
Retreat button activation, resource preservation on this route, fresh HP/timers/projectiles after re-entry are NOT ASSESSED this iteration. Native mouse/keyboard interaction remains unassessed by synthetic-event runs. No full combined unit rerun. No new gameplay fix.

Preserve all tenPNG/TSV pairs; pause.png is the inspected screenshot. This investigation adds evidence of a blocked route, not ten successful feature tests. Earlier campaign/retreat observations remain historical and do not resolve this current failed interaction route.
