# Card stack fan into a vertical filmstrip reel

A dot grows into a small rounded image card, fans into a column of four, folds back, then the front card grows to full bleed. Four full-bleed images slide down one after another under a rolling index number, closing on a framed title card.

Source: https://jitter.video/template/frames-mobile-showreel/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A vertical portfolio or gallery reel of 3-6 strong images or app screens
- Social or store asset where the visuals carry the message and copy is one title
- Opening a showcase by previewing every item at once before showing each full screen
- Silent autoplay where motion alone has to read as a sequence
Not for: products that need UI explained step by step, or films with VO and claims to carry.

## Format
9:16 · 9.17 s · 30 fps · dark · music none (silent source), cut_on_beat n/a (0/0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–3.45 | 0–104 | hook | dark bg, 4 corner tick dots frame a dot that becomes a small rounded image card; fans into a column of 4, folds back, front card grows to fill | static frame; subject 0.27 W to 1.00 W over 3.00–3.53 | dot to card 0.27–0.50 springs.pop (overshoot not measurable); fan open 1.00–1.50 springs.layout 15 fr; hold 1.50–2.27; fold 2.27–2.77 springs.ui 15 fr; grow to bleed 3.00–3.53 easings.inOutCubic 16 fr (±0.25 s) | frame-in-frame | swoosh-short |
| 2 | 3.45–4.72 | 104–142 | reveal | image 1 full bleed, index label 01 rotated bottom-left | push-in 1.00→1.03 (±0.25 s), easings.linear | label appears with the bleed at 3.50; next image enters from the top at 4.30 and pushes this one down, easings.inOutCubic 24 fr | slide-push | whoosh |
| 3 | 4.72–5.65 | 142–170 | feature | image 2 full bleed, index 02 | static between slides | digit roll with the slide (±0.25 s); next slide 5.30–6.00, easings.inOutCubic 21 fr | slide-push | whoosh |
| 4 | 5.65–6.85 | 170–206 | feature | image 3 full bleed, index 03 | static between slides | digit roll (±0.25 s); next slide 6.60–7.10, easings.inOutCubic 15 fr | slide-push | whoosh |
| 5 | 6.85–7.80 | 206–234 | feature | image 4 full bleed, index 04 | static between slides | digit roll (±0.25 s); dark end card slides down from the top 7.57–8.03, easings.inOutCubic 14 fr | slide-push | whoosh |
| 6 | 7.80–9.17 | 234–275 | logo | dark end card: 2-line caps title, 2-line caps sub-block, tiny URL, inside 4 corner tick dots | static; tick frame grows taller as lines are added | title in with the slide at 8.00; sub-block at 8.27, stack re-centres, springs.ui 8 fr (±0.25 s); URL at 8.50 fade 8 fr (±0.25 s); hold to end | hard-cut | tick |

Evidence per row:
1. sheet-01 cells 0–13 (dot 0.00–0.27, card 0.50–0.77, fan 1.00–1.77, hold 2.00–2.27, fold 2.50–2.77, grow 3.00–3.27), `cuts/cut-003.37.jpg`
2. sheet-01 cells 14–15, sheet-02 cells 0–2, `cuts/cut-004.33.jpg`
3. sheet-02 cells 3–6, `cuts/cut-005.30.jpg`
4. sheet-02 cells 7–10, `cuts/cut-006.60.jpg`
5. sheet-02 cells 11–15, `cuts/cut-007.57.jpg`
6. sheet-02 cell 15, sheet-03 cells 0–4

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| frame-in-frame | 1 (card grows from the stack into full bleed, reverse direction) | craft/vocabulary.md#camera, FrameInFrame |
| push-in | 2 | craft/vocabulary.md#camera, KenBurns |
| slide-push | 2–5 | craft/vocabulary.md#transitions, ShotTransition |
| counter | 2–5 (index digits roll 01 to 04) | craft/vocabulary.md#type |
| end-card | 6 | craft/vocabulary.md#brand, EndCard |

## Look
Palette: #141412 background, #FC7F28 / #EF591E / #DA161A warm image accents, #CFBFD4 pale lilac image bg, #273522 deep green image bg; text is near-white (not in the palettegen sample). Type: bold grotesk, all caps, tight leading, title about 3.5 % of H; index medium grotesk rotated 90 degrees, about 4 % of H; URL tiny caps. Treatment: none. Background: flat near-black for open and close, full-bleed photos in between.

## What to adapt
- Copy: title 2 lines of 1 word each, sub-block 2 lines (code + category, 1 word each), URL; the index label is generated.
- Brand: bg carries the open and close; fg for type and ticks; the images carry all colour. No logo slot in the reference; a mark can replace the sub-block.
- Timing: holds per image can stretch with more images; keep the slide lengths shrinking (24 → 14 fr) and the fan open/fold pair symmetric (15 fr each).

## Pitfalls
- The index label does not move with the images: it sits on top, fixed, and only its digits change.
- Slides go top to bottom; the next image enters from the top edge, the old one leaves through the bottom.
- The front card of the stack must be image 1, so the grow-to-bleed reads as one continuous object.
- Corner tick dots follow the card bounds in row 1 and the text block in row 6; static ticks look dead.

## Missing components
- CardStackFan: N rounded image cards stacked at one point, fan into a vertical column (gap ~6 % of card height, card 0.27 W), hold, fold back, then the front card scales to cover the frame (16 fr). (techniques: frame-in-frame; proposed stack-fan)
- CornerTicks: 4 small square dots at the corners of a target rect, animated with springs.layout to follow the rect. (proposed corner-ticks)
- IndexRoll: rotated slash + 2-digit label fixed bottom-left, digits roll on each slide. (technique: counter)

## Proposed terms
- stack-fan: a pile of cards spreads into a row or column and folds back, previewing every item (row 1) (not in craft/vocabulary.md; not used in recipe.json)
- corner-ticks: four corner dots framing the subject and following its bounds (rows 1, 6) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; slide windows from cuts.json soft[] (1 fr). No 30 fps strips extracted. Not measurable: overshoot of the dot-to-card pop and the fan, stagger between the 4 cards, exact digit-roll timing, end-card line entrance curves. The source is silent: SFX planned by the glue rule, not measured. cut_on_beat = 0/0 (no beats, no hard cuts; 5 soft transitions). Catalogue hint 3d-device / device-phone not confirmed: no device frame, flat rounded cards only.

## Study log
id stack-fan-filmstrip-reel · family transitions · 9.17 s, 6 rows (0 hard cuts, 5 soft)
techniques 5 (frame-in-frame, push-in, slide-push, counter, end-card) · difficulty medium · render light
cut_on_beat n/a: silent source, 0 beats
slide-push lengths 24, 21, 15, 14 fr from cuts.json; other motion at ±0.25 s
not measurable: overshoot, card stagger, digit roll timing (no strips)
proposed terms: stack-fan, corner-ticks
missing components: CardStackFan, CornerTicks, IndexRoll
phase B: not run (study job)
