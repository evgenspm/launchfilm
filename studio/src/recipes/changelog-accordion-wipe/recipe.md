# Changelog accordion with panel wipe

A bold title card on a saturated colour opens into three update categories; a white panel wipes up and each category unfolds its three items in turn, then folds away. The update log reads as one calm, paced list.

Source: https://jitter.video/template/the-stack-release-notes/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A what's-new or changelog post for a social feed (4:5 or 9:16)
- Three groups of updates (added / fixed / improved) with up to three short items each
- Silent autoplay placements where the text carries the whole message
- A recurring changelog series that reuses one template with new copy
Not for: launches with one hero claim, or updates that need screenshots to make sense.

## Format
4:5 · 18.4 s · 30 fps · mixed (blue act 0 to 5.6 s, white act after) · music none, cut_on_beat n/a (0 cuts, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.00 | 0–30 | hook | brand-blue field, concentric square-and-ring pattern blooms from centre, thin pale rule lands near top | locked-off | pattern point to full frame 0.27 to 0.77 s (~15 fr, easings.outExpo, ±0.25 s); rule settles by 1.00 s, springs.ui (overshoot not measurable) | hard-cut | none |
| 2 | 1.00–2.77 | 30–83 | hook | small date label, two-word heavy title across the frame, pattern dims behind; corner wordmark and footer URL fixed | locked-off | title words mask-rise, ~2 fr apart (±0.25 s), springs.maskRise, settled 1.50 s; rule and date ride up ~2 % H, springs.layout; pattern starts rotating at 2.50 s | hard-cut | none |
| 3 | 2.77–5.27 | 83–158 | reveal | title shrinks to a top-left header; three category lines (icon + 1-2 words) build bottom-left; hold | locked-off | header scale ~0.45x + move up, springs.layout ~8 fr (±0.25 s); categories mask-rise at 3.00 / 3.27 / 3.50 s, springs.maskRise; pattern ~45 deg turn, easings.outQuint; hold 1.50 s | mask-wipe | tick |
| 4 | 5.27–8.77 | 158–263 | feature | white panel rises over all but a thin blue top band; list moves to the top in black; category 1 unfolds three short items with arrow bullets | locked-off | panel wipe 22 fr (f158 to f180, easings.inOutSine); items mask-rise per word, line stagger ~3 fr (±0.25 s), settled 6.50 s; lower heads push down on springs.layout; hold 2.25 s | hard-cut | whoosh |
| 5 | 8.77–12.27 | 263–368 | feature | category 1 folds, category 2 climbs under it and unfolds three items; faint line-art mark in the lower half fades | locked-off | items exit up through masks ~8 fr (±0.25 s); rows close on springs.layout; new items mask-rise 9.50 to 10.27 s; mark fades ~8 fr at 10.00 to 10.27 s; hold 2.00 s | hard-cut | tick |
| 6 | 12.27–18.40 | 368–552 | feature | category 2 folds, category 3 climbs and unfolds three items; long end hold with footer URL | locked-off | same fold 12.27 to 12.77 s and unfold 13.00 to 13.77 s (springs.layout, springs.maskRise, ±0.25 s); static 4.63 s to the end | hard-cut | tick |

Evidence per row:
1. sheet-01 cells 0–4
2. sheet-01 cells 4–10
3. sheet-01 cells 11–15, sheet-02 cells 0–5
4. sheet-02 cells 5–15, sheet-03 cells 0–3, cuts/cut-005.27.jpg (soft 5.27 to 6.00)
5. sheet-03 cells 3–15, sheet-04 cells 0–1
6. sheet-04 cells 1–15, sheet-05 cells 0–9

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| mask-rise | 2, 3, 4, 5, 6 | craft/vocabulary.md#type, craft/05-typography.md |
| list-assemble | 3, 4, 5, 6 | craft/vocabulary.md#ui, studio presets/list.tsx |
| mask-wipe | 3 → 4 | craft/09-transitions.md |

## Look
Palette: #0046E6 (act 1 background), #FFFFFF (act 2 background), #000000 (act 2 text), #B7E5FC (act 1 title and rule), #0142D4 (pattern tone), #3B3B3B (secondary text). Type: heavy grotesk title ~4 % H on blue; light serif category heads ~3 % H with line icons; small grotesk items ~1.3 % H with arrow bullets. Treatment: none. Background: flat colour with a low-contrast geometric pattern (tone-on-tone blue, then near-white line art on white).

## What to adapt
- Copy: date label, 1-2 word title, 3 category labels (1-2 words), 3 items per category (3-5 words each); 14 lines total. Footer URL line.
- Brand: the accent fills act 1 and the top band of act 2; logo sits top-left, small domain top-right through the whole film.
- Timing: the per-category period (105 fr) and the end hold stretch; keep the 22 fr wipe and the ~8 fr fold.

## Pitfalls
- The end hold is 4.63 s of nothing; on feeds cut it to ~2 s or loop back.
- Only one category is open at a time; opening two breaks the 4:5 layout.
- Items must be one line each at ~1.3 % H; longer copy wraps and pushes the next head off its rhythm.

## Missing components
- AccordionList: stacked category heads (icon + label), one open at a time; open = items mask-rise per word with ~3 fr line stagger, close = items exit up ~8 fr and rows close on springs.layout; period 105 fr (techniques: list-assemble, mask-rise)
- PanelWipe: solid panel rising from the bottom over 22 fr with easings.inOutSine, leaving a top band of the previous colour (techniques: mask-wipe)
- PatternBloom: concentric squares and rings growing from a point to full frame in ~15 fr, then a slow ~45 deg turn (techniques: none in vocabulary)

## Proposed terms
- accordion-list: a list of section heads where one section at a time unfolds its items and folds back, rows 4–6 (not in craft/vocabulary.md; not used in recipe.json)
- pattern-bloom: a tone-on-tone geometric backdrop that grows from the centre to fill the frame, row 1 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; the wipe edges (f158 to f180) come from cuts.json. Not measurable: word and line staggers, overshoot of the mask rises, exact fold length. Palette sampled with palettegen from keyframes kf-002.50, kf-004.50, kf-010.50 (the only cut frame is a before/after pair). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats). Catalogue hint `card-grid` not seen.

## Study log
id changelog-accordion-wipe · family product-ui · 18.4 s, 4:5, 30 fps · 6 rows (0 hard cuts, 1 soft wipe at 5.27 to 6.00 s)
techniques 3 (mask-rise, list-assemble, mask-wipe) · cut_on_beat n/a, silent reference
not measurable at 0.25 s: staggers, overshoot, fold frames
proposed terms: accordion-list, pattern-bloom
missing components: AccordionList, PanelWipe, PatternBloom
phase B: not run (study only)
