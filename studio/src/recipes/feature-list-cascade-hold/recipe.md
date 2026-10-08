# Centred feature list cascade

Eleven short feature lines cascade in top to bottom on black, one every 1.5 frames, each fading up and rising a quarter line, then the full list holds still for three seconds so every item can be read.

Source: https://jitter.video/template/feature-list-apple-event/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- The feature rundown section of a launch film, right after the product reveal.
- A spec or capability list of 6-12 short items that should land as one block, not one at a time.
- Silent autoplay feeds where a dense list must read without VO.
- A calm, premium keynote voice with no UI to show.
Not for: lists with long items (more than 4 words wrap and break the column), or films that need each feature to get its own beat (use `statement-sequence` instead).

## Format
16:9 · 4 s · 30 fps · dark · music none (no audio track), cut_on_beat 0/0 · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–4.00 | 0–120 | hook | black frame; an 11-line centred list of short feature names (1-4 words each) assembles top to bottom, then holds | static (motion diff 0.00 from 1.00 s on) | f0-f9 empty; line 1 at f10; stagger 1.5 fr, line 11 starts f25; each line opacity 0 → 1 and rise ~0.25 line pitch → 0 on `easings.outExpo` 6 fr; settled f30; hold 90 fr | hard-cut | tick (planned) |
Evidence: `sheet-01` cells 0–1 (black), cell 2 (0.50 s: 3 lines solid, 4th fading in), cell 3 (0.77 s: 8 solid, lines 9–10 fading, 11 barely visible), cells 4–15 (1.00–3.77 s: identical full list). Cut frames: none (cuts.json has 0 hard, 0 soft, 0 flashes). Keyframes kf-000.50 (per-line brightness ramp, lower lines still below their rest position) and kf-001.50 (settled). 30 fps strip 0.20–1.17 s for the frame numbers.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| list-assemble | 1 | craft/vocabulary.md#ui (closest id; the look here is plain centred type, see Proposed terms) |

## Look
Palette: `#000000` background, `#FDFDFD` settled text, `#DCDCDC` / `#808080` / `#3D3D3D` intermediate fade states of entering lines (not separate colours). Type: semibold grotesk, sentence case, normal tracking, cap size ~4.3 % H, line pitch 6.7 % H, centred column, block centred vertically. Treatment: none. Background: flat black.

## What to adapt
- Copy: 6-12 feature names, 1-4 words each, one line each; the longest line sets the column width (reference: longest is 4 words, ~35 % W). Mix short and long items so the centred column has a ragged silhouette.
- Brand: text in the brand fg on the brand bg; no accent in the reference. An optional accent on one key item after the hold starts is ours, not measured.
- Timing: lead (10 fr), stagger (1.5 fr) and per-line entrance (6 fr) keep their frame counts; only the hold stretches (minimum ~60 fr for 11 items).

## Pitfalls
- The stagger is under 2 fr: the list reads as one wave, not as items. A 4-6 fr stagger turns it into a slow roll call and changes the tone.
- No overshoot and no blur: lines only fade and rise. Springs here look playful.
- The hold is fully static (no scale creep). Adding push-in is a choice, not the reference.
- Block must be vertically centred for the final count of lines; compute the layout from the full list, not line by line, or the column jumps.

## Missing components
- LineCascade: centred column of N text lines; line i starts at lead + i × stagger (fractional frames allowed), opacity 0 → 1 and translateY 0.25 × pitch → 0 on easings.outExpo over 6 fr; layout from the full list, block centred (techniques: list-assemble). The studio `ListAssemble` renders task rows with a header and does not match.

## Proposed terms
- `line-cascade`: a centred text list whose lines fade-rise in order with a sub-2-frame stagger, then hold as one block (row 1). Not in craft/vocabulary.md; not used in recipe.json.

## Measurement notes
Resolution: 1 fr from a 30 fps strip at t = 0.20–1.17 s; 0.25 s from the sheet elsewhere. Not measurable: exact rise distance (estimated ~0.25 line pitch from the uneven spacing of entering lines in kf-000.50, ±50 %), exact curve shape (fast-start decel, named outExpo). SFX planned by the glue rule, not measured (the reference has no audio). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats).

## Study log
id feature-list-cascade-hold · family kinetic-type (text is the picture; catalogue hinted launch-film) · 4.00 s, 1 row.
Techniques: 1 (list-assemble). cut_on_beat: n/a (0 cuts, no audio), music none, VO none.
Measured from a 30 fps strip: lead 10 fr, 11 lines, stagger 1.5 fr, entrance ~6 fr, settled f30, static hold 90 fr.
Not measurable: rise distance (±50 %), curve shape beyond "decelerating, no overshoot".
Proposed terms: line-cascade. Missing components: LineCascade.
Phase B: not run (study job).
