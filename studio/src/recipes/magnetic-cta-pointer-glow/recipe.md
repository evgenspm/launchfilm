# Magnetic pill button with a pointer light

One violet pill button on deep indigo. The cursor arrives, the pill swells about 1.45x and leans toward it, a soft inner light follows the pointer, then a press shrinks and whitens it and it settles back to rest. Loops.

Source: https://jitter.video/template/interactive-button-trace/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- The CTA beat at the end of a launch film: one button, one action, nothing else on screen.
- A landing hero or web demo that should show the UI reacting to the pointer.
- A short seamless loop (5.77 s) for a social post, docs header or product page.
- Insert shot inside a longer `product-ui` film, before the end card.
Not for: films that need to explain a feature, or CTAs with more than one action; the whole shot is a single element.

## Format
other (1322×992, 4:3-ish) · 5.77 s · 30 fps · dark · no music (silent), cut_on_beat n/a · VO no · loopable

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.00 | 0–30 | hook | small violet pill with a 2-word action label above centre; cursor enters below it | locked | cursor in by 0.27 (±0.25 s); pill width 1.00 to 1.36, drifts down ~8 % H toward the pointer, springs.layout over 30 fr (overshoot not measurable) | hard-cut | none |
| 2 | 1.00–2.00 | 30–60 | cta | full hover pill, cursor parked off its right end | locked | width 1.36 to 1.48 by 1.27 then holds; pill follows the pointer with ~12 fr lag, springs.ui (±0.25 s); inner light at the end nearest the cursor | hard-cut | none |
| 3 | 2.00–4.00 | 60–120 | cta | cursor sweeps across the pill and back; white-pink light moves under it | locked | pill holds 1.48, translates with the cursor (down to 2.50, up to 3.77), springs.ui follow; light ~40 % of pill width tracks pointer x (±0.25 s) | hard-cut | none |
| 4 | 4.00–5.00 | 120–150 | cta | cursor presses the lower middle; pill shrinks, flashes pale, returns to rest | locked | 4.07 to 4.43 width 1.48 to 0.65 of hover (~11 fr, springs.click); fill whitens 4.37 to 4.57 (~6 fr); release to rest 1.00 by 4.87 (springs.ui, 9 fr) | hard-cut | ui-confirm (planned) |
| 5 | 5.00–5.77 | 150–173 | cta | rest pill alone, cursor fading under it; matches frame 0 | locked | cursor opacity 1 to 0 over 5.00 to 5.40 (±0.25 s, easings.linear); pill still 11 fr | hard-cut | none |

Evidence per row:
1. sheet-01 cells 0–3 (0.00–0.77), strip at 0.5 s.
2. sheet-01 cells 4–7 (1.00–1.77), strip at 0.5 s rows 4–5 (1.00–1.33).
3. sheet-01 cells 8–15 (2.00–3.77), keyframe kf-002.50.
4. sheet-02 cells 0–3 (4.00–4.77), strip at 3.9 s (press bottom and pale flash at about 4.40–4.57), keyframe kf-004.50.
5. sheet-02 cells 4–6 (5.00–5.50); compared with sheet-01 cell 0 for the loop.
No cuts in cuts.json (0 hard, 0 soft, 0 flashes), so the 5.77 s single shot is split at visible state changes (A4.3).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| cursor-path | 1–5 | craft/04-motion.md (springs.click for the press), studio `Cursor` |
| glow | 2–4 (look) | craft look ids; inner radial light and soft shadow on the pill |

## Look
Palette: #140137 background (deep indigo), #6F3ECD pill edge violet, #9866EF pill body, #C19FF5 light falloff, #E1D4FA light core (near white, pink tint), #2E1770 shadow tone. Type: geometric sans, medium, sentence case, near-black on the pill, cap height about 4 % H at rest, 6 % H at hover. Treatment: glow (inner radial light plus a soft dark drop shadow below the pill). Background: flat colour, no grain, no vignette.

## What to adapt
- Copy: one label, 1 to 3 words, an action verb first. Longer labels widen the pill and weaken the swell.
- Brand: the pill gradient carries the accent (accent to accent2), light core is a near-white tint of the accent; background is brand bg, kept dark so the light reads.
- Timing: rows 2 and 3 (hover and sweep) stretch or shrink freely; the press in row 4 keeps its frame counts (11 fr down, 6 fr flash, 9 fr release) and row 5 must end on the frame-0 state to loop.

## Pitfalls
- The pill follows the pointer only partly (about a third of the offset) and with lag; a 1:1 follow reads as dragging, not magnetism.
- The light must sit under the cursor; a fixed centre highlight loses the whole effect.
- The press goes well below rest size (to about 0.65 of hover) before it settles; a small 10 % squash looks timid at this scale.
- Keep the camera locked; motion.json reports zoom and pan only because the single object fills the textured blocks.

## Missing components
- MagneticPill: capsule button with label, props `rest`, `hoverScale=1.48`, `pressScale=0.65`, `follow=0.35`; reads `useCursor` each frame, scales on proximity with springs.layout, translates by follow × offset with springs.ui, presses with springs.click on cursor click frames (techniques: cursor-path, glow).
- PointerLight: radial gradient clipped to the pill, radius 0.4 × pill width, centre at the cursor position in pill space, near-white core to transparent (techniques: glow).

## Proposed terms
- `magnetic-hover`: an element grows and leans toward the nearby pointer with lag, rows 1–3 (not in craft/vocabulary.md; not used in recipe.json).
- `pointer-light`: a soft light inside an element that tracks the cursor position, rows 2–4 (not in craft/vocabulary.md; not used in recipe.json).

## Measurement notes
Resolution: 0.25 s from sheets; 1 fr from 30 fps strips at t = 0.5 s and 3.9 s (temporary, not kept). Not measurable: exact entrance frame of the cursor (±0.25 s), spring overshoot of the swell, follow lag in frames (±0.25 s), cursor fade frames (±0.25 s). The catalogue hint of an outline drawing itself on press was not seen in sheets or strips. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts (no music, no cuts).

## Study log
id magnetic-cta-pointer-glow · family product-ui · 5.77 s, 5 rows (0 cuts, split at state changes) · loopable.
Techniques: 2 (cursor-path, glow); hints orbit, island-morph, highlighter not seen.
cut_on_beat: n/a (silent, 0 cuts).
Not measurable: cursor entrance and fade (±0.25 s), swell overshoot, follow lag (±0.25 s).
Proposed terms: magnetic-hover, pointer-light.
Missing components: MagneticPill, PointerLight.
Phase B: not run (study batch).
