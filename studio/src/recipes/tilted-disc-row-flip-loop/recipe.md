# Tilted disc row, one flip every three seconds

Six thick translucent red discs stand in a diagonal row on black under a red glow; every 3 s one disc, out of order, spins through edge-on to broad face and re-seats. A calm, loopable object loop with no copy.

Source: https://www.raylight.app/templates/hQW90g0h (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A loopable dark background or interstitial between scenes of a longer film
- A brand whose mark is a coin, token, chip or disc shape (swap the disc face for the mark)
- A silent autoplay tile that needs slow, regular life without text
- A hold under an end card or lower-third where motion must stay calm
Not for: carrying a message on its own (no copy, no product), or high-energy cut-driven edits.

## Format
other (720×960, 3:4) · 17.87 s · 30 fps · dark · no music, cut_on_beat n/a (0 cuts) · VO no · loopable (last cell = first)

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–3.77 | 0–113 | hook | six tilted red discs on a low-left to upper-right diagonal, red glow; disc 4 flips | static (locked-off) | hold to 0.77; tilt 0.77, edge-on 1.00–1.27, broad face near-horizontal and brightest 1.50–2.00, re-seated 2.27; ~45 fr flip (±0.25 s), easings.inOutSine suggested | continuous | swoosh-short (planned) |
| 2 | 3.77–6.50 | 113–195 | hook | same row; disc 6 (upper-right end) flips | static | tilt 3.77–4.00, edge-on 4.27, broad face 4.50–5.00 partly off the right edge, re-seated 5.50; ~45 fr (±0.25 s) | continuous | swoosh-short (planned) |
| 3 | 6.50–9.50 | 195–285 | hook | same row; disc 2 flips | static | tilt 6.50–6.77, edge-on 7.00, broad face 7.50–7.77, re-seated 8.00–8.27 | continuous | swoosh-short (planned) |
| 4 | 9.50–12.50 | 285–375 | hook | same row; disc 3 flips | static | tilt 9.77, edge-on 10.00, broad face 10.50–10.77, re-seated 11.00–11.27 | continuous | swoosh-short (planned) |
| 5 | 12.50–15.50 | 375–465 | hook | same row; disc 1 (lower-left, partly off frame) flips | static | tilt 12.77, edge-on 13.00, broad face 13.50–13.77 across the left edge, re-seated 14.00 | continuous | swoosh-short (planned) |
| 6 | 15.50–17.87 | 465–536 | hook | same row; disc 5 flips, row ends as at frame 0 | static | edge-on 15.77–16.00, face turned to camera (near-round) 16.27–16.77, back 17.00, re-seated 17.27 | end | tick (planned) |

Evidence: row 1 sheet-01 cells 0–15; row 2 sheet-02 cells 0–9; row 3 sheet-02 cells 10–15 + sheet-03 cells 0–1; row 4 sheet-03 cells 6–13; row 5 sheet-04 cells 2–8; row 6 sheet-04 cells 14–15 + sheet-05 cells 0–7. No cut frames (cuts.json empty); keyframes kf-000.50, kf-008.50, kf-016.50 for palette.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| glow | 1–6 (red halo behind the row, hot rim highlights on top edges) | craft/vocabulary.md#look |
| vignette | 1–6 (corners fall to near black) | craft/vocabulary.md#look |

## Look
Palette: #0F0707 background, #852126 disc body, #E83C3D rim highlight, #3D0B0C glow falloff, #5B1518 disc shadow side, #F34343 hottest glint. Type: none. Treatment: glow, vignette. Background: near-black with one soft red radial glow centred behind the row.

## What to adapt
- Copy: none; a tagline or end card can sit in the empty lower third (the row occupies the top 60 %).
- Brand: disc colour = brand accent; glow = same hue at low alpha; optional mark printed on the disc face, seen only at the broad-face moment.
- Timing: keep the 90 fr period and ~45 fr flip; the 45 fr rest between flips is what makes it calm. Stretch the film by adding flips, not by slowing them.

## Pitfalls
- Flip order is non-sequential (4, 6, 2, 3, 1, 5 from lower-left); a left-to-right order reads as a wave, a different effect.
- Only one disc moves at a time; the rest stay exactly still, otherwise the loop point at 17.87 s breaks.
- The broad-face moment is also the brightest moment: the rim highlight must sweep with the turn or the disc looks flat.

## Missing components
- DiscRow: N thick translucent discs (radius ~0.13 W, thickness ~0.015 W) on a diagonal at ~30°, each leaned ~60° about its own axis; `flip(index, at, frames)` turns one disc a half or full turn about its vertical axis with a rim highlight that tracks the light (techniques: glow; proposed disc-flip-cascade)

## Proposed terms
- disc-flip-cascade: identical objects in a row, one at a time flips through edge-on and re-seats on a fixed period in a scrambled order (rows 1–6) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strips). Not measurable: flip easing, flip axis and turn angle (180° vs 360°, a symmetric disc reads the same), overshoot on re-seat. motion.json labels flip seconds camera-zoom (0.7–1.3 %/s); resting discs keep position and size, so the camera is locked-off. SFX planned by the glue rule, not measured (silent reference). cut_on_beat = 0/0 cuts within ±2 fr.

## Study log
- id tilted-disc-row-flip-loop · family transitions (hint kept: the flip is the subject) · 17.87 s · 6 rows, one shot, 0 cuts
- techniques 2 (glow, vignette); cut_on_beat n/a (no cuts, no audio)
- flip period 90 fr, flip length ~45 fr (±0.25 s); order 4, 6, 2, 3, 1, 5
- not measurable: easing, axis, turn angle, overshoot (4 fps sheets only)
- proposed terms: disc-flip-cascade · missing components: DiscRow
- difficulty hard (3D objects), render_cost light with CSS 3D (heavy if R3F)
- phase B: not run
