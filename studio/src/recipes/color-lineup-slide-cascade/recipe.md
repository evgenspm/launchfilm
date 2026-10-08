# Colour lineup slide-in cascade

Seven side-profile desktop units in seven colours slide in from the right one after another on a near-white field; the row re-spaces as each joins and settles into an even lineup that holds. Calm, keynote-style variant reveal.

Source: https://jitter.video/template/imac-cascade-apple-event/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Hardware or product with several colour or model variants
- A short silent loop or opener for a lineup announcement
- A light, minimal keynote voice with no copy on screen
- A bridge shot before a variant picker or pricing line
Not for: products with one variant, or anything that needs UI or copy to explain it.

## Format
16:9 · 4.00 s · 30 fps · light · music none, cut_on_beat n/a (0 cuts, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.33 | 0–10 | hook | empty near-white field | static | none; first foot edge crosses the right edge at f10 | hard-cut | none |
| 2 | 0.33–2.50 | 10–75 | reveal | 7 side-profile units (thin tilted panel on angled stand), one colour each, slide in from the right | static frame; row travels left ~384 px/s @1920 (1–2 s), spacing tightens ~25 % W → ~14 % W, unit size constant | entrances f10, f15, f21, f27, f33, f41, f50 (stagger 5–6 fr, last two 8–9 fr, ±1 fr from strip); each enters on easings.outExpo, row re-spaces on springs.heavy, settled ~f75 (overshoot not measurable, ±0.25 s) | hard-cut | swoosh-short per unit (planned) |
| 3 | 2.50–4.00 | 75–120 | reveal | full 7-colour lineup holds, even spacing, spans ~92 % W | static | hold; motion.json diff 0.06 then 0.00 | hard-cut | none |

Evidence per row: row 1 `sheet-01 cells 0–1` (0.00, 0.27 empty), strip 0.30 s frame 1. Row 2 `sheet-01 cells 2–9` (0.50 one unit plus a second at the edge, 0.77 three, 1.00 four, 1.27 five, 1.50 six, 1.77 seventh at the edge, 2.00–2.27 still re-spacing), strips at 0.30 s and 1.30 s, `keyframes/kf-001.50.jpg`. Row 3 `sheet-01 cells 10–15` (2.50–3.77 identical), `keyframes/kf-003.50.jpg`. No cut frames exist (cuts.json lists 0 cuts).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-laptop | 2–3 | craft/vocabulary.md#ui (closest device id; drawn side-profile desktop, no screen content) |

## Look
Palette: #FAFAFA background, #295A6F teal panel, #D2A68B peach stand tint, #80465D, #2B4B6E navy panel, #AF6158 coral (palettegen on keyframes 1.50 and 3.50; the seven variant colours are teal, amber, orange, red, indigo, blue, silver, each stand a pale tint of its panel). Type: none. Treatment: none. Background: flat near-white.

## What to adapt
- Copy: none on screen; a name or tagline could follow as a separate shot.
- Brand: the variant colours carry the brand; the field is brand bg. Use 5–8 variants; 7 fills 16:9 at ~14 % W spacing.
- Timing: the hold (row 3) stretches freely; keep the 5–6 fr entrance stagger, it is what makes the row read as one cascade.

## Pitfalls
- Units keep their size; only the gaps shrink. Scaling units down as the row grows reads as a zoom-out, not a cascade.
- The row must keep moving left while units arrive (no unit lands still), else the cascade turns into separate drops.
- The panel tilt and the stand angle are identical on every unit; any variation breaks the lineup read.

## Missing components
- LineupCascade: N drawn side-profile units enter from off-screen right on outExpo, stagger 6 fr, row re-centres on springs.heavy, final spacing = 0.92 W / N, settles ~65 fr after the first entrance (techniques: device-laptop)
- DesktopSideProfile: thin panel tilted ~8° back on an angled stand with a flat foot, panel colour + pale stand tint, ~65 % H tall

## Proposed terms
- lineup-cascade: variants of one product slide into a row one after another, the row re-spacing as each joins, then holding (rows 2–3) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0.30 and 1.30 s; 0.25 s from sheets elsewhere. Not measurable: overshoot of the row re-spacing, exact easing curve per unit. Palette from keyframes (no cut frames exist). SFX planned by the glue rule, not measured (source is silent). cut_on_beat = 0/0 cuts within ±2 fr.

## Study log
id color-lineup-slide-cascade · family 3d-device · 4.00 s, 3 rows (0 cuts; split at first entrance f10 and settle f75)
techniques 1 (device-laptop); slide-push hint rejected: no scene is pushed out
cut_on_beat n/a: 0 cuts, no audio
measured from strips: entrances f10/15/21/27/33/41/50; not measurable: re-space overshoot (±0.25 s)
proposed terms: lineup-cascade
missing components: LineupCascade, DesktopSideProfile
phase B: not run (study only)
