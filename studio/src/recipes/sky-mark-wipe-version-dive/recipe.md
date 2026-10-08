# Sky mark wipe into version dive

A frosted mark settles over drifting sky footage, slides aside to wipe on the product name with its version, the sky washes to white and a huge thin version number holds, then the camera dives into it.

Source: https://www.raylight.app/templates/hjnvRipe (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- Announcing a major version of an existing product in a vertical feed
- A short silent brand sting before a longer release film
- Brands with a compact mark and an airy, light identity
- One calm background clip (sky, water, texture) and no UI to show
Not for: products with no mark, dark brands, or launches that need a claim or a CTA.

## Format
9:16 · 5.83 s · 30 fps · light · music none, cut_on_beat n/a (0 cuts, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.00 | 0–30 | hook | sky footage; mark appears large and frosted, settles to solid white | footage drift 1.00→~1.02 | mark scale ~1.5→1.0, opacity 0.35→1, easings.outExpo 17 fr (f1–f18), no overshoot | hard-cut | swell |
| 2 | 1.00–2.80 | 30–84 | logo | solid white mark, ~18 % W, centred at 40 % H, alone over the sky | footage drift | hold 54 fr | hard-cut | none |
| 3 | 2.80–3.50 | 84–105 | logo | mark slides right and folds away, uncovering the label (product name + version, 3 words) | footage drift | mask-wipe by the mark's trailing edge, easings.inOutCubic 10 fr (f86–f96); mark sliver gone by f104 | hard-cut | swoosh-short |
| 4 | 3.50–4.17 | 105–125 | logo | label alone; tone drops out and returns dark grey while the sky washes to white | footage drift | label fades out f108–f113, back as #555555 f114–f119; footage lifts to white f120–f126 | blur-dissolve | none |
| 5 | 4.17–5.40 | 125–162 | outro | white canvas, version numeral alone, huge and thin, centred | static to f150, creep 1.00→1.03 | numeral light grey→near-black 13 fr (f127–f140), easings.outCubic; hold 22 fr | zoom-through | none |
| 6 | 5.40–5.83 | 162–175 | outro | dive into the numeral, the last digit swells past the frame; ends mid-move | zoom-through 1.03→~2.6, 13 fr, easings.inExpo | accelerating zoom only, no settle | hard-cut | whoosh |

Evidence per row: 1 `sheet-01 cells 0–3` + 30 fps strip t=0; 2 `sheet-01 cells 4–11`; 3 `sheet-01 cells 11–13` + strips t=2.5, t=3; 4 `sheet-01 cells 14–15`, `sheet-02 cell 0`, `cuts/cut-004.07.jpg`; 5 `sheet-02 cells 1–6` + strip t=4; 6 `sheet-02 cell 7` + strip t=5.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| mask-wipe | 3 | craft/vocabulary.md#transitions (mark edge as the wipe mask) |
| blur-dissolve | 4 | craft/vocabulary.md#transitions, TRANSITIONS in presets/transitions.tsx |
| zoom-through | 5–6 | craft/vocabulary.md#camera, ZoomThrough |

## Look
Palette: #1FA5D6 sky blue (background footage), #FFFFFF mark / end canvas, #141414 numeral, #555555 label after the wash, #C6D2DD cloud shadow, #B7B7B7 numeral start tone. Type: medium rounded grotesk label ~2.6 % H, sentence case; thin (~200) rounded grotesk numeral ~10 % H. Treatment: none. Background: footage (sky), then flat white.

## What to adapt
- Copy: one label line (product name + version, 2–3 words) and one version numeral (≤ 4 characters).
- Brand: mark in white over the clip; label and numeral in the display font at a thin weight; accent colour is not used.
- Timing: row 2 hold (54 fr) and row 5 hold (22 fr) stretch; the wipe (10 fr), wash (7 fr) and dive (13 fr) keep their counts.

## Pitfalls
- The label must be revealed by the moving mark itself, not faded in: the mark's trailing edge is the mask.
- The label drops out completely before turning dark; a straight white→grey tween loses the wash effect.
- The film ends mid-dive (f174 still moving); if it is not the last shot, place the next scene behind the ZoomThrough.
- Keep the background clip bright and calm: a white mark on busy footage loses contrast.

## Missing components
- MarkFoldWipe: mark slides ~0.5 W to the right over 18 fr (f86-f104, inOutCubic), its left edge masking a text line that is uncovered behind it; mark collapses to a sliver at the end (techniques: mask-wipe)

## Proposed terms
- mark-fold-wipe: the logo slides aside and its edge reveals the wordmark or label behind it (row 3) (not in craft/vocabulary.md; not used in recipe.json)
- frost-settle: a mark arrives oversized and translucent and settles to solid at rest size (row 1)
- light-wash: footage and text lift to white to hand over to a flat white canvas (row 4)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0, 2.5, 3, 4, 5 (local source, not copied); other values 0.25 s from sheets. Not measurable: exact mark scale curve in row 1 (±2 fr), footage push percentage (motion.json reports 12 %/s in second 0, likely the mark scale, ~1 %/s after). SFX planned by the glue rule, not measured (silent reference). cut_on_beat = 0/0 cuts within ±2 fr.

## Study log
id sky-mark-wipe-version-dive · family logo-brand · 5.83 s, 6 rows · 3 techniques · cut_on_beat n/a (silent, 0 hard cuts, 1 soft at 4.07–4.27 s).
Measured at 1 fr from 30 fps strips; mark scale curve ±2 fr, footage push not exactly measurable.
Proposed terms: mark-fold-wipe, frost-settle, light-wash. Missing components: MarkFoldWipe.
Phase B: not run.
