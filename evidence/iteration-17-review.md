<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 17 — details-scroll hypothesis not confirmed

Inspected the HP-details table's repeated DOM replacement. Tried a local change preserving scrollTop, then used the prescribed runner to click its summary at normal/small sizes and attempt a wheel event. The normal screenshot remained collapsed: the synthetic click did not establish native summary activation. Both runs report uncaught0 and no console/crash/error/nonfinite/not_assessed rows, but neither is a successful scroll-retention test.

The current table has only ten unit rows with compact line heights and a215px maximum container height; no need to scroll has been established. Therefore reverted only this iteration's speculative scrollTop changes using exact edits. No net game-source change remains from iteration17. Earlier source changes are preserved. Retained exploratory PNG/TSV files must not be cited as an open-table or scrolling pass.

Native summary activation/scroll usability remains NOT ASSESSED. No unrelated features or balance changes added. This is an investigation outcome, not a fixed defect.
