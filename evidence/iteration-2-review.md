<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 2 — real-time automatic combat

## Implemented
- Removed the shared round queue and global action timer.
- Independent per-unit target, world position, movement, attack cooldown, skill cooldown, windup and recovery.
- Melee approach, ranged advance/retreat, target reacquisition, bounded ally separation.
- Estrilda display name and skill charge; original supplied sprite preserved.
- Ranged projectiles deliver damage/healing on arrival; melee checks reach at release.
- Cannot heal a dead target; death cancels unreleased windup. Already-released projectiles remain active while combat continues.
- Time/cooldown HUD, configurable 90-second limit, pause/resume freezing combat and animation clocks.
- Separate label pass to avoid other figures painting over HP/name text; procedural dead figures fade away.
- Campaign, rewards, level upgrades and evolution retained.

## Observed evidence
- `iteration-2-play.png`: moving teams, multiple projectiles/effects and independent cooldowns at 4.5 seconds.
- `iteration-2-charge.png`: Estrilda skill effect and Bram casting during the same engagement.
- `iteration-2-victory.png`: stage 1-1 victory, +160 gold / +60 essence / +2 shards.
- `iteration-2-evolution.png`: stage 1-1 and 1-2 cleared, level-3 Estrilda evolved, 4 shards and 180 gold spent, stage 1-3 unlocked.
- `iteration-2-pause.tsv`: clock value identical on pause entry and after waiting; resume run returns to play.
- `iteration-2-small.png`: 800×450 capture, no panel spill; text is small under fixed-aspect scaling.
- All retained run logs report uncaught 0 with no console/crash/error/nonfinite rows.
- JavaScript parse passed; all statically referenced tuning keys exist; embedded PNG bytes equal asset bytes.
- Keep check: zero Keep lines/pins; no player preferences invented.

## Not assessed
- Exact comparison against Estrilda_GamePlay.mp4: no video decoder available, video not watched.
- Confirmed running clip: none. Movement uses idle plus procedural bob/dust.
- All four skill variants activated in campaign; later chapter/boss balance; defeat/timeout; save reload in this iteration.
- Human fun, difficulty and visual sign-off.

## Preservation and authorization
- Local iteration completed under the user's request to decide and continue without questions.
- No commit, push, publication, dependency installation or source asset changes.
- Existing README, Last Light and root game brief left untouched. Uncommitted baseline means unknown earlier hand edits cannot be reliably distinguished; README was explicitly preserved.

## Next autonomous work
Targeted campaign regression: progression toward the first boss, defeat/retreat paths, and persisted-save reload. Fix verified defects within the existing brief; do not invent unrelated systems or claim video fidelity.
