# Diagonal card staircase loop

One hero image card shrinks into a pile of five, the pile fans out into a corner-to-corner diagonal and the view steps one card per second, then the cards slide back into one pile and the hero grows to fill the frame again: a seamless loop.

Source: https://jitter.video/template/linear-cards/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Four or five product shots, icons or renders shown as one calm sequence, about one second each
- A square feed loop for a minimal dev tool or SaaS brand (monochrome works best)
- A feature-visual gallery inside a longer film, as a 6-8 s interlude
Not for: products that need copy or claims on screen; UI that must be read (cards are 0.42 W at focus)

## Format
1:1 · 8 s · 30 fps · dark · music none (no audio track), cut_on_beat n/a (0/1 cuts, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.53 | 0–16 | hook | one light grey square image card 0.77 W centred on black; 5-line label block at left edge | static | hold | match-cut | none |
| 2 | 0.53–1.77 | 16–53 | reveal | same card shrunk on top of a pile of five cards fanned down-right | drift up-left ~0.05 W over 1.0 s | hero 0.65 W -> 0.42 W by 0.77, easings.outExpo 8 fr (±0.25 s); pile offset 0.07 -> 0.09 W, easings.linear | hard-cut | swoosh-short |
| 3 | 1.77–2.77 | 53–83 | feature | staircase corner to corner, card 2 (dark UI panel) in focus | dolly one card down-right, push 1.00 -> 1.05 | spread <= 8 fr (±0.25 s), easings.inOutCubic; hold ~22 fr | hard-cut | tick |
| 4 | 2.77–3.77 | 83–113 | feature | card 3 (phone-like UI) in focus | dolly one card step, hold | step <= 8 fr (±0.25 s), easings.inOutCubic | hard-cut | tick |
| 5 | 3.77–4.77 | 113–143 | feature | card 4 (dark capsule on plinth) in focus; passed cards overlap top-left | dolly one card step, hold | step <= 8 fr (±0.25 s), easings.inOutCubic | hard-cut | tick |
| 6 | 4.77–5.77 | 143–173 | feature | card 5 (dark ring object) in focus, last card | dolly one card step, hold | step <= 8 fr (±0.25 s), easings.inOutCubic | hard-cut | tick |
| 7 | 5.77–6.47 | 173–194 | feature | cards slide back up-left into one compact pile 0.34 W, centred, card 1 on top | pull back, -3 %/s, recentre | collapse in reverse order ~1 s, easings.inOutCubic (±0.25 s) | hard-cut | none |
| 8 | 6.47–8.00 | 194–240 | feature | top card grows back to the 0.77 W hero, identical to frame 0, holds | static after the grow | 0.35 W -> 0.71 W in 7 fr, settled 0.77 W by 7.00, springs.cameraIn (overshoot not measurable); hold 30 fr | hard-cut | tick |

Evidence per row:
1. sheet-01 cells 0–2 (0.00–0.50), cuts/cut-000.53.jpg (before side)
2. sheet-01 cells 3–6 (0.77–1.50), cuts/cut-000.53.jpg (after side: hero on a pile of 4 more)
3. sheet-01 cells 7–10 (1.77–2.50)
4. sheet-01 cells 11–14 (2.77–3.50)
5. sheet-01 cell 15 (3.77), sheet-02 cells 0–2 (4.00–4.50)
6. sheet-02 cells 3–6 (4.77–5.50)
7. sheet-02 cells 7–9 (5.77–6.27), cuts/cut-006.47.jpg (before side)
8. sheet-02 cells 10–15 (6.50–7.77), cuts/cut-006.47.jpg (after side), motion.json s6 zoom +57.9 %/s, s7 hold

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| card-grid | 2–7 | craft/vocabulary.md#ui (cards cascade with stagger), craft/04#springs |
| pull-out | 2, 7 | craft/03-camera-and-staging.md |
| dolly | 3–6 | craft/03-camera-and-staging.md (Dolly) |
| match-cut | 1 | craft/09-transitions.md (same card carried across the 0.53 cut) |

## Look
Palette: #000000 background, #C4C4C4 hero card surface, #222222 dark card UI, #949594 / #7E7E7E / #ABABAB mid-grey card fills. Type: small uppercase grotesk label block, regular, normal tracking, ~1.2 % H per line, white, fixed at the left edge. Treatment: none. Background: flat black.

## What to adapt
- Copy: a label block of up to 4 short lines (collection name, count, size, credit) plus a small mark; no headline
- Brand: the mark sits on top of the label block; card fills take brand surface tones; keep the frame bg near black
- Cards: 5 square images, the first is the hero and the loop seam, so it must work full size
- Timing: steps keep 30 fr each; the collapse and the hero grow keep their frame counts so the seam stays invisible

## Pitfalls
- The last frame must match frame 0 exactly (same size, same position) or the loop pops
- Staircase offset equals one card width (corners touch); a smaller offset turns it into a messy stack
- The label block never moves; cards pass behind it, so keep card content clear of the left 0.2 W in the hero shot
- Monochrome images carry the look; one colourful card breaks the calm

## Missing components
- CardStaircase: N square cards on a 45 degree diagonal, offset k x size (k 0.07 pile -> 1.0 spread), camera steps one card per 30 fr with an 8 fr inOutCubic move, reverse collapse into a pile (techniques: card-grid, dolly, pull-out)

## Proposed terms
- staircase-dolly: camera steps card by card along a diagonal row of touching cards, one hold per card (rows 3–6) (not in craft/vocabulary.md; not used in recipe.json)
- stack-collapse: spread cards slide back into one pile before the hero returns (row 7) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strips made). Not measurable: easing curves and overshoot of the step moves and the hero grow, the exact frame the staircase spreads (between 1.50 and 1.77). Card sizes measured as fraction of frame width from sheet cells and cut frames (±0.02 W). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/1 cuts within ±2 fr (no beats).

## Study log
id diagonal-card-staircase-loop · family product-ui · 8.00 s, 8 rows (1 hard cut at 0.53, 1 soft zoom 6.47–6.70, long shot split at each card step)
techniques 4 (card-grid, pull-out, dolly, match-cut) · cut_on_beat false (silent, no beats) · loopable true
not measurable: step easing and overshoot at 0.25 s resolution; spread start between 1.50 and 1.77
proposed terms: staircase-dolly, stack-collapse
missing components: CardStaircase
phase B: not run (study only)
