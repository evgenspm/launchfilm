# App tile mark spin-resolve sting

A black rounded app tile fades in over a soft iridescent gradient, its white line mark spins out of a blur into focus, holds, then dissolves back and the tile shrinks away. A 3 s silent loop for an icon moment.

Source: https://jitter.video/template/openai-logo/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A short logo sting or loop for an app whose icon is a single-colour mark on a solid tile
- Opening or closing a longer film on the app icon
- A silent social or website loop that returns to the empty background
Not for: wordmarks or multi-colour logos (the blur resolve needs one high-contrast glyph); anything that needs copy or a CTA.

## Format
16:9 · 3.2 s · 30 fps · light · no music, cut_on_beat n/a (0 cuts) · VO no · loopable (first and last frame are the empty background)

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–3.20 | 0–96 | hook | empty iridescent gradient; black rounded app tile centred; white line mark resolves, holds, leaves; tile shrinks out | static (pan 0–1 px/s, zoom 0.0 %/s) | f0–3 empty; tile opacity 0→1 f4–9, easings.outQuint 6 fr, no scale; mark f10–24 blur ~0.1 tile → 0 + rotation in + opacity 0→1, easings.outExpo 15 fr; hold f24–78; mark out f79–83 reverse, easings.inExpo 5 fr; tile f84–89 opacity 1→0, scale 1.0→0.6, easings.inExpo 6 fr; f90–95 empty | hard-cut | swell |

Evidence: sheet-01 cells 0–12 (0.00 empty, 0.27 tile without mark, 0.50 blurred rotated mark, 0.77 sharp, 1.00–2.50 hold, 2.77 tile dark with mark gone, 3.00 empty); keyframes kf-000.50 (blurred mark), kf-001.50 and kf-002.50 (sharp hold); 30 fps strips at t = 0 and t = 2.2 for frame counts. No cuts (cuts.json empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| mesh-gradient | 1 | craft/vocabulary.md#look (soft multi-stop pastel background, static) |
| grain | 1 | craft/vocabulary.md#look (fine noise visible on the flat yellow in kf-001.50) |

## Look
Palette: #EDD288 (background, warm yellow), #000000 (tile), #627ECF (background blue), #91A1CE (background lavender), #C7BFB1 (background neutral), #2B4367 (background deep blue shadow); mark is white. Type: none. Treatment: mesh-gradient, grain. Background: static iridescent gradient (blue/lilac top left, teal band, peach and yellow right), never moves.

## What to adapt
- Copy: none; the mark is the whole message
- Brand: tile in the brand dark or primary colour, mark in a single contrasting colour; backdrop gradient from 3–5 brand pastels
- Timing: the hold (f24–78) stretches; keep tile in 6 fr, mark resolve 15 fr, mark out 5 fr, tile out 6 fr, and 4–6 empty frames at each end so it loops

## Pitfalls
- The mark resolves inside an already-visible tile: bringing both in together loses the two-step read
- The exit is about half the entrance length (11 fr vs 21 fr); a symmetric exit feels slow
- The tile does not scale on entry, only on exit; adding an entry pop changes the character
- Keep the background still: motion behind a 3 s sting competes with the mark

## Missing components
- MarkResolve: tile (rounded square, radius 0.22 of size) fades in over 6 fr, then its SVG mark goes blur 0.1·size → 0, rotation −90°→0° (rotation amount not measured), opacity 0→1 on easings.outExpo 15 fr; reverse 5 fr exit, tile fade + scale 1.0→0.6 over 6 fr (techniques: proposed spin-resolve, tile-pop-out). LogoReveal variants (from-dot, glass, particles, draw) do not cover a blur-spin resolve.

## Proposed terms
- spin-resolve: a mark spins out of a gaussian blur into focus while fading up, ~15 fr (row 1) (not in craft/vocabulary.md; not used in recipe.json)
- tile-pop-out: a container fades and shrinks out after its content has left, ~6 fr (row 1) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0–1 s and t = 2.2–3.2 s; sheet cells 0.25 s elsewhere. Not measurable: exact rotation angle of the mark during the resolve (blur hides it), blur radius (estimated from kf-000.50, about 0.1 of the tile). SFX planned by the glue rule, not measured; the reference is silent. cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
id tile-mark-spin-resolve · family logo-brand · 3.2 s, 1 row (no cuts, single continuous shot under 4 s)
techniques 2 (mesh-gradient, grain; both look ids) · cut_on_beat false (0 cuts, silent)
timings from 30 fps strips: tile in f4–9, mark resolve f10–24, hold to f78, out f79–89, empty f90–95; loopable
not measurable: mark rotation angle and blur radius (±0.25 s style estimate from keyframes)
proposed terms: spin-resolve, tile-pop-out
missing components: MarkResolve (blur-spin mark inside a tile)
phase B: not run (study only)
