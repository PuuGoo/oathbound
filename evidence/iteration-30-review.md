<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 30 — pause/resume endpoint comparison

## Method
Three prescribed one-shot-run.sh runs, seed617, fresh profiles. No source/config changes and no custom gameplay driver.
- baseline: stop360, log Enter Space wait:8.
- resumed: stop437, log Enter Space wait:2 KeyP wait:1.2 KeyP wait:8.
- exploratory aligned: same paused input but stop436.

Pause enters at step129 and resumes at step205. Both transition steps return without advancing combat; matching combat endpoints therefore require77 extra total steps, not76. Global state.t also advances on the transition into pause, so global time alone does not align battle steps.

## Observations
Baseline360 versus resumed437: every complete measured text row matches, including text content, position and measured contrast. This includes sampled HP/cooldown/log information. Both screenshots inspected and appear equivalent, but PNG SHA256 differs. No pixel equality claim. Exact cause of PNG-byte difference was not investigated.

Exploratory436 endpoint is one combat step short: measured text positions differ. Its truncated final state equals the baseline truncated final state, illustrating why those abbreviated rows cannot establish full state equality. Preserve it as an exploratory mismatch, not a passing comparison.

All three logs report uncaught0 with no reported console/crash/error/nonfinite/not_assessed rows. Comparison data and PNG digests retained in iteration-30-comparison.tsv.

## Limits
A single sampled endpoint with identical measured text is not exhaustive pause determinism or full internal state equality. No complete internal dump, full encounter outcome, native focus/blur or pixel comparison was performed. No new defect established and no game fix. Actual90-second timeout, four live skill variants, full reference-video motion/audio and human approval remain unassessed.
