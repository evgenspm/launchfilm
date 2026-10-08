# Illustrated card assembles in layers, holds, fades

A single portrait card scales in on a blush background, its title rises out of a mask and the illustrated scene builds layer by layer from the bottom; copy fades in, the scene settles, holds 2 s and fades out to loop.

Source: https://jitter.video/template/yosemite-animated-widget/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- One app card, desktop panel or onboarding screen shown as a calm hero moment
- A square loop for a feed post or a landing page tile
- A product screen whose illustration can be split into 3-6 depth layers
- Silent autoplay where one name and one short line are enough
Not for: multi-feature tours, anything needing a cut or a CTA, products without illustrated or layered artwork.

## Format
1:1 · 5.00 s · 30 fps · light · music none (no audio track), cut_on_beat n/a · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.00 | 0–30 | hook | empty blush frame, then a portrait card with a purple-to-pink sky gradient; title and back-to-front scenery layers build inside it | locked off; card scales 0.89 → 1.00 about centre (f8 → f23) | card springs.ui 0.89 → 1.00 by f23 (overshoot not measurable, ±0.25 s); title mask-rise f15–f23 (±0.25 s); far treeline by f15, cliffs/near trees/river by f23, bushes by f30, each easings.outExpo ~8 fr, stagger ~7 fr (±0.25 s) | hard-cut | swoosh-short |
| 2 | 1.00–2.00 | 30–60 | feature | eyebrow, two-line description and a small play button appear; flowers and a pale sun complete the scene | locked off; inner artwork pull-out ~1.7 %/s while settling | copy fades in together f26–f38, easings.outQuint (±0.25 s); flowers by f45; sun rises f45–f60, easings.outExpo (±0.25 s); settled by f60 | hard-cut | shimmer |
| 3 | 2.00–4.00 | 60–120 | feature | finished card holds: name, line, button over the full scene, soft pink drop shadow | static | full hold 60 fr, nothing moves | hard-cut | none |
| 4 | 4.00–5.00 | 120–150 | feature | whole card and shadow fade out to the empty blush background, matching frame 0 | static | opacity 1 → ~0.7 (f128) → ~0.45 (f135) → ~0.08 (f143) → 0 (f150), no scale change; ~easings.linear (±0.25 s) | hard-cut | none |

Evidence per row:
- Row 1: sheet-01 cells 0–3 (0.00 empty; 0.27 card smaller, gradient only; 0.50 title clipped mid-rise, treeline at bottom edge; 0.77 cliffs, trees, river in), keyframe kf-000.50.
- Row 2: sheet-01 cells 4–7 (1.00 copy faint; 1.27 copy full; 1.50 flowers; 1.77 sun partly up), motion.json second 1 (zoom −1.67 %/s).
- Row 3: sheet-01 cells 8–15 identical; keyframe kf-002.50; motion.json seconds 2–3 diff 0.00.
- Row 4: sheet-02 cells 0–3 (4.00 full, 4.27 lighter, 4.50 lighter, 4.77 nearly gone), keyframe kf-004.50.
No cuts in cuts.json (0 hard, 0 soft, 0 flashes); cuts/ is empty.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| ui-rebuild | 1–4 | craft/vocabulary.md#ui (the card is rebuilt in React, illustration as layers) |
| mask-rise | 1 | craft/vocabulary.md#type, craft/04#springs (maskRise) |

## Look
Palette: #FDEAE6 background blush, #F8DFDD card type and shadow tint, #CE8AAB sky pink (accent), #432859 deep plum (card top, darkest trees), #774A79 mid purple (cliffs), #946187 mauve (sky middle). Type: medium grotesk, sentence case, tight tracking; title ~5.5 % H pale pink, tracked uppercase eyebrow ~1.3 % H, two-line centred description ~1.4 % H, outline play icon with a one-word label. Treatment: none. Background: flat blush, card with a large soft pink drop shadow; card 42 % W x 62 % H, corner radius ~3 % W.

## What to adapt
- Copy: eyebrow (1 word, uppercase), name (1-2 words), description (2 lines, ~12 words), button label (1 word).
- Brand: card gradient from two brand colours (dark top, light bottom); type in a pale tint of the background; scenery layers in the same hue family.
- Timing: row 3 hold stretches freely; rows 1–2 keep their frame counts (build ends at f60); fade-out stays 30 fr so the loop seam is clean.

## Pitfalls
- Card scale-in starts at ~0.89, not 0: a full scale-from-zero reads as a pop, not a calm arrival.
- Layers must build back to front, about one per 0.25 s; all at once looks like a slide change.
- The sun is the last element (f45–f60); it is what makes the end of the build legible.
- Last frame must equal frame 0 (empty background) or the loop jumps.

## Missing components
- LayeredCard: rounded portrait card (42 % W x 62 % H, radius 3 % W, soft shadow) holding N image layers that rise from the bottom edge back to front, stagger ~7 fr, easings.outExpo 8 fr, plus a header slot (eyebrow, title, line, button) (techniques: ui-rebuild, mask-rise)
- Scenery layers: the illustration itself, split into 3-6 transparent layers plus a sun/orb disc; must be supplied by the user or drawn

## Proposed terms
- layer-rise: illustration layers rise from a card's bottom edge in depth order, ~7 fr apart (row 1, 2) (not in craft/vocabulary.md; not used in recipe.json)
- card-scale-in: whole card scales from ~0.9 to 1 with no visible fade (row 1) (not in craft/vocabulary.md; not used in recipe.json)
- fade-loop: the whole composition fades back to the empty first frame so the clip loops (row 4) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (burned-in cell times 0.00, 0.27, 0.50, 0.77 per second); no 30 fps strips made. Not measurable: spring overshoot on the card and title, exact layer stagger, entrance durations under 8 fr. Card scale from card width in sheet-01 cells 1–4 (0.27 ≈ 0.89, 0.50 ≈ 0.97, 0.77 ≈ 1.00). Palette from palettegen on kf-000.50, kf-002.50 (no cut frames exist). SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts (no audio, no beats).

## Study log
id scenic-card-layer-rise · family product-ui · 5.00 s, 4 rows, 0 cuts, loopable
techniques 2 (ui-rebuild, mask-rise) · cut_on_beat n/a (silent, 0 cuts)
not measurable: overshoot, layer stagger and entrances under 8 fr (±0.25 s)
proposed terms: layer-rise, card-scale-in, fade-loop
missing components: LayeredCard, scenery layers
phase B: not run (study only)
