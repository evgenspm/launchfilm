# Horizon arc into prompt bar and generated image

A mark on black, then a lit planet rim rises under it and folds into a glowing prompt bar. A request is typed, a cursor sends it, the result grows out of the send button to full bleed, and a wipe returns to the mark.

Source: https://www.raylight.app/templates/u0sjpuOB (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- An AI tool that turns a typed prompt into a visual result (image, design, video still).
- A short teaser where the brand moment (rim light-on) and the product moment (prompt to result) share one continuous shot.
- Dark brands with one accent colour that can carry a glow.
- Silent autoplay: the typed prompt explains the product, no VO needed.
Not for: products with no visual output (text answers, back-end tools), light brands where the rim glow has nothing to burn against.

## Format
16:9 · 14.04 s · 30 fps · dark · music 129.6 BPM, cut_on_beat 1/2 = 0.5 (false) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.77 | 0–23 | hook | white mark alone, centred high on pure black | locked-off; mark turns ~8 deg/s, shrinks slightly | rotation easings.outQuint 23 fr (±0.25 s) | hard-cut | none |
| 2 | 0.77–1.30 | 23–39 | logo | mark slides left, wordmark types in; huge black disc with a white-hot violet rim rises below | locked-off; mark drifts ~0.1 W | rim light-on 12 fr ease-out (f21–f33), rise 0.600 H → 0.588 H over 18 fr; wordmark ~14 cps; slide easings.outExpo 12 fr (±0.25 s) | morph | swell |
| 3 | 1.30–2.00 | 39–60 | reveal | disc flattens into a wide pill; rim becomes the prompt bar border, placeholder appears | locked-off; lockup lifts ~0.05 H | arc → pill springs.layout 12–15 fr (overshoot not measurable) | hard-cut | none |
| 4 | 2.00–2.77 | 60–83 | feature | lockup and bar hold; frame travels so the bar runs off the right edge, placeholder clears | dolly right + push-in ~1.00 → 1.15 over 23 fr | camera easings.inOutSine 23 fr (±0.25 s) | hard-cut | none |
| 5 | 2.77–4.77 | 83–143 | feature | image request of ~5 words typed; mic and round send button at the right end | dolly back left following the caret | typing ~25 cps 2.77–4.00; send button springs.ui ~10 fr (±0.25 s); hold 0.77 s | hard-cut | type-click |
| 6 | 4.77–6.00 | 143–180 | feature | frame pushes to the send end, lockup leaves left; pointer enters and clicks send | dolly left + push-in ~3 %/s | cursor springs.ui ~15 fr (±0.25 s), press springs.click; button turns into a white rounded square | hard-cut | ui-confirm |
| 7 | 6.00–7.13 | 180–214 | proof | rounded card grows out of the button; generated landscape fades in inside it, glowing border | slow push-in ~1.5 %/s | card springs.pop ~15 fr (overshoot not measurable); image opacity ~15 fr (±0.25 s) | hard-cut | none |
| 8 | 7.13–7.63 | 214–229 | proof | image card expands to fill the frame, corners flatten | card expand to full bleed | easings.inOutSine 15 fr (soft transition 7.13–7.63) | morph | whoosh |
| 9 | 7.63–9.27 | 229–278 | proof | full-bleed image; small translucent pill with a 3-word tagline drops to centre | hold, push ~2.7 %/s easing to 0 | pill springs.ui ~15 fr (±0.25 s), holds 1.2 s | hard-cut | none |
| 10 | 9.27–9.83 | 278–295 | proof | image breaks into coarse pixel blocks, light grey plate covers it from the top | locked-off; plate travels down | pixel steps every ~3 fr (±0.25 s); plate easings.inExpo ~6 fr (±0.25 s) | mask-wipe | swoosh-short |
| 11 | 9.83–10.77 | 295–323 | logo | plate wipes off upward, black with the mark centred, small | push-in ~15 %/s settling | plate exit easings.outExpo ~8 fr (±0.25 s); mark springs.snappy (overshoot not measurable) | hard-cut | none |
| 12 | 10.77–13.00 | 323–390 | logo | wordmark types in beside the mark; grey lockup holds centred | push-in ~1.2 %/s constant | wordmark ~14 cps; easings.linear push | mask-wipe | type-click |
| 13 | 13.00–14.04 | 390–421 | logo | dark grey stepped plate creeps in from lower right, lockup dims to near black | push-in ~1.2 %/s constant | plate easings.inOutSine ~30 fr; lockup fade ~30 fr | hard-cut | swoosh-short |

Evidence per row: 1 `sheet-01 cells 0–2`; 2 `sheet-01 cells 3–5`, notes.md light-on; 3 `sheet-01 cells 5–7, 8`; 4 `sheet-01 cells 8–11`; 5 `sheet-01 cells 11–15`, `sheet-02 cells 0–3`; 6 `sheet-02 cells 3–8`; 7 `sheet-02 cells 8–12`, `cuts/cut-007.13.jpg` (before); 8 `sheet-02 cells 12–14`, `cuts/cut-007.13.jpg` (after); 9 `sheet-02 cell 15`, `sheet-03 cells 0–4`; 10 `sheet-03 cells 5–7`, `cuts/cut-009.83.jpg` (before); 11 `sheet-03 cells 8–10`, `cuts/cut-009.83.jpg` (after); 12 `sheet-03 cells 11–15`, `sheet-04 cells 0–4`; 13 `sheet-04 cells 4–8`.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| horizon-arc | 2, 3 | craft/families/brandmark.md, studio HorizonArc |
| morph | 2→3, 8 | craft/09-transitions.md#morph |
| typewriter | 2, 12 | craft/05-typography.md |
| prompt-typing | 3–6 | studio PromptBar, craft/13-ui-recreation.md |
| cursor-path | 6 | craft/03-camera-and-staging.md#cursor-and-keycaps |
| dolly | 4, 5, 6 | craft/03-camera-and-staging.md |
| push-in | 4, 6, 7, 9, 11–13 | craft/03-camera-and-staging.md#drift-and-push-in |
| mask-wipe | 10, 12→13 | craft/09-transitions.md#mask-wipe |
| ui-rebuild | 3–7 | craft/13-ui-recreation.md |
| glow | 2–7 | craft/06-look.md |

## Look
Palette: #000000 background, #F2F2F2 foreground (mark, prompt text), #555382 rim falloff / accent, #231F53 and #0E0A2E deep violet atmosphere, #9C9C9C end lockup grey. Rim core near white (#FFFCFF) per hand measurement. Type: humanist sans, regular weight, sentence case wordmark ~6 % H; prompt text ~2 % H light grey. Treatment: glow. Background: flat black; full-bleed photo in rows 8–10.

## What to adapt
- Copy: wordmark (typed twice), placeholder (2–3 words), prompt (~5 words, one concrete request), tagline (3 words, the promise).
- Brand: the accent carries the rim glow and the bar border; the mark opens and closes the film.
- Timing: rows 5 and 9 can stretch with a longer prompt or a longer look at the result; rows 2–3 must keep the 12 fr light-on and the arc → pill morph in ~0.5 s.

## Pitfalls
- The rim barely rises (0.012 H over 18 fr): the event is the light, not the move. A big rise reads as a sunrise cliché.
- The disc must be much larger than the frame (radius ~0.39 W, centre ~1.30 H): a full circle in frame reads as a shape, not a planet.
- The rim core is only 4–5 px; a thick border kills the expensive look.
- Text inside the glow should read lavender, not pure white.
- The result has to come out of the send button (rows 6–8); cutting to it breaks the cause and effect.

## Missing components
- CardExpand: a rounded card born at a UI anchor scales to full bleed, radius → 0, 15 fr inOutSine (techniques: morph)
- PixelateDissolve: image quantised into growing blocks in 3 fr steps over ~0.5 s (techniques: proposed pixelate-dissolve)
- StepPlateWipe: dark plate with stair-stepped edge creeping in from a corner over ~30 fr (techniques: mask-wipe)
- ArcToPill: HorizonArc rim morphing into the PromptBar border, 12–15 fr springs.layout (techniques: horizon-arc, morph)

## Proposed terms
- card-expand: a UI card grows from its spot to full bleed and becomes the next shot (row 8) (not in craft/vocabulary.md; not used in recipe.json)
- pixelate-dissolve: picture breaks into coarse blocks before an exit (row 10) (not in craft/vocabulary.md; not used in recipe.json)
- stepped-plate-wipe: stair-edged plate creeping over the end card (row 13) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; rim geometry and light-on (12 fr, f21–f33) from the human frame-by-frame notes at 30 fps. Not measurable: entrance overshoot, cursor path frames, typing cadence below 0.25 s, pixel step rate. Pan/zoom rates from motion.json per-second estimates. Palette from palettegen on keyframes 2.50, 7.50, 12.50 s (cut frames are split before/after images). SFX planned by the glue rule, not measured. cut_on_beat = 1/2 cuts within ±2 fr (soft 7.13 vs beat 7.129 yes; hard 9.83 vs 9.59 / 10.205 no).

## Study log
- id horizon-arc-prompt-reveal · family ai-chat · 14.04 s · 13 rows (1 hard cut, 1 soft, rest state changes).
- 10 techniques; cut_on_beat 0.5 (false); 129.6 BPM, energy medium, no VO.
- Not measurable at 0.25 s: overshoot, cursor path, typing cadence, pixelate steps.
- Proposed terms: card-expand, pixelate-dissolve, stepped-plate-wipe.
- Missing components: CardExpand, PixelateDissolve, StepPlateWipe, ArcToPill.
- Phase B: not run (study only).
