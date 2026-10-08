# Twin serif phrases around a splitting wordmark

Two 2-line serif phrases rise out of clip masks above and below a small centred wordmark; the mark splits in half and pushes the phrases apart, then the top phrase drops away and the bottom one holds alone.

Source: https://jitter.video/template/the-edit-product-launch/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A fashion, beauty or lifestyle brand opening a campaign with a two-part contrast line (past vs present)
- Silent autoplay feeds where type alone carries a short editorial statement
- A 6 s intro or bumper in 4:5 before product shots
- Brands with a short all-caps wordmark that still reads when split into two halves
Not for: products that need UI or a feature claim; copy longer than 2 words per phrase; brands without a display serif.

## Format
4:5 · 6 s · 30 fps · light · no music (silent reference), cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.30 | 0–39 | hook | white page, small wordmark centred, four tiny corner labels; phrase one (2 words, 2 lines) rises above the mark, phrase two (2 words, 2 lines) below | static | per line rise out of a clip mask, starts f1 / f5 / f10 / f14 (stagger 4-5 fr), each line easings.outExpo 8 fr, settled f24 | hard-cut | tick |
| 2 | 1.30–3.50 | 39–105 | logo | the wordmark splits into its two halves, which slide out to the phrase edges; the phrases push apart to open a wide middle band; hold | static | split f39, halves out to the text edges, top phrase up ~8 % H, bottom down ~8 % H, one curve easings.inOutSine 15 fr (f39-f54); hold f54-f105 | hard-cut | swoosh-short |
| 3 | 3.50–4.50 | 105–135 | outro | top phrase and both mark halves leave, a faint ghost stays; bottom phrase holds | static | top phrase drops into its masks, lower line f105-f108, upper line f109-f112, easings.inExpo 4 fr; mark halves fade 3 fr at f106; ghost ~3 % opacity | hard-cut | swoosh-short |
| 4 | 4.50–6.00 | 135–180 | outro | bottom phrase alone on white, corner labels faded to the same ghost | static | corner labels fade 4.27-4.50 s (±0.25 s); full hold 45 fr to the end | hard-cut | |

Evidence per row: row 1 `sheet-01 cells 0–5` + 30 fps strip 0–1 s; row 2 `sheet-01 cells 5–13` + strip 1–2 s; row 3 `sheet-01 cells 13–15`, `sheet-02 cells 0–1` + strip 3–4 s; row 4 `sheet-02 cells 1–7`, `keyframes/kf-004.50.jpg`, `kf-005.50.jpg`. No cut frames exist (cuts.json is empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| mask-rise | 1, 3 (reverse) | craft/vocabulary.md#type, craft/04-motion.md#springs (`maskRise`) |

Note: here the mask rise is per line, not per letter, with a 4-5 fr stagger and no visible overshoot.

## Look
Palette: `#FFFFFF` background, `#010101` type, `#232323` / `#7A7A7A` anti-aliased type edges, `#D1D1D1` / `#F6F6F6` ghost of the removed phrase. Type: high-contrast condensed italic serif display, sentence case, tight leading (~0.9), each line ~11 % H; small bold grotesk caps wordmark ~2 % H; tiny mono caps corner labels ~1 % H. Treatment: none. Background: flat white.

## What to adapt
- Copy: 2 phrases × 2 words, one word per line; phrase one is the thing being left behind, phrase two the thing that stays. Wordmark 4-6 caps, split at its middle. Four corner labels (place, year, season) are optional furniture.
- Brand: type and mark in fg on bg; no accent colour is used. The wordmark is the only brand element.
- Timing: the hold in row 2 (51 fr) and the final hold (45 fr) can stretch; entrance (8 fr per line, 4-5 fr stagger) and exit (4 fr) must keep their frame counts.

## Pitfalls
- Entrance is per line in a hard clip; animating per letter or with blur changes the editorial feel.
- The exit is half the entrance (4 fr vs 8 fr); a slow exit reads as a fade, not a drop.
- The removed phrase leaves a ~3 % ghost; dropping it to 0 makes the last 1.5 s feel empty.
- The split and the phrase push ride one curve; separate timings make the mark look detached.

## Missing components
- SplitMark: a short wordmark that splits at its midpoint into two halves sliding to given x targets, easings.inOutSine 15 fr, with a linked y-offset for content above and below (techniques: proposed mark-split)
- LineMaskStack: lines in individual clip masks, rise in / drop out per line with a frame stagger and an optional residual opacity (BlurIn enter="mask" works per letter; per line is not offered) (techniques: mask-rise)

## Proposed terms
- mark-split: a small wordmark splits into two halves that slide apart and open space for the layout around it (row 2) (not in craft/vocabulary.md; not used in recipe.json)
- ghost-hold: removed text stays at ~3 % opacity as a watermark for the rest of the film (rows 3-4) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from 30 fps strips at t = 0, 1, 3 s; 0.25 s from sheets elsewhere. Not measurable: overshoot (none visible), exact ghost opacity (estimated ~3 %), corner-label fade easing. motion.json reports small zoom (1.3 %/s) in 4-6 s, but the bottom phrase width does not change across sheet-02, so the camera is recorded as static. SFX planned by the glue rule, not measured (silent reference). cut_on_beat = 0/0 cuts (no music, no cuts). Palette from keyframes 0.5 / 2.5 / 4.5 s (no cut frames). Catalogue hints (typewriter, card-grid, hard-cut rhythm) were not seen on the sheets.

## Study log
id mask-rise-split-mark · family kinetic-type · 6.00 s, 4 rows (one continuous shot, split at state changes)
techniques: 1 (mask-rise) · cut_on_beat: n/a, 0 cuts, silent
measured at 1 fr from 30 fps strips (entrance, split, exit); corner-label fade at ±0.25 s
proposed terms: mark-split, ghost-hold
missing components: SplitMark, LineMaskStack
phase B: not run (study only)
