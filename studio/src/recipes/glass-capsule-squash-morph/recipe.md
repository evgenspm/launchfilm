# Liquid glass capsule squash and stretch

One refractive glass shape over a dark red striped shader: a wide capsule squeezes into a small circle, swells into a large lens, then stretches into a thin full-width bar. Spring overshoot on every change makes the glass feel elastic.

Source: https://www.raylight.app/templates/PqUKC9Wh (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- Showing off a glass material or a liquid-glass UI style with no copy
- A loopable ambient background or interstitial between product shots (the reference itself does not loop)
- Teasing a control (button, search bar, toggle) before its UI appears
- A dark, single-accent brand that wants motion without type
Not for: films that must carry a message on their own; there is no copy, no logo and no product.

## Format
16:9 · 7.3 s · 30 fps · dark · music none (silent), cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.77 | 0–23 | hook | wide glass capsule (0.55 W x 0.41 H) centred over diagonal red stripes, squeezes sideways into a small circle | locked frame; shader stripes drift diagonally | capsule holds f0–8, width 0.55 W -> 0.20 W at f23 (undershoot) -> 0.24 W at f30, height kept; springs.pop, overshoot ~13 % (±0.25 s) | morph | tick |
| 2 | 0.77–2.50 | 23–75 | feature | small glass circle (0.24 W) holds at centre, stripes refract and shift inside its rim | locked frame; stripes drift and dim slowly | finishes settling 0.20 -> 0.24 W by f30 (±0.25 s), then holds 45 fr; no scale change within ±2 % | morph | none |
| 3 | 2.50–5.00 | 75–150 | feature | circle swells into a large glass lens (0.49 W, 0.87 H) and holds while the stripes behind dim | locked frame; highlight band fades out by f120 | diameter 0.24 W -> 0.53 W peak at f90 -> 0.49 W settled by f98; springs.pop, overshoot ~16 % (±0.25 s); hold 52 fr | morph | pop |
| 4 | 5.00–7.30 | 150–219 | feature | lens stretches into a wide capsule, then a thin full-width glass bar (0.91 W x 0.16 H) holding over a brightening red hot spot | locked frame; red hot spot grows lower left from f180 | f150 circle -> f158 capsule 0.78 W x 0.38 H -> f165 bar 0.92 W x 0.10 H pushed to the left edge -> f173 recentred, height rebounds -> settled by f180; springs.pop squash and stretch (overshoot not measurable); hold 39 fr | hard-cut | tick |

Evidence per row: 1 `sheet-01 cells 0–3`, `kf-000.50.jpg`; 2 `sheet-01 cells 3–10`, `kf-001.50.jpg`; 3 `sheet-01 cells 10–15`, `sheet-02 cells 0–4`, `kf-003.50.jpg`, `kf-004.50.jpg`; 4 `sheet-02 cells 4–13`, `kf-005.50.jpg`, `kf-006.50.jpg`. No cut frames (cuts.json is empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| liquid-glass | 1–4 | craft/vocabulary.md#look, craft/04#springs (glass rides one spring per state) |
| shader-bg | 1–4 | craft/vocabulary.md#look |
| morph | 1–4 (between states) | craft/vocabulary.md#transitions, craft/04#springs |

## Look
Palette: #000000 background, #F36A69 stripe highlight, #C22623 hot spot accent, #AF4645 mid stripe, #641A19 deep stripe, #350D0B shadow band. Type: none. Treatment: liquid-glass, shader-bg. Background: animated shader of soft diagonal light bands (about 35° up to the right) on black, top-right half lit, lower-left half dark; bands drift slowly and dim from 3 s, a saturated red hot spot rises in the lower left from 6 s.

## What to adapt
- Copy: none; optional single label inside the final bar if it becomes a search field or button.
- Brand: the stripe colour carries the accent; swap red for the brand hue and keep the black base. Glass rim is a 1–2 px hairline tinted by the background.
- Timing: holds (rows 2, 3, 4) may stretch; each morph keeps its ~15–22 fr spring so the elastic feel survives.

## Pitfalls
- Glass without strong background detail reads as a flat grey shape: the stripes must pass through the shape so the refraction offset is visible.
- Keep the shape centred between morphs; the only off-centre moment is the bar overshooting to the left edge at f165.
- The glass dims as the shader dims; keep the rim hairline visible on the darkest frames (row 3, 4.00–5.00).

## Missing components
- LiquidGlassShape: rounded-rect glass with refraction (background offset ~4–8 % of size inside the rim), hairline rim, specular edge; animates w, h, radius on a named spring between keyed states (techniques: liquid-glass, morph)
- StripeShaderBackground: WebGL bands at ~35°, 4–6 soft stripes, slow diagonal drift ~40 px/s at 1920 W, intensity and hot-spot keyframes, accent colour param (techniques: shader-bg)

## Proposed terms
- squash-stretch-morph: one glass shape changes aspect ratio on a spring with overshoot, capsule <-> circle <-> bar, rows 1–4 (not in craft/vocabulary.md; not used in recipe.json)
- stripe-shader: drifting diagonal blurred light bands as the whole background, rows 1–4 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strips extracted); sizes from sheet cells and 1 s keyframes, ±3 % of frame width. Not measurable: exact overshoot % and settle frames of each morph, stripe drift speed (motion.json pan is noisy, coherence 0.43–0.73). SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no audio). Catalogue hint physics not used: no falling or collision. loopable false: last cell (bar) differs from first (capsule).

## Study log
id glass-capsule-squash-morph · family product-ui · 7.30 s, 4 rows, 1 continuous shot, 0 cuts
techniques 3 (liquid-glass, shader-bg, morph) · cut_on_beat n/a (silent, 0/0)
not measurable: spring overshoot and settle frames (±0.25 s), stripe drift speed
proposed terms: squash-stretch-morph, stripe-shader
missing components: LiquidGlassShape, StripeShaderBackground
phase B: not run
