# Ring fill with a climbing percentage

One thin ring on a flat saturated field fills clockwise from 12 o'clock while the centred percentage counts up in sync, fast through the middle and crawling into the last points. A single stat lands without any other element.

Source: https://jitter.video/template/counter-progress-ring/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- One headline figure (accuracy, uptime, completion) needs its own short beat
- A loading or processing moment inside a longer product film
- A social tile or stat card for a feed
- Silent autoplay where the number must read without VO
Not for: several figures at once, or a figure that is not a share of a whole (counts, money): the ring implies a percentage.

## Format
4:5 · 4.00 s · 30 fps · light · music none (no audio track), cut_on_beat 0/0 · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–4.00 | 0–120 | hook | thin ring centred on a flat bright field, pale track, dark arc filling clockwise from 12 o'clock, percentage label centred | static | one shared curve for arc and number: hold at 0 until about f8 (±0.25 s), short ease-in, fastest 1.00–1.27 s (22 to 51 %), long decelerating tail close to easings.outExpo; 85 % at f60, 95 % at f83, 99 % from f105 to end | hard-cut | tick (planned) |
Evidence: row 1 = sheet-01 cells 0–15; keyframes kf-000.50, kf-001.50, kf-002.50, kf-003.50 for ring size, stroke and type. cuts.json has 0 cuts, cuts/ is empty. motion.json labels every second `hold` (no camera move, pan ≤ 4 px/s, zoom ≤ 0.13 %/s).

Counter readings (sheet-01, cell timestamp: value): 0.00: 0, 0.27: 0, 0.50: 2, 0.77: 9, 1.00: 22, 1.27: 51, 1.50: 68, 1.77: 78, 2.00: 85, 2.27: 90, 2.50: 93, 2.77: 95, 3.00: 97, 3.27: 98, 3.50: 99, 3.77: 99.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| counter | 1 | craft/vocabulary.md#type (number ticker), studio ProgressRing label |

## Look
Palette: #00FF29 background (flat saturated green), #010101 arc and label, #4EFE6A track (lighter tint of the background). Type: bold grotesk numerals with a percent sign, cap height about 7 % of frame height, centred; the label widens as digits are added. Treatment: none. Background: flat. Ring: radius about 0.32 of frame width (diameter ~720 px of 1120), stroke ~12 px (thin, about 3 % of radius), butt caps, no glow.

## What to adapt
- Copy: no lines; one figure (final value) and its unit. An optional short caption under the ring is ours, not in the reference.
- Brand: bg carries the field, fg the arc and number; track is a light tint of the bg. A dark brand flips it (dark field, light arc).
- Timing: the fill length (about 105 fr) can stretch with the cut; keep the shape: slow first 8 fr, fastest third in the middle, long tail into the final value.

## Pitfalls
- The arc and the number must come from the same value every frame; a counter on its own curve reads as fake.
- ProgressRing defaults (9 o'clock start, counter-clockwise, thick stroke, glow, inOutExpo) do not match: set startAngle 0, direction 1, thin stroke, glow 0, a decelerating easing.
- Centre the label on its box, not on the digits: the width change from 1 to 2 digits must not shift the ring.
- Ending at 99 % instead of 100 % keeps it open; for a loop, add a reset or reach 100 and fade.

## Missing components
none (ProgressRing covers the arc and label with props; a decelerating easing is passed in from easings)

## Proposed terms
- progress-ring: circular stroke fill tied to a counter, the arc length equals the value (row 1) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (cell timestamps 0.00, 0.27, 0.50, 0.77 … as burned in). Not measurable: exact fill start frame (between f0 and f15), the precise easing curve inside each 0.25 s step, whether the number rounds or floors. No source strips extracted. Palette from palettegen on keyframes kf-000.50, kf-001.50, kf-003.50 (cuts/ is empty), near-duplicates merged. SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr (no audio, no cuts).

## Study log
- id ring-fill-percent-climb · family data-stats · 4.00 s · 1 row (single 4.00 s shot, no cuts, not over 4 s so not split)
- techniques: 1 (counter) · cut_on_beat n/a (0 cuts, no audio)
- not measurable at 0.25 s: fill start frame, exact easing, rounding of the label
- proposed terms: progress-ring
- missing components: none (ProgressRing with non-default props)
- phase B: not run (study only)
