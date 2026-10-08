# Colour block grid clears to footage headline

A flat brand-colour field breaks into large square blocks that vanish in steps, uncovering street footage; a three-line caps headline stacks in bottom-left in the accent colour, settles to white and rides over a hard cut to a second clip.

Source: https://jitter.video/template/pixel-dissolve-transition/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Opening a news, editorial or social clip with a branded wipe into footage
- Revealing a product shot or hero image from a solid brand colour
- Short 4:5 or vertical feed posts that need a recognisable branded transition
- A two-clip sequence where one headline stays on top across the cut
Not for: films that need a story arc or a CTA; dark, low-contrast footage (white type needs a scrim there).

## Format
4:5 · 4.00 s · 30 fps · mixed (flat cyan field, then mid-tone footage) · music none (silent reference), cut_on_beat n/a (0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.52 | 0–16 | hook | full-frame flat cyan field, square white logo tile top-right; from ~0.25 s blocks vanish to show footage | static field; footage behind drifts ~1 px/s @1920 | square blocks ~22 % W on a fixed grid, cleared in random order with easings.stepped, whole blocks, no fade, first step f6–f8 (±0.25 s) | mask-wipe | tick |
| 2 | 0.52–3.07 | 16–92 | hook | street footage, last edge blocks gone by 1.00 s; headline, 3 lines, 4 words, names the segment, stacks bottom-left | drift 1.000→1.003 (0.1 %/s), pan ~1 px/s @1920 | blocks clear stepped until f30 (±0.25 s); lines appear whole ~6 fr apart (±0.25 s), line 1 f18, line 2 by f23, line 3 by f30; each enters accent yellow, fades to white over 8–15 fr easings.outQuint (±0.25 s); all white by f38; hold | hard-cut | tick |
| 3 | 3.07–4.00 | 92–120 | hook | second street clip, same headline and logo tile unchanged on top | drift 1.000→1.002 (0.2 %/s), pan ~2 px/s @1920 | nothing new; headline and tile hold across the cut | hard-cut | hit |

Evidence per row:
1. sheet-01 cells 0–1 (0.00 full field, 0.27 first blocks gone), cuts/cut-000.43.jpg (before 0.40), keyframes/kf-000.50.jpg (blocks on a ~249 px grid).
2. sheet-01 cells 2–12 (0.50 soft: about half the blocks remain; 0.77: line 1–2 in yellow, edge blocks remain; 1.00: all blocks gone, line 3 yellow, line 2 pale; 1.27 onward all white), cuts/cut-000.43.jpg (after 0.60: line 1 yellow).
3. sheet-01 cells 13–15 (3.27 red CUT 3.07, new clip, same headline), cuts/cut-003.07.jpg.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| mask-wipe | 1–2 (block grid as the mask) | craft/vocabulary.md#transitions, studio transitions.tsx |
| hard-cut | 2→3 | craft/vocabulary.md#transitions |

## Look
Palette: #53C7FB block field (bg of row 1), #FFFFFE headline and logo tile, #2E2028 footage shadows, #7A5F6E / #AC8690 footage mid-tones, #D1E2EC sky; accent for entering lines a pale yellow (~#F2F06A, by eye, not in palettegen). Type: heavy grotesk, all caps, tight leading ~0.9, left-aligned bottom-left, cap height ~5 % H, 3 lines. Treatment: none. Background: flat colour, then footage.

## What to adapt
- Copy: 3 lines, 1–2 words each, a segment or show name; one idea.
- Brand: the block field takes the brand accent; the entering-line colour is a second, light accent; the logo sits in a square white tile top-right, ~25 % W.
- Timing: rows 2–3 stretch with clip length; keep the block clear inside f6–f30 and the line gap ~6 fr.

## Pitfalls
- Blocks vanish whole, in steps; a fade or soft edge turns it into a generic dissolve.
- Cells must stay square at every aspect: compute the grid from width and let the last row overflow.
- BlockResolve (existing) uses small cells and noise tones; this needs ~22 % W cells and one flat colour, no flicker.
- The headline must not re-animate at the hard cut; it is the continuity across clips.

## Missing components
- BlockGridReveal: flat colour field split into square cells (cell = 0.22 W), each cell removed on a seeded frame between clearStart (f6) and clearEnd (f30), stepped (no fade), children shown underneath (techniques: mask-wipe). BlockResolve is close but needs `color` (single flat tone), no per-frame static and a start offset.
- AccentSettleLines: stack of caps lines, each appears whole at its frame and eases accent→fg over 8–15 fr on easings.outQuint (techniques: none in vocabulary; see Proposed terms).

## Proposed terms
- block-dissolve: a flat colour field is cleared block by block on a coarse square grid to reveal the next shot (rows 1–2). Not in craft/vocabulary.md; not used in recipe.json (mapped to mask-wipe).
- accent-settle: text enters in an accent colour and settles to the fg colour (row 2). Not in craft/vocabulary.md; not used in recipe.json.

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strip made). Not measurable: exact order and frame of each block step, line entrance frames (±0.25 s), the yellow→white fade length (±0.25 s). Block size measured on keyframes/kf-000.50.jpg (~249 px of 1120). SFX planned by the glue rule, not measured (reference silent). cut_on_beat = 0/1 cuts within ±2 fr (no beats).

## Study log
id block-grid-footage-reveal · family transitions · 4.00 s, 3 rows (hook ×3) · 2 techniques (mask-wipe, hard-cut).
cut_on_beat false (0/1, silent reference, no beats).
Not measurable at 0.25 s: block step order and frames, line entrance frames, colour settle length.
Proposed terms: block-dissolve, accent-settle.
Missing components: BlockGridReveal (or BlockResolve with flat colour and large cells), AccentSettleLines.
Phase B: not run (study phase only).
