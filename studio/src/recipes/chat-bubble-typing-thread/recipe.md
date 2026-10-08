# Two-sided chat thread with typing pills

A vertical chat builds top-down on white: each message starts as a pill with pulsing dots, the pill stretches to the bubble size, then its words rise in. Five messages alternate grey left and blue right, one every ~2.8 s.

Source: https://jitter.video/template/animated-text-messages/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Telling a product story as a short dialogue between two people or a user and an agent
- Vertical social posts where the conversation itself is the content
- Opening a messaging, support or assistant product film before the real UI
- Silent autoplay: every line is read on screen, no VO needed
Not for: products that need a feature demo or a real UI; threads longer than 6 messages (the thread never scrolls and runs out of frame).

## Format
9:16 · 14 s · 30 fps · light · music none (silent reference), cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.50 | 0–75 | hook | empty white; grey typing pill top left, then incoming greeting question, 3 words | static | pill pops in 0.27 (springs.pop, overshoot not measurable, 8 fr ±0.25 s); dots pulse 1.0 s; dots fade 1.50; pill stretches right springs.layout 7 fr (±0.25 s); words rise 1.77–2.00 | hard-cut | pop |
| 2 | 2.50–5.27 | 75–158 | feature | blue typing pill right, then outgoing reply, 5 words, one line | static | empty blue pill 2.50, dots by 2.77 (springs.pop); dots pulse 1.0 s; 4.00 pill stretches leftward (springs.layout, ±0.25 s); words rise 4.27–4.77 | hard-cut | pop |
| 3 | 5.27–8.27 | 158–248 | feature | grey typing pill left, then the longest incoming message, ~10 words on 3 lines, an excited remark | static | pill pops 5.27 (springs.pop); dots pulse 1.0 s; gone 6.50; 6.77 pill grows width and height in one move (springs.layout, ±0.25 s); words rise line by line 6.77–7.77 | hard-cut | pop |
| 4 | 8.27–11.27 | 248–338 | feature | blue typing pill right, then outgoing answer, ~7 words on 2 lines, agreeing | static | empty blue pill 8.27, dots 8.50 (springs.pop); dots pulse 1.0 s; 9.77 stretch to 2-line bubble (springs.layout, ±0.25 s); words rise 10.00–10.77 | hard-cut | pop |
| 5 | 11.27–14.00 | 338–420 | feature | grey typing pill left, then a one-word sign-off plus emoji; full thread holds | static | pill pops 11.27 (springs.pop); dots pulse 1.0 s; 12.77 stretch (springs.layout, ±0.25 s); word rises 13.00, emoji pops 13.27 (springs.pop, ±0.25 s); hold 0.73 s | hard-cut | pop |

Evidence per row:
1. sheet-01 cells 0–9 (0.00 empty, 0.27 pill, 1.50 dots gone, 1.77 stretched with partial word, 2.00–2.27 settled); keyframes kf-000.50, kf-001.50.
2. sheet-01 cells 10–15, sheet-02 cells 0–4 (2.50 empty blue pill, 2.77 dots, 4.00 stretched, 4.27–4.50 words rising, 4.77 settled); kf-003.50, kf-004.50.
3. sheet-02 cells 5–13 (5.27 pill, 6.50 empty, 6.77 3-line box with first word, 7.00–7.77 words fill); kf-006.50, kf-007.50.
4. sheet-03 cells 1–12 (8.27 empty blue pill, 8.50 dots, 9.77 empty 2-line bubble, 10.00–10.77 words); kf-009.50, kf-010.50.
5. sheet-03 cells 13–15, sheet-04 cells 0–7 (11.27 pill, 12.77 empty pill, 13.00 word, 13.27 emoji, 13.77 hold); kf-012.50, kf-013.50.
No cuts (cuts.json: 0 hard, 0 soft, 0 flashes); rows split at each new typing pill (A4 long-shot split).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| thinking-state | 1–5 (pulsing three-dot typing pill before every message) | craft/vocabulary.md#ui, ThinkingState variant 'dots', TypingDots |
| word-reveal | 1–5 (words rise into the bubble after it stretches) | craft/vocabulary.md#type, WordReveal |

## Look
Palette: #FFFFFF background, #3D5B82 dark text tone (antialias sample), #1A82FD outgoing bubble accent, #DDDDDD incoming bubble, #EEF1F1 light surface, #A5BFE3 accent tint (dot mid-pulse). Type: humanist sans, semibold, sentence case, normal tracking, about 2.4 % H; dark grey on grey, white on blue. Treatment: none. Background: flat white.

## What to adapt
- Copy: 5 messages alternating in/out; 1 to ~12 words each; an opener question, a reply, the longest message as the payload (the product moment), an answer, a 1-word sign-off.
- Brand: the outgoing bubble carries the brand accent; incoming bubble is the muted surface. No logo in the reference; add one only after the last bubble.
- Timing: each message is pill + ~1.0 s dots + stretch + words; longer messages stretch their word rise, the dots period stays 30 fr.

## Pitfalls
- Bubbles never move once placed; the thread is top-anchored. A bottom-anchored scroll changes the feel (use ChatThread with that in mind).
- The pill resizes to the final bubble before text arrives; text inside a growing bubble reflows and looks broken.
- Outgoing pills are empty for one cell (~8 fr ±0.25 s) before the dots: keep the small delay, it reads as the other side starting to type.
- No camera move: motion.json reports a 1.5 %/s zoom at 2–3 s, but the sheets show fixed bubble positions; it is the stretch, not the camera.

## Missing components
- TypingPillStretch: pill (~62×30 px at 814 w) with 3 dots pulsing in sequence, 1.0 s, then dots fade and the pill grows to the measured bubble size anchored to its side (left for in, right for out), springs.layout ~7 fr; then words rise in from a baseline mask at ~10 words/s (techniques: thinking-state, word-reveal)

## Proposed terms
- typing-pill-stretch: a typing indicator pill that becomes the message bubble by resizing, rows 1–5 (not in craft/vocabulary.md; not used in recipe.json)
- chat-sequence: one message per beat, alternating sides, top-anchored thread, rows 1–5 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (no strips extracted; source not used). Not measurable: pop overshoot, stretch spring settle, per-word stagger inside a bubble (all ±0.25 s). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats). Palette from ffmpeg palettegen on keyframes kf-002.50, kf-007.50, kf-013.50 (no cut frames exist).

## Study log
- id chat-bubble-typing-thread · family ai-chat · 14 s, 9:16, 30 fps · 5 rows (single shot split at each typing pill)
- techniques 2 (thinking-state, word-reveal) · cut_on_beat n/a (0 cuts, silent)
- not measurable: pop overshoot, stretch settle, word stagger (±0.25 s)
- proposed terms: typing-pill-stretch, chat-sequence
- missing components: TypingPillStretch
- phase B: not run (study only)
