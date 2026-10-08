# Recursive type stack zoom loop

A two-word lockup repeated as a shrinking column of copies on black; the front copy zooms up and out of frame while the next one grows into its place, so one second loops without a seam.

Source: https://jitter.video/template/motion-design-looped-text/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A seamless loop for a social post, story sticker or website hero
- An intro or outro sting built from a two-word name or slogan
- A type-only background behind a talk, stream or event screen
- Hypnotic filler between scenes of a longer film
Not for: messages longer than two short words, anything that needs to be read in one pass (the loop is 1 s).

## Format
1:1 · 1.00 s · 30 fps · dark · loopable · music none (silent source), cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.00 | 0–30 | hook | two-word lockup, white on black, repeated ~8 times in a column that shrinks downward; copies overlap; front copy zooms past | static frame; the stack scales: front copy ~0.80 to 6+ frame widths in 30 fr, rising ~83 px/s @1920 | each copy takes the place of the one above in 30 fr; front copy accelerates (easings.inExpo-like: width 0.79 f0, 0.92 f5, off-frame by f8, fragments only f12–f19); next copy settles easings.outQuint into f0 size by f29; f29 = f0 | hard-cut (loop wrap) | whoosh (planned) |
Evidence: sheet-01 cells 0–3 (0.00, 0.27, 0.50, 0.77), keyframes/kf-000.50.jpg, 30 fps strip f0–f29 (read locally, not stored). No cut frames (cuts.json is empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| zoom-through | 1 | craft/vocabulary.md#camera (ZoomThrough), craft/04#easings inExpo |
| kinetic-depth | 1 | craft/vocabulary.md#type (DepthPhrase) |

## Look
Palette: #000000 background, #FFFFFF type, #5A5A5A anti-alias edge only. Type: heavy geometric sans, italic, lowercase, tight leading (lines overlap ~10 %), front lockup ~80 % of frame width at f0, each copy below ~0.4x the one above. Treatment: none. Background: flat black.

## What to adapt
- Copy: 2 lines, one short word each (≤ 8 letters); the same pair is repeated in every copy.
- Brand: fg carries the type; an accent colour can tint every second copy; no logo.
- Timing: the period (30 fr) can stretch to 45–60 fr for a calmer loop; the scale law must stay self-similar so the last frame equals the first.

## Pitfalls
- The loop only hides its seam if copy n at f29 matches copy n−1 at f0 exactly in size and position: derive every copy's scale from one progress value, never animate copies separately.
- The column overlaps on purpose; with a light or thin font the overlaps turn into clutter. Use an 800–900 weight.
- Front copy must be fully off-frame or giant fragments before the next one dominates (f8–f19), or two readable lockups compete.

## Missing components
- RecursiveTypeStack: N copies of a lockup in a column, copy k at scale r^k (r ≈ 0.42) and y-offset following the same geometric series; one loop progress p (0→1 over period) multiplies all scales by (1/r)^p with easings.inExpo-shaped speed so f(period) = f(0); white union fill on bg. (techniques: zoom-through, kinetic-depth)

## Proposed terms
- recursive-zoom: a stack of self-similar copies where each zoom step lands copy n+1 exactly on copy n's place, giving a seamless infinite zoom loop (row 1) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from a 30 fps strip at t = 0.00–1.00 (scale from widths at 320 px, about ±3 %); sheets give 0.25 s. Not measurable: the exact easing curve of the scale (inferred from widths at f0, f5, f8); exact copy count at the bottom of the column (≥ 8, smallest copies under 2 % of frame width). SFX planned by the glue rule, not measured (source is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
- id type-stack-zoom-loop · family kinetic-type · 1.00 s, 1 row (no cuts) · loopable
- techniques 2 (zoom-through, kinetic-depth) · cut_on_beat n/a (0/0) · silent, no VO
- measured from a 30 fps strip; easing curve and copy count at the tail not exactly measurable
- proposed terms: recursive-zoom · missing components: RecursiveTypeStack
- phase B: not run (study job)
