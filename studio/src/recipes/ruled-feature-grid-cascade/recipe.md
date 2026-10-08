# Ruled feature grid cascade

Four short feature points in a 2x2 grid on black. Each item's blue hairline draws from the left, then its three lines rise out of a clip mask in reading order; the grid holds, then rules retract and text fades.

Source: https://jitter.video/template/animated-feature-list/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A product page or pitch slide needs four short benefits shown at once
- A text-only section between product shots in a longer film
- A silent loop for a website hero or social feed
- Points of equal weight that should read in a fixed order
Not for: one hero claim (use a statement sequence), more than 6 points, or long sentences that wrap past 3 lines.

## Format
other (1322x992, about 4:3) · 5 s · 30 fps · dark · no music, cut_on_beat n/a (0 cuts, 0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.27 | 0–38 | hook | empty black, then a 2x2 grid of four feature items builds: blue hairline on top, 3-line statement under it | static | order TL, TR, BL, BR, item stagger ~4 fr (±0.25 s); hairline draws from left, easings.outExpo ~12 fr (±0.25 s); lines rise out of a clip mask, line stagger ~4 fr (±0.25 s), springs.ui (overshoot not measurable); first rule f8, last line settles ~f45 | hard-cut | tick per item |
| 2 | 1.27–4.00 | 38–120 | hook | full grid holds: four items, two columns, two rows, white text, blue rules | static | hold 82 fr; nothing moves after the last line settles | hard-cut | none |
| 3 | 4.00–4.50 | 120–135 | hook | grid clears: hairlines shrink toward their right ends, text fades, top row first | static | rules retract right, easings.inExpo ~10 fr (±0.25 s); text fade ~6 fr (±0.25 s), top row leads by ~4 fr (±0.25 s) | hard-cut | none |
| 4 | 4.50–5.00 | 135–150 | hook | empty black, matches frame 0 for the loop | static | none; 15 fr of black | hard-cut | none |

Evidence per row:
- Row 1: sheet-01 cells 0–5 (0.00 black; 0.27 two top rules partly drawn, TL longer than TR, a dot of the BL rule; 0.50 four rules, top items show 2 lines cut by a mask, bottom items first line only; 0.77 top items 3 lines with the third clipped, bottom items 2 lines; 1.00 all items, last lines of the bottom row still clipped; 1.27 complete, last line 2 to 3 px low); keyframes kf-000.50 (lines cut along a horizontal mask edge), kf-001.50.
- Row 2: sheet-01 cells 6–15 and sheet-02 cell 0 (1.50–4.00 identical); keyframes kf-002.50, kf-003.50; motion.json seconds 2–3 diff 0.0.
- Row 3: sheet-02 cell 1 (4.27: top text gone, top rules reduced to short stubs at their right ends, bottom rules half length at right, bottom text at about 40 % opacity), cell 2 (4.50: one pixel stub of the BR rule); keyframe kf-004.50.
- Row 4: sheet-02 cells 2–3 (4.50, 4.77 black); cuts/ is empty (0 cuts in cuts.json).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| card-grid | 1 | craft/vocabulary.md#ui (items cascade into a grid with stagger) |
| list-assemble | 1, 3 | craft/vocabulary.md#ui (the list builds itself one item at a time, then clears) |
| mask-rise | 1 | craft/vocabulary.md#type, craft/04#springs (per line, not per letter, see Pitfalls) |

## Look
Palette: #000000 background, #FCFCFC text, #819CD2 / #2D406A accent hairline (antialiased palettegen values; solid rule pixels sample #3D6AD6). Type: bold grotesk, sentence case, normal tracking, about 3.6 % H, 3 lines per item, ragged left. Treatment: none. Background: flat black.

## What to adapt
- Copy: 4 items, 6 to 8 words each, wrapping to 3 short lines of 2 to 3 words; each item is one benefit (a subject plus the quality it should have).
- Brand: hairlines carry the brand accent; text is brand fg; no logo anywhere.
- Timing: the hold (row 2) stretches freely; build (row 1) and clear (row 3) keep their frame counts; 4 fr item stagger.

## Pitfalls
- The mask rise is per line, not per word or letter: each line's clip edge sits just under it (kf-000.50).
- Rules enter from the left and leave toward the right; reversing the exit direction reads as a rewind, not an exit.
- Keep the first and last 8 to 15 frames black, or the loop jumps.
- Lines of different length in each item make the rules differ in drawn length during the build; final rule length is equal in a column.

## Missing components
- FeatureGrid: N items (default 4) in a 2-column grid, each a 6 px accent rule (about 30 % W) above a 3-line text block; rule draws from the left on easings.outExpo 12 fr, lines mask-rise per line with 4 fr stagger on springs.ui, item stagger 4 fr; exit rules retract right on easings.inExpo 10 fr while text fades 6 fr (techniques: card-grid, list-assemble, mask-rise)

## Proposed terms
- rule-draw: an accent hairline draws on from one end before its text and retracts to the other end on exit; rows 1 and 3 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (cells are at 0.00, 0.27, 0.50, 0.77 ... per burned-in timestamps); no 30 fps strip made. Not measurable: entrance curve shape and overshoot, exact item and line stagger, rule draw length in frames, fade length. SFX planned by the glue rule, not measured (reference silent). cut_on_beat = 0/0 cuts (no cuts, no beats): false. Palette from palettegen on kf-000.50 and kf-002.50 (no cut frames exist).

## Study log
- id ruled-feature-grid-cascade, family kinetic-type, 5.00 s, 4 rows (0 cuts; split at state changes 1.27, 4.00, 4.50)
- techniques 3 (card-grid, list-assemble, mask-rise); cut_on_beat n/a (0/0), silent, no VO
- not measurable at 0.25 s: staggers, curve shapes, overshoot, fade length
- proposed terms: rule-draw
- missing components: FeatureGrid
- difficulty easy, render_cost light, loopable true
- phase B not run (study only)
