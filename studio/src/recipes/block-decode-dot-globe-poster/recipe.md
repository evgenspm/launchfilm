# Block-decode headline over a dot-screen globe

A square two-colour event poster: a three-line headline decodes glyph by glyph from solid blocks through coarse mosaic to crisp type in 1.7 s, over a static dot-screened globe, then holds 2.3 s.

Source: https://jitter.video/template/dithering-effect/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Announcing an event, date or launch day as a square social post
- A retro print or texture look with only two brand colours
- A short loop where the type entrance is the only motion
- Turning a static key visual into a 4 s animated poster
Not for: films that need several scenes, UI, or a story arc; dark brands without a light/ink pair.

## Format
1:1 · 4.00 s · 30 fps · light · no music, cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.70 | 0–51 | hook | flat pink square, dot-screened globe cropped bottom right, small mark bottom right, ticket CTA bottom left; 3-line headline (event name 2 words, city 2 words, date 2 words) decodes top left | static | per glyph: solid ink block of the glyph box, then 2-3 coarse mosaic steps with a mid-tone cell, then the crisp letter; random order per line; line 1 starts f0, line 2 f8, line 3 f18; line 3 done f32, line 2 done f40, first word of line 1 last at f50; stepped, no easing, ~3-6 fr per step | hard-cut | glitch-sfx (planned) |
| 2 | 1.70–4.00 | 51–120 | hook | same poster fully resolved and held | static | none: hold 69 fr, globe dot screen does not animate | hard-cut | tick (planned) |

Evidence: row 1 = sheet-01 cells 0–6 (0.00–1.50), strips at t = 0 and 1 s (30 fps), keyframes kf-000.50, kf-001.50; row 2 = sheet-01 cells 7–15 (1.77–3.77), kf-002.50, kf-003.50. No cut frames (cuts.json is empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| dither | 1–2 (globe image as ordered dot screen) | craft/vocabulary.md#look, `Dither` in studio/API.md |
| duotone | 1–2 (whole frame is two inks: pink paper, brown ink) | craft/vocabulary.md#look |

## Look
Palette: #FEBDFD background (pink paper), #5A2516 ink (type, dots, mark), #774048 and #DDA0C9 mid-tones (only in mosaic cells during the decode and dot anti-aliasing). Type: bold grotesk, sentence case, tight tracking, 3 left-aligned lines, cap size ~8 % H, line pitch ~10 % H, margin ~5.5 %. Treatment: dither, duotone. Background: flat colour with a dot-screened photo of a globe, its centre at ~70 % W / ~80 % H, radius ~55 % W, cropped by the right and bottom edges.

## What to adapt
- Copy: 3 lines of 2 words each (what, where, when), ≤ 14 characters per line; a ≤ 2-word CTA label with an icon bottom left.
- Brand: the two brand colours replace paper and ink; the logo (mark + wordmark) sits bottom right, ~25 % W wide, static from f0.
- Timing: the decode block (51 fr) keeps its frame counts; the hold can stretch to any length.

## Pitfalls
- The decode must be stepped (hard switches between block, mosaic, letter), not a blur or fade; interpolation kills the print feel.
- Line order is staggered top to bottom at start but the first word of line 1 resolves last (f50): keeping one word unresolved longest gives the hook.
- Only the type moves. Animating the dot screen as well turns the poster noisy.

## Missing components
- BlockDecode: per-glyph reveal, glyph box filled solid → 2-3 mosaic steps (cell ~0.5 then ~0.25 glyph height, one mid-tone cell) → crisp glyph; random per-line order, line starts 0 / 8 / 18 fr, each glyph 10-30 fr total, seeded (techniques: proposed block-decode)

## Proposed terms
- block-decode: text appears glyph by glyph from solid ink blocks through coarse pixel mosaic to the final letter, stepped; rows 1 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0 and 1 s; 0.25 s from sheets elsewhere. Not measurable: exact per-glyph mosaic cell sizes (from 400 px strips, ±1 step). SFX planned by the glue rule, not measured (silent reference). cut_on_beat = 0/0 cuts (no cuts, no beats). Palette from palettegen on keyframes 0.5 / 2.5 / 3.5 s (no cut frames exist); near-identical background tints merged. motion.json: hold, diff ≤ 0.16 in s0 and 0.00 from 2 s.

## Study log
id block-decode-dot-globe-poster · family kinetic-type · 4.00 s, 2 rows, 0 cuts.
Techniques 2 (dither, duotone); cut_on_beat n/a (0/0), silent, no VO.
Decode timings measured at 1 fr from 30 fps strips; mosaic step sizes ±1 step.
Proposed terms: block-decode. Missing components: BlockDecode.
Phase B: not run.
