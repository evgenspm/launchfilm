# Product hero with cascading key callouts

A flat hardware hero scales up from small and fades in on white, settles, then four thin leader-line callouts with short labels and outlined targets appear one after another. A quiet spec-sheet beat that points at details.

Source: https://jitter.video/template/magic-keyboard-specs-apple-event/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A hardware or device product where specific buttons, ports or keys deserve a name
- A spec-sheet beat inside a longer launch film, after the hero shot
- A silent loop for a product page that labels 3-5 details
Not for: software-only products with no physical object, or claims that need numbers (use a counter or stat recipe).

## Format
16:9 · 4.00 s · 30 fps · light · music none, cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.27 | 0–38 | hook | empty white, then the product (flat top view, mint body, white keys) appears centred and grows to ~80 % of frame width | static frame; object scales 0.55 → 1.00 | opacity 0 → 1 over 10 fr (f1–f11); scale springs.heavy ~25 fr, settled f25–f29, no overshoot on the strip; hold from f30 | hard-cut | swell |
| 2 | 1.27–2.50 | 38–75 | feature | four callouts cascade: one below the bottom-left key, three above adjacent top-row keys; each a thin vertical leader, a 1–3 word label and a dark outline on the key | static | callouts start f38, f56, f63, f68 (gaps 18, 7, 5 fr); leader + label easings.outQuint ~6 fr, key outline ~2 fr after the label; all settled by f75 | hard-cut | tick |
| 3 | 2.50–4.00 | 75–120 | feature | full spec frame holds: product with four outlined keys and labels | static | hold 45 fr, no motion | hard-cut | none |

Evidence: row 1 sheet-01 cells 0–4 (0.00–1.00), keyframe kf-000.50, 30 fps strip t = 0–1 s; row 2 sheet-01 cells 5–10 (1.27–2.50), strips t = 1.2 and 2.0; row 3 sheet-01 cells 10–15 (2.50–3.77), keyframes kf-002.50 and kf-003.50. No cut frames (cuts.json is empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| keycaps | 2–3 | craft/vocabulary.md#ui (key targets outlined, no press) |

## Look
Palette: #FFFFFF background, #4A5F5E label text and outlines, #BAD3C9 product body, #91A19C key edges, #EEF2F1 key faces, #D3E0DC body shade. Type: small grotesk, medium weight, sentence case, normal tracking, ~2.5 % of frame height, dark teal. Treatment: none. Background: flat white.

## What to adapt
- Copy: 3–5 labels, 1–3 words each, each names one physical control or detail.
- Brand: the accent colours the target outlines and leaders; labels in fg; product image is the user's own cut-out.
- Timing: row 3 hold can stretch; the scale-in (~25 fr) and 5–7 fr callout cadence should keep their frame counts. The first callout waits ~8 fr after the hero settles.

## Pitfalls
- Callouts alternate above and below the object: leaders must stay inside the safe area at 9:16, so the product shrinks before the labels do.
- The first callout is alone for 18 fr, then the rest come fast; evenly spacing them loses the rhythm.
- Leaders are hairlines (~1 px at 1250 px wide); at half-scale renders they vanish, use ≥ 1.5 px at 1920.

## Missing components
- SpecCallouts: over a product image, items {label, target rect, side} each draw a vertical hairline leader (length ~8 % H) from the target edge, fade the label in at the line end (outQuint 6 fr), and outline the target rect (stroke 3 px at 1920, radius matching the key, accent), staggered by `at` frames (techniques: keycaps).
- HeroImage: cut-out product image centred, scale 0.55 → 1.00 on springs.heavy with a 10 fr opacity ramp (techniques: none in vocabulary; see Proposed terms).

## Proposed terms
- hero-scale-in: a still product object fades and scales up from ~55 % into its rest size, no camera move; row 1 (not in craft/vocabulary.md; not used in recipe.json)
- spec-callout: leader line + short label + target outline pointing at one part of an object, cascaded; rows 2–3 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0, 1.2, 2.0 s; 0.25 s from the sheet elsewhere. Not measurable: exact spring overshoot of the scale-in below ~2 %, leader draw direction (too thin at strip scale). SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no music). Palette from palettegen on keyframes kf-000.50 and kf-002.50 (no cut frames exist). The single 4.00 s shot was split at the visible state changes f38 (first callout) and f75 (last callout settled).

## Study log
id hero-spec-callout-cascade · family 3d-device (flat 2D product image, no 3D) · 4.00 s, 3 rows, 0 cuts.
techniques: 1 (keycaps) · cut_on_beat: n/a (0/0, silent).
Measured from 30 fps strips: scale-in 0.55 → 1.00 settled ~f25–f29; callouts f38, f56, f63, f68, settled f75.
Not measurable: overshoot < 2 %, leader draw direction.
Proposed terms: hero-scale-in, spec-callout.
Missing components: SpecCallouts, HeroImage.
Phase B: not run (study only).
