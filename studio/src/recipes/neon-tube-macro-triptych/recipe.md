# Neon tube macro triptych

Three hard-cut macro views of one glowing tube on black: a bent corner, a level band with light sliding along it, a forked joint. A slow creep keeps each hold alive; a vertical mood loop or backdrop for type.

Source: https://www.raylight.app/templates/6sadmipG (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A vertical teaser or story background before the product or a line of type appears
- Brands with a single saturated accent colour that can carry a whole frame
- Silent autoplay openers where a 6 s abstract hold is enough
- A backplate behind a short statement or logo added on top
Not for: anything that has to explain a product on its own; there is no copy, no UI and no mark.

## Format
9:16 · 6.3 s · 30 fps · dark · music none, cut_on_beat n/a (0/2, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.17 | 0–65 | hook | bent neon tube: diagonal from top-left, rounded corner, then near vertical to the bottom edge; white core, wide green falloff | near static drift (~2 px/fr @1920, zoom within ±1.5 %/s, motion.json only) | none; lit from frame 0, constant glow (±0.25 s) | hard-cut | swell (planned) |
| 2 | 2.17–4.13 | 65–124 | hook | level glowing band across full width at ~50 % H, two bright edge lines, haze above and below | framing static on the band; motion.json ~+10 %/s on the haze, not visible on sheets | light slides along the band: from ~3.50 s the right end darkens, gradient travels left, easings.linear ~19 fr (±0.25 s) | hard-cut | hit (planned) |
| 3 | 4.13–6.30 | 124–189 | hook | forked tube joint: thick body from the left, arms up-left, right and down; dark inner corner | push-in ~1.00→1.03 over 65 fr (suggested) | none; lit from the cut frame, body darkens slightly at 6.00–6.27 | end | hit (planned) |

Evidence per row: row 1 `sheet-01 cells 0–8`, `cuts/cut-002.17.jpg` (before); row 2 `sheet-01 cells 9–15`, `sheet-02 cell 0`, `cuts/cut-002.17.jpg` (after), `cuts/cut-004.13.jpg` (before); row 3 `sheet-02 cells 1–9`, `cuts/cut-004.13.jpg` (after).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| glow | 1–3 | craft/vocabulary.md#look, Bloom / BrandBackdrop in studio/API.md |
| push-in | 3 (1–2 near static) | craft/vocabulary.md#camera, KenBurns |
| hard-cut | 1→2, 2→3 | craft/vocabulary.md#transitions |

## Look
Palette: #010302 background black, #0B200B dark haze, #096F08 tube body, #13A913 lit band, #79F472 hot core edge (white core near #FFFFFF on top). Type: none. Treatment: glow. Background: flat black with soft green haze around the tube.

## What to adapt
- Copy: none in the reference; if a line is added, one statement of ≤ 5 words over row 2 (the band leaves clean space above and below).
- Brand: the brand accent replaces the green in body, haze and core edge; keep the core white.
- Timing: each row ~2 s (65 / 59 / 65 fr); rows can stretch to 3 s, keep the cuts hard and unaccented.

## Pitfalls
- The glow must have a white core and a wide, soft falloff (~12 % of frame width); a single-colour stroke reads as a flat line.
- Shots are near static; adding big camera moves turns calm light into a screensaver.
- Row 2 is the only one with internal motion; keep the light travel slow and linear.

## Missing components
- NeonTube: SVG path with rounded joins, stroke width ~4 % W, white core 0.6 % W, accent blur layers at 2 %, 6 %, 12 % W; optional gradient offset animating along the path for light travel (techniques: glow)

## Proposed terms
- neon-tube: stroked path with a white core and wide accent falloff, framed in macro so it fills the screen (rows 1–3) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strip extracted. Not measurable: light travel speed and easing in row 2 (estimated from motion.json second 3), camera drift and push values (motion.json only, sheets show < 2 % change). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/2 cuts within ±2 fr (no beats).

## Study log
id neon-tube-macro-triptych · family social-promo · 6.3 s, 3 rows (2 hard cuts at 2.17 / 4.13 s)
techniques 3 (glow, push-in, hard-cut) · cut_on_beat false (0/2, silent)
not measurable: camera drift/push (motion.json only), band light travel speed (±0.25 s)
proposed terms: neon-tube · missing components: NeonTube
phase B: not run
