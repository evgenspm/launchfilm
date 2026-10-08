# Concentric progress rings fill on a stat card

A white stat card grows from a point, three nested progress rings sweep on from twelve o'clock beside three ratio figures, hold for over a second, then the arcs retract and the card fades back to an empty canvas, so it loops.

Source: https://jitter.video/template/stacked-donut-chart/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Two to four goal-vs-actual figures shown at once in an analytics or reporting product (proof beat).
- A short loopable dashboard widget moment for a feed, landing page hero or slide.
- An insert inside a longer film where one card has to prove a result.
- Light SaaS brands with three distinct accent colours.
Not for: a single headline number (use `counter`), trends over time (use a line chart), dark cinematic films.

## Format
other (3:2, 1296×864) · 4.00 s · 30 fps · light · music none (silent reference), cut_on_beat n/a (0 cuts) · VO no · loopable (first and last cells are the same empty canvas)

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–4.00 | 0–120 | hook | one shot, no cuts: empty light canvas, a rounded white stat card grows in; title, period line, 3 ratio figures with legend left, 3 nested rings right fill, hold, retract, card fades out | locked off, no camera move (motion.json 1–4 s: pan 0, zoom 0 %/s; 0–1 s reading is the card growing) | card scale 0.35 → 1.00 from centre on `springs.layout`, settled by 0.77 s (~23 fr, overshoot not measurable, ±0.25 s); title + legend fade in 0.27–0.50 s; tracks and arcs draw on clockwise from 12 o'clock while the ring group rotates ~90° into place, inner → middle → outer, stagger ~3 fr (±0.25 s), `easings.outExpo`, settled by 1.00 s (f30); figures `mask-rise` 0.50–0.77 s (±0.25 s); hold 1.00–2.27 s (~38 fr); exit 2.27–2.77 s: arc tails retract clockwise with `easings.inExpo`, opacity to ~0.15; card gone by 3.27 s; empty canvas 3.27–4.00 s | hard-cut (end) | pop on card in, tick per ring settle, swoosh-short on exit (planned) |

Evidence per row: sheet-01 cells 0–15 (0.00 empty; 0.27 small blank card; 0.50 card full size, legend only, ring stubs drawing with the group rotated; 0.77 figures half-risen in their clip, inner arc most of the way; 1.00–2.27 static full state; 2.50 arcs retracting, colours fading; 2.77 ghost arcs; 3.00 faint card; 3.27–3.77 empty), keyframes kf-000.50, kf-001.50, kf-002.50, kf-003.50. cuts.json: 0 hard, 0 soft, 0 flashes (no cut frames).

Rows: the shot is 4.00 s, not longer than 4 s, so measure.md §4 rule 3 does not split it; the internal phases (build, hold, exit, empty) are written into `motion`.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| chart-draw | 1 (0.50–1.00 s draw on, 2.27–2.77 s reverse) | craft/vocabulary.md#ui, ProgressRing in studio/API.md |
| mask-rise | 1 (figures 0.50–0.77 s, cell 0.77 shows the middle figure cut by its clip) | craft/vocabulary.md#type, BlurIn enter="mask" |

## Look
Palette: #FAFAFA canvas, #FFFFFF card, #7C3DD9 inner ring (violet), #D02B61 middle ring (magenta-pink), #F79762 outer ring (palettegen's sample of the warm yellow arc; the arc reads as amber-yellow at full res), #F5F3F3 ring tracks. Figures near-black, suffix and labels light grey. Type: geometric grotesk; title bold sentence case ~2.4 % H; figures semibold ~5 % H with a grey "/total" suffix at ~60 % size; legend labels ~1.9 % H beside rounded colour squares. Treatment: none. Background: flat light grey, card has a 1 px hairline border and ~40 px radius, no visible shadow.

## What to adapt
- Copy: 2 lines (card title, 2–3 words; period line, short) plus 3 stats, each value / total + a 1–2 word label.
- Brand: three accent colours carry the rings and the legend squares in the same order (inner = first series). Keep the canvas and card neutral.
- Timing: the hold (38 fr) can stretch for a longer insert; keep the build at ~30 fr and the exit at ~15 fr. For a seamless loop keep the empty canvas at both ends.

## Pitfalls
- Sweeps are data-true (inner ~0.82 turn for 335/400, middle ~0.65 for 80/120, outer ~0.37 for 45/120). Arbitrary sweeps make the figures lie.
- The rings start rotated ~90° counter-clockwise and rotate into place as they draw; drawing on a fixed start angle looks flatter.
- The exit retracts from the arc start, not from the end; reversing the draw gives a different, weaker read.
- Grey tracks must be full circles under each arc, or the empty share is invisible.

## Missing components
- ConcentricRings: N `ProgressRing`s sharing a centre, radii ~195 / 145 / 95 px at 864 px H, stroke ~28 px, butt caps, full grey track each, start-angle rotation -90° → 0° during the draw, per-ring stagger 3 fr, retract-from-start exit (techniques: chart-draw)
- StatCard: rounded white card (radius ~40 px, hairline border) that grows from scale 0.35 at the centre, title + period line, a left legend column of value/total figures with colour squares (techniques: mask-rise)

## Proposed terms
- ring-fill: nested progress rings sweep to value/total, staggered inner to outer (row 1, 0.50–1.00 s) (not in craft/vocabulary.md; not used in recipe.json)
- arc-retract: exit where each arc shrinks from its start edge toward its end while fading (row 1, 2.27–2.77 s) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strips extracted). Not measurable: card spring overshoot, exact ring stagger (written ~3 fr ±0.25 s), figure rise length. SFX planned by the glue rule, not measured (silent reference). cut_on_beat = 0/0 cuts within ±2 fr (no music, no cuts). Palette from ffmpeg palettegen on kf-001.50.

## Study log
- id concentric-ring-fill-card · family data-stats · 4.00 s, 1 row (0 cuts) · loopable
- techniques 2 (chart-draw, mask-rise) · cut_on_beat n/a (0/0, silent)
- not measurable at 0.25 s: card overshoot, ring stagger, figure rise length
- proposed terms: ring-fill, arc-retract
- missing components: ConcentricRings, StatCard (ProgressRing exists)
- phase B: not run (study only)
