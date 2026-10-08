# Glass icon tumble relay over ribbon waves

Three thick glass app tiles with white line glyphs tumble in one after another over a pastel iridescent ribbon field, settle centre, float, and hand over to the next. One locked shot, no copy: the material is the message.

Source: https://www.raylight.app/templates/4ZIHIahT (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- Showing three features or app sections as icons, no UI needed
- A premium, calm silent loop for a landing hero or social post
- Opening an app announcement before the product UI appears
Not for: dark brands, products that need copy or UI to explain themselves, fast cut-driven films.

## Format
16:9 · 12.4 s · 30 fps · light · music none, cut_on_beat n/a (0 cuts) · VO no · loopable (12.27 empty field = 0.00)

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.75 | 0–53 | hook | empty ribbon field; tile 1 (home-type glyph) rises edge-on from bottom and tumbles to centre | locked-off | enters 0.27 edge-on, yaw ~90 deg to 0, scale ~0.5 to 1.0, springs.heavy ~36 fr (±0.25 s, overshoot not measurable) | continuous | whoosh (planned) |
| 2 | 1.75–4.00 | 53–120 | reveal | tile 1 floats centre-left, refracting the ribbons | locked-off | idle float, few px / 1-2 deg, easings.inOutSine (suggested); recede starts 3.77 | continuous | none |
| 3 | 4.00–5.00 | 120–150 | feature | tile 2 (globe glyph) swings in large from left foreground; tile 1 recedes up-right | locked-off | tile 1 scale 1.0 to ~0.5, gone by 4.50; tile 2 at 4.27 near edge-on ~2x size, unwinds to 1.0 by 5.00, springs.heavy ~24-30 fr (±0.25 s) | continuous | whoosh (planned) |
| 4 | 5.00–8.00 | 150–240 | feature | tile 2 settles and floats centre-left | locked-off | residual rotate-in 5.00 to 5.75, idle float; recede starts 7.77 | continuous | shimmer (planned) |
| 5 | 8.00–9.25 | 240–278 | feature | tile 3 (tray glyph) slides in from right, edge-on and large, pushing tile 2 up-left | locked-off | tile 2 to ~0.6 scale, hidden by 8.27; tile 3 yaw ~70 deg + ~10 deg roll unwinds, scale ~1.3 to 1.0, faces camera by 9.25, springs.heavy ~36 fr (±0.25 s) | continuous | whoosh (planned) |
| 6 | 9.25–11.75 | 278–353 | feature | tile 3 floats centre-left | locked-off | idle float; drifts up from 11.00 | continuous | shimmer (planned) |
| 7 | 11.75–12.40 | 353–372 | feature | tile 3 lifts out of the top edge, empty field returns | locked-off | rise + shrink, easings.inExpo ~15 fr (±0.25 s), off by 12.27 | end | swoosh-short (planned) |

Evidence per row: 1 = sheet-01 cells 0–6; 2 = sheet-01 cells 7–15; 3 = sheet-02 cells 0–4; 4 = sheet-02 cells 4–15; 5 = sheet-03 cells 0–5; 6 = sheet-03 cells 5–15; 7 = sheet-03 cell 15, sheet-04 cells 0–1. No cut frames (cuts.json empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| liquid-glass | 1–7 | craft/vocabulary.md#look (glass tiles refract the background) |
| physics | 1, 3, 5 | craft/vocabulary.md#3d (rigid tumble entries, push-out at 8.00) |
| continuous | 1–6 | craft/vocabulary.md#transitions |
| end | 7 | craft/vocabulary.md#transitions |

## Look
Palette: #56EAFB cyan base, #6CB2EA sky blue, #2C67B2 deep ribbon blue, #AA9EE8 lilac, #B7CBF3 pale highlight, #6588D0 mid blue (palettegen on kf-000.50). Type: none; white rounded line glyphs, stroke ~8 % of tile width, extruded. Treatment: liquid-glass. Background: static 3D ribbon wave field, iridescent rim lights in magenta, yellow, cyan.

## What to adapt
- Copy: none; 3 glyphs, one per tile, simple outline icons
- Brand: accent tints the ribbon gradient and glass rim; glyph stays white
- Timing: each tile ~4 s; float holds can stretch, entries (~36 fr) and the exit (~15 fr) keep their frame counts

## Pitfalls
- The camera never moves: motion.json zoom/pan values are the tiles, not the camera. A camera move kills the calm.
- Entries alternate direction (bottom, left foreground, right); three entries from one side read as a slideshow.
- The next tile enters while the previous one leaves (4.00–4.50, 8.00–8.27); a gap of empty frames breaks the relay.
- The tile rests left of centre (~40 % of width), not dead centre.

## Missing components
- GlassIconTile: thick rounded-square glass slab (radius ~22 %, depth ~12 % of width) with refraction of the backdrop and an extruded white line glyph, posed by yaw/roll/scale/position per frame (techniques: liquid-glass, physics)
- RibbonWaveField: static 3D ribbon/wave background, 6-8 nested bands, iridescent rim, brand-tinted gradient (techniques: liquid-glass)

## Proposed terms
- glass-icon-tile: thick glass app tile with extruded white glyph, rows 1–7 (not in craft/vocabulary.md; not used in recipe.json)
- ribbon-wave-field: static iridescent ribbon background, rows 1–7 (not in craft/vocabulary.md; not used in recipe.json)
- tile-relay: the next object enters while the previous exits, rows 3, 5 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets, no 30 fps strips extracted. Not measurable: overshoot of the entries, idle float amplitude, exit easing, exact yaw angles (estimated from tile foreshortening). SFX planned by the glue rule, not measured (reference silent). cut_on_beat = 0/0 cuts within ±2 fr.

## Study log
id glass-icon-tumble-relay · family 3d-device · 12.4 s, 7 rows, one shot, 0 cuts
techniques 4 (liquid-glass, physics, continuous, end) · cut_on_beat n/a (0/0), silent
not measurable: spring overshoot, float amplitude, exit curve (0.25 s sheet resolution)
proposed terms: glass-icon-tile, ribbon-wave-field, tile-relay
missing components: GlassIconTile, RibbonWaveField
phase B: not run
