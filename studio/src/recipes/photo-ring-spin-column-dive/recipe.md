# Photo ring spin and column dive

Portrait photos float on true black in 3D: first a ring of cards turns past the camera, then a hard cut drops into a deep column of cards. Each shot is one eased in-out move, so the parallax reads like a real camera.

Source: https://www.raylight.app/templates/LlVTdiKk (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A gallery, portfolio or image product whose pictures should carry the frame
- An interlude or opener between scenes of a longer film
- Silent autoplay where bright imagery on black must hold attention
- A looping hero background (one shot loops on itself)
Not for: dark UI screenshots without extra light (scale-only depth looks flat on dark cards); anything that needs a message, there is no text.

## Format
16:9 · 12.77 s · 30 fps · dark · no music (silent), cut_on_beat n/a (0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.50 | 0–45 | hook | ~8 portrait photo cards on a horizontal ring seen from slightly above; near row big and low, far row small and high | ring turn starts from rest: near row -3 px/0.1 s at 0.5 s, -9 at 1.0 s (human 30 fps study) | cards billboarded, no own animation; one easings.inOutSine move over the whole shot (192 fr) | continuous | none |
| 2 | 1.50–4.50 | 45–135 | hook | the ring turns fast: near cards slide out left, new cards come round from the right into the near row | peak: near row >= 800 px/s at 720p, far row opposite ~650 px/s (human 30 fps study); motion.json up to -779 px/s @1920 | same inOutSine move, peak 2.5–4.0 s; near/far speed ratio 1.3–1.7 | continuous | whoosh (planned) |
| 3 | 4.50–6.40 | 135–192 | hook | the ring slows and settles back into the opening arrangement | decelerates: -60, -27, -9, -2 px/0.1 s at 4.5/5.0/5.5/6.0 s (human 30 fps study) | tail of the inOutSine move, settled ~6.0 s (±0.25 s), ~12 fr near-still | hard-cut | none |
| 4 | 6.40–8.00 | 192–240 | hook | new layout: ~6 smaller cards scattered through a deep column, wide black gaps, some cropped by the frame edge | near still 6.40–7.00 s, then the camera sinks through the column | one inOutSine move over the shot (191 fr); cards start streaming up and right | continuous | swoosh-short (planned, on the cut) |
| 5 | 8.00–11.00 | 240–330 | hook | cards stream up-right past the camera; near cards grow and leave the top edge, new ones enter from below | peak 9–10 s: motion.json pan +668 / -931 px/s @1920, zoom +16.6 %/s | same inOutSine move; near cards ~0.45 H tall, far ~0.2 H | continuous | whoosh (planned) |
| 6 | 11.00–12.77 | 330–383 | hook | the column slows into the same layout it started from after the cut | decelerates to ~10 px/s in the last 0.77 s; settled ~12.5 s | tail of the inOutSine move, ~8 fr near-still (±0.25 s) | end | none |

Evidence per row:
1. sheet-01 cells 0–5 (0.00–1.27); kf-000.50
2. sheet-01 cells 6–15, sheet-02 cells 0–1 (1.50–4.27); kf-002.50, kf-003.50
3. sheet-02 cells 2–9 (4.50–6.27); cuts/cut-006.40.jpg (before side)
4. sheet-02 cells 10–15 (6.50–7.77, red CUT 6.40 label on cell 10); cuts/cut-006.40.jpg (after side)
5. sheet-03 cells 0–11 (8.00–10.77); kf-009.50
6. sheet-03 cells 12–15, sheet-04 cells 0–2 (11.00–12.50); kf-011.50

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| depth-field | 1–6 | craft/vocabulary.md#camera (DepthField), here with dof off |
| speed-ramp | 1–3, 4–6 | craft/vocabulary.md#camera; craft/04#easings inOutSine |
| hard-cut | 3 | craft/vocabulary.md#transitions |
| glow | 1–6 | craft/vocabulary.md#look (rim glint on card top edges, faint lighter centre) |

## Look
Palette: #030303 background, #0C0D0D background lift at centre, #253920 deep grass, #6A764C mid grass, #74AF8E sky-green, #B8E0DB pale sky (all from the photos; no UI colour). Type: none. Treatment: glow (white rim glint on top edges, thin blue fringe on some left edges). Background: flat near-black with a barely lighter centre.

## What to adapt
- Copy: none; the film has no text. Add a title over it only on a scrim.
- Brand: images are the content (8–12, portrait ~3:4, bright); the accent can tint the faint centre glow. No logo in the reference.
- Timing: each shot is one move; stretch a shot by changing its length, keep the inOutSine profile and the ~12 fr still at the ends.

## Pitfalls
- The move is not linear: ~0 at both ends, peak mid-shot. A constant-speed ring reads as a ticker.
- Near and far rows move in opposite directions from one projection; per-layer speeds look fake.
- No depth-of-field in the reference; it works because the photos are bright on black. Dark cards need extra light or dimming by depth.
- Cards are square-cornered with no border; a border kills the "panel of light" feel.

## Missing components
- PhotoCard lit: image card with square corners, top-edge white rim glint and optional 1 px blue fringe (FragmentCard has `lit` but no image variant) (techniques: glow)
- Ring layout for DepthField: items on a horizontal ring of ~10 slots seen from ~15° above, the ring rotates by an inOutSine angle over the shot (techniques: depth-field, speed-ramp)

## Proposed terms
- image-ring-spin: a ring of image cards turning around a hidden centre, seen from slightly above, near and far rows crossing in opposite directions (rows 1–3) (not in craft/vocabulary.md; not used in recipe.json; orbit-ring needs a core)

## Measurement notes
Resolution: 0.25 s from sheets; speeds and card sizes from the human 30 fps study and motion.json (1 s bins). Not measurable here: exact easing curve (inOutSine is the matching default), ring radius and tilt, card count beyond ~8–10. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/1 cuts within ±2 fr (no beats). loopable false: each shot ends on its own first frame, but the end of shot 2 does not match frame 0.

## Study log
id photo-ring-spin-column-dive · family transitions · 12.77 s, 6 rows, 1 hard cut at 6.40 s
techniques 4 (depth-field, speed-ramp, hard-cut, glow) · cut_on_beat n/a (silent, 0/1)
not measurable: easing curve below 0.25 s (inOutSine default), ring radius/tilt, exact card count
proposed terms: image-ring-spin
missing components: PhotoCard lit, ring layout for DepthField
difficulty hard (3D space), render_cost heavy (depth-field)
phase B: not run
