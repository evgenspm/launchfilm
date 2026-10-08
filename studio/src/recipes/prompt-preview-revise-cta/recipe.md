# Prompt to preview card, revised twice

A question types itself word by word, a prompt field grows from a dot and types a request, then a page preview card appears and changes on two short follow-up prompts before a word-by-word close and a mark.

Source: https://www.raylight.app/templates/qtz7LbLv (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A generator product where one prompt produces a visible result
- Showing that the result can be revised with short follow-up instructions
- A silent dark teaser of 15-20 s: one question, one demo, one close
- No real UI yet: the result is a coloured stand-in card (or swap in screenshots)
Not for: products whose value needs a readable result (the card carries no content), or films that need VO or a beat.

## Format
16:9 · 16.47 s · 30 fps · dark · music none (silent), cut_on_beat n/a (0 cuts, 0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.00 | 0–60 | hook | question, 4 words, lowercase, centred; blue glow arc on the bottom edge | static | WordReveal one word per 15 fr (f8, f23, f38, f53), grey to white over ≥ 7 fr, easings.outExpo (±0.25 s); line re-centres | hard-cut | none |
| 2 | 2.00–3.27 | 60–98 | hook | pointer cursor hovers the last word; line drops and leaves | static | cursor-path from lower right, on the word by f68; line drops ~30 % H by f90, easings.inExpo, gone f98 (±0.25 s); glow arc moves bottom edge to top edge f90-f105 | slide-push | swoosh-short |
| 3 | 3.27–5.77 | 98–173 | reveal | prompt field grows from a dot at centre and types a 2-line request (~13 words) | push-in 1.00→1.53 f120-f180, easings.outQuint (±0.25 s) | dot grows to full field by f105, springs.ui (overshoot not measurable); PromptBar ~32 chars/s, wraps at f143, done f165 | hard-cut | type-click |
| 4 | 5.77–7.00 | 173–210 | feature | cursor presses the round send button | push-in ends ~1.55, holds | cursor-path in at f173, on button f180, press f180-f203 springs.click (±0.25 s), gone f210 | hard-cut | ui-confirm |
| 5 | 7.00–8.73 | 210–262 | feature | field glides to the lower third, text clears, muted card slides down from the top | dolly down ~0.2 H f210-f240, easings.inOutSine | text fades f240-f248; card top enters ~f255, easings.outExpo (±0.25 s) | blur-dissolve | swoosh-short |
| 6 | 8.73–10.27 | 262–308 | feature | preview card (upper 60 % of frame) in pink; field below types a 5-word revision | static | fill crossfade muted to pink in 4 fr (f262-f266), card settles by f270 springs.ui; revision typed f278-f285 | hard-cut | pop |
| 7 | 10.27–11.27 | 308–338 | feature | card fill swaps to amber, field clears, a 3-word revision types | static | fill swap within one cell (±0.25 s); typing f315-f323 at ~32 chars/s | hard-cut | pop |
| 8 | 11.27–11.77 | 338–353 | feature | card (now green) and field slide up and out of the top | dolly up ~0.6 H in 15 fr, easings.inExpo | card gone f345, field gone f353 (±0.25 s) | slide-push | swoosh-short |
| 9 | 11.77–14.27 | 353–428 | cta | call to action, 4 words in two short sentences, centred, no glow | static | WordReveal words at f353, f375, f390, f405, same fade as row 1 (±0.25 s); hold to f428 | hard-cut | none |
| 10 | 14.27–16.47 | 428–494 | logo | angular single-colour mark, centred | static | grows ~40 %→100 % f428-f435 springs.snappy (overshoot not measurable); holds 1.6 s; collapses to its top-left corner from f488, easings.inExpo (±0.25 s) | hard-cut | tick |

Evidence per row:
1. sheet-01 cells 0–7 (0.00–1.77), kf-000.50, kf-001.50
2. sheet-01 cells 8–13 (2.00–3.27)
3. sheet-01 cells 13–15, sheet-02 cells 0–7 (3.27–5.77), kf-003.50, kf-004.50, kf-005.50
4. sheet-02 cells 7–11 (5.77–6.77), kf-006.50
5. sheet-02 cells 12–15, sheet-03 cells 0–2 (7.00–8.50), kf-007.50, kf-008.50, cuts/cut-008.73.jpg (before)
6. sheet-03 cells 3–8 (8.77–10.00), cuts/cut-008.73.jpg (after), kf-009.50
7. sheet-03 cells 9–12 (10.27–11.00), kf-010.50
8. sheet-03 cells 13–14 (11.27–11.50), kf-011.50
9. sheet-03 cell 15, sheet-04 cells 0–8 (11.77–14.00), kf-012.50, kf-013.50
10. sheet-04 cells 9–15, sheet-05 cells 0–1 (14.27–16.27), kf-014.50, kf-015.50

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| word-reveal | 1, 9 | craft/vocabulary.md#type, studio API WordReveal |
| horizon-arc | 1–8 | craft/vocabulary.md#brand, HorizonArc |
| glow | 1–8 | craft/vocabulary.md#look, BrandBackdrop glow |
| cursor-path | 2, 4 | craft/04-motion.md#springs (click), Cursor |
| slide-push | 2, 8 | craft/vocabulary.md#transitions |
| prompt-typing | 3, 6, 7 | PromptBar |
| ui-rebuild | 3–8 | prompt field and preview card are rebuilt, no recording |
| push-in | 3–4 | Camera, craft/04-motion.md#easings |
| dolly | 5, 8 | Dolly |
| blur-dissolve | 5→6 | craft/vocabulary.md#transitions (4 fr fill crossfade) |
| logo-from-dot | 10 | LogoReveal variant from-dot |

## Look
Palette: #181A19 background near-black, #EBEBEB text and mark, #171E4F edge glow (deep blue, brightest ~#1A2A9A at the rim), #EC9695 preview fill 1, #474847 field border and muted UI, #6D799B glow falloff. Other preview fills seen, not in the sampled palette: amber ~#E09A1A, green ~#1DB07E. Type: geometric rounded sans, regular, lowercase question and sentence-case close, ~4.5 % H; prompt text ~3 % H. Treatment: glow. Background: flat near-black with one soft elliptical blue glow on the bottom edge (rows 1–2), then the top edge (rows 3–8), none in rows 9–10.

## What to adapt
- Copy: 1 question (3–5 words), 1 request (10–15 words, 2 lines), 2 revisions (3–6 words each), 1 close (≤ 4 words). Exactly 5 lines.
- Brand: the accent carries the edge glow; the mark closes the film; preview fills can be brand colours or real screenshots of the generated result.
- Timing: rows 3 and 6–7 stretch with prompt length (32 chars/s); keep the 15 fr word gap in rows 1 and 9 and the 15 fr exits in rows 2 and 8.

## Pitfalls
- The demo card has no content; if the product's output is what sells, replace fills with screenshots or the beat loses meaning.
- The edge glow must move with the layout (bottom to top) or the composition feels top-light in the prompt rows.
- Keep the follow-up prompts short: the two revision rows last 1.0–1.5 s each.

## Missing components
- PreviewCard: rounded rectangle 49 % W × 57 % H with a fill or image that crossfades in 4 fr on each revision, slides in from the top edge (techniques: ui-rebuild, blur-dissolve)

## Proposed terms
- dot-to-field grow: a UI field expands from a small dot at frame centre into its full rounded box in ~7 fr (row 3) (not in craft/vocabulary.md; not used in recipe.json)
- result fill swap: a result stand-in changes fill on each submitted revision (rows 6–8) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strip extracted. Not measurable: word fade length, spring overshoot on the field grow, cursor press and mark, exact typing cadence. motion.json zoom 37 %/s with −4.8° rotation at 9–11 s contradicts the sheets (static layout): the flat card fill fooled the block matcher; sheets win. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats). Palette from palettegen on kf-001.50, kf-009.50, kf-015.50.

## Study log
id prompt-preview-revise-cta · family product-ui · 16.47 s, 10 rows, 0 hard cuts, 1 soft (8.73–8.87, fill crossfade)
techniques 11 · cut_on_beat n/a (silent, 0 cuts) · difficulty medium · render_cost light
not measurable at 0.25 s: fade lengths, overshoot, typing cadence below ±8 fr
proposed terms: dot-to-field grow, result fill swap
missing components: PreviewCard
phase B: not run
