# Three-line headline that springs in on a tilt and swings out

A stacked three-line headline grows in line by line from a small, slightly rotated state, overshoots and snaps level, holds, then swells and swings clockwise before collapsing back. A short punchy loop for one bold message.

Source: https://jitter.video/template/tilted-text-snap/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A single bold three-beat message for an editorial or promo post
- A silent looping social tile in 4:5 with a header mark and a CTA pill
- The hook of a longer film where one headline must hit in under 1 s
- Brands with a loud display grotesk and a two-colour palette
Not for: messages longer than three short words, or anything that needs to be read for more than about 1 s (the level hold is only 24 fr).

## Format
4:5 · 2.4 s · 30 fps · dark (olive bg, relative luminance ~0.15) · music none, cut_on_beat n/a (0 cuts) · VO no · loopable (first and last frames are the same empty card)

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.40 | 0–72 | hook | flat olive card: small wordmark top centre, outlined CTA pill at the bottom, headline of 3 lines, one word each with a period, centred | static frame; only the headline block scales and rotates | f0–3 empty; lines enter f4/f5/f6 (stagger 1 fr, top first) from ~0.3 scale with their own small tilt, springs.snappy, overshoot ~10–13 % at f8–10, level by f20; hold f20–43; f44–53 block swells ~1.0→1.3 and rotates ~8° clockwise, easings.inOutSine, peak f53–56; f57–62 back to ~1.15; f63–66 collapse to 0, bottom line first, stagger 1 fr, easings.inExpo; f67–71 empty | hard-cut (loop point) | tick on the settle (planned) |

Evidence: `sheet-01` cells 0–9 (0.00 empty; 0.27 lines entering, bottom line still small and tilted; 0.50 overshoot, lines larger than at rest; 0.77–1.50 level and settled; 1.77–2.00 swollen block rotated clockwise; 2.27 empty again), keyframes kf-000.50 (overshoot) and kf-001.50 (rest), plus a 30 fps strip of all 72 frames for the frame numbers. No cut frames exist (cuts.json has 0 cuts).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| statement-sequence | 1 (one statement, one beat) | craft/05#recipes, craft/families/statement.md |
| hard-cut | 1 (loop point) | craft/vocabulary.md#transitions |

## Look
Palette: `#736E4E` background (olive), `#FBE10A` headline, wordmark, pill stroke and label (yellow), `#978B38` antialiased edge tone. Type: heavy grotesk, sentence case, tight tracking and leading (lines nearly touch), one word per line with a period, block ~80 % of width; small bold wordmark top centre; outlined pill CTA bottom. Treatment: none (no grain, no glow visible). Background: flat.

## What to adapt
- Copy: exactly 3 lines, one short word each (5–6 letters keep the block shape), each ending in a period; one CTA label of 2–3 words; one wordmark.
- Brand: background = brand bg, headline + pill + wordmark in one accent colour; the two-colour rule is the look.
- Timing: the level hold (24 fr) can stretch for longer reads; keep the 1 fr stagger, the ~16 fr entrance and the 4 fr collapse.

## Pitfalls
- The tilt is a flat 2D rotation per line, not a perspective plane; using TiltPlane makes it read as UI, not type.
- Lines rotate independently on entrance (they sit at different small angles at f6–9), then the whole block rotates as one during the swing.
- The collapse is 4 fr; a slower exit loses the snap and the loop seam shows.
- Header and pill never move: animating them dilutes the headline.

## Missing components
- TiltSnapLines: N lines stacked with tight leading; per-line entrance from scale ~0.3 and a small rotation to level on springs.snappy, stagger 1 fr; block swing (scale 1→1.3, rotate 0→8°, inOutSine 10 fr, settle back 6 fr); exit to scale 0 in reverse order on inExpo 4 fr (techniques: statement-sequence)

## Proposed terms
- `line-tilt-snap`: each line of a headline springs in from small and slightly rotated, overshoots and snaps level, 1 fr stagger (row 1) (not in craft/vocabulary.md; not used in recipe.json)
- `block-swing`: the settled text block swells and rotates as one piece before the exit (row 1) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from a 30 fps strip of the local source (200 px wide), 0.25 s from the sheet. Not measurable precisely at that size: overshoot % (~10–13 %, ±5 %), rotation angles (±2°), start scale of the entrance (±0.1). Catalogue hints `tilt-plane` and `glow` were checked and not seen. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
id line-tilt-snap-headline · family kinetic-type · 2.40 s, 1 row (0 cuts, shot < 4 s so not split)
techniques 2 (statement-sequence, hard-cut) · cut_on_beat n/a (silent, 0 cuts) · loopable
measured from a 30 fps strip: entrance f4–20, stagger 1 fr, hold 24 fr, swing peak f53–56, collapse f63–66
not measurable: overshoot % (±5 %), angles (±2°), start scale (±0.1)
proposed terms: line-tilt-snap, block-swing · missing components: TiltSnapLines
phase B: not run (study batch)
