# Phone roll and flip into a desktop card

A tall phone screen rolls a quarter turn with its tiled backdrop, flips over like a card and lands as a wide desktop screen while the camera pushes in. One continuous move says the product works on both.

Source: https://jitter.video/template/rotating-smartphones/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A mobile product now ships a desktop or web version: one move carries the "both platforms" message.
- A 5 s cross-platform beat inside a longer launch film, between a phone section and a desktop section.
- You have one mobile and one desktop screenshot and no footage.
- A calm, silent loop for a landing page hero or a feed post.
Not for: products with only one platform, or films that need copy on screen (the reference has none beyond screen placeholders).

## Format
other (1322×992, 4:3) · 5.0 s · 30 fps · light · music none, cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.50 | 0–45 | hook | blue portrait phone screen with a size label, centred on pale blue, columns of light blue placeholder tiles each side | pull-out with roll: scene scale 1.00 → 0.75, roll about −90° over 45 fr | phone and tiles rotate together: −15° by f8, −60° by f23, −88° by f45; easings.inOutSine 45 fr (±0.25 s) | morph | whoosh (planned) |
| 2 | 1.50–2.50 | 45–75 | reveal | landscape phone flips on its horizontal axis; back face is a white desktop screen with a size label and a 3-line caption | push-in starts 1.00 → 1.20 over 30 fr; residual roll −2° → 0 | flip 180° rotateX, top edge first; blue face gone by f68; card aspect 2.2:1 → 1.6:1 during the flip; tiles straighten into a level grid; springs.ui 30 fr (overshoot not measurable) | morph | swoosh-short |
| 3 | 2.50–4.00 | 75–120 | reveal | white wide desktop card centred, tile rows above and below drifting off frame | push-in: card width 64 % → 82 % of frame (1.00 → 1.28) over 45 fr, decelerating | camera only, springs.cameraIn 45 fr (overshoot not measurable); tiles leave the frame by f120 | hard-cut | tick |
| 4 | 4.00–5.00 | 120–150 | reveal | desktop card at 82 % frame width on the pale blue ground | static (card width equal in all cells) | hold 30 fr | hard-cut | none |

Evidence per row: row 1 `sheet-01 cells 0–6` + `keyframes/kf-000.50.jpg`, `kf-001.50.jpg`; row 2 `sheet-01 cells 6–10` + `kf-002.50.jpg`; row 3 `sheet-01 cells 10–15`, `sheet-02 cell 0` + `kf-003.50.jpg`; row 4 `sheet-02 cells 0–3` + `kf-004.50.jpg`. No `cuts/*.jpg` exist (cuts.json lists 0 cuts).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-phone | 1–2 | craft/vocabulary.md#ui (framed phone screen; here a flat rounded screen, no bezel) |
| morph | 2 | craft/09-transitions.md#morph (phone face becomes desktop face) |
| pull-out | 1 | craft/03-camera-and-staging.md (scale 1.00 → 0.75 with roll) |
| push-in | 2–3 | craft/03-camera-and-staging.md#drift-and-push-in |

## Look
Palette: #F0FBFF ground, #3EA8E9 label text on the desktop face, #28A9FC phone face (accent), #C8EBFE backdrop tiles, #FFFFFF desktop face, #E1F5FD tile highlight. Type: rounded geometric sans, medium weight, size label 7 % H, tiny 3-line caption 1.5 % H. Treatment: none. Background: flat pale blue with a grid of rounded placeholder tiles (portrait tiles in row 1, landscape rows from row 2).

## What to adapt
- Copy: none required; the two faces carry a mobile screenshot (375×812 ratio) and a desktop screenshot (16:10).
- Brand: accent colours the phone face, surface colour the desktop face; tiles are the accent at ~20 % on bg.
- Timing: roll 45 fr, flip 30 fr, push 45 fr, hold 30 fr. The hold can stretch; roll and flip keep their frame counts or the turn reads as a spin.

## Pitfalls
- Rotate the tile backdrop with the phone. A phone spinning over a still backdrop reads as a toy, not a camera move.
- The flip must start before the roll fully stops (overlap ~5 fr at f40–f45); a dead stop between the two splits one gesture in two.
- The push-in decelerates into the hold; a linear push ends with a jolt at f120.
- Card corner radius stays the same through the morph (about 4 % of card width); changing it during the flip reads as a glitch.

## Missing components
- CardFlip: a 2-faced card that rotates 180° on X or Y with perspective 1200 px, face swap at 90°, width/height interpolated on one spring (techniques: morph).
- TileBackdrop: grid of rounded placeholder tiles, columns or rows, rotates and rescales with the camera, tiles ~25 % frame width, gap ~5 % (techniques: device-phone).

## Proposed terms
- camera-roll: whole frame rotates about the view axis (−90° here), rows 1–2 (not in craft/vocabulary.md; not used in recipe.json)
- card-flip: a flat card turns 180° to show a different face, rows 2 (not in craft/vocabulary.md; not used in recipe.json)
- tile-backdrop: rounded placeholder tiles fill the ground and move with the camera, rows 1–3 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (cells at 0.27 s steps as stamped), keyframes 1/s at full res. No 30 fps strip extracted. Not measurable: flip overshoot, exact roll easing, exact flip start frame (±0.25 s). Push-in measured from card width in cells 2.00–4.00 (53 %, 64 %, 73 %, 79 %, 82 %). motion.json agrees: zoom −42 %/s and rotation −17°/s in s 0–1, +35 %/s in s 2–3, hold in s 4–5. SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts (no cuts, no audio).

## Study log
id phone-roll-flip-desktop · family 3d-device · 5.0 s, 4 rows, 0 cuts, single continuous shot
techniques 4 (device-phone, morph, pull-out, push-in) · cut_on_beat n/a (silent, 0 cuts)
not measurable at 0.25 s: flip overshoot, roll easing, flip start frame
proposed terms: camera-roll, card-flip, tile-backdrop
missing components: CardFlip, TileBackdrop
difficulty medium (CSS 3D flip, no 3D model), render_cost light
phase B: not run (study only)
