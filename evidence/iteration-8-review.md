<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 8 — focus retention on rebuilt panels

## Source finding and change
`renderUI()` replaces hero cards and the side panel using `innerHTML`. A focused descendant is therefore removed, with no existing focus restoration. Added a small restoration helper which remembers the actual active descendant before replacement and resolves its successor by hero identity, control ID, or the battle details summary. It restores only disconnected controls while the play scene is active, skips hidden/disabled targets, prevents scroll, and falls back to the selected hero card on the map when an upgrade becomes unavailable. It does not steal focus from controls outside the replaced panels or from pause/result/title overlays.

No stats, timing, rewards, save schema, art or balance changed.

## Runtime observations
Prescribed one-shot runner only, explicit input logs, fresh profiles and seed 617:
- `iteration-8-map`: selected/upgraded Bram to level 2, explicitly swapped Estrilda and Sylra, exited arrangement with Sylra selected. Retained screenshot shows the intended order and intact controls.
- `iteration-8-small`: two Estrilda upgrades, level 3 shown at 800×450, footer contained. Text remains small; this does not establish mobile readability.
- `iteration-8-battle`: active real-time combat at 3.5 seconds, retained screenshot inspected.
- `iteration-8-results`: stage 1-1 victory still reaches results at step 507, matching the prior seed-617 regression sequence.
- All four logs report uncaught 0 and no console/crash/error/nonfinite/not_assessed rows.
- Inline JavaScript parse and whitespace checks passed; Git printed its existing LF-to-CRLF notice.
- Keep check: zero Keep lines/pins.

## NOT ASSESSED — focus behavior in a real keyboard session
The existing driver dispatches synthetic mouse/key events; it does not call focus or implement the browser's native Tab behavior. Therefore these runs cover interface/gameplay regression, not the new restoration branch itself. The source-level removal defect is identified, but neither a retained native-focus reproduction nor a native keyboard pass is claimed. No custom headless probe or robot was written to bypass the prescribed verification restrictions. Keyboard-only navigation, disabled-upgrade fallback, summary focus during periodic refresh and overlay focus management still require an interactive browser check.

## Next scoped inspection
Inspect native button activation versus global Space/Enter shortcuts: the current keydown handler prevents Space defaults even when a button is focused. This is source evidence of conflicting input routes; native keyboard interaction remains unobserved. A quick animation-timing inspection found default skill length 6/12 = 0.5 seconds versus windup + recovery 0.32 + 0.25 = 0.57 seconds, so there is no default next-action interruption to fix on that basis. Timeout, all four variants in a real encounter and full-video motion/audio fidelity remain unassessed.
