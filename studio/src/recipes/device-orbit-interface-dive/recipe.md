# Orbiting device with an interface dive

A rendered phone turns through close and wide views while the camera travels across one interface, then dives into a
detail and resolves to a quiet wordmark.

Source: https://www.raylight.app/templates/smjc2X8P (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- a mobile product needs a polished hero-object demo
- one interface screen can support several camera framings
- a silent product teaser needs continuous visual motion
Not for: products whose value depends on several screens, live interaction, or readable long-form copy.

## Format
16:9 · 19.40 s · 30 fps · light · music none, cut_on_beat 0/4 · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00-2.00 | 0-60 | hook | extreme close view of a rendered phone turning from its metal edge toward the interface | orbit edge-biased -> front-biased; push-in 1.00 -> 1.44 | easings.inOutSine 60 fr; shallow focus on upper interface | hard-cut | whoosh, planned |
| 2 | 2.00-4.37 | 60-131 | feature | front-biased close view eases back and exposes more of the phone | orbit continues toward opposite edge; pull-out 1.00 -> 0.84 | easings.inOutSine 71 fr; scale direction changes at row start (plus or minus 0.25 s) | hard-cut | whoosh, planned |
| 3 | 4.37-8.40 | 131-252 | feature | tilted close view travels from search controls to a content-card grid | dolly about -128,-363 px/s at 1920 width; orbit continues | easings.inOutSine 121 fr; depth-field focus follows the screen region | hard-cut | swoosh-short, planned |
| 4 | 8.40-12.40 | 252-372 | feature | complete phone floats on white at a low diagonal angle | orbit about 8 degrees; push-in 1.00 -> 1.09 | easings.inOutSine 120 fr; no independent interface animation | hard-cut | swoosh-short, planned |
| 5 | 12.40-16.40 | 372-492 | feature | phone drops from the top edge as camera dives into lower cards and navigation | push-in 1.00 -> 2.45 plus vertical dolly | easings.inExpo about 75 fr, easings.outQuint about 45 fr (plus or minus 0.25 s) | hard-cut | riser, planned |
| 6 | 16.40-19.40 | 492-582 | logo | small centred wordmark resolves from pale partial letters, then holds | locked framing; no scale or position change | letters blur-in left to right, easings.outExpo about 11 fr (plus or minus 0.25 s); hold 79 fr | hard-cut | shimmer, planned |

Evidence per row:
- Row 1: `sheet-01 cells 0-7`; `cuts/cut-004.37.jpg` before frame confirms the close device subject.
- Row 2: `sheet-01 cells 8-15`, `sheet-02 cells 0-1`; `cuts/cut-004.37.jpg` before frame.
- Row 3: `sheet-02 cells 2-15`, `sheet-03 cells 0-1`; `cuts/cut-004.37.jpg` after frame and `cuts/cut-008.40.jpg` before frame.
- Row 4: `sheet-03 cells 2-15`, `sheet-04 cells 0-1`; `cuts/cut-008.40.jpg` after frame and `cuts/cut-012.40.jpg` before frame.
- Row 5: `sheet-04 cells 2-15`, `sheet-05 cells 0-1`; `cuts/cut-012.40.jpg` after frame and `cuts/cut-016.40.jpg` before frame.
- Row 6: `sheet-05 cells 2-13`; `cuts/cut-016.40.jpg` after frame.

## Techniques -> craft
| id | rows | where the law is |
|---|---|---|
| device-phone | 1-5 | craft/03-camera-and-staging.md#framing-the-product |
| device-3d | 1-5 | craft/03-camera-and-staging.md#framing-the-product |
| orbit | 1-4 | craft/04-motion.md#continuous-motion |
| orbit-3d | 1-4 | craft/04-motion.md#continuous-motion |
| dolly | 3, 5 | craft/04-motion.md#easings |
| push-in | 1, 4, 5 | craft/03-camera-and-staging.md#drift-and-push-in |
| depth-field | 1-5 | craft/03-camera-and-staging.md#framing-the-product |
| blur-in | 6 | craft/05-typography.md#recipes |
| hard-cut | 2-5 | craft/09-transitions.md#default |

## Look
Palette: background `#FFFFFF`, foreground `#2C2A27`, metal `#84868E`, warm image neutral `#BEBAB4`, surface
`#F8F7F7`, near-white `#FAF9F9`. Type: compact sans serif UI, sentence case, regular to semibold, 2-4 % H; small bold
wordmark at about 3 % H. Treatment: `depth-field`. Background: flat white.

## What to adapt
- Copy: no hero statements; supply one compact wordmark and one interface screenshot with short functional labels.
- Brand: keep the device neutral, apply the accent only inside the interface, and place the wordmark alone on the close.
- Timing: rows 3-5 need their full 120 fr camera paths; row 6 may stretch its hold but keeps the approximately 11 fr resolve.

## Pitfalls
- A flat mockup cannot survive the side angles in rows 1-3; the chassis needs real depth and edge lighting.
- The interface must be rendered above delivery resolution because rows 3 and 5 magnify it by more than 2x.
- Row 5 crosses a large scale range in 120 fr; linear interpolation will feel mechanical and miss the measured acceleration.
- Do not animate the interface itself. The camera movement is already the feature demonstration.

## Missing components
- None. Phase B added local `DeviceOrbitStage`, a deterministic 2.5D phone rig with five camera paths and a brand-driven interface rebuild. A true WebGL chassis remains outside the shared studio API.

## Build comparison
| Row | Reference t0-t1 | Ours t0-t1 | delta boundary (fr@30) | Subject / layout match | Motion character match | Fix |
|---|---|---|---|---|---|---|
| 1 | 0.00-2.00 | 0.00-2.00 | 0 | close phone edge and upper interface fill the frame | orbit plus push-in, same direction and `hard-cut` | none |
| 2 | 2.00-4.37 | 2.00-4.37 | 0 | front-biased close phone exposes more interface | orbit reverses scale into a pull-out | none |
| 3 | 4.37-8.40 | 4.37-8.40 | 0 | tilted screen travels from header to card grid | continuous diagonal dolly and `hard-cut` | none |
| 4 | 8.40-12.40 | 8.40-12.40 | 0 | complete phone floats on the light field | low diagonal orbit and slow push-in | iteration 2 increased device scale 1.7x |
| 5 | 12.40-16.40 | 12.40-16.40 | 0 | phone enters from above and dives into lower UI | accelerating push-in and vertical dolly | iteration 2 moved acceleration earlier |
| 6 | 16.40-19.40 | 16.40-19.40 | 0 | small centred wordmark on a light field | left-to-right `blur-in`, then locked hold | none |

Theme, palette roles, sentence case and semibold UI hierarchy match. The local rig approximates depth with CSS perspective and shadows; it does not reproduce the reference's optical depth of field or metal reflections. Shot count is 6/6 and every authored boundary is within 0 fr.

## Proposed terms
none

## Measurement notes
Resolution: 0.25 s from sheets; palette sampled with palettegen from full-resolution keyframes at 0.50, 8.50 and
14.50 s. Not measurable: exact camera yaw, focal length, focus distance, entrance overshoot, and sub-0.25 s easing
changes. The source file was not used to create strips because the analysis folder is read-only. SFX planned by the glue
rule, not measured. cut_on_beat = 0/4 cuts within plus or minus 2 fr because no beat grid exists.

## Study log
id: device-orbit-interface-dive
family: 3d-device
duration: 19.40 s at 30 fps; 6 contiguous rows
techniques: 9 vocabulary ids
cut_on_beat: false, 0/4 cuts because the reference is silent
not measurable: exact yaw, focal length, focus distance, overshoot, and sub-0.25 s changes; sheet resolution 0.25 s
proposed terms: none
missing components: DeviceOrbitStage, a true 3D phone and camera rig local to the recipe
phase A: studied; offline validation and phase A self-check passed
phase B: built in 2 iterations; 582 frames / 19.40 s; boundaries 0 fr delta; 6/6 rows; half-scale sheet 5 files
remaining difference: local deterministic 2.5D chassis has no optical depth of field or photoreal metal reflections
