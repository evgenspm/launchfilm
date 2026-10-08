# Gradient spec line word drop

One short spec line on white, each word dropping from slightly above while fading in, staggered about a quarter second apart, the whole line painted in a cool-to-lime gradient, then a long calm hold.

Source: https://jitter.video/template/sliding-title-reveal-apple-event/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A chapter title or single feature claim inside a premium announcement
- Naming one hero spec (resolution, battery, speed) in three words or fewer
- Opening a silent product reel on a light, restrained brand
- A calm text beat between UI or device shots
Not for: multi-claim sequences (use statement-sequence-launch) or lines longer than about 4 words, which break the one-line gradient.

## Format
16:9 · 4.00 s · 30 fps · light · music none, cut_on_beat n/a (0 cuts, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–4.00 | 0–120 | hook | white frame, then one centred spec line of 3 words (number, then two words) in a cool-to-lime gradient | static (line position and width identical in cells 7–15) | empty f0–f12 (±0.25 s); per word fade-in + drop ~0.5 em from above, easings.outQuint ~15 fr (±0.25 s), stagger ~8 fr (±0.25 s); settled by f53 (±0.25 s); hold 67 fr | hard-cut | tick per word (planned) |

Evidence: sheet-01 cells 0–1 (empty white), cell 2 at 0.50 (first word faint, second barely visible, both above final baseline), cell 3 at 0.77 (three words, each later word higher and fainter), cells 4–6 at 1.00–1.50 (last word still lighter), cells 7–15 at 1.77–3.77 (identical settled line). Full-res kf-000.50.jpg and kf-002.50.jpg. No cut frames (cuts.json: 0 hard, 0 soft).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| blur-in | 1 | craft/05-typography.md (BlurIn, enter blurDrop: per word, drop from above) |

## Look
Palette: #FFFFFF background; gradient stops #638782 (slate teal, left), #8FAB78 (sage), #BACB7C (pale olive), #DAE38F (lime, right). Type: medium-bold grotesk, sentence case, normal tracking, cap height about 9 % of H, one centred line. Treatment: none. Background: flat white.

## What to adapt
- Copy: one line, 2–4 words; strongest as a number plus a two-word noun phrase naming the spec.
- Brand: the gradient carries the brand; run from a muted brand colour on the left to the accent on the right. Background stays the brand bg (light works best; on dark raise the gradient lightness).
- Timing: the lead (12 fr) and the hold stretch freely; keep the per-word stagger near 8 fr and the entrance near 15 fr or the cascade reads as a single fade.

## Pitfalls
- The words drop down into place; rising from below reads as a different, bouncier style.
- The gradient spans the whole line, not each word; per-word gradients reset the colour at every word.
- No horizontal slide and no clip mask are visible despite the template naming; adding them changes the look.
- Pale lime on white is low contrast at the right end; keep the last stop dark enough to read on small screens.

## Missing components
none (BlurIn with `fill` for the gradient and a custom `enter` stagger covers it)

## Proposed terms
- gradient-fill: one linear colour gradient clipped to a whole text line, left to right (row 1). Not in craft/vocabulary.md; not used in recipe.json.

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strip extracted). Not measurable: per-word entrance length, exact stagger, blur amount, easing shape, exact drop distance (~0.5 em from kf-000.50.jpg). SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
- id gradient-line-word-drop · family kinetic-type (catalogue hint launch-film overruled: text is the whole picture)
- 4.00 s, 16:9, 30 fps, 1 row (single 4.00 s shot, no split rule applies), 0 cuts
- techniques: 1 (blur-in); hints mask-wipe and slide-push not seen in sheets
- audio: silent reference, cut_on_beat n/a (0/0), sfx tick per word planned
- not measurable at 0.25 s: entrance frames, stagger, blur, easing
- proposed terms: gradient-fill
- missing components: none
- phase B: not run (study only)
