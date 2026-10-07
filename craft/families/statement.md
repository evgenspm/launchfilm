# Family: statement (kinetic claims, word swaps, typing fields, depth hero type)

A launch film that tells its story in short statements over VO: problem → turn → promise, one statement per shot.
Numbers measured frame by frame on studied references at 30 fps (per-frame bbox and contrast); `em` = the statement's
font size. Scale frames by fps/30.

## When

| Technique | Use for | Feel |
|---|---|---|
| Keynote statement sequence | the promise; any stretch with slow VO | calm, premium, metronomic |
| Problem lands still, solution moves | the turn: the problem hard-cuts in with no animation, the solution rises word by word | motion = relief |
| Emphasis by dimming | the problem: everything but the key word drops to ~0.32 opacity after ~0.5 s | accent colour is reserved for the promise |
| Word swap with re-flow | one sentence, one slot cycling ("Built for teams / agencies / you") | `slot` mode = energetic counter; `blur` mode = calm |
| Letter mask rise + vertical gradient | one big word, once: the product name or the payoff | |
| Colour sweep | a tagline: letters enter in the accent and settle to the text colour | a wave of light, subtle |
| The field that won't stay done | 6 s of behaviour before any copy: typing in bursts, wiping, typing again, longer each time | frustration shown, not told |
| Depth hero type | one short promise where the type is the picture (once per film) | dimensional, VO-led |

## Numbers

| What | Value |
|---|---|
| Statement size | 10 % of frame height (108 px at 1080p), capped at 10 % of width in 9:16; line 45–65 % of width |
| Hero single word | up to 0.2–0.4 × H (measured: a two-word title at 71 % of W; a cap height at 28 % of H) |
| Type | grotesk bold, tracking −0.02 em; a period on every statement |
| Word entrance, keynote | per word, stagger **2 fr**, blur 0.12 em → 0, drops 0.2 em from above, `outExpo`, **10–12 fr**; measured contrast curve 0.30, 0.53, 0.70, 0.83, 0.89, 0.94, 0.96, 0.98 |
| Word entrance, rise | per word from 0.8 em below, no blur, ease-out cubic **13 fr**, stagger 2–3 fr |
| Letter mask rise | per letter, stagger 2 fr, rises a full line height inside a clip, ~10 % overshoot, peak at 6–7 fr, settled ~12 fr → `maskRise` 300/20/1 |
| Lens pull | whole line, blur 0.15 em, scale 1.10 → 1, 10 fr |
| Scale creep (push) | 0.985 → 1.03 across the whole statement, decelerating |
| Hold | ~2.2 s per keynote statement (a new statement every ~78 fr = 2.6 s); 1.3–1.8 s in a faster film; never under craft/02#readability-holds |
| Exit | **5 fr** fade + ~0.1 em drift + slight blur (shorter than the entrance), or a hard cut |
| Gap between statements | 4 fr of nothing after a fade exit; 0 after a cut |
| Mask exit | up through the clip top, 8 fr, ease-in (5, 6, 10, 12, 17, 24, 33, 45 px/fr ≈ `inQuad`) |
| Re-flow when a word changes width | the line travels to its new centred position in ~20 fr, no overshoot → `ui` |
| Word swap, `slot` | old word leaves up through a tight clip in 6 fr; new letters rise 1 fr apart on `maskRise` |
| Word swap, `blur` | old word blurs out 5 fr, the slot opens, the new word blurs in 6 fr later, revealed by the opening slot |
| Swap spacing | ≥ 20 fr between swaps (a word stays readable ≥ 0.4 s after it lands) |
| Typing field | 2 fr/char (66 ms), bursts with holds of 15–27 fr, select-all wipes, each attempt longer (5 → 10 → 20 chars) |
| Eyebrow / sub | eyebrow 4 fr before the statement (uppercase, +0.15 em tracking, ~0.19 em, grey); sub ~10 fr after the last word (~0.17 em, grey) |
| Dimming | non-key words → 0.32 opacity, starting ~0.5 s after the statement lands |
| Clip geometry | mask clip 0.02 em above cap height, 0.14 em below for descenders, 0.07 em soft edge |
| Depth type: glyph timing | first glyph visible on its spoken word onset; each next glyph 0.65 fr later (an 8-letter word ≈ 0.15 s) |
| Depth type: glyph motion | `snappy` resolves a 0.24 em lift and 32° tilt; `ui` resolves 0.62 em of depth; start scale 0.965 (never 0) |
| Depth type: two lines | both visible; when line 2 arrives line 1 recedes 38 px on `heavy` |
| Depth type: hold | push 2.6 % + 3.1° horizontal orbit through the hold; one 24 fr light pass over the faces on the final spoken word |
| Depth type: material | 6 planes behind each glyph = 0.043 em extrusion (~7 px at 1080p); backs dark; a 40 px bevel is too much for small previews |
| Depth type: size | 15.4 % of frame height, two lines, weight 600, auto-fit within 82 % of the frame; exit 7 fr accelerating |

## Choreography

Problem → turn → promise for "Acme Ledger", 30 fps, VO word onsets from words.json feed `wordStarts`:

| fr | Statement | Enter | Emphasis | Exit |
|---|---|---|---|---|
| 0–54 | "Forty invoices. One afternoon." | `cut` (lands still on the kick) | dim all but "afternoon." at +16 fr | hard cut |
| 54–120 | "Acme Ledger sends them for you." | `rise`, words on their VO onsets | none | 5 fr fade |
| 124–200 | "Paid in days. Not weeks." | keynote blur-in, eyebrow "ACME LEDGER" at 120 | accent on "days." | 5 fr fade, 4 fr gap |
| 204–264 | "Built for freelancers / studios / finance teams." | word swap `blur`, swaps at 224, 244 | slot in the accent | cut to end card |

With VO: one statement per sentence, each word entering on its onset (lead 0–2 fr), cuts on phrase boundaries, never
mid-word. Without VO: statements on the bar (4 beats), words on half-beats.

## Components

`StatementSequence`, `BlurIn`, `WordSwap`, `FieldType`, `DepthPhrase` (the studio's text/type presets). Verify the API
in studio/API.md; if missing, build them inside the film/recipe folder from the Numbers.

```tsx
<StatementSequence statements={[
  {text: 'Forty invoices. One afternoon.', enter: 'cut', exit: 'cut', emphasis: {words: ['afternoon.'], mode: 'dim', at: 16}},
  {text: 'Acme Ledger sends them for you.', enter: 'rise', wordStarts: vo.s2},
  {eyebrow: 'ACME LEDGER', text: 'Paid in days. Not weeks.', emphasis: {words: ['days.'], mode: 'accent'}},
]} push={[0.985, 1.03]} gap={4} />
<WordSwap before="Built for" words={['freelancers', 'studios', 'finance teams']} after="." at={[224, 244]} mode="blur" />
<FieldType script={[{type: 'Follow up on invoice'}, {wait: 4}, {wipe: 6}, {type: 'Follow up on invoice #1042'}]} />
```
Enter presets: keynote · rise · springRise · mask · lens · cut. Exit presets: keynote · up · lift · cut.

## Sound

Statements carry no SFX when VO is present: the voice is the sound (glue rule satisfied by VO). Gains on −3 dBFS assets;
subtract 6 dB under VO.

| Event | Audio id | When | Gain |
|---|---|---|---|
| statement entrance, no VO | `tick` (or the beat's kick) | first word frame | −16 dB |
| problem statement hard-cuts in | the kick, else `hit` | cut frame | −8 dB |
| every keystroke in a field | `type-click` (3–5 variants) | each char | −20 dB |
| select-all wipe | `swoosh-short` | wipe start | −16 dB |
| field submit | `ui-confirm` | submit frame | −12 dB |
| word swap | `tick` | each swap | −16 dB |
| depth-type light pass | `shimmer` only when no VO | pass start | −16 dB |

## Pitfalls

- Kerning dies with per-letter animation unless letters are absolutely placed at x = width(text[0..i]) − width(text[i])
  measured with `measureText`; check by overlaying the browser's own text run with `mix-blend-mode: difference`.
- Fonts before measuring: `measureText` caches; hold the render (`delayRender`) until `document.fonts.load()` resolves
  for every weight used.
- Mushy text: drop blur and transforms entirely once a unit settles (no `blur(0px)` or sub-pixel translate left on glyphs).
- Loose clips let a leaving word hang visibly above the line: keep the clip geometry above.
- Blur swap: a longer incoming word must be revealed by the opening slot, or the period sits on top of it.
- 9:16: balanced wrap ("Paid in days. / Not weeks."), no one-word widow.
- Animated font-weight emphasis re-flows the line mid-statement: keep emphasis weight static.
- Accent on the problem statement: the accent belongs to the promise.
- Depth type: check legibility at 480 × 270 (X preview) on 6 frames across the shot.

## Techniques

`statement-sequence` · `blur-in` · `mask-rise` · `word-swap` · `dim-emphasis` · `word-per-cut` · `typewriter` ·
`prompt-typing` · `kinetic-depth` · `push-in` · audio: `tick` · `hit` · `type-click` · `swoosh-short` · `ui-confirm` · `shimmer`
