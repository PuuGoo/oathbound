<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 20 — keep identity and numeric HP together

## Change
Replaced independently displaced name/HP labels with one two-line badge per living unit. The badge stays near that unit's health bar; a leader connects it when displaced. A bounded candidate search favors fewer badge overlaps, then shorter displacement. Badges render after projectiles/effects so floating damage cannot overwrite their text. Health-bar team colors, combat rules, tuning and assets are unchanged.

## Observed
- Initial normal/small snapshots revealed a damage number obscuring an enemy name; moved the badge pass after effects and captured the final implementation again.
- `iteration-20-final.png`: same seed617/inputs/battle3.5s as earlier evidence. Bram375/735, Estrilda696/800 and central enemy335/485 now each have their own adjacent name/value pair. Displaced Bram badge has a leader to its bar. The enemy name remains visible rather than covered by −79.
- `iteration-20-final-small.png`: same arrangement at800×450, badges remain inside the arena. This is containment, not mobile readability; text is still small.
- `iteration-20-final-results`: victory at step507, unchanged from prior seed617 regression.
- Six prescribed runs (three initial, three final) report uncaught0. No console/crash/error/nonfinite/not_assessed rows found in the checked logs.
- Whitespace diff check passed with the existing Git LF-to-CRLF notice.

## Trade-offs and limits
Badges can now cover parts of character feet or low effects; this favors explicit status association. Candidate placement is heuristic, not a guaranteed global collision-free layout, and can shift as units move or die. No claim of fully readable crowding at all moments, motion stability, accessibility conformance or human visual approval. Native keyboard, full video motion/audio, actual timeout fight and all four skill variants in live campaign remain NOT ASSESSED. No balance changes.
