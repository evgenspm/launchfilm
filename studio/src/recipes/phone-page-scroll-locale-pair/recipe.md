# Tilted phone page scroll with a twin-locale pair

A realistic phone rises out of black and tilts while a mobile landing page scrolls on its screen; a low-angle pass over the article list, then two phones (two languages) cycle cards in sync before a logo, tagline and URL end card.

Source: https://www.raylight.app/templates/6WR3EFVf (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- Showing that a marketing site or web app works on mobile, top to bottom
- A vertical feed film for an agency or service business with no product UI beyond its pages
- Proving a second language or right-to-left version ships with the same layout
- Silent autoplay where the scrolling page carries the story
Not for: products whose value is an interaction (the page only scrolls, one tap in the whole film); horizontal formats (the phone fills a 9:16 frame).

## Format
9:16 · 29.8 s · 30 fps · dark · music none (no audio track), cut_on_beat n/a · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.77 | 0–53 | hook | small phone on black grows to fill the frame; screen shows the page hero (mark, headline, space-photo band) | push-in, phone scale ~0.25 → 1.0 by 0.77 s, then hold | springs.cameraIn ~23 fr (overshoot not measurable); scroll starts 1.00, easings.inOutSine (±0.25 s) | hard-cut | whoosh |
| 2 | 1.77–5.00 | 53–150 | feature | page scrolls through about text, case-study image, services card, partner logos, testimonial card | orbit: yaw ~0 → 25° and lean back from 2.77; drifts up-right; exits top-right 4.77 → 5.00 | scroll ~1 screen / 0.75 s, easings.linear; tilt easings.inOutSine ~60 fr; exit easings.inExpo ~7 fr (±0.25 s) | hard-cut | |
| 3 | 5.00–7.00 | 150–210 | feature | phone drops back in from the top edge, small and tilted; camera closes on the upper screen; icon rail slides out from the left edge and folds | push-in 0.35 → 1.6 (screen width) 5.27 → 6.50, springs.cameraIn | entry easings.outExpo ~8 fr (±0.25 s); rail of 6 round icons expands 6.27 → 6.50 springs.ui, collapses by 7.00 | hard-cut | |
| 4 | 7.00–8.77 | 210–263 | feature | hero close-up; floating chat button pulses, is tapped, assistant chat panel opens (one greeting bubble, input) | static close-up, tilts back from 8.77 | glow pulse 7.50 → 8.00; panel scales from the button springs.ui ~8 fr (±0.25 s) at 8.27; holds 15 fr | hard-cut | ui-confirm |
| 5 | 8.77–10.00 | 263–300 | feature | low angle behind the phone's bottom edge: grille and port in the foreground, screen recedes as a steep plane | orbit down ~60° 8.77 → 9.27, easings.inOutSine ~15 fr (±0.25 s); slow dolly toward the edge | scroll from hero into the article list, easings.linear; far screen blurred | hard-cut | |
| 6 | 10.00–13.23 | 300–397 | feature | article cards (image, date, bold italic title, summary) stream up the steep plane; phone edge sinks out of frame | tilt-plane rotateX ~70°, push ~65 %/s (motion.json) | scroll ~1 card / 0.5 s, easings.linear; near sharp, far blurred | hard-cut | |
| 7 | 13.23–15.00 | 397–450 | feature | same low-angle scroll, two more cards; the last image dims to black | tilt-plane, push stops 14.00 | scroll easings.linear; fade to black 14.50 → 15.00 ~15 fr (±0.25 s) | smash-cut-black | |
| 8 | 15.00–19.00 | 450–570 | feature | two phones, left-to-right and right-to-left versions of the services section, staggered diagonally; service card cycles in sync, 4 swaps | drift: pair rises 15.27 → 15.77, slow yaw ~10°; 18.77 both turn frontal and split (one up, one down) | rise springs.heavy ~15 fr; card swap every ~0.75 s (16.27, 17.00, 17.77, 18.50), springs.ui; exit 18.77 → 19.27 easings.inExpo | hard-cut | tick |
| 9 | 19.00–21.77 | 570–653 | logo | mark with wordmark fades up at centre, then shrinks and wanders down-right, far left, back toward centre | static | fade 19.27 → 19.77 easings.outQuint ~15 fr; scale 1.0 → 0.55 by 20.27; drift ~0.25 W / 0.5 s easings.inOutSine (±0.25 s) | hard-cut | |
| 10 | 21.77–22.77 | 653–683 | logo | tagline, 3 words, white with soft glow, next to the small mark; both slide left; black | static | on at 21.77 (entrance not measurable); slides ~0.3 W by 22.00, gone by 22.27; 15 fr black | smash-cut-black | |
| 11 | 22.77–24.83 | 683–745 | logo | end card: thick glowing accent frame shaped like a phone screen; mark drops in large, settles upper half; URL typed below | static | frame cuts in 22.77; mark 1.4 → 1.0 23.27 → 23.50 springs.snappy (overshoot not measurable); URL typed 23.27 → 24.00, 22 fr; holds 24 fr | smash-cut-black | type-click |
| 12 | 24.83–29.80 | 745–894 | outro | black | static | none, 149 fr | hard-cut | |

Evidence per row: 1 `sheet-01 cells 0–7`; 2 `sheet-01 cells 7–15`, `sheet-02 cells 0–4`; 3 `sheet-02 cells 4–11`; 4 `sheet-02 cells 12–15`, `sheet-03 cells 0–3`; 5 `sheet-03 cells 3–7`; 6 `sheet-03 cells 8–15`, `sheet-04 cells 0–4`, `cuts/cut-013.23.jpg`; 7 `sheet-04 cells 5–11`; 8 `sheet-04 cells 12–15`, `sheet-05 cells 0–12`; 9 `sheet-05 cells 13–15`, `sheet-06 cells 0–6`; 10 `sheet-06 cells 7–10`; 11 `sheet-06 cells 11–15`, `sheet-07 cells 0–3`, `cuts/cut-024.83.jpg`; 12 `sheet-07 cells 4–15`, `sheet-08 cells 0–7`.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-phone | 1–8 | craft/vocabulary.md#ui, PhoneFrame |
| device-3d | 2, 5–7 | craft/vocabulary.md#3d (phone with thickness, grille, port) |
| tilt-plane | 5–7 | craft/vocabulary.md#camera, TiltPlane |
| orbit | 2, 5 | craft/vocabulary.md#camera |
| push-in | 1, 3, 6 | craft/vocabulary.md#camera, Camera |
| end-card | 11 | craft/vocabulary.md#brand, EndCard |
| smash-cut-black | 7, 10, 11 | craft/vocabulary.md#transitions |
| glow | 4, 10, 11 | craft/vocabulary.md#look, Bloom |

## Look
Palette: #000000 background, #C8DBEF light page text, #3CB3AA accent (buttons, frame, wordmark), #588D81 muted accent, #3B3D41 mark grey, #181818 page card surface. Type: page type is the site's own geometric sans; end tagline bold sans title case ~2.5 % H with white glow; URL bold sans lowercase ~2 % H. Treatment: glow. Background: flat black, no gradient.

## What to adapt
- Copy: 1 tagline of 3 words, 1 URL; all other text lives in the page screenshots.
- Brand: accent carries the floating buttons, the end-card frame and the wordmark's first letters; logo in rows 9 and 11.
- Timing: rows 2 and 6 stretch with page length; rows 8 swaps keep a ~22 fr period; row 12 black tail is optional.

## Pitfalls
- The page must be a real tall mobile capture; a desktop screenshot squeezed into the phone breaks the "responsive" claim.
- Row 5 needs real phone geometry (edge, grille, port); a flat frame tilted 60° shows a paper-thin card.
- The 13.23 cut sits inside a continuous scroll: match scroll position across it or it jumps.
- The twin phones must swap cards on the same frame, otherwise the pair reads as two unrelated screens.

## Missing components
- PhoneModel3D: phone body with depth ~8 % of width, rounded metal edge, bottom grille and port, screen texture slot, rotateX up to 70° and yaw ±30° (techniques: device-3d, tilt-plane)
- ScrollingScreen: tall image inside a device screen, scroll offset by keyframes in screens/s, easings.linear default (techniques: device-phone)
- GlowFrame: screen-shaped rounded rect stroke ~3 % W in accent with outer glow ~6 % W, for the end card (techniques: end-card, glow)

## Proposed terms
- page-scroll-in-device: a full web page scrolls inside a device screen as the film's spine (rows 1–7) (not in craft/vocabulary.md; not used in recipe.json)
- locale-twin: two devices show the same section in two languages or directions, animating in sync (row 8)
- edge-rail-expand: a vertical rail of round icon buttons slides out from a screen edge and folds back (row 3)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips taken. Not measurable: entrance overshoot of the phone, the panel and the end-card mark; exact scroll speed per frame; tagline entrance. Angles (yaw, rotateX) estimated from the sheets by eye. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/2 cuts within ±2 fr (no beats).

## Study log
id phone-page-scroll-locale-pair · family mobile-app · 29.80 s, 12 rows (2 hard cuts at 13.23 and 24.83, rest split at state changes).
techniques: 8 (device-phone, device-3d, tilt-plane, orbit, push-in, end-card, smash-cut-black, glow).
audio: none; cut_on_beat false (0/2, no beats). sfx planned only.
not measurable at 0.25 s: overshoots, scroll px/fr, tagline entrance; angles by eye.
proposed terms: page-scroll-in-device, locale-twin, edge-rail-expand.
missing components: PhoneModel3D, ScrollingScreen, GlowFrame.
difficulty hard (device-3d), render_cost heavy (3d id).
phase B: not run.
