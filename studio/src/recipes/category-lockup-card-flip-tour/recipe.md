# Category lockup tour with flipping cards

A fixed wordmark gains one category word per section: a chip grows into full-bleed footage, a cover wall pushes in, puzzle cards flip off a stack, photos swing flat from tilted planes. Ends on a light statement and the bare mark.

Source: https://www.raylight.app/templates/ax3DxDlf (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A bundle or subscription with 4-6 distinct content categories, named one per section beside the mark
- A short wordmark that reads as a lockup with one swapped word
- You have one strong full-bleed photo or clip per category plus a handful of flat UI cards
- Calm, premium, silent autoplay brand film of about 30 s
Not for: a single-feature product, or brands without imagery for each category (the photos carry half the film).

## Format
16:9 · 30.2 s · 30 fps · light · music none (silent reference), cut_on_beat n/a · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.67 | 0–80 | hook | wordmark centred, column of 6 category words rolls up beside it; then a 3-word phrase with a chip slot | drift 1.00→1.02 | words roll one per ~0.15 s, inOutSine 30 fr (±0.25 s); chip with check grows, springs.ui 12 fr | mask-wipe | ui-confirm |
| 2 | 2.67–3.82 | 80–115 | feature | chip opens into rounded ocean-footage window to full bleed; lockup mark + category 1 | push-in 1.00→1.04 | window to full bleed ~6 fr outExpo (±0.25 s); word wipes in ~8 fr | frame-in-frame | whoosh |
| 3 | 3.82–4.82 | 115–145 | feature | footage shrinks into one cover; row of 4 covers on light grey | static, then lateral travel left | shrink springs.layout 11 fr; covers enter stagger ~3 fr (±0.25 s) | slide-push | |
| 4 | 4.82–6.20 | 145–186 | proof | three-row wall of covers, 2-word count statement in a gap | push-in 1.00→1.12 from 5.73 | rows drift opposite ~1 px/fr; count types on ~8 fr; push inExpo 28 fr | tilt-plane | |
| 5 | 6.20–8.27 | 186–248 | feature | yellow card swings up flat; lockup mark + category 2 with an emoji over the gap | static after swing | rotate ~60° → flat springs.heavy 20 fr; word wipes ~8 fr; emoji cycles 3 faces / 8 fr | hard-cut | whoosh |
| 6 | 8.27–9.77 | 248–293 | feature | first puzzle card rises on a yellow base, light grey | static | rise springs.ui 10 fr; flip down at 9.50, inExpo 8 fr (±0.25 s) | hard-cut | swoosh-short |
| 7 | 9.77–11.50 | 293–345 | feature | flip chain: purple, orange, green cards | static | one flip per 15 fr, hinge at bottom edge, inExpo 8 fr (±0.25 s) | hard-cut | swoosh-short |
| 8 | 11.50–13.70 | 345–411 | feature | blue card lands and holds, base drops away | static, Y tilt from 13.27 | base sinks 10 fr; hold ~1.2 s; Y ~25° + shrink inExpo 12 fr | tilt-plane | |
| 9 | 13.70–15.12 | 411–454 | feature | food photo on tilted plane swings flat; lockup + category 3 | push-in 1.00→1.03 | flatten springs.heavy 9 fr (±0.25 s); word wipes ~8 fr | slide-push | whoosh |
| 10 | 15.12–16.55 | 454–497 | feature | stack of 4 small cards slides down, photo leaves bottom; stack scrolls up | vertical dolly ~17 px/fr | photo out 12 fr inOutSine; cards stagger 3 fr | tilt-plane | |
| 11 | 16.55–18.13 | 497–544 | feature | wildlife photo on tilted plane swings flat; lockup + category 4 | push-in 1.00→1.03 | flatten springs.heavy 9 fr (±0.25 s); lockup dissolves 8 fr before cut | hard-cut | whoosh |
| 12 | 18.13–21.80 | 544–654 | feature | blue field: news card slides out left; lead-in word + roll of 7 place names to a summary line | static | card out 8 fr inExpo; roll one name / ~4 fr inOutSine, settles 21.00 | hard-cut | |
| 13 | 21.80–23.27 | 654–698 | feature | low-angle portrait footage; lockup + category 5 | drift up ~150 px over 15 fr | lockup rises springs.ui 12 fr | frame-in-frame | |
| 14 | 23.27–24.50 | 698–735 | feature | footage shrinks to card at left; 3-word phrase to its right | lateral travel left ~25 px/fr | shrink springs.layout 12 fr; phrase wipes 8 fr; out left from 24.27 inExpo 8 fr | slide-push | |
| 15 | 24.50–26.27 | 735–788 | feature | 6 small article cards drift on a diagonal; 3-word phrase slides in | lateral travel left ~12 px/fr | cards linear ~1 s each, stagger ~6 fr; phrase springs.ui 12 fr | slide-push | |
| 16 | 26.27–27.77 | 788–833 | feature | phone with app home rises, crosses, exits top | vertical dolly ~20 px/fr | rise springs.heavy 15 fr, hold 8 fr, out inExpo 12 fr | slide-push | |
| 17 | 27.77–28.77 | 833–863 | feature | closing 4-word statement centred | static | fade in 6 fr outQuint (±0.25 s), hold, fade out 4 fr | hard-cut | |
| 18 | 28.77–30.20 | 863–906 | logo | bare wordmark; suffix symbol added at 29.27, lockup recentres | static | suffix springs.snappy 8 fr (overshoot not measurable); recentre springs.ui 8 fr | hard-cut | pop |

Evidence per row: 1 sheet-01 cells 0–10, cuts/cut-002.67; 2 sheet-01 cells 11–14, cuts/cut-002.73, cut-003.63; 3 sheet-01 cell 15, sheet-02 cells 0–3, cut-004.47; 4 sheet-02 cells 4–9, cut-005.73; 5 sheet-02 cells 10–15, sheet-03 cell 0; 6 sheet-03 cells 1–6, cut-008.27; 7 sheet-03 cells 7–13; 8 sheet-03 cells 14–15, sheet-04 cells 0–6; 9 sheet-04 cells 7–12, cut-013.70, cut-014.80; 10 sheet-04 cells 13–15, sheet-05 cells 0–2, cut-016.07; 11 sheet-05 cells 3–8; 12 sheet-05 cells 9–15, sheet-06 cells 0–7, cut-018.13; 13 sheet-06 cells 8–12, cut-021.80, cut-022.97; 14 sheet-06 cells 13–15, sheet-07 cells 0–1; 15 sheet-07 cells 2–8; 16 sheet-07 cells 9–14; 17 sheet-07 cell 15, sheet-08 cells 0–2; 18 sheet-08 cells 3–8.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| word-swap | 2, 5, 9, 11, 13 | craft/05-typography.md (category word swapped beside a fixed mark) |
| stacked-roll | 1, 12 | craft/05-typography.md |
| mask-wipe | 1 | craft/09-transitions.md |
| frame-in-frame | 2, 3, 13, 14 | craft/09-transitions.md, craft/03-camera-and-staging.md |
| card-grid | 3, 4 | craft/vocabulary.md#ui |
| push-in | 2, 4, 9, 11 | craft/03-camera-and-staging.md#drift-and-push-in |
| tilt-plane | 5, 8, 9, 11 | craft/03-camera-and-staging.md |
| slide-push | 3, 10, 14, 15, 16 | craft/09-transitions.md |
| device-phone | 16 | craft/vocabulary.md#ui |

## Look
Palette: #F1F2F4 background grey, #050403 text near-black, #F0BB49 section yellow, #76A8DD section mid-blue, #3C81E9 card blue, #1A6081 ocean footage. Type: medium grotesk, sentence case, normal tracking, about 5 % of frame height; white over footage, near-black on grey. Treatment: none. Background: flat light grey between full-bleed photo sections; two flat colour fields (yellow, mid-blue).

## What to adapt
- Copy: 5 category words (1 word each), one opening phrase of 3 words with a chip slot, a 2-word count, a list lead-in + 5-8 items + summary, two closing phrases of 3-4 words, one closing statement of 4 words.
- Brand: the wordmark stays the anchor at left of centre in every lockup; the flat card colours (yellow, purple, orange, green, blue) can be swapped for brand secondaries; the end suffix is optional.
- Timing: lockup holds (rows 2, 5, 9, 11, 13) stretch to 2 s each; the flip chain must keep 15 fr per flip; tilted-plane swings stay under 20 fr.

## Pitfalls
- Each section enters through a shape change (chip opens, frame shrinks, plane swings, card flips). Replacing those with hard cuts turns it into a slideshow.
- The mark must not move between lockups: only the category word changes. Re-centre the lockup per word and the anchor is lost.
- Photo lockups need white type on busy footage; pick images with a calm band at mid height or add a `scrim`.
- Row 12 rolls 7 names in ~1 s; more items make it unreadable, fewer lose the roll.

## Missing components
- CardFlipChain: N square cards stacked; every 15 fr the top card hinges on its bottom edge, rotates 0→90° toward camera in 8 fr inExpo and becomes a flat base under the next card (techniques: tilt-plane, proposed card-flip-chain)
- ChipWindow: inline rounded chip inside a sentence that grows into a full-bleed media window, 6-10 fr outExpo, corner radius 30 % → 0 (techniques: frame-in-frame, mask-wipe)
- CoverWall: 3 rows of portrait covers drifting in opposite directions ~1 px/fr with a text gap in the middle row (techniques: card-grid)

## Proposed terms
- card-flip-chain: stacked cards each flipping down off the top to reveal the next, rows 6–8 (not in craft/vocabulary.md; not used in recipe.json)
- chip-window-expand: a small inline chip inside a phrase opens into full-bleed footage, rows 1–2 (not in craft/vocabulary.md; not used in recipe.json)
- word-clip-wipe: a single word revealed by a left-to-right clip beside a fixed mark, rows 2, 5, 9, 11, 13 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips extracted. Not measurable: spring overshoot, word wipe length (~8 fr ±0.25 s), chip growth (~6 fr ±0.25 s), flip duration (8 fr ±0.25 s). The 2.67/2.73 pair of hard cuts sits inside the chip growth and is kept as one boundary inside row 2's start (2.73 is a 2 fr sub-shot merged by the montage rule). Soft transitions at 3.63, 4.47, 5.73, 14.80, 16.07, 22.97 fall inside rows; row boundaries use the shot list. SFX planned by the glue rule, not measured. cut_on_beat = 0/6 cuts within ±2 fr (no audio, no beats). Palette from palettegen on cuts/cut-002.67, cut-014.80, cut-022.97 and keyframes 7.50, 12.50, 20.50.

## Study log
id category-lockup-card-flip-tour · family logo-brand · 30.20 s, 18 rows
techniques 9 (word-swap, stacked-roll, mask-wipe, frame-in-frame, card-grid, push-in, tilt-plane, slide-push, device-phone)
cut_on_beat: n/a (silent reference, 0/6)
not measurable at 0.25 s: overshoot, wipe/flip/chip frame counts
proposed terms: card-flip-chain, chip-window-expand, word-clip-wipe
missing components: CardFlipChain, ChipWindow, CoverWall
phase B: not run
