# Offset panel share breakdown rise

A small chart title holds alone on charcoal, then five offset colour panels rise from a baseline one after another, pushing the title to the top while each panel's percentage rolls up from zero. A silent 4 s share reveal.

Source: https://jitter.video/template/stacked-chart-cascade/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Showing how one total splits into 3 to 6 parts (revenue, usage, audience)
- A vertical social post or story slide with one data reveal
- A proof beat inside a longer film where a breakdown backs a claim
- Silent autoplay where the numbers must carry the message
Not for: comparisons over time (use a line or bar chart), more than 6 parts (panels get too thin for figures).

## Format
9:16 · 4 s · 30 fps · dark · music none, cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.25 | 0–38 | hook | charcoal frame; chart title, 2 words, left, small brand glyph right, one line at mid height | locked off | title words rise in, second word lower at 0.27 s, settled 0.50 s: springs.snappy ~8 fr (overshoot not measurable, ±0.25 s); glyph fades in with it; title drifts up ~3 % H 0.27–1.25 s, easings.linear | hard-cut | none |
| 2 | 1.25–1.85 | 38–56 | proof | thin white baseline rule near the bottom; first two offset panels rise from it, figures at zero | locked off | baseline at 1.27 s; panels rise from the bottom in a cascade, stagger ~3 fr (±0.25 s), springs.layout; title travels with the stack 50 % → 15 % H, easings.outExpo ~18 fr (±0.25 s); figures start rolling from 0 | hard-cut | pop |
| 3 | 1.85–2.50 | 56–75 | proof | five offset panels fill the lower 85 % of the frame, each with white top rule, figure and label; title reaches the top | locked off | panels grow up to final heights, springs.layout, settle ~2.40 s (overshoot not measurable); figures roll up, top panel lands first at 2.50 s, easings.outExpo; title settles at 5 % H | hard-cut | tick |
| 4 | 2.50–4.00 | 75–120 | proof | finished breakdown: five panels with percentages and category labels under the title | locked off | remaining figures land by 2.77 s (last +1 to +2 each); then full hold 37 fr | hard-cut | none |

Evidence per row: row 1 `sheet-01 cells 0–5`, `keyframes/kf-000.50.jpg`; row 2 `sheet-01 cells 5–7`, `cuts/cut-001.47.jpg` (before), `keyframes/kf-001.50.jpg`; row 3 `sheet-01 cells 7–9`, `cuts/cut-001.47.jpg` (after 2.23); row 4 `sheet-01 cells 10–15`, `keyframes/kf-002.50.jpg`, `kf-003.50.jpg`.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| chart-draw | 2–3 | craft/vocabulary.md#ui (chart builds on screen) |
| counter | 2–4 | craft/vocabulary.md#type (figures roll from 0) |
| card-grid | 2–3 | craft/vocabulary.md#ui (panels cascade in with stagger) |

## Look
Palette: #1C1C1C background, #A3C3D7 panel 1 (sky blue), #F68132 panel 3 (orange), #E7DE3E panel 4 (yellow), #CB8E4D panel 5 (tan), #3D3830 shadow/outline; panel 2 is a light warm grey (~#D7D0CE, merged out by palettegen); title white. Type: neutral grotesk; title regular, sentence case, ~2.5 % H, white; figures heavy, ~7 % H, near-black, superscript percent at ~45 % size; labels regular ~1.6 % H. Treatment: none. Background: flat.

## What to adapt
- Copy: 1 title line (1–3 words); 3–6 parts, each a percentage and a 2–3 word label.
- Brand: panel colours from the brand palette (5 distinct, mid to light values so near-black figures read); glyph top right is the brand mark.
- Timing: row 1 hold can stretch (title alone); rows 2–3 keep their ~37 fr rise; row 4 hold stretches freely.

## Pitfalls
- Panels overlap: each sits right/down of the previous and covers its lower part; keep figure + label in the visible top-left of each panel.
- Figures are mid-roll while panels move: they must land after the panels settle (top first, 2.50 s; rest by 2.77 s) or the numbers jitter in a moving box.
- The title moves with the stack; anchoring it separately breaks the "pushed up" read.

## Missing components
- OffsetPanelStack: N panels (3–6), each offset ~30 % W right and ~15 % H down from the previous, overlapping, white 6 px top rule, 1 px dark outline; rise from a baseline with springs.layout, stagger 3 fr; slot for a Counter + label at top left of each (techniques: chart-draw, card-grid)

## Proposed terms
- stack-cascade: overlapping offset panels rising from a shared baseline one after another, sized by share (rows 2–3) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strips extracted). Not measurable: entrance overshoot, exact panel stagger, counter easing curve. motion.json reports zoom −5 %/s in 2–4 s, but sheet cells 3.00–3.77 are identical, so no camera move is recorded. The analyser's soft transition 1.47–2.23 s is the panel stack sweeping in, not a scene change. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no beats, no cuts).

## Study log
id offset-panel-share-rise · family data-stats · 4.00 s, 4 rows, 0 hard cuts, 1 analyser soft transition (panel sweep)
techniques 3 (chart-draw, counter, card-grid) · cut_on_beat false (0 cuts, silent)
not measurable at 0.25 s: overshoot, panel stagger, counter curve
proposed terms: stack-cascade · missing components: OffsetPanelStack
phase B: not run (study only)
