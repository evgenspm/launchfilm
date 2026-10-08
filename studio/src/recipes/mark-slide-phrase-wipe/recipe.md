# Mark grows from a dot, slides open a phrase, hides it

On black, a glowing mark grows from a dot at centre, glides left, then whips right and drags a short phrase out from behind its edge. It slides back over the phrase to swallow it and settles left, dimmed. One object does every move.

Source: https://www.raylight.app/templates/MjeQBgU1 (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A 4 s logo sting or bumper: a mark plus one short line (tagline, 2-4 words).
- Opener or closer of a dark film where the mark is the only actor.
- Brands whose mark has a strong, solid silhouette that reads at ~10 % of frame width.
- Silent autoplay: one motion idea carries the brand, no sound needed.
Not for: wordmark-only brands (the mark has to act as the mask edge), long taglines (over ~45 % of width the whip gets too far), light themes (the glow is the look).

## Format
16:9 · 4.27 s · 30 fps · dark · music none (no bpm), cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.00 | 0–30 | hook | black; a dot at centre grows into the mark, ~3 % to ~10 % W, halo rising | locked, growth is the mark's own scale | empty to 0.27; scale up 22 fr (±0.25 s), slow then fast, springs.heavy (overshoot not measurable); halo fades in with scale | hard-cut | swell (planned) |
| 2 | 1.00–2.27 | 30–68 | logo | mark alone at centre, then glides to the left third | locked; mark moves ~27 % W left on a shallow down arc | hold 8 fr; glide 22 fr (±0.25 s), easings.inOutSine, dips ~9 % H at 1.77, ~7 deg tilt mid-move, motion blur; settled 2.00 | hard-cut | swoosh-short (planned) |
| 3 | 2.27–3.27 | 68–98 | logo | mark whips right of centre; 3-word phrase pulled out from behind its left edge, centred | locked | ~57 % W right in 15 fr (±0.25 s), easings.outExpo, heavy blur at 2.50; mask edge follows mark, phrase full at 2.77; settle springs.snappy (~6 %, ±0.25 s); phrase static | mask-wipe | whoosh (planned) |
| 4 | 3.27–4.27 | 98–128 | logo | mark slides back left over the phrase, which vanishes behind it; mark ends alone left, dimmed | locked | ~57 % W left in 22 fr (±0.25 s), easings.inOutSine, blur at 3.50; same mask from the phrase's right end; glow off, mark to ~60 % brightness 3.77–4.00; hold | hard-cut | swoosh-short (planned) |

Evidence per row: row 1 `sheet-01 cells 0–4`; row 2 `sheet-01 cells 4–9`, `keyframes/kf-001.50.jpg`; row 3 `sheet-01 cells 9–13`; row 4 `sheet-01 cells 13–15`, `sheet-02 cell 0`, `keyframes/kf-003.50.jpg`. No `cuts/*.jpg` exist (0 cuts).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| logo-from-dot | 1 | craft/vocabulary.md#brand, LogoReveal variant `from-dot` |
| mask-wipe | 3, 4 | craft/09-transitions.md |
| glow | 1–4 | craft/06-look.md (glow under the mark, never additive on top) |
| motion-blur | 2, 3, 4 | craft/04-motion.md (fast moves >= 200 px in <= 8 fr get motion blur) |

## Look
Palette: #000000 background, #E1E1E1 mark and phrase, #7B7B7B mark shading / dimmed end state, #3E3E3E and #1A1A1B halo falloff. Type: bold grotesk, title case, normal tracking, cap height ~6 % H, one line. Treatment: glow, motion-blur. Background: flat black.

## What to adapt
- Copy: one line, 2-4 words, the brand's promise or category; it is on screen fully for ~0.5 s (2.77–3.27), so keep it short.
- Brand: the mark is the only actor; mark and phrase both in fg on bg, no accent. Swap the soft white halo for an accent-tinted one if the brand has a strong colour.
- Timing: row 1 grow and row 3 whip keep their frame counts (22 and 15 fr); the hold at 1.00–1.27 and the end hold can stretch for a longer sting.

## Pitfalls
- The phrase never moves; only the mask edge travels with the mark. Animating the text itself kills the "pulled out from behind" read.
- The mask edge must sit under the mark's leading edge on every frame, or a sliver of text shows beside the mark.
- Whip in 15 fr over ~57 % W needs motion blur; without it the mark strobes at 30 fps.
- Glow goes under the mark; additive glow on top washes out the silhouette.

## Missing components
- MarkCarriedMask: a text line clipped by a rect whose right edge is bound to a moving mark's left edge (x of mark minus gap ~2 % W), reveals as the mark moves right and hides as it returns (techniques: mask-wipe). LogoReveal only assembles a wordmark in place.

## Proposed terms
- mark-carried mask: a text reveal/hide where the moving brand mark itself is the mask edge, rows 3–4 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (cell timestamps 0.00, 0.27, 0.50, 0.77, ...). No source strips extracted. Not measurable: exact entrance curves, overshoot on the grow and the settles, motion blur length, the mask gap. Palette from keyframes 1.50 and 3.50 (no cut frames exist). SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no music).

## Study log
- id mark-slide-phrase-wipe · family kinetic-type · 4.27 s · 4 rows, single shot, 0 cuts
- techniques: 4 (logo-from-dot, mask-wipe, glow, motion-blur) · difficulty easy · render_cost heavy (motion-blur)
- cut_on_beat: n/a (0 cuts, silent reference, no bpm)
- not measurable at 0.25 s: overshoot, exact easing, blur length, mask gap
- proposed terms: mark-carried mask
- missing components: MarkCarriedMask
- phase B: not run
