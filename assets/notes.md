<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Asset usage

- mounted-lancer.png: use — user explicitly requested direct import on 2026-11-11 and approved replacing the cavalry hero's procedural illustration in the local prototype. Source: `C:/Users/PuuGoo/Desktop/Assets Afk Arena/Heros/Estrilda/Mounted Lancer Animation Sprite Sheet.png`. Original file is unchanged. This is the supplied AFK Arena character asset, not original Oathbound artwork. Public distribution rights have not been verified.

## Animation mapping (inferred from poses, no source metadata)

Six columns, each 181 pixels wide. Rows are packed vertically at irregular intervals, not a uniform 181×181 grid. Full cell rectangles are retained so weapon effects are not trimmed. Coordinates, ground anchors and FPS are editable in `../config.js`.

| Row | Source Y | Height | Animation | Ground anchor Y |
|---|---:|---:|---|---:|
| 1 | 0 | 183 | idle (loop) | 176 |
| 2 | 183 | 174 | attack (once) | 166 |
| 3 | 357 | 184 | hit (once) | 174 |
| 4 | 541 | 182 | death (once, hold final frame) | 171 |
| 5 | 723 | 167 | skill (thrust) | 160 |
| 6 | 890 | 161 | skillShield (golden/shield visual) | 156 |
| 7 | 1051 | 188 | skillAura (rearing/aura visual) | 180 |
| 8 | 1239 | 209 | skillArc (purple slash visual) | 174 |

The four skill rows cycle on successive automatic skill activations as visual variants of the existing lancer skill. They do not grant new shield, healing or other combat effects. All balance values and action order are unchanged. Attack/skill/hit return to idle, death cannot be interrupted and holds its last frame. Pause freezes the animation clock. Local image loading uses no network service. An identical base64 copy of the PNG is embedded in `../config.js` so drawing the image does not taint the canvas when opened via `file://`; `assets/mounted-lancer.png` remains the unchanged source copy.

Preview all rows: `index.html?scene=figures&sprite-preview=1`.
