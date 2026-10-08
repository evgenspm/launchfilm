# Milestone number rolls up one step at a time

A big accent-coloured number on white ticks up one unit at a time, each digit rolling upward through a clip, then cascades into the round milestone while a short label rises in below. Built-in suspense, one clear figure.

Source: https://jitter.video/template/counter-1-000-figma-plugin-installs/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Announcing a round milestone (users, downloads, stars)
- A short silent social post where one number is the whole message
- A stat insert inside a longer launch film
- A growth update that should feel earned, not shouted
Not for: numbers that are not round (the final cascade is the payoff), or several stats at once.

## Format
16:9 · 3.0 s · 30 fps · light · music none, cut_on_beat n/a (0 cuts, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–3.00 | 0–90 | hook | one shot: three-digit number on white steps up twice by one, then rolls to the round four-digit milestone; 3-word label rises in below and holds | locked-off frame; number group re-centres as it widens at ~1.50 (±0.25 s) | counter steps every ~22 fr (±0.25 s), changed digit rolls up through a clip mask, springs.ui ~15 fr (overshoot not measurable); final step from ~f40: all digits roll, ~2 fr per-digit stagger (±0.25 s), leading digit and separator enter, settled ~f55–60; label words mask-rise from ~f50, stagger ~4 fr (±0.25 s), springs.ui, settled by f68; hold f68–f90 | hard-cut | tick per step, ui-confirm on landing (planned) |

Evidence: sheet-01 cells 0–3 (first step mid-roll at 0.00, second step rolling at 0.27, settled 0.50, next digit entering 0.77), cells 4–5 (settled at 1.00–1.27), cell 6 + kf-001.50 (all digits rolling, leading digit rising, group shifted left), cell 7 (milestone landed, label rising word by word), cells 8–11 + kf-002.50 (label settling, hold). No cut frames (cuts.json empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| counter | 1 | craft/vocabulary.md#type, studio/API.md Counter (rolling) |
| mask-rise | 1 (label words) | craft/vocabulary.md#type, craft/04#springs |

## Look
Palette: #FFFFFF background, #030303 label text, #5B7CF0 number accent, #84A1F2 / #B3C6F3 / #E7EFFC shadow tints of the accent. Type: heavy rounded grotesk numerals, tabular, tight, ~20 % H, soft same-hue drop shadow; label bold grotesk, sentence case, ~6 % H. Treatment: none (soft shadow only). Background: flat white.

## What to adapt
- Copy: one label line, 2–4 words, says what the number counts.
- Brand: the brand accent colours the number and its shadow; the label stays near-black. No logo.
- Timing: keep each step ~22 fr and the final cascade ~15–20 fr; the hold can stretch for longer posts.

## Pitfalls
- Steps are single units with holds, not a continuous blur of numbers: a fast ticker loses the suspense.
- Only the changing digits roll; unchanged digits must stay perfectly still or the number shimmers.
- The group must re-centre when the digit count grows, otherwise the milestone lands off-centre.

## Missing components
- StepCounter mode: Counter that advances in discrete unit steps with holds (e.g. 3 steps × 22 fr) and rolls only the digits that change, per-digit stagger 2 fr on carries (techniques: counter). Counter's `rolling` may cover the roll; the stepped timing has to be scripted.

## Proposed terms
- step-roll: a counter that advances by single units with a hold between steps, each changed digit rolling through a clip; row 1 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (cells at 0.00/0.27/0.50/0.77…), full-res keyframes at 0.50/1.50/2.50 s. Not measurable: roll duration and overshoot per digit, exact stagger of the carry cascade and of label words. motion.json zoom (~8.7 %/s, s 0–2) reflects the digit rolls and widening, not camera. SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts (no cuts, no audio).

## Study log
id milestone-digit-roll-count · family data-stats · 3.00 s, 1 row (0 cuts) · 2 techniques (counter, mask-rise)
cut_on_beat: n/a, silent reference, no cuts
not measurable at 0.25 s: roll length, overshoot, carry and label staggers (marked ±0.25 s)
proposed terms: step-roll · missing components: stepped Counter mode
phase B: not run
