# Tinted-panel phone close-ups, icon then wordmark

A light phone leaned back in perspective, five shallow-focus close-ups, each screen on its own slanted pastel panel and drifting slowly. Hard cuts between screens, then a quiet close: icon alone, then wordmark alone, on white.

Source: https://www.raylight.app/templates/LW7AUjzw (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A mobile app with four or five distinct screens and a calm, clean brand.
- Silent autoplay feeds where each screen must read on its own for about 3.5 s.
- Showing breadth (account, onboarding, support, main screen) without a narrative or VO.
- A pastel colour per screen is wanted to separate features.
Not for: products that need to show an interaction (taps, typing): nothing on screen animates, only the camera moves.

## Format
16:9 · 28.5 s · 30 fps · light · music none (silent reference), cut_on_beat n/a (no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–4.23 | 0–127 | hook | phone leaned back, top third in frame, on a slanted lilac panel; 2-line claim above (3 + 7 words, trailing words grey) | dolly left ~84 px/s at 1920 (2.8 px/fr) + push-in 1.00→~1.07 | fade up from white 6 fr, easings.outQuint (30 fps strip); tilt-plane focus band on the phone top | hard-cut | none |
| 2 | 4.23–7.50 | 127–225 | feature | macro on the account screen: blue header, avatar with a membership badge, email line, status card; green panel edge left | push-in decelerating 3.9→1.6→0.8 %/s, content rises ~30 px/s | no element animation at 4 fps; focus on badge and email | hard-cut | hit (planned) |
| 3 | 7.50–11.20 | 225–336 | feature | guest screen: grey gradient, pale avatar, short status line, sign-in button; slanted green panel left | dolly left ~45 px/s at 1920 (1.5 px/fr), scale constant | camera only; left half soft white blur | hard-cut | hit (planned) |
| 4 | 11.20–14.70 | 336–441 | feature | support screen: title, blue band with a chat pill and a sender row; slanted tan panel with a cropped 2-line claim at the top edge | dolly up-right ~30 px/s + push-in 0.9→3.3 %/s, accelerating into the cut | camera only; focus on the title | hard-cut | hit (planned) |
| 5 | 14.70–18.90 | 441–567 | proof | main screen: header with mark and name, up/down speed readouts, concentric rings; aqua panel left | near hold, pull ~0.5 %/s (1.00→~0.98) | none visible at 4 fps | continuous | none |
| 6 | 18.90–23.03 | 567–691 | proof | extreme close-up of the phone's left edge: corner of a readout and the rings, frame mostly aqua glow on white | drift right ~55 px/s at 1920 (from cell positions) | picture jumps at 18.90 (cuts.json near miss 4.39, not a listed cut); then drift only | continuous | none |
| 7 | 23.03–25.53 | 691–766 | logo | app icon alone, small blue rounded square (~7 % of width), centred on white | static | appears in one frame (30 fps strip, cuts.json near miss 4.31); holds 75 fr | continuous | swell (planned) |
| 8 | 25.53–28.50 | 766–855 | logo | wordmark alone, black, ~16 % of width, centred on white | static | replaces the icon in one frame (30 fps strip at 25.4); holds 89 fr | end | tick (planned) |

Evidence per row:
1. `sheet-01` cells 0–15, `sheet-02` cell 0; strip at t = 0 (fade: blank frame 0, faint frames 1–6); `cuts/cut-004.23.jpg` before side.
2. `sheet-02` cells 1–9 (4.27–6.50 push), cells 10–13 (6.50–7.27 settle); `cuts/cut-004.23.jpg` after, `cuts/cut-007.50.jpg` before.
3. `sheet-02` cells 14–15, `sheet-03` cells 0–12; `cuts/cut-007.50.jpg` after, `cuts/cut-011.20.jpg` before.
4. `sheet-03` cells 13–15, `sheet-04` cells 0–10; `cuts/cut-011.20.jpg` after, `cuts/cut-014.70.jpg` before.
5. `sheet-04` cells 11–15, `sheet-05` cells 0–11 (18.77 last frame of the screen); `cuts/cut-014.70.jpg` after; strip at 18.5.
6. `sheet-05` cells 12–15 (19.00 first close-up cell), `sheet-06` cells 0–12; strip at 18.5 row 3 (change at frame 567).
7. `sheet-06` cells 13–15, `sheet-07` cells 0–6; strip at 23.0 (frame 691 first icon frame).
8. `sheet-07` cells 7–15, `sheet-08` cells 0–1; strip at 25.4 (wordmark from frame ~766).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-phone | 1–6 | craft/vocabulary.md#ui, PhoneFrame |
| tilt-plane | 1–6 | craft/03-camera-and-staging.md, TiltPlane (dof, perspective) |
| ui-rebuild | 1–6 | craft/vocabulary.md#ui (screens must stay sharp at macro scale) |
| push-in | 1, 2, 4 | craft/03-camera-and-staging.md#drift-and-push-in |
| dolly | 1, 3, 4, 6 | craft/03-camera-and-staging.md, Dolly |
| hard-cut | 1–4 (out) | craft/09-transitions.md |

## Look
Palette: `#FFFFFF` background, `#101010` wordmark and headline, `#037DF3` UI accent and icon, `#D1C7F9` lilac panel (row 1), `#CBD7CA` green panel (rows 2–3), `#C8DEE7` aqua panel (rows 5–6); tan panel of row 4 about `#E3DEDC`. Type: rounded geometric sans, medium, sentence case, 2 lines at ~5 % of H; wordmark bold grotesk ~3 % of H. Treatment: none (no grain, no vignette; soft defocus is optical, not a look id). Background: white with one slanted pastel plane behind the phone per shot, fading to white toward the edges.

## What to adapt
- Copy: one 2-line claim on shot 1 (first line 2–3 short words, second line ~7 words); every other shot is pure UI, no captions.
- Brand: accent drives the UI (header, links, icon tile); one pastel per screen; mark tile then wordmark at the end on white.
- Timing: screen shots stretch 3.3–4.2 s each; the icon (75 fr) and wordmark (89 fr) holds keep their length; keep the cuts hard.

## Pitfalls
- Focus band: everything outside one strip of the phone is blurred; without dof the close-ups read as flat screenshots.
- Motion is all camera: speeds are small (1.5–2.8 px/fr at 1920). Faster moves break the calm read.
- Rows 6–8 change picture without a listed cut; rebuild them as instant swaps, not crossfades (strips show one-frame changes).
- Row 6 is mostly empty aqua glow for 4 s: in our version keep it shorter or put UI detail in it; it reads as dead air.

## Missing components
- SlantPanel: a pastel rounded plane behind the phone, rotated ~12° from vertical, fading to white at the right and bottom edges, one colour per shot (techniques: tilt-plane).

## Proposed terms
- panel-tint-per-shot: each phone shot sits on its own slanted pastel plane, colour changes per feature (rows 1–6) (not in craft/vocabulary.md; not used in recipe.json).
- instant-swap: in-place replace of one element by another in one frame on a still background (rows 7–8) (not in craft/vocabulary.md; not used in recipe.json).

## Measurement notes
Resolution: 0.25 s from sheets; 1 fr from 30 fps strips at t = 0, 18.5, 23.0, 25.4. Not measurable: dof amounts, perspective angles in degrees (tilt estimated by eye, ~12° slant of the panel), exact camera easing (motion.json per-second values only); roll values in motion.json not checked. Speeds in px/s and %/s are motion.json estimates normalized to 1920 wide, except row 6 (from sheet cell positions). SFX planned by the glue rule, not measured (reference silent). cut_on_beat = 0/4 cuts within ±2 fr (no beats in audio.json).

## Study log
- id tinted-panel-phone-screen-tour · family mobile-app · 28.5 s · 8 rows (4 hard cuts + 2 near-miss picture changes + 1 in-place swap).
- techniques 6 (device-phone, tilt-plane, ui-rebuild, push-in, dolly, hard-cut) · cut_on_beat false (silent, 0/4).
- Not measurable: dof strength, tilt degrees, camera easing below 1 s; roll from motion.json unchecked.
- Proposed terms: panel-tint-per-shot, instant-swap. Missing components: SlantPanel.
- Phase B: not run.
