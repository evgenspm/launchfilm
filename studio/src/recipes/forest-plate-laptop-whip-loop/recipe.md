# Laptop in a forest plate, whip in and out

A laptop showing one landing page sits in a sunlit forest behind ferns. The camera whips in, drifts left for 3 s, whips out past a tree trunk, and the 5 s cycle runs twice. The page reads as a calm object in nature.

Source: https://www.raylight.app/templates/jYFQJryY (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A brand with an outdoor, natural or wellness voice shows its landing page as one hero screenshot.
- A silent 10 s social loop: no copy overlay, the page itself is the message.
- You have one strong page and no UI animation worth showing.
- Opener before a longer walkthrough (use one 5 s cycle).
Not for: products whose value needs the UI to move or text to explain it; dark, technical brands where a forest reads as a non sequitur.

## Format
16:9 · 10.00 s · 30 fps · mixed (bright sky plate, dark green page) · no music, bpm n/a, cut_on_beat n/a (0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.03 | 0–1 | hook | one frame: empty forest floor, mossy roots, conifers, flat sky | static (1 frame) | none | hard-cut | none |
| 2 | 0.03–1.00 | 1–30 | reveal | whip across blurred undergrowth; laptop slides in from the right, screen on, base hidden in ferns | whip-pan left ~880 px/s @1920, zoom −2.4 %/s, roll −2.8°/s | laptop enters rolled ~10° (±5), levels and settles by 1.00 s (±0.25 s), easings.outExpo ~27 fr (suggested); blur peaks 0.03–0.27 s | continuous | whoosh (planned) |
| 3 | 1.00–4.00 | 30–120 | reveal | laptop ~55 % of frame width: nav, 2-line headline, short paragraph, 4 product cards, one button; ferns cover the lower edge | dolly left 217 → 36 → 174 px/s @1920 in s 1/2/3; scale 1.00 → ~1.01 | speed-ramp, easings.inOutSine (suggested): near hold at 2–3 s, then accelerates; laptop width constant ±2 % | continuous | none |
| 4 | 4.00–5.00 | 120–150 | reveal | laptop tilts and slides off left; big mossy trunk crosses the foreground; lands on the empty forest frame | whip-pan left 580 → 880 px/s @1920, zoom −8.5 %/s, roll −3.8°/s; easings.inExpo | laptop exits by 4.77 s (±0.25 s); trunk wipe 4.50–4.77 s; 5.00 s frame matches 0.00 s | continuous | swoosh-short (planned) |
| 5 | 5.00–6.00 | 150–180 | reveal | repeat of row 2 | whip-pan left ~880 px/s @1920, roll −2.1°/s | as row 2, settled by 6.00 s (±0.25 s) | continuous | whoosh (planned) |
| 6 | 6.00–9.00 | 180–270 | reveal | repeat of row 3 | dolly left 215 → 36 → 171 px/s @1920 | as row 3 | continuous | none |
| 7 | 9.00–10.00 | 270–300 | reveal | repeat of row 4; film ends with the trunk mid-blur | whip-pan left 681 px/s @1920, zoom −5.7 %/s, roll −2.5°/s | as row 4 | end | swoosh-short (planned) |

Evidence per row: 1 `sheet-01 cell 0`, `cuts/cut-000.03.jpg` (before); 2 `sheet-01 cells 1–3`, `cuts/cut-000.03.jpg` (after); 3 `sheet-01 cells 4–15`, `keyframes/kf-002.50.jpg`; 4 `sheet-02 cells 0–3`; 5 `sheet-02 cells 4–7`; 6 `sheet-02 cells 8–15`, `sheet-03 cells 0–3`; 7 `sheet-03 cells 4–7`. Pan/zoom numbers: motion.json per second.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-laptop | 2–7 | craft/vocabulary.md#ui (LaptopFrame) |
| whip-pan | 2, 4, 5, 7 | craft/vocabulary.md#camera |
| dolly | 3, 6 | craft/vocabulary.md#camera (Dolly) |
| speed-ramp | 3, 6 | craft/vocabulary.md#camera |
| motion-blur | 2, 4, 5, 7 | craft/vocabulary.md#look |

## Look
Palette: #71CEFD sky, #212D13 page background / deep foliage, #AAD2C5 pale screen highlights, #58692C moss, #89984C sunlit leaves, #3E4D24 mid foliage. Type: no overlay; the screen page uses a medium grotesk headline, sentence case, 2 lines, ~4 % of frame height. Treatment: motion-blur on the whips. Background: photoreal forest plate (still or footage) with a foreground fern layer in front of the laptop.

## What to adapt
- Copy: none on top; the user's page screenshot carries all text.
- Brand: the page colours are the brand; pick a plate whose foliage tone matches the page background so the laptop sits in the scene.
- Timing: the 5 s cycle (1 s whip-in, 3 s drift, 1 s whip-out) keeps its frame counts; change the number of cycles, not the cycle.

## Pitfalls
- The laptop base must be hidden by a foreground fern layer; a visible base on the ground reads as a cheap composite.
- The drift nearly stops at 2–3 s (36 px/s); a constant-speed drift loses the breathing of the speed-ramp.
- The whips need directional blur; without motion-blur the 880 px/s moves strobe at 30 fps.
- The reference ends mid-whip; for a clean loop end at 5.00 s or 10.00 s on the empty forest frame and drop the 1-frame opener.

## Missing components
- PlateComposite: background plate + laptop layer + foreground foliage layer with alpha, each with its own parallax factor (bg 1.0, laptop ~1.0, fg ~1.3, suggested) under one lateral camera; directional blur scaled by pan speed (techniques: device-laptop, dolly, whip-pan, motion-blur)

## Proposed terms
- plate-composite: a device placed into a photoreal background plate with a foreground occluder layer, rows 2–7 (not in craft/vocabulary.md; not used in recipe.json)
- foreground-occluder: a near layer (trunk, ferns) that wipes across the frame and hides the device's exit, rows 4, 7 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; pan/zoom/roll are per-second averages from motion.json, normalised to 1920 width. No 30 fps strip extracted. Not measurable: whip peak speed inside each second, roll angles (±5°), settle ease and overshoot (overshoot not measurable), foreground parallax factor. Theme: keyframe mean luma 0.35–0.40, neither rule threshold met; marked mixed (bright sky, dark page). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/1 cuts within ±2 fr (no beats).

## Study log
id forest-plate-laptop-whip-loop · family product-ui · 10.00 s · 7 rows (1-frame opener + 5 s cycle ×2)
techniques 5 (device-laptop, whip-pan, dolly, speed-ramp, motion-blur) · cut_on_beat n/a (silent, 0 beats)
1 hard cut at 0.03 s; the rest is one continuous shot split at state changes 1.00, 4.00, 5.00, 6.00, 9.00 s
not measurable: whip peaks, roll angles, ease shape (±0.25 s, 4 fps sheets)
proposed terms: plate-composite, foreground-occluder · missing components: PlateComposite
difficulty easy, render_cost heavy (motion-blur) · phase B: not run
