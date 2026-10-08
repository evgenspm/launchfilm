# Kinetic type move reel on light grey

Eleven text beats on flat light grey, one type move each: lens pull, centred re-flow, spring rise, four gradient verbs rising through a clip mask, a typed URL. Exits have direction and beat entrances.

Source: https://www.raylight.app/templates/gsL3RnzC (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A type-only launch or capability list with no UI to show yet
- Listing four one-word verbs of what the product does (one verb per 1.4 s)
- A silent autoplay feed where type alone must carry about 15 s
- Showing a range of text animation styles in one film
Not for: products that need UI on screen to be understood; brands with one strict accent colour (the four verb gradients need four hues, or tint one accent).

## Format
16:9 · 16.4 s · 30 fps · light · no music, cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.40 | 0–72 | hook | greeting word, then product name joins it in a navy to cyan gradient | static | lens pull 10 fr (blur 0.15 em, scale 1.10→1.00); re-flow 285 px on springs.ui 20 fr, name blur-in from peak velocity, sharp 8 fr later; lift 130 px easings.inExpo 15 fr | blur-dissolve | none |
| 2 | 2.40–3.77 | 72–113 | feature | three-word line naming the core capability | static | per-word spring rise from 1 em below, stagger 3 fr, springs.snappy, settled 15 fr; exit drift up + fade 6 fr | hard-cut | none |
| 3 | 3.77–5.20 | 113–156 | feature | verb one, 40 % H, blue vertical gradient | static | per-letter mask-rise, stagger 2.3 fr, springs.maskRise (10 % overshoot, settled 12 fr); exit up through clip top 150 px, easings.inExpo 8 fr | hard-cut | swoosh-short |
| 4 | 5.20–6.70 | 156–201 | feature | verb two, green vertical gradient | static | same mask-rise; exit up 8 fr at 6.50 (±0.25 s) | hard-cut | swoosh-short |
| 5 | 6.70–8.10 | 201–243 | feature | verb three, red vertical gradient | static | same mask-rise from 6.77 (±0.25 s); exit up 8 fr | hard-cut | swoosh-short |
| 6 | 8.10–9.50 | 243–285 | feature | verb four, indigo vertical gradient | static | same mask-rise from 8.27 (±0.25 s); exit up at 9.27 (±0.25 s) | hard-cut | swoosh-short |
| 7 | 9.50–10.95 | 285–329 | feature | two-line statement, line two in blue to violet gradient | static | per-word spring rise, stagger 3 fr, springs.snappy (overshoot not measurable); exit fade + blur (±0.25 s) | blur-dissolve | none |
| 8 | 10.95–12.10 | 329–363 | feature | three-word line naming the use case | static | whole-line lens pull 10 fr, sharp by 11.27 (±0.25 s); exit slide left + fade | blur-dissolve | none |
| 9 | 12.10–12.95 | 363–389 | feature | three-word line continuing row 8, passes through | static | in from the right easings.outExpo (±0.25 s); leaves left word by word with blur | blur-dissolve | none |
| 10 | 12.95–14.40 | 389–432 | feature | three-word benefit line built word by word, kept centred | static | each word blur-in at the right end, stagger 3 fr, line chases centre on springs.ui 21 fr, no overshoot; exit drop + blur (±0.25 s) | blur-dissolve | none |
| 11 | 14.40–16.40 | 432–492 | cta | product URL typed from a fixed left edge | static | typewriter 1 char per 2–3 fr to 15.50, no caret; hold 0.8 s; blur-out 16.27–16.40 (±0.25 s) | blur-dissolve | type-click |

Evidence per row: 1 sheet-01 cells 0–9 (0.00–2.27); 2 sheet-01 cells 10–15 (2.50–3.77); 3 sheet-01 cell 15 + sheet-02 cells 0–4 (3.77–5.00); 4 sheet-02 cells 5–10 (5.27–6.50); 5 sheet-02 cells 11–15 + sheet-03 cell 0 (6.77–8.00); 6 sheet-03 cells 1–6 (8.27–9.50); 7 sheet-03 cells 7–11 (9.77–10.77); 8 sheet-03 cells 12–15 + sheet-04 cell 0 (11.00–12.00); 9 sheet-04 cells 1–4 (12.27–13.00); 10 sheet-04 cells 5–9 (13.27–14.27); 11 sheet-04 cells 10–15 + sheet-05 cells 0–1 (14.50–16.27). No cut frames (cuts.json is empty); keyframes kf-001.50, kf-004.50, kf-008.50, kf-013.50 read for colour.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| statement-sequence | 1–11 | craft/05#recipes, craft/families/statement.md |
| blur-in | 1, 7, 8, 10 | craft/vocabulary.md#type (BlurIn enter lens / springRise) |
| mask-rise | 3–6 | craft/vocabulary.md#type (BlurIn enter="mask", typeSprings.maskRise) |
| typewriter | 11 | craft/vocabulary.md#type (Typewriter) |
| blur-dissolve | 1, 7–11 | craft/vocabulary.md#transitions |

## Look
Palette: #EFEFEF background, #020202 body text, #0799FB verb accent (blue), #5353F8 verb accent (indigo), #2B3F4C / #67B3D8 name gradient navy to cyan. Type: geometric grotesk ~500 weight, sentence case, tight tracking; hero 19 % H, verbs 40 % H, body 7 % H. Treatment: none. Background: flat.

## What to adapt
- Copy: greeting word + name (2 words), capability line (3 words), 4 one-word verbs, two-line statement (≤ 3 words each), two use-case lines (3 words each), benefit line (3 words), URL.
- Brand: the accent carries the name gradient and the statement's second line; the four verbs take four tints (or four hues if the brand allows); no logo, the URL is the close.
- Timing: verbs keep a 1.4–1.5 s period and the 8 fr exit; hook and URL hold may stretch.

## Pitfalls
- Re-flow must travel on springs.ui (~20 fr); a jump relayout loses the effect.
- Overshoot only on big single verbs and letters (maskRise), never on body lines.
- Gradients sit inside the letters, vertical on single verbs; horizontal only on the name.
- Mask exits go up through the clip top in 8 fr; exits longer than entrances break the cadence.

## Missing components
- none (BlurIn enter lens/mask/springRise, WordSwap blur mode for the re-flow, Typewriter cover every row; the slide-through line in row 9 is a BlurIn with a horizontal push)

## Proposed terms
- lens-pull: whole line resolves from blur 0.15 em and scale 1.10 in 10 fr (rows 1, 8) (not in craft/vocabulary.md; not used in recipe.json)
- line-reflow: existing words travel on a spring to stay centred as a new word arrives (rows 1, 10)
- gradient-fill-type: gradient clipped to letter shapes (rows 1, 3–7)
- slide-through-line: a line enters from one side and leaves through the other (row 9)

## Measurement notes
Resolution: 0.25 s from sheets; 1 fr numbers (lens pull, re-flow, mask-rise spring, mask exit, word stagger) from the human per-frame notes at 30 fps. Not measurable: overshoot on rows 7 and 10 and exact exit lengths of rows 4–9 (±0.25 s). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts (no music, no cuts). Catalogue hint mesh-gradient not seen: background is flat #EFEFEF.

## Study log
- id kinetic-type-move-reel · family kinetic-type · 16.40 s · 11 rows, single shot, 0 cuts
- techniques 5 (statement-sequence, blur-in, mask-rise, typewriter, blur-dissolve) · cut_on_beat n/a, no audio
- not measurable: overshoot on body lines and exits of rows 4–9 (±0.25 s from sheets)
- proposed terms: lens-pull, line-reflow, gradient-fill-type, slide-through-line
- missing components: none
- phase B: not run (study only)
