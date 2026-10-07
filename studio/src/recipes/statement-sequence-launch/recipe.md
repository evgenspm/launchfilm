# Keynote statement launch

`statement-sequence-launch` · family `kinetic-type` · 16:9 · 11.4 s · 30 fps · light · no audio in the reference
Inspired by: a keynote-style text template by Raylight ([raylight.xyz](https://raylight.xyz), ref `rl-007`). We link to
the original and never redistribute it; the copy, brand and code here are ours.

Four short statements on a flat background, one every 2.6 s: eyebrow + product name, two claims, then availability with
the URL. Nothing else is on screen. The motion is small and never stops: each word drops in from blur, the statement creeps
larger through its hold, leaves in 5 frames, and after 4 empty frames the next one arrives.

## When to use

- The product is announced before there is UI worth showing (waitlist, teaser, "coming today").
- Silent autoplay feeds (X, LinkedIn): the type carries the whole message, no subtitles needed.
- As the opener or closer of a longer film: 3–4 claims before the product demo, or after it as the promise.
- The brand voice is calm and premium. For energy, use `word-swap` or the problem → solution variant instead.

Skip it when the claims are generic ("Fast. Simple. Powerful.") — this format only works when every line is specific.

## Beat sheet

Times in seconds of the reference (frames at 30 fps in brackets). Our version keeps the same grid by default.

| t | picture | motion | transition | sound |
|---|---|---|---|---|
| 0.0–3.1 (f1–f93) | `INTRODUCING` eyebrow, then **Product name.** centred | eyebrow blur-in 4 fr early; name per word, stagger 2 fr, blur 0.12 em → 0, drop 0.2 em, `outExpo` 12 fr; scale 0.985 → 1.03 across the hold | 5 fr fade + 0.1 em drift + blur, 4 fr empty (`blur-dissolve`) | none (optional bed starts) |
| 3.2–5.8 (f97–f174) | claim one | same entrance; holds ~2.2 s | same fade, 4 fr empty | none (bar 2 on a 92 BPM bed) |
| 5.8–8.4 (f175–f252) | claim two | same; metronomic 78 fr period | same fade, 4 fr empty | none (bar 3) |
| 8.4–11.4 (f253–f342) | **Available today.** + small URL line | same entrance; URL fades in 10 fr after the last word; accent on the key word (ours) | fade out at f335, end | none (bar 4, bed ends hard) |

## Techniques

- `statement-sequence` — one claim per beat, metronomic cadence: [craft/05-typography.md#statement-sequence-keynote-style-measured](../../../../craft/05-typography.md), family notes in [craft/families/statement.md](../../../../craft/families/statement.md).
- `blur-in` — per-word blur 0.12 em → 0 with a 0.2 em drop, `outExpo`: [craft/05-typography.md#table-of-the-rest](../../../../craft/05-typography.md).
- `push-in` — the 0.985 → 1.03 scale creep that keeps every frame alive: [craft/03-camera-and-staging.md#drift-and-push-in](../../../../craft/03-camera-and-staging.md).
- `blur-dissolve` — the short fade-blur exit and 4 empty frames between statements: [craft/09-transitions.md#blur-dissolve](../../../../craft/09-transitions.md).
- Holds and readability: [craft/02-rhythm-and-sound.md#readability-holds](../../../../craft/02-rhythm-and-sound.md).

Code: `StatementSequence` (`presets/statement.tsx`, defaults `enter: 'blurDrop'`, `exit: 'fade'`, `push: [0.985, 1.03]`),
`BrandBackdrop` (`presets/look.tsx`). `Recipe.tsx` only builds the schedule; everything visual comes from the brand.

## What to adapt

- **Copy** (`content`): name with its period; 1–3 claims of 2–5 words, each one idea, each ending in a period; a close that
  says where and when ("Live today.", "Now in beta."). The sub-line defaults to `brand.url`.
- **Brand**: any `brand.json`. Display font and weight carry the look; light or dark both work. Keep `glow` at 0 for the
  reference look; 0.06–0.1 helps dark brands.
- **Accent**: by default only the close's key word turns the accent (`accentWords`), 12 fr after it lands. Reserve the
  accent for the promise; leave the claims in the text colour.
- **Rhythm**: `timing.period` (78 fr) or `timing.bpm` to land every statement on a bar of your music (92 BPM ≈ 2.6 s).
  Under 60 fr per statement the holds get too short to read.
- **With VO**: replace the fixed grid with `statementsFromWords(words, fps)` (one statement per sentence, each word on its
  onset) and pass the result to `StatementSequence`.
- **Aspect**: `--props='{"aspect":"9:16"}'` recomposes; statements cap at 10 % of the width and wrap balanced.

## Pitfalls

- Whole-line fades look cheap. The entrance is per word with a 2 fr stagger; keep `by: 'word'`.
- The exit must be shorter than the entrance (5 fr vs 12 fr). A slow exit drags the cadence.
- Drop the 4 empty frames and the statements smear into each other; make them longer and the rhythm stalls.
- Two-line statements at 16:9 break the calm. Shorten the copy instead of shrinking the type.
- Do not add SFX per word: statements have no sound of their own (the music or VO is the sound).
- Fonts must be loaded before layout: `StatementSequence` waits for them itself, but a custom wrapper that measures text
  must call `useFontsReady` first.
