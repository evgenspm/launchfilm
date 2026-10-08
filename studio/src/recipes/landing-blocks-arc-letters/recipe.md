# Landing page blocks with arcing hero letters

A rebuilt landing page fades up on a pale backdrop; the headline rises out of line masks, block copy and avatars cascade in, and one word's letters swing along an arc into a vertical stack beside the hero photo. Holds, then fades out.

Source: https://jitter.video/template/landing-page-blocks/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Showing a website or landing page design as a short silent loop
- A studio or agency portfolio post where one page layout is the subject
- Opening a site launch film on the hero section before a scroll tour
- Social cutdowns that need one calm 5 s product moment
Not for: products with no web page to show, or films that need a story arc and a CTA beat.

## Format
16:9 · 5.00 s · 30 fps · light · music none (no bpm), cut_on_beat 0/0 · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.27 | 0–8 | hook | empty pale backdrop, then the page card (nav, hero panel with cutout portrait, three empty lower blocks) fades up | locked; page rises ~1 % H while fading | page opacity 0 to 1, rise ~1 % H, f1 to f6, easings.outExpo 6 fr; parts arrive together | hard-cut | none |
| 2 | 0.27–1.00 | 8–30 | reveal | headline, 3 short lines, rises in; pill button, quote copy, mission copy fade in; arc letters start top right | locked | lines mask-rise from f8, line stagger ~2 fr, springs.maskRise ~10 fr (overshoot not measurable); pill f14 to f18; block copy f13 to f24, easings.outQuint; avatars pop f22/f25/f28, springs.pop (overshoot not measurable) | hard-cut | swoosh-short |
| 3 | 1.00–2.00 | 30–60 | feature | letters of one 6-letter word swing along an arc round the portrait and settle as a vertical stack; two glyph icons appear | locked | clockwise arc from the top-right corner, letters rotate to final angle, f12 to ~f57, easings.outQuint ~45 fr, letter stagger ~3 fr (±0.25 s); asterisk f35, half-disc f48 | hard-cut | none |
| 4 | 2.00–4.40 | 60–132 | feature | finished page holds: headline, button, three blocks, arc word, gradient orb block | static | nothing moves; orb gradient shifts hue slowly, easings.linear | hard-cut | none |
| 5 | 4.40–5.00 | 132–150 | feature | whole page fades into the backdrop and shrinks a little; ends on the empty backdrop like frame 0 | locked; page scale 1.00 to 0.97 | opacity 1 to 0 and scale 1.00 to 0.97, f132 to f143, easings.inOutSine 11 fr; empty f143 to f150 | hard-cut | none |

Evidence per row: 1 = sheet-01 cells 0–1, strip t = 0 frames 0–7; 2 = sheet-01 cells 1–3, strip t = 0 frames 8–29, kf-000.50.jpg; 3 = sheet-01 cells 4–7, strip t = 1, kf-001.50.jpg; 4 = sheet-01 cells 8–15, sheet-02 cell 0, kf-002.50.jpg; 5 = sheet-02 cells 1–3, strip t = 4, kf-004.50.jpg. No cut frames exist (cuts.json lists 0 cuts).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| ui-rebuild | 1–5 | craft/vocabulary.md#ui, studio/API.md components |
| mask-rise | 2 | craft/vocabulary.md#type, BlurIn enter="mask" |
| card-grid | 1–2 | craft/vocabulary.md#ui (blocks fill in with a stagger) |
| mesh-gradient | 1–5 | craft/vocabulary.md#look (the orb block) |

## Look
Palette: #CFD1DD backdrop, #000000 text and portrait, #DCC0C3 pill accent, #F0F1F0 page surface, #D5D3D4 block surface, #756C6F muted text. Type: heavy geometric grotesk headline, sentence case, tight leading, ~8 % H; wide monospace lowercase arc word ~7 % H; small sans body ~2.5 % H. Treatment: mesh-gradient. Background: flat pale lavender grey behind a page card with hairline-bordered rounded blocks.

## What to adapt
- Copy: headline of 3 lines (1 to 2 words each), button label of 2 words, one arc word of 4 to 7 letters, a 4-line quote and a 3-line mission line, wordmark and 3 nav labels.
- Brand: accent carries the pill button gradient and the orb block; the wordmark sits top left in the nav; backdrop = brand bg tinted.
- Timing: row 4 (hold) stretches; rows 1 to 3 keep their frame counts so the build stays under 2 s; exit keeps 11 fr.

## Pitfalls
- The arc letters must rotate along the path tangent, not just translate, or the move reads as a slide.
- Copy blocks fade (no movement) while the headline rises: moving everything makes the page busy.
- motion.json reports a slow zoom out, but frame diff is ~0 from 2 to 4 s; do not add a camera move.

## Missing components
- ArcLetters: letters of one word travel along a circular arc (radius ~25 % H, ~150° sweep, clockwise) with tangent rotation, stagger 3 fr, easings.outQuint 45 fr, ending as a vertical stack (techniques: none in vocabulary, proposed term arc-letters)
- LandingPageMock: nav bar + hero panel (copy left, cutout image right) + 3 lower bento blocks with hairline borders and 14 px radius, page card ~75 % W (techniques: ui-rebuild, card-grid)

## Proposed terms
- arc-letters: letters of a word follow a curved path and rotate into place as a vertical or curved word, row 3 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0, 1, 4 s (480 px wide); 0.25 s from sheets for 2 to 4 s. Not measurable: overshoot of the headline mask rise and avatar pops at 480 px; exact arc radius and per-letter stagger (±0.25 s). SFX planned by the glue rule, not measured; the reference is silent. cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
id landing-blocks-arc-letters · family product-ui · 5.00 s, 5 rows (0 cuts, one shot split at state changes) · 4 techniques (ui-rebuild, mask-rise, card-grid, mesh-gradient) · cut_on_beat false (0/0, silent) · loopable (starts and ends on the empty backdrop) · measured from 30 fps strips at 0, 1, 4 s; overshoot and arc stagger not measurable (±0.25 s) · proposed terms: arc-letters · missing components: ArcLetters, LandingPageMock · phase B not run.
