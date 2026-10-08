# Caps punch statements to an accent name reveal

One line on black, a cut to light grey, then half-sentences built word by word that each land on a single uppercase punch word. An eyebrow and an accent-coloured name reveal follow, three short claims, and a wordmark with a tagline close.

Source: https://www.raylight.app/templates/4NkKI8GD (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A problem-to-promise story told with type only, before any UI is worth showing
- Silent autoplay where each sentence splits into a setup and a one-word payoff
- Naming a product with one accent colour on an otherwise neutral light film
- A 15-20 s teaser for a simple tool with three verb claims
Not for: products that need to show the interface, or copy that does not split into setup + one payoff word.

## Format
16:9 · 18.57 s · 30 fps · light (opens on black for 1.13 s) · music none (silent), cut_on_beat n/a · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.13 | 0–34 | hook | white setup line, 2 words + ellipsis, on black | push-in ~1.00→1.02 | per-word blur-in from 0.27, outExpo ~12 fr (±0.25 s); settled 0.50; dims into the cut | hard-cut | hit |
| 2 | 1.13–2.77 | 34–83 | problem | dark setup half-sentence, 4 words, on light grey, fills left to right at its final position | push-in ~1.00→1.02 | per-word blur-in, stagger ~5 fr, outExpo ~12 fr (±0.25 s); settled 2.00; exit 2.50 fade + blur + drift down ~7 fr (±0.25 s) | blur-dissolve | |
| 3 | 2.77–3.50 | 83–105 | problem | one uppercase punch word completing the sentence | push-in ~1.00→1.02 | whole-word blur-in, outExpo ~7 fr (±0.25 s); settled 3.00; holds 0.5 s | blur-dissolve | tick |
| 4 | 3.50–4.50 | 105–135 | problem | setup line, 3 words, starts the next sentence | push-in ~1.00→1.02 | per-word blur-in under a crossfade with row 3, ~8 fr overlap (±0.25 s); fade from 4.27 | blur-dissolve | |
| 5 | 4.50–6.00 | 135–180 | problem | empty cell, then setup, 2 words + ellipsis, first word left of centre at its final slot | push-in ~1.00→1.02 | gap ≥ 1 cell; word 1 at 4.77, word 2 at 5.27 (+15 fr), outExpo ~12 fr (±0.25 s) | blur-dissolve | |
| 6 | 6.00–7.27 | 180–218 | problem | one longer uppercase punch word | push-in ~1.00→1.03 | blur-in, sharp at 6.27, outExpo ~8 fr (±0.25 s); holds ~0.75 s; fade 7.00; empty 7.27 | blur-dissolve | tick |
| 7 | 7.27–8.77 | 218–263 | problem | promise setup line, 5 words, no end punctuation | push-in ~1.00→1.02 | per-word blur-in from 7.50, stagger ~5 fr (±0.25 s); settled 8.00 | blur-dissolve | |
| 8 | 8.77–10.00 | 263–300 | problem | one uppercase punch word answering the promise | push-in ~1.00→1.02 | blur crossfade over row 7 ~8 fr (±0.25 s); settled 9.00; exit 9.77 sinks into a clip mask, inExpo ~7 fr (±0.25 s) | hard-cut | tick |
| 9 | 10.00–12.00 | 300–360 | logo | empty, then tiny grey uppercase eyebrow, then the name in the accent colour beneath | push-in ~1.00→1.03 | eyebrow fade-in 10.27; name blur-in left to right 11.00 (+22 fr), outExpo ~8 fr (±0.25 s); settled 11.27; gone 12.00 | hard-cut | swell |
| 10 | 12.00–13.27 | 360–398 | feature | claim one, 3 words + period, verb first | push-in ~1.00→1.02 | per-word blur-in from 12.27, settled 12.50; exit 13.00 fade + blur + drift down ~8 fr (±0.25 s) | blur-dissolve | |
| 11 | 13.27–15.27 | 398–458 | feature | claim two, 2 words + period | push-in ~1.00→1.02 | mask-rise at 13.27, springs.maskRise (overshoot not measurable); settled 13.50; holds 1.25 s; fade + lift from 14.77 | blur-dissolve | |
| 12 | 15.27–17.27 | 458–518 | feature | claim three, 3 words + period | push-in ~1.00→1.03 | per-word blur-in rising ~3 % H, outExpo ~12 fr (±0.25 s); settled 15.50; holds 1.5 s; fade + blur from 17.00 | blur-dissolve | |
| 13 | 17.27–18.57 | 518–557 | logo | dark wordmark with a period, small grey 3-word tagline under it | push-in ~1.00→1.02 | wordmark blur-in, sharp 17.50; tagline fade-in 17.77 (+15 fr); both fade 18.27→18.50 | hard-cut | |

Evidence per row: 1 `sheet-01 cells 0–4`, `cuts/cut-001.13.jpg` (before); 2 `sheet-01 cells 5–10`, `cuts/cut-001.13.jpg` (after); 3 `sheet-01 cells 11–14`; 4 `sheet-01 cells 14–15`, `sheet-02 cells 0–1`; 5 `sheet-02 cells 2–7`; 6 `sheet-02 cells 8–12`; 7 `sheet-02 cells 13–15`, `sheet-03 cells 0–2`; 8 `sheet-03 cells 3–7`; 9 `sheet-03 cells 8–15`, `keyframes/kf-011.50.jpg`; 10 `sheet-04 cells 0–4`; 11 `sheet-04 cells 5–12`; 12 `sheet-04 cells 13–15`, `sheet-05 cells 0–4`; 13 `sheet-05 cells 5–10`, `keyframes/kf-017.50.jpg`.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| statement-sequence | 1–13 | craft/05-typography.md, craft/families/statement.md |
| blur-in | 1–10, 12, 13 | craft/05-typography.md, studio API `BlurIn` / `TYPE_ENTER.blurDrop` |
| push-in | 1–13 | craft/03-camera-and-staging.md (scale creep 0.5–2.6 %/s) |
| blur-dissolve | 2–7, 10–12 | craft/09-transitions.md |
| mask-rise | 11 (entrance), 8 (reverse, as exit) | craft/04-motion.md `maskRise`, `TYPE_ENTER.mask` |

## Look
Palette: #F6F6F8 background (light grey), #1D1F1E text, #E77134 accent (name only), #000000 opening background, #A8A9AA muted (eyebrow, tagline). Type: bold grotesk; sentence case setup lines and claims ~5 % H; single uppercase punch words ~5 % H; tiny tracked uppercase eyebrow ~1.5 % H; name in accent ~6 % H. Treatment: none. Background: flat (black for row 1, light grey after).

## What to adapt
- Copy: 1 hook line (2–3 words + ellipsis), 3 setup + punch pairs (setup 2–5 words, punch one uppercase word that completes it; the third answers the problem), eyebrow, name, 3 claims of 2–3 words with periods, a 3-word tagline. 11 lines plus name and eyebrow.
- Brand: only the name in row 9 carries the accent; everything else is fg on bg. The closing wordmark is dark, not accent.
- Timing: setup rows stretch with word count (~5 fr per word); punch holds stay short (15–22 fr) so the payoff feels like a snap; claims hold 38–45 fr.

## Pitfalls
- Punch words must be alone on screen, uppercase, with no end punctuation; mixing them into the setup line kills the payoff.
- Setup lines keep their final centred layout while words fill in; re-centring per word looks like jitter.
- One empty cell before the eyebrow (row 9) is the only real pause; keep it, it marks the turn from problem to product.
- The accent appears only once; repeating it on the claims flattens the reveal.

## Missing components
- PunchPair: a setup statement followed by one uppercase word, with a crossfade (~8 fr) or an empty frame between, setup per-word blur-in stagger ~5 fr, punch whole-word blur-in ~7 fr; can be composed from `StatementSequence` with per-statement `enter`/`exit`. (techniques: statement-sequence, blur-in, blur-dissolve)

## Proposed terms
- caps-punch: a sentence split across two statements where the second is one uppercase word completing the first (rows 2–3, 4–6, 7–8) (not in craft/vocabulary.md; not used in recipe.json)
- mask-sink: the reverse of mask-rise as an exit, glyphs sink under a clip edge (row 8) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips (the analysis dir is read-only, so the strips folder could not be created). Not measurable: per-word stagger below 0.25 s, entrance lengths under 8 fr, spring overshoot on the row 11 mask-rise, exact blur radius. Camera creep from motion.json zoom %/s (0.5–2.6 %/s). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/1 cuts within ±2 fr (no beats, no music). Palette from palettegen on keyframes kf-000.50, kf-011.50, kf-017.50.

## Study log
id caps-punch-statement-reveal · family kinetic-type (catalogue hinted product-ui; no UI on any sheet) · 18.57 s, 13 rows.
1 hard cut (1.13 s, black to light); the shot after it (17.4 s) split at every new text state.
Techniques 5: statement-sequence, blur-in, push-in, blur-dissolve, mask-rise. Difficulty medium (5 techniques), render light.
Audio: silent, no music, no VO; cut_on_beat false (0/1, no beats); sfx planned by the glue rule.
Not measurable at 0.25 s: staggers, entrance frames < 8, overshoot; no strips (read-only analysis dir).
Proposed terms: caps-punch, mask-sink. Missing components: PunchPair (composable from StatementSequence).
Phase B: not run.
