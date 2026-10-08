# Tilted send button pressed by a hand cursor

A corner of an empty prompt card, leaned in perspective, fills a vertical frame; a hand cursor glides onto the round send button, presses it with a squash and slides away. A 2.8 s loopable micro-moment.

Source: https://www.raylight.app/templates/ceZhGoMd (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A short vertical loop that teases "send" for an AI product without showing an answer.
- The press beat inside a longer AI film, right before a thinking or result row.
- Stories and reels where one tap is the whole message.
- Products whose main action is a single round button.
Not for: films that must explain what the product does; this shows no copy and no result.

## Format
9:16 · 2.83 s · 30 fps · light · music none, cut_on_beat n/a (0 cuts) · VO no · loopable (last frame = first frame)

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.47 | 0–14 | hook | bottom-right corner of an empty prompt card, leaned in perspective and cropped by the frame; green round send button with an up arrow | tilt-plane, fixed (no pan or zoom: motion.json 0.03 %/s) | nothing moves; card and soft drop shadow hold | hard-cut | none |
| 2 | 0.47–1.83 | 14–55 | feature | hand pointer cursor enters from the lower right edge, lands on the lower half of the button, presses it | tilt-plane, fixed | path f14 → f20, `springs.ui` (no overshoot seen at 1 fr); rest f20–f30; press f31–f37: cursor 1 → ~0.7 → 1, button dips ~0.9 with it, `springs.click` 6 fr; rests to f55 | hard-cut | `tick` on f31 (planned) |
| 3 | 1.83–2.83 | 55–85 | feature | cursor slides out past the lower left of the card; idle card holds, identical to frame 0 | tilt-plane, fixed | exit f55 → f62 down-left, `easings.inExpo` 7 fr; still hold 23 fr for the loop seam | hard-cut | none |

Evidence: row 1 `sheet-01` cells 0.00, 0.27 (no cursor), strip f0–f13; row 2 cells 0.50 (cursor entering below the button), 0.77–1.77 (cursor on the button), keyframe `kf-001.50.jpg`, strip f14–f54 (squash smallest f33–f34); row 3 cells 2.00 (cursor below-left of the card), 2.27–2.77 (empty, same as 0.00), strip f55–f84. No cut frames exist (cuts.json: 0 hard, 0 soft).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| tilt-plane | 1–3 | craft/03-camera-and-staging.md (TiltPlane) |
| cursor-path | 2–3 | craft/04-motion.md#springs (`click`), studio Cursor |

## Look
Palette: `#FFFFFF` background and card, `#EFEFEF` input well, `#37B853` send button (accent), `#C0C1C0` hairline borders, `#E2E2E2` drop shadow. Type: none; a white up arrow on the button is the only glyph. Treatment: none. Background: flat white with a large soft shadow under the card.

## What to adapt
- Copy: none required. An optional placeholder can sit in the input well; the reference keeps it empty.
- Brand: the accent colour goes on the send button only; the arrow stays white. Card and well use bg and a light surface.
- Timing: the hold before the cursor (14 fr) and the final hold (23 fr) can stretch; keep the press at 6 fr and the exit at 7 fr.
- Tilt: crop so only the card's corner and the button are in frame; the button sits right of centre, at ~55 % of frame height.

## Pitfalls
- The button never changes colour and there is no ripple ring: set `ripple=false` on Cursor or the look gets busy.
- The cursor must leave and the last frame must equal frame 0, or the loop jumps.
- The press is small (button ~10 %); a big squash reads as a cartoon.
- Do not type a prompt: the hint mentioned typing, but the well stays empty the whole film.

## Missing components
none (TiltPlane holds a rebuilt card; Cursor with `kind: 'pointer'`, click keyframe at f31)

## Proposed terms
none

## Measurement notes
Resolution: 1 fr from a 30 fps strip of the local source (f0–f84). Not measurable: exact tilt angles (estimated from the leaning edges, not computed), spring overshoot of the cursor path below 1 px at strip scale. SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts (no music, no cuts). Palette from palettegen on kf-000.50 and kf-001.50 plus pixel samples.

## Study log
id tilted-send-button-cursor-press · family ai-chat · 2.83 s, 3 rows, 1 shot, loopable
techniques 2 (tilt-plane, cursor-path) · cut_on_beat n/a (silent, 0 cuts)
measured at 1 fr: cursor in f14, lands f20, press f31–f37, out f55–f62, hold to f85
not measurable: plane tilt angles in degrees
catalogue hint prompt-typing not seen (empty input well), dropped
proposed terms: none · missing components: none
phase B: not run
