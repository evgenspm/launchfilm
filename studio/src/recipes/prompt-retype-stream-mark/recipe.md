# Prompt retype, send, streamed answer, mark close

A lone prompt bar on light grey: one question is typed and erased, a second is typed and sent with a cursor click, the view drops to a chat thread where a long answer streams and scrolls, then the brand mark holds.

Source: https://www.raylight.app/templates/FcuUd4Q5 (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- An AI writing or chat product that wants a 10 s silent loop of ask, answer, mark
- Showing that the assistant writes long-form output fast
- A minimal, monochrome brand that should feel like a native chat UI
- A feed teaser where the prompt itself is the hook
Not for: products whose answer is visual (images, charts), or films that need a claim or a URL on screen.

## Format
16:9 · 10.00 s · 30 fps · light · music none (silent), cut_on_beat n/a · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.27 | 0–38 | hook | pill prompt bar, plus button, dark send button; 4-word question typed then erased | push-in 1.00→~1.25 by 1.00 s, springs.cameraIn (overshoot not measurable) | typed ~15 fr, hold ~8 fr, backspace ~15 fr (±0.25 s) | hard-cut | type-click |
| 2 | 1.27–3.00 | 38–90 | feature | 4-word writing request typed; pointer enters bottom right, clicks send | drift, eases back ~10 % at 2.50–2.77 s | typed 1.50→2.00 s; cursor springs.ui to send by 2.27 s, springs.click at 2.50 s; bar fades out by 3.00 s | blur-dissolve | ui-confirm |
| 3 | 3.00–3.77 | 90–113 | feature | empty grey, then the sent request as a small right bubble atop a thread view | static (thread at ~0.4 scale) | bubble fades in easings.outQuint ~8 fr (±0.25 s) | hard-cut | |
| 4 | 3.77–5.50 | 113–165 | feature | answer streams: 2-word heading, long first paragraph, narrow left column | static | ~8 lines/s (~24 words/s), easings.linear | hard-cut | |
| 5 | 5.50–7.50 | 165–225 | feature | second heading + paragraph stream; thread scrolls to keep the stream bottom in view | dolly up 60 → 332 → 11 px/s (1920-wide), easings.inOutSine | stream at the same rate | hard-cut | |
| 6 | 7.50–8.27 | 225–248 | feature | answer ends; 3-word follow-up bubble appears, scrolls up, thread fades out | dolly up ~60 % H at 7.77–8.00 s, easings.outExpo (±0.25 s) | fade out ~8 fr (±0.25 s) | blur-dissolve | |
| 7 | 8.27–10.00 | 248–300 | logo | monochrome brand mark centred, ~15 % H, holds to the end | static | appears by 8.50 s (< 8 fr, ±0.25 s), holds 45 fr | hard-cut | swell |

Evidence per row: 1 = sheet-01 cells 0–5, kf-000.50.jpg; 2 = sheet-01 cells 5–11; 3 = sheet-01 cells 12–14; 4 = sheet-01 cell 15, sheet-02 cells 0–5, kf-004.50.jpg; 5 = sheet-02 cells 6–13; 6 = sheet-02 cells 14–15, sheet-03 cells 0–1; 7 = sheet-03 cells 2–7. cuts/ is empty (0 cuts in cuts.json).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| prompt-typing | 1, 2 | craft/vocabulary.md#ui (PromptBar) |
| push-in | 1 | craft/vocabulary.md#camera (Camera) |
| cursor-path | 2 | craft/vocabulary.md#ui (Cursor) |
| stream-text | 4, 5, 6 | craft/vocabulary.md#ui (StreamText) |
| dolly | 5, 6 | craft/vocabulary.md#camera (Dolly) |
| ui-rebuild | 1–6 | craft/vocabulary.md#ui |
| blur-dissolve | 2, 6 | craft/vocabulary.md#transitions (nearest id for the fade through the background) |

## Look
Palette: #EBEBEB background, #191919 text and send button, #E2E2E2 bar and bubble fill, #6F6F6F muted icon, #C8C8C8 hairline. Type: regular grotesk, sentence case, normal tracking; prompt ~5 % H in the bar view, answer ~3 % H in the thread view. Treatment: none. Background: flat.

## What to adapt
- Copy: decoy prompt (~4 words, erased), real request (~4 words), answer (2-word heading + 2 paragraphs, 60–80 words each), follow-up request (3 words).
- Brand: everything is monochrome; the send button carries the fg colour; the mark is the only logo moment (row 7).
- Timing: rows 4–5 stretch with answer length; keep the erase and the click inside the first 3 s.

## Pitfalls
- The erase in row 1 is the hook; without it the opening reads as a plain typing demo.
- The stream runs ~24 words/s: nobody reads it, the scroll sells speed. Slowing it to reading speed doubles the film.
- Two scales: the bar view is ~2.5× the thread view; do not keep the bar scale in the thread or the column overflows.

## Missing components
- ChatThread: right-aligned user bubbles + left-column streamed answer that auto-scrolls to keep the stream bottom at ~75 % H (techniques: stream-text, dolly).

## Proposed terms
- prompt-erase: a typed prompt is backspaced to empty before the real one, row 1 (not in craft/vocabulary.md; not used in recipe.json)
- fade-through-bg: scene fades to the bare background and the next scene fades in, rows 2→3 and 6→7 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips extracted. Not measurable: spring overshoot of the push-in and cursor, keystroke cadence, stream chunk fade, mark entrance style. Camera speeds from motion.json (1 s windows). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no music).

## Study log
- id prompt-retype-stream-mark · family ai-chat · 10.00 s, 7 rows (0 cuts; rows from state changes)
- techniques 7 · cut_on_beat n/a (no cuts, silent)
- not measurable at ±0.25 s: overshoot, keystroke cadence, stream fade, mark entrance
- proposed terms: prompt-erase, fade-through-bg
- missing components: ChatThread
- phase B: not run
