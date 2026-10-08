# Extruded phrase swing-in with push

A short bold phrase swings in letter by letter with a solid cobalt side extrusion, lands over a soft orange blob backdrop, then the camera pushes in to the end. Faux depth gives a 3D title without a 3D scene.

Source: https://jitter.video/template/text-extrusion/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A 3 s title or slogan sting for a playful consumer brand
- Opening card of a promo where one short phrase is the whole message
- Silent social loop where type has to carry energy without UI
- Bumper before or after a longer film
Not for: long lines or multi-line copy (the extrusion doubles the visual weight), calm premium voices, anything that needs UI.

## Format
other (1280×800, 16:10) · 3.0 s · 30 fps · light · music none, cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–3.00 | 0–90 | hook | empty warm orange backdrop with soft blurred darker blobs, then a slogan, 3 words, extruded caps, centred, one line | push-in 1.00→1.16 over 60 fr (f30–f90), accelerating, easings.inQuad | blobs drift from f0; phrase appears ~f12 (±0.25 s); per letter swing from ~10° tilt in depth to flat, left to right stagger (±0.25 s); lands ~8 % oversize at f23, settles by f30 on springs.snappy (overshoot not measurable) | hard-cut | swoosh-short on entry, tick on settle |

Evidence row 1: sheet-01 cells 0–11 (0.00 and 0.27 empty backdrop; 0.50 mid-swing, right letters still tilted; 0.77 landed, slightly larger; 1.00–2.77 flat phrase growing), keyframes kf-000.50, kf-001.50, kf-002.50. No cut frames (cuts.json empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| extrude-type | 1 | craft/vocabulary.md#3d (built here as faux 2D extrusion) |
| push-in | 1 | craft/03-camera-and-staging.md#drift-and-push-in |
| mesh-gradient | 1 | craft/vocabulary.md#look (blurred blob backdrop) |

## Look
Palette: #FE8403 background orange, #FEA417 lighter lower orange, #FE900A mid orange, #FFD398 highlight, #9E737E text/extrusion blend from palettegen. By eye (not palettegen): face white, extrusion cobalt. Type: condensed heavy display sans, all caps, tight tracking, cap height ~12 % H, one line ~70 % W. Treatment: mesh-gradient. Background: blurred orange gradient with darker drifting blobs.

## What to adapt
- Copy: one line, 2 to 4 words, a slogan or title; no sub-line.
- Brand: backdrop from bg + accent; face in fg; extrusion in a strong contrasting colour (complementary to the bg works best).
- Timing: entrance f12–f30 keeps its frames; the push hold stretches if the sting is longer.

## Pitfalls
- The extrusion is a flat solid side with no shading; adding gradients or lighting makes it look like a cheap bevel.
- Stagger runs left to right: at the 0.50 s cell the last letters are still tilted, so the entrance is not a whole-line rotate.
- The push accelerates (8 %/s then 14 %/s); a linear push looks static in the last second.
- The first 0.27 s are empty backdrop; keep at least 8 fr before the phrase or the swing has no space.

## Missing components
- ExtrudeText: per-letter text with N stacked offset copies (depth ~10 px at 1280 W, lower right, solid colour) behind a face layer; per-letter rotateX/Y/Z swing in with stagger on a named spring; the side follows each letter's rotation (techniques: extrude-type)

## Proposed terms
- letter-swing-in: letters rotate in depth from a tilted pose to flat, staggered left to right, landing slightly oversize (row 1) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (sheet timestamps 0.00, 0.27, 0.50, 0.77…); no 30 fps strips extracted. Not measurable: letter stagger, swing duration per letter, overshoot, exact entrance frame (±0.25 s). Scale measured from phrase width in cells (0.80 W at 0.77, 0.735 W at 1.00, 0.85 W at 2.77) and motion.json zoom rates. SFX planned by the glue rule, not measured; the reference is silent. cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats). Theme: orange background has mid luminance (relative ~0.4–0.5, perceptual lightness ~70 %), classed light.

## Study log
id extruded-phrase-swing-push · family kinetic-type · 3.00 s, 1 row (single shot, 0 cuts).
Techniques 3 (extrude-type, push-in, mesh-gradient). cut_on_beat n/a: silent, 0 cuts, no beats.
Not measurable at 0.25 s: letter stagger, swing length, overshoot, exact entrance frame.
Proposed terms: letter-swing-in. Missing components: ExtrudeText.
difficulty hard and render_cost heavy by the rule (3d id), though a CSS faux extrusion would render light.
Phase B: not run (study job).
