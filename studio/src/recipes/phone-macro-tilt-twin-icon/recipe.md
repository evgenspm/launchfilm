# Phone macro glide, twin phones, icon to wordmark

One phone rises to fill a flat acid-lime frame, then the camera glides in macro over its balance chart and tab bar, slides up the screen on a tilted low angle, pulls back to two phones, and closes on the app icon and a lowercase wordmark.

Source: https://www.raylight.app/templates/quJS563Q (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A mobile finance or tracking app with one strong home screen (balance, chart, tab bar)
- Silent social or landing-page loop where the product UI is the whole story
- A brand with one loud flat colour that can carry every frame without type
- Pre-launch teaser: no copy lines, only screen, icon and name
Not for: products that need claims explained (there is no copy slot), desktop or web products, dark brands.

## Format
16:9 · 23.67 s · 30 fps · light · music none (silent reference), cut_on_beat n/a · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.50 | 0–15 | hook | one small phone, slightly turned, centred on flat lime; home screen | push-in 0.35 → 1.0 of a frame-filling phone in 15 fr | springs.cameraIn 15 fr (overshoot not measurable, ±0.25 s) | hard-cut | whoosh |
| 2 | 0.50–2.50 | 15–75 | feature | upper half of the phone: status bar, balance, 4 tabs, red day change, jagged pink line chart | drift: width +4 % over 60 fr, roll 0 → 2 deg | hold; scale creep easings.inOutSine 60 fr | hard-cut | |
| 3 | 2.50–4.77 | 75–143 | feature | closer on balance and chart; phone pushed off the left edge | push-in 1.0 → 1.35 over 68 fr, pan left (phone x 50 % → 30 %), roll to about -3 deg | easings.inOutSine 68 fr | hard-cut | |
| 4 | 4.77–6.27 | 143–188 | feature | phone swings out the top; its lower screen (card stack with badge, account card, tab bar) swings in and settles | whip tilt down the device: top exits by 5.00, bottom settles 5.50 (±0.25 s) | springs.heavy about 20 fr (overshoot not measurable); then drift 4 % | hard-cut | swoosh-short |
| 5 | 6.27–8.50 | 188–255 | feature | macro on the tab bar: active first tab large, unread dot on the fourth; travels to the last tab | push-in 1.0 → 2.2 in 8 fr (±0.25 s), dolly right about 20 px/fr @1920, 7.00–8.27 | springs.cameraIn, then easings.inOutSine 38 fr | hard-cut | |
| 6 | 8.50–9.23 | 255–277 | feature | pulled back to the whole lower screen with card, stack and tab bar | pull-out 2.2 → 1.0 in 8 fr (±0.25 s) | springs.cameraOut 8 fr; hold 14 fr | hard-cut | |
| 7 | 9.23–12.75 | 277–383 | feature | low angle on the phone's bottom edge (port, speakers), screen leaned far back; camera climbs up past tabs, cards, figure, to the chart | tilt-plane lean about 60 deg with depth of field; dolly up about 18 px/fr @1920; zoom +55 %/s then +40 %/s | easings.linear 105 fr; near edge sharp, far UI blurred | hard-cut | |
| 8 | 12.75–15.07 | 383–452 | feature | same tilted screen reaches the top: chart, balance, tabs, status bar, phone top edge against lime | dolly up decelerating 11 → 5 px/fr @1920; roll -2 deg | easings.outQuint 70 fr | hard-cut | |
| 9 | 15.07–18.75 | 452–563 | feature | two upright phones, offset: lower-left top of home screen, upper-right lower screen with cards and tab bar | static frame; phones drift up about 1 px/fr | slide up from below on springs.ui 13 fr (±0.25 s), right phone leads; easings.linear drift | hard-cut | whoosh |
| 10 | 18.75–19.27 | 563–578 | feature | both phones lean back and exit: left flies off the top, right drops off the bottom | static | easings.inExpo 15 fr (±0.25 s), opposite directions | hard-cut | |
| 11 | 19.27–20.77 | 578–623 | logo | app icon: small white rounded square with the brand mark, centred on lime, soft shadow | static | present in its first cell (entrance not measurable); holds 45 fr | hard-cut | pop |
| 12 | 20.77–23.67 | 623–710 | logo | icon replaced by a one-word lowercase wordmark, small, black on lime | static | swap within one cell (±0.25 s); holds 87 fr | hard-cut | ui-confirm |

Evidence per row:
1. sheet-01 cells 0–2
2. sheet-01 cells 2–10
3. sheet-01 cells 10–15, sheet-02 cells 0–3
4. sheet-02 cells 3–9
5. sheet-02 cells 9–15, sheet-03 cells 0–1
6. sheet-03 cells 2–4; cuts/cut-009.23.jpg (before)
7. sheet-03 cells 5–15, sheet-04 cells 0–2; cuts/cut-009.23.jpg (after)
8. sheet-04 cells 3–12; cuts/cut-015.07.jpg (before)
9. sheet-04 cells 13–15, sheet-05 cells 0–10; cuts/cut-015.07.jpg (after)
10. sheet-05 cells 11–12
11. sheet-05 cells 13–15, sheet-06 cells 0–2; keyframes/kf-019.50.jpg
12. sheet-06 cells 3–14

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-phone | 1–10 | craft/vocabulary.md#ui, PhoneFrame |
| ui-rebuild | 1–10 | craft/vocabulary.md#ui |
| push-in | 1, 3, 5 | craft/04-motion.md, Camera |
| pull-out | 6 | craft/vocabulary.md#camera |
| dolly | 5, 7, 8 | craft/vocabulary.md#camera |
| tilt-plane | 7, 8 | TiltPlane |
| device-3d | 4, 7, 10 | craft/vocabulary.md#3d |

## Look
Palette: #D5FD4F background lime, #FCFDFA screen white, #101010 device frame and wordmark, #2F312D UI text, #BA665B chart pink-red (blurred sample; in focus the line is a hot pink-red), #428CD1 accent blue (active tab, badge, icon mark; true value reads a saturated blue). Type: UI grotesk only inside the screen; close wordmark lowercase grotesk, regular, about 3 % H. Treatment: none. Background: flat colour, no gradient, no grain.

## What to adapt
- Copy: none on screen outside the UI. UI needs a balance figure, a day change line, 4 section tabs, one notification card (label + 2-line message + badge), a secondary figure, 5 bottom tabs.
- Brand: the flat background is the brand colour; accent goes on the active tab, badge and icon mark. Logo appears only in rows 11–12.
- Timing: rows 2, 7 and 9 stretch; rows 4, 5, 6 and 10 keep their frame counts (fast moves); the wordmark hold (row 12) can shorten to 60 fr.

## Pitfalls
- The macro rows (5, 7, 8) blow the UI up 2–4×: the screen must be a vector ui-rebuild, a screenshot pixelates.
- Row 7 shows the device's bottom edge in 3D; a flat PhoneFrame cannot show it. Without a 3D model start row 7 at the tab bar instead.
- Depth of field in rows 7–8 is strong: keep the near edge readable or the shot reads as an error.
- The chart never animates: do not add a draw-on, the camera move is the motion.

## Missing components
- PhoneModel3D: phone body with thickness, port and speaker holes, screen texture from a React UI, leaned 0–70 deg with depth of field (techniques: device-3d, tilt-plane)
- IconWordmarkSwap: centred app icon tile (about 15 % H, radius 22 %, soft shadow) replaced by the wordmark on a cut (techniques: proposed icon-wordmark-swap)

## Proposed terms
- icon-wordmark-swap: the app icon holds alone, then is replaced in place by the wordmark (rows 11–12) (not in craft/vocabulary.md; not used in recipe.json)
- macro-glide: extreme close camera travelling along UI at 2× or more (rows 5, 7, 8) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips extracted. Not measurable: overshoot of every spring, entrance of the icon, exact zoom factors in rows 5–6 (8 fr moves inside one cell), depth-of-field amount. Pan and zoom rates cross-checked with motion.json per-second estimates. SFX planned by the glue rule, not measured (the reference is silent). cut_on_beat = 0/2 cuts within ±2 fr (no beats; no music).

## Study log
id phone-macro-tilt-twin-icon · family mobile-app · 23.67 s, 12 rows from 3 shots (2 hard cuts, long shots split at state changes)
techniques 7 (device-phone, ui-rebuild, push-in, pull-out, dolly, tilt-plane, device-3d) · cut_on_beat n/a (silent, 0/2)
not measurable: spring overshoot, 8 fr camera snaps and the icon entrance at ±0.25 s; palette accents sampled from blurred frames
proposed terms: icon-wordmark-swap, macro-glide · missing components: PhoneModel3D, IconWordmarkSwap
difficulty hard (device-3d), render_cost heavy (device-3d) · phase B: not run
