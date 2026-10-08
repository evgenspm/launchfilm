# Pixel cursor block build and erode

A blocky arrow pointer grows from its tip one diagonal of square cells at a time, holds for a third of a second, then erodes from the edges into one cell and vanishes. Stepped 10 fps timing reads as crafted pixel art.

Source: https://jitter.video/template/cursor/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A screen-demo film needs a custom pointer entrance before the cursor starts moving (prepend to a `cursor-path` shot).
- Opening or closing beat for a pixel, retro or developer-tool brand.
- A 2 s loopable sticker or avatar loop on a flat background.
- A sting between UI demo shots where the pointer itself is the subject.
Not for: films that need copy or a product name on screen; smooth, glassy brands (the stepped 10 fps cadence fights soft springs).

## Format
1:1 · 2.00 s · 30 fps · light · music none (silent reference), cut_on_beat 0/0 · VO no · loopable (first and last frames empty white)

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.00 | 0–60 | hook | black pixel-grid arrow pointer (8 by 13 cells, about 59 cells) builds from its tip, holds, erodes to one cell near frame centre, then empty white | static | stepped at 10 fps (3 fr per state): build 1, 4, 9, 22, 35, 50, 59 cells at f1, f3, f6, f9, f12, f15, f19, diagonal wavefront from the tip, easings.linear per step; hold f19 to f29 (11 fr); erode outline-first 51, 39, 18, 4, 2, 1 cells at f30, f33, f36, f39, f42, f45; gone f48; empty f48 to f59 (12 fr) | hard-cut | tick per build step, tick on the last cell |
Evidence per row: `sheet-01 cells 0–7` (0.00 empty, 0.27 tip and first cells, 0.50 and 0.77 full pointer, 1.00 outline eroding, 1.27 small core, 1.50 one cell, 1.77 empty); `keyframes/kf-000.50.jpg` (full pointer, cell grid), `keyframes/kf-001.50.jpg` (single cell near centre); no cuts (cuts.json empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| logo-from-dot | 1 | craft/vocabulary.md#brand (the mark grows from one point and returns to one point; here the mark is a pointer glyph) |

## Look
Palette: #FFFFFF background, #000000 cells, #7E7E7E edge antialiasing only. Type: none. Treatment: none. Background: flat white. Cells are squares about 5 % of frame width (about 60 px at 1188) on a pitch of about 65 px; the pointer's left edge sits at about 28 % of the width, its tip at about 12 % of the height.

## What to adapt
- Copy: none; the glyph is the content. Swap the bitmap for any small pixel mark (logo, hand, caret) and keep the cell count near 40 to 70 so the build stays at 6 to 8 steps.
- Brand: bg and fg from brand.json; an accent on the last surviving cell gives the exit a focal point.
- Timing: keep 3 fr per state. To stretch, add hold frames (f19 to f29) or tail frames, never slow the stepping.

## Pitfalls
- Tweening cells (fade or scale) kills the look: every state change is a hard swap held 3 fr.
- The build is a diagonal wavefront from the tip, not row by row; row order reads as a printer, not a pointer forming.
- The erode collapses to frame centre, not the glyph centre, so the last cell sits right of and below the pointer body; keep that offset or the exit feels static.
- No cursor travel or click in the reference: if the demo needs a click, cut to the `Cursor` preset after the hold.

## Missing components
- PixelGlyph: renders a bitmap (rows of 0/1) as square cells (cell share of width, gap), with a stepped build (order: diagonal from a seed cell, rows, seeded random; stepFrames=3) and an erode (outline-first toward a target point, stepFrames=3), all frame-deterministic (techniques: logo-from-dot)

## Proposed terms
- block-build: a pixel glyph appears cell group by cell group on a stepped 10 fps clock, wavefront from a seed cell (row 1) (not in craft/vocabulary.md; not used in recipe.json)
- block-erode: the glyph loses its outline cells step by step until one cell remains, then it vanishes (row 1) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from a 30 fps dark-pixel bounding box per frame of the local source (99 px analysis scale); sheets at 0.25 s confirm. Cell counts are dark area divided by one cell's area, ±1 cell. Not measurable: nothing needed. Palette from keyframes (no cut frames exist). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
id pixel-cursor-build-erode · family product-ui · 2.00 s, 1 row (no cuts, shot under 4 s) · 1 technique (logo-from-dot) · cut_on_beat n/a (0 cuts, silent).
Measured at 1 fr: 3 fr per state, build f1 to f19 (7 steps), hold 11 fr, erode f30 to f45 (6 steps), empty f48 to f59; loopable.
Catalogue hint cursor-path not tagged: no travel, click or ripple visible.
Proposed terms: block-build, block-erode. Missing component: PixelGlyph.
Phase B: not run (study job).
