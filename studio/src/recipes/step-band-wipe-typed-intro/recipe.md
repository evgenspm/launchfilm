# Stepped band wave wipes open to a typed intro card

Thick accent bands stepped like a bar graph swell across a light grid, split and slide off top and bottom, uncovering a white card where an eyebrow word types with a block caret, then the name and an accent product line type in.

Source: https://www.raylight.app/templates/gruB73Za (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- a 3 s brand sting before a product demo
- announcing a named product or dataset with one accent phrase
- a light, technical brand with one strong accent colour
Not for: dark brands without a saturated accent; messages longer than one short line.

## Format
16:9 · 2.73 s · 30 fps · light · no music (silent), cut_on_beat n/a (0 cuts) · no VO

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.03 | 0–31 | hook | accent bands stepped in ~10 columns, tallest left, tapering right, on a light square grid; sparse character speckle on band edges | static frame, bands drift up ~71 px/s with a slight tilt (motion.json) | band thickens toward a peak 0.27–0.50 (easings.outCubic ~15 fr, suggested); at 0.77 splits into top and bottom bands, gap at centre (±0.25 s) | mask-wipe | whoosh (planned) |
| 2 | 1.03–2.00 | 31–60 | hook | bands retreat to the edges and leave; a white chip grows into a large card with corner handles and guide lines; eyebrow word types | card ~25 % W at 1.00 to ~83 % W at 1.77 (~13 %/s, motion.json) | bands gone by 1.50; card springs.layout ~22 fr (overshoot not measurable); typewriter ~2.5 fr per char, block caret | continuous | type-click (planned) |
| 3 | 2.00–2.73 | 60–82 | logo | eyebrow cleared; name in fg plus a 2-word product phrase in accent types in, centred on the card | near static, card ~87 % W | line typed with a soft fading leading edge, ~17 of ~25 chars by 2.27, done by 2.50 (~45 chars/s, ±0.25 s); hold ~7 fr | end | tick (planned) |
Evidence: row 1 sheet-01 cells 0–3, keyframes kf-000.50; row 2 sheet-01 cells 4–7, cuts/cut-000.77.jpg (soft 0.77–1.30), kf-001.50; row 3 sheet-01 cells 8–10.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| mask-wipe | 1–2 | craft/vocabulary.md (transitions) |
| typewriter | 2–3 | craft/vocabulary.md (type), Typewriter in studio/API.md |

## Look
Palette: bg #F5F5F5, text #0F0F0F, accent #E8662A, card #FFFFFF, grid lines #E3E3E3. Type: medium grotesk, sentence case, tight, ~8 % H, block underscore caret. Treatment: none. Background: flat light grey with a faint square grid; white card with small diamond corner handles and thin guide lines extending past it.

## What to adapt
- Copy: one eyebrow word (≤ 12 chars), then one line = name (fg) + product phrase (accent, ≤ 3 words).
- Brand: accent colours the bands and the product phrase; nothing else is coloured.
- Timing: keep the band wave at ~1 s and the wipe 0.77–1.30; typing rate scales with eyebrow length.

## Pitfalls
- The bands must leave fully before the card reaches its final size, or the wipe reads as clutter.
- Eyebrow typing is slow (~2.5 fr/char) but the second line is fast; reversing that makes the payoff drag.
- Total length is under 3 s: no hold longer than ~7 fr at the end, so add a hold if used as a standalone end card.

## Missing components
- StepBandWave: N vertical columns of accent bars, heights decreasing left to right, animated thicken then split into top and bottom halves that slide off vertically over ~16 fr (techniques: mask-wipe)
- GuideCard: white card with diamond corner handles and guide lines extending to the frame edges, scales from a chip to ~85 % W on springs.layout

## Proposed terms
- stepped-band-wave: stepped bar-graph-like accent bands that swell and split as a wipe (rows 1–2) (not in craft/vocabulary.md; not used in recipe.json)
- guide-frame-card: design-tool style card with corner handles and guide lines (rows 2–3)
- char-speckle: sparse ASCII characters dusting the edges of shapes (row 1)

## Measurement notes
Resolution: 0.25 s from sheet-01 (no source strip extracted). Not measurable: band easing, card spring overshoot, exact per-char cadence of the second line. SFX planned by the glue rule, not measured (silent reference). cut_on_beat = 0/0 cuts (no hard cuts, no beats).

## Study log
id step-band-wipe-typed-intro · family logo-brand · 2.73 s, 3 rows · 2 techniques (mask-wipe, typewriter) · cut_on_beat n/a (silent, 0 hard cuts, 1 soft 0.77–1.30).
Not measurable at 0.25 s: band easing, card overshoot, fast second-line typing cadence.
Proposed terms: stepped-band-wave, guide-frame-card, char-speckle. Missing components: StepBandWave, GuideCard.
Phase B: not run.
