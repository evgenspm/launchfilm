# Slot-word statements with passing UI card stacks

Three short white statements on black with blue corner glows; one slot word swaps while stacks of product cards slide across and up through the frame, then split to reveal a glowing card edge and cut to black.

Source: https://www.raylight.app/templates/4wByBvbq (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A service or agent product with one light landing hero and one dark product panel to show as texture
- Silent social or landing-page loop where the type carries the message
- Positioning line with one swappable role word
Not for: products whose UI must be read (cards pass too fast to read), or films that need a story arc with proof.

## Format
16:9 · 15.40 s · 30 fps · dark · no music (silent), cut_on_beat n/a (0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.50 | 0–45 | hook | black; positioning line, 3 words, then a 4th slot word; blue glows in top-right and bottom-left corners | static (line re-centres) | 3 words blur-in at 0.27, easings.outExpo ~8 fr (±0.25 s); slot word blur-in 0.77, settled 1.00; glows fade in 1.00–1.50 easings.inOutSine | hard-cut | none |
| 2 | 1.50–3.25 | 45–98 | reveal | card cluster (2 light landing cards + dark editor panel) slides along the lower third left to right; slot word swaps to a 2nd role word and back | static (cards travel) | panel enters left 1.50, light cards stagger ~5 fr (±0.25 s), cluster crosses easings.linear, gone by 3.25; swap at 1.77 (new word drops from above, springs.ui ~8 fr ±0.25 s), swap back 3.00 | hard-cut | whoosh |
| 3 | 3.25–4.00 | 98–120 | reveal | line holds alone with the first slot word; glows move to left and right edges | static | hold 15 fr; fades to ~0.5 at 3.77, out by 4.00 easings.inExpo ~7 fr (±0.25 s) | blur-dissolve | none |
| 4 | 4.00–6.00 | 120–180 | feature | 2nd statement, 2 words, built word by word; at 5.00 a vertical card stack rises through and past the line | static (cards rise ~560 px/s @1920) | word 1 at 4.00, word 2 blur-in from above at 4.77 easings.outExpo ~8 fr (±0.25 s); stack rises 5.00–6.00 easings.inOutSine | hard-cut | whoosh |
| 5 | 6.00–7.25 | 180–218 | feature | 3rd statement, 2 words joined by a comma, centred, edge glows | static | word 2 blur-in 6.00–6.27 easings.outExpo ~8 fr (±0.25 s); hold 30 fr; dims at 7.27 | hard-cut | none |
| 6 | 7.25–9.00 | 218–270 | feature | cards rise and settle into a centred column: light card, dark panel, light card | static (column drifts up ~300 px/s @1920 at 7–8 s) | light card at 7.27, panel at 7.50 (stagger ~7 fr ±0.25 s), springs.heavy (overshoot not measurable); hold 8.00–8.77 | hard-cut | whoosh |
| 7 | 9.00–9.50 | 270–285 | feature | column splits: light cards exit left, dark panel exits right | static | lateral exit ~520 px/s @1920, easings.inExpo ~12 fr (±0.25 s) | hard-cut | swoosh-short |
| 8 | 9.50–11.30 | 285–339 | feature | huge black rounded card fills lower left, bright blue rim glow on its top and right edges | push-in 1.00 to ~1.15 over 9.50–10.00, then ~0.5 %/s creep | card settles at 10.00 on springs.cameraIn (overshoot not measurable); hold 39 fr | smash-cut-black | silence-beat |
| 9 | 11.30–15.40 | 339–462 | tension | pure black tail (slot for an end card) | static | none; 123 fr of black | hard-cut | none |

Evidence: row 1 sheet-01 cells 0–6; row 2 sheet-01 cells 6–13, kf-002.50; row 3 sheet-01 cells 13–15; row 4 sheet-02 cells 0–7; row 5 sheet-02 cells 8–12; row 6 sheet-02 cells 13–15, sheet-03 cells 0–3, kf-008.50; row 7 sheet-03 cells 4–5; row 8 sheet-03 cells 6–13, cuts/cut-011.30.jpg (before); row 9 sheet-03 cells 14–15, sheet-04 all cells, cuts/cut-011.30.jpg (after).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| statement-sequence | 1, 4, 5 | craft/05#recipes, craft/families/statement.md |
| blur-in | 1, 4, 5 | craft/04#easings |
| word-swap | 2, 3 | craft/vocabulary.md#type (WordSwap) |
| card-grid | 2, 4, 6, 7 | craft/vocabulary.md#ui |
| frame-in-frame | 8 | craft/vocabulary.md#camera (FrameInFrame) |
| smash-cut-black | 8→9 | craft/vocabulary.md#transitions |
| glow | 1–8 | craft/vocabulary.md#look |

## Look
Palette: #000000 background, #FAFBFB text and light cards, #1C39AE glow accent, #052591 glow mid, #57698C muted UI grey, #031240 glow falloff. Type: medium-weight grotesk, sentence case, normal tracking, cap height ~5 % H, one centred line. Treatment: glow. Background: flat black with two soft blue radial glows in opposite corners.

## What to adapt
- Copy: line 1 = 3-word positioning + slot word (2 role words); lines 2 and 3 = 2 words each (the scope, then the result).
- Brand: accent drives the corner glows, the rim light of row 8 and the highlighted word in the landing card; no logo in the reference.
- Timing: rows 2, 4 and 6 can stretch with the card count; row 7 (15 fr) and the row 8 push (15 fr) keep their frame counts. Replace the black tail (row 9) with an end card or trim it.

## Pitfalls
- Cards only pass behind or below the type, except row 4 where the stack crosses the line; keep that pass under 1 s so the line stays legible.
- Glows sit in two opposite corners and swap sides between rows; one centred glow loses the depth.
- The 4.1 s empty black tail reads as a dead end in a feed; fill it in a rebuild.

## Missing components
- CardStackPass: 2–4 Surface cards in a row or column travelling across the frame at constant speed (~500 px/s @1920), stagger 5 fr, optional settle into a column on springs.heavy (techniques: card-grid)
- CornerGlows: two radial accent glows anchored to opposite corners, radius ~35 % W, cross-fading between corner pairs over 15 fr (techniques: glow)

## Proposed terms
- card-stack-pass: a stack of UI cards travels through the frame as texture behind or across a statement (rows 2, 4, 6, 7) (not in craft/vocabulary.md; not used in recipe.json)
- corner-glow: paired accent light blooms in opposite frame corners that shift between beats (rows 1–8) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips. Not measurable: entrance durations under 8 fr, word stagger, overshoot of card settles and the row 8 push, exact card speeds (motion.json per-second pan used). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/1 cuts within ±2 fr (no beats).

## Study log
id slot-word-card-column-pass · family product-ui · 15.40 s, 9 rows (1 hard cut at 11.30, rest split at state changes)
techniques 7 (incl. look glow) · cut_on_beat false (silent, 0 beats)
not measurable: sub-0.25 s entrances, staggers, overshoot (0.25 s sheets, no strips)
proposed terms: card-stack-pass, corner-glow
missing components: CardStackPass, CornerGlows
phase B: not run
