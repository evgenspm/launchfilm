# Glass puzzle cube twisting on neon rails

A dark 3x3x3 glass puzzle cube with blue liquid inside rests on diagonal glowing rails, turns single layers, then tumbles and fans its columns apart before re-forming. A wordless hero-object loop for a premium dark brand.

Source: https://www.raylight.app/templates/bVg2s9A2 (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A wordless hero loop or background plate behind a headline
- A dark, blue-accented brand that wants a premium 3D object moment
- Visualising assembly, modularity or solving a puzzle without copy
- Opening bed under a title card added later
Not for: films that must carry a message on their own (there is no type, no product, no logo); light brands.

## Format
16:9 · 9.8 s · 30 fps · dark · no music (bpm null), cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.00 | 0–30 | hook | dark glass 3x3x3 cube with blue liquid on three diagonal glowing rails | locked-off three-quarter view from above (pan 0–1 px/s, zoom 0.1 %/s) | one horizontal layer turns 90 deg 0.27–0.77 s, ~15 fr (±0.25 s), edge flare at 0.27; springs.heavy suggested (overshoot not measurable) | continuous | swoosh-short (planned) |
| 2 | 1.00–3.50 | 30–105 | hook | same cube at rest, liquid drifts; second layer turn | locked-off (pan ≤ 6 px/s, zoom −0.2..0 %/s) | hold 1.00–2.00; right layer turns 2.27–2.77, ~15 fr (±0.25 s), springs.heavy suggested; hold to 3.27 | continuous | swoosh-short (planned) |
| 3 | 3.50–5.75 | 105–173 | tension | whole cube tumbles into a diamond pose, edges light, columns fan apart, one column spins | locked-off (zoom −0.2..0.23 %/s, rot ≤ 0.56 deg/s) | tumble 3.50–4.50 ~30 fr (±0.25 s), easings.inOutSine suggested; lit edges 4.77; columns apart 5.00; column turn with glint 5.27, settled 5.50 | continuous | whoosh (planned) |
| 4 | 5.75–8.00 | 173–240 | tension | cube re-forms, tilts, a column then the top layer turn; liquid swirls | slow push from 6.00 (0.85 then 0.4 %/s) | re-form 5.77; tilt 6.00–6.27; column turn 6.50; top layer 7.00; settle 7.27–7.77 (±0.25 s), springs.heavy suggested | continuous | shimmer (planned) |
| 5 | 8.00–9.80 | 240–294 | tension | cube near the opening pose, more frontal and larger; vertical slices turn, then a whole-cube roll | push-in 0.7 %/s, 2.7 %/s in the last second | frontal pose 8.27–8.77; vertical slices 9.00; roll 9.27–9.77, still moving on the last frame (±0.25 s) | end | whoosh (planned) |

Evidence: row 1 sheet-01 cells 0–3, kf-000.50; row 2 sheet-01 cells 4–13, kf-001.50, kf-002.50; row 3 sheet-01 cells 14–15, sheet-02 cells 0–6, kf-003.50, kf-004.50; row 4 sheet-02 cells 7–15, kf-006.50, kf-007.50; row 5 sheet-03 cells 0–7, kf-008.50. No cut frames (cuts.json empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| liquid-glass | 1–5 | craft/vocabulary.md#look |
| glow | 1–5 (rails, lit edges row 3) | craft/vocabulary.md#look |
| motion-blur | 1, 3, 5 (smear on turns and tumbles) | craft/vocabulary.md#look |
| push-in | 4–5 | craft/vocabulary.md#camera |

## Look
Palette: #000000 background, #0E1740 deep navy shadow, #1D2961 glass body, #2D42A4 rail mid, #1C3ACE liquid accent, #3759E0 highlight blue (palettegen on kf-000.50, kf-004.50, kf-008.50). Type: none. Treatment: liquid-glass, glow, motion-blur. Background: flat black with the rails as the only light.

## What to adapt
- Copy: none in the reference; a headline can sit in the empty upper-left or lower-right corner.
- Brand: the accent colour is the rail glow and the liquid; keep the background near black.
- Timing: holds (1.00–2.00, 2.77–3.27) can stretch; turns stay ~15 fr and the tumble ~30 fr.

## Pitfalls
- The cube is never fully still for long: one move every 0.5–1.25 s keeps it alive; longer holds read as a frozen render.
- Glass needs a dark background and a single bright light source (the rails); a lit background kills the refraction.
- The last frame is mid-roll: for a loop, end on the opening pose instead.

## Missing components
- GlassPuzzleCube: R3F 3x3x3 cubelet rig with transmission glass, an inner blue volume, per-layer 90 deg turns (~15 fr) and whole-cube rolls (~30 fr) on a timeline (techniques: liquid-glass, motion-blur)
- GlowRails: three parallel emissive bars at ~25 deg across the frame, lower left to upper right, under the object (techniques: glow)

## Proposed terms
- puzzle-layer-turn: one slice of a cube object rotates 90 deg about its axis; rows 1–5 (not in craft/vocabulary.md; not used in recipe.json)
- glow-rails: parallel emissive bars as the only light source and stage; rows 1–5 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips taken. Not measurable: overshoot of turns, exact turn durations below 0.25 s, layer turn direction on blurred cells. Camera numbers from motion.json. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr.

## Study log
- id glass-cube-layer-twist, family 3d-device, 9.8 s, 5 rows, one shot, 0 cuts
- techniques 4 (liquid-glass, glow, motion-blur, push-in); cut_on_beat n/a (silent, no cuts)
- not measurable: overshoot and sub-0.25 s turn timing (±0.25 s), springs are suggestions
- proposed terms: puzzle-layer-turn, glow-rails
- missing components: GlassPuzzleCube, GlowRails
- phase B: not run
