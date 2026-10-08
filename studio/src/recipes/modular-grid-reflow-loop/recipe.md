# Modular card grid that reflows in a loop

Dark rounded cards in a fixed panel re-tile three times: columns slide, then rows, then columns, each move landing on a new layout and the last back on the first. Short holds let each set read.

Source: https://jitter.video/template/bento-modular-showreel/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Showing 6 to 8 pieces of work, features or screens at once, no cuts
- A looping hero or background clip for a site, deck or feed
- Silent autoplay where the layout itself is the motion
Not for: films that need a story arc, a claim or a CTA; products with one hero screen.

## Format
other (1322×992, about 4:3) · 8.43 s · 30 fps · light · no music, cut_on_beat 0/0 · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.75 | 0–23 | hook | layout A: 6 dark cards in a light panel, footer wordmark + 3 tiny labels | static | hold 22 fr (±0.25 s) | hard-cut | whoosh |
| 2 | 0.75–2.75 | 23–83 | feature | columns slide vertically at different offsets, land on layout B (5 cards) | static | column translateY, offset ~5 fr (±0.25 s), easings.inOutSine 60 fr (±0.25 s), overshoot not measurable | hard-cut | tick |
| 3 | 2.75–3.50 | 83–105 | feature | layout B holds: big + 2 short left, 2 tall right | static | hold 22 fr (±0.25 s) | hard-cut | whoosh |
| 4 | 3.50–5.50 | 105–165 | feature | rows slide sideways in opposite directions, new cards enter from the edges, land on layout C (8 cards) | static | row translateX, easings.inOutSine 60 fr (±0.25 s) | hard-cut | tick |
| 5 | 5.50–6.25 | 165–188 | feature | layout C holds: 2 short over big left, big + 2x2 small right | static | hold 22 fr (±0.25 s) | hard-cut | whoosh |
| 6 | 6.25–8.00 | 188–240 | feature | columns slide vertically again toward layout A | static | column translateY, offset ~5 fr, easings.inOutSine 53–60 fr (±0.25 s) | hard-cut | tick |
| 7 | 8.00–8.43 | 240–253 | feature | layout A settles, same as frame 0: loop point | static | settle 8 fr (±0.25 s), hold | hard-cut | none |

Evidence per row: 1 `sheet-01 cells 0–2`; 2 `sheet-01 cells 3–10`; 3 `sheet-01 cells 11–13`; 4 `sheet-01 cells 14–15`, `sheet-02 cells 0–5`; 5 `sheet-02 cells 6–8`; 6 `sheet-02 cells 9–15`; 7 `sheet-03 cells 0–1`. No cut frames (cuts.json is empty); keyframes kf-000.50 and kf-005.50 for palette.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| card-grid | 1–7 | craft/vocabulary.md#ui |

## Look
Palette: #EEF0EF panel/background, #060606 cards, #D0D4D5 card labels, #848786 muted footer, #4D504E card hairline. Type: small regular grotesk labels top-left of each card, about 1 % H; tiny mono footer. Treatment: none. Background: light grey vertical gradient darkening to mid grey at the bottom, a lighter rounded panel holding the grid.

## What to adapt
- Copy: one short label per card (2–3 words), footer wordmark plus up to 3 tiny labels
- Brand: cards take the brand surface colour, the panel the brand bg; the wordmark sits bottom-left
- Timing: holds can stretch (22 fr minimum); keep the 60 fr moves and the A to B to C to A order so it loops

## Pitfalls
- The camera never moves; motion.json reports camera-mixed only because the whole grid moves. Moving the panel breaks the look.
- Columns must start a few frames apart; moving all at once reads as a scroll, not a re-tile.
- Last layout must equal the first exactly or the loop jumps.

## Missing components
- ModularGrid: N cards in a masked panel, 3+ layouts as rect lists, column or row translation between them on easings.inOutSine 60 fr, per-column offset 5 fr, loops back to layout 0 (techniques: card-grid)

## Proposed terms
- column-scroll-reflow: card columns translate vertically at offset starts inside a mask and land on a new tiling (rows 2, 6)
- row-slide-reflow: card rows translate horizontally in opposite directions, new cards entering from the edges (row 4)

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strip made). Not measurable: exact move curve, overshoot, column offsets below 7 fr. SFX planned by the glue rule, not measured; the reference is silent. cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats). Palette from keyframes (no cut frames exist).

## Study log
id modular-grid-reflow-loop · family product-ui · 8.43 s, 7 rows, 0 cuts, loopable
techniques 1 (card-grid) · cut_on_beat n/a (silent, 0 cuts)
not measurable: move curves and overshoot (±0.25 s from sheets)
proposed terms: column-scroll-reflow, row-slide-reflow
missing components: ModularGrid
