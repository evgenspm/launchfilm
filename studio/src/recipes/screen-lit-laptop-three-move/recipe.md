# Screen-lit laptop in three slow moves

A dark laptop on pure black, lit only by its own interface, filmed in three equal 5.2 s shots: a low truck across the screen, a push-in on the chart, a pull-out to the whole device. Darkness and foreground keyboard blur sell the macro lens.

Source: https://www.raylight.app/templates/7N16oonC (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A premium, quiet teaser for a desktop or web app that has one strong dashboard screen
- A silent autoplay loop or hero background where nothing flashes or cuts fast
- The UI has a chart or progress panel worth a close detail shot
- Opening or closing a longer film on the product inside its device
Not for: products with no single good-looking screen, mobile-first apps, films that need copy or a CTA on screen.

## Format
16:9 · 15.6 s · 30 fps · dark · music none (no audio track), cut_on_beat n/a (0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–5.20 | 0–156 | hook | low 3/4 angle on the left half of the screen (project page), blurred keyboard deck in the foreground | dolly truck right, -1.5 px/fr at 1920, scale 1.000→1.016 over 156 fr, easings.linear | none; UI static; deck blur ~12–20 px, far screen corner ~3–4 px; no opening fade | hard-cut | none |
| 2 | 5.20–10.40 | 156–312 | proof | close detail on the progress chart panel, keys as large bokeh lower left | push-in 1.00→1.10 over 156 fr, pan +0.5 px/fr, easings.linear | none; chart already drawn | hard-cut | none |
| 3 | 10.40–15.60 | 312–468 | proof | front view of the whole laptop, full overview screen centred, soft keyboard below | pull-out 1.000→0.874 over 156 fr, no pan, easings.linear | none; ends on the held wide frame | hard-cut | none |

Evidence: row 1 `sheet-01 cells 0–15`, `sheet-02 cells 0–4` (4.00–5.00 same angle, screen sliding left); row 2 `sheet-02 cells 5–15` (5.27 first chart close-up), `sheet-03 cells 0–9` (to 10.27); row 3 `sheet-03 cells 10–15` (10.50 first wide front view), `sheet-04 cells 0–14` (laptop shrinks steadily to 15.50). cuts/ is empty (cuts.json found 0 cuts); boundaries 5.20 / 10.40 from cuts.json `near_misses` (scores 6.57, 6.41) and the hand-measured notes, consistent with the sheet cells (±0.25 s from sheets alone).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-laptop | 1–3 | craft/vocabulary.md#ui, LaptopFrame (studio/API.md presets/screen) |
| dolly | 1 | craft/vocabulary.md#camera, Dolly |
| push-in | 2 | craft/vocabulary.md#camera |
| pull-out | 3 | craft/vocabulary.md#camera |
| ui-rebuild | 1–3 | craft/vocabulary.md#ui (one screen, crisp at the 1.10 push) |
| hard-cut | 1→2, 2→3 | craft/vocabulary.md#transitions |

## Look
Palette: #000000 background, #161717 / #242425 UI surfaces, #2E2F37 chart panel, #58585A / #6B6C6C UI text and key glints (palettegen on keyframes 1.50, 7.50, 13.50; cuts/ has no frames). The chart's blue to violet gradient and an amber line are the only colour, too small for palettegen. Type: product UI only, small sans labels, one bold project title. Treatment: none. Background: flat pure black, luma 0–3 outside the device.

## What to adapt
- Copy: none on screen; the product screen is the whole message. One screen, authored at 1512×982, with a chart or status panel in its right third for shot 2.
- Brand: the accent lives only in the chart; keep the UI dark so the screen is the only light source.
- Timing: three equal shots of 156 fr; stretch all three equally, never mix lengths. Moves stay linear across the whole shot.

## Pitfalls
- Exposure: the device body must stay almost invisible (edges and key caps catch screen spill only). A lit body or grey background kills the look.
- Keep moves slow and constant (0.3–2.6 %/s); any easing or spring makes it feel like a UI demo, not a cinematic shot.
- The keyboard blur is the depth cue; without it the 2.5D laptop reads flat.
- It is not an orbit: each shot is a new fixed angle with one linear move.

## Missing components
- LaptopFrame screen-lit pose preset: exposure ~0.1 on the body, rim from screen spill, keyboardBlur 12–20 px at 1920 in shot 1, ~3 px soft far corner (techniques: device-laptop). Likely reachable with existing `exposure` and `keyboardBlur` props; not verified by render.

## Proposed terms
- screen-lit: device lit only by its own screen on pure black, body a near silhouette (rows 1–3) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; cut frames and per-shot scale/pan from the human frame-by-frame notes (1 fr). Not measurable: exact blur radii beyond the notes, chart colours as hex. SFX planned by the glue rule, not measured: no visual events, so none. cut_on_beat = 0/2 cuts within ±2 fr (no audio, no beats).

## Study log
id screen-lit-laptop-three-move · family 3d-device · 15.6 s, 3 rows (5.2 s each) · 6 techniques
cut_on_beat: n/a (silent, 0 beats) → false
cuts.json found 0 cuts; sheets show cuts at 5.20 and 10.40 (near-misses), used as row boundaries
Catalogue hint "orbit" rejected: three fixed angles with linear truck / push / pull
Not measurable from sheets: blur radii, chart accent hex (taken from the measured notes where available)
Proposed terms: screen-lit
Missing components: LaptopFrame screen-lit preset (probably props only)
phase B: not run
