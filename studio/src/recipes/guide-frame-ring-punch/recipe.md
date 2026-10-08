# Guide lines close on a dot that punches into a ring

Four hairline guides slide in from the frame edges and box a gradient dot as it grows; the dot dips, a hole punches open and it swells into a ring, then the ring thins away as the guides fly back out. A 3 s loopable mark sting.

Source: https://www.raylight.app/templates/PqxmHNj6 (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A short loopable sting for a round or ring-shaped mark (or any mark that can sit in a circle).
- A light, precision or design-tool brand that wants a construction-grid feel.
- A bumper before or after a longer film; no copy needed.
- A gradient brand colour that should carry the moment on white.
Not for: wordmark-only brands, dark themes without re-tuning the guide contrast, or films that need a message on screen.

## Format
16:9 · 3.00 s · 30 fps · light · loopable (f89 = f0) · music none, cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.17 | 0–35 | hook | white frame, 4 grey hairline guides on its edges; a vertical-gradient dot appears at centre and grows to a disc 31 % of H | locked; the "zoom" in motion.json is the dot and guides scaling | guides slide in from the edges f2 to a box 2 px outside the disc by f25, easings.inOutCubic 23 fr; dot visible f6 (8 px), grows to 222 px @720 by f25, easings.inOutCubic 19 fr, no overshoot; hold f25–f35 | hard-cut | pop |
| 2 | 1.17–2.53 | 35–76 | logo | disc dips, a white hole punches open at centre, disc swells into a thick gradient ring 50 % of H; guides track its box | locked; guide box 226 → 362 px @720 | anticipation disc 222 → 206 px (−7 %) f35–f42, easings.inOutSine 7 fr; hole opens f41 (9 px) → 210 px by f58; outer 206 → 358 px f42–f61, easings.outCubic 19 fr, no overshoot; hold f61–f76 | hard-cut | whoosh |
| 3 | 2.53–3.00 | 76–90 | outro | ring band thins inward to a hairline and vanishes; guides fly back to the frame edges, ending on the empty first frame | locked; guide box 366 px → full frame | outer edge 357 → 238 px f76–f82 while the hole holds 210 px, easings.inExpo 7 fr, gone f83; guides out f76–f89, easings.inOutCubic 13 fr | hard-cut (loop) | swoosh-short |

Evidence: row 1 `sheet-01 cells 0–5` (0.00–1.27), `keyframes/kf-000.50.jpg`; row 2 `sheet-01 cells 6–10` (1.50–2.50), `keyframes/kf-001.50.jpg` (hole opening), `keyframes/kf-002.50.jpg` (full ring); row 3 `sheet-01 cell 11` (2.77, empty grid). No cut frames (cuts.json is empty). Frame numbers from a per-frame measurement of the local source at 30 fps (disc/hole width on the centre row, guide positions on row 100 / column 100).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| logo-from-dot | 1–2 | craft/vocabulary.md#brand (mark grows from a point) |
| grain | 1–3 | craft/vocabulary.md#look (fine noise inside the gradient fill) |

## Look
Palette: #FFFFFF background, #D4D4D4 guide lines, #61323A dark maroon (gradient top), #D73E23 red, #E76E27 orange, #358EAB teal-blue (gradient bottom; yellow ~#E8C23A and navy ~#1F3A7A sit between and at the end). Type: none. Treatment: grain inside the fill. Background: flat white.

## What to adapt
- Copy: none; the sting is mark-only. Add a wordmark after f76 only if the film continues.
- Brand: the ring gradient carries the brand; use 3–7 vertical stops from the brand palette. Guides in the muted colour. Replace the ring with the brand's round mark masked by the same hole.
- Timing: keep the 7 fr anticipation dip before the hole and the 7 fr exit; holds (f25–f35, f61–f76) can stretch for a longer bumper.

## Pitfalls
- The hole must open only after the dip starts (f41 vs f35): opening it on a static disc loses the punch.
- Guides keep a constant ~2 px margin to the shape box at every frame; tie them to the shape size, do not animate them separately.
- The exit shrinks the outer edge toward a fixed hole (band collapse), not a uniform scale-down.
- Last frame must equal frame 0 (empty grid at the frame edges) or the loop jumps.

## Missing components
- GuideBox: 4 hairlines (2 px @720, #D4D4D4, full-length) that frame a centred rect with margin m; animate the rect from full frame to a target size (techniques: none in vocabulary; proposed `guide-box`).
- GradientRing: centred circle with vertical multi-stop gradient, animatable outer and inner diameters (inner 0 = disc), optional grain (techniques: logo-from-dot, grain).

## Proposed terms
- guide-box: hairline construction lines that close in from the frame edges and frame the subject's bounding box, rows 1–3 (not in craft/vocabulary.md; not used in recipe.json)
- hole-punch: a disc opens a centred hole and becomes a ring after a small anticipation dip, row 2
- band-collapse: a ring exits by its outer edge shrinking to the fixed inner edge until it is a hairline, row 3
- gradient-fill: multi-stop vertical gradient as the subject's fill, rows 1–3

## Measurement notes
Resolution: 1 fr, measured per frame from the local source at 30 fps (sizes in px at 1280×720). Not measurable: exact easing curves beyond shape (named from the size curves), sub-pixel grain size. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts (no cuts, no music).

## Study log
id guide-frame-ring-punch · family logo-brand (catalogue hinted product-ui; no UI on screen, the mark is the subject) · 3.00 s, 3 rows, one shot.
Techniques: 2 (logo-from-dot, grain). cut_on_beat: n/a, 0 cuts, silent.
Measured per frame at 30 fps from the local source: dot f6–f25, dip f35–f42, hole f41–f58, ring settles f61, exit f76–f83, guides out by f89; loopable.
Not measured: easing curves only named from size curves; SFX planned.
Proposed terms: guide-box, hole-punch, band-collapse, gradient-fill.
Missing components: GuideBox, GradientRing.
Phase B: not run.
