# Split band photo reveal to wordmark

From black, a thin vertical slit opens into side-by-side photo bands that swap images every quarter second, then part to uncover a full-frame texture shot where a bold wordmark rises out of a baseline mask and holds.

Source: https://jitter.video/template/the-edit-split-reveal/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A fashion, beauty or lifestyle brand with strong photography and a text wordmark
- A 6 s opener or chapter change that ends on the name
- Teasing several mood or product photos before one hero image
- Silent autoplay where the picture carries the energy
Not for: products with no photography (UI-only tools), or films that need a claim or CTA: there is no copy beyond the name and two labels.

## Format
16:9 · 6.00 s · 30 fps · dark · no music (silent), cut_on_beat n/a · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.50 | 0–15 | hook | black, then a thin vertical slit right of centre opens onto a monochrome collage photo | static frame; photo in the slit pushes in | slit appears f8 at ~5 % W, widens to ~50 % W by f15 as two bands, easings.outExpo ~7 fr (±0.25 s) | mask-wipe | swoosh-short |
| 2 | 0.50–1.27 | 15–38 | tension | montage: 4 to 6 vertical bands of different widths, each a different photo, photos swap every 0.25 s | push-in per band ~1.00→1.04 | band edges slide and re-divide the frame each cell; swaps at f15, f23, f30, f38; motion blur on the f23 swap (±0.25 s) | mask-wipe | camera-shutter |
| 3 | 1.27–1.77 | 38–53 | logo | bands part to the edges, revealing a full-frame dark textile close-up; wordmark rises from a baseline clip, corner labels in | push-in ~1.00→1.02, settling | two cream side bars stay f38–f47 then slide off; letters rise out of a clip, tops at f45, settled f53, springs.maskRise ~15 fr (overshoot not measurable) | hard-cut | tick |
| 4 | 1.77–6.00 | 53–180 | logo | wordmark centred over the textile with two tiny corner labels, held | static (zoom 0.06 %/s) | hold 127 fr, nothing moves | hard-cut | |

Evidence per row:
1. sheet-01 cells 0–2 (0.00, 0.27, 0.50), cuts/cut-000.27.jpg (before), keyframes kf-000.50.
2. sheet-01 cells 2–5 (0.50, 0.77, 1.00, 1.27), keyframes kf-001.50 region; motion.json sec 0–1.
3. sheet-01 cells 5–7 (1.27, 1.50, 1.77), cuts/cut-000.27.jpg (after 1.57 shows letters cut off at the baseline).
4. sheet-01 cells 8–15, sheet-02 cells 0–7; motion.json sec 2–5 = hold.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| mask-wipe | 1–3 | craft/vocabulary.md#transitions, TRANSITIONS / ShotTransition (vertical band masks open and part) |
| mask-rise | 3 | craft/vocabulary.md#type, TYPE_ENTER.mask (springs.maskRise) |
| push-in | 1–3 | craft/vocabulary.md#camera, KenBurns inside each band |

## Look
Palette: #01040D background (deep navy black), #FFFFFF wordmark, #4B7B95 accent (textile highlight blue), #1B4365 mid blue, #F2F2F2 paper white of the collage photos, #1F1B12 warm dark of the montage. Type: heavy grotesk wordmark, all caps, tight tracking, cap height ~18 % H, small superscript symbol; tiny tracked mono corner labels (~1.5 % H). Treatment: none. Background: black, then photography (montage bands), then a full-frame textile photo.

## What to adapt
- Copy: the wordmark (one word) and two corner labels, 2 to 3 words each (place line, founding year).
- Brand: wordmark in fg white over a dark hero photo; the accent lives in the hero photo, not in UI colour. Pick photos whose palette matches the brand.
- Timing: rows 1 to 3 keep their frame counts (53 fr reveal); row 4 hold stretches or shrinks freely (127 fr at 6 s).

## Pitfalls
- The montage reads only if each band photo differs strongly in tone (mono collage, skin, textile, cream product); similar photos turn it into noise.
- Band edges must stay hard and vertical: no feather, the split look depends on crisp seams.
- The wordmark rises only after the bands are nearly gone (f45); starting it earlier fights the reveal.
- 4.2 s of static hold: keep it for a title card, cut it for social.

## Missing components
- SplitBands: N vertical band masks (4 to 6, widths 5 to 30 % W) over a stack of photos; edges animate on easings.outExpo, each band swaps its photo on a frame list, final `part` moves the outer bands off the frame edges in ~9 fr (techniques: mask-wipe)

## Proposed terms
- split-band-reveal: the frame splits into vertical bands that open from a slit, swap photos per band, then part to reveal the hero shot (rows 1–3) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips extracted (source file is not part of the analysis folder for this job). Not measurable: exact band edge easing, overshoot of the wordmark rise, number of bands per frame beyond ±1. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts (no hard cuts, no beats). Palette from palettegen on keyframes kf-002.50 (hero) and kf-000.50 (montage).

## Study log
id split-band-photo-reveal · family transitions · 6.00 s, 4 rows (hook, tension, logo, logo).
Techniques 3 (mask-wipe, mask-rise, push-in). cut_on_beat n/a: silent, 0 hard cuts, 1 soft transition 0.27–1.57 s.
Not measurable: band easing and wordmark overshoot (0.25 s resolution, no strips).
Proposed terms: split-band-reveal. Missing components: SplitBands.
Phase B: not run (study only).
