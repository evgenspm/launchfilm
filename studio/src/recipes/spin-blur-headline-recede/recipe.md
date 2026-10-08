# Spinning blur headline over contracting rings

A two-line headline spins and sharpens out of a heavy blur while it falls back in depth, over concentric rounded rings that keep shrinking. One unbroken 2 s move with a slow middle gives a short claim depth.

Source: https://jitter.video/template/blurry-text-spin/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A one-claim feature announcement or availability line
- A 2 s sting before or after a longer film
- A silent loop for social feeds where one headline is the whole message
- Introducing something with a depth or immersion angle
Not for: more than one statement, long copy (the blur hides words until f28), or anything that needs UI.

## Format
other (16:10, 1280×800) · 2.1 s · 30 fps · dark · no music (silent), cut_on_beat 0/0 · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.10 | 0–63 | hook | two-line headline (3 words, names the feature) centred over concentric rounded-square rings in blue; small wordmark at the bottom | pull-out of the whole scene: headline width 0.50 W at f15, 0.42 W at f30, 0.36 W at f60 (about -24 %/s then -21 %/s); rings contract at the same rate; roll -15° to 0 at f30, then to +5° at f62, one clockwise spin with a slow middle (speed-ramp) | f0–f2 black; headline fades in from f3, blur ~0.15 em to 0 and roll -15° to 0 on easings.outQuint 25 fr (f3–f28); line 2 sharpens 6 fr after line 1; wordmark blur-in f15–f22; rings fade in f5–f12; flat hold f28–f43; from f44 roll and recede pick up again on easings.inOutSine to the end | hard-cut | swell |

Evidence: row 1 sheet-01 cells 0–8 (0.00 black, 0.27 heavy blur and tilt, 0.50 line 1 sharp / line 2 blurred, 0.77 settled level, 1.00–1.50 hold with slow shrink, 1.77–2.00 clockwise roll and smaller rings); keyframes kf-000.50 and kf-001.50; 30 fps strips over 0–1 s and 1–2.1 s. No cut frames (cuts.json empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| blur-in | 1 | craft/04#easings, studio BlurIn |
| kinetic-depth | 1 | craft/vocabulary.md#type (headline recedes in Z while it spins) |
| pull-out | 1 | craft/vocabulary.md#camera (scene shrinks continuously, -24 %/s) |
| speed-ramp | 1 | craft/vocabulary.md#camera (fast spin in, near stop f28–f43, speeds up again) |

## Look
Palette: #0B0D0D background, #FEFEFE headline and wordmark, #233565 ring stroke, #5D7393 outer ring highlight, #121A39 inner ring shadow. Type: semi-bold grotesk, sentence case, tight tracking, two centred lines, about 10 % H per line; wordmark about 3 % H. Treatment: none. Background: flat near-black with 8–10 concentric rounded-square ring outlines, brighter blue toward the edges.

## What to adapt
- Copy: one statement, 2–4 words over 2 lines; line 1 shorter than line 2 reads best because line 1 sharpens first.
- Brand: the accent carries the rings; headline in brand fg; logo or wordmark small at the bottom centre.
- Timing: keep the entrance at 25 fr and the 3 black frames; the hold (f28–f43) can stretch for longer copy; the final roll must keep accelerating to the last frame.

## Pitfalls
- The roll never reverses: -15° to 0 to +5°, all clockwise. A spring with overshoot back past 0 breaks the "one spin" read.
- The whole scene keeps shrinking, never zooms back; a static hold kills the depth feel.
- Line 2 lags line 1 by 6 fr; resolving both lines together looks flat.
- Rings must contract with the type (same scale origin, centre of frame), or the headline seems to slide over them.

## Missing components
- ContourRings: 8–10 concentric rounded-square outlines centred in frame, stroke 2–3 px at 1280 W, colour gradient inner dark blue to outer light blue, scale and rotation driven by the parent camera (techniques: pull-out, kinetic-depth)
- SpinResolve: wrapper that rolls children -15° to 0 to +5° with blur 0.15 em to 0 on easings.outQuint 25 fr, then a slow inOutSine roll (techniques: blur-in, speed-ramp)

## Proposed terms
- spin-resolve: text rolls about the view axis while resolving from blur, settles level, then keeps rolling slowly; row 1 (not in craft/vocabulary.md; not used in recipe.json)
- contour-rings: concentric rounded-square outlines as a backdrop that contract with the camera; row 1 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0–1 s and 1–2.1 s (source file is local); sheet cells 0.25 s. Not measurable: exact blur radius in px (estimated ~0.15 em from strips), exact roll angles (±2° from sheet cells, motion.json rot 15.2°/s in second 1 and 4.7°/s in second 2). Palette from the full-res keyframe at 1.50 s (no cut frames exist). SFX planned by the glue rule, not measured; the reference is silent. cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
id spin-blur-headline-recede · family kinetic-type · 2.10 s, 1 row (single shot, 0 cuts) · 4 techniques (blur-in, kinetic-depth, pull-out, speed-ramp).
cut_on_beat: n/a (0 cuts, silent, bpm null). Entrance f3–f28 and line lag 6 fr measured at 1 fr from strips; roll angles ±2°, blur radius estimated.
Proposed terms: spin-resolve, contour-rings. Missing components: ContourRings, SpinResolve.
Catalogue hint device-phone not seen in any cell: the rounded rings are a backdrop, not a device; left out.
Phase B: not run (study only).
