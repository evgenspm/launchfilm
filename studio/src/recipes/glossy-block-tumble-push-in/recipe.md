# Glossy block tumble with camera push-in

Five glossy rounded primitives on a dark gradient floor: a block tumbles in from the right, bumps the hero cube and settles, then the camera springs in to a low close-up and holds. A brand-colour toy moment with no copy.

Source: https://www.raylight.app/templates/8KvCZC3E (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A short abstract brand sting built from the brand palette as physical objects
- An intro or bumper before a title card, where weight and contact read as playful
- Social loops or teasers that need motion without copy or UI
Not for: carrying a message on its own (no type), products that need UI on screen.

## Format
16:9 · 3.33 s · 30 fps · dark · no music (silent), cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.50 | 0–15 | hook | hero blue rounded cube, small pink and orange cubes behind it, dark gradient floor | slow pull back, cube width ~90 -> ~75 px per cell (-4.5 %/s) | nothing enters; slight drift (±0.25 s) | continuous | none |
| 2 | 0.50–2.00 | 15–60 | hook | red sphere on a long green block tumbles in from the right, lands, bumps the blue cube, settles beside it | drift left -14 px/s @1920 | physics: enters f15 rotated ~30 deg, lands f30, contact f38, settled f53 (±0.25 s); cube tips slightly by f60; settle springs.heavy (overshoot not measurable) | continuous | impact-low (planned) |
| 3 | 2.00–3.33 | 60–100 | hook | low close-up: both hero blocks fill the lower edges, three small pieces in a row across the gap | push-in ~1.0 -> ~2.2 f60-f75 on springs.cameraIn ~15 fr, static hold f83-f100 | objects at rest | end | whoosh (planned) |
Evidence: row 1 `sheet-01 cells 0–1` (0.00, 0.27), `kf-000.50.jpg`; row 2 `sheet-01 cells 2–8` (0.50 red edge at frame right, 0.77 green block tumbling in, 1.00 landed, 1.27 contact, 1.50–1.77 settled, 2.00 cube tipped), `kf-001.50.jpg`; row 3 `sheet-01 cells 9–13` (2.27 mid push, 2.50–3.27 settled close-up, identical), `kf-002.50.jpg`. No cut frames (cuts.json empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| physics | 2 | craft/vocabulary.md#3d |
| push-in | 3 | craft/vocabulary.md#camera, craft/04#springs (cameraIn) |

## Look
Palette: #1C1C1C (floor, upper), #111112 (floor, lower), #555DF8 (hero cube lit face), #4349DF (hero cube shade), #05773E (green slab). Small pieces (pink, orange, red) are too small for palettegen; eyeballed in notes. Type: none. Treatment: none (glossy specular highlights on every object, soft contact shadows, no grain). Background: vertical dark gradient, lighter at the top.

## What to adapt
- Copy: none; pair with a title card after the hold if a message is needed.
- Brand: hero cube = brand accent, slab = secondary colour, small pieces = tints of the palette; floor = brand bg.
- Timing: row 1 can stretch to 1 s; keep the tumble-to-settle (~38 fr) and the 15 fr push-in, they carry the weight.

## Pitfalls
- The push-in is ~2.2x in about half a second: a slow ease kills the punch; settle it before the hold.
- Keep the hold fully static (last cells identical); any drift there reads as an unfinished sim.
- Physics must be seeded and baked per frame for deterministic renders.

## Missing components
- PhysicsPrimitives: R3F scene of rounded boxes/spheres with a seeded rigid-body sim baked per frame, glossy material, contact shadows on a gradient floor, camera keyframes with springs (techniques: physics, push-in)

## Proposed terms
none

## Measurement notes
Resolution: 0.25 s from the sheet (no 30 fps strip). Not measurable: exact landing/contact frames, overshoot of the settle and of the push-in, rotation angles. SFX planned by the glue rule, not measured (silent reference). cut_on_beat = 0/0 cuts (no music, no cuts). Scale numbers from object widths in sheet cells and motion.json (zoom 27 %/s in second 1-2 is averaged over the whole second; the push itself happens in 2.00-2.50).

## Study log
id glossy-block-tumble-push-in · family 3d-device · 3.33 s, 1 shot, 3 rows (state splits) · techniques 2 (physics, push-in) · cut_on_beat n/a (0 cuts, silent) · not measurable: frame-exact contact and spring overshoot (±0.25 s) · proposed terms: none · missing components: PhysicsPrimitives · phase B: not run
