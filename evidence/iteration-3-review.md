<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Iteration 3 — campaign and reference verification

## Observed
- Explicit input sequence cleared stages 1-1 through 1-4, then lost 1-5 with an evolved level-7 Estrilda and otherwise level-1 party. Retained `iteration-3-campaign.png/.tsv`.
- Rendered retry button starts the same boss stage with fresh unit HP (`iteration-3-retry.png/.tsv`).
- Pause → rendered retreat button returns to map, stage 1-1 still selected, score still zero (`iteration-3-retreat.png/.tsv`). First attempt clicked before the driver had rendered pause; rerun waited for rendering and worked. This was a test-input timing limitation, not a verified game defect.
- A confirmed selection sequence upgraded Bram to level 4 and Sylra to level 3, leaving the initial formation unchanged by clicking each selected card again to cancel swap. With the same level-7 evolved Estrilda, that party beat 1-5 (`iteration-3-balanced-boss.png/.tsv`). No balance values changed.
- `iteration-3-party-boss` is a historical misnamed exploratory run: rapid clicks near a screen transition did not reliably select the intended heroes, and additional upgrades went into Estrilda. Do NOT treat it as evidence of distributed upgrades. The later `balanced-boss` run is the intended check.
- `iteration-3-party-map.png` shows another exploration with confirmed selections: Bram/Sylra upgraded, but clicking between hero cards also swapped positions as the existing UI specifies. Resources exhausted before upgrading all roles. This exposes a usability problem: selecting a hero to upgrade and rearranging formation share the same gesture.
- Isolated persistent browser profile reload retained stage clear count 1, Estrilda level 2, 555 gold, 168 essence and 2 shards. Evidence: `iteration-3-save-write` and `iteration-3-save-reload`. No user browser profile was touched.
- Run logs report uncaught 0, no crash/error/nonfinite/console rows.

## Video reference breakthrough
Browser media decoding succeeded without installing anything. Local reference viewer is `iteration-3-video-view.html` (not imported by game). Source video unchanged; viewer only reads its file URL.
- Dimensions: 608×1080; metadata duration 42.96 seconds.
- Retained decoded frames at 3, 12, 22, 32 seconds, each explicitly reporting successful seek/decode in screenshot header.
- 3s: formation/setup; 12s: combat with different world positions and simultaneous damage/heal labels; 22s: darkened skill emphasis, portrait lift and multiple effects; 32s: remaining fighters/end of engagement.
- These are sampled frames only. Full motion, exact pacing, sound and frame-accurate fidelity remain NOT ASSESSED. Brief and asset notes now distinguish this from the previous inability to decode the video.

## Still not assessed
Chapter 2, full campaign completion, timeout outcome, comprehensive balance and human fun/visual sign-off. No new game mechanics or balance edits this iteration.

## Next useful local work
Separate hero selection for upgrades from intentional formation swapping, preserving the ability to arrange 2 front / 3 back. Current two-card gesture causes accidental swaps during routine upgrades. Then verify the touched UI and campaign continuity with retained screenshots.
