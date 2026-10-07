# Voice-over: providers, style, selection

Full law: `craft/11-script-and-vo.md`. Provider config: `harness.config.json` → `providers.tts` (model ids live there
because they change). Keys only in `launch-video/.env`; `npx launchfilm doctor` shows set/unset.

## Providers

| Provider | Cost | Native word timings | Style control | Notes |
|---|---|---|---|---|
| kokoro (default) | free, local | via the model's durations when the CLI supports it, else whisper | none (pick a voice) | voice `af_heart`; near-identical takes, so best-of-N adds little |
| elevenlabs | paid | yes (character level) | audio tags in the text on v3/v4 | free tier is non-commercial |
| cartesia | paid | yes (word level) | emotion/speed params | free tier is non-commercial |
| azure | paid, free F0 tier usable commercially | yes (word boundary events) | SSML | disclose the synthetic voice |
| gemini | paid, free tier trains on data | no (whisper aligns) | style sentence before the text | free tier not for EEA/UK apps |
| openai | paid | no (whisper aligns) | `instructions` | disclose the AI voice |
| say (macOS) | free | no | none | preview only; publishing is not allowed by Apple's license |

## Style lines (for providers that take one)

Use one of these, or the user's own description of their voice:
- Dry founder: "Say this dry and low-key, slightly quick, like a founder talking to a friend across the table.
  Plain, matter-of-fact, no selling, no emphasis on every word, not an ad read:"
- Calm documentary: "Calm, close-mic, documentary narration. Even pace, warm but not smiling, no announcer tone:"
- Builder showing: "Casual and understated, like showing a friend something on a laptop. Relaxed, a bit quick,
  low energy, no selling:"
Never put "confident", "excited", "energetic", "upbeat", "commercial", "professional voice-over" or "announcer" in a
style line. On a studied test, "confident" turned every voice into an ad read; "casual/understated" fixed it.

## Script prep for TTS

- Numbers as words in the TTS text, digits on screen: TTS "twenty four eighty", caption "$2,480".
- Product names that TTS mispronounces: a phonetic spelling in the TTS text only; captions keep the real spelling.
- Strip `|` and `*` markup before synthesis (the CLI does this; check if you call a provider by hand).
- If a provider refuses or garbles a very short line ("Paid."), synthesize it inside a longer sentence and cut it out
  by word timings.

## Selection (best-of-N, by numbers)

Generate N takes (3 default, 5 for the hero film; `--takes`). Score each take; discard on any hard fail.

| Check | How | Hard fail |
|---|---|---|
| Script match | `words` prints the match | < 95 % |
| Clipped ending | last word end vs file end | tail < 80 ms after the last word |
| Duration fit | take length vs the storyboard slot | outside ±10 % (re-time picture if ±5–10 %) |
| Pace | words / speech seconds | outside 2.1–3.5 wps |
| Level | `ebur128` on the take | not −16 ±1 LUFS after normalization, or clipping |
| Pauses | gaps between words | a gap > 700 ms inside a sentence |
Among passing takes: closest to the slot duration, then the user's ear if they want to listen (offer the 2 best paths).
Record the choice and scores next to the files. Takes differ more than voices do on cloud providers; one take is never
enough there.

## Post chain (the CLI does this; verify)

Trim leading/trailing silence (keep ~40 ms pad) → `atempo` 1.00–1.085 if needed → two-pass loudnorm to −16 LUFS,
−1.5 dBTP → 48 kHz mono WAV.
