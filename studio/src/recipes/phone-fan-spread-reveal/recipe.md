# Phone screens fan out from one

One numbered phone screen holds centre, then four more slide out from behind it into a symmetric fan while the group eases back to 91 %. A 1.3 s reveal of several app screens that then holds still as a poster.

Source: https://jitter.video/template/mobile-screens-reveal/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Showing that an app has several screens or steps in one short shot
- A silent opener or loop tile for an app launch post
- Intro beat before a longer phone feature tour
- Placeholder layout to drop real screenshots into, numbered by order
Not for: telling a story or naming a feature (no copy beat, no camera travel); films longer than about 4 s on this shot alone, since the second half is a still.

## Format
other (1322×992, 4:3-ish) · 3.00 s · 30 fps · light · music none, cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–3.00 | 0–90 | hook | one numbered blue phone screen centred on flat light grey, then four more fan out behind it, two each side, smaller and lower | pull-out: group scale 1.00→0.91 from f9 to ~f40, then static | f0–8 single screen holds; f9 inner pair slides out from behind the centre, outer pair at f12 (stagger 3 fr); to ±17 % W and ±30 % W, scales 0.90 and 0.77; easings.outQuint ~31 fr, settle ~f40, no overshoot; hold f40–90 | hard-cut | swoosh-short at f9, tick at ~f40 (planned) |

Evidence: row 1 = sheet-01 cells 0–11 (0.00 single screen; 0.27 still single; 0.50 four edges peeking behind; 0.77 spread mostly out; 1.00–2.77 identical final fan), keyframes kf-000.50 / kf-001.50 / kf-002.50, 30 fps strips of 0–2 s (local, not kept). No cut frames: cuts.json has 0 hard, 0 soft, 0 flashes.

Working list (sheet-01):
- 0.00 · single screen, index 01, three short lines, centred, ~27 % W
- 0.27 · unchanged (strip: first motion at f9 = 0.30)
- 0.50 · four side screens visible as edges behind the centre, group shrinking
- 0.77 · inner pair and outer pair mostly spread, indexes 02 and 03 readable on the left
- 1.00 · final fan; no further change through 2.77 (motion.json diff 0.13 then 0.00)

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-phone | 1 | craft/vocabulary.md#ui (PhoneFrame, studio/API.md) |
| pull-out | 1 | craft/vocabulary.md#camera; scale 1.00→0.91 over 31 fr |

## Look
Palette: #E9E9E9 background, #F5F9F9 text (white), #3956F3 screen fill (accent), #354FDC screen bezel/edge, #C9CEDC shadow tone. Type: medium grotesk; two-digit index top-left of each screen (~9 % H on the centre screen), three one-word lines lower-left (~3 % H), sentence case, white. Treatment: none (flat bg, soft drop shadow under each screen, faint grid hairlines on the screen fill). Background: flat light grey.

## What to adapt
- Copy: none on the frame itself; each placeholder screen carries an index (01, 02, 03 mirrored on both sides) and up to 3 one-word lines. Replace with 5 real screenshots (centre = hero, inner pair = 2 secondary, outer pair = 2 tertiary), or 3 screens without the outer pair.
- Brand: brand accent fills the screens; brand bg as the backdrop; no logo in the shot (add an end card after it if needed).
- Timing: the hold before the spread (9 fr) and the spread (31 fr) keep their frame counts; only the final hold (50 fr) stretches or shrinks.

## Pitfalls
- Side screens emerge from behind the centre screen (z-order below it), not from off-screen; starting them off-frame turns it into a different, busier move.
- No overshoot and no rotation at 30 fps: a bouncy spring or a tilt makes the fan look like cards being dealt.
- The group pull-out (1.00→0.91) runs together with the spread; without it the outer screens run past 80 % W at 16:9.
- The second half is a still (motion.json diff 0.00 from 2 s): in a longer film cut away by ~f60 or add a slow push-in on the hold.

## Missing components
- PhoneFan: N screens (3 or 5) laid out as a symmetric fan behind a hero screen; per pair x offset (fraction of W), scale and y drop; spread from x=0 behind the hero, pair stagger 3 fr, easings.outQuint 31 fr; group scale 1.00→0.91 in the same window (techniques: device-phone, pull-out). PhoneFrame covers one screen; the fan layout is not in the studio.

## Proposed terms
- fan-spread: side items slide out from behind a centred hero item into a symmetric fan, scaled down by distance, z-order behind the hero; row 1 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0–2 s (start of the spread f9, outer pair f12); settle frame ~f40 ±3 fr (easing tail is soft, motion.json diff 0.13 in 1–2 s). Layout fractions measured on kf-002.50 (1322×992): centre screen 24 % W × 70 % H, inner pair scale 0.90 at ±17 % W, outer pair 0.77 at ±30 % W. Initial centre width 27 % W measured on sheet cell 0.00 (±1 %). Not measurable: the exact easing curve (outQuint picked as deceleration with a soft start from 4 frames of the strip, ±0.25 s on the tail). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no music, no cuts).

## Study log
- id phone-fan-spread-reveal · family mobile-app (hint 3d-device rejected: flat 2D layering, no 3D)
- 3.00 s, 1 row (0 cuts), other aspect 1322×992, 30 fps, light, silent
- techniques 2 (device-phone, pull-out); cut_on_beat n/a (0/0)
- measured at 1 fr from 30 fps strips: spread starts f9, pair stagger 3 fr, settle ~f40 ±3 fr; layout from keyframe at 2.50 s
- not measurable: exact easing curve (outQuint by shape)
- hint corrections: screens come from behind the centre, not off-screen; no overshoot visible
- proposed terms: fan-spread
- missing components: PhoneFan
- phase B: not run (study only)
