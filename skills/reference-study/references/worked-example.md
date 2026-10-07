# Worked example: a fictional 12 s statement film

Everything below is invented for teaching: the reference, its URL, its numbers. Follow the same steps on a real
analysis dir. The output recipe.json at the end validates against `schemas/recipe.schema.json` and passes the
vocabulary check.

## Inputs (excerpts)

`meta.json`
```json
{"duration": 12.0, "fps": 30, "width": 1920, "height": 1080, "aspect": "16:9", "url": "https://example.com/reference/dark-statement-film"}
```
`cuts.json`
```json
[2.0, 4.0, 6.0, 8.0, 10.0]
```
`audio.json`
```json
{"loudness": -14.3, "bpm": 120.0, "beats": [0.02, 0.52, 1.02, 1.52, 2.02, 2.52, 3.02, "… every 0.5 s …", 11.52], "has_vo": false}
```
No `transcript.json`. Three sheets (12 s / 4 s).

## A1–A3: what the reading produced

- A1: 1920/1080 = 1.778 → `16:9`; fps 30 → `30`; duration `12`; last cell (logo) ≠ first cell (eyebrow) → not loopable.
- A2: 5 cuts at 2.00, 4.00, 6.00, 8.00, 10.00 s → frames 60, 120, 180, 240, 300 (fps = 30, so @30 is the same).
- A3 working list (t · what changed), from the sheets and the 5 cut frames:
  - `sheet-01` 0.00 · small grey label top of a centred line; the line's words are blurred and partly transparent
  - 0.25–0.50 · words resolve left to right; 0.50 all sharp
  - 0.50–1.75 · same line, its width grows 1 248 → 1 285 px (+3 %) at a slowing rate
  - 2.00 · cut: a new 5-word line, fully sharp in its first cell (no entrance)
  - 2.50 · every word but the last drops to about a third of its brightness
  - `sheet-02` 4.00 · black, the bottom halves of 7 letters visible above a baseline; 4.25 letters complete, accent gradient
  - 4.25–5.75 · width +4 %
  - 6.00 · cut: a sentence, last word in the accent colour; 6.50 the last word is different and the line re-centred;
    7.25 a third word, line re-centred again
  - `sheet-03` 8.00 · a 4-word line, blurred; 8.50 sharp; 8.50–9.75 width +3 %
  - 10.00 · cut to black: a dim mark; 10.25 mark bright with a blue halo; 10.50 wordmark beside it
  - 10.75–11.50 · characters of a domain appear under the wordmark (0, 3, 6, 9, 11 chars) with a block caret
  - 11.50–11.75 · nothing moves (end-card settle, 0.5 s ≤ 3 s allowed)

## A4–A6: rows, beats, per-row fields

- Boundaries 0, 2, 4, 6, 8, 10, 12. No shot < 6 fr, none > 4 s: 6 rows.
- Beats (measure.md §5, first rule wins): row 1 starts at 0 → `hook`; row 2 shows the old way before the product →
  `problem`; row 3 product word first appears → `reveal`; rows 4–5 one capability / the promise → `feature`; row 6 mark
  is the subject → `logo`.
- Row 2 dim: 2.50 − 2.00 = 0.5 s = 15 fr after the cut; dim duration not measurable (one cell) → "~6 fr (±0.25 s)".
- Row 4 swaps: 6.50 and 7.25 → +15 fr and +37 fr after the cut.
- Row 6 URL: 11 chars between 10.75 and 11.75 s (≈ 30 fr) → ~2.7 fr per char.

## A7–A8: audio and look

- Beats at 2.02, 4.02, 6.02, 8.02, 10.02 → every cut within 0.02 s = 0.6 fr → cut_on_beat 5/5 = 1.0 ≥ 0.6 → `true`.
- Energy: 5 cuts / 12 s = 0.42 cuts/s; bpm 120 → neither `high` nor `calm`; last third rate ≈ first third → `medium`.
- Palette from `cuts/001.jpg`, `cuts/003.jpg`, `cuts/005.jpg` with palettegen, near-duplicates merged:
  bg `#0B0B0F`, text `#F2F2F4`, accent `#3A86FF`, dimmed text `#6E6E78`. Theme: all rows dark → `dark`.
- Grain visible as noise on the black of every cut frame; corners darker than the centre → `grain`, `vignette`.

## A9–A11: techniques, inputs, naming

- Techniques with rows: statement-sequence 1, 2, 5 · blur-in 1, 5 · dim-emphasis 2 · mask-rise 3 · word-swap 4 ·
  typewriter 6 · light-on 6 · end-card 6 · hard-cut all · grain, vignette all. Drift (≤ 1.04) is not `push-in` (≥ 1.06).
- 8 techniques without look ids and hard-cut → `medium`; no glass, 3D or blur stacks → `render_cost: light`.
- Missing components: none (all in the studio). Proposed terms: none.
- id `statement-reveal-dark` (family word + main technique + distinguishing word; no clash).

## Output: recipe.json (complete)

```json
{
  "id": "statement-reveal-dark",
  "title": "Dark statement run with a masked product reveal",
  "summary": "Short claims land on every downbeat over black: a still problem line with one word left lit, the product word rising letter by letter, a cycling word, then the mark lighting up.",
  "use_when": [
    "a 10–15 s teaser with no product UI ready",
    "a text-only cut for muted autoplay feeds",
    "the hook or close of a longer launch film"
  ],
  "source": {"name": "other", "url": "https://example.com/reference/dark-statement-film"},
  "family": "kinetic-type",
  "tags": ["statements", "dark", "teaser", "no-ui", "beat-cut", "logo-close"],
  "techniques": ["statement-sequence", "blur-in", "dim-emphasis", "mask-rise", "word-swap", "typewriter", "light-on", "end-card", "hard-cut", "grain", "vignette"],
  "format": {"aspect": "16:9", "duration_s": 12, "fps": 30},
  "look": {
    "theme": "dark",
    "palette": ["#0B0B0F", "#F2F2F4", "#3A86FF", "#6E6E78"],
    "type_style": "semibold grotesk, sentence case, tight tracking, 10 % of frame height",
    "treatment": ["grain", "vignette"]
  },
  "audio": {
    "vo": false,
    "music": {"present": true, "bpm": 120, "energy": "medium", "genre": null, "cut_on_beat": true},
    "sfx": [
      {"event": "product word lands", "sound": "hit"},
      {"event": "slot word swaps", "sound": "tick"},
      {"event": "mark lights on", "sound": "swell"},
      {"event": "URL typed, per character", "sound": "type-click"}
    ]
  },
  "structure": [
    {"t0": 0, "t1": 2, "beat": "hook", "shot": "eyebrow label, then a 4-word statement naming the old way, centred on black", "camera": "drift scale 0.985→1.03 over 60 fr", "motion": "eyebrow first; words blur-in, stagger 2 fr, easings.outExpo 12 fr (±0.25 s)", "transition_out": "hard-cut"},
    {"t0": 2, "t1": 4, "beat": "problem", "shot": "5-word statement cuts in still; at 2.50 all words but the last dim to ~1/3", "camera": "drift scale 1.00→1.03", "motion": "no entrance (the cut is the entrance); dim over ~6 fr at 15 fr after the cut (±0.25 s)", "transition_out": "hard-cut"},
    {"t0": 4, "t1": 6, "beat": "reveal", "shot": "one product word, accent gradient fill, letters rising from the baseline", "camera": "drift scale 1.00→1.04", "motion": "letters mask-rise, stagger 2 fr, springs.maskRise (overshoot not measurable)", "transition_out": "hard-cut", "sfx": "hit"},
    {"t0": 6, "t1": 8, "beat": "feature", "shot": "a sentence whose last word cycles through 3 accent words; the line re-centres", "camera": "drift scale 1.00→1.03", "motion": "slot swaps at +15 fr and +37 fr; re-flow springs.ui ~20 fr (±0.25 s)", "transition_out": "hard-cut", "sfx": "tick"},
    {"t0": 8, "t1": 10, "beat": "feature", "shot": "4-word statement, the promise", "camera": "drift scale 0.985→1.03", "motion": "words blur-in, stagger 2 fr, easings.outExpo 12 fr (±0.25 s)", "transition_out": "hard-cut"},
    {"t0": 10, "t1": 12, "beat": "logo", "shot": "mark lights up on black with a halo, wordmark beside it, URL typed below with a block caret", "camera": "drift scale 1.00→1.025, settles still for the last 0.5 s", "motion": "light-on 14 fr S-curve, halo lags ~5 fr (±0.25 s); URL ~2.7 fr per char", "transition_out": "hard-cut", "sfx": "swell"}
  ],
  "inputs": {"product_name": true, "logo": true, "tagline": false, "lines": 4, "screenshots": 0, "screen_recording": false, "ui_rebuild": false, "stats": 0, "url": true},
  "components": ["StatementSequence", "BlurIn", "WordSwap", "EndCard", "FilmLook", "KenBurns"],
  "params": {
    "eyebrow": "small label over the first statement, ≤ 3 words",
    "statements": "lines for rows 1, 2 and 5, ≤ 6 words each",
    "emphasisWord": "the word that stays lit in row 2",
    "productWord": "one word for the reveal, ≤ 10 letters",
    "swap": "sentence prefix + 3 slot words for row 4",
    "url": "domain typed on the end card"
  },
  "difficulty": "medium",
  "render_cost": "light",
  "notes": "Cuts on all 5 downbeats (5/5 within ±2 fr). Entrance frames, stagger and overshoot measured at 0.25 s resolution only. SFX planned by the glue rule, not measured (music only, no VO).",
  "status": "studied"
}
```

## Output: recipe.md (abbreviated)

```markdown
# Dark statement run with a masked product reveal

Short claims land on every downbeat over black: a still problem line with one word left lit, the product word rising
letter by letter, a cycling word, then the mark lighting up.

Source: https://example.com/reference/dark-statement-film (link only) · studied 2026-10-07 · status: studied

## When to use
- a 10–15 s teaser with no product UI ready
- a text-only cut for muted autoplay feeds
Not for: products whose value needs the UI to be seen.

## Format
16:9 · 12 s · 30 fps · dark · music 120 BPM, cut_on_beat 5/5 · no VO

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.00 | 0–60 | hook | eyebrow, 4-word statement (old way) | drift 0.985→1.03 | words blur-in, stagger 2 fr, outExpo 12 fr (±0.25 s) | hard-cut | music kick |
| 2 | 2.00–4.00 | 60–120 | problem | 5-word statement, still; all but last word dim | drift 1.00→1.03 | none; dim at +15 fr | hard-cut | music kick |
| 3 | 4.00–6.00 | 120–180 | reveal | product word, accent gradient | drift 1.00→1.04 | mask-rise, stagger 2 fr, springs.maskRise | hard-cut | hit |
| … | | | | | | | | |
Evidence: row 1 sheet-01 cells 0–7; row 2 sheet-01 cells 8–15, cuts/001.jpg; row 3 sheet-02 cells 0–7, cuts/002.jpg …

## What to adapt
- Copy: 4 lines ≤ 6 words + 1 product word ≤ 10 letters + 3 slot words; the problem line ends on the word that stays lit.
- Timing: rows are one bar each (2 s at 120 BPM); at another BPM keep one bar per row.

## Pitfalls
- Row 2 must not animate in: its stillness is the contrast with the motion of row 3.
- The product word needs ≥ 1.2 s fully visible before the cut.

## Missing components
none

## Proposed terms
none

## Measurement notes
Resolution 0.25 s (no source strip). Not measurable: entrance overshoot, exact stagger, dim duration. SFX planned by the
glue rule, not measured.
```
