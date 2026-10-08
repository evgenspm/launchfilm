# Frosted glass digit clock tick

Four giant frosted glass digits in a two-row clock layout over a soft blurred colour field; the last digit steps once per second. Refraction through the glyphs makes a static frame feel premium and alive.

Source: https://jitter.video/template/frosted-glass-counter/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A countdown or timer moment before a launch or deadline
- A premium, calm loop for a social post or a hero background
- A stat beat where one number ticks up in whole steps
- A silent autoplay tile with no copy beyond the number
Not for: numbers that need a unit, a label or a fast count-up (the step is 1 per second, no easing); dark brands (the frost reads only over a light, colourful field).

## Format
4:5 · 5.03 s · 30 fps · light · music none (silent), cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.00 | 0–30 | hook | four frosted glass digits, hours on top, minutes below with a dot colon, over a soft peach, blue and lilac blurred field | static (drift 2 px/s, not visible) | hold; last digit steps at f30 in 1 fr, easings.stepped(1), measured on a 30 fps strip | hard-cut | tick |
| 2 | 1.00–2.00 | 30–60 | proof | same clock, last digit one step higher; refraction changes with the glyph shape | static | hold 30 fr; step at f60, easings.stepped(1) (±0.25 s) | hard-cut | tick |
| 3 | 2.00–3.00 | 60–90 | proof | same clock, last digit one step higher | static | hold 30 fr; step at f90, easings.stepped(1) (±0.25 s) | hard-cut | tick |
| 4 | 3.00–4.00 | 90–120 | proof | same clock, last digit one step higher | static | hold 30 fr; step at f120, easings.stepped(1) (±0.25 s) | hard-cut | tick |
| 5 | 4.00–5.03 | 120–151 | proof | last digit at its highest value; on the final frame both minute digits roll over to the next ten | static | hold 30 fr; at f150 tens and units step together, easings.stepped(1) (±0.25 s) | hard-cut | tick |

Evidence per row: row 1 `sheet-01 cells 0–3` + 30 fps strip 0.70–1.70 s (swap between strip frames 8 and 9 = f30); row 2 `sheet-01 cells 4–7`, `keyframes/kf-001.50.jpg`; row 3 `sheet-01 cells 8–11`, `kf-002.50.jpg`; row 4 `sheet-01 cells 12–15`, `kf-003.50.jpg`; row 5 `sheet-02 cells 0–4`, `kf-004.50.jpg`. No cut frames exist (cuts.json: 0 hard, 0 soft, 0 flashes).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| counter | 1–5 | craft/vocabulary.md#type (Counter, stepped, no rolling) |
| liquid-glass | 1–5 | craft/vocabulary.md#look (glyph fill: frost blur + refraction of the field) |
| mesh-gradient | 1–5 | craft/vocabulary.md#look (soft peach / blue / lilac blurred field behind) |

## Look
Palette: `#C9CBD2` background grey-lilac, `#DEE5EB` frosted glyph face, `#8CA7CF` blue band seen through the glyphs, `#B9BFD8` lilac shadow, `#D1D4DC` glyph mid-tone. Type: geometric grotesk numerals, bold, tabular, 2×2 stack, each row ~40 % of frame height, colon as two round dots at the left edge, 1 px light rim on every glyph. Treatment: liquid-glass, mesh-gradient. Background: static blurred gradient field with a large soft disc and a diagonal blue band.

## What to adapt
- Copy: none; one 4-digit value (clock or count) and its increment.
- Brand: the brand accent and bg drive the colours of the field; the glyphs stay neutral frosted white so any field works.
- Timing: tick period 30 fr is the rhythm; more ticks make it longer. The last tick lands on the final frame.

## Pitfalls
- The swap is a hard 1-frame step: a roll or fade turns the clock into a slot machine and loses the calm.
- The field must have strong colour contrast (a saturated band) under the last digit, or the refraction is invisible.
- The ending carries into the tens digit on the very last frame; as a loop it jumps back, so it is not loopable as is.

## Missing components
- FrostedGlyphs: renders text as frosted glass over a backdrop (backdrop blur 20–40 px inside glyph mask, displacement refraction of the field, 1 px light rim, soft inner highlight), per-character so one digit can change (techniques: liquid-glass, counter)
- SoftColorField: static blurred field with a large disc and one diagonal saturated band, brand-coloured (DesktopBackdrop blobs are close but drift and lack the band) (techniques: mesh-gradient)

## Proposed terms
- frosted-glyph: type whose fill is frosted, refractive glass showing the blurred background through it, with a thin light rim; rows 1–5 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; 1 fr from a 30 fps strip at t = 0.70–1.70 s (swap at f30, 1 fr, no motion). Later ticks assumed on the same 30 fr period, confirmed by sheet cells at 2.00, 3.00, 4.00, 5.00 (±0.25 s). Not measurable: refraction parameters (blur radius, displacement strength). Camera static per motion.json (2 px/s pan, -0.1 %/s zoom, coherence 0.98–0.99). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no music).

## Study log
- id frosted-digit-clock-tick · family data-stats · 5.03 s · 5 rows (one 5 s shot split at each tick)
- techniques 3 (counter, liquid-glass, mesh-gradient) · difficulty easy · render_cost heavy (liquid-glass)
- cut_on_beat n/a: 0 cuts, silent reference
- measured on a 30 fps strip: digit swap is a 1-frame step at f30; other ticks ±0.25 s from sheets
- not measurable: glass blur and refraction strength
- proposed terms: frosted-glyph
- missing components: FrostedGlyphs, SoftColorField
- phase B: not run (study only)
