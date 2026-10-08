# Orbiting phone close-up with a quiet brand finish

A vivid phone fills the frame through three continuous 3D passes, then settles beside a short product line before collapsing to a mark and a restrained closing credit.

Source: https://www.raylight.app/templates/UAUZqxCg (link only; the original is not redistributed) · studied 2026-10-07 · status: built

## When to use
- a phone app needs a cinematic hero teaser
- one product screen and one numeric proof point can carry the story
- a short launch bumper needs a mark-led finish
Not for: products whose value needs several screens, a recorded workflow, or readable interaction detail.

## Format
16:9 · 19.37 s · 30 fps · dark · music 102.9 BPM, cut_on_beat 1/2 · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–3.00 | 0–90 | hook | bright phone screen sweeps from an extreme lower-edge close-up into a readable product view | orbit-3d; push-in 1.00→1.26 over first 30 fr | device enters from above, easings.outExpo 9 fr (±0.25 s); easings.inOutSine orbit over 82 fr | hard-cut | whoosh |
| 2 | 3.00–7.75 | 90–233 | feature | phone returns from lower right; one-digit currency result stays centred as the device crosses left | orbit-3d, right-to-left pan about 53% W; push-in 1.00→1.14 | easings.outExpo entrance 12 fr (±0.25 s); easings.inOutSine orbit over 131 fr | whip-pan | whoosh |
| 3 | 7.75–10.97 | 233–329 | feature | phone clears the edge, re-enters from below at a new angle, then grows to edge-to-edge detail | orbit-3d; push-in 1.00→1.29 over 97 fr | whip-pan exit and re-entry about 23 fr (±0.25 s); easings.inOutSine orbit | hard-cut | swoosh-short |
| 4 | 10.97–14.00 | 329–420 | feature | full phone on right; four-word placeholder statement builds in two lines on left | locked two-column framing after entrance; phone centre about 68% W | phone easings.outExpo 10 fr; word-reveal every about 8 fr, easings.outExpo 9 fr (±0.25 s) | match-cut | whoosh |
| 5 | 14.00–16.27 | 420–488 | logo | small monochrome mark replaces the product layout, rotates about a quarter turn, then settles | static; centred mark about 8% H | springs.heavy rotation and corner settle about 30 fr, overshoot not measurable; hold 38 fr | match-cut | hit |
| 6 | 16.27–19.37 | 488–581 | outro | short three-word maker credit replaces the mark and holds alone on black | pull-out 1.10→1.00 over 9 fr with springs.cameraOut, then static | easings.outExpo resolve 9 fr (±0.25 s); still hold 84 fr | hard-cut | swell |

Evidence per row:
- row 1: `sheet-01 cells 0–11`; `cuts/cut-003.00.jpg` before frame
- row 2: `sheet-01 cells 12–15`; `sheet-02 cells 0–14`; `cuts/cut-003.00.jpg` after frame
- row 3: `sheet-02 cell 15`; `sheet-03 cells 0–11`; `cuts/cut-010.97.jpg` before frame
- row 4: `sheet-03 cells 12–15`; `sheet-04 cells 0–7`; `cuts/cut-010.97.jpg` after frame
- row 5: `sheet-04 cells 8–15`; `sheet-05 cell 0`
- row 6: `sheet-05 cells 1–13`

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-phone | 1–4 | craft/03-camera-and-staging.md#framing-the-product, craft/vocabulary.md#ui |
| device-3d | 1–4 | craft/06-look.md#depth-and-material, craft/vocabulary.md#3d |
| orbit-3d | 1–3 | craft/04-motion.md#continuous-motion, craft/vocabulary.md#3d |
| push-in | 1–3 | craft/03-camera-and-staging.md#drift-and-push-in |
| whip-pan | 2 | craft/09-transitions.md#catalog |
| word-reveal | 4 | craft/05-typography.md#recipes |
| match-cut | 4–5 | craft/09-transitions.md#catalog |
| pull-out | 6 | craft/03-camera-and-staging.md#zoom-tiers |
| hard-cut | 1, 3, 6 | craft/09-transitions.md#default |

## Look
Palette: background `#000000`, foreground `#FEFEFE`, screen accent `#63DC45`, device graphite `#1B1B1D`, screen highlight `#98E586`. Type: regular neutral sans, sentence case, open tracking, 7% of frame height; bold numeric display at about 18% of frame height. Treatment: none. Background: flat black with the device screen as the only colour field.

## What to adapt
- Copy: one four-word statement split across two lines, one short numeric result inside the UI, and one three-word closing credit.
- Brand: use the primary accent as the phone-screen field; reserve monochrome for the mark and closing line.
- Timing: keep the 3.00 s and 10.97 s hard cuts; the 14.00 s mark arrival and 16.27 s close may move by at most one beat.

## Pitfalls
- The first three rows need one continuous orbit path; independent spins make the phone look weightless.
- Preserve at least 1.25 s of readable two-column layout after the statement finishes revealing.
- Do not shrink the final hold below 84 fr; the music is silent from 17.09 s and the stillness is intentional.

## Missing components
None. `OrbitPhoneRig` was built locally in `Recipe.tsx`: replaceable portrait UI copy, perspective, depth, yaw, pitch and continuous 23–143 fr paths (techniques: device-phone, device-3d, orbit-3d).

## Build comparison
| Row | Reference t0–t1 | Ours t0–t1 | Δ boundary (fr@30) | Subject / layout match | Motion character match | Fix |
|---|---|---|---|---|---|---|
| 1 | 0.00–3.00 | 0.00–3.00 | 0 / 0 | close bright phone on dark field | same push-in and shallow orbit | iteration 2 reversed the first scale path to grow toward camera |
| 2 | 3.00–7.75 | 3.00–7.75 | 0 / 0 | large numeric screen crossing right to left | same continuous orbit family | iteration 2 enlarged the entrance and hold |
| 3 | 7.75–10.97 | 7.75–10.97 | 0 / 0 | lower-right re-entry to edge detail | same whip re-entry and push-in | iteration 2 advanced and enlarged the re-entry |
| 4 | 10.97–14.00 | 10.97–14.00 | 0 / 0 | two-line statement left, full phone right | same word cadence and locked camera | iteration 2 matched regular text weight and 2-line scale |
| 5 | 14.00–16.27 | 14.00–16.27 | 0 / 0 | small monochrome mark centred | same quarter-turn heavy settle | no timing fix |
| 6 | 16.27–19.37 | 16.27–19.37 | 0 / 0 | three-word credit centred | same short pull-out and still tail | no timing fix |

Shot count: 6 ours / 6 reference. Theme is dark; palette roles remain dark background, light text and high-luminance accent. Exact hues follow the required Northfern demo brand. The CSS device has flatter edge reflections than the source's full 3D model; timing, framing family and camera direction match at the 0.25 s sheet resolution.

## Proposed terms
none

## Measurement notes
Resolution: 0.25 s from sheets; no strips were written because the analysis folder is read-only. Palette sampled with palettegen from the first cut frame and representative non-logo keyframes. Not measurable: entrance overshoot, exact flyby duration below one cell, word-level easing, and mark rotation overshoot. SFX planned by the glue rule, not measured. cut_on_beat = 1/2 cuts within ±2 fr.

## Study log
id mobile-device-orbit-close
family mobile-app · duration 19.37 s · 6 rows
9 vocabulary techniques
cut_on_beat false: 1/2 cuts within ±2 fr
motion timing below 0.25 s and spring overshoot could not be measured
proposed terms: none
missing components: none; OrbitPhoneRig built recipe-locally
phase A: studied
phase B: built in 3 iterations (third pass made frame 0 poster-safe)
gate: schema valid; composition 581 fr; render 19.37 s; duration ratio 1.000; 5 comparison sheets
boundaries: all 6 rows at 0 fr delta; shot count 6/6
remaining difference: recipe-local CSS 3D has flatter edge reflections than a full 3D device
