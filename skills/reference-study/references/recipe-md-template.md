# recipe.md template

Copy this skeleton. Every section is required; write `none` rather than deleting a section. Our words only: never quote
the source's copy, never name its brand, product or author outside the Source line.

```markdown
# <title from recipe.json>

<summary from recipe.json, one or two sentences>

Source: <source.url> (link only; the original is not redistributed) · studied <YYYY-MM-DD> · status: studied

## When to use
- <situation 1: product type, beat, mode>
- <situation 2>
Not for: <where it fails, e.g. "products with no single hero claim">

## Format
<aspect> · <duration_s> s · <fps> fps · <theme> · music <bpm> BPM, cut_on_beat <ratio> · VO <yes/no, words/s if yes>

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.00 | 0–60 | hook | statement, 4 words, names the problem; eyebrow above | drift 0.985→1.03 | words blur-in, stagger 2 fr, outExpo 12 fr (±0.25 s) | hard-cut | music kick |
Evidence per row: `sheet-01 cells 0–7`, `cuts/002.jpg`.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| statement-sequence | 1–4 | craft/05#recipes, craft/families/statement.md |

## Look
Palette: <hex list with roles>. Type: <type_style>. Treatment: <look ids>. Background: <flat / gradient / footage>.

## What to adapt
- Copy: <number of lines, max words each, the role of each line>
- Brand: <which colour carries the accent, where the logo appears>
- Timing: <which rows stretch, which must keep their frame counts>

## Pitfalls
- <measured trap, e.g. "exit is 5 fr: longer exits break the cadence">

## Missing components
- <ComponentName>: <one-line spec with numbers> (techniques: <ids>)
or: none

## Proposed terms
- <term>: <definition, rows where seen> (not in craft/vocabulary.md; not used in recipe.json)
or: none

## Measurement notes
Resolution: <0.25 s from sheets | 1 fr from strips at t = …>. Not measurable: <list>. SFX planned by the glue rule, not
measured. cut_on_beat = <k>/<n> cuts within ±2 fr.

## Study log
<the report: ≤ 15 lines>
```

Rules for filling it:
- Beat sheet rows equal recipe.json `structure[]` one to one, same order, same times.
- Frames @30 = round(t × 30) for both ends.
- `motion` uses names from craft/04#springs and craft/04#easings plus frame counts.
- Every technique in recipe.json appears in the Techniques table with the rows where it is visible.
