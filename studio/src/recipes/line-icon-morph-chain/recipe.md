# Line icon morph chain into a loader

One centred line icon on a flat warm colour turns into the next every 1-2 s: bag, plane, window, globe, pin, then it collapses to a dash that fans into a spinning loader and vanishes. One stroke weight ties the chain into a single journey.

Source: https://jitter.video/template/the-route-morphing-icons/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Linking 4-6 feature or journey steps with one icon each, no copy needed
- A short looping explainer for an icon set or a step-by-step flow
- A transition sting between scenes of a longer film
- Ending on a loading or processing state before a result
Not for: films that need to name the product or make a claim; icons with fills or mixed stroke weights (the chain stops reading as one line).

## Format
16:9 · 12.77 s · 30 fps · light (flat yellow) · music none, cut_on_beat n/a (0 cuts) · VO no · loopable (first and last frames are the same empty field)

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.53 | 0–46 | hook | empty field, then a line bag icon grows in at centre and holds | static | bag flat at 0.27, full height by 0.50, springs.ui ~8 fr (±0.25 s); hold f15–f45 | morph | tick |
| 2 | 1.53–2.50 | 46–75 | feature | bag tilts and becomes a plane icon pointing up-right | static | strip: f46 bag rotated ~10°, f47 plane complete (2 fr, easings.outExpo); hold f47–f68 | morph | tick |
| 3 | 2.50–4.27 | 75–128 | feature | plane becomes a tilted rounded-square window; it rights itself, two cloud strokes trace in | static | enters tilted ~15°, upright by 3.00, springs.ui ~15 fr (±0.25 s); strokes draw 2.77–3.77, easings.outQuint | morph | tick |
| 4 | 4.27–6.27 | 128–188 | feature | window rounds into a globe; inner lines slide round as continents, merge into one wave line | static | square→circle 4.00–4.27 (±0.25 s); inner lines rotate 4.27–5.50, easings.inOutSine; one S-line by 5.77; ring thickens at 6.00 | morph | tick |
| 5 | 6.27–7.67 | 188–230 | feature | globe ring becomes a map pin with an inner circle | static | point forms 6.27–6.50, inner circle closes by 6.77, springs.ui (overshoot not measurable); strip: swell ~+13 % f225–f229, easings.inExpo | morph | tick |
| 6 | 7.67–8.77 | 230–263 | feature | pin collapses to a small oval that thins into one short vertical dash above centre | static | strip: oval at f230, narrows to a filled dash by f240, easings.outExpo; hold f240–f263 | morph | none |
| 7 | 8.77–9.50 | 263–285 | feature | dash tilts and fans out clockwise into a ring of 12 radial ticks | static | 3 ticks at 9.00, half ring 9.27, full ring 9.50; stagger ~1 fr (±0.25 s), easings.outQuint | morph | swoosh-short |
| 8 | 9.50–11.50 | 285–345 | feature | the 12-tick loader spins in place, then shrinks to nothing | static | rotation easings.linear (rate not measurable); strip: shrink f341–f344 ~-10 %, gone f345, easings.inExpo 4 fr | hard-cut | pop |
| 9 | 11.50–12.77 | 345–383 | feature | empty field matching frame 0, loop point | static | none, 38 fr empty | hard-cut | none |

Evidence per row (no cuts in cuts.json, so no cut frames):
1. sheet-01 cells 0–6; strip at 1.50
2. sheet-01 cells 6–9; strip at 1.50 (frames 46–47)
3. sheet-01 cells 10–15, sheet-02 cell 0
4. sheet-02 cells 0–9; kf-005.50
5. sheet-02 cells 9–14; strip at 7.50
6. sheet-02 cell 15, sheet-03 cells 0–3; strip at 7.50
7. sheet-03 cells 3–6
8. sheet-03 cells 6–13; strip at 11.00; kf-010.50
9. sheet-03 cells 14–15, sheet-04 cells 0–2

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| morph | 1–7 | craft/vocabulary.md#transitions (each icon becomes the next; PillMorph is the nearest built-in) |
| thinking-state | 7–8 | craft/vocabulary.md#ui (radial tick loader; Spinner) |

## Look
Palette: #FDC124 background, #010101 stroke. Type: none. Treatment: none. Background: flat colour, no gradient, no grain.

## What to adapt
- Copy: none. Content is 4-6 icons in journey order; each should share the same stroke width, caps and bounding size.
- Brand: bg = brand background or accent field; stroke = brand fg. No logo in the reference; a logo could replace the final empty hold.
- Timing: holds (21-60 fr) can stretch to match a VO; keep morphs short (2-8 fr) and keep the 38 fr empty tail if the film loops.

## Pitfalls
- Morphs are fast (2 fr measured bag→plane); slow crossfades between icons read as dissolves, not a single line changing.
- Mixed stroke weights between icons break the "one line" read; the only thickening is the deliberate ring swell at 6.00.
- The loader's 12-fold symmetry hides its rotation speed at low frame rates; check it on a 30 fps render.

## Missing components
- IconMorph: interpolate between two SVG stroke paths (resampled to equal point counts, e.g. flubber-style), stroke ~1.5 % H, round caps, morph 2-8 fr, rotation and scale keys per icon (techniques: morph)
- RadialFan: a single dash unfolds clockwise into N=12 radial ticks around a centre, stagger ~1 fr, then spins linearly and shrinks out in 4 fr (techniques: thinking-state)

## Proposed terms
- icon-morph-chain: one line icon morphs into the next in a sequence of 4+ symbols on a static frame (rows 1–6) (not in craft/vocabulary.md; not used in recipe.json)
- stroke-draw: line strokes trace on inside an icon (row 3) (not in craft/vocabulary.md; not used in recipe.json)
- radial-fan: one mark fans out into a ring of copies around a centre (row 7) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; 1 fr from 30 fps strips at t = 1.50, 7.50, 9.00, 11.00 (temporary, not kept). Not measurable: loader rotation speed (symmetry aliasing), overshoot of the bag entrance and window right-up, exact tick stagger. motion.json reports camera zoom/rotation, but that is the icon changing shape; no camera move is visible. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
id line-icon-morph-chain · family transitions · 12.77 s, 9 rows, 0 cuts (single shot split at icon changes)
techniques 2 (morph, thinking-state) · cut_on_beat n/a (silent, 0 cuts)
not measurable: loader spin rate, entrance overshoot, tick stagger (±0.25 s)
proposed terms: icon-morph-chain, stroke-draw, radial-fan
missing components: IconMorph, RadialFan
phase B: not run (study only)
