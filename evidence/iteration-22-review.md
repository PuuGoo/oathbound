<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 22 — backward campaign selection

## Change
Added ArrowLeft to select the previous unlocked stage, clamped at stage0. Existing selectStage keeps visible chapter synchronized. Updated the prototype brief's Controls to document both arrows. No combat, reward, balance, save-format or asset changes. No new layout/styling.

## Observed
Two prescribed runner executions with the isolated test profile:
- From stage2-1, ArrowLeft selects1-5, updates chapter1 and displays the selected boss node. Screenshot inspected; header/map/side panel match.
- Repeated ArrowLeft beyond the first stage stays at stage1-1 (zero-based selectedStage0/chapter0), with no negative index.
- Both logs report uncaught0; no console/crash/error/nonfinite/not_assessed rows.
- Keep check: zero lines/pins. Whitespace check passed with existing LF-to-CRLF notices.

## Limits
Synthetic key events exercise the game's listener, not native focus/Tab behavior. No new visual layout was added, so no separate small-window claim. Existing actual-timeout, four live skill variants, full-video fidelity and human visual/feel gaps remain unassessed. This change completes existing map keyboard navigation rather than introducing a new game system.
