# Lockup with a stepping word wheel

A fixed logo lockup sits beside a tall vertical list of one-word features; the list steps up one slot per second and only the word level with the lockup is dark. Twenty steps make a seamless 20 s loop.

Source: https://jitter.video/template/the-vault-feature-list/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A product with many features or product lines that each fit in one word (banking, payments, suites).
- A looping background for a booth screen, a story, or a site hero: frame 600 equals frame 0.
- A calm, confident brand voice with no UI to show; the lockup stays readable the whole time.
Not for: features that need more than one word each, or a film that has to tell a problem and a payoff.

## Format
9:16 · 20.00 s · 30 fps · light · music none (reference is silent), cut_on_beat n/a (0 cuts, 0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.40 | 0–12 | hook | lockup (round mark + bold wordmark) left of centre; to its right a list of ~19 one-word features, the word level with the lockup dark, the rest pale by distance | locked-off frame; only the list moves | no entrance, opens mid-loop on word 1; first step starts f12, list rises one row on easings.inOutSine 6 fr (±1 fr), lands f18 | hard-cut | tick |
| 2 | 0.40–20.00 | 12–600 | feature | 20 list steps merged into one row (avg 0.98 s each, 19.60 s total): the list rises one row per second, each new word turns dark beside the fixed lockup | locked-off frame; list travels one row pitch (~5.3 % H) per 30 fr | every second a step starts at x.40 s, easings.inOutSine 6 fr (±1 fr), hold 24 fr; the active word darkens and the previous one greys during the same 6 fr; step 20 (19.40–19.60 s) lands on word 1 again | hard-cut | tick |

Evidence per row: row 1 `sheet-01 cells 0–2` (0.00, 0.27 static, 0.50 mid-move), 30 fps strip 1.00–2.00 s (static f0–f11, moving f12–f17, settled f18–f29). Row 2 `sheet-01 cells 2–15`, `sheet-02` to `sheet-05` all cells: every cell at x.50 is mid-move, every cell at x.00, x.27, x.77 is settled; the active word at 19.77 (`sheet-05 cell 15`) is the same as at 0.00 (`sheet-01 cell 0`). No cut frames exist (`cuts.json`: 0 hard, 0 soft, 0 flashes); keyframes `kf-000.50` to `kf-019.50` read for colour and type.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| word-swap | 1–2 | one slot next to fixed text cycles through words: craft/05-typography.md (WordSwap, mode slot) |
| stacked-roll | 1–2 | lines roll vertically like a slot, with neighbours visible: craft/05-typography.md (StackedRoll) |

## Look
Palette: #C7E7FE background (pale sky blue, flat), #070C0F mark, wordmark and active word, #8CA5B8 near rows, #B1CFE4 far rows. Type: lockup = round black mark + bold grotesk wordmark, sentence case, ~2.6 % H; list = regular grotesk, sentence case, same size, row pitch ~5.3 % H. Treatment: none. Background: flat.

## What to adapt
- Copy: 8–24 one-word features, each one noun; the reference uses 20, so the loop is 20 s at 30 fr per step. Order them so neighbours differ in length.
- Brand: the background carries the brand colour; the mark, wordmark and active word share the fg colour; the list uses muted tints of fg over bg. No accent needed.
- Timing: keep the 6 fr move and the 30 fr period; more words only lengthen the loop. A shorter period than 20 fr makes the words unreadable.

## Pitfalls
- The step is 6 fr with a long hold; a continuous scroll loses the "one feature at a time" read.
- The lockup must not move or scale; any camera move makes the list look like it slides under a sticker.
- Colour must change during the move, not after it, or the active row flickers grey for a frame.
- The list must wrap (the last word is followed by the first) or the loop breaks at frame 600.
- Keep the active word baseline-aligned with the wordmark; a few px of offset reads as a mistake.

## Missing components
- FocusWheel: flat vertical list of N words, active row at the vertical centre beside a fixed node, steps one row every `period` fr on easings.inOutSine over `move` fr, opacity by distance (1, 0.45, 0.3, then down to 0.08 at the frame edge), list wraps for a seamless loop (techniques: word-swap, stacked-roll). WordSwap shows one slot only and StackedRoll is a curved drum with continuous rotation, so neither matches without changes.

## Proposed terms
- `focus-wheel`: flat vertical word list that steps one slot at a time beside fixed text, with opacity falloff by distance from the active row; rows 1–2 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 1 fr from a 30 fps strip at t = 1.00–2.00 s (step move f12–f17); 0.25 s from sheets elsewhere, and every sheet second shows the same pattern (settled at x.00/x.27, mid-move at x.50, settled at x.77). Palette from palettegen on keyframes kf-000.50, kf-010.50, kf-019.50 (no cut frames exist). Not measurable: exact opacity falloff per row (estimated from the sheets, write as a param), type size ±0.5 % H. SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts (no cuts, no beats).

## Study log
- id `lockup-word-wheel-loop`, family `kinetic-type` (text is the picture; catalogue hint `launch-film` rejected: there is no hook/payoff story).
- 20.00 s, 9:16, 30 fps, loopable; 2 rows (hook 0.40 s + one merged row of 20 steps, avg 0.98 s).
- Techniques: 2 (word-swap, stacked-roll); catalogue hint `list-assemble` rejected: the list never builds, reorders or checks.
- cut_on_beat: n/a, 0 cuts, no audio.
- Measured from a 30 fps strip: step 6 fr on inOutSine, period 30 fr, hold 24 fr. Opacity falloff not measured exactly.
- Proposed terms: focus-wheel. Missing components: FocusWheel.
- Phase B: not run (study only).
