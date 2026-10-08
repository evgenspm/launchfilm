# Laptop on a sky peak with a cloud wipe

Clouds part as the camera rises to a laptop balanced on a rocky summit in a blue sky. The laptop lifts off, tilts toward camera and fills the frame, then drops away and clouds sweep back in, so the short clip loops.

Source: https://www.raylight.app/templates/ulG1KIEb (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A web product hero shot where one landing screen is the whole message
- A short silent loop for a site header, social feed or ad slot
- Brands with an airy, sky or lightness theme
- Opening a longer film with a device reveal before the feature tour
Not for: products that need several screens, a feature walkthrough or on-screen claims (there is no overlay type at all).

## Format
16:9 · 7.43 s · 30 fps · light · music none, cut_on_beat n/a (0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.07 | 0–2 | hook | empty blue-to-white sky, one wisp top right | static (2 fr) | none, 2 fr hold | hard-cut | whoosh (planned) |
| 2 | 0.07–1.00 | 2–30 | reveal | cloud wall fills the frame, falls away and reveals a laptop on a dark rocky summit | dolly up: laptop enters from top at 0.50, settles upper third by 1.00, ~25 % H in 28 fr | clouds fall out of frame, easings.outQuint 28 fr (±0.25 s); clouds blurred; screen already lit | hard-cut (no effect, same shot) | none |
| 3 | 1.00–3.00 | 30–90 | feature | laptop three-quarter view on the summit, landing page with headline and prompt box, clouds below | drift: rise continues, laptop slides down ~10 % H; scale 1.00→1.10 (screen 31 %→34 % W) | easings.inOutSine 60 fr; slight yaw toward frontal; from 2.75 a gap opens under the laptop | hard-cut (same shot) | none |
| 4 | 3.00–4.27 | 90–128 | feature | laptop lifts off and pitches toward camera, keyboard comes into view, peak exits bottom | push-in 1.00→1.30 over 38 fr (screen 34 %→44 % W) | lift and pitch, springs.heavy 38 fr (overshoot not measurable); roll −8°→+6°→0 (±0.25 s) | hard-cut (same shot) | swell (planned) |
| 5 | 4.27–6.00 | 128–180 | feature | laptop near frontal, screen fills upper two thirds, keyboard cropped by bottom edge | drift: sway ~6 % W right then back, scale 1.00→0.97 | yaw sway, easings.inOutSine 52 fr; screen static | hard-cut (same shot) | none |
| 6 | 6.00–6.50 | 180–195 | feature | laptop tips back and falls out of the frame bottom, sky left empty | static sky, object moves | tilt back + drop, easings.inExpo 15 fr (±0.25 s) | hard-cut (same shot) | none |
| 7 | 6.50–7.43 | 195–223 | feature | empty sky; blurred clouds slide in from the top, cover the frame, then open on clear sky | clouds descend ~60 % H over 22 fr (implied dolly down) | easings.inOutSine 22 fr; blurred crossfade 7.13→7.43 (9 fr) | blur-dissolve | whoosh (planned) |

Evidence per row:
1. sheet-01 cell 0 (0.00); cuts/cut-000.07.jpg (before side).
2. sheet-01 cells 1–3 (0.27 red CUT 0.07, 0.50, 0.77) and cell 4 (1.00); cuts/cut-000.07.jpg (after side); keyframes kf-000.50.
3. sheet-01 cells 4–11 (1.00–2.77); keyframes kf-001.50, kf-002.50.
4. sheet-01 cells 12–15 (3.00–3.77), sheet-02 cells 0–1 (4.00, 4.27); keyframe kf-003.50.
5. sheet-02 cells 1–7 (4.27–5.77), cell 8 (6.00); keyframes kf-004.50, kf-005.50.
6. sheet-02 cells 8–10 (6.00, 6.27, 6.50).
7. sheet-02 cells 10–13 (6.50, 6.77, 7.00, 7.27 amber SOFT); cuts/cut-007.13.jpg; keyframe kf-006.50.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-laptop | 2–6 | craft/vocabulary.md#ui, studio/API.md screen.tsx (LaptopFrame) |
| dolly | 2, 3, 7 | craft/vocabulary.md#camera, studio/API.md screen.tsx (Dolly) |
| push-in | 3, 4 | craft/vocabulary.md#camera, studio/API.md camera.tsx (KenBurns, Camera) |
| blur-dissolve | 7 | craft/vocabulary.md#transitions, studio/API.md transitions.tsx |

## Look
Palette: #1A78E1 sky top (background), #EFF6FB horizon / cloud white, #2A2C2E laptop body, #5F9EE6 mid sky, #A7C9EF lower sky, #3F597B rock shadow. Type: no overlay type; the only text is the product UI on the laptop screen. Treatment: none (clouds carry depth blur; no grain seen). Background: vertical gradient, deep blue at the top to near-white at the bottom, with drawn volumetric clouds and a dark faceted rock summit.

## What to adapt
- Copy: none on screen; the message is one landing-page screenshot (headline, input box, suggestion chips) on the laptop.
- Brand: the sky gradient can take the brand's blue or any light accent; the screenshot carries the brand. No logo moment; add an end card after row 7 if one is needed.
- Timing: row 3 (summit hold) and row 5 (frontal hold) stretch; rows 2, 6 and 7 keep their frame counts (the cloud wipes and the drop are the rhythm).

## Pitfalls
- The laptop never animates its lid: it is open and lit from the first frame it appears; only position, scale and pitch move.
- The clouds must be blurred and larger than the frame or the wipe reads as a sticker sliding past.
- Rows 2–6 are one continuous shot: do not cut between them, the camera and object moves must chain without a pause.
- The screen content stays static; any scrolling or typing would compete with the object motion.

## Missing components
- CloudLayer: 2–4 blurred volumetric cloud sprites wider than the frame, moved as one layer by a y keyframe track, blur 8–20 px by depth (rows 2, 7) (techniques: dolly, blur-dissolve)
- SkyGradient: vertical gradient top→horizon colour, full bleed, fixed (all rows) (techniques: none, look)
- SummitPedestal: dark faceted rock peak drawn or as an image, anchored under the laptop, travels with the camera rise (rows 2–4) (techniques: device-laptop)
- LaptopLiftPitch: LaptopFrame pose track that lifts from the pedestal and pitches from ~25° elevation to near-frontal with ±8° roll on springs.heavy, then tips back and drops on easings.inExpo (rows 4, 6) (techniques: device-laptop, push-in)

## Proposed terms
- cloud-wipe: a blurred cloud layer sweeps through the frame to cover or uncover the scene, used as an opening and closing wipe (rows 2, 7) (not in craft/vocabulary.md; not used in recipe.json)
- levitate-tilt: a device lifts off a resting surface and pitches toward camera, revealing its keyboard or underside (row 4) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strip extracted (source file not used). Not measurable: overshoot on the lift (row 4), exact entrance and drop frame counts (rows 2, 6), roll angles (estimated from the sheets ±3°). Scale numbers from screen width in first and last cell of each row. Palette from palettegen on keyframes kf-001.50, kf-004.50, kf-006.50 (cut frames are composites with labels). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/1 cuts within ±2 fr (no beats; no music).

## Study log
id peak-laptop-cloud-lift · family product-ui · 7.43 s, 7 rows (1 hard cut at 0.07, 1 soft at 7.13–7.43, one continuous shot split at state changes)
techniques 4 (device-laptop, dolly, push-in, blur-dissolve) · cut_on_beat false (no music, 0/1)
not measurable at 0.25 s: lift overshoot, drop and cloud entrance frame counts, roll angles ±3°
proposed terms: cloud-wipe, levitate-tilt
missing components: CloudLayer, SkyGradient, SummitPedestal, LaptopLiftPitch
difficulty easy · render_cost light · loopable false (end close to start, not within 2 %)
phase B: not run
