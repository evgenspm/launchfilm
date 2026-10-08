# Caret word replace on white

A lone caret drops in on white, a name builds letter by letter from the caret, then a second phrase types out on the caret's left while the first word erases on its right. One caret does both jobs in 3 s.

Source: https://www.raylight.app/templates/moypOJA7 (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Swapping a product name for its category or a one-line definition
- A 3 s silent opener or sticker loop before a longer film
- Type-only social posts where the brand has no UI to show yet
- Rewriting one term into another: old way to new way, name to tagline
Not for: long copy (over ~20 chars the second phrase types too slowly for 3 s) or anything that needs a logo.

## Format
16:9 · 3.00 s · 30 fps · light · music none, cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–3.00 | 0–90 | hook | flat white; caret alone, then a one-word name (7 letters), then a two-word category phrase (15 chars) replaces it | static f0-f59, then drift scale 1.00 -> ~1.013 and ~15 px/s right | caret drop-in outExpo 10 fr (f5-f15); name builds right-to-left at the caret ~2 fr/glyph, 3 fr opacity+blur per glyph (f20-f35); caret eases left one space, outQuint 10 fr (f35-f45); phrase types left of caret ~1.4 fr/char while name erases right of caret ~2 fr/glyph (f52-f73); hold f73-f87; text clears f88 | hard-cut | type-click per glyph |

Evidence: `sheet-01 cells 0–11` (0.00 empty, 0.27/0.50 caret, 0.77 first glyph, 1.00 partial name, 1.27–1.77 name with gap, 2.00 first char of phrase, 2.27 swap mid-way, 2.50/2.77 final phrase), `keyframes/kf-001.50.jpg`, `keyframes/kf-002.50.jpg`, 30 fps strip f0–f89 (local, not kept). No cut frames (cuts.json empty).

Phases inside the row (one shot under 4 s, so not split by measure.md §4):
- f0–f4: empty white.
- f5–f15: caret enters from above with a fade, settles at line centre.
- f20–f35: the name appears glyph by glyph to the right of the caret, last letter first, line kept centred.
- f35–f45: caret moves left, opening one space between caret and word.
- f50–f73: phrase types on the caret's left; the old word erases from its first letter on the caret's right; caret travels right.
- f73–f87: hold, caret solid at the phrase end; slow drift.
- f88–f89: text clears, caret alone.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| typewriter | 1 | craft/vocabulary.md#type (Typewriter, useTypewriter) |
| push-in | 1 (f60-f89, ~1.3 %/s, very slight) | craft/vocabulary.md#camera |

## Look
Palette: #FFFFFF background, #000000 type and caret, #9C9C9C mid-fade glyphs (not a design colour). Type: geometric grotesk, sentence case, normal tracking; first word semibold ~11 % H, phrase medium ~10 % H; caret a rounded black bar ~6 px wide, ~15 % H. Treatment: none. Background: flat.

## What to adapt
- Copy: line 1 = one word, the name (<= 10 letters); line 2 = the replacement, 1-3 words (<= 20 chars), a category or definition.
- Brand: caret and type in brand fg on flat brand bg; an accent colour fits the caret only.
- Timing: per-glyph rates stretch with copy length; keep the caret drop (10 fr) and the 3 fr glyph fade fixed.

## Pitfalls
- The caret must not blink while typing; it blinks nowhere in the reference.
- Glyphs fade in over 3 fr; a hard pop per letter reads as a cheap typewriter.
- The line re-centres every frame; anchoring the left edge makes the swap drift off centre.
- Erase and type run at the same time on opposite sides of one caret; doing them in sequence doubles the length.

## Missing components
- CaretSwap: one centred line holding [newText][caret][oldText]; old text built right-to-left at the caret (2 fr/glyph), then new text typed forwards while old text erases from its left edge (1.4 and 2 fr/glyph), each glyph fades 3 fr with 4 px blur, layout re-centred per frame, caret a solid bar 15 % H (techniques: typewriter)

## Proposed terms
- caret-swap: one caret types a new word on its left while the old word erases on its right, so the caret sits between new and old text (row 1, f52-f73) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from a 30 fps strip of f0–f89 cropped to the text line. Not measurable: exact blur radius of the glyph fade, spring overshoot on the caret drop (none visible at 1 fr, so easings). Drift numbers come from motion.json second 2 (pan 15 px/s, zoom 1.35 %/s, coherence 0.81). SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no music).

## Study log
id caret-word-replace-type · family kinetic-type · 3.00 s, 1 row (no cuts) · techniques 2 (typewriter, push-in) · cut_on_beat n/a (0 cuts, silent) · measured at 1 fr from a 30 fps strip; blur radius not measurable · proposed terms: caret-swap · missing components: CaretSwap · phase B: not run
