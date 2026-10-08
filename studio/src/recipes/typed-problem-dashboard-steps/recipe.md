# Typed problem to tilted dashboard with stepped capabilities

A caret types the pain on white, a short phrase types its accent word, the product name fades in, then a tilted dashboard card slides in and a pointer steps through three capability rows before the labels clear and one icon holds.

Source: https://www.raylight.app/templates/UCqDDKhP (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A service product whose story is one pain, one name, one dashboard
- Silent feed teaser: typing carries the problem without VO
- Three capabilities shown next to a single hero screen
- Light, calm SaaS brands with one accent colour
Not for: products with many screens or a demo flow (only one static card is shown); loud, beat-driven launches.

## Format
16:9 · 13.5 s · 30 fps · light · no music (silent reference), cut_on_beat n/a · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.00 | 0–30 | hook | empty white, thin caret blinks left of centre | static | caret on at 0.27 s, blink ~2 Hz (±0.25 s) | hard-cut | none |
| 2 | 1.00–2.27 | 30–68 | problem | problem sentence, 6 words, typed in grey; line scrolls left to follow the caret | line pans left with caret from 1.77 s, easings.linear | typewriter ~22 chars/s (±0.25 s); scrolls off left | hard-cut | type-click |
| 3 | 2.27–3.27 | 68–98 | problem | 3-word phrase centred, dark; last word typed in accent | static | accent word typed ~10 chars/s over 15 fr (±0.25 s); hold 7 fr; fade to ~15 % by 3.27 s, easings.outQuint ~8 fr (±0.25 s) | blur-dissolve | type-click |
| 4 | 3.27–4.50 | 98–135 | reveal | intro word + product name in accent, larger; intro word leaves, name recentres | static | fade in 0.25 s, springs.ui (overshoot not measurable); name slides to centre ~8 fr (±0.25 s); blurs out by 4.50 s | blur-dissolve | none |
| 5 | 4.50–5.77 | 135–173 | reveal | 2-word headline left, tilted dashboard card slides in from right; headline erased right to left | pull-out: card travels left and shrinks (zoom -18 %/s, pan -103 px/s), easings.inOutSine | card enters at 4.77 s, springs.heavy ~30 fr; backspace erase from 5.50 s | hard-cut | whoosh |
| 6 | 5.77–6.77 | 173–203 | feature | card settled left 60 % W; three capability rows (line icon + label, dividers) fade in right | drift left ~15 px/s | rows fade in top to bottom, stagger ~2 fr, easings.outQuint ~8 fr (±0.25 s) | hard-cut | none |
| 7 | 6.77–7.77 | 203–233 | feature | accent pointer triangle on row one; row one darkens and grows | card sway (rot -1.1 deg/s, y 37 px/s), easings.inOutSine | pointer springs.pop (overshoot not measurable); active row scale ~1.1, springs.ui ~8 fr (±0.25 s) | hard-cut | tick |
| 8 | 7.77–8.50 | 233–255 | feature | pointer steps to row two, row one back to grey | sway continues, easings.inOutSine | pointer slides one row, springs.ui ~8 fr (±0.25 s) | hard-cut | tick |
| 9 | 8.50–9.27 | 255–278 | feature | pointer on row three, bell icon + label active | sway settling (rot 3.5 deg/s) | pointer slides, springs.ui ~8 fr (±0.25 s); hold 15 fr | hard-cut | tick |
| 10 | 9.27–10.00 | 278–300 | feature | pointer fades, labels clear one per row, then top two icons go | static | labels fade out stagger ~7 fr, easings.outQuint ~6 fr (±0.25 s); icons at 10.00 s | hard-cut | none |
| 11 | 10.00–13.50 | 300–405 | feature | hold: card left, single accent bell icon right | static (zoom -0.1 %/s, not visible) | none; ends on hold | hard-cut | none |

Evidence per row: 1 `sheet-01 cells 0–3`; 2 `sheet-01 cells 4–8`; 3 `sheet-01 cells 9–13`; 4 `sheet-01 cells 14–15`, `sheet-02 cells 0–2`; 5 `sheet-02 cells 3–6`; 6 `sheet-02 cells 7–10`; 7 `sheet-02 cells 11–14`, `keyframes/kf-007.50.jpg`; 8 `sheet-02 cell 15`, `sheet-03 cells 0–1`; 9 `sheet-03 cells 2–4`; 10 `sheet-03 cells 5–7`; 11 `sheet-03 cells 8–15`, `sheet-04 cells 0–5`. No cut frames (cuts.json is empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| typewriter | 2, 3, 5 (erase) | craft/05-typography.md, `Typewriter` |
| blur-dissolve | 3, 4 | craft/09-transitions.md#blur-dissolve |
| tilt-plane | 5–11 | craft/03-camera-and-staging.md, `TiltPlane` |
| pull-out | 5 | craft/03-camera-and-staging.md |
| ui-rebuild | 5–11 | dashboard card: status line, title, 2 stat chips, logo, blurb, `LineChart` |
| list-assemble | 6–10 | capability list builds, steps active, clears |

## Look
Palette: #FFFFFF background, #3D3D3D text, #5F7DAC accent blue, #9CB0CC accent tint, #F2F4F7 card surface, #A1A5AB inactive label grey. Type: medium geometric grotesk, sentence case, normal tracking; typed lines ~4 % H, name ~6 % H, list labels ~4 % H. Treatment: none. Background: flat white, card with soft drop shadow.

## What to adapt
- Copy: problem sentence ~6 words; restatement 3 words with the accent on the last; intro word + product name; 2-word headline; 3 capability verbs.
- Brand: accent colour carries the restatement's last word, the name, the pointer and the icons; logo appears inside the card only.
- Timing: row 11 hold can shrink to 1.5 s; typing rate and the 1 s per pointer step must keep their frame counts.

## Pitfalls
- The problem line is wider than the frame: scroll it with the caret, do not shrink the type.
- Pointer steps are ~0.75–1 s apart; faster and the rows cannot be read.
- The end is a 3.5 s static hold with almost nothing on the right; for a feed cut it or add an end card.

## Missing components
- CaretScrollLine: single text line that pans left so the caret stays at x 45 % while typing (techniques: typewriter)
- PointerStepList: vertical list of icon+label rows with dividers; a triangle pointer steps per row on springs.ui, active row scale 1.1 and dark, others grey; labels clear with 7 fr stagger (techniques: list-assemble)

## Proposed terms
- caret-follow-scroll: typed line pans to keep the caret on screen, row 2 (not in craft/vocabulary.md; not used in recipe.json)
- pointer-step: a pointer glyph steps down a capability list activating one row at a time, rows 7–9 (not in craft/vocabulary.md; not used in recipe.json)
- label-clear: list labels fade out one per row leaving only icons, row 10 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips extracted. Not measurable: exact typing cadence, entrance overshoot, pointer spring, stagger under 7 fr. Palette sampled from keyframes kf-002.50, kf-005.50, kf-008.50 (no cut frames exist). SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no music). Catalogue hint card-grid not seen: only one card.

## Study log
id typed-problem-dashboard-steps · family product-ui (hint kinetic-type: type carries only the first 4.5 s)
13.5 s, 11 rows from state changes (0 cuts) · 6 techniques · cut_on_beat n/a (silent, no cuts)
Not measurable: typing cadence, overshoot, staggers under 0.25 s
Proposed terms: caret-follow-scroll, pointer-step, label-clear
Missing components: CaretScrollLine, PointerStepList
phase B: not run
