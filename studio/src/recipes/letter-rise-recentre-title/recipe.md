# Letter rise with recentring slide

One bold oblique word builds letter by letter: each letter rises and fades in on a 1.5 fr stagger while the whole word slides left into centre, holds about one second, then smears out in 4 frames.

Source: https://jitter.video/template/sliding-text-reveal/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Section header or chapter title inside a longer film.
- Revealing a product name or a one-word claim on a flat background.
- A short looping title sting (empty head and tail make the loop seamless).
Not for: sentences or multi-line copy; the per-letter build plus slide only reads on one word of 4 to 10 letters.

## Format
other (1322×992, ~4:3) · 2.8 s · 30 fps · light · music none, cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.80 | 0–84 | hook | one title word, 6 letters, built letter by letter on a flat pale background, holds centred, smears out, empty tail | static (word moves, frame does not) | f0 empty; letters rise ~0.3 em + opacity 0→1, stagger 1.5 fr (f1–f9), each easings.outExpo ~12 fr; whole word slides left ~0.32 W into centre, easings.outQuint 22 fr, settled f23; hold f23–f54; exit f55–f58 fade + ~5 % scale-up + leftward smear, easings.inExpo 4 fr; empty f59–f84 | blur-dissolve | swoosh-short (planned) |

Evidence: sheet-01 cells 0–11 (0.00 empty; 0.27 first letters solid, last three rising and faint, word right of centre; 0.50 last letter still low and faint; 0.77–1.77 settled, centred; 2.00–2.77 empty), keyframes kf-000.50 (last letter ~22 px low at 1322 W, lighter) and kf-001.50 (settled), 30 fps strips at 0–1 s and 1.5–2.5 s. cuts/: none (0 cuts). motion.json second 0: pan −300 px/s (the slide), seconds 1–2: hold.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| blur-in | 1 (per-letter rise + fade entrance) | craft/05-typography.md#table-of-the-rest |
| blur-dissolve | 1 (4 fr smear-fade exit) | craft/09-transitions.md#blur-dissolve |

The catalogue hints `mask-wipe` and `slide-push` were not used: no clip edge is visible on any strip frame (letters fade in below the baseline rather than being cut by a line), and there is no scene-to-scene push, only the word sliding inside one shot. `mask-rise` was also rejected: no overshoot and no clip mask visible.

## Look
Palette: #D7E0F1 background (flat pale blue), #8D95AA text (muted slate), #B0B8CC letters mid-fade. Type: heavy geometric sans, oblique, all caps, cap height ~14 % H, word ~65 % W. Treatment: none. Background: flat.

## What to adapt
- Copy: one word, 4–10 letters, the title or name; no punctuation.
- Brand: display font in its heaviest weight, oblique if the family has one; text in a muted fg, not the accent; bg flat.
- Timing: hold (32 fr) stretches freely; keep the 1.5 fr stagger, the 22 fr slide and the 4 fr exit, they set the feel. Longer words: keep total entrance ≤ 24 fr by lowering the stagger to 1 fr.

## Pitfalls
- The slide and the letter build run together; doing them in sequence makes the entrance twice as long and loses the pull into centre.
- Centre the settled word, not the starting one: the word starts ~0.32 W right of its final spot.
- Exit is 4 fr; a slow fade-out drags and breaks the loop rhythm.
- Letters must not overshoot; a springy rise reads as a different, bouncier template.

## Missing components
- LetterRiseSlide: per-letter rise 0.3 em + fade, stagger 1.5 fr, outExpo 12 fr, with a parent translateX from +0.32 W to 0 on outQuint 22 fr and a 4 fr inExpo exit (fade, scale 1→1.05, x −0.03 W, directional blur). BlurIn has no per-letter fade mode with a parent slide. (techniques: blur-in, blur-dissolve)

## Proposed terms
- letter-rise-fade: letters rise ~0.3 em from below the baseline while fading in, no clip, no overshoot (row 1).
- recentre-slide: a word grows from one side and the whole line slides so the finished word lands centred (row 1).
- smear-exit: 4 fr exit with scale-up, sideways drift and blur trail (row 1).

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0.00 and t = 1.50 (made in a temp folder from the analysis preview, deleted). Not measurable: exact rise distance per letter (±0.1 em), exact easing curve shape (named by shape only), blur radius in the exit. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts (no music, no cuts).

## Study log
id letter-rise-recentre-title · family kinetic-type · 2.80 s, 1 row (0 cuts, shot < 4 s so not split) · 2 techniques · cut_on_beat n/a (0/0, silent).
Measured at 1 fr from 30 fps strips: build f1–f23, hold f23–f54, exit f55–f58, empty tail f59–f84; loopable (first and last frames empty).
Not measurable: rise distance ±0.1 em, blur radius of the exit.
Proposed terms: letter-rise-fade, recentre-slide, smear-exit.
Missing components: LetterRiseSlide.
Phase B: not run (study only).
