# Counter over a three-line traced chart, mark close

A big headline figure races up and settles while three coloured series trace across a dark chart one after another; the chart gives way to a dim oversized mark that lights up and shrinks, then a wordmark slides in as the mark breaks away.

Source: https://www.raylight.app/templates/NI0I2l01 (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A monthly or yearly recap with one headline figure and up to three growth series
- Proving traction with a single number before the brand close
- A silent social clip where the chart must read without VO
- Dark product brands with a three-colour data palette
Not for: data that falls or is flat (the shape sells growth), more than three series, figures that need a unit explanation longer than two caption lines.

## Format
other (4:3, 960×720) · 9.87 s · 30 fps · dark · no music, cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.27 | 0–38 | hook | chart frame (baseline, two date labels, three-item legend); headline figure top-left, two-line muted caption | static, locked | figure fades grey to white ~23 fr (±0.25 s) while counting up from ~half its value, easings.outExpo; caption words fade in left to right ~30 fr (±0.25 s); series 1 (green) starts tracing | continuous | tick (planned) |
| 2 | 1.27–4.00 | 38–120 | proof | series 2 (cyan) then 3 (violet) trace under series 1; figure decelerates to its final value | static, locked | series starts f8 / f38 / f60 (stagger ~22 fr, ±0.25 s); each traces ~52–60 fr (±0.25 s); counter lands f83 (75 fr roll), easings.outExpo | continuous | swoosh-short (planned) |
| 3 | 4.00–5.77 | 120–173 | proof | complete three-line chart, settled figure | static, locked | hold 45 fr; chart clears between 5.50 and 5.77 s (±0.25 s), not a cut | continuous | none |
| 4 | 5.77–7.00 | 173–210 | logo | brand mark alone, centred, oversized (~50 % H) and dark grey | static frame, the mark scales | light-on grey to white ~22 fr; shrink ~50 % H to ~17 % H over ~37 fr, springs.heavy (overshoot not measurable) | continuous | swell (planned) |
| 5 | 7.00–8.77 | 210–263 | logo | small white mark centred, held | static, locked | hold ~45 fr, no motion | continuous | none |
| 6 | 8.77–9.87 | 263–296 | logo | wordmark slides in from the left while the mark moves right and breaks into strokes; wordmark ends centred | static, locked | wordmark easings.outExpo ~15 fr (±0.25 s); mark gone by 9.27 s; settled by 9.50 s, holds ~11 fr | end | whoosh (planned) |

Evidence: row 1 sheet-01 cells 0–4 (0.00–1.00 s), kf-000.50; row 2 sheet-01 cells 5–15 (1.27–3.77 s), kf-001.50, kf-002.50, kf-003.50; row 3 sheet-02 cells 0–6 (4.00–5.50 s), kf-004.50; row 4 sheet-02 cells 7–11 (5.77–6.77 s), kf-006.50; row 5 sheet-02 cells 12–15, sheet-03 cells 0–2 (7.00–8.50 s), kf-007.50, kf-008.50; row 6 sheet-03 cells 3–7 (8.77–9.77 s). cuts.json: no cuts (no cut frames).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| counter | 1–2 | craft/vocabulary.md#type, studio Counter |
| chart-draw | 1–3 | craft/vocabulary.md#ui, studio LineChart |
| light-on | 4 | craft/vocabulary.md#brand |

## Look
Palette: #080D0B background, #FFFFFF figure and mark, #10BA80 series 1, #05B5D1 series 2, #5F6AE7 series 3, #425158 muted caption/axis. Type: bold grotesk figures with thousands separator ~17 % H top-left, muted two-line caption ~3 % H, legend and axis labels ~1.5 % H, medium sentence-case wordmark ~6 % H. Treatment: none. Background: flat near-black.

## What to adapt
- Copy: one figure (integer with separator), one caption of two lines (what is counted, the period), three legend labels of 2–4 words, two axis labels (start and end of the period).
- Brand: the three series colours are the data palette; the mark and wordmark are the close; figure stays white.
- Timing: row 3 hold and row 5 hold stretch; series stagger and the counter roll (75 fr) keep their frame counts.

## Pitfalls
- The counter does not start at 0: it opens at ~half the final value and covers ~85 % of the climb in the first 0.5 s; starting at 0 makes the roll read as noise.
- The counter settles (2.77 s) before the last series finishes (~3.8 s); the chart, not the number, carries the end of the build.
- Series lines are hard steps plus slopes (linear segments), not smoothed curves; use LineChart curve 'linear'.
- No cuts at all: every handover is a state change; do not add a hard cut between chart and mark.

## Missing components
- MarkBreakHandoff: mark slides right ~0.3 W while splitting into its strokes, which fade within ~15 fr, as the Wordmark enters from the left on easings.outExpo ~15 fr and lands centred (techniques: none in vocabulary)

## Proposed terms
- mark-break-handoff: the mark slides aside and fragments while the wordmark takes its place, row 6 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strips taken). Not measurable: counter easing curve below 0.25 s, caption word stagger, series trace easing, the exact chart-to-mark change at 5.50–5.77 s (cuts.json near miss at 5.70 s, score 5.1, not a cut), mark shrink overshoot, mark fragment timing. springs.heavy and stagger frames are suggested defaults. Palette from ffmpeg palettegen on keyframes kf-004.50 and kf-008.50 (no cut frames exist). SFX planned by the glue rule, not measured: the reference is silent. cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
- id counter-trace-chart-mark-close, family data-stats, 9.87 s, one shot, 6 rows (hook, proof ×2, logo ×3)
- techniques 3 (counter, chart-draw, light-on); difficulty easy, render cost light
- cut_on_beat: n/a, 0 cuts, silent reference, all SFX planned
- not measurable at 0.25 s: easing shapes, staggers, chart-to-mark change form, mark overshoot
- proposed terms: mark-break-handoff; missing components: MarkBreakHandoff
- phase B: not run
