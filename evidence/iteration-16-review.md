<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 16 — distinguish shield blocks from zero damage

## Change
Actual impact feedback now retains the absorbed shield amount alongside HP damage. A fully absorbed non-healing impact displays `CHẶN` instead of `−0`. Partial blocks still show real HP loss. Damage, shield consumption, timing and other gameplay rules are unchanged. No tuning/asset changes.

## Verification
- Extended actual combat-helper units with full/partial absorption-feedback assertions. Current output retained as `iteration-16-combat-unit.tsv`: 22 checks passed; historical iteration-11 output left unchanged.
- Prescribed runner seed617, Estrilda upgraded twice, active fight at3.5s: `iteration-16-block.png` visibly reads CHẶN where the same moment previously showed −0. HP values match the prior capture (e.g. Estrilda696/800), consistent with presentation-only change.
- Same moment at800×450 retained and inspected. CHẶN fits its badge; small-window text remains small.
- Both initial browser logs: uncaught0; no console/crash/error/nonfinite/not_assessed rows. A final victory regression (`iteration-16-results`) also reports uncaught0 and reaches results at step507, unchanged from the earlier seed617 sequence.
- Reran all five current unit files: 14 UI +9 terminal +22 combat +13 animation +18 save =76 checks passed. Each retains explicit runtime limitations. Keep check reports zero lines/pins.
- Whitespace diff check passed, Git LF-to-CRLF notice only.

## Limits
Only the sampled block moment is visually established; no claim that every impact badge remains readable under all crowding. Helper doubles do not prove full flight/live timing. Native keyboard interaction, full video fidelity, actual timeout fight and all sprite-skill variants during a live encounter remain NOT ASSESSED.
