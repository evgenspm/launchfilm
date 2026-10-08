# Dark phone tumble with split claims

On black, a dark phone tumbles from its back to its screen side every 4 s and settles as a diagonal screen close-up; each claim splits into two halves flanking it. One continuous shot, seven turns, quiet premium rhythm.

Source: https://www.raylight.app/templates/dixKgHfR (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A mobile app promo before there is UI worth showing: the device and the claims carry it.
- A dark, premium teaser with four to six short claims, each given a 4 s hold.
- Silent autoplay feeds: every claim is on screen long enough to read without sound.
Not for: products whose value is in the UI (the screen here is a blank dark texture), or energetic launches with fast cuts.

## Format
16:9 · 30.37 s · 30 fps · dark · music none (silent reference), cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.50 | 0–45 | hook | black, then a two-word title right of centre, second word muted | drift: title ~1 % W left over 1.00–1.50 | 23 fr empty; words blur-in at 0.77 and 1.00, easings.outExpo ~8 fr (±0.25 s) | continuous | tick |
| 2 | 1.50–5.50 | 45–165 | reveal | phone edge-on, camera back, then a diagonal screen close-up | push-in ~1.00→1.02 over 2.50–5.50 | tumble ~30 fr, springs.heavy (overshoot not measurable); title fades 2.27–2.50 | continuous | whoosh |
| 3 | 5.50–9.50 | 165–285 | feature | back view centre, claim one split left and right, then screen behind it | push-in ~1.00→1.03 | tumble ~30 fr springs.heavy; halves blur-in per letter at 5.77, settled 6.27 (~15 fr, ±0.25 s) | continuous | whoosh |
| 4 | 9.50–13.50 | 285–405 | feature | phone from the right, large back with a small one-line label, then screen alone | scale jump during turn (10–11 s), then push-in ~1.02 | tumble ~23 fr springs.heavy; label holds ~15 fr (±0.25 s) | continuous | whoosh |
| 5 | 13.50–17.27 | 405–518 | feature | small back view, claim two split, screen at ~20° tilt | push-in ~1.00→1.03 | tumble ~23 fr springs.heavy; halves blur-in 13.77, settled 14.27 | continuous | whoosh |
| 6 | 17.27–21.50 | 518–645 | feature | phone side at right edge, then left-aligned heading + small sub-line, screen right with a soft light streak | push-in ~1.02, slight rotate at 18 s | tumble ~30 fr springs.heavy; heading blur-in 17.50–18.00, sub-line 18.00–18.27 (±0.25 s) | continuous | whoosh |
| 7 | 21.50–25.50 | 645–765 | feature | warm-lit large back view, claim three split, screen diagonal between halves | push-in ~1.00→1.03 | tumble ~23 fr springs.heavy; halves blur-in 21.77, settled 22.27 | continuous | whoosh |
| 8 | 25.50–27.77 | 765–833 | feature | no text: small phone rises bottom right, turns, stands near-upright | slight pull back at 27 s | rise + turn, springs.heavy ~45 fr (±0.25 s) | continuous | whoosh |
| 9 | 27.77–30.37 | 833–911 | cta | left-aligned two-line closing heading, small download-instruction line, screen right | static | heading blur-in per letter 27.77–28.27; instruction 28.27–28.50; hold 55 fr | end | swell |

Evidence per row: 1 `sheet-01 cells 0–6`; 2 `sheet-01 cells 6–15`, `sheet-02 cells 0–5`; 3 `sheet-02 cells 6–15`, `sheet-03 cells 0–5`; 4 `sheet-03 cells 6–15`, `sheet-04 cells 0–5`; 5 `sheet-04 cells 6–15`, `sheet-05 cells 0–4`; 6 `sheet-05 cells 5–15`, `sheet-06 cells 0–5`; 7 `sheet-06 cells 6–15`, `sheet-07 cells 0–5`; 8 `sheet-07 cells 6–14`; 9 `sheet-07 cell 15`, `sheet-08 cells 0–9`. No cut frames (cuts.json empty); keyframes kf-001.50, kf-014.50, kf-021.50, kf-028.50 for type and colour.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-3d | 2–8 | craft/vocabulary.md#3d (R3F phone model) |
| device-phone | 2–9 | craft/vocabulary.md#ui |
| blur-in | 1, 3, 4, 5, 6, 7, 9 | craft/05-typography.md |
| push-in | 2–7 | craft/03-camera-and-staging.md#drift-and-push-in |

## Look
Palette: #050505 background, #FFFFFF text, #747576 muted second word, #2C2C2C phone body, #ACACAC phone highlight, #635F59 warm phone tint (row 7). Type: bold grotesk, sentence case, ~7 % H, two lines with the second indented; sub-lines regular ~2 % H. Treatment: none. Background: flat black; the phone screen is a dark fine grid texture with a thin rim highlight.

## What to adapt
- Copy: 1 two-word title; 3 split claims of 2 + 2 words (left half, right half); 1 short label; 1 two-line heading with a 4-word sub-line; 1 two-line close with a 3-word download instruction.
- Brand: the muted grey of the second title word is the only colour accent; tint the phone body to the brand if wanted. No logo appears.
- Timing: keep the 120 fr turn period; holds can shrink to ~90 fr but the ~23–30 fr tumble must keep its length.

## Pitfalls
- The phone never shows UI; putting a busy screen on it breaks the dark calm and competes with the side text.
- Text must clear before the next tumble starts (it is gone by each turn start); overlapping it with the turn reads as clutter.
- Split halves must sit outside the phone silhouette at its widest diagonal, or the screen edge cuts through the words.

## Missing components
- Phone3DTumble: R3F phone model whose path goes back view → edge-on → screen side in 23–30 fr, settles on a ~20–30° diagonal close-up with screen filling ~70 % H, then push-in 1–1.7 %/s; body tint and rim light props (techniques: device-3d, device-phone).
- SplitCaption: two-line text halves placed left and right of a centre object, second line indented, per-letter blur-in left to right in ~15 fr (techniques: blur-in).

## Proposed terms
- device-tumble: a device flips from its back to its screen side on a diagonal and settles into a close-up, repeated as the film's rhythm (rows 2–8) (not in craft/vocabulary.md; not used in recipe.json)
- split-caption: one claim split into two halves that flank a centred object (rows 3, 5, 7) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (cell timestamps read 0.27/0.77, i.e. 8 fr steps); no strips extracted. Not measurable: tumble spring overshoot, per-letter stagger, exact blur-in length (all ±0.25 s, values are defaults). Push-in rates are from motion.json zoom %/s, not sheet widths. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no music, no cuts).

## Study log
id phone-tumble-screen-split-claims · family mobile-app · 30.37 s, 9 rows, one continuous shot (0 cuts).
techniques 4 (device-3d, device-phone, blur-in, push-in) · cut_on_beat n/a (silent, 0 cuts).
Turn period measured 4.0 s (starts 1.50, 5.50, 9.50, 13.50, 17.27, 21.50, 25.50).
Not measurable at 0.25 s: spring overshoot, letter stagger, blur-in length (defaults given).
Proposed terms: device-tumble, split-caption.
Missing components: Phone3DTumble, SplitCaption.
phase B: not run.
