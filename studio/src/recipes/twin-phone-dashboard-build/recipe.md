# Twin phone dashboard build-up

Two bezel-less phone screens fade up on a light stage, then a finance dashboard assembles itself: tinted metric cards with rolling numbers and rings, rising bars, a 2x2 stat grid. Holds on a slow push, fades out to an empty loop.

Source: https://jitter.video/template/revenue-app-dribbble/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Showing a finance, sales or analytics mobile app in one short loop
- A silent autoplay shot for a landing page hero or a social card
- Proving the product tracks numbers: metrics, progress and a chart on one screen
- Opening a longer film with a calm, light product reveal
Not for: products without numeric UI, desktop-first tools, films that need a story or a CTA (there is no copy beyond UI labels).

## Format
other (1322x992, 4:3-ish) · 5.00 s · 30 fps · light · no music, cut_on_beat n/a (0 cuts) · VO no · loopable

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.40 | 0–12 | hook | empty light stage (grey disc, three small dots); left screen fades up with header and greeting | push-in starts, decelerating (9.3 %/s in s 0–1) | stage alone f0–f6; left screen fade + small rise, easings.outQuint 6 fr | hard-cut | swoosh-short |
| 2 | 0.40–0.80 | 12–24 | proof | right screen fades up offset lower; three tinted metric cards on the left, five-bar chart on the right | push-in, decelerating | right screen easings.outQuint 5 fr, 6 fr after the left; cards cascade, stagger ~4 fr, easings.outExpo 8 fr; figures roll up in a clip mask ~10 fr; bars on springs.chartBar, stagger 2 fr | hard-cut | pop |
| 3 | 0.80–1.27 | 24–38 | proof | chart title, then a 2x2 grid of stat tiles; rings finish drawing; bottom nav icons appear | push-in, decelerating | tiles fade + rise row by row, stagger ~4 fr, easings.outExpo 8 fr (overshoot not measurable); arcs draw clockwise easings.outQuint ~12 fr; settled by f38 (±0.25 s) | hard-cut | tick |
| 4 | 1.27–4.50 | 38–135 | proof | complete dashboard on both screens, held | push-in about 1.00→1.05 over 97 fr, 2.4→0.35 %/s, easings.outQuint | none; slight upward drift of both screens (~2 % H) | hard-cut | none |
| 5 | 4.50–5.00 | 135–150 | proof | screens fade out, left first, back to the empty opening stage | push-in near stopped (0.35 %/s) | left opacity 1→0 easings.inExpo 5 fr from f135; right 4 fr, 2 fr later; empty f141–f150 | hard-cut | swoosh-short |

Evidence per row: 1 `sheet-01 cells 0–1`, 30 fps strip at 0 s rows 1–2, `kf-000.50.jpg`; 2 `sheet-01 cells 2–3`, strip at 0 s rows 3–4; 3 `sheet-01 cells 3–5`, strip at 0 s row 5; 4 `sheet-01 cells 5–15`, `sheet-02 cells 0–1`, `kf-001.50.jpg`…`kf-004.50.jpg`, motion.json s 1–4; 5 `sheet-02 cells 2–3`, strip at 4 s rows 3–5. cuts.json: 0 hard, 0 soft, 0 flashes (no cut frames).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-phone | 1–5 | craft/vocabulary.md#ui (PhoneFrame, bezel off) |
| ui-rebuild | 1–5 | craft/vocabulary.md#ui |
| card-grid | 2–3 | craft/vocabulary.md#ui (metric cards, 2x2 tiles) |
| counter | 2 | craft/vocabulary.md#type (Counter, rolling) |
| chart-draw | 2 | craft/vocabulary.md#ui (BarChart, springs.chartBar) |
| push-in | 1–5 | craft/vocabulary.md#camera (Camera) |

## Look
Palette: #F6F6F6 stage background, #3D3D3D heading and figure text, #A9EBAE green accent (bars, profit card, active nav), #F2BD92 orange (sales card, dot), #A2DEF1 blue (orders card, dot), #E5E7E5 grey disc behind the screens. Screens are pure white with soft wide shadows. Type: geometric sans, semibold headings and figures, sentence case, normal tracking; greeting ~3 % H, captions ~1.3 % H light grey. Treatment: none. Background: flat light grey with one large soft grey disc.

## What to adapt
- Copy: greeting (2 words) + muted sub-line (2 words); 3 metric cards (label, sub-label, value, %); chart title (2 words); 4 tiles (icon, value, label). 7 figures in total.
- Brand: three card tints carry the palette; the bar colour and active nav icon carry the accent. No logo appears.
- Timing: row 4 (hold) stretches or shrinks; rows 1–3 keep their frame counts (whole build is 32 fr); keep the empty tail ≥ 9 fr if it must loop.

## Pitfalls
- The build is fast (f6–f38): slowing it past ~1.5 s turns the loop into a tutorial.
- The right screen lags the left by 6 fr and sits lower; aligning them flattens the depth.
- Pastel tints at low contrast: keep figure text dark (#3D3D3D) or the cards read as empty.
- The last frames must match frame 0 (empty stage) or the loop seam shows.

## Missing components
- MetricCard: tinted rounded card with label, muted sub-label, rolling value and a ProgressRing on the right, enters fade + 8 px rise easings.outExpo 8 fr (techniques: card-grid, counter)
- StatTile: square grey tile, centred icon + value + label, used in a 2x2 grid with 4 fr stagger (techniques: card-grid)
- Bezel-less PhoneFrame variant: white rounded rectangle, radius ~10 % of width, soft shadow, no camera or status bar (techniques: device-phone)

## Proposed terms
- fade-up-loop: the scene starts and ends on the same empty stage, the UI fades up and fades out inside it so the clip loops seamlessly (rows 1, 5) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0 s and t = 4 s (local source); 0.25 s from sheets elsewhere. Not measurable: per-figure roll speed and per-bar stagger (strip shows them only as grouped fades at 480 px), spring overshoot of the tiles. Camera scale from motion.json zoom %/s, not from object widths. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
- id twin-phone-dashboard-build, family mobile-app (catalogue hint product-ui; both screens are phones), status studied
- 5.00 s, 30 fps, 1322x992 (other), loopable; 0 cuts, 5 rows split at state changes
- 6 techniques: device-phone, ui-rebuild, card-grid, counter, chart-draw, push-in
- audio: silent, no VO, no music; cut_on_beat n/a (0/0)
- build f6–f38 measured from a 30 fps strip; hold 97 fr; staggered fade-out f135–f141
- not measurable: per-bar stagger, counter roll duration, tile overshoot
- proposed terms: fade-up-loop
- missing components: MetricCard, StatTile, bezel-less PhoneFrame variant
- phase B: not run (study only)
