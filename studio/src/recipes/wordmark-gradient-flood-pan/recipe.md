# Giant wordmark gradient flood and pan

The camera travels across an outlined wordmark taller than the frame while a sunrise gradient floods the letters, flips to dark letters cut out of the gradient field, then lands as a small gradient-filled wordmark on navy.

Source: https://jitter.video/template/gradients-logo-reveal/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A brand intro where the colour gradient is part of the identity
- A short vertical sting before or after a longer film
- A name of 3 to 6 letters with bold, wide shapes
- Silent autoplay feeds: no copy beyond the name
Not for: long names (the pan over giant letters gets slow), thin or serif marks (the outline and the cut-out need heavy strokes), films that need a URL or CTA at the end.

## Format
9:16 · 5.23 s · 30 fps · dark · music none (silent reference), cut_on_beat n/a (no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.75 | 0–23 | hook | wordmark taller than the frame as a hairline outline on navy; first two letters pass, gradient starts filling | dolly right (content moves left), ~0.15 W in 0.00–0.27 then ~0.47 W in 0.27–0.50 (±0.25 s), easings.inOutSine | 1 px light outline; dark indigo gradient rises inside the letter from 0.50, easings.inOutSine ~13 fr (±0.25 s) | mask-wipe | swell |
| 2 | 0.75–1.63 | 23–49 | logo | same giant letters solid-filled with a moving gradient, indigo top to cream bottom; outline gone | dolly continues ~45 px/fr at 1920 width, easings.linear | gradient bands drift up and tilt ~10 deg; cream reaches mid-letter by 1.50, easings.linear 26 fr (±0.25 s) | hard-cut | none |
| 3 | 1.63–3.07 | 49–92 | logo | figure-ground flip: full-frame gradient field, whole wordmark as dark navy letters across the middle | dolly ~28 px/fr at 1920 width, then push-in ~1.00→1.40 in the last 0.25 s, easings.inExpo | field opens dark, gradient rises from the bottom ~11 fr (±0.25 s), easings.outQuint; letters darken to navy by 2.00 | hard-cut | hit |
| 4 | 3.07–5.23 | 92–157 | logo | small gradient-filled wordmark centred on flat navy, holds to the end | push-in ~2.9 %/s, 1.00→~1.06 over 65 fr, easings.linear | wordmark slides in from the right edge to centre, easings.outExpo ~20 fr (±0.25 s), settled by 3.77; inner gradient sweeps across it | hard-cut | whoosh |

Evidence per row:
1. sheet-01 cells 0–2 (0.00, 0.27, 0.50), cuts/cut-000.53.jpg (before side)
2. sheet-01 cells 3–6 (0.77 soft, 1.00 soft, 1.27, 1.50), cuts/cut-000.53.jpg (after side), cuts/cut-001.63.jpg (before side)
3. sheet-01 cells 7–12 (1.77 cut, 2.00, 2.27, 2.50, 2.77, 3.00), cuts/cut-001.63.jpg (after side), cuts/cut-003.07.jpg (before side)
4. sheet-01 cells 13–15 (3.27 cut, 3.50, 3.77), sheet-02 cells 0–4 (4.00–5.00), cuts/cut-003.07.jpg (after side), keyframes kf-004.50.jpg

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| fit-word | 1, 2, 3 | craft/vocabulary.md#type (word at or beyond frame width) |
| dolly | 1, 2, 3 | craft/vocabulary.md#camera, Camera |
| mask-wipe | 1 (out) | craft/vocabulary.md#transitions: the gradient fills the letter shapes, letters act as the mask |
| push-in | 3, 4 | craft/vocabulary.md#camera, Camera / KenBurns |
| hard-cut | 2, 3 | craft/vocabulary.md#transitions |
| mesh-gradient | 1–4 | craft/vocabulary.md#look |

## Look
Palette: #041624 background navy, #111863 deep indigo (top of gradient), #3047B9 blue, #A08EEE violet, #CBB1EF lilac, #DBD2D6 cream (bottom of gradient). Type: heavy condensed grotesk, sentence case, tight tracking; giant letters ~75 % H in rows 1–2, ~22 % H in row 3, ~7 % H in row 4. Treatment: mesh-gradient. Background: flat navy (rows 1, 2, 4), full gradient field (row 3).

## What to adapt
- Copy: one word only, the name (3–6 letters). No other text.
- Brand: the gradient stops are the brand palette, dark to light top to bottom; navy bg stays near-black so the outline and the cut-out read.
- Timing: rows 1–2 stretch with name length (keep ~45 px/fr pan); row 3 keeps its 43 fr; row 4 needs at least 40 fr of hold after the slide settles.

## Pitfalls
- The flip at 1.63 is a hard cut in mid motion: both sides must move the same direction or the eye loses the word.
- Row 3 letters start almost the field colour and darken; starting at full navy makes the cut look like a different film.
- The final wordmark is small (~7 % H); a bigger one kills the scale contrast that is the whole point.

## Missing components
- GradientWordmark: wordmark whose fill is an animated multi-stop linear gradient (stops drift up 0.5 % H per frame, angle ~10 deg), optional 1 px outline-only mode and an inverse mode (letters as dark knock-outs over a gradient field) (techniques: mesh-gradient, mask-wipe, fit-word)

## Proposed terms
- outline-fill: a letter drawn as a hairline outline that a colour or gradient then floods from the bottom (row 1) (not in craft/vocabulary.md; not used in recipe.json)
- figure-ground-flip: the cut swaps fill and ground, filled letters on dark become dark letters on the fill (row 2 → 3) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; pan and zoom speeds from motion.json per second. No source strips extracted. Not measurable: entrance easing and overshoot of the final slide, exact fill duration in row 1, exact push-in amount before the 3.07 cut. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/2 cuts within ±2 fr (no music, no beats).

## Study log
id wordmark-gradient-flood-pan · family logo-brand · 5.23 s, 4 rows (cuts 1.63, 3.07; soft 0.53–0.97)
techniques 6 (fit-word, dolly, mask-wipe, push-in, hard-cut, mesh-gradient) · difficulty easy · render light
cut_on_beat n/a (silent reference, 0/2)
not measurable: final slide easing and overshoot, row 1 fill duration, row 3 push amount (±0.25 s)
proposed terms: outline-fill, figure-ground-flip
missing components: GradientWordmark
phase B: not run (study only)
