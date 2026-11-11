<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 7 — seeded replay verification

## Method
Two fresh-profile runs using the prescribed one-shot runner with identical explicit inputs:
`--seed 617 --log "Enter KeyU KeyU Space wait:12" --trace 480`.
Compared only deterministic observations (frame hashes, scene/state rows, save/ending/error rows), excluding wall-clock timing and browser metadata. No custom simulator, state injection, balance changes or robot player.

## Results
- 286 traced frame hashes per replay, all matching.
- Scene transitions, truncated state observations, save/ending/error rows match exactly.
- Final retained PNG files are byte-for-byte identical.
- Both seed-617 runs reach results at simulation step 507.
- A third fresh-profile run with seed 618 and the same inputs reaches results at step 486 and has different final PNG bytes. Both runs win, but the simulation timing changes.
- All three runs report uncaught 0, no crash/error/nonfinite/console rows.
- Compact comparison: `iteration-7-comparison.tsv`.

## Interpretation limits
This establishes reproducibility only for this input sequence and browser environment. The runner truncates state rows, so matching those does not prove every internal field is equal. Matching traced frame hashes provide additional visual evidence for the sampled interval, not proof across all platforms, all seeds or all inputs.

## Changes
Only iteration-7 evidence and changes.tsv; no gameplay code, config, assets or balance edits.

## Remaining useful work
Keyboard focus during UI rerender: hero-card and side-panel markup is replaced with innerHTML, potentially discarding focus after selecting/upgrading. Inspect and reproduce before deciding whether to change it. Timeout and all four skill variants in a campaign encounter remain unassessed.
