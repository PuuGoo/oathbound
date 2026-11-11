<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 9 — native control key ownership

## Change
Global keydown now leaves Space/Enter to native focused buttons, details summaries and links, instead of also routing them into scene shortcuts. Editable fields own their input keys. Outside these controls, existing global game shortcuts remain unchanged; P still pauses when a button has focus. No combat/config/save changes.

## Evidence
- `iteration-9-ui-unit.cjs` extracts the actual two UI helpers from index.html and runs them against small DOM doubles using Node assertions. It is not a browser robot, simulation or custom headless play.
- 12 unit checks passed: activation ownership, global shortcut availability, editing-field isolation, identity/ID focus restoration, disabled/hidden fallback, connected/no-focus handling, overlay non-interference and battle-summary restoration.
- `iteration-9-play`: prescribed runner reached pause at step 197, retained screenshot inspected. No broken pause display observed.
- `iteration-9-results`: same seed/input regression reaches victory at step 507.
- Both gameplay runs: uncaught 0; no console/crash/error/nonfinite/not_assessed rows. Unit output explicitly reports native browser behavior not assessed.
- Whitespace diff check passed, with existing Git LF-to-CRLF notice.

## Limits
DOM-double unit tests establish helper decisions, not real browser focus behavior, native Space/Enter default activation, Tab order or screen-reader operation. Those remain NOT ASSESSED. This improves coverage of iteration 8's helper but does not retrospectively turn that iteration into a native keyboard pass. No HTML layout or styling changed this iteration; no new small-window claim.

## Next useful work
Review terminal battle conditions and establish isolated unit coverage for victory/defeat/timeout ordering and rewards, without changing balance or injecting campaign state into a headless run. Default timeout is still not observed in an actual 90-second fight.
