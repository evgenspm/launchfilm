# Edge-on 3D button that tilts up to face the viewer

A glossy extruded action button seen almost edge-on, its label skimming the top face, tilts toward the lens; the view then jumps wide and the button turns face-on and holds. One word, one object, curiosity then clarity.

Source: https://www.raylight.app/templates/3XahLc0S (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- Teasing a single action or feature that one button label can name (a verb).
- A short silent loop or social cut-down built around one word.
- An opener before a UI demo that starts on the same button.
- Light, minimal brands where one tactile object carries the frame.
Not for: messages that need more than one word, or products without a single hero action.

## Format
16:9 · 5.37 s · 30 fps · light · music none, cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.27 | 0–38 | hook | extreme low-angle close-up of a glossy white pill button edge-on, label (1 word) skimming the top face, cropped right | near-static creep, height +10 % (~0.7 %/s) | no entrance; creep easings.linear (±0.25 s) | continuous | none |
| 2 | 1.27–2.23 | 38–67 | hook | same button tilts its top face toward the lens; label grows legible, still cropped | orbit-3d rise, visible height x1.64 over 29 fr, left edge fixed at ~30 % W | rotateX toward camera, easings.inQuad ~29 fr (suggested curve) | continuous | swoosh-short (planned) |
| 3 | 2.23–3.27 | 67–98 | hook | view jumps wide: whole button small and centred, top tilted away ~55 deg, turns face-on | pull-out in 1 fr at f67, then static | rotateX ~55 → 0 deg, springs.ui ~31 fr, no overshoot on 30 fps strip | continuous | whoosh (planned) |
| 4 | 3.27–5.37 | 98–161 | cta | button face-on, centred, one action word black on light grey, soft white bevel, white ground | near-static, width −2 % (±1 %) | hold 63 fr | end | tick on settle (planned) |

Evidence per row: 1 = sheet-01 cells 0–4, kf-000.50; 2 = sheet-01 cells 5–8, kf-001.50, strip 1.90–2.20 s; 3 = sheet-01 cells 9–12, strip 2.23–2.87 s (f67 jump frame); 4 = sheet-01 cells 13–15, sheet-02 cells 0–5, kf-003.50, kf-004.50. No cuts/*.jpg (cuts.json has 0 cuts).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| orbit-3d | 2, 3 | craft/03-camera-and-staging.md (camera path around one object) |
| pull-out | 3 | craft/03-camera-and-staging.md (detail → context) |
| extrude-type | 1–4 | craft/vocabulary.md#3d (label on an extruded 3D object) |

## Look
Palette: #FFFFFF background, #020303 label, #E5E5E5 button face, #C8C9CA face shade, #A0A3A9 / #828995 edge-on chrome reflections (rows 1–2). Type: geometric humanist sans, medium-bold, sentence case, ~13 % H face-on. Treatment: none (glossy material is the look). Background: flat white.

## What to adapt
- Copy: 1 word on the button, ≤ 8 letters, an action verb.
- Brand: button face can take the brand surface colour; label in brand fg; keep the ground flat.
- Timing: row 1 may stretch to 1.5 s; the jump frame (f67) and the ~31 fr settle should keep their counts; final hold ≥ 2 s for reading.

## Pitfalls
- The label must stay unreadable in row 1 and only become legible in row 2: the edge-on angle is the hook.
- The jump at f67 is one frame with no blur; adding a dissolve makes it read as a cut to a second shot.
- Text at the edge-on angle needs real 3D foreshortening; a 2D scaleY squash looks flat.

## Missing components
- Button3D: extruded rounded-rect button (radius ~25 % of height, depth ~30 % of height, glossy white bevel), label on the face, props rotateX (−85…0 deg), camera distance, crop offset; R3F or CSS 3D with a specular gradient (techniques: orbit-3d, extrude-type).

## Proposed terms
- edge-on-reveal: object starts nearly edge-on to the lens so its content is unreadable, then tilts to legibility (rows 1–2) (not in craft/vocabulary.md; not used in recipe.json)
- object-turn-face-on: a single UI object rotates from a tilted pose to face-on and holds (row 3) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; 1 fr from a local 30 fps strip at t = 1.90–2.87 s. Not measurable: exact rotation angles (estimated from height ratios 37/68 px), easing curve of the row 2 tilt, any overshoot below 1 %. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no music, no cuts). Palette from palettegen on keyframes kf-000.50, kf-002.50, kf-004.50 (no cut frames exist).

## Study log
id edge-on-button-tilt-face · family product-ui · 5.37 s, 4 rows, one shot (0 cuts, near-miss at 2.23 s treated as in-shot jump)
techniques 3 (orbit-3d, pull-out, extrude-type) · cut_on_beat n/a (0/0) · silent, sfx all planned
not measurable: rotation angles (estimated), tilt easing, overshoot < 1 %
proposed terms: edge-on-reveal, object-turn-face-on · missing components: Button3D
difficulty hard, render_cost heavy (3D) · phase B: not run
