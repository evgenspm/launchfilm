# Menu slot roll into a drifting image wall

A one-line claim types in on pale grey, a sidebar menu rolls entry by entry like a slot drum, spins and lands on one entry, the camera pushes into it, a three-column image wall drifts up, and one card grows into a dimmed closing frame.

Source: https://www.raylight.app/templates/nEAFYmnY (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A tool or library with a long feature list where one category is the differentiator
- A 15 to 20 s vertical reel narrated by VO, one claim per beat
- The product owns a strong image set that can carry the second half
- Moving from a calm light UI opening to a moody full-bleed close
Not for: products without their own imagery (the wall is the proof), or films without VO (the drum steps follow the voice, not the music).

## Format
9:16 · 18.43 s · 30 fps · mixed (light 0 to 12.5 s, dark after) · music 91.7 BPM, cut_on_beat 0/1 · VO yes, 31 words in 17.4 s, ~1.8 words/s

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.27 | 0–68 | hook | small mark top centre on pale grey; 7-word claim on two lines, names the sameness problem | drift 1.00→1.02 over 68 fr, easings.linear | word-reveal from 0.27 s, ~3 fr per word (±0.25 s), each word light grey → ink ~8 fr (±0.25 s) easings.outExpo; complete 1.00 s, holds 30 fr | blur-dissolve | none |
| 2 | 2.27–6.27 | 68–188 | problem | menu drum: centre entry in ink with a line icon, faded neighbours above and below; generic categories | locked frame, only the drum content moves | one step about every 30 fr, step ≤ 8 fr (±0.25 s) springs.ui (overshoot not measurable); neighbours ~20 % opacity at ±10 % H; landings meet the VO | hard-cut | tick |
| 3 | 6.27–7.27 | 188–218 | tension | same drum spins fast, a new pair of entries every cell | locked frame, only the drum content moves | ~4 entries per 0.25 s, decelerating, easings.outExpo 30 fr; lands on the hero entry at 7.27, settled by 7.50 | hard-cut | whoosh |
| 4 | 7.27–8.90 | 218–267 | reveal | drum at rest on the hero entry (the image category) | hold 38 fr, then push-in 1.00→~1.40 over ~11 fr (±0.25 s), easings.inExpo, cut mid-acceleration | only the push; neighbours keep ~20 % opacity | hard-cut | swoosh-short |
| 5 | 8.90–12.27 | 267–368 | feature | three-column wall of rounded image cards, offset columns, pale gutters; white capsule with mark and name at top | dolly up ~2.4 px/fr at 720 w (~6.3 px/fr at 1920), easings.linear; scale drift 1.00→0.93 over 101 fr | capsule fades and un-blurs 9.00→9.50 (~12 fr, ±0.25 s) easings.outExpo; columns move together (parallax not measurable) | hard-cut | none |
| 6 | 12.27–12.77 | 368–383 | feature | one portrait card in the middle column grows over the wall to fill the frame | locked frame; the card scales, the camera does not | capsule fades out 12.00→12.27; card scale 1→~3.3, radius → 0 over ~15 fr (±0.25 s) springs.ui (overshoot not measurable); image dims to ~45 % by 12.77 | hard-cut | swell |
| 7 | 12.77–15.77 | 383–473 | logo | full-bleed dimmed portrait; white petal mark upper third, wordmark below | drift 1.00→1.015 over 90 fr, easings.linear | petals pop in one by one from 13.00, stagger ~4 fr (±0.25 s) springs.ui (overshoot not measurable), whole at 13.77; wordmark grey → white 13.50→13.77 (~8 fr); hold 51 fr; both fade 15.50→15.77 (~8 fr) | blur-dissolve | pop |
| 8 | 15.77–18.43 | 473–553 | outro | same dimmed portrait; 9-word closing promise on two lines, second line partly bold | drift 1.00→1.005, easings.linear | word-reveal to VO: 3 words at 15.77, line 1 done 16.00, line 2 from 16.77, complete 17.00; each word ~8 fr fade (±0.25 s) easings.outExpo; holds 43 fr | hard-cut | none |

Evidence per row:
1. sheet-01 cells 0–8 (0.00–2.00), keyframes kf-000.50, kf-001.50.
2. sheet-01 cells 9–15, sheet-02 cells 0–8 (2.27–6.00), kf-002.50 … kf-005.50.
3. sheet-02 cells 9–12 (6.27–7.00): a different pair of entries in each cell.
4. sheet-02 cells 13–15, sheet-03 cells 0–3 (7.27–8.77): entries grow at 8.77; cuts/cut-008.90.jpg (before half).
5. sheet-03 cells 4–15, sheet-04 cell 0 (9.00–12.00); cuts/cut-008.90.jpg (after half); motion.json 9–12 s pan −190 px/s, zoom −2.4 %/s.
6. sheet-04 cells 1–3 (12.27–12.77).
7. sheet-04 cells 4–14 (13.00–15.50).
8. sheet-04 cell 15, sheet-05 cells 0–9 (15.77–18.27).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| word-reveal | 1, 8 | craft/vocabulary.md#type, studio WordReveal |
| blur-dissolve | 1, 7 | craft/vocabulary.md#transitions |
| stacked-roll | 2, 3, 4 | craft/vocabulary.md#type, studio StackedRoll |
| push-in | 4 | craft/vocabulary.md#camera (here accelerated with inExpo) |
| hard-cut | 4→5 | craft/vocabulary.md#transitions |
| dolly | 5 | craft/vocabulary.md#camera, studio Dolly |
| scrim | 6, 7, 8 | craft/vocabulary.md#look, studio Scrim |
| end-card | 7, 8 | craft/vocabulary.md#brand, studio EndCard |

## Look
Palette: #F5F7F2 background (pale green-grey), #1A1D19 ink, #939591 faded menu entries, #E5E7E3 card gutter tint, #3A2918 dimmed close image, #776E60 warm mid-tone of the close. Type: medium grotesk, sentence case, normal tracking; statement ~4 % H, menu entries ~2.5 % H with a line icon, close line ~4 % H white with bold key words. Treatment: scrim (dark plate over the closing image). Background: flat pale grey (rows 1–4), photo wall (5–6), full-bleed dimmed photo (7–8).

## What to adapt
- Copy: hook 1 claim ≤ 8 words; menu 10–16 entries with icons, generic first, hero last; close ≤ 10 words with 2–3 bold words.
- Brand: the mark sits top centre in row 1, in the capsule in row 5 and as the hero in row 7; ink and pale grey carry rows 1–4, the images carry the rest.
- Timing: rows 2 and 8 stretch with the VO; rows 3, 4 and 6 keep their frame counts (30, 49, 15).

## Pitfalls
- The push in row 4 must accelerate into the cut (inExpo); a slow decelerating push-in loses the drop into the wall.
- Drum neighbours must stay faint (~20 %): at full opacity the slot reads as a plain list.
- The closing image must be dimmed to ~45 % before the mark arrives, or the white mark and line lose contrast.
- Pick a close image with an empty upper third: the mark and line sit there.

## Missing components
- ImageWall: N columns of rounded image cards with offset start heights, gutters 2 % W, column scroll linear ~6 px/fr at 1920 w (techniques: dolly)
- CardExpand: one card of a grid scales to cover the frame, radius → 0, springs.ui ~15 fr, then dims to 45 % (techniques: scrim)
- MenuDrum: StackedRoll variant with an icon per entry, 3 visible rows, neighbours at 20 % opacity, step per VO word (techniques: stacked-roll)

## Proposed terms
- menu-drum: a sidebar menu used as a slot drum, stepping then spinning to land on one entry (rows 2–4) (not in craft/vocabulary.md; not used in recipe.json)
- card-expand-fill: a grid card grows to become the next full-bleed shot (row 6) (not in craft/vocabulary.md; not used in recipe.json)
- petal-assemble: mark segments pop in one by one around a centre (row 7) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips taken. Not measurable: per-word stagger and fade length in rows 1 and 8, drum step easing and overshoot, push-in end scale, card growth curve, petal stagger, wall parallax between columns. Wall travel speed from motion.json (−190 px/s at 1920 w). Palette from palettegen on keyframes kf-001.50, kf-010.50, kf-016.50 (only one cut frame exists). SFX planned by the glue rule, not measured. cut_on_beat = 0/1 cuts within ±2 fr (cut 8.90, nearest beat 8.742 = 4.7 fr).

## Study log
id menu-slot-roll-image-wall · family social-promo · 18.43 s, 8 rows · 8 techniques (incl. hard-cut, scrim).
cut_on_beat false (0/1); energy calm (91.7 BPM, 0.05 cuts/s); theme mixed.
Rows split from the single detected cut at the visible state changes: text→menu 2.27, spin 6.27, landing 7.27, card grow 12.27, mark 12.77, close line 15.77.
Not measurable at 0.25 s: word stagger, drum step easing, push end scale, card growth curve, petal stagger.
Proposed terms: menu-drum, card-expand-fill, petal-assemble.
Missing components: ImageWall, CardExpand, MenuDrum.
phase B: not run.
