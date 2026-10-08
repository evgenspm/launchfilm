# Hero word over a colour band, wiped on and off

One frame-wide word with a white-to-blue fill rises over a glowing blue-violet-magenta band, then a short line, then a lit wordmark on black. Every element wipes on left to right, drifts left and is erased from the left.

Source: https://www.raylight.app/templates/Dbwosxke (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A 4-5 s teaser, bumper or social opener: one verb, one promise line, the name
- Opening a longer film with a single oversized word before the product appears
- Silent autoplay where three text beats must read without sound
- A dark, premium brand with a cool gradient accent
Not for: messages that need more than one line of copy, light brands, anything that needs UI or proof.

## Format
16:9 · 4.33 s · 30 fps · dark · no music (silent reference), cut_on_beat n/a (0 cuts, 0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.20 | 0–6 | hook | black lead-in; colour band starts to fade up from the bottom | static | band opacity 0 -> ~0.6 from f1, easings.outQuint (part of the 10 fr fade f1-f11) | blur-dissolve | none |
| 2 | 0.20–1.40 | 6–42 | hook | one-word verb, 4-6 letters, filling 84 % W, white-to-blue vertical fill, over the band in the lower 40 % | pan left: word left edge 13 % -> 7.5 % W over f8-f30, then exits off the left | letters revealed left to right by a feathered mask f1-f13 (13 fr, 1 fr strip) while sliding left, easings.outExpo; exit f35-f42: mask erases from the left while the word accelerates left, easings.inExpo 7 fr | mask-wipe | swoosh-short |
| 3 | 1.40–2.63 | 42–79 | hook | promise line, 3 words, ~9 % H, centred, same band; band dims to black at the end | pan left: line centre 0.61 -> 0.51 W in f42-f53, then drift 0.51 -> 0.48 W to f70 (~1.9 px/fr at 1920) | line enters from the right with gaussian blur, sharp and settled by f54 (12 fr, easings.outExpo); hold f54-f70; exit f71-f81: mask erases from the left, line accelerates left, easings.inExpo 10 fr; band fades to black f76-f82 | mask-wipe | swoosh-short |
| 4 | 2.63–4.33 | 79–130 | logo | product wordmark ~60 % W on pure black, grey with a left-bright to right-dim fill, lit once by a soft halo | pan left: wordmark left edge 0.67 -> 0.21 W over f83-f96, decelerating; near static to f122 | letters wipe on left to right f83-f90 while sliding left, easings.outExpo; light-on f96-f104 (~8 fr S-curve), halo peaks f101-f105, decays to grey by f115; exit f123-f129: mask erases from the left, ends on an almost black frame | hard-cut | swell |

Evidence per row:
1. sheet-01 cell 0 (0.00), cuts/cut-000.03.jpg (before), strip at t = 0 frames 0-1.
2. sheet-01 cells 1–5 (0.27–1.27), cuts/cut-000.03.jpg (after 0.37), keyframes kf-000.50, strip t = 0 frames 1-29, strip t = 1 frames 0-11.
3. sheet-01 cells 6–10 (1.50–2.50), cuts/cut-002.53.jpg (before 2.50), keyframes kf-001.50, kf-002.50, strip t = 1 frames 12-29, strip t = 2 frames 0-22.
4. sheet-01 cells 11–15 (2.77–3.77), sheet-02 cells 0–1 (4.00, 4.27), cuts/cut-002.53.jpg (after 2.73), keyframe kf-003.50, strips t = 2 frames 23-29, t = 3, t = 4.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| fit-word | 2 | craft/vocabulary.md#type (fitText) |
| mask-wipe | 2, 3, 4 (entrances and exits by a feathered left edge mask) | craft/vocabulary.md#transitions |
| blur-in | 3 | craft/vocabulary.md#type (BlurIn) |
| light-on | 4 | craft/vocabulary.md#brand |
| blur-dissolve | 1 (band fade-up into the word row) | craft/vocabulary.md#transitions |
| mesh-gradient | 1, 2, 3 (lower band) | craft/vocabulary.md#look |
| glow | 2, 3 (band glow), 4 (halo) | craft/vocabulary.md#look |

## Look
Palette: #000000 background, #C7D6DF hero-word top fill, #234880 band deep blue, #6C5EB1 band violet, #9A81BE band light violet, #DFDFDF wordmark lit grey (magenta band edge visible but not returned by palettegen, approx #E040C0 by eye). Type: medium geometric grotesk, sentence case, normal tracking; hero word cap height ~49 % H, line ~9 % H, wordmark ~20 % H. Treatment: mesh-gradient, glow. Background: black with a soft mesh-gradient band in the lower 40 % (rows 1-3), pure black in row 4.

## What to adapt
- Copy: 1 hero word (4-6 letters, a verb), 1 promise line (3-4 words, completes the verb), the product name.
- Brand: band stops from accent / accent2 (deep blue -> violet -> magenta in the reference); the hero word fill fades from fg to the band blue; the wordmark stays neutral grey and is lit by white.
- Timing: rows 2 and 3 can stretch their holds by up to ~15 fr each; keep reveal 12-13 fr and exits 7-10 fr; row 4 needs ≥ 40 fr for wipe + light-on + decay.

## Pitfalls
- The reveal mask must travel with the text (the edge follows the slide); a fixed-screen wipe reads as a different effect.
- Exits are shorter than entrances (7-10 fr vs 12-13 fr) and accelerate; a symmetrical exit kills the left-flowing rhythm.
- The band must be gone before the wordmark (f76-f82): the mark sits on pure black so the halo reads.
- Hero word at 84 % W only works for short words; long words need smaller type, not a second line.

## Missing components
- EdgeMaskSlide: wraps text; feathered linear mask (feather ~15 % of text width) moving left to right over N fr while the content slides left on easings.outExpo; mirrored exit erasing from the left on easings.inExpo (techniques: mask-wipe).
- GradientBand: mesh-gradient restricted to the lower 40 % of the frame, 3 stops (blue, violet, magenta) with slow horizontal drift, opacity fade 10 fr in / 6 fr out (techniques: mesh-gradient, glow).
- fitText is referenced by the vocabulary but not listed in studio/API.md; verify before use (techniques: fit-word).

## Proposed terms
- edge-mask-slide: text revealed and erased by a feathered mask edge that travels with a lateral slide; rows 2-4 (not in craft/vocabulary.md; not used in recipe.json).
- gradient-fill-type: letters filled with a vertical or horizontal gradient that fades into the background; rows 2, 4 (not in craft/vocabulary.md; not used in recipe.json).
- color-band: mesh gradient occupying only a horizontal band at the bottom edge; rows 1-3 (not in craft/vocabulary.md; not used in recipe.json).

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0, 1, 2, 3, 4 (extracted to a temp dir outside the repo and deleted); sheets at 0.25 s. Not measurable: spring overshoot on the slides (none visible at 1 fr, so easings used); exact mask feather width (±5 % of text width); magenta band hex (palettegen missed it). Palette sampled from keyframes kf-000.50, kf-002.50, kf-003.50 because the cut frames are before/after composites. SFX planned by the glue rule, not measured (silent reference). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
- id: fit-word-band-wipe-pass · family kinetic-type · 4.33 s, 4 rows (0 hard cuts, 2 soft transitions as boundaries 0.20 and 2.63, extra split at 1.40 for the new text)
- techniques: 7 (fit-word, mask-wipe, blur-in, light-on, blur-dissolve, mesh-gradient, glow)
- cut_on_beat: n/a, silent reference, 0 beats
- measured from 30 fps strips; not measurable: overshoot, mask feather, magenta hex
- proposed terms: edge-mask-slide, gradient-fill-type, color-band
- missing components: EdgeMaskSlide, GradientBand (fitText to verify)
- difficulty medium (5 non-look techniques), render_cost light
- phase B: not run
