# Type: statements, mask rise, word swap, VO typewriter, captions, fitting

Law: craft/05 (fonts, sizes, recipes, layout, gotchas), craft/02#readability-holds, craft/10#captions.
Family playbook with measured numbers: craft/families/statement.md. Verify exports in `<studio>/API.md`.

## Pick by job

| Job | Technique id | Studio export (verify) |
|---|---|---|
| Story told in short claims over VO | `statement-sequence` | `StatementSequence`, `statementsFromWords` |
| One big word / the product name | `mask-rise`, `fit-word` | `BlurIn` with `enter="mask"`, `FitWord` |
| A sentence with one cycling word | `word-swap` | `WordSwap` (`mode: 'slot' \| 'blur'`) |
| VO on screen as typing | `typewriter` | `VOTypewriter` (from words.json), `Typewriter` (cps) |
| One word per shot on the beat | `word-per-cut` | `WordPerCut` |
| A calm sentence appearing | `word-reveal`, `blur-in` | `WordReveal`, `BlurIn` |
| Hero label over footage | `blur-in` / plain cut | `Caption` (`scrim` when contrast fails) |
| Problem line lands still, key word stays lit | `dim-emphasis` | `Statement.emphasis {mode: 'dim'}` |
| VO subtitles | `captions` | engine Subtitles from film.json |
| Close | `quiet-close` | `QuietClose` |

## Statement sequence (measured)

Size 10 % of frame height (108 px at 1080p), capped at 10 % of width in 9:16; line 45–65 % of width.
Entrance per word: stagger 2 fr, blur 0.12 em → 0, drop 0.2 em from above, outExpo 10–12 fr.
Scale creep 0.985 → 1.03 across the statement (nothing static). Hold ~2.2 s calm, 1.3–1.8 s brisk, never below
0.2 × (words + 1) s. Exit 5 fr fade + 0.1 em drift + slight blur, or a hard cut. 4 fr of nothing after a fade exit.
Eyebrow 4 fr before the statement; sub-line 10 fr after the last word. End every statement with a period.

```tsx
import {StatementSequence, statementsFromWords, wordsToFrames} from '../../../src/presets';
// VO-driven: one statement per sentence, each word entering on its onset (lead 2 fr)
const statements = statementsFromWords(words.words, fps, {lead: 2, gap: 4, enter: 'blurDrop', exit: 'fade'});
<StatementSequence statements={statements} />
// Beat-driven: from = grid.beatFrame(n); problem line enter: 'cut' (stillness), solution enter: 'rise' (motion = relief)
```
Reserve the accent colour for the promise; use dimming (others → ~0.32 opacity after ~0.5 s) for the problem.

## Mask rise (one hero word)

Per letter, stagger 2 fr, rises a full line height inside a tight clip, `springs.maskRise` (~11 % overshoot, peak at
6–7 fr, settled ~12 fr). Clip: 0.02 em above cap height, 0.14 em below the baseline for descenders, 0.07 em soft edge.
Exit up through the clip top in 8 fr, ease-in. Use once per film, for the product word or the payoff.

## Word swap

The sentence stays; the slot cycles. The text around the slot re-flows on `springs.ui` (~20 fr, no overshoot) so nothing
jumps. `slot` mode: old word leaves up through the clip (6 fr), new letters rise 1 fr apart (energetic). `blur` mode:
old word blurs out 5 fr, slot opens, new word blurs in 6 fr later (calm). ≥ 20 fr between swaps. A soft tick per swap.

## VO-synced typewriter

Characters appear at word onsets from words.json, spread across each word's duration: never a fixed ms per char that
drifts from the voice. Typing may trail the voice 100–300 ms. Caret `_` blinks at 1 Hz, hidden after the last char.
Sentence accumulates, clears on the next sentence (hard clear or 6 fr fade). Glow on dark footage
`0 0 24px rgba(255,255,255,.35)`; shadow `0 4px 15px rgba(0,0,0,.6)` for legibility.

UI typing (inside an input) is different: 30–60 ms/char ±15 ms jitter (`Typewriter`, `cps`), a type-click per keystroke
(`keystrokeFrames` gives the frames for the SFX).

## Captions (burned in by default)

Whole phrase at once, ≤ 2 lines; ≤ 42 chars/line in 16:9, ≤ 32 in 4:5, 1:1, 9:16. Size on output: 16:9 46–54 px,
4:5 & 1:1 52–60 px, 9:16 60–72 px; weight 500–600; plate 80–86 % black, radius 12–16 px. One accent keyword per phrase.
In at the first word onset −2 fr; out at last word end + 6–10 fr or at the next phrase. No karaoke, no all caps, no emoji.
Captions sit inside the preset's safe zone and never cover the element that is changing: move them or hide that phrase.

## Fitting and measuring

- `fitText({text, withinWidth, fontFamily, fontWeight})` → `fontSize` for one word filling a width (fit-word: 50–80 % of
  frame width for a single hero word).
- `measureText({text, fontFamily, fontSize, fontWeight, letterSpacing})` for layout.
- Measure only after fonts load: `measureText` caches; a width taken with the fallback face sticks forever. Gate with the
  studio's font-ready hook or `delayRender` + `document.fonts.load('<weight> 100px <family>')`.

## Kerning-safe per-letter animation

Never split a word into inline-block letters (kerning breaks). Place each glyph absolutely at
`x = width(text[0..i]) − width(text[i])`, both measured with `measureText`. Check: overlay your letters on a normal text
run with `mix-blend-mode: difference`; only antialiasing should remain.

## Layout rules

One hierarchy level per shot; ≤ 3 lines; never a paragraph or bullets; dead centre in montage; product text keeps
≥ 80 px from frame sides at 1080p. Balanced wrap in portrait (no one-word widow). Drop `filter: blur(0)` and sub-pixel
transforms once a unit settles. Text over footage needs a scrim, plate or shadow until contrast ≥ 4.5:1.
