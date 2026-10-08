# Iridescent foil sheen on a still mark

A single brand mark holds dead centre on black while a pearly, iridescent foil sheen drifts across its surface. Nothing moves but the light, so the mark reads as a premium physical object.

Source: https://jitter.video/template/holographic-logo/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A premium end card or logo sting of about 3 s
- A brand with a bold, solid mark that can carry a surface texture
- Silent loops for social headers or product pages
- Closing a longer film where the mark should feel tangible, not animated
Not for: thin line marks or small wordmarks (the sheen needs area to read); films that need a reveal or entrance (the mark is on screen from frame 0).

## Format
other (1280x800, 16:10) · 2.97 s · 30 fps · dark · no music, cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.97 | 0–89 | hook | one solid brand mark centred on pure black, pearly silver foil fill with lilac, mint and blue tints | static (mark geometry identical in all 12 cells) | only the fill moves: highlight bands drift along the mark, easings.linear over 89 fr (±0.25 s); fill brightens to near white at 2.50–2.77 and a fine dot emboss shows | hard-cut | shimmer |
Evidence: `sheet-01 cells 0–11` (0.00 to 2.77), `keyframes/kf-000.50.jpg`, `keyframes/kf-001.50.jpg`; cuts.json has 0 hard, 0 soft, 0 flashes, so `cuts/` is empty.

Working list (sheet-01): 0.00 bright patch on the lower bowl, lilac on the tail · 0.50 patch moves to the left edge of the bowl, mint tint appears · 1.00–1.50 cooler mint/blue band on the bowl, lilac band mid-tail · 1.77–2.27 bands shift right along the tail · 2.50 whole fill near white, dot emboss visible · 2.77 brightest, thin grey rim on the outline.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| halftone | 1 (fine dot emboss visible in the fill at 0.50 keyframe and cells 2.50, 2.77) | craft/vocabulary.md#look |

## Look
Palette: #000000 background, #F0F1F3 foil highlight, #C1C5D0 silver base, #9EA2B5 cool blue-lilac tint, #777882 shadow on the fill, #9C9A98 warm grey rim. Type: none. Treatment: halftone (fine dots in the fill). Background: flat pure black, no vignette, no grain.

## What to adapt
- Copy: none; the mark is the only element.
- Brand: the mark shape is the input; the foil replaces brand colours, so the accent can at most tint one of the 3–4 sheen bands.
- Timing: the single row stretches freely (the sheen is continuous); keep drift speed so the bands cross about one mark width in ~3 s.

## Pitfalls
- Mark geometry must stay still: any scale or drift competes with the sheen and makes it read as a cheap gradient slide.
- Tints must stay pastel (low saturation over silver); saturated rainbow bands read as a gamer effect, not foil.
- The fill brightens toward the end; if the film loops, ease the brightness back or the loop seam shows.

## Missing components
- FoilMark: mark clipped fill with a silver base, 3–4 pastel tint blobs (lilac, mint, ice blue) moving along a seeded noise path at ~0.3 mark widths/s, a thin darker rim (2 px at 1280 w), optional fine dot emboss and an end-brightness ramp (techniques: halftone; proposed foil-sheen)

## Proposed terms
- foil-sheen: an animated iridescent gradient clipped to a still mark, pearl base with drifting pastel highlight bands; row 1 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (cells at 0.00, 0.27, 0.50 … 2.77). Not measurable: exact sheen speed and path (fill change only, no geometry), the timing of the end brightening (between 2.27 and 2.50 ±0.25 s). motion.json reports zoom 0.8–1.9 %/s and pan ≤ 12 px/s; the mark outline is unchanged across cells, so this is the fill flow read as motion. No ffmpeg cut frames exist (0 cuts); palette sampled from the two keyframes. SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr (no music, no beats).

## Study log
id foil-sheen-mark-hold · family logo-brand · 2.97 s, 1 row (hook), 0 cuts
techniques 1 (halftone) · cut_on_beat n/a (0/0), silent reference
Not measurable: sheen speed and path, brightening onset (±0.25 s)
Proposed terms: foil-sheen
Missing components: FoilMark
Phase B: not run (study job)
