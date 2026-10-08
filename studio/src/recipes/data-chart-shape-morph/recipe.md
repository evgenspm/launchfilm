# Data chart shape morph

A compact data card pulls back as a flat line becomes a moving area chart, then its six points reorganize into a radar plot. The chart earns its final form through one continuous transformation.

Source: https://jitter.video/template/morph-line-to-radar-chart/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A metric story should progress from simple history to multidimensional comparison.
- A short silent data-visualization interlude needs one clear transformation.
- A dashboard feature needs motion without showing a full product screen.
Not for: datasets with more than six categories or stories that need exact values to remain readable throughout.

## Format
other · 10.27 s · 30 fps · dark · music absent, cut_on_beat 0/0 (no cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.00 | 0–30 | hook | six-point baseline becomes a filled line chart; rounded card reveals the surrounding field | pull-out 1.00→0.42 over 30 fr, springs.cameraOut | baseline points rise with easings.outExpo over ~8 fr (±0.25 s); card settles by 30 fr | frame-in-frame | planned whoosh |
| 2 | 1.00–6.00 | 30–180 | proof | six-point area chart advances through changing value windows and travelling labels | static; card bounds and centre do not change | points, fill and labels interpolate continuously with easings.linear over 150 fr; per-state timing not measurable (±0.25 s) | morph | planned tick per value window |
| 3 | 6.00–10.27 | 180–308 | proof | six points remap onto a six-axis radar grid, then cycle through comparison shapes | static; card bounds and centre do not change | axes assemble and points morph on springs.ui over ~23 fr (±0.25 s); later shapes use easings.inOutSine over ~15 fr each (±0.25 s) | hard-cut | planned swell |

Evidence per row: row 1 `sheet-01 cells 0–4`, `cuts/cut-000.37.jpg`, `keyframes/kf-000.50.jpg`; row 2 `sheet-01 cells 4–15`, `sheet-02 cells 0–7`, `keyframes/kf-001.50.jpg` through `kf-005.50.jpg`; row 3 `sheet-02 cells 8–15`, `sheet-03 cells 0–8`, `keyframes/kf-006.50.jpg` through `kf-009.50.jpg`.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| chart-draw | 1 | `craft/vocabulary.md#ui`, `craft/04#durations` |
| pull-out | 1 | `craft/vocabulary.md#camera`, `craft/04#springs` |
| frame-in-frame | 1 | `craft/vocabulary.md#camera`, `craft/09#default` |
| morph | 2–3 | `craft/vocabulary.md#transitions`, `craft/04#durations` |
| mesh-gradient | 1–3 | `craft/vocabulary.md#look`, `craft/06#grade-discipline` |

## Look
Palette: outer field `#54495B` shifting to `#4D5462`; pink card `#F6C7FD`; pink chart `#967EA3`; blue card `#C8E3FE`; blue chart `#8591B0`. Type: regular grotesk, sentence case, normal tracking, 2.5 % of frame height. Treatment: `mesh-gradient`. Background: dark low-contrast gradient surrounding one light rounded card.

## What to adapt
- Copy: one neutral heading of at most 3 words; six labels short enough to sit under or around the chart.
- Brand: use one light surface and one translucent accent fill; shift the accent once at the chart-form change.
- Timing: keep the 23 fr line-to-radar morph and at least 90 fr of fully readable radar states; the 5 s line-chart run may stretch.

## Pitfalls
- The same six values must keep their identity during the remap; changing the point order turns the morph into a visual jump.
- Radar axes have to appear before the polygon settles, within the same ~23 fr move, or the final form reads as an unrelated chart.
- Repeated ticks can become noisy; use one quiet variant per data-window change and rotate 3–5 samples.

## Missing components
- None. Phase B added the local `RadarChartMorph`: six SVG points keep their order while remapping from Cartesian positions to six radial axes over 23 fr on `springs.ui`.

## Proposed terms
- `chart-window-scroll`: a fixed chart viewport advances category labels and interpolated values as one continuous data window; visible in row 2 (not in `craft/vocabulary.md`; not used in `recipe.json`).

## Measurement notes
Resolution: 0.25 s from sheets; full-resolution keyframes were used for type, colour and UI detail. Not measurable: entrance overshoot, exact point-easing curves, and per-dataset settle frames. The soft transition spans 0.37–0.57 s (frames 11–17) and is an accent inside row 1, not a cut. Palette colours came from `palettegen` on keyframes at 0.50, 6.50 and 9.50 s. SFX planned by the glue rule, not measured. cut_on_beat = 0/0 because there are no cuts or beats.

## Build comparison

| Row | Reference t0–t1 | Ours t0–t1 | Δ boundary (fr@30) | Subject / layout match | Motion character match | Fix |
|---|---|---|---|---|---|---|
| 1 | 0.00–1.00 | 0.00–1.00 | 0 / 0 | Same full-frame chart card resolving to a centred portrait card; shellpine supplies the dark field, light card and lime data accent | Same pull-out and baseline-to-area draw; anisotropic scale also changes the card from frame aspect to portrait | Iteration 2 changed the pull-out from uniform scale to measured X/Y scale and kept the title visible at frame 0 |
| 2 | 1.00–6.00 | 1.00–6.00 | 0 / 0 | Same fixed card, six-point filled area chart, header and travelling label row | Continuous eased dataset windows every 45 fr; reference windows vary slightly and cannot be timed below ±0.25 s | No further fix; window cadence differs by at most one 4 fps cell |
| 3 | 6.00–10.27 | 6.00–10.27 | 0 / 0 | Same six-axis grid, six persistent points and filled radar polygon inside the unchanged card | Same line-to-radar morph family on `springs.ui`, stretched to the measured 23 fr, followed by changing radar states | Iteration 2 stretched the initial morph so the 6.25 s and 6.50 s hybrid states match the sheet |

Theme and palette roles match: dark field, light surface, one translucent data fill and one high-contrast line. Shellpine changes the reference's violet/blue hues to its own green-black, off-white and lime tokens by design. Shot count is 3 versus 3; all boundaries are exact.

## Study log

id `data-chart-shape-morph` · family `data-stats`.
10.27 s at 30 fps · 3 contiguous rows · 0 hard cuts · 1 soft transition.
5 vocabulary techniques: chart-draw, pull-out, frame-in-frame, morph, mesh-gradient.
cut_on_beat false: 0/0 cuts, no audio or beats.
Resolution 0.25 s; overshoot, exact point curves and per-dataset settle frames were not measurable.
Proposed term: `chart-window-scroll` in row 2.
Missing components: none; phase B added the local `RadarChartMorph`.
Phase A: offline schema and vocabulary validation passed.
Phase B: built in 2 comparison iterations with the local `RadarChartMorph` and shellpine demo content.
Gate: schema valid; composition 1280×800, 30 fps, 308 frames; final duration 10.267 s versus reference 10.267 s (ratio 1.000).
Gate: 3 ours sheets exist at 4 fps; final MP4 and frame-0 JPEG poster exist.
Comparison: 3/3 row boundaries exact (0 fr delta), shot count 3/3, morph onset exact at frame 180.
Remaining difference: shellpine brand colours replace the reference hues; dataset state changes can differ by one 0.25 s sheet cell.
