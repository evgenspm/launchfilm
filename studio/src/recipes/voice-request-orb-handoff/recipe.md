# Voice request handed to an orb agent

On a pale blue field a caret writes a two-line hook, a voice tile grows into a live transcript, a glowing orb answers, then shrinks into an activity card and fans out into reply bubbles in many languages. One continuous camera, no cuts.

Source: https://www.raylight.app/templates/7J98wdMm (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A voice or phone agent that takes a spoken request and acts on it
- One request shown travelling from input to answer to logged result in a single shot
- A calm, light, silent product teaser where UI pieces morph into each other
- Multilingual support as the closing capability
Not for: products with no conversational input; films that need a logo or URL on screen (the reference shows neither, the last 2.56 s are empty)

## Format
16:9 · 18.83 s · 30 fps · light · music none, cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.77 | 0–53 | hook | empty gradient, caret, 2-word line naming the subject written out | static | caret in at 0.27 s; line revealed 0.77–1.27 s, easings.outQuint ~15 fr (±0.25 s) | mask-wipe | type-click |
| 2 | 1.77–2.27 | 53–68 | problem | first word wiped, second 2-word line (urgency) replaces it | push-in starts, 18 %/s | word-swap via caret wipe within 15 fr (±0.25 s), easings.outQuint | morph | type-click |
| 3 | 2.27–4.00 | 68–120 | reveal | voice tile with 5 bars lands right of the line; line leaves left; tile widens to a transcript pill | push-in 18 %/s, then dolly left 364 px/s @1920 | tile springs.pop 8 fr (overshoot not measurable); bars pale to blue 15 fr; pill springs.layout ~15 fr (±0.25 s); typewriter ~16 cps | morph | pop |
| 4 | 4.00–5.00 | 120–150 | feature | transcript pill types a ~8-word request, scrolls past the bars | near static; text scroll ~12 px/fr (±0.25 s) | typewriter ~16 cps, easings.linear scroll | morph | type-click |
| 5 | 5.00–6.50 | 150–195 | feature | pill becomes a big input field + round send button; 1-word key detail typed big; both leave left | pull-out -18 %/s, then dolly with the field | field springs.layout ~15 fr; word typed 5.50–5.77 s; button separates 6.00–6.27 s; easings.inExpo exit ~8 fr (±0.25 s) | slide-push | swoosh-short |
| 6 | 6.50–9.77 | 195–293 | feature | glossy blue orb with glow, reply pill streams a ~7-word confirmation | dolly, pan -277 px/s at 8–9 s, roll 1–4° | orb springs.heavy ~25 fr (±0.25 s); pill springs.ui 10 fr; stream-text 7.27–9.27 s ~4 words/s, status word in accent | morph | shimmer |
| 7 | 9.77–11.50 | 293–345 | proof | orb shrinks into the corner badge of a frosted activity card with 2 logged rows (handled call + waveform, booked slot + calendar + status chip) | pull-out -7 %/s, then push +3.6 %/s | orb springs.cameraOut ~15 fr; card fades 8 fr; rows stagger ~4 fr (±0.25 s), springs.ui | zoom-tier | pop |
| 8 | 11.50–13.27 | 345–398 | proof | camera climbs to row 2, pushes in until only its status chip remains; chip slides out left on a thin line | dolly up 380 px/s, then push-in +27 %/s with pan -506 px/s | zoom-tier card→element on springs.cameraIn ~30 fr (±0.25 s) | slide-push | ui-confirm |
| 9 | 13.27–14.27 | 398–428 | feature | thin line leads to a white reply bubble, 4 words, a thank-you | static, then slight pull-out | bubble fade 8 fr (±0.25 s), easings.outQuint | pull-out | notification |
| 10 | 14.27–16.27 | 428–488 | feature | bubble shrinks, 6 bubbles with the same reply in other languages fade in around it, float, then scatter out | pull-out -3.8 %/s, drift +2.9 %/s | stagger ~4 fr (±0.25 s), drift ~2 px/fr; scatter at 16.00 s, easings.inExpo ~8 fr | blur-dissolve | notification |
| 11 | 16.27–18.83 | 488–565 | feature | empty pale blue mesh gradient holds | static | none | hard-cut | |

Evidence per row (no cut frames: cuts.json is empty; keyframes used for palette):
1. sheet-01 cells 0–7
2. sheet-01 cells 7–9
3. sheet-01 cells 9–15
4. sheet-02 cells 0–3
5. sheet-02 cells 4–10
6. sheet-02 cells 10–15, sheet-03 cells 0–7
7. sheet-03 cells 7–14
8. sheet-03 cells 14–15, sheet-04 cells 0–5
9. sheet-04 cells 5–9
10. sheet-04 cells 9–15, sheet-05 cell 0
11. sheet-05 cells 1–11

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| mask-wipe | 1 | craft/vocabulary.md#transitions |
| word-swap | 2 | craft/vocabulary.md#type (WordSwap) |
| typewriter | 3, 4, 5 | craft/vocabulary.md#type (Typewriter) |
| stream-text | 6 | craft/vocabulary.md#ui (StreamText) |
| morph | 2, 3, 4, 6 | craft/vocabulary.md#transitions (PillMorph) |
| push-in | 2, 3, 8 | craft/04-motion.md, Camera |
| pull-out | 5, 7, 9, 10 | craft/vocabulary.md#camera |
| dolly | 3, 5, 6, 8 | Dolly |
| zoom-tier | 7, 8 | Camera |
| slide-push | 5, 8 | craft/vocabulary.md#transitions |
| ui-rebuild | 3–10 | craft/vocabulary.md#ui |
| list-assemble | 7 | ListAssemble / StatusCard rows |
| blur-dissolve | 10 | craft/vocabulary.md#transitions |
| glow | 6, 7 | look |
| mesh-gradient | 1–11 | look |

## Look
Palette: #F4F9FE background white-blue, #E7F2FD and #C8E1FD gradient blobs, #71A4F2 accent (bars, orb, chips, label), #97A8BE muted UI text. Type: regular-weight geometric grotesk, sentence case, normal tracking; hook ~5 % H growing to ~8 % H; UI text 1.5–3 % H; small uppercase blue card label. Treatment: glow, mesh-gradient. Background: soft blue mesh gradient, brighter at centre, darker blue at the left edge and corners.

## What to adapt
- Copy: hook 2 + 2 words (second replaces first); request ~8 words; key detail 1 word; reply ~7 words with a status word first; 2 log rows (title + sub + status); thank-you 4 words plus 6 translations.
- Brand: accent paints voice bars, orb body, card label, status chips and the send button arrow; background tints toward the accent.
- Timing: rows 6 and 10 can stretch with longer text; rows 2, 3 and 5 morphs keep their ~15 fr; row 11 is a free end card slot.

## Pitfalls
- The film never cuts: every scene change is a morph or a camera move; a hard cut anywhere breaks the idea.
- Text stays readable only while the camera holds; the reference types while the camera travels, so keep pan speed ≤ 12 px/fr during typing.
- Row 11 shows nothing for 2.56 s; in a launch film put an end card there or trim it.

## Missing components
- CaretWipe: a vertical caret that reveals text behind it and wipes a word out in place, 15 fr per word (techniques: mask-wipe, word-swap)
- VoiceTile: rounded square with 5 vertical bars that fills to accent then widens into a transcript pill, springs.layout 15 fr (techniques: morph, typewriter)
- BubbleCloud: N reply bubbles fanned around a centre bubble, staggered 4 fr, drifting 2 px/fr, scatter exit inExpo 8 fr (techniques: notification-like fan)

## Proposed terms
- caret-wipe: a caret that writes and erases text in place, rows 1–2 (not in craft/vocabulary.md; not used in recipe.json)
- voice-bars: animated voice level bars inside a tile or pill, rows 3–4
- agent-orb: glossy glowing sphere that stands for the AI agent and shrinks into a badge, rows 6–7
- bubble-cloud: a reply fanned out into many translated bubbles around it, row 10

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strips extracted). Camera speeds from motion.json per second. Not measurable: spring overshoot, exact stagger, typing cps (estimated from sheet cells, ±0.25 s). Palette from palettegen on keyframes kf-003.50, kf-008.50, kf-011.50, kf-014.50 (no cut frames exist). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no music).

## Study log
id voice-request-orb-handoff · family ai-chat · 18.83 s, 11 rows, one continuous shot (0 cuts)
techniques 15 (13 + look glow, mesh-gradient) · cut_on_beat n/a (0 cuts, silent, no beats)
not measurable: springs overshoot, staggers, typing cps (±0.25 s from 4 fps sheets); camera from motion.json
proposed terms: caret-wipe, voice-bars, agent-orb, bubble-cloud
missing components: CaretWipe, VoiceTile, BubbleCloud
catalogue hint card-grid not seen (single card); glow confirmed
phase B: not run
