<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 4 — explicit formation editing

## Change
Hero-card selection is now inspection/upgrade only. A separate `Xếp đội` button enables two-card swapping; `Xong xếp đội` leaves the mode and discards an unfinished swap. Starting combat exits edit mode. No combat stats, cooldowns, rewards or save format changed. Existing saved formations remain valid.

## Observed evidence
- `iteration-4-select.png/.tsv`: selected Bram, Sylra, Orren and Lumi in succession and upgraded each once. Cards remain in their original order; each selected hero reaches level 2, 230 gold / 72 essence remain. Before this change the same interaction would also swap cards.
- `iteration-4-arrange.png/.tsv`: explicit edit mode swaps Estrilda and Bram, with swapped positions visible and confirmation toast.
- `iteration-4-cancel.png/.tsv`: exit after selecting only Estrilda, then select Bram normally; formation unchanged and edit mode false.
- `iteration-4-save-formation` → `iteration-4-reload`: isolated browser profile retains intentional Estrilda/Bram swap across reload. Selecting Sylra then Lumi afterwards does not swap either card.
- `iteration-4-battle.png/.tsv`: changed formation starts real-time combat; arranging false and first hero is warden in observed battle snapshot.
- `iteration-4-small.png/.tsv`: 800×450, pending-swap prompt and finish button remain inside roster header. Text remains small because of the existing fixed-aspect layout.
- All seven gameplay runs report uncaught 0, no console/crash/error/nonfinite rows.
- JavaScript parse and whitespace diff check passed. Keep check reports zero Keep lines/pins.

## Scope
Changed index.html and brief controls/feature description; added only iteration-4 evidence and change-log entry. No README, Last Light, original images/video, dependency, publication or Git commit changes.

## Not assessed
Keyboard-only card navigation/focus retention, touch hardware and human usability sign-off. Chapter-2 completion, timeout and full video motion comparison remain open from earlier checks.

## Next local work
Check chapter-2 entry and enemy assassin behavior under actual real-time play, using the prescribed input runner and retained screenshots. Avoid adding unrelated mechanics.
