# Parallax photo plate with a URL letter rise

A black plate on a flat colour field fades a photo up inside an inset mask while the plate shrinks faster than the picture; a bold URL rises letter by letter across it, then the photo window collapses to a corner and the letters sink away.

Source: https://jitter.video/template/image-mask-parallax-effect/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A short loop that pairs one hero photo with a web address
- Editorial or portfolio sites that want depth without 3D
- A closing card where the URL is the only copy
- Silent social autoplay that must loop seamlessly
Not for: products that need UI on screen, or messages longer than one short line.

## Format
16:9 · 4.00 s · 30 fps · dark · music none (bpm null), cut_on_beat 0/0 · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–4.00 | 0–120 | hook | black plate centred on a flat green field; black-and-white group photo in an inset window; one-line URL (12 characters) across it, wider than the plate | plate scale 1.00→0.83 over f0–f30, then near static; regrows 0.83→1.00 over f95–f110 | f0–f9 photo fades up; f0–f30 plate shrinks with easings.outExpo while the photo shrinks less and the inset widens ~2 %→~4 % (parallax); f18–f35 letters rise from a baseline clip mask, stagger ~1 fr, springs.maskRise (overshoot not measurable); hold f35–f95; f96–f110 photo window collapses to the bottom-right corner, easings.inExpo; f102–f110 letters sink below the baseline mask left to right, stagger ~1 fr; f110–f120 empty plate (loop point) | hard-cut | tick on letter settle, swoosh-short on window collapse (planned) |

Evidence per row: `sheet-01 cells 0–15` (0.00 empty plate; 0.27–0.50 photo up, plate shrinking; 0.77–1.00 letters rising; 1.27–3.00 hold; 3.27 window collapsing, letters sinking; 3.50 last letters and a small corner window; 3.77 empty plate), 30 fps strips of 0–1 s and 3–4 s, keyframes kf-000.50 / kf-001.50 / kf-003.50. cuts.json: 0 cuts, so no cut frames.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| mask-rise | 1 (f18–f35 entrance, mirrored as a sink at f102–f110) | craft/vocabulary.md#type, craft/04#springs (maskRise) |
| mask-wipe | 1 (f96–f110 photo window collapses into the plate) | craft/vocabulary.md#transitions |
| pull-out | 1 (f0–f30 plate scale 1.00→0.83 opens the field around it) | craft/vocabulary.md#camera |

## Look
Palette: #506D53 field, #FDFDFD URL, #030303 plate, #262726 and #414641 photo greys. Type: bold geometric grotesk, lowercase, tight tracking, about 9 % H, one line about 62 % W. Treatment: none. Background: flat colour field with a black plate; the photo is monochrome.

## What to adapt
- Copy: one URL, up to about 16 characters at 16:9; it must stay wider than the plate.
- Brand: field takes the brand bg (a muted mid-tone works best), URL takes fg; plate stays near black.
- Timing: the hold (f35–f95) stretches; entrance (f0–f35) and exit (f95–f120) keep their frame counts so the loop stays seamless.

## Pitfalls
- The depth only reads if the photo scales less than the plate; same scale looks like a plain zoom.
- First and last frames must be the identical empty plate, or the loop jumps.
- Letters overflow the plate onto the field: keep the URL white so it reads on both the photo and the field.

## Missing components
- ParallaxMaskPlate: black plate with an inset image window; plate scale and image scale driven separately (plate 1.00→0.83, image ~1.00→0.90 over 30 fr), window inset 2→4 %, exit collapses the window to a chosen corner over 14 fr (techniques: mask-wipe, pull-out)
- Mask sink exit for BlurIn: letters drop down through the same clip mask they rose from, stagger 1 fr, 8 fr total (techniques: mask-rise)

## Proposed terms
- parallax-mask: picture inside a mask moves or scales at a different rate than the mask frame, giving depth; row 1, f0–f30 (not in craft/vocabulary.md; not used in recipe.json)
- mask-sink: letters exit downward through their baseline clip mask, the reverse of mask-rise; row 1, f102–f110 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0–1 s and 3–4 s; 0.25 s from sheets for 1–3 s. Not measurable: letter overshoot (letters are clipped by the mask), exact easing curves of the plate scale. Plate widths in sheet px (480 px cell): 300, 286, 270, 258, 252, 250 at 0.00–1.27 s, 250 until 3.00 s. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr.

## Study log
id photo-mask-parallax-url · family transitions · 4.00 s, 1 row (single 4 s shot, 0 cuts) · 3 techniques (mask-rise, mask-wipe, pull-out) · loopable.
cut_on_beat 0/0 (silent, no cuts). Device-browser hint rejected: no browser chrome on screen.
Not measurable: letter overshoot inside the clip, plate easing curve; strips gave 1 fr timing for entrance and exit.
Proposed terms: parallax-mask, mask-sink. Missing components: ParallaxMaskPlate, mask sink exit for BlurIn.
Phase B: not run (study only).
