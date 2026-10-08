# Duotone photo poster with a luminance flash

A still aerial photo mapped to two greens holds under a two-line headline, a URL line and a round arrow button; once per loop a posterized light pass flares the highlights for about half a second, so the static poster reads as alive.

Source: https://jitter.video/template/highlight-effect/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A vertical social ad or story built from one strong, detailed photo
- A looping poster where nothing should move except one accent
- Brand colour has to own a stock or product photo (two-tone map)
- Silent autoplay placement with one headline and one link
Not for: products that need UI, more than one message, or a story with beats.

## Format
9:16 · 4 s · 30 fps · dark (mean luma 0.31-0.34, shadow tone dominates) · no music, cut_on_beat n/a (0 cuts) · VO no · loopable

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–4.00 | 0–120 | hook | full-bleed top-down city photo in two greens; headline, 2 lines of 3 words, top left; small uppercase URL line bottom left; white round arrow button bottom right | static (zoom 0.02 %/s, pan ≤ 1 px/s @1920, motion.json) | everything holds; light pass at f33: highlights jump to a posterized bright green, peak f34–f38, easings.outExpo decay to clean by ~f45, faint flecks to ~f54 (±0.25 s at the tail); type and button never move | hard-cut (loop point) | shimmer (planned) |

Evidence: sheet-01 cells 0–3 (0.00–0.77, clean hold), cell 4 (1.00, first brightening top left), cell 5 (1.27, strongest pass: foliage and facades posterized bright), cells 6–7 (1.50–1.77, residue fading), cells 8–15 (2.00–3.77, clean hold identical to cell 0); keyframes kf-000.50 (clean) vs kf-001.50 (residue on edges); 30 fps strip 0.90–1.90 s (temporary, deleted). cuts.json: 0 hard, 0 soft, 0 flashes.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| duotone | 1 | craft/vocabulary.md#look (no built-in component yet) |
| hard-cut | 1 (loop point) | craft/vocabulary.md#transitions |

The catalogue hints `glow` and `highlighter` were checked and rejected: no halo or bloom around bright areas (so not `glow`), and no marker sweep behind a word (so not `highlighter`). The effect is a brief luminance flare of the photo itself; see Proposed terms.

## Look
Palette: #073C1D shadow green (bg), #AFE4B8 pale mint (type highlight, near white), #1CA94B bright green (duotone highlight, accent), #1A9748, #187B42, #0F592E mid tones. Type: bold geometric grotesk, sentence case, tight tracking, headline ~6 % H per line top left with ~7 % W margin; footer uppercase medium ~1.6 % H. Treatment: duotone. Background: still photo, full bleed, two-tone mapped. White circle button (~11 % W) with a dark double chevron.

## What to adapt
- Copy: headline 2 lines, ≤ 3 words each, names the place or promise; footer ≤ 4 words with the URL.
- Brand: bg colour = duotone shadow, accent = duotone highlight and the flare colour; type and button stay near white.
- Timing: the pass can move (default f33) but keep it ~12 fr with residue ≤ 21 fr and ≥ 2 s of clean hold so the loop rests.

## Pitfalls
- The flare is posterized (hard luminance steps, thresholded edges), not a soft fade: a plain brightness tween looks like a camera exposure glitch.
- Pick a photo with fine high-contrast detail (foliage, windows): flat photos show nothing during the pass.
- No camera move: adding a push breaks the loop seam (last cell must equal the first).

## Missing components
- DuotonePhoto: still image cover-cropped per aspect, mapped luminance → gradient between two brand colours (CSS/SVG feColorMatrix + feComponentTransfer), optional posterize step count (techniques: duotone)
- LumaFlash: animates DuotonePhoto's highlight threshold and posterize steps: onset 1 fr, peak 5 fr, easings.outExpo decay 7 fr, residue tail 9 fr, strongest in the brightest 30 % of pixels
- PosterHeadline / round arrow button: no studio export for a static ad layout; plain absolutely positioned type and a 1-element circle are enough

## Proposed terms
- `luma-flash`: a short posterized brightening of a still photo's highlights, onset 1 fr, decay ~12 fr, used to make a static hero breathe once per loop (row 1). Not in craft/vocabulary.md; not used in recipe.json.

## Measurement notes
Resolution: 1 fr from a 30 fps strip at t = 0.90–1.90 s; 0.25 s from sheets elsewhere. Not measurable: the exact residue end (flecks fade into the duotone texture, ±0.25 s). Theme: luma 0.31-0.34 on kf-000.50 / 001.50 / 003.50 sits between the dark and light thresholds; chosen dark because the shadow tone dominates and the type is light. Palette from palettegen on kf-000.50 and kf-003.50 (no cut frames exist). SFX planned by the glue rule, not measured (silent reference). cut_on_beat = 0/0 cuts within ±2 fr.

## Study log
id duotone-photo-luma-flash · family social-promo · 4.00 s, 1 row, 0 cuts, loopable.
Techniques: 2 (duotone, hard-cut); catalogue hints glow/highlighter rejected after reading the sheet.
cut_on_beat: n/a (no audio, no cuts).
Measured from 30 fps strip: flare f33 onset, peak f34–f38, clean by ~f45, residue ~f54 (±0.25 s).
Proposed terms: luma-flash.
Missing components: DuotonePhoto, LumaFlash, poster layout (plain type + circle button).
Phase B: not run (study only).
