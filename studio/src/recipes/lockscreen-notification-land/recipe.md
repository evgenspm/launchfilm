# Lock screen notifications landing from the camera

A phone drops into a dark frame lit by a blue planet rim, settles on its lock screen, then two glass notifications arrive one at a time: the first lands from the viewer, the second takes the top slot after a push-down.

Source: https://www.raylight.app/templates/doUCRX5o (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A mobile product whose value is a timely alert or message (follows, messages, reminders).
- Showing what the user receives, one event at a time, each fully readable before the next.
- A short silent loop for a feed or a landing-page hero.
- The opening shot before a longer app walkthrough.
Not for: desktop-only products (use the desktop banner variant), or stories that need more than 2-3 events (the holds get long).

## Format
16:9 · 11.93 s · 30 fps · dark · no music (silent reference), cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.60 | 0–78 | hook | black, blue planet rim bottom-left; phone descends from above the top edge, wallpaper swaps night to sunset | frame static; device travels ~1000 px/s then ~470 px/s (1920 basis), rotateX ~5° easing to 0 | phone enters bottom-first on springs.heavy (overshoot not measurable), settles f78; in-screen cross-dissolve 1.77–2.27 s (±0.25 s) | hard-cut | swoosh-short |
| 2 | 2.60–3.70 | 78–111 | reveal | lock screen settled: status bar, date line, huge clock over sunset wallpaper | drift: rim arc sweeps, phone holds | hold 33 fr; backdrop arc easings.linear | hard-cut | none |
| 3 | 3.70–5.30 | 111–159 | feature | first glass card lands in the top slot: avatar + app badge, name title, one-line body | drift: rim arc | land: scale 1.47→1, offset up-left ¼ card width, opacity 0.3→1, blur 8 px→0, easings.landing 7 fr (f111–f118); hold 41 fr | hard-cut | notification |
| 4 | 5.30–6.10 | 159–183 | feature | first card pushed down one slot; second card (message preview) fills the top slot | drift: rim arc | push-down card height + 8 px gap, springs.layout 10–11 fr (f159–f170); second card fade + blur-in, scale 1.03→1, opacity 0.15→1, 6 fr (f176–f182) | hard-cut | notification |
| 5 | 6.10–8.00 | 183–240 | feature | two-card stack held; blue light band starts sweeping top right | drift: arc slides toward top right, phone static | hold 57 fr; backdrop easings.linear | hard-cut | none |
| 6 | 8.00–11.93 | 240–358 | feature | same stack; lit rim crosses the whole top right behind the phone | drift: rim grows ~3 %/s at 8–9 s, ~7 %/s in the last second (motion.json) | hold 118 fr to the end, backdrop only | hard-cut | none |

Evidence per row: 1 = sheet-01 cells 0–9 (0.00–2.27); 2 = sheet-01 cells 10–14 (2.50–3.50); 3 = sheet-01 cell 15 (3.77, card mid-landing, enlarged and translucent) + sheet-02 cells 0–4; 4 = sheet-02 cells 5–8 (5.27 push starts, 5.77 card one slot lower, 6.00 second card half-transparent); 5 = sheet-02 cells 9–15; 6 = sheet-03 cells 0–15. No cut frames (cuts.json empty). Frame-exact numbers in rows 3–4 come from the hand-measured 30 fps notes.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| notification-stack | 3–6 | craft/04-motion.md (easings.landing, springs.layout), presets NotificationStack entrance 'land' |
| device-phone | 1–6 | craft/13-ui-recreation.md, PhoneFrame |
| ui-rebuild | 2–6 | craft/13-ui-recreation.md (lock screen + cards rebuilt) |
| horizon-arc | 1–6 | HorizonArc (lit planet rim, slow travel) |

## Look
Palette: #000201 background black, #F6F5F3 clock / card text light, #2A4073 rim blue (accent), #E0B995 sunset warm, #091732 deep navy, #535B81 dusk violet. Type: condensed ultra-tall white clock numerals ~40 % of phone height; cards semibold title + regular body, sentence case. Treatment: none visible (no grain). Background: black with a lit planet rim (footage-like gradient), phone wallpaper is a photo.

## What to adapt
- Copy: 2 notifications, each a title (2–3 words, a sender or app) and a body (one line, 3–5 words); a clock string.
- Brand: the app icon is the card badge; the brand accent tints the rim light; the wallpaper can be a brand gradient instead of a photo.
- Timing: rows 1, 3, 4 keep their frame counts (entrance, 7 fr land, 10–11 fr push, 6 fr fill); holds in rows 2, 5, 6 stretch or shrink freely.

## Pitfalls
- The landing is 7 fr from scale 1.47: slower and it reads as a zoom, not an arrival from the viewer.
- No overshoot on the push-down (layout reflow never bounces).
- The second card lags the push by ~17 fr, which reads mechanical; overlapping it at ~60 % of the push is smoother.
- The backdrop must keep moving through the 118 fr end hold, or the last 4 s are dead frames.
- Glass must keep the wallpaper colour (backdrop blur with saturation), or cards look like flat grey boxes.

## Missing components
- PhoneDropIn: phone enters from above the top edge bottom-first with rotateX ~5° to 0, settles in ~78 fr on springs.heavy, cropped at the frame bottom (techniques: device-phone)
- LockScreen: status bar, date line, condensed clock ~40 % of screen height, wallpaper with an optional in-screen cross-dissolve between two images (techniques: ui-rebuild)

## Proposed terms
- device-drop-in: device travels into frame from off-edge and settles, the move is the reveal (row 1) (not in craft/vocabulary.md; not used in recipe.json)
- screen-crossfade: wallpaper/content cross-dissolve inside a device screen while the device moves (row 1) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; 1 fr for the landing (3.6–4.2 s) and push/fill (5.3–6.1 s) from hand-measured 30 fps notes. Not measurable: phone entrance overshoot, exact rim arc speed (motion.json estimate only), wallpaper dissolve length (±0.25 s). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats). Palette from palettegen on keyframes at 0.5, 5.5, 10.5 s (no cut frames exist).

## Study log
id lockscreen-notification-land · family product-ui · 11.93 s, 1 shot, 6 rows (split at state changes) · 4 techniques
cut_on_beat: n/a (0 cuts, silent) · theme dark · difficulty medium · render_cost medium (glass backdrop blur)
Unmeasurable: phone entrance overshoot, wallpaper dissolve length (±0.25 s), rim arc speed (estimate)
Proposed terms: device-drop-in, screen-crossfade
Missing components: PhoneDropIn, LockScreen
Phase B: not run (study phase only)
