# Letter echo trail drop and rise loop

One short uppercase word on a flat saturated field drops from the top edge to the bottom and rises back, letter by letter in a left-to-right wave; each letter drags a stack of fading echoes behind it. Seamless loop.

Source: https://jitter.video/template/type-trail/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A loopable social or banner accent where one word is the whole picture
- A high-energy sting between scenes of a longer film
- A product name or one-word claim that needs motion without any UI
- Square or vertical feeds that autoplay silently
Not for: sentences or multi-line copy (the wave needs letters spread across the full width); films that must explain anything.

## Format
1:1 · 4.33 s · 30 fps · dark (by the luminance rule; reads as saturated red) · music none, cut_on_beat n/a (0 cuts, 0 beats) · VO no · loopable

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.50 | 0–15 | hook | one 4-letter word, pale pink, along the top edge of a flat red square, crisp | locked-off, scale 1.00 | hold 15 fr; first letter starts to sink at 0.50 (±0.25 s) | hard-cut | none |
| 2 | 0.50–1.77 | 15–53 | hook | letters fall to the bottom edge left first, each dragging fading echoes above it | locked-off, scale 1.00 | per letter ~0.75 H travel, easings.inOutSine ~30 fr (±0.25 s), stagger ~6 fr (±0.25 s); trail up to ~0.32 H at peak speed | hard-cut | whoosh |
| 3 | 1.77–2.50 | 53–75 | hook | word rests crisp along the bottom edge; last letter's trail dies first | locked-off, scale 1.00 | settle, no overshoot (overshoot not measurable); still ~15 fr | hard-cut | tick |
| 4 | 2.50–3.77 | 75–113 | hook | letters rise back to the top in the same left-first wave, echoes trailing below | locked-off, scale 1.00 | mirror of row 2: easings.inOutSine ~30 fr (±0.25 s), stagger ~6 fr (±0.25 s); trail up to ~0.4 H | hard-cut | whoosh |
| 5 | 3.77–4.33 | 113–130 | hook | word back at the top edge, same as frame 0; last trail fades | locked-off, scale 1.00 | last letter lands ~4.00 (±0.25 s); hold ~10 fr; end matches start | hard-cut | tick |

Evidence per row: 1 = sheet-01 cells 0–2 (0.00, 0.27, 0.50; first letter already slightly lower at 0.50); 2 = sheet-01 cells 3–7 (0.77 first letter halfway with trail, 1.00 all four moving with stair-step offsets, 1.27 first two near the bottom, 1.50 last letter still trailing) and keyframes/kf-001.50.jpg (banded echoes, ~0.32 H trail on the last letter); 3 = sheet-01 cells 7–10 (1.77 small trail on the last letter, 2.00–2.50 crisp at the bottom); 4 = sheet-01 cells 11–15 (2.77 first letters lift with trails below, 3.00–3.27 wave mid-frame, 3.50–3.77 last letter still trailing); 5 = sheet-02 cells 0–1 (4.00 faint trail on the last letter, 4.27 crisp, same layout as 0.00). cuts/: empty (cuts.json lists 0 cuts).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| motion-blur | 2, 4 (tails in 3, 5) | craft/vocabulary.md#look; closest id for the echo trail, see Proposed terms |

## Look
Palette: #E7060A background red, #FF82C4 letter pink, #FB344C and #FD6EA3 trail blend steps (pink fading into red). Type: heavy rounded geometric sans, uppercase, wide tracking, 4 letters spanning ~92 % of W, cap height ~17 % H. Treatment: motion-blur (as discrete echoes). Background: flat, no gradient, no grain.

## What to adapt
- Copy: one word, 3-6 letters, uppercase; the reference uses a 4-letter word whose meaning matches the motion.
- Brand: bg carries the field, accent (or fg) the letters; the trail is the letter colour fading to the bg, so contrast between the two decides how visible the echoes are.
- Timing: rests (rows 1, 3, 5) can stretch; the drop and rise keep their per-letter travel and stagger, or the wave flattens into a block move.

## Pitfalls
- The trail is banded copies, not a gaussian blur: a smooth blur reads as a focus problem, not speed.
- Trail length must follow speed (zero at rest, longest mid-travel); a constant trail looks like a drop shadow.
- The trail always sits behind the direction of travel: above on the drop, below on the rise.
- Last frame must equal frame 0 or the loop pops.

## Missing components
- EchoTrailLetters: splits a word into letters, moves each on its own eased y track with a per-letter stagger, and draws N (~12) copies sampled from the previous ~6 frames at falling opacity behind each letter; params word, from/to y, travel fr, stagger fr, echoes, lag (techniques: motion-blur). TrailType in the studio is a per-character opacity reveal, not a positional trail, so it does not cover this.

## Proposed terms
- echo-trail: a moving element leaves banded, fading copies of itself along its recent path, length proportional to speed (rows 2, 4) (not in craft/vocabulary.md; not used in recipe.json)
- letter-wave: letters of one word make the same move in turn, left to right, with a fixed small lag (rows 2, 4) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (cells at 0.27 s, 0.50 s, 0.77 s… per burned-in timestamps), plus 4 full-res keyframes. No strips extracted. Not measurable: exact per-letter stagger (estimated ~6 fr from the stair-step offsets of the 4 letters within one cell), exact easing curve and travel frames, overshoot on landing, echo count and spacing. Palette from palettegen on kf-000.50 and kf-001.50 (no cut frames exist). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr.

## Study log
id letter-echo-trail-wave · family kinetic-type · 4.33 s, 1:1, 30 fps, loopable · 5 rows from one shot split at state changes (rest, drop, rest, rise, rest).
Techniques: 1 (motion-blur, as closest id for the echo trail). cut_on_beat: n/a, 0 cuts, silent, no beats.
Not measurable at 0.25 s: per-letter stagger (~6 fr), easing and travel length in frames, landing overshoot, echo count.
Proposed terms: echo-trail, letter-wave. Catalogue hints typewriter, blur-in, kinetic-depth not seen on the sheets (no typing, no focus resolve, no Z motion).
Missing components: EchoTrailLetters. Phase B: not run (study only).
