# Dots gather, unroll and morph into a wordmark

Yellow dots pop in one by one on charcoal, huddle into a spinning cluster, unroll into a row of one dot per letter, then morph into a bold wordmark. A push-in flips it to an outline construction view and pans along the glyphs.

Source: https://jitter.video/template/morph-dots-to-text/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Opening a reel or intro with a short product name (3 to 6 letters)
- A brand-name reveal that avoids a standard text entrance
- Silent social loops where one accent colour on a dark ground carries the brand
- Type-led brands that want to show their letterforms as craft
Not for: long names (the dot row gets too long to read as a cluster), films that need a tagline or claims.

## Format
4:5 · 8.77 s · 30 fps · dark · no music, bpm none, cut_on_beat 0/0 · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.50 | 0–45 | hook | empty frame, accent dots appear one at a time and drift into a 2x2 cluster | static | 15 empty fr; dots scale 0→1, springs.pop (overshoot not measurable), ~1 dot per 7 fr (±0.25 s); cluster slides to centre, springs.ui 30 fr (±0.25 s) | hard-cut | pop |
| 2 | 1.50–3.00 | 45–90 | hook | cluster swells ~1.4x and turns ~90 deg, then loosens | static | easings.inOutSine 30 fr (±0.25 s) | hard-cut | none |
| 3 | 3.00–4.00 | 90–120 | hook | dots unroll from a diagonal into a row, one per letter, and shrink | static | easings.outExpo 15 fr (±0.25 s); row holds 8 fr | morph | swoosh-short |
| 4 | 4.00–4.77 | 120–143 | logo | dots morph left to right into a heavy lowercase wordmark | push-in 1.00→1.04 | per-letter dot→glyph, stagger ~4 fr (±0.25 s), springs.snappy 12 fr (overshoot not measurable) | hard-cut | tick |
| 5 | 4.77–5.77 | 143–173 | logo | filled wordmark holds centred | push-in 1.00→1.10 over 30 fr (~18 %/s) | scale creep only, easings.inOutSine | hard-cut | none |
| 6 | 5.77–7.50 | 173–225 | logo | fill drops to thin outlines with anchor dots and grey metric guides; glyphs overflow the frame | push-in ~1.0→1.4 over 52 fr (~23 %/s), easings.inOutSine | fill→outline hard swap inside one cell (±0.25 s) | hard-cut | shimmer |
| 7 | 7.50–8.77 | 225–263 | logo | camera slides to the last two letters in outline and holds | dolly ~430 px/s @1920 for 8 fr (±0.25 s), then hold | easings.outExpo 15 fr (±0.25 s); near static from 8.00 | hard-cut | none |

Evidence per row: 1 `sheet-01 cells 0–6`; 2 `sheet-01 cells 6–11`; 3 `sheet-01 cells 12–15`; 4 `sheet-02 cells 0–2`; 5 `sheet-02 cells 3–6`, motion.json s4–5; 6 `sheet-02 cells 7–13`, motion.json s5–6; 7 `sheet-02 cells 14–15`, `sheet-03 cells 0–2`, motion.json s7–8. No cut frames (cuts.json is empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| logo-from-dot | 1–4 | craft/vocabulary.md#brand |
| morph | 3–4 | craft/vocabulary.md#transitions |
| push-in | 4–6 | craft/vocabulary.md#camera, craft/04-motion.md |
| dolly | 7 | craft/vocabulary.md#camera |

## Look
Palette: #292929 background, #FBFE3F accent dots and type, #565654 guide lines, #8C8E3F antialias mid. Type: heavy geometric grotesk, lowercase, tight tracking, ~60 % of frame width at the hold; later 2 px outlines with anchor dots. Treatment: none. Background: flat.

## What to adapt
- Copy: one name only, 3 to 6 lowercase letters; dot count equals letter count.
- Brand: the accent colour carries every dot, the fill and the outlines; bg stays flat and dark.
- Timing: rows 1–3 (dot play) can stretch; the morph in row 4 keeps its ~4 fr stagger; the hold in row 5 should stay about 1 s before the outline flip.

## Pitfalls
- The fill→outline flip is a hard swap; crossfading it makes the construction view look like a mistake.
- Outline view needs real glyph outlines with anchor points: a font converted to paths, not CSS text-stroke.
- The cluster grows while it turns; without the scale change the gather reads static.

## Missing components
- DotMorphText: N dots (one per letter) that gather, rotate as a cluster, line up and morph each into its glyph path via SVG path interpolation; stagger 4 fr, springs.snappy (techniques: logo-from-dot, morph)
- GlyphConstruction: renders a word as 2 px outline paths with anchor-point dots (r ~4 px) and horizontal metric guides (baseline, x-height, cap, descender) in a muted grey (techniques: push-in, dolly)

## Proposed terms
- dot-gather: dots appear one by one and huddle into a cluster before forming type, rows 1–2 (not in craft/vocabulary.md; not used in recipe.json)
- glyph-construction: filled type flips to outlines with anchor points and metric guides, rows 6–7 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strips extracted). Not measurable: spring overshoot of dot pops and letter morph, exact per-dot stagger, exact flip frame. Zoom and pan rates from motion.json. Palette from keyframes kf-001.50, kf-004.50, kf-006.50 (no cut frames). SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
- id dot-cluster-wordmark-morph, family kinetic-type, 8.77 s, 7 rows in one continuous shot (0 cuts).
- 4 techniques: logo-from-dot, morph, push-in, dolly. cut_on_beat 0/0 (silent reference).
- Not measurable at 0.25 s: dot pop overshoot, morph stagger, outline flip frame.
- Proposed terms: dot-gather, glyph-construction.
- Missing components: DotMorphText, GlyphConstruction.
- Phase B not run (study only).
