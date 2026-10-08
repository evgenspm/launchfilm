# Masked field retries, then a calm word rise

A lone password field is typed, wiped and retyped three times, each attempt longer, before one still line names the pain. The product then fills the field in one go and three short lines rise word by word to a URL.

Source: https://www.raylight.app/templates/KzfDULKH (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- Security, login or credential products whose pain is a familiar input struggle
- A problem then solution story told with behaviour before any copy (6 s of UI before the first word)
- Silent autoplay where one tiny UI element carries the hook
- Short 15 to 20 s teaser with one UI element rebuilt in React
Not for: products whose pain cannot be shown in a single input; films that need VO or many features.

## Format
16:9 · 17.83 s · 30 fps · dark · music none (no BPM), cut_on_beat 0/0 · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.50 | 0–45 | hook | empty white bar on near-black, small wordmark fades in above | locked | wordmark grey to white ~12 fr; bar squashes twice (scaleX 1 to ~0.25 to 1, skewed) at 0.55–0.75 s and 0.95–1.15 s; cursor enters, easings.outQuint ~10 fr (±0.25 s) | continuous | ui-confirm |
| 2 | 1.50–5.97 | 45–179 | problem | field gets label + 3-segment meter; three masked attempts, each wiped and retyped longer | locked (zoom ≤ 0.4 %/s) | typing easings.linear 2 fr/char: 5 chars, hold 27 fr, select-all wipe (1 fr), 10 chars, hold 15 fr, wipe, 20 chars; meter red, orange, green by length; hold 27 fr | continuous | type-click |
| 3 | 5.97–7.77 | 179–233 | problem | one line, 7 words, names the pain; black with two diagonal violet/lilac light streaks | locked, streaks drift (0.5–1.3 %/s) | whole line switches in, no entrance; holds 53 fr | continuous | silence-beat |
| 4 | 7.77–9.60 | 233–288 | reveal | one line, 4 words, names the product as the fix | locked, streaks drift | per-word rise 0.8 em to 0, opacity ~0.3 to 1, easings.outCubic 13 fr per word, stagger ~2.3 fr, settled f251, hold ~35 fr | continuous | tick |
| 5 | 9.60–11.27 | 288–338 | feature | empty field again with outlined pill under it; cursor clicks, pill slides left as a generate button | slight drift 0.6–1.1 %/s | field fades up 10 fr; cursor-path to pill, press ~10.6 s (±0.25 s); pill morph left springs.ui ~10 fr (overshoot not measurable) | continuous | ui-confirm |
| 6 | 11.27–14.33 | 338–430 | feature | click on generate; 20 masked chars fill in one run, meter jumps green | near-locked | click ~11.77 s (±0.25 s); fill easings.linear 2 fr/char, no pauses, no wipes; meter green at 13.77 s | continuous | type-click |
| 7 | 14.33–15.73 | 430–472 | cta | imperative, 2 short sentences, 5 words, tells the viewer to stop remembering | locked, streaks drift | same per-word rise, settled ~18 fr, hold ~22 fr | continuous | tick |
| 8 | 15.73–17.07 | 472–512 | cta | reassurance, 5 words, hands the job to the product | locked, streaks drift | same per-word rise, settled ~16 fr, hold ~22 fr | continuous | tick |
| 9 | 17.07–17.83 | 512–535 | cta | product URL alone, centred | locked | whole block fade + small rise, easings.outCubic 10 fr; holds | end | tick |

Evidence per row: 1 `sheet-01 cells 0–5` (bar squash at 0.50–1.27, cursor at 1.00/1.27); 2 `sheet-01 cells 6–15` + `sheet-02 cells 0–7` (5 dots at 2.00, wipe to 2 at 2.77, 10 at 3.50, 20 and green meter at 5.27); 3 `sheet-02 cells 8–14`; 4 `sheet-02 cell 15` + `sheet-03 cells 0–6` (first word at 7.77, mid-rise 8.00, settled 8.27); 5 `sheet-03 cells 7–13` (fade-up 9.77, click 10.50–10.77, morph 11.00–11.27); 6 `sheet-03 cells 14–15` + `sheet-04 cells 0–9` (3 chars 12.27, 20 chars 13.50, green 13.77); 7 `sheet-04 cells 10–14`; 8 `sheet-04 cell 15` + `sheet-05 cells 0–4`; 9 `sheet-05 cells 5–7`. cuts.json has no cuts (no cuts/ frames); keyframes kf-002.50, kf-006.50, kf-010.50, kf-016.50 used for type and palette.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| typewriter | 2, 6 | craft/vocabulary.md#type (FieldType, Typewriter) |
| ui-rebuild | 1, 2, 5, 6 | craft/vocabulary.md#ui |
| cursor-path | 1, 5, 6 | craft/vocabulary.md#ui (Cursor) |
| morph | 5 | craft/vocabulary.md#transitions (pill to button, inside the shot) |
| statement-sequence | 3, 4, 7, 8, 9 | craft/vocabulary.md#type (StatementSequence) |

## Look
Palette: #090B0A field-scene background, #FFFFFF field and type, #9B9A9B muted grey (wordmark before fade, meter rails), #000000 statement background, #1C1D43 deep violet streak, #B3B3C4 lilac streak. Meter colours (red, orange, green) are visible on the sheets but palettegen did not return them. Type: geometric sans, bold, sentence case, statements one line ~5.5 % of H. Treatment: none from the look list; the streaks are a proposed term. Background: flat near-black for UI rows, black with two soft diagonal light streaks for statement rows.

## What to adapt
- Copy: 5 lines. Problem line ≤ 8 words (still), answer ≤ 5 words with the product name, two closers ≤ 6 words each, then the URL. Field label 1 word, pill labels 1 to 2 words.
- Brand: wordmark above the field; accent colour can replace green as the "strong" meter segment and tint the streaks.
- Timing: rows 2 and 6 must keep 2 fr/char and the 5, 10, 20 escalation; holds in rows 3 and 4 can stretch ±10 fr; closers keep the 13 fr per-word rise.

## Pitfalls
- The wipe is select-all replace (dot count drops in one frame), not backspacing; backspacing reads as calm editing.
- The problem line must arrive still; if it rises like the others, the contrast between pain and relief is lost.
- Words are positioned independently in the source and one gap collapses during the rise; keep word spacing fixed.
- Field is small (5.6 % H, ~44 % W): keep the rhythm, not legibility, as the point.

## Missing components
- LightStreakBackdrop: two soft diagonal gaussian bars (violet + lilac) on black at ~-20°, slow drift ≤ 1.3 %/s scale, angle flips per scene (techniques: none in vocabulary)
- PillButtonMorph under a field: outlined pill below an input slides left of it and relabels on springs.ui ~10 fr (FieldType has no attached button; PillMorph is a notification pill)

## Proposed terms
- `light-streaks`: blurred diagonal light bars drifting behind statement type (rows 3, 4, 7, 8, 9)
- `word-rise`: per-word rise 0.8 em with opacity, no blur, outCubic 13 fr, stagger 2 to 3 fr (rows 4, 7, 8); close to `blur-in` without blur (`TYPE_ENTER.rise`)
- `retry-escalation`: the same input typed, wiped and retyped with growing length to show struggle (row 2)
- `field-squash`: an empty input squashes horizontally like an impatient jelly before focus (row 1)

## Measurement notes
Resolution: 0.25 s from sheets; frame-level numbers (2 fr/char, wipe frames, 13 fr word rise, stagger ~2.3 fr, holds) from the human 30 fps study, not re-measured here. No strips extracted. Not measurable from sheets: spring overshoot of the pill morph, cursor easing, per-word stagger. cuts.json lists 0 cuts; the switches at 5.97, 7.77, 9.60, 14.33, 15.73, 17.07 s look instant on the sheets (three are near-misses in cuts.json) but are recorded as continuous per the rule. SFX planned by the glue rule, not measured (the reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no beats, no cuts).

## Study log
id masked-field-retry-word-rise · family product-ui · 17.83 s, 9 rows, one shot per cuts.json (0 cuts)
techniques 5 (typewriter, ui-rebuild, cursor-path, morph, statement-sequence) · cut_on_beat 0/0, silent, no VO
not measurable at 0.25 s: pill morph overshoot, cursor easing, word stagger (taken from human 30 fps study)
proposed terms: light-streaks, word-rise, retry-escalation, field-squash
missing components: LightStreakBackdrop, PillButtonMorph under a field
phase B: not run
