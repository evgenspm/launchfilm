# Shard letters assemble, zoom, image drop

Four bold one-word lines assemble from tilted letter shards on flat cream, hold, then a fast zoom pushes the outer lines off frame and a key-art still drops into the gap between the two middle words.

Source: https://jitter.video/template/text-scramble/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Release-date teaser for a show, drop or launch day: who, what, status, when.
- A 2 to 3 s silent feed loop that ends on one key image.
- Announcing that something is coming before showing it.
Not for: anything with more than four short words of copy, or films that need UI or explanation.

## Format
4:5 · 2.4 s · 30 fps · light · music none (silent reference), cut_on_beat n/a (0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.90 | 0–57 | hook | four one-word caps lines (maker word, title word on top; status word, day word at the bottom), empty middle, flat cream | static f0–f38, then push-in 1.00→1.60 over f38–f57 | scatter assemble: tilted, partly drawn letter shards from f8 (±0.25 s), upright by f30 (±0.25 s), springs.ui (overshoot not measurable); bottom pair lags ~4 fr (±0.25 s); zoom easings.outExpo 19 fr | hard-cut | tick on settle, whoosh on zoom |
| 2 | 1.90–2.40 | 57–72 | reveal | zoomed frame: title word on top, status word at the bottom, landscape key-art still (~53 % W) in the gap | static | still on the cut frame, no entrance; hold 15 fr | hard-cut | impact-low |

Evidence: row 1 = sheet-01 cells 0–7 (0.00 empty, 0.27 first shards, 0.50 partial lines, 0.77 near-resolved, 1.00/1.27 resolved hold, 1.50/1.77 zoom with outer lines cropped), keyframes kf-000.50, kf-001.50, cuts/cut-001.90.jpg (before). Row 2 = sheet-01 cells 8–9, cuts/cut-001.90.jpg (after).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| scatter | 1 | craft/vocabulary.md#type (Scatter, mode assemble), craft/05-typography.md |
| push-in | 1 | craft/03-camera-and-staging.md (Camera; here a fast push, not a slow creep) |

## Look
Palette: #EADAC0 background cream, #010101 type, #ECE1CB light cream variant, #465849 / #D3AF98 / #34272A from the key-art still. Type: heavy grotesk, all caps, tight tracking, centred, ~7 % H resolved, ~11 % H after the zoom. Treatment: none. Background: flat.

## What to adapt
- Copy: 4 lines, 1 word each: maker, title, status, day/date. Top-1 and bottom-2 leave the frame in the zoom, so the title and status words must stand on their own.
- Brand: background colour and type colour; the key-art still is the only colour image.
- Timing: the assembly (f8–f30) and the hold (f30–f38) can stretch; keep the zoom near 19 fr and the cut exactly on its last frame.

## Pitfalls
- The zoom centre is the empty middle, not the text: off-centre and the kept words crop.
- Leave the middle band empty from the start, or the still has no gap to land in.
- The still has no entrance; an animated entrance softens the hard drop.

## Missing components
- GapImage: image centred in the band between two zoomed words, ~53 % W, 16:10, appears on a frame with no entrance (a plain Img inside Camera covers it).
- ShardAssemble mode for Scatter: letters start rotated up to ~10 deg and partly clipped, resolve in place without travel over ~22 fr (techniques: scatter).

## Proposed terms
- shard-assemble: letters resolve in place from rotated, partially clipped fragments rather than flying in; row 1.
- gap-drop: a still image hard-cut into the empty band revealed by a zoom on surrounding type; row 2.

## Measurement notes
Resolution: 0.25 s from sheets (one sheet, 10 cells); no 30 fps strip extracted. Not measurable: per-letter stagger, shard overshoot, exact assembly start. Zoom 1.60x measured from the title word width 52 % → 84 % W between cells 1.00 and 1.77; motion.json agrees (zoom in second 1–2). The catalogue mentions random glyph cycling; the sheets do not show it. SFX planned by the glue rule, not measured. cut_on_beat = 0/1 cuts within ±2 fr (no beats; silent).

## Study log
- id scatter-type-zoom-reveal · family kinetic-type · 2.4 s, 2 rows (1 hard cut at 1.90 s)
- techniques 2 (scatter, push-in) · cut_on_beat n/a (silent, 0/1)
- not measurable at 0.25 s: letter stagger, overshoot, assembly start
- proposed terms: shard-assemble, gap-drop
- missing components: GapImage, Scatter shard mode
- phase B: not run (study only)
