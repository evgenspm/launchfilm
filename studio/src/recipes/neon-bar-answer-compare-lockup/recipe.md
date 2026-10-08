# Neon search bar to answer, compare and lockup

A search bar glows green on black with light streaks, a question pill lands, dots think, a step-by-step answer card fills in, a two-panel us-vs-them compare holds, then a glowing wordmark, tagline and button close. One shot, 8 s.

Source: https://www.raylight.app/templates/EvqCnDk5 (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- Showing an AI assistant answering one developer question end to end
- A short silent teaser for a chatbot or docs assistant on a dark, neon brand
- Closing a product tour with a quick ours-vs-others comparison and a start button
Not for: light brands, products with no chat or answer surface, films that need a long feature list.

## Format
16:9 · 8.13 s · 30 fps · dark · music none (no bpm), cut_on_beat 0/0 · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.50 | 0–45 | hook | empty search bar with thick green halo on black, diagonal light streaks and a curved ribbon behind | drift right to left across frame, zoom ~+4.6 %/s | bar + halo in by 0.27 s (suggested outExpo 8 fr, ±0.25 s); streaks easings.linear; scene dims 1.27 to 1.50 s (suggested inOutSine 7 fr) | continuous | whoosh (planned) |
| 2 | 1.50–2.50 | 45–75 | feature | question pill (7 words) top right in solid green, faint radial pool, thinking dots left | static | pill in under 0.25 s (suggested springs.ui ~10 fr, overshoot not measurable); 1 dot at 1.77 s, 3 dots 2.00 to 2.27 s | continuous | pop (planned) |
| 3 | 2.50–4.50 | 75–135 | feature | navy answer card: intro line, 3 numbered steps, one mono code field | static, card re-centres left at 3.00 s | frame + intro 2.50 s; step 1 + code field 2.77 s; code types 3.00 to 3.27 s; steps 2, 3 by 3.27 s; hold to 4.27 s (per-line stagger below 0.25 s not measurable) | continuous | type-click (planned) |
| 4 | 4.50–6.50 | 135–195 | proof | two labelled panels (ours, others): skeleton lines + glowing button vs mismatched blocks + outlined bar | drift, pan ~31 px/s left, zoom ~-2.6 %/s then ~-0.8 %/s | panels fade in over centre glow 4.50 s; blocks slide in 4.77 s; settled 5.00 s (suggested springs.ui ~10 fr, ±0.25 s); outline bar grows 5.00 to 5.27 s | continuous | tick (planned) |
| 5 | 6.50–7.25 | 195–218 | logo | bright green wordmark centred in a teal radial glow, 4-word tagline with ellipsis below | static | wordmark present at 6.50 s (suggested blur-dissolve 6 fr); tagline 6.77 s (suggested outQuint 8 fr) | continuous | none |
| 6 | 7.25–8.13 | 218–244 | cta | same lockup plus a rounded solid green 2-word start button | static | button at 7.27 s (suggested springs.pop ~10 fr, overshoot not measurable); hold 26 fr | end | ui-confirm (planned) |

Evidence per row: 1 = sheet-01 cells 0–5; 2 = sheet-01 cells 6–9; 3 = sheet-01 cells 10–15, sheet-02 cells 0–1; 4 = sheet-02 cells 2–9; 5 = sheet-02 cells 10–12; 6 = sheet-02 cells 13–15, sheet-03 cell 0. No cut frames (cuts.json is empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| glow | 1, 4, 5 | craft/vocabulary.md#look |
| thinking-state | 2 | craft/vocabulary.md (ThinkingState, TypingDots) |
| stream-text | 3 | craft/vocabulary.md (StreamText) |
| ui-rebuild | 2–4 | craft/vocabulary.md |
| end-card | 5–6 | craft/vocabulary.md (EndCard) |

## Look
Palette: #000000 background, #000E15 navy card surface, #41D69C bright accent (wordmark, button), #2C8E6C mid green (pill, glow), #14815A halo, #05332B deep glow pool; UI text white (not in palettegen). Type: geometric sans; small sentence-case UI copy about 2 % H; wordmark bold, tight, about 8 % H; mono code line. Treatment: glow. Background: flat black with a soft green radial gradient behind the subject.

## What to adapt
- Copy: one question (5 to 8 words), an answer intro + 3 steps (one with a short code line), two compare labels, wordmark, tagline (3 to 5 words), CTA (2 words).
- Brand: the accent carries halo, pill, compare button, wordmark and CTA; keep background near black so the glow reads.
- Timing: rows 3 and 4 can stretch to fit longer answers; keep row 1 short (about 45 fr) and the button hold at least 26 fr.

## Pitfalls
- The bar is never typed into in the sheets: the question jumps straight to a pill. Adding typing lengthens row 1 well past 1.5 s.
- The halo is huge (about 1.5× bar height on each side); a thin glow loses the hook.
- Answer card is low contrast navy on black; keep a thin teal border or it disappears.

## Missing components
- CompareSplit: two equal panels with labels above, a shared centre glow between them, per-panel children fading in with a 0.25 s stagger (techniques: ui-rebuild, glow)
- LightStreaks: 2 to 4 thin accent lines and one curved ribbon sweeping diagonally at constant speed behind a subject, about 0.8 frame widths per second (techniques: glow)

## Proposed terms
- light-streak sweep: thin glowing lines and a ribbon crossing the frame diagonally behind the subject, row 1 (not in craft/vocabulary.md; not used in recipe.json)
- split-compare: side-by-side ours vs others panels as proof, row 4 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strip (source file not available locally). Not measurable: entrance curves, overshoot, line staggers, exact switch frames at 1.50, 4.50 and 6.50 s. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats). Palette from palettegen on keyframes at 0.5, 2.5, 5.5, 7.5 s.

## Study log
id neon-bar-answer-compare-lockup · family ai-chat · 8.13 s, 6 rows, one continuous shot (0 cuts)
techniques 5 (glow, thinking-state, stream-text, ui-rebuild, end-card) · cut_on_beat n/a (0/0), silent, no VO
not measurable: motion curves, overshoot and staggers below 0.25 s (4 fps sheets only, no strip)
proposed terms: light-streak sweep, split-compare
missing components: CompareSplit, LightStreaks
phase B: not run
