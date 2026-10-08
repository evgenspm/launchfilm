# Tilted picture wheel turning through a centred label

About 22 square images ride a vertical wheel seen side-on, scaled 4x from far to near, crossing in front of and behind one centred line of type on white. One slow, even turn per loop; the line blurs in and out word by word.

Source: https://www.raylight.app/templates/4h3tpK70 (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- a seamless loop for a gallery, template pack or asset library
- showing many images or outputs around one short claim
- a calm feature beat inside a longer film where depth comes from scale, not 3D
- muted autoplay feeds that need constant motion without cuts
Not for: stories that need several messages or a product UI; the single label is the only copy.

## Format
16:9 · 10.63 s · 30 fps · light · no music (silent), cut_on_beat n/a (0 cuts) · no VO · loopable

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.80 | 0–24 | hook | white stage, wheel already turning right of centre; 5-word label naming the technique resolves left to right | static frame, only the wheel moves | per-word blur-in, stagger ~3 fr (human 30 fps study), easings.outExpo ~10 fr (±0.25 s); wheel easings.linear 34°/s from frame 0 | continuous | swell (planned) |
| 2 | 0.80–9.70 | 24–291 | hook | label holds at centre; ~11 images twice around (~22 cards) turn on a vertical wheel; near cards cover the label's right end, far ones pass behind its left part | static frame, only the wheel moves | ItemWheel easings.linear 34°/s, one turn per 10.6 s; near side down 300–370 px/s, far side up 210–260 px/s (720p); card ~230 px near, ~56 px far | continuous | none |
| 3 | 9.70–10.63 | 291–319 | hook | label dissolves word by word left to right, wheel keeps turning; last frame matches frame 0 | static frame, only the wheel moves | per-word blur-out, stagger ~3 fr, easings.inExpo ~10 fr (±0.25 s); wheel linear | end | reverse-cymbal (planned) |

Evidence: row 1 sheet-01 cells 0–3 (0.00 no label, 0.27 first word soft, 0.50 two words sharp, 0.77 third word resolving), cells 4–5 (1.00 all sharp). Row 2 sheet-01 cells 4–15, sheet-02 cells 0–15, sheet-03 cells 0–6; keyframes kf-001.50 to kf-009.50 (label occluded at its right end by near cards in every keyframe; the same picture recurs at 0.00/5.27 and 4.00/9.27, period ~5.3 s). Row 3 sheet-03 cells 7–10 (9.77 first word soft, 10.00 first word gone, 10.27 only a ghost, 10.50 label gone; 10.50 matches 0.00 layout). cuts.json: 0 hard, 0 soft, 0 flashes.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| orbit-ring | 1–3 (as an endless wheel, no contract) | craft/vocabulary.md#ui, ItemWheel / OrbitRing in studio/API.md |
| blur-in | 1, 3 (mirrored out) | craft/vocabulary.md#type, BlurIn |

## Look
Palette: #FFFFFF background, #242125 label text, then image accents #3B54C9 (blue), #EF807C (coral), #94B8A5 (sage), #F4F9D6 (pale yellow) from keyframe palettegen. Type: regular geometric grotesk, sentence case, normal tracking, black, ~48 px at 720p (6.7 % H), one line centred. Treatment: none (no grain, no shadow, square corners, no depth blur or fade). Background: flat white.

## What to adapt
- Copy: one line, about 5 words, saying what the wheel shows; it must stay legible with its right third covered part of the time.
- Images: ~11 distinct images used twice (22 slots); mix saturated and dark images so near cards read against white. Use brand screenshots, outputs or illustrations.
- Brand: background and label colour from brand bg/fg; accent lives only in the images.
- Timing: the loop length is one wheel turn; to change duration change speed = 360° / duration. Keep text in and out ~24 fr each.

## Pitfalls
- The depth comes from explicit scale (near/far 4.1x) while positions differ only 1.4x; pure perspective projection looks flat and wrong (human 30 fps study).
- The label must be z-sorted between the halves of the wheel: near cards in front, far cards behind. Rendering it always on top loses the whole effect.
- Rotation is linear and never stops; any easing on the wheel breaks the loop.
- Wheel axis is right of centre (+0.035 W); centring it covers the label's start and makes it unreadable.

## Missing components
none (ItemWheel covers the wheel: radius 0.74 H, tilt 71°, speed 34°/s, scale [1, 0.24], perspectiveRatio 1.4, offsetX +0.035 W; text passed as children at depth 0)

## Proposed terms
- image-wheel: images on a vertical wheel seen at a steep angle, turning endlessly, with type interleaved at depth 0 between near and far halves (rows 1–3). Closest vocabulary id is orbit-ring, which assumes a core and a contraction. Not in craft/vocabulary.md; not used in recipe.json.

## Measurement notes
Resolution: 0.25 s from sheets; no strip extracted. Wheel speed, radius, tilt, scale range, axis offset and per-word stagger taken from the human 30 fps study. Not measurable from sheets: exact word stagger, entrance easing curve, blur radius. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts (no cuts, no beats). Palette from keyframes kf-000.50, kf-004.50, kf-009.50 (no cut frames exist).

## Study log
- id tilted-image-wheel-label-loop, family kinetic-type (catalogue hint "transitions" rejected: there is no cut; the label is the anchor).
- 10.63 s, 3 rows, one shot, 0 cuts, loopable (10.50 matches 0.00).
- techniques 2: orbit-ring, blur-in. cut_on_beat n/a (silent, 0 cuts).
- From human 30 fps study: 34°/s linear, radius 0.74 H, tilt 71°, scale [1, 0.24], perspectiveRatio 1.4, offset +0.035 W, ~3 fr word stagger.
- Not measurable at 0.25 s: stagger, easing, blur radius. SFX all planned.
- Proposed terms: image-wheel. Missing components: none (ItemWheel).
- phase B: not run.
