# Pixel slice word reveal

A flat blue hold snaps to a brand-pink frame, then band and column slices tear through a dot grid until one word assembles from coarse pink pixel blocks over a pale field, a small URL settling under it. Under 3 s, edgy.

Source: https://jitter.video/template/glitch-01-text-reveal/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A short tech or developer brand intro where the product name is the only copy
- A 2-3 s sting before or after a longer film
- Social loops that need a hard, digital-feeling reveal of one word
- Silent autoplay where a colour snap has to stop the scroll
Not for: calm or premium brands, multi-line messages, anything that needs the viewer to read more than one word and a URL.

## Format
4:5 · 2.9 s · 30 fps · mixed (blue first half, pale second half) · no music, bpm null, cut_on_beat n/a (0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.03 | 0–31 | hook | flat saturated blue field, empty; snaps to full-frame brand pink just before the cut | static | hold f0-f28; pink fill f28-f31, 3 fr, frame swap (no easing) | flash | hit |
| 2 | 1.03–1.27 | 31–38 | tension | frame torn into horizontal bands: pale top third, blue below with thin rules, tiny pink specks; then a blue bar on pale | static | bands swap every 2-4 fr, easings.linear steps (±0.25 s) | glitch-cut | glitch-sfx |
| 3 | 1.27–1.60 | 38–48 | reveal | blue field with a 5x8 white dot grid and pink specks; then a 3-row mosaic of blue/pale column blocks with a pink pixel fragment of the word at centre | static | dot grid holds ~5 fr; mosaic from ~f45, blocks toggle every 2-3 fr (±0.25 s) | mask-wipe | glitch-sfx |
| 4 | 1.60–2.90 | 48–87 | logo | pale lavender field, one word centred in near-black, small URL near the bottom | drift 1.00→1.01 (0.8 %/s from motion.json) | last 2 columns gone by f53; letters jump between offset positions with pink block overlays, resolved by f68 (±0.25 s); URL tail letters offset and faded, settled by f83 | hard-cut | none |

Evidence per row:
1. sheet-01 cells 0–4 (0.00–1.00: blue identical, pink at 1.00); cuts/cut-001.03.jpg before side; motion.json second 0 diff 0.12.
2. cuts/cut-001.03.jpg after side (1.17), cuts/cut-001.27.jpg before side (1.23); not on a sheet cell (row shorter than 0.25 s).
3. sheet-01 cells 5–6 (1.27 dot grid, 1.50 column mosaic); cuts/cut-001.27.jpg after; keyframes/kf-001.50.jpg; cuts/cut-001.60.jpg before.
4. sheet-01 cells 7–11 (1.77 broken word, 2.00 nearly resolved, 2.27–2.77 clean); cuts/cut-001.60.jpg after.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| flash | 1 | craft/vocabulary.md#transitions (Flash, CutFlash): here the flash is accent pink, 3 fr |
| glitch-cut | 2, 3, 4 | craft/vocabulary.md#transitions (SliceGlitch, RGBSplit) |
| mask-wipe | 3 | craft/vocabulary.md#transitions: column blocks act as the mask that uncovers the pale scene |

## Look
Palette: #4D48FA (blue field), #111111 (word), #FD00E7 (accent pink, snap and pixel blocks), #DCE1FE (pale lavender field). Type: regular-weight grotesk, sentence case, normal tracking, one word ~12 % H cap height; URL ~2 % H at ~85 % H. Treatment: none. Background: flat, two colours, plus a sparse white dot grid in rows 3-4.

## What to adapt
- Copy: one word (product name, 4-8 letters) and one URL. No other lines.
- Brand: accent carries the pink snap and the pixel blocks; brand bg carries the blue field; a pale tint of it carries the end field; fg carries the word.
- Timing: row 1 hold can stretch to 1.5 s; rows 2-3 keep their 7 and 10 fr; row 4 hold can stretch for a longer end.

## Pitfalls
- All glitch states are frame swaps on 2-3 fr steps; tweening them reads as a dissolve and kills the effect.
- Pixel blocks are coarse (block ~3 % W); fine noise looks like compression artefacts instead.
- The 1 s empty opening is part of the design; without it the pink snap has no contrast.
- Keep the URL tail glitch smaller and later than the word, or it competes.

## Missing components
- PixelBlockText: renders a word whose glyph area is partly replaced by accent blocks on a coarse grid (~3 % W cells), per-letter x/y offsets that settle to 0 over 20 fr in 2-3 fr steps, seeded (techniques: glitch-cut)
- ColumnMosaic: full-frame grid of 3 rows x 8 columns, each cell bg or pale, toggled per 2-3 fr by seed, clears column by column (techniques: mask-wipe)
- DotGrid: 5x8 white square dots (~0.5 % W) on a flat field (techniques: none)

## Proposed terms
- pixel-block-reveal: a word resolves from coarse accent-coloured pixel blocks and letter offsets, rows 3-4 (not in craft/vocabulary.md; not used in recipe.json)
- column-slice-mosaic: full-frame block mosaic of two colours that toggles and clears to uncover the next scene, row 3 (not in craft/vocabulary.md; not used in recipe.json)
- dot-grid: sparse regular white dot grid on a flat field, rows 3-4 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; cut frames and keyframes give exact states at 1.00, 1.17, 1.23, 1.27, 1.50, 1.57, 1.60. No 30 fps strip extracted (source file not used). Not measurable: exact step rate of the glitch states (2-3 fr estimate, ±0.25 s), the settle frame of the word (f60-f68), overshoot (none visible). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/3 cuts within ±2 fr (no beats).

## Study log
id pixel-slice-word-reveal · family kinetic-type · 2.90 s, 4 rows (cuts f31, f38, f48) · 3 techniques (flash, glitch-cut, mask-wipe).
cut_on_beat n/a: silent, 0 beats, ratio 0/3. Energy null (no music); cut rate 1.03/s.
Not measurable: glitch step rate and word settle frame at ±0.25 s; no 30 fps strip.
Proposed terms: pixel-block-reveal, column-slice-mosaic, dot-grid.
Missing components: PixelBlockText, ColumnMosaic, DotGrid.
Phase B: not run (study only).
