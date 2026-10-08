# Dark prompt, model menu, typed code, mark close

A glowing mark drops into a dark frame and becomes a lockup, then one continuous camera pushes over a prompt bar: typing, a model menu pick, send, a spinner, a code window typing itself, which collapses back into the mark.

Source: https://www.raylight.app/templates/XURkSmRa (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- Launching an AI assistant or a model picker where the prompt UI is the hero
- A coding assistant that shows one request turning into code
- Silent autoplay feeds: the story reads from UI states alone, no VO
- A dark, serif, restrained brand that wants one unbroken shot
Not for: products without a prompt or text-input UI; films that need claims, numbers or a URL on screen (there is no copy beyond one greeting line and one request).

## Format
16:9 · 24.27 s · 30 fps · dark · no music (silent reference), cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.27 | 0–68 | hook | empty dark frame; small white glowing star mark falls in from the top and settles near centre | static | enters 0.27–0.50, centre by 1.00, springs.heavy ~20 fr (overshoot not measurable); drift down-left ~2 % W to 2.00; white glow halo | hard-cut | none |
| 2 | 2.27–3.77 | 68–113 | logo | one-word wordmark joins the mark as a centred lockup with wide glow, then shrinks and fades | static | wordmark reveals left to right < 8 fr (±0.25 s); scales ~0.55x by 2.77, easings.outExpo ~8 fr (±0.25 s); fades 3.27–3.50 | blur-dissolve | none |
| 3 | 3.77–7.00 | 113–210 | reveal | greeting line, 5 words, with accent mark, above a rounded prompt bar (placeholder, plus, model + effort selector, mic, send) | push-in 1.00→1.50 over 97 fr, drifting right, easings.inOutSine | greeting + bar fade up 15 fr; caret slides in from the right at 6.00, parks by 6.50; placeholder fades at 6.77, 7 fr (±0.25 s) | hard-cut | none |
| 4 | 7.00–8.77 | 210–263 | feature | the field types a request, 5 words + ellipsis; send button lights in accent at first character | push-in ~1.50→1.55, drift right then up | Typewriter ~13 chars/s, block caret; send fill on first keystroke (±0.25 s) | hard-cut | type-click |
| 5 | 8.77–11.27 | 263–338 | feature | dropdown from the model selector: 4 options with one-line descriptions + an effort row; cursor picks the top option | dolly: left ~230 px/s @1920 (8.77–9.27), up ~170 px/s (9.50–9.77), hold; easings.inOutSine | menu grows down, springs.layout ~10 fr (±0.25 s); cursor-path from lower right at 9.27 to top option by 10.00, click 11.00; menu fades 7 fr; selector label swaps | hard-cut | tick |
| 6 | 11.27–15.50 | 338–465 | feature | cursor clicks send; UI fades, a dotted spinner alone in the centre grows, spins, shrinks away; then empty dark | pull back to 1.00, easings.inOutSine 15 fr (11.27–11.77); then static | click squash 11.27; UI fade 11.50–11.77; spinner 0.5→1.0 by 12.50 (springs.ui), linear rotation, hold to 13.27, shrink + dim 13.50–14.00, gone 14.27; empty 14.27–15.50 | hard-cut | tick |
| 7 | 15.50–19.27 | 465–578 | feature | tall portrait code window (three dots, centred title) grows in the centre and types a short script line by line in syntax colours | static | window 0.7→1.0, springs.ui 15 fr (overshoot not measurable); code from 16.50 ~3 lines/s: imports green, functions blue-violet, body near-white, keywords magenta; ~17 lines by 19.00 | hard-cut | type-click |
| 8 | 19.27–20.27 | 578–608 | feature | code clears; the empty window outline collapses to a tiny rectangle at centre and vanishes | static | content fades 7 fr; outline 1.0→0.3 by 19.77, 0 by 20.27, easings.inExpo ~30 fr (±0.25 s) | hard-cut | none |
| 9 | 20.27–22.27 | 608–668 | logo | star mark returns large and soft grey, settles small, white and crisp | static | appears 20.50 at ~3x, blurred; settles by 21.00, springs.snappy 15 fr (overshoot not measurable); holds | hard-cut | swell |
| 10 | 22.27–24.27 | 668–728 | logo | wordmark joins the mark: closing lockup, no glow, held to the end | static | wordmark in within one cell (< 8 fr, ±0.25 s); hold 60 fr | hard-cut | none |

Evidence per row: 1 `sheet-01 cells 0–8`; 2 `sheet-01 cells 9–14`, `keyframes/kf-002.50.jpg`; 3 `sheet-01 cell 15`, `sheet-02 cells 0–11`; 4 `sheet-02 cells 12–15`, `sheet-03 cells 0–3`; 5 `sheet-03 cells 3–12`, `keyframes/kf-009.50.jpg`; 6 `sheet-03 cells 13–15`, `sheet-04 cells 0–13`; 7 `sheet-04 cells 14–15`, `sheet-05 cells 0–12`, `keyframes/kf-018.50.jpg`; 8 `sheet-05 cells 13–15`, `sheet-06 cells 0–1`; 9 `sheet-06 cells 2–8`; 10 `sheet-06 cells 9–15`, `sheet-07 cell 0`, `keyframes/kf-023.50.jpg`. No cut frames exist (cuts.json is empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| push-in | 3–4 | craft/04#camera, Camera |
| dolly | 5–6 | craft/04#camera, Dolly |
| prompt-typing | 3–4, 6 | craft/families (ai-chat), PromptBar |
| typewriter | 4, 7 | Typewriter / useTypewriter |
| cursor-path | 5–6 | Cursor |
| thinking-state | 6 | Spinner, ThinkingState |
| ui-rebuild | 3–8 | prompt bar, menu and code window rebuilt in React |
| glow | 1–2 | look: Bloom / soft halo behind the mark |

## Look
Palette: #1A1A1A background, #EBEBEB foreground text, #D87755 accent (greeting mark, send button), #9A9A9A muted (descriptions, placeholder), #3B2D87 code function colour, #899F82 code import colour. Type: book serif throughout, sentence case, normal tracking; opening lockup ~8 % H, greeting ~4 % H, UI labels ~2.5 % H, code ~1.5 % H. Treatment: glow (only on the opening mark and lockup). Background: flat near-black with a faint radial lift behind the opening lockup.

## What to adapt
- Copy: one greeting line (~5 words), one placeholder (~5 words), one request (3–6 words), 4 menu options (name + one-line description), one effort value, a 12–18 line code snippet, a window title.
- Brand: accent colours the greeting mark and the send button only; the mark and wordmark bookend the film (rows 1–2 and 9–10).
- Timing: rows 3–5 can stretch with longer copy; keep the 1.2 s empty beat (row 6 end) and the collapse (row 8, 30 fr) as they are, they set up the mark return.

## Pitfalls
- There is no cut anywhere: every scene change is a fade or scale through the dark background; adding hard cuts breaks the single-take feel.
- The camera only moves during the prompt section (3.77–11.77); the code window and both logo moments are static.
- The send button lights at the first keystroke, not at send; the selector label must swap to the picked option before the send click.
- The code window is portrait (~0.36 W × 0.85 H at 16:9); a landscape window loses the "growing script" read.

## Missing components
- ModelMenu: dropdown anchored under a selector, 4 rows (name + muted description), divider, a key/value row; grows down on springs.layout 10 fr, hover highlight, fades 7 fr (techniques: prompt-typing, cursor-path)
- CodeTyper: line-by-line code reveal with syntax colours, ~3 lines/s, inside MacWindow (techniques: typewriter)
- CollapseToPoint: element outline scales to 0 at its centre on easings.inExpo 30 fr (techniques: none in vocabulary)

## Proposed terms
- model-menu-pick: a dropdown of model options opens under the prompt selector and the cursor picks one (row 5) (not in craft/vocabulary.md; not used in recipe.json)
- collapse-to-mark: the last UI element shrinks to a point where the brand mark then appears (rows 8–9) (not in craft/vocabulary.md; not used in recipe.json)
- mark-scale-settle: mark appears oversized and blurred, settles to final size and focus (row 9) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strips taken; the source file is not in the job's allowed inputs). Not measurable: overshoot of any spring, wordmark reveal speed, exact typing cadence, menu entrance length. Camera scale from prompt-bar width across cells (sheet-02 cell 0 vs cell 12). Palette from palettegen on keyframes 2.50 / 9.50 / 18.50 / 23.50 (no cut frames); accent sampled from mark pixels at 9.50 s. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
id prompt-menu-code-mark-film · family ai-chat · 24.27 s, 10 rows, 0 hard cuts (rows split at state changes)
techniques 8 (push-in, dolly, prompt-typing, cursor-path, thinking-state, typewriter, ui-rebuild, glow)
cut_on_beat: n/a, silent reference, 0/0
not measurable at 0.25 s: spring overshoot, wordmark reveal, typing cadence, menu entrance
proposed terms: model-menu-pick, collapse-to-mark, mark-scale-settle
missing components: ModelMenu, CodeTyper, CollapseToPoint
phase B: not run
