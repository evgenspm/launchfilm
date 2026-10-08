# Fixed mark over a flickering image montage

The brand mark holds dead centre while full-frame images swap under it every 2-6 frames, a 1 s loop of six looks run four times; mid-film the mark flips dark to light. A still mark over chaos is all the eye can hold.

Source: https://www.raylight.app/templates/KVhRrhFC (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A 3-5 s logo sting or bumper for a brand with one strong mark
- Proving the mark works on any background: photo, colour, light and dark
- Silent loops for social feeds or event screens
- Teasing an identity system (palette, imagery, device use) in one shot
Not for: wordmark-only brands with long names (the cut rate leaves no reading time), any message with copy.

## Format
16:9 · 4.00 s · 30 fps · mixed · music none (silent, no bpm), cut_on_beat n/a (0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.10 | 0–3 | hook | dark field of floating mono rock shards; big central crystal carries the dark mark on a flat face | drift, push ~2 %/s (motion.json s0) | mark static; shards drift; opens mid-motion, no entrance | match-cut | tick |
| 2 | 0.10–1.00 | 3–30 | logo | montage: 6 shots, avg 0.15 s: glass phone in hands on grey (6 fr), its negative (3 fr), blue sky grid (3 fr), grey grid (3 fr), inverted planet rim (6 fr), 4-panel palette board (6 fr); dark mark | phone and grids static (±0.25 s); palette board pans left ~470 px/s at 1920 | hard swaps only; mark keeps centre and size through every cut; holds 6/3/3/3/6/6 fr | match-cut | tick |
| 3 | 1.00–2.00 | 30–60 | logo | montage: 7 shots, avg 0.14 s: cycle 2 repeats cycle 1 exactly, opening on the shards (3 fr); dark mark | as row 2 | cadence 3/6/3/3/3/6/6 fr; 1.00 s period, metronomic | match-cut | tick |
| 4 | 2.00–2.97 | 60–89 | logo | montage: 6 shots, avg 0.16 s: cycle 3, shards then phone, negative phone, sky grid fading to grey inside one shot, planet rim, palette board; mark now light | as row 2; shards rotate ~5 deg/s (motion.json s2) | mark flips dark to light inside the shard shot at f61-62, no fade; cadence 3/6/2/6/6/6 fr | match-cut | hit |
| 5 | 2.97–3.97 | 89–119 | logo | montage: 6 shots, avg 0.17 s: cycle 4 with the light mark | as row 4 | cadence 3/6/3/6/6/6 fr; mark fixed | hard-cut | tick |
| 6 | 3.97–4.00 | 119–120 | logo | near-black flat frame, light mark alone (1 fr) | static | none; montage ends on the bare mark | hard-cut | none |

Evidence: row 1 sheet-01 cell 0, cuts/cut-000.10.jpg; row 2 cells 1-3, cuts 000.10 to 000.80; row 3 cells 4-7, cuts 001.00 to 001.80; row 4 cells 8-11, cuts 002.00 to 002.77 (dark mark in cut-002.00 after, light in cut-002.10 before); row 5 cells 12-15, cuts 002.97 to 003.77; row 6 cuts/cut-003.97.jpg.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| match-cut | 1-5 (mark position carried across every cut) | craft/09-transitions.md |
| hard-cut | 5-6 | craft/09-transitions.md |
| device-phone | 2-5 (glass phone held in hands) | craft/13-ui-recreation.md |

## Look
Palette: #111111 background dark, #F5F3E6 light cream, #1E5AD2 sky blue accent, #D99A0F amber swatch, #8B8B8B mid grey, #3D8CF5 light blue. Type: no copy; mark ~14 % of frame width, centred; tiny caps swatch labels on the palette board. Treatment: none (negatives are content, not a look). Background: footage/stills, full-frame, changing every shot.

## What to adapt
- Copy: none. Only the mark (needs a dark and a light variant).
- Brand: the palette board carries 4 brand colours (accent, light, dark, deepest) with small hex/RGB labels; the mark sits on all of them.
- Timing: keep the 30 fr cycle and the 3/6 fr holds; add or drop whole cycles to change length. The flip lands at the start of the second half.

## Pitfalls
- The mark must not move by a pixel between cuts: any jitter kills the anchor.
- The 3 fr negative of the phone shot works as a flash; replacing it with a white flash reads cheaper.
- Pick images with a calm centre (flat crystal face, empty sky, glass phone) so the mark stays legible at 3 fr.

## Missing components
- ImageFlickerMontage: list of {src, frames, invert?} shown full-frame in sequence, cover-cropped per aspect, with a fixed overlay child (the mark) and a markVariantAt frame (techniques: match-cut, hard-cut)
- SwatchBoard: 4 vertical colour panels with index circle, name and hex/RGB/CMYK labels, lateral pan ~470 px/s at 1920 (techniques: none)

## Proposed terms
- anchored-mark-montage: a mark fixed in frame while the background montage cuts every 2-6 fr (rows 2-5) (not in craft/vocabulary.md; not used in recipe.json)
- negative-flicker: a 2-3 fr inverted copy of the previous shot used as a flash (rows 2-5) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: cut times from cuts.json at 1 fr (30 fps); content from sheets at 0.25 s. Not measurable: shard drift speed and phone motion inside 3-6 fr shots (±0.25 s), exact mark colour flip frame (between f60 and f62). Palette from palettegen on the right half of cut frames 000.30, 000.40, 000.80, 001.10, 002.57. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/26 cuts within ±2 fr (no beats).

## Study log
id fixed-mark-image-flicker · family logo-brand · 4.00 s, 6 rows (26 hard cuts, montage-merged per 1 s cycle)
techniques 3 (match-cut, hard-cut, device-phone) · cut_on_beat n/a: silent, no bpm
cycle: 7 shots, 3/6/3/3/3/6/6 fr = 30 fr, run 4 times; mark flips dark to light at f61-62
not measurable: in-shot motion inside 3-6 fr holds (±0.25 s)
proposed terms: anchored-mark-montage, negative-flicker
missing components: ImageFlickerMontage, SwatchBoard
phase B: not run
