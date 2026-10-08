# Spinning phone swaps sides with each line

A phone spins in from the right and parks on the left beside a one-line statement, then turns once more and crosses to the right while a two-line claim wipes in on the left. Each line is wiped in the direction the phone travels.

Source: https://www.raylight.app/templates/3YstymPX (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A mobile site or app teaser of 5 s with one hero screen and two short lines
- Silent social autoplay or a looping landing-page hero on a light background
- Setup line then benefit line, both paired with the same device
Not for: products with many screens or features (one screenshot only), dark brands without re-tuning the look, films that need a logo or URL close.

## Format
16:9 · 5.00 s · 30 fps · light · music none (no audio), cut_on_beat n/a (0 cuts) · VO no · loopable (starts and ends on blank white)

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.77 | 0–23 | hook | blank white, phone fades in at the right, spinning while it travels left | locked-off | fade ~8 fr; travel x 0.78 W to 0.23 W over ~22 fr, easings.outQuint (±0.25 s); spin >= 1 turn | continuous | whoosh (planned) |
| 2 | 0.77–1.77 | 23–53 | feature | phone with shop page on the left, three-quarter view; statement 1, 3 words, sets the context, right half | locked-off | statement wipes in right-to-left with soft mask edge plus ~3 % W slide, ~7 fr (±0.25 s); phone grows 0.55 H to 0.67 H over 30 fr, springs.heavy (overshoot not measurable) | continuous | swoosh-short (planned) |
| 3 | 1.77–2.50 | 53–75 | feature | side swap: statement 1 wipes out, phone turns once and crosses right, statement 2 wipes in on the left | locked-off | text out left-to-right ~10 fr; phone one full turn in ~22 fr, x 0.23 W to 0.70 W, peak ~50 px/fr @1920; statement 2 revealed left-to-right behind the phone ~7 fr (±0.25 s) | continuous | whoosh (planned) |
| 4 | 2.50–3.50 | 75–105 | feature | statement 2, 4 words on two centred lines, names the benefit, left; phone front-facing right | locked-off | phone settles x 0.70 W to 0.74 W, easings.outQuint ~24 fr from 2.00 s (±0.25 s), height ~0.77 H; text holds 30 fr | continuous | none |
| 5 | 3.50–5.00 | 105–150 | feature | statement 2 wipes out, phone leaves, white holds to the end | locked-off | text out left-to-right ~8 fr (±0.25 s); phone gone between 3.77 and 4.00 s (exit <= 7 fr, method not visible); white hold 30 fr | end | swoosh-short (planned) |

Evidence: row 1 `sheet-01 cells 0–3`; row 2 `sheet-01 cells 3–7`, `keyframes/kf-001.50.jpg`; row 3 `sheet-01 cells 7–10`; row 4 `sheet-01 cells 10–13`; row 5 `sheet-01 cells 14–15`, `sheet-02 cells 0–3`, `keyframes/kf-003.50.jpg`. No cut frames (cuts.json is empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-phone | 1–5 | craft/vocabulary.md#product-ui, studio PhoneFrame |
| device-3d | 1, 3 | craft/vocabulary.md#3d (phone turns on its vertical axis showing the back) |
| statement-sequence | 2–5 | craft/vocabulary.md#type, craft/families/statement.md |
| mask-wipe | 2, 3, 5 | craft/vocabulary.md#transitions (used on the text lines, not between scenes) |

## Look
Palette: #FFFFFF background, #110F0A text, #4B4432 / #6E624F / #958876 / #D7D5CC from the phone screen (warm interior photo, cream header). Type: geometric sans, semibold, title case, normal tracking, cap height ~6 % H. Treatment: none. Background: flat white. The phone is a realistic silver model with a soft contact shadow.

## What to adapt
- Copy: 2 lines. Line 1 up to 4 words on one line (context). Line 2 up to 6 words over two centred lines (benefit).
- Brand: the product shows only through the screenshot on the phone; text stays brand fg on brand bg. No logo moment.
- Timing: the holds (rows 2 and 4, 30 fr each) can stretch; entrance (~22 fr) and crossing (~22 fr) keep their frame counts so the spin reads.

## Pitfalls
- Text sits on the opposite half from the phone; the mask edge must move with the phone, or the swap reads as two unrelated moves.
- The crossing passes edge-on at 2.27 s: a flat 2D phone card disappears there, so fake depth (side band) or use a 3D model.
- End on blank white for 30 fr, otherwise the loop jumps.

## Missing components
- SpinPhone: PhoneFrame wrapper with a back face (camera bump plate), yaw rotation 0 to 360 deg over N fr while translating x, scale from 0.44 H to 0.77 H, contact shadow (techniques: device-phone, device-3d)
- SideWipeText: statement line revealed or hidden by a soft-edged horizontal mask whose direction is a prop, edge ~4 % W feather, ~7 fr reveal (techniques: mask-wipe, statement-sequence)

## Proposed terms
- device-spin: the device turns a full revolution on its vertical axis while travelling across the frame (rows 1, 3) (not in craft/vocabulary.md; not used in recipe.json)
- side-swap: device and text exchange frame halves between statements (row 3) (not in craft/vocabulary.md; not used in recipe.json)
- trailing-wipe: a text mask whose edge follows a moving object (rows 2, 3) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strip extracted. Not measurable: spring overshoot, exact spin direction and turn count during the entrance (aliasing at 4 fps), phone exit method at 3.77–4.00 s, mask feather width. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats). Palette from palettegen on keyframes kf-001.50 and kf-003.50 (no cut frames exist).

## Study log
id phone-side-swap-spin-lines · family mobile-app · 5.00 s, 5 rows, 0 cuts (one continuous shot)
techniques 4 (device-phone, device-3d, statement-sequence, mask-wipe) · cut_on_beat n/a (no audio)
not measurable at 0.25 s: overshoot, spin direction/turns, phone exit, mask feather
proposed terms: device-spin, side-swap, trailing-wipe
missing components: SpinPhone, SideWipeText
difficulty hard (3D device), render_cost heavy
phase B: not run
