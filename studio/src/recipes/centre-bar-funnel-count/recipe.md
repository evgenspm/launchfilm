# Centre-out bar funnel with live counters

Five stacked colour bars appear as hairlines on the centre axis, then widen symmetrically into a descending funnel while each big figure counts up and settles. A small header moves to the top as the bars arrive.

Source: https://jitter.video/template/horizontal-bar-chart-metrics/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Three to five headline metrics shown as a ranking or funnel in one frame
- A short silent social post or slide insert that ends on a readable stat poster
- Values that differ by orders of magnitude: width encodes rank, not scale
- A data beat inside a longer film where the last frame must hold
Not for: precise value comparison (widths are not proportional), more than 6 metrics, wide 16:9 frames without re-layout.

## Format
4:5 · 4.00 s · 30 fps · dark · music none, cut_on_beat n/a (0 cuts, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–4.00 | 0–120 | hook | dark flat frame; two-word header and corner mark at mid height, then five stacked colour bars widen into a centred funnel, each with a big figure and a small label | static (no frame-wide scale or pan in any cell) | header fades in 15 fr, easings.outExpo (±0.25 s), 0.27–0.77; mark assembles 0.50–0.77; f38 hairline of the middle bar; f45 all five bars as slivers, centre-out stagger ~4 fr (±0.25 s); widths grow symmetrically on easings.outExpo 45 fr, f45–f90 (70 % at f60, 90 % at f68, 97 % at f75); header slides off left f53–f60 and re-enters top-left, opaque by f90; figures count up on easings.outExpo 37 fr, f53–f90; hold 30 fr | hard-cut | swoosh-short per bar, tick on settle (planned) |

Evidence: sheet-01 cells 0–3 (0.00–0.77: empty, header fade, mark), cells 4–5 (1.00–1.27: header held at mid height, first hairline at 1.27), cell 6 and keyframe kf-001.50 (bars as slivers, middle widest), cell 7 (1.77: bars at ~40 %, header leaving left), cells 8–11 (2.00–2.77: widths 70 → 99 %, counters rolling last digits, header back at top), cells 12–15 and kf-003.50 (3.00–3.77: identical, final values). No cut frames (cuts.json has 0 cuts).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| chart-draw | 1 | craft/vocabulary.md#ui (BarChart, springs.chartBar); here bars grow sideways from the centre, not up |
| counter | 1 | craft/vocabulary.md#type (Counter, Stat) |

## Look
Palette: #1C1C1C background, #FFFFFF header and bar rules, #F9802F accent bar (middle, widest at first), #78B8DB top bar, #E6E825 fourth bar, #CC8C4E bottom bar; second bar is warm light grey #D4CCC9. Type: header medium grotesk sentence case 2.6 % H; figures heavy condensed grotesk ~8 % H, near-black on the bar, left-aligned with a ~3 % W inset; labels regular grotesk ~2 % H, bottom-right. Treatment: none. Background: flat.

Layout (from kf-003.50, 1120×1400): bars centred on x = 50 %, widths 92 / 81 / 70 / 59 / 48 % W (step 11 %), each ~16 % H tall, gaps ~1 % H, stack spans 11–97 % H; each bar has a white double rule (2 px + 2 px) on its top edge. Header top-left at 5 % H, mark top-right.

## What to adapt
- Copy: one header of two words; 3–5 figures with a 2-word label each, ordered largest first.
- Brand: one bar carries the accent (the middle bar is the one that shows first); the others take brand neutrals and secondary colours; mark top-right.
- Timing: the hold (f90–f120) can stretch for a poster; keep the 45 fr growth and the 37 fr count ending on the same frame.

## Pitfalls
- Widths are rank steps, not values: proportional widths would make the bottom bars invisible.
- Height never animates: bars appear at full height as hairlines and only widen. Growing height reads as a different chart.
- Counters start close to their final values and roll only the last digits; counting from 0 makes the figures unreadable during the growth.
- Figures are left-aligned inside each bar and get clipped by the bar edge while it widens (cells 7–8): use overflow hidden, not a fade.

## Missing components
- FunnelBars: N bars stacked vertically, centred, width per row as a fraction of W, grow from a centre hairline on easings.outExpo 45 fr with a centre-out stagger ~4 fr, white top rule, Counter + label inside with overflow clip (techniques: chart-draw, counter)

## Proposed terms
- centre-out-widen: bars or blocks grow horizontally in both directions from the frame axis, starting as full-height hairlines (row 1) (not in craft/vocabulary.md; not used in recipe.json)
- header-relocate: a header first shown at mid height slides off and re-enters at its final top position once the content arrives (row 1) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (cells at 0.00, 0.27, 0.50, 0.77 per second); 1 full-res keyframe per second for layout and colour. No 30 fps strip was made. Not measurable: exact stagger between bars, easing shape and any overshoot of the width growth, the exact path of the header move (±0.25 s). Palette sampled from kf-001.50 and kf-003.50 (palettegen plus 6×6 px crops). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
- id centre-bar-funnel-count · family data-stats · 4.00 s, 1 row (single 4 s shot, 0 cuts, not > 4 s so not split)
- techniques 2 (chart-draw, counter) · difficulty easy · render_cost light
- cut_on_beat n/a: silent, 0 cuts, no beats
- not measurable at 0.25 s: stagger, easing shape, overshoot, header path
- proposed terms: centre-out-widen, header-relocate
- missing components: FunnelBars
- phase B: not run (study phase only)
