# Prompt, punch-in send, agent thinks, result lands

A white prompt pill types one request fast on a warm mesh gradient, holds, punches in on the send button for a slow cursor and a 3-frame press, then cuts to the chat: agent header, thinking lines, spinner, a code card and a shimmer.

Source: https://www.raylight.app/templates/0Gk9f2du (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- An AI agent or assistant that turns one prompt into a result (code, video, document)
- A 5 s social loop, or the opener of a longer AI product film before the feature demo
- A light, warm consumer brand that wants soft, premium UI
- Showing that the product is working without a progress bar
Not for: products whose value is not a single prompt → answer exchange; dark technical brands (rework the gradient first).

## Format
16:9 · 4.97 s · 30 fps · light · no music (silent reference), cut_on_beat n/a (0 cuts, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.17 | 0–35 | hook | white pill input with a plus glyph on a peach/lilac mesh gradient; one request, 39 chars, types in | pill shifts left ~200 px @1920 in the first 8 fr (±0.25 s), then drift ≤ 0.3 px/fr | 1 char per frame (≈ 38 cps, f4 to f35), easings.linear, no caret | hard-cut | type-click |
| 2 | 1.17–2.00 | 35–60 | hook | the full one-line request holds | drift ≤ 0.3 px/fr, gradient keeps moving | hold 25 fr, nothing enters | hard-cut | none |
| 3 | 2.00–3.03 | 60–91 | feature | close-up on the pill's right end: black round send button with an up arrow; hand cursor arrives and presses | zoom-tier jump to detail (≈ 3×) at f60, no transition, then near static | cursor f74 to f81 easings.outExpo 7 fr; rest 6 fr; press f88 to f91 scale 1 → 0.84 easings.inQuad 3 fr (springs.click squash, release not shown) | hard-cut (camera jump on the press) | ui-confirm |
| 4 | 3.03–3.97 | 91–119 | feature | chat layout: the request as a message bubble at top; agent mark + name; two grey status lines; a spinner line | layout reframe, then push-in 1.2 %/s | bubble slides from top 4 fr springs.ui; header fade 4 fr at f101; lines at f107, f109, f115, each 2 to 4 fr fade + 4 px rise easings.outCubic; spinner 270° arc, 24 fr/turn, easings.linear | hard-cut | tick |
| 5 | 3.97–4.97 | 119–149 | proof | a white result card grows under the status lines; a short code block streams in; a bright band sweeps the status lines | push-in 1.4 %/s | card grows 4 fr springs.layout (overshoot not measurable); code ≈ 1 line per 3 fr (±0.25 s); shimmer band 1/3 line width, 10 to 12 fr sweep, easings.linear, text 55 % outside the band | hard-cut (end) | shimmer |

Evidence per row:
1. sheet-01 cells 0–4 (0.00 empty pill, 0.27 one word, 0.50 three words, 0.77 five words, 1.00 nearly full); keyframes/kf-000.50.jpg
2. sheet-01 cells 5–7 (1.27, 1.50, 1.77 full line, pill position shifting); keyframes/kf-001.50.jpg
3. sheet-01 cells 8–12 (2.00 close-up button, 2.27 cursor at the bottom edge, 2.50 cursor below button, 2.77 cursor on button, 3.00 button smaller under cursor); keyframes/kf-002.50.jpg
4. sheet-01 cells 13–15 (3.27 bubble only, 3.50 + agent header, 3.77 + two status lines); keyframes/kf-003.50.jpg
5. sheet-02 cells 0–3 (4.00 spinner line + empty translucent card, 4.27 card white with first code line and shimmer on status lines, 4.50 three code lines, 4.77 five code lines)
No cuts/*.jpg exist (cuts.json lists 0 cuts); row boundaries come from state changes in the sheets and the 30 fps human notes.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| prompt-typing | 1–3 | craft/13-ui-recreation.md, PromptBar in presets/list.tsx |
| zoom-tier | 3 | craft/03-camera-and-staging.md (zoom tiers) |
| cursor-path | 3 | craft/04-motion.md, Cursor in presets/cursor.tsx |
| thinking-state | 4–5 | craft/13-ui-recreation.md, ThinkingState / Spinner |
| stream-text | 5 | craft/13-ui-recreation.md |
| mesh-gradient | 1–5 | craft/06-look.md |
| hard-cut | 3, 4 | craft/09-transitions.md |

## Look
Palette: background peach #FDBC93, light lilac-white #F5ECF1, accent orange #FE9962, pink #F6C1D2, deep orange #DB8555, shadow brown #906048; UI is white cards with near-black text and a black send button. Type: neutral grotesk, regular, sentence case; prompt 2 % H in the pill, 4 % H as a bubble; status lines 2.5 % H grey; code in small mono. Treatment: mesh-gradient. Background: soft animated mesh gradient (orange, peach, lilac, white blobs), slow drift.

## What to adapt
- Copy: one request of 30 to 45 chars (one line); agent name; 2 to 3 status lines of 3 to 5 words, the last with a spinner; 4 to 6 result lines (code or a short answer).
- Brand: the accent tints the gradient blobs; the send button uses fg; the logo mark sits in the agent header.
- Timing: typing length scales with copy at 38 cps; keep the 25 fr hold, 7 fr cursor, 6 fr rest and 3 fr press fixed; status lines keep 2 to 6 fr gaps.

## Pitfalls
- The press must be cut before the release (3 fr squash, then the reframe); showing the bounce back kills the snap.
- Typing slower than ~30 cps makes the opening drag; the speed contrast (fast type, still hold, slow precise cursor) is the effect.
- The background must keep moving during the 25 fr hold or the frame dies.
- Status lines arrive 2 to 6 fr apart; equal long gaps read as a loading screen.

## Missing components
- MeshGradientBackdrop: 4 to 5 soft blurred blobs (accent, peach, lilac, white) on the brand bg, each drifting 2 to 6 px/fr on seeded paths, blur ≥ 120 px (techniques: mesh-gradient)
- ResultCard: white card under the thinking lines that grows 0 → full height in 4 fr (springs.layout), header row with a line count, then code lines typed at 1 line per 3 fr in mono (techniques: stream-text)

## Proposed terms
- cut-on-press: the shot ends on the squash frame of a button press and the next framing already shows the result; the release is never shown (row 3 → 4). Not in craft/vocabulary.md; not used in recipe.json.

## Measurement notes
Resolution: 0.25 s from sheets; frame numbers from the human 30 fps measurements (notes for this reference), consistent with the sheets. Not measurable from sheets: spring overshoot on the bubble and card, exact code line cadence (±0.25 s), first-frame pill shift (±0.25 s). Palette from keyframes (no cut frames exist). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
id prompt-think-result-punch · family ai-chat · 4.97 s, 5 rows (0 detected cuts; split at camera jumps 2.00 s and 3.03 s and at state changes 1.17 s, 3.97 s).
Techniques: 7 (incl. mesh-gradient and hard-cut). cut_on_beat: n/a, 0/0, false; silent, no music, no VO.
Not measurable: bubble/card overshoot, code line cadence (±0.25 s), initial pill shift (±0.25 s).
Proposed terms: cut-on-press. Missing components: MeshGradientBackdrop, ResultCard.
Validation: validate-recipe.mjs valid. Phase B: not run (study only).
