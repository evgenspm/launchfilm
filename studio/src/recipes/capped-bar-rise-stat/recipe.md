# Capped bar rise with outline stat

Five flat colour bars with detached white caps rise together from a baseline while their values count up, the header lifts to the top and an outline growth figure steps in. One move, then a long readable hold.

Source: https://jitter.video/template/bar-chart-skyline/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A square stat card for a monthly or quarterly growth number
- Opening a data story with one headline figure backed by five values
- A silent social post where the chart must read in under 3 s
- Dashboard or report teasers with a flat, poster-like palette
Not for: more than about 7 categories (bars get too thin for inside values), or data that falls (the whole grammar is growth).

## Format
1:1 · 4.0 s · 30 fps · dark · no music, cut_on_beat n/a (0 cuts, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.23 | 0–37 | hook | empty dark square; outlined label chip (1 word) and filled period chip at mid height left, small mark right, five white baseline caps | static | f0–7 empty; chips fade in from f8, period fill brightens to white by f37 (easings.linear); mark grows from a flat line f8 to full f15; caps draw left to right from f13, stagger 1 fr, thicken 2 to 8 px, settled f28 | hard-cut | |
| 2 | 1.23–2.80 | 37–84 | proof | the five bars rise to unequal heights with live values inside; header lifts to the top edge; outline growth figure (4 chars) appears under it; 3-letter month labels rise in at the bar feet | static | bars and header ride one curve f37–f80 (43 fr): accelerating lead f37–f48 (easings.inExpo 11 fr), peak 62 px/fr on the tallest bar at f48, then easings.outQuint 32 fr tail, no overshoot at 30 fps; header travels 515 px up; values count with the bar height, last tick f84; figure steps in per character f46–f53, 1–2 fr each; month labels rise f60–f68 (±0.25 s) | hard-cut | whoosh |
| 3 | 2.80–4.00 | 84–120 | proof | settled chart: chips and mark on top, outline figure, five capped bars with values and month labels | static | full hold 36 fr, nothing moves after f84 | hard-cut | |

Evidence per row: row 1 `sheet-01 cells 0–5` (0.00–1.27), 30 fps strip 0.00–1.60 s, `keyframes/kf-000.50.jpg`; row 2 `sheet-01 cells 6–11` (1.50–2.77), 30 fps strip 1.40–2.60 s, `keyframes/kf-001.50.jpg`; row 3 `sheet-01 cells 12–15` (3.00–3.77), `keyframes/kf-003.50.jpg`. No `cuts/*.jpg` (cuts.json is empty). Row boundaries are state changes inside the single shot (measure.md §4 split applied although the shot is exactly 4 s: rise start f37 and last value tick f84 are the only state changes).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| chart-draw | 1–2 (caps draw on, bars rise) | craft/vocabulary.md#ui, `BarChart` in studio/API.md, `springs.chartBar` in craft/04#springs |
| counter | 2 | craft/vocabulary.md#type, `Counter` in studio/API.md |
| logo-from-dot | 1 (mark grows from a line) | craft/vocabulary.md#brand |

## Look
Palette: #1C1C1C background, #DAD6D6 caps / chips / second bar (near white), #E4E82F accent (tallest bar), #79B7DD, #FA802F, #CB8E4D (other bars). Type: bold grotesk numerals inside bars (7 % H) with a small superscript unit; outline-only display figure (14 % H, 2 px stroke); small uppercase grotesk chip labels (2.5 % H); regular grotesk month labels (2.5 % H). Treatment: none. Background: flat.

## What to adapt
- Copy: 1 chip label (1 word), 1 period chip (4 chars), 1 headline figure (≤ 5 chars, shown as outline), 5 category labels (3 chars), 5 values with a 1-char unit.
- Brand: accent goes on the bar that carries the claim (the tallest); caps, chips and figure stroke use the foreground colour; mark sits top right of the header row.
- Timing: row 1 can stretch (it is a quiet build); the rise must keep its 43 fr and the 11 fr accelerating lead; keep at least 30 fr of full hold after the last tick.

## Pitfalls
- The header and the bars share one curve: if the header lifts on a different spring the frame reads as two moves.
- The catalogue says "overshoot", the measured heights are monotone to the last frame: use a no-overshoot curve, not `springs.pop`.
- The caps are separate 18 px slabs 8 px above each bar; drawing them as a bar border loses the look.
- Values must count in lockstep with height; they start hidden below the baseline and are only legible from about f44.

## Missing components
- CappedBars: BarChart variant with a detached cap slab per bar (18 px tall, 8 px gap above the fill), values inside the top of each bar with a superscript unit, labels inside the foot, rise driven by an external progress so a header can share it (techniques: chart-draw, counter)
- OutlineFigure: display text drawn as stroke only (2 px, no fill), stepping in one character per 1–2 fr (techniques: counter)
- ChipPair: outlined label chip plus filled chip, mono or grotesk 2.5 % H, fill brightening from 25 % to 100 % over 30 fr

## Proposed terms
- char-step-in: characters of a display figure appear one by one, 1–2 fr apart, no blur or offset (row 2)
- layout-lift: a header block travels with the content it introduces on the same curve, making room as the content grows (row 2)
- label-foot-rise: category labels appear inside the foot of each bar after the bar passes them (row 2)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0.00–1.60 and 1.40–2.60 s, plus per-frame column scans of bar tops and header position on the local source file. Not measurable: exact chip fade curve (low contrast, ±4 fr), label rise curve (±0.25 s). Final bar heights 374/511/280/632/414 px of 1188 for values 18/24/14/30/20 (21 px per unit), baseline 4.5 % from the bottom, bar width 18 % W, gap 0.7 % W. SFX planned by the glue rule, not measured (source is silent). cut_on_beat = 0/0 cuts within ±2 fr.

## Study log
- id capped-bar-rise-stat · family data-stats · 4.0 s, 1:1, 30 fps · 3 rows (single shot split at f37 and f84)
- techniques 3 (chart-draw, counter, logo-from-dot) · cut_on_beat n/a (0 cuts, silent source)
- measured at 1 fr from local 30 fps strips and column scans; chip fade ±4 fr, label rise ±0.25 s
- catalogue overshoot hint not confirmed: bar heights monotone, no overshoot
- proposed terms: char-step-in, layout-lift, label-foot-rise
- missing components: CappedBars, OutlineFigure, ChipPair
- phase B: not run (study job)
