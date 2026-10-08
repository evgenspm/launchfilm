# Single button press with ambient colour flare

A prompt bar with one dark pill button idles on a pale drifting gradient; a cursor glides in, presses with a squash, the sparkle icon collapses and the whole background flares saturated blue-violet, then slowly calms.

Source: https://jitter.video/template/the-prompt-generate-button/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- The press of one AI action button is the moment to sell (generate, run, create).
- A short vertical loop for a feature page or social post with no copy beyond the button label.
- An insert between a prompt-typing shot and the result shot of a longer film.
- A calm, premium voice where a colour shift replaces a loud effect.
Not for: showing what the button produces; there is no result on screen, pair it with a result shot.

## Format
9:16 · 7.00 s · 30 fps · light · music none (silent reference), cut_on_beat n/a · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.00 | 0–60 | hook | prompt bar cropped off the left edge at ~48 % H, dark pill button with sparkle icon and a one-word label; pale blue-lilac gradient | static framing, gradient drifts | button idle; blobs drift easings.inOutSine 60 fr (±0.25 s) | hard-cut | none |
| 2 | 2.00–2.60 | 60–78 | feature | arrow cursor glides in from bottom right, parks on the button's right end | static framing | cursor f61→f66, springs.ui ~5 fr, no overshoot visible; hover nudge ~1 % | hard-cut | none |
| 3 | 2.60–3.50 | 78–105 | feature | button presses, sparkle shrinks to one star and vanishes; background floods saturated blue to violet | static framing | press f78 springs.click, width -4 % ~5 fr; icon collapse f84–f95 easings.outQuint 11 fr; bg saturates f83–f88 easings.outExpo 5 fr; cursor fades f91–f106 easings.linear 15 fr | hard-cut | tick |
| 4 | 3.50–7.00 | 105–210 | feature | button rests in its done state, label only; background calms back to the pale opening gradient | static framing | button static; gradient desaturates 4.27–6.00 s easings.inOutSine ~52 fr (±0.25 s), holds pale | hard-cut | shimmer |

Evidence per row: 1 = sheet-01 cells 0–8, keyframe kf-000.50; 2 = sheet-01 cells 8–10, strip t = 2 s; 3 = sheet-01 cells 10–14, strips t = 2 s and t = 3 s, keyframe kf-003.50; 4 = sheet-01 cells 14–15, sheet-02 cells 0–11, keyframe kf-006.50. cuts/ is empty (0 cuts).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| cursor-path | 2–3 | craft/04-motion.md#springs (springs.ui, springs.click), Cursor in studio/API.md |
| ui-rebuild | 1–4 | prompt bar and button rebuilt in React, PromptBar in studio/API.md |
| mesh-gradient | 1–4 | look: drifting soft colour field, flares in row 3 |

## Look
Palette: #DBE0F5 pale background, #4C4D5B dark pill / icons, #CECDEB bar fill, #D9D0F5 lilac haze, #B9C9FC flare blue, #D0A8FD flare violet. Type: neutral grotesk, medium, sentence case, white label ~2.6 % H. Treatment: mesh-gradient. Background: soft mesh gradient, pale for most of the runtime, saturated for ~1.5 s after the press.

## What to adapt
- Copy: one button label, 1–2 words, naming the action.
- Brand: the flare state carries the brand accent (two hues of it); the button pill uses the brand fg; idle background is a tint of brand bg.
- Timing: row 1 idle can stretch or shrink (min ~1 s); rows 2–3 keep their frame counts (cursor 5 fr, press to flare 5 fr); row 4 calm can be cut to ~2 s.

## Pitfalls
- The flare must start ~5 fr after the press, not on it: the squash reads first, then the world reacts.
- No spinner or result appears; adding one turns a micro-moment into a demo and needs a longer film.
- The bar is cropped off the left edge on purpose: the button sits right of centre as the single subject. Centring the whole bar shrinks the button.
- The calm-down is slow (~52 fr); a fast return looks like a flicker.

## Missing components
- AmbientFlare: soft mesh gradient with two states (pale idle, saturated accent) and a timed transition, outExpo 5 fr up, inOutSine ~52 fr down, plus slow blob drift (techniques: mesh-gradient)
- ActionButton: dark pill button with icon + label, press squash -4 % on springs.click, icon collapse outQuint 11 fr to a label-only done state (techniques: ui-rebuild, cursor-path)

## Proposed terms
- button-state-press: one action button goes idle → hover → press → done (icon removed), rows 2–3 (not in craft/vocabulary.md; not used in recipe.json)
- ambient-flare: the whole background saturates as the reaction to a UI action, then calms, rows 3–4 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 2 s and t = 3 s (button region); 0.25 s from sheets elsewhere. Not measurable: overshoot on the cursor arrival (none visible), exact gradient blob paths. SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts (no cuts, no music). The reference shows no loading spinner despite the catalogue hint.

## Study log
id action-button-press-flare · family product-ui · 7.00 s · 4 rows, 0 cuts · 3 techniques (cursor-path, ui-rebuild, mesh-gradient)
cut_on_beat n/a (silent, 0 cuts) · press timings at 1 fr from strips; gradient drift and calm-down at ±0.25 s
Proposed terms: button-state-press, ambient-flare · Missing components: AmbientFlare, ActionButton
Catalogue hint prompt-typing not seen (no typing on screen); loading state not visible. Phase B not run.
