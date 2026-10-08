# Spinning phone sweeps two statements

On white, a phone showing a call screen spins a full turn while it crosses the frame; its pass wipes one short line away and draws the next in behind it. Two lines, two sweeps, the phone grows each time, then a clean exit to white.

Source: https://www.raylight.app/templates/k1Lo4TYA (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A phone-first product with one hero screen, told as setup line then answer line.
- A 5 s silent social loop, or the opener of a longer app film.
- Light, minimal brands where the device itself is the only motion.
Not for: products with no single phone screen worth showing, or messages that need more than two short lines.

## Format
16:9 · 5.00 s · 30 fps · light · loopable · music none (no audio track), cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.60 | 0–18 | hook | empty white; phone with a call screen fades in front-facing at x 0.72 W, 44 % H | locked; phone creeps left 0.72 → 0.61 W from f12 | opacity 0 → 1 f3 → f14, easings.outQuint 11 fr | hard-cut | none |
| 2 | 0.60–1.00 | 18–30 | hook | phone spins one full turn (front, edge, back, edge, front) crossing to the left third; line one (3 words, the situation) appears on the right | locked; phone 44 → 56 % H, x 0.61 → 0.23 W | yaw 0 → 360° f18 → f30, easings.inOutSine 12 fr; line revealed right-to-left by a mask whose edge trails the phone | hard-cut | whoosh |
| 3 | 1.00–1.80 | 30–54 | hook | phone front-facing in the left third, line one held right | locked; phone 56 → 67 % H, x 0.24 → 0.19 W | scale creep easings.linear 24 fr; slight yaw toward camera (±0.25 s); text static 24 fr | mask-wipe | none |
| 4 | 1.80–2.50 | 54–75 | feature | second full spin crossing to the right third; line one wipes out, line two (4 words, the product's answer) wipes in on the left | locked; phone 67 → 79 % H, x 0.20 → 0.72 W | yaw 0 → 360° f55 → f71, easings.inOutSine 16 fr; travel easings.inOutSine f54 → f80; line one erased left-to-right f57 → f68, line two revealed left-to-right f59 → f72, both edges follow the phone | hard-cut | whoosh |
| 5 | 2.50–3.40 | 75–102 | feature | phone front-facing in the right third, line two held left (left edge 0.07 W) | locked; travel tail settles by f80, then ~6 px/s drift | hold 22 fr | mask-wipe | none |
| 6 | 3.40–4.00 | 102–120 | feature | line two wipes away from its left end; phone stays, then is gone in one frame | locked | line two erased left-to-right f101 → f114, easings.outQuint 13 fr; phone removed at f120, no exit animation | hard-cut | swoosh-short |
| 7 | 4.00–5.00 | 120–150 | feature | empty white, equal to frame 0 | static | none, 30 fr of white | hard-cut | none |

Evidence per row: 1 `sheet-01 cells 0–2`, strip 0.00 (frames 0–17); 2 `sheet-01 cells 2–4`, strip 0.00 (frames 18–29); 3 `sheet-01 cells 4–7`, strip 1.80 row 1; 4 `sheet-01 cells 7–10`, strip 1.80 rows 1–4; 5 `sheet-01 cells 10–13`, strip 1.80 rows 4–5; 6 `sheet-01 cells 13–15`, strip 3.40 rows 1–3; 7 `sheet-02 cells 0–3`, strip 3.40 (white after frame 18). No cut frames exist (cuts.json is empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| statement-sequence | 2–6 | craft/05#statement-sequence, craft/families/statement.md |
| device-phone | 1–6 | craft/vocabulary.md#ui (PhoneFrame) |
| device-3d | 2, 4 | craft/vocabulary.md#3d (the back of the phone faces camera mid-spin) |
| mask-wipe | 2, 4, 6 | craft/09-transitions.md#mask-wipe |

## Look
Palette: #FFFFFF background, #030303 text and phone frame, #A6877F screen photo accent, #DED9D6 phone body light grey, #4D4742 dark metal. Red end-call button on the screen (not sampled as a palette entry). Type: semibold geometric grotesk, title case, normal tracking, ~6.5 % H, one line at ~47 % H. Treatment: none. Background: flat white.

## What to adapt
- Copy: 2 lines, one line each at 16:9; line one ~3 words naming the situation, line two ~4 words giving the product's answer.
- Brand: the screen on the phone carries the brand (one screenshot); background and type stay neutral. No logo in the reference; add an end card only after row 7 if needed (breaks the loop).
- Timing: the holds (rows 3 and 5) can stretch for longer lines; keep the spins at 12 and 16 fr and keep the mask edges glued to the phone x.

## Pitfalls
- The mask edge must follow the phone; a wipe that runs on its own timing reads as two unrelated animations.
- Type never scales while the phone grows 44 → 79 % H; scaling the text too kills the depth illusion.
- The back of the phone is visible for ~5 fr per spin: a flat card flip shows a blank back. Needs a back face (camera block) or a 3D model.
- The phone disappears in one frame at f120; a fade there looks unfinished against the clean wipe.

## Missing components
- PhoneSpin: PhoneFrame with a back face, yaw 0 → 360° over 12–16 fr while translating 0.4–0.5 W and scaling +20 %, exposes its x per frame for masks (techniques: device-phone, device-3d).
- TrailMaskText: one-line text whose visible span is clipped by a moving vertical edge (input: edge x per frame, direction), for reveal and erase (techniques: mask-wipe, statement-sequence).

## Proposed terms
- device-sweep-wipe: a device crossing the frame acts as the wipe edge that erases one line and reveals the next (rows 2, 4, 6). Not in craft/vocabulary.md; not used in recipe.json.

## Measurement notes
Resolution: 1 fr from local 30 fps strips at t = 0.00, 1.80, 3.40 (1 s each); 0.25 s from sheets elsewhere (rows 3 and 5 holds, the yaw of row 3). Not measurable: exact spring overshoot of the travel (none visible, inOutSine chosen), phone sizes ±2 % H from sheet cells. Palette from keyframes kf-001.50, kf-002.50, kf-003.50 (no cut frames). SFX planned by the glue rule, not measured (no audio). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
id phone-spin-wipe-statement · family mobile-app · 5.00 s, 7 rows, 0 cuts.
Techniques: 4 (statement-sequence, device-phone, device-3d, mask-wipe). cut_on_beat: n/a, 0/0, no audio.
Measured from 30 fps strips: spin 1 f18–f30, spin 2 f55–f71, wipes f57–f72 and f101–f114, phone removed f120.
Not measurable: travel overshoot, row 3 yaw (±0.25 s).
Proposed terms: device-sweep-wipe. Missing components: PhoneSpin, TrailMaskText.
difficulty hard, render_cost heavy (device-3d). phase B: not run.
