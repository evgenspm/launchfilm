# Dark laptop orbit to phone list, wordmark close

A dark laptop with a market dashboard: the camera swoops from a wide 3/4 view into the charts, pulls back, drops to a phone with an earnings list, glides down it under a rim glint, then a lit wordmark holds.

Source: https://www.raylight.app/templates/NTKG356A (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A finance or analytics product with a desktop dashboard and a mobile companion
- Showing the same product on two devices in one continuous camera move
- A silent, premium dark teaser of 10 to 15 s
- You have two screenshots and a wordmark, no copy lines
Not for: products whose story needs claims or copy; light brands (the whole look depends on a near-black void and low exposure).

## Format
16:9 · 13.1 s · 30 fps · dark · music none (silent), cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.00 | 0–30 | hook | dark laptop in 3/4 view, ticker table above two charts; curved light band at left | orbit + push-in, laptop width ~27 % to ~70 % of frame, roll ~-9 deg/s | camera only, easings.inExpo (±0.25 s) | hard-cut | whoosh |
| 2 | 1.00–2.75 | 30–83 | proof | low close angle: line chart left, red-to-green area chart right, keyboard in front | orbit at keyboard height, push-in ~1.00 to 1.15, truck left ~14 px/fr @1920 | camera only, easings.inOutSine (±0.25 s) | hard-cut | |
| 3 | 2.75–4.00 | 83–120 | proof | camera at keyboard level, area chart fills right two thirds | dolly down, drift right/up ~1.5 px/fr, scale ~1.00 to 0.98 | easings.outQuint settle (±0.25 s) | hard-cut | |
| 4 | 4.00–5.75 | 120–173 | feature | whole laptop frontal, small, centred in black | pull-out ~100 % to 36 % width in 15 fr, then drift 1.00 to 1.04 | springs.cameraOut ~15 fr (±0.25 s) | slide-push | |
| 5 | 5.75–7.25 | 173–218 | feature | laptop slides out down, phone enters frontal: dated ticker groups with green/red status tags and more-counts | vertical slide 175 px/s @1920, push-in 1.00 to 1.08 | phone settles springs.heavy ~24 fr (overshoot not measurable) | hard-cut | |
| 6 | 7.25–10.25 | 218–308 | feature | phone tilts into steep perspective, close on list rows; white rim glint on right edge; short pull back at end | push-in to ~1.8, dolly up the list 290 px/s @1920 (8–9 s), zoom out ~6 %/s, quick pull-out at 10.00 | easings.inOutSine; tilt ~0 to 35 deg over 15 fr (±0.25 s) | blur-dissolve | |
| 7 | 10.25–13.10 | 308–393 | logo | wordmark centred on black, soft grey light arc sweeping in from top right | static frame; arc grows over 1.75 s | wordmark light-on grey to white ~22 fr, hold 60 fr, dims from 12.77 (±0.25 s) | hard-cut | swell |

Evidence per row (no cuts in cuts.json, cuts/ is empty): row 1 sheet-01 cells 0–3; row 2 sheet-01 cells 4–10; row 3 sheet-01 cells 11–15; row 4 sheet-02 cells 0–6; row 5 sheet-02 cells 7–12; row 6 sheet-02 cells 13–15, sheet-03 cells 0–8; row 7 sheet-03 cells 9–15, sheet-04 cells 0–4. Camera numbers cross-checked with motion.json (pan -419 px/s at 2–3 s, +175 at 5–6 s, -290 at 8–9 s; zoom +122 %/s at 0–1 s, -62 %/s at 4–5 s).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-laptop | 1–5 | craft/vocabulary.md#ui, LaptopFrame |
| device-phone | 5–6 | craft/vocabulary.md#ui, PhoneFrame |
| device-3d | 1–6 | craft/vocabulary.md#3d (drawn 2.5D LaptopFrame may stand in) |
| orbit | 1–2 | craft/vocabulary.md#camera |
| push-in | 1, 2, 5, 6 | craft/04 camera, Camera |
| pull-out | 4, 6 | craft/vocabulary.md#camera |
| dolly | 3, 6 | Dolly / Camera |
| slide-push | 4→5 | craft/vocabulary.md#transitions |
| blur-dissolve | 6→7 | craft/vocabulary.md#transitions |
| light-on | 7 | craft/vocabulary.md#brand |
| horizon-arc | 7 | HorizonArc (light arc behind wordmark) |
| vignette | 1–7 | look |
| glow | 6, 7 | look (rim glint, arc) |

## Look
Palette: #020302 background, #7D7876 light UI type, #5B5B5B wordmark grey, #524F4F device metal, #303031 surfaces, #181717 shadows; UI accents green (gains) and red (losses) sit below the 6-colour cut. Type: wordmark bold grotesk, sentence case, ~5 % H. Treatment: vignette, glow. Background: flat black with one soft curved light band.

## What to adapt
- Copy: none; only the wordmark at the end.
- Brand: the wordmark is the only brand moment; chart green/red can become brand accent pairs.
- Timing: rows 2 and 6 (the long glides) stretch; row 4's 15 fr pull-out and row 7's ~22 fr light-on keep their counts.

## Pitfalls
- Exposure is very low (most frames L < 0.1): screens must be the brightest thing, or the film reads as black.
- No cuts: every change is camera motion; a hard cut anywhere breaks the one-take feel.
- The device swap at 5.75 is a downward slide; a crossfade there looks like an edit.

## Missing components
- DeviceOrbitPath: one camera path keyframed across a laptop and a phone in the same 3D space (yaw, elevation, roll, push), springs.cameraIn/out between keys (techniques: orbit, device-3d)
- RimGlint: white highlight sliding along a device edge, ~20 px wide, follows tilt (techniques: glow)

## Proposed terms
- rim-glint: bright specular streak running along a device edge during a tilt, row 6 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets, no source file for strips. Not measurable: overshoot of every spring, exact tilt angles, entrance frames under 8 fr. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts (no music, no cuts). Palette from palettegen on keyframes 1.50, 6.50, 9.50, 11.50 (cuts/ empty).

## Study log
id laptop-phone-orbit-handoff · family 3d-device · 13.1 s · 7 rows, 0 cuts (one continuous camera move)
techniques 13 · cut_on_beat n/a (silent, 0 cuts)
not measurable: spring overshoot, tilt angles, sub-0.25 s timings (±0.25 s, sheets only)
proposed terms: rim-glint
missing components: DeviceOrbitPath, RimGlint
phase B: not run
