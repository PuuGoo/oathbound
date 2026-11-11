<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 12 — health-bar layering

## Change
Moved HP bars and shield strokes out of the per-figure drawing loop into a separate pass after every character. They keep their existing position, dimensions and team colors. Numeric/name labels remain in their later pass. This prevents foreground character bodies covering an earlier character's health bar. No combat/config/save changes.

## Observed
- `iteration-12-battle.png`: seed 617, Estrilda level 3, battle at 3.5 seconds. Compared with iteration-8-battle at the same moment: the orange enemy bar at the central Estrilda/enemy overlap is now visible rather than covered by Estrilda; Bram's blue bar is also visible over foreground art. The choice deliberately favors status legibility over strict character depth.
- `iteration-12-small.png`: same moment at 800×450. Bars and full layout remain within the viewport; small text remains an unresolved fixed-aspect limitation.
- `iteration-12-skill.png`: retained earlier combat snapshot at 2.5 battle seconds; no specific skill-variant claim.
- All three prescribed runner logs: uncaught 0; no console/crash/error/nonfinite/not_assessed rows.
- Whitespace diff check passed, with Git's existing LF-to-CRLF notice.

## Limits
Bars can still overlap each other when units converge; projectile/effect overlays intentionally draw later. The existing numeric-label placement is heuristic and can move values away from their character, so this change does not claim perfect crowded-scene readability. No native keyboard pass, actual timeout fight, full-video motion comparison or human visual sign-off is established.
