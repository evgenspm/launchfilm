# 05 · Typography and kinetic type

In launch films the text **is** the picture (`T6`). Components live in the text and type presets (see studio/API.md).
Numbers below were measured frame by frame at 30 fps on studied references; `em` = the line's font size.

## Fonts

The studio ships six OFL fonts, loaded offline with `@remotion/fonts`. Use the brand's fonts from `brand.json` when the
user has the right to embed them; otherwise map to the closest shipped font and note it in `brand.json`.

| Role | Default | Weight · tracking · leading |
|---|---|---|
| Hero statement, caption over footage | Inter (Geist for dev tools) | 700–800 · −0.03 em · 1.05 |
| Calm manifesto word | Manrope | 500–600 · −0.01 em · 1.1 |
| Display word (product name, payoff, 1–3 words) | Unbounded | 600–700 · −0.02 em · 1.0 |
| Product UI | the product's own font at real size; fallback Inter or Geist | the UI's real values |
| Code, terminal, eyebrows, labels | JetBrains Mono or Geist Mono | 400–500; eyebrows uppercase +0.15 em |
| Burned captions | Inter 500–600, or the brand text font | 0 tracking · 1.2 |
| Quiet close | a serif the user provides (any OFL serif added to `public/fonts/`); fallback Inter 400 | 400 · 0 · 1.3 |

Never embed a font whose license forbids embedding or redistribution (common for OS system fonts and some
free-for-personal-use fonts). Latin-only fonts need a language check before non-Latin copy.

## Sizes

At 1080 px on the short side unless noted.

| Element | 16:9 (1920×1080) | 4:5 (1080×1350) / 1:1 | 9:16 (1080×1920) |
|---|---|---|---|
| Statement | 10 % of frame height = 108 px; line 45–65 % of width | 96–108 px | capped at 10 % of width = 108 px |
| Hero single word | 50–80 % of width; up to 0.2–0.4 × H (measured 71 % of width, cap height 28 % of H) | 60–80 % of width | 70–85 % of width |
| Kinetic-depth promise | 15.4 % of frame height, 2 lines, fit within 82 % of width | same rule | same rule |
| Caption line over footage | 56–84 px | 56–72 px | 64–80 px |
| Burned captions | 46–54 px | 52–60 px | 60–72 px |
| Eyebrow / sub-line | 20–28 px / 24–32 px | same | 26–32 px |
| Quiet close | 32–40 px | 34–40 px | 40–48 px |
| Product UI text | real size; rendered ≥ 26 px after camera scale (`craft/03#readability-under-the-camera`) | ≥ 30 px | ≥ 30 px |

## Recipes

Keyed to vocabulary `type` ids. Sound per `craft/02#glue-rule`; VO is the sound for statements.

### `statement-sequence` (keynote-style, measured)
- One short claim per shot, a period on every statement. Cadence: a new statement every ~78 fr (2.6 s).
- Eyebrow first: uppercase mono, gray, +0.15 em, 4 fr **before** the statement. Sub-line 10 fr **after** the last word.
- Entrance per word: stagger 2 fr, blur 0.12 em → 0, drop 0.2 em from above → 0, `outExpo` over 10–12 fr.
- Scale creep 0.985 → 1.03 across the whole statement, decelerating: the words never stop moving.
- Hold ~2.2 s (1.3–1.8 s in faster cuts); never under `craft/02#readability-holds`.
- Exit 5 fr: fade + ~0.1 em drift + slight blur (shorter than the entrance), or a hard cut. Gap: 4 fr of nothing after a
  fade exit, 0 after a cut.
- Variants: **rise** (per word from 0.8 em below, no blur, ease-out cubic 13 fr, stagger 2–3 fr); **lens pull** (whole
  line, blur 0.15 em, scale 1.10 → 1, 10 fr); **problem lands still, solution moves** (the problem line hard-cuts in with
  no animation; the solution rises word by word: motion = relief).
- With VO: each word enters on its own onset; statement boundaries on sentence ends.

### `mask-rise`
Per letter (or word) stagger 2 fr, rising a full line height inside a clip, `maskRise` spring 300/20/1: ~11 % overshoot,
peak at 6–7 fr, settled ~12 fr. Exit up through the clip top in 8 fr, ease-in (≈ inQuad). Use once, for the product word
or the payoff. Variant: letters enter in the accent and settle to the text color with a 1 fr stagger (a light wave).

### `word-swap`
The sentence stays; one slot cycles words; the text around it re-flows to its new centred position in ~20 fr on `ui`
(no overshoot) so nothing jumps. **Slot mode:** old word leaves up through a tight clip in 6 fr, new letters rise 1 fr apart
on `maskRise` (energetic). **Blur mode:** old word blurs out in 5 fr, the slot opens, the new word blurs in 6 fr later
(calm). ≥ 20 fr between swaps. A soft `tick` per swap.

### Table of the rest

| id | Recipe (numbers) | Use when |
|---|---|---|
| `blur-in` | opacity 0 → 1 + blur 0.12 em → 0 (≈ 10 px at 80 px type) + y 0.2 em → 0, `outExpo` 10–12 fr | any calm text entrance |
| `word-per-cut` | one word (or two) per shot, hard cut on the beat, no in-animation (the cut is the animation), hold ≥ 12 fr, centred; persist one word over 2–3 background cuts for emphasis; avg shot 0.78 s | manifesto open, muted feeds |
| `word-reveal` | each word on its VO onset (no VO: index × 2–3 fr), opacity + blur 10 → 0 px over 12–15 fr `outExpo`, optional y 8 → 0; whole line lands < 24 fr | a sentence appearing calmly |
| `typewriter` | VO-synced: chars spread evenly across each word's duration from word timings, never a fixed ms/char that drifts; may trail the voice 100–300 ms; caret 1 Hz, hidden after the last char; sentence accumulates, clears on the next (hard or 6 fr fade); glow `0 0 24px rgba(255,255,255,.45)` on dark footage | founder VO, intimate tone |
| UI typing (`prompt-typing`) | 30–60 ms/char ±15 ms (≈ 2 fr/char), bursts with 15–27 fr holds; "the field that won't stay done": type, select-all wipe, type again, longer each time (5 → 10 → 20 chars) | inputs, prompts |
| `captions` | phrase at once, ≤ 2 lines, sizes above, plate 80–86 % black; one accent keyword; full spec `craft/10#captions` | every preset with VO |
| `fit-word` | `fitText({text, withinWidth, fontFamily, fontWeight})` to 50–80 % of width (portrait up to 85 %), after fonts load | one hero word |
| `highlighter` | accent rect behind the word, `transform-origin: left`, scaleX 0 → 1 on a spring 100/20/1 (no overshoot), starting 3–4 fr after the word; tilt 0.5° | emphasis inside a line or a document |
| `counter` | tabular figures (`font-variant-numeric: tabular-nums`), thousands separators, ease-out over 20–40 fr; a `tick` per visible step capped at ~12/s; the final number holds ≥ 0.8 s; a progress ring fills 0 → 100 % in 27 fr in-out-expo with the number in sync | proof numbers, dashboards |
| `kinetic-depth` | glyphs follow word onsets 0.65 fr apart; 0.24 em lift and 32° tilt resolve on `snappy`, 0.62 em depth on `ui`, start scale 0.965; line 1 recedes 38 px on `heavy` when line 2 arrives; 2.6 % push + 3.1° orbit through the hold; one 24 fr light pass after the last word; exit 7 fr; extrusion 0.043 em (~7 px at 1080p), never a chrome bevel | one promise per film |
| `scatter` | per char translate3d(±500, ±500, 0 → 1000 px) + random rotate, `outExpo` 12–15 fr to explode; assemble = the same field reversed on `snappy`; perspective 1000 px; motion blur; `whoosh` + `hit` | explosive transition between ideas |
| `stacked-roll` | 9 rows of one line, rotateX(i × 40°) translateZ(150 px), perspective 1000 px, container rotateX linear; centre row in the text color, others tinted along a 2-color brand gradient | type as an object in a hype cut |
| `dim-emphasis` | ~15 fr after the line settles, everything but the key word drops to 0.32 opacity | the problem; keep the accent color for the promise |
| `quiet-close` | 32–40 px on black, left or centre, typed at 25 ms/char or a 20 fr fade; holds 3–4 s over silence or a music tail; then the logo | the last line of a launch film |
| `sticker` | cutout with a 6–10 px white stroke (dilate filter), `pop` 0.9 → 1, rotated ±3°, slow push-in; meme-literate words built in Remotion (display font, gradient fill, stroke), 2–3 px shake for 6 fr | once or twice per film, never as a system |

## Layout

- **One hierarchy level per shot**: a headline or a caption, not both (product UI excepted).
- **Dead centre** is the default in montage; lower third only in product mode or documentary tone.
- **≤ 3 lines.** No paragraphs. No bullets on screen. No exclamation marks.
- Hero type may touch the edges when the energy is high; captions and UI keep the preset safe zone (`craft/10#safe-zones`)
  and UI text keeps ≥ 80 px from the sides at 1080p.
- **Contrast on every frame:** ≥ 4.5:1 against the local background, or a `scrim` (black gradient 25–45 %), a plate,
  or a shadow `0 4px 15px rgba(0,0,0,.6)`. White text over a bright footage region fails without one.
- **Balanced wrap**, especially in 9:16: two near-equal lines, never a one-word widow.
- **One accent word** per statement at most.

## Gotchas

- **Kerning survives per-letter animation** only if letters are placed absolutely at the measured prefix width
  (`measureText` of `text[0..i]`), never as inline-blocks. Verify: overlay on a plain text run with
  `mix-blend-mode: difference`; the residue must be antialiasing only.
- **Fonts before measuring.** `measureText` caches; a measurement taken before the font loads sticks. Hold the render
  until every weight used is loaded.
- **No mushy text.** Once a unit settles, remove blur and transforms entirely: no `blur(0px)`, no sub-pixel translate on
  resting glyphs.
- **Tight clips.** A mask clip sits 0.02 em above cap height, 0.14 em below the baseline for descenders, with a 0.07 em soft
  edge; a looser box lets a leaving word hang visibly above the line.
- **Blur swaps never overlap:** a longer incoming word is revealed by the opening slot, so trailing punctuation never sits on it.
- **Animated font weight re-flows the line** mid-statement; keep emphasis weight static.
- **Fallback flash:** inspect the first frame of every text shot for a fallback font.
