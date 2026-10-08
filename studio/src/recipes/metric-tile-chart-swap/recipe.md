# Metric card with sliding highlight and chart swap

One light dashboard card settles in while its line chart draws on and two figures roll up; a lime highlight then slides to the second tile and the chart wipes over to that metric's series before the card folds away.

Source: https://jitter.video/template/line-chart-user-acquisition/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- One growth metric plus a related second figure, shown as a 5 s loop
- Investor or launch slide where one chart proves a claim
- Silent feed or website hero loop for a data or analytics product
- Two series sharing one axis, compared without a cut
Not for: stories with more than two figures, or claims with no real data behind them (never invent numbers)

## Format
other (1294×860, ~3:2) · 5.00 s · 30 fps · light · no music, cut_on_beat n/a (0 cuts) · VO no · loopable (starts and ends on a white frame)

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.25 | 0–68 | hook | white frame, then a pale card: two-line title (2 words total), two metric tiles (first lime, each a label, a 3–4 digit figure and a delta chip), area line chart with 4 axis labels, link row of 3 words | locked frame; card scale 1.17 → 1.00 f6–f24 | 4 empty frames; card fades in f4–f12; lime fill grows from a thin bar to the full tile f6–f24, springs.layout (overshoot not measurable); line draws left to right with area following, easings.outQuint ~21 fr; figures roll digit by digit, last lands f27; hold f27–f67 | hard-cut | tick |
| 2 | 2.25–4.00 | 68–120 | proof | same card: lime highlight moves to the second tile, chart swaps to a flatter second series, holds | static | highlight slides right as a stretched bar f66–f78, springs.ui (overshoot not measurable); old series erased and new one drawn in one left-to-right sweep f66–f90, easings.linear (±0.25 s); hold f90–f120 | hard-cut | pop |
| 3 | 4.00–5.00 | 120–150 | proof | card folds away: figures roll out, first tile collapses, lime tile narrows to a sliver, then white | locked frame; card scale 1.00 → ~0.85 f120–f135 | figures roll out from the leading digit f120–f126; card fades easings.inExpo ~15 fr; chart erased left to right; lime sliver out last f135; white hold f135–f150 | hard-cut | none |

Evidence per row: row 1 `sheet-01 cells 0–8`, strip at t = 0; row 2 `sheet-01 cells 9–15`, strip at t = 2; row 3 `sheet-02 cells 0–3`, strip at t = 4. No cut frames (cuts.json is empty). Full-res detail from `keyframes/kf-001.50.jpg`.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| chart-draw | 1, 2, 3 | craft/vocabulary.md#ui (LineChart) |
| counter | 1, 3 | craft/05-typography.md (counter row) |
| ui-rebuild | 1–3 | craft/vocabulary.md#ui |

## Look
Palette: #FFFFFF frame background, #F4F6F3 card surface, #C6E584 / #BCDE71 lime highlight tile, #EDF0E9 / #EAF2DF chart area and tint. Dark text (near black) and grey qualifier line are too small for palettegen; take fg and muted from the brand. Type: geometric grotesk, sentence-case title on two lines (fg over muted), regular-weight figures ~4.5 % H, tiny tracked uppercase labels. Treatment: none. Background: flat white, card with large radius (~6 % of card width), no visible shadow.

## What to adapt
- Copy: title of 2 short lines; 2 tile labels (1–2 words); 2 figures (≤ 5 digits) with delta chips; 4 x-axis labels; one 3-word link line
- Brand: the accent fills the active tile only; everything else stays neutral grey on white
- Timing: the two holds (f27–f67, f90–f120) can stretch; keep the switch (12 fr highlight, 24 fr chart sweep) and the 15 fr exit

## Pitfalls
- The highlight travels as a stretched bar between tiles; a crossfade between two tile colours loses the move
- The chart swap is one sweep: old line wiped and new line drawn by the same moving edge, not two separate animations
- Both series must share the y-axis, or the second (flatter) series stops reading as a smaller number
- Start and end on pure white frames or the loop pops

## Missing components
- TileHighlight: accent rectangle that moves between N tiles, stretching to ~1.4× width mid-move, springs.ui 12 fr (techniques: proposed highlight-slide)
- LineChart series swap: a `switchAt` frame where one moving edge erases series A and draws series B over 24 fr (techniques: chart-draw)

## Proposed terms
- highlight-slide: an accent fill leaves one tile and lands on the next as the selected state, row 2
- series-wipe: one chart series replaced by another under a single sweeping edge, row 2

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0, 2, 4 s; 0.25 s from sheets elsewhere. Not measurable: spring overshoot on the tile fill and highlight (strips show no visible overshoot), exact easing of the card fade. SFX planned by the glue rule, not measured (silent source). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats). Beat note: rows 2–3 labelled proof (a chart proving a claim is the subject) rather than social-proof.

## Study log
id metric-tile-chart-swap · family data-stats · 5.00 s, 3 rows, 0 cuts, loopable.
Techniques: 3 (chart-draw, counter, ui-rebuild). cut_on_beat: n/a, silent reference.
Measured from 30 fps strips: entrance f4–f27, switch f66–f90, exit f120–f135.
Not measurable: spring overshoot, card fade curve (±0.25 s where noted).
Proposed terms: highlight-slide, series-wipe.
Missing components: TileHighlight, LineChart series swap.
Phase B: not run (study only).
