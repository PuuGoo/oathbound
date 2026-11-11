<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 14 — save validation and storage-failure units

## Method
Loaded the actual fresh/load/save functions with current config. Storage is an in-memory double; no real browser profile or user save was accessed. No custom browser probe, robot player or substitute game loop. No game source/config changes.

## Results
18 checks passed in `iteration-14-save-unit.tsv`:
- Missing, malformed, unreadable and wrong-version saves return fresh progress.
- Valid resources, levels, evolution and formation survive loading.
- Duplicate/out-of-range/fractional formation identities, wrong array lengths and null heroes are rejected safely.
- Negative/non-numeric resource fields, invalid cleared counts, invalid levels and non-boolean evolution are rejected.
- Fresh saves do not share mutable hero objects.
- Successful save serializes progress, clears the failure flag and requests UI refresh.
- Failed writes preserve live session progress and the previous stored value, set the failure flag and request UI refresh.
- A later successful write clears a temporary failure flag.

## Limits
These results establish behavior with storage doubles, not native quota/private-mode behavior or recovery UI. Invalid saves currently fall back to fresh in-memory progress; no claim of recovering corrupt progress is made. No new browser run for this test-only iteration; latest source was observed in iteration 12. No actual user save was read or changed.

Native keyboard interaction, actual timeout fight, all sprite variants in live combat and complete video motion/audio fidelity remain NOT ASSESSED. No newly reproduced save defect justified a source change.
