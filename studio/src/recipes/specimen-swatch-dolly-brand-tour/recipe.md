# Brand guide tour: specimen push, swatch dolly, lockup

One-shot identity walkthrough on pale grey: title blurs in, a two-font specimen pushes toward camera, five swatches cascade in, the camera zooms on them and dollies across, a mood board, then a lockup holds.

Source: https://www.raylight.app/templates/QFw3nJpQ (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- Presenting a new visual identity or brand guide to a client
- Portfolio piece showing fonts, colours and a closing lockup in about 15 s
- Silent autoplay where calm type and flat colour carry the film
- Opening a longer identity presentation before the detailed pages
Not for: products that need UI, claims or a CTA; brands without a defined palette and type pair.

## Format
16:9 · 15.6 s · 30 fps · light · no music (silent), cut_on_beat n/a (0 hard cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.50 | 0–45 | hook | tiny company eyebrow, 3-word title with trailing asterisk, tiny tagline, centred on pale diagonal gradient | push-in ~1.00→1.06 over 45 fr | title blur-in whole line, soft at 0.27, sharp by 0.50, easings.outExpo ~8 fr (±0.25 s); tagline fades in; group fades out 1.27→1.50 | continuous | swell (planned) |
| 2 | 1.50–3.77 | 45–113 | feature | section label, display font name + weights line, mono font name + weights line, on white | static to 2.27, then push-in 1.00→~1.9 to 3.50 with upward drift, easings.inExpo (±0.25 s) | display name blur-in 1.50, sharp 1.77; mono name blur-in 1.77 resolving left to right, sharp 2.00; fades to white by 3.77 | continuous | whoosh (planned) |
| 3 | 3.77–5.10 | 113–153 | feature | section label, five rounded swatches in a row with small hex captions | static | label at 4.00; swatches card-grid cascade left to right, all settled by 4.77, stagger ~2–3 fr (±0.25 s), easings.outExpo | continuous | pop (planned) |
| 4 | 5.10–6.77 | 153–203 | feature | close on the swatch row: three swatches fill the width, mono hex captions below | zoom-tier full→element ~1.0→2.1 over 5.10–5.77, springs.cameraIn (overshoot not measurable); dolly left with speed ramp ~8 / 56 / 19 px/fr @1920 (±0.25 s) | swatches static in plane; only camera moves; easings.inOutSine on the dolly | blur-dissolve | swoosh-short (planned) |
| 5 | 6.77–8.77 | 203–263 | feature | mood board section: label at top, bg to pale cool grey, empty image slot, small numbered caption at bottom | static | swatches blur and fade 6.77→7.00 (~6 fr); label at 7.27; bg tint 7.27→7.50; caption one from 7.50 | continuous | tick (planned) |
| 6 | 8.77–12.27 | 263–368 | feature | same frame; caption steps to image two, then three | static | caption cross-fades ~8 fr at 8.27–8.77 and 9.50–9.77 (±0.25 s); hold; bg back to white at 12.00 | continuous | tick (planned) |
| 7 | 12.27–15.60 | 368–468 | logo | uppercase two-word lockup, tiny mono sub-line with an edition year, pale gradient | push-in ~1.00→1.03, decelerating, easings.outQuint | lockup blur-in, sharp by 12.50 (outExpo ~8 fr, ±0.25 s); sub-line fades in; hold 3 s; fade out 15.27→15.50 | end | shimmer (planned) |

Evidence per row: 1 sheet-01 cells 0–6, kf-000.50; 2 sheet-01 cells 6–15, kf-001.50..kf-003.50; 3 sheet-02 cells 0–4, cuts/cut-005.10.jpg (before); 4 sheet-02 cells 4–11, cuts/cut-005.10.jpg (after), cuts/cut-006.77.jpg (before); 5 sheet-02 cells 11–15, sheet-03 cells 0–3, cuts/cut-006.77.jpg (after); 6 sheet-03 cells 3–15, sheet-04 cell 0, kf-009.50; 7 sheet-04 cells 1–14, kf-013.50.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| blur-in | 1, 2, 7 | craft/vocabulary.md#type (BlurIn) |
| push-in | 1, 2, 7 | craft/vocabulary.md#camera (Camera, KenBurns) |
| card-grid | 3 | craft/vocabulary.md#ui |
| zoom-tier | 4 | craft/vocabulary.md#camera (Camera) |
| dolly | 4 | craft/vocabulary.md#camera (Dolly) |
| speed-ramp | 2, 4 | craft/vocabulary.md#camera |
| blur-dissolve | 4 | craft/vocabulary.md#transitions |

## Look
Palette: #FAFBFD background, #010101 text, #6658EA violet swatch, #00E5FD cyan swatch, #E1ACB9 pink (sampled mid-blend; on-screen caption reads a hotter pink), #EEF2F5 mood board grey. Type: geometric grotesk bold title ~5 % H with trailing asterisk; small section labels ~2 % H; mono for specimen and hex captions; closing lockup uppercase bold ~5 % H. Treatment: none (catalogue hint glow not visible). Background: white to pale cool-grey diagonal gradient on title and lockup, flat white on specimen and swatches, flat grey on mood board.

## What to adapt
- Copy: eyebrow (2 words), title (2–3 words), tagline (≤ 5 words), 3 section labels (1–2 words), 2 font names with weight lines, lockup (2 words) + sub-line (3 words).
- Brand: swatches come straight from the brand colour tokens; display and mono fonts from brand.json; lockup is the wordmark.
- Timing: rows 5–6 (mood board) stretch with the number of images; row 4 zoom + dolly keeps 50 fr; entrances keep ~8 fr.

## Pitfalls
- The specimen push accelerates (inExpo) and exits by fading at max scale: a linear push reads as a slow zoom, not a hand-off.
- The swatch zoom is the only soft transition into the dolly; cutting there breaks the one-shot feel.
- Mood board slots render empty in the reference: supply real images or the section is 5 s of nothing.

## Missing components
- SwatchRow: N rounded colour tiles (radius ~4 % of tile) with mono hex captions, cascade stagger, laid out on a flat plane for Camera/Dolly (techniques: card-grid, dolly)
- TypeSpecimen: font name set in its own face + small weights line, stacked pair (techniques: blur-in)

## Proposed terms
- swatch-strip: palette tiles in a row, camera dollies across them (row 4)
- type-specimen: font names set in their own faces with weight lines (row 2)
- mood-board-step: image slots stepping with a numbered caption (rows 5–6)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strip. Not measurable: staggers, blur durations, spring overshoot, exact zoom curve, mood board image motion (slots empty in the export). Scale values from cell widths (±10 %). Dolly speeds from motion.json pan (-160 px/s average) and sheet swatch offsets. SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts (silent, no hard cuts).

## Study log
id specimen-swatch-dolly-brand-tour · family logo-brand · 15.6 s, 7 rows, one continuous shot, 2 soft transitions
techniques 7 (blur-in, push-in, card-grid, zoom-tier, dolly, speed-ramp, blur-dissolve)
cut_on_beat: n/a (silent, 0 hard cuts); all sfx planned
not measurable at 0.25 s: staggers, blur durations, overshoot; mood board images missing in the export
proposed terms: swatch-strip, type-specimen, mood-board-step
missing components: SwatchRow, TypeSpecimen
phase B: not run
