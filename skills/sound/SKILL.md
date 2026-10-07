---
name: sound
description: Sound for a launch film, product video or promo: voice-over generation (local Kokoro by default, optional ElevenLabs, Cartesia, Azure, Gemini, OpenAI), word timings for captions, music pick or generation with a beat grid, SFX placed on every visual event, ducking and loudness mastering to -14 LUFS / -1.5 dBTP. Use after the storyboard is approved, or when the user asks to change the voice, music, SFX, captions timing or levels. Triggers: voice-over, VO, narration, TTS, captions timing, music, soundtrack, beat, BPM, sound effects, SFX, whoosh, mix, loudness, LUFS, ducking. Not for writing the script (story) or placing picture on the beats (scene-build).
---

# sound: VO, timings, music, beat grid, SFX, mix

Sound is half the film: every visual event gets a sound, the edit follows a beat grid, silence is punctuation `[T5]`.
Full law: `craft/02-rhythm-and-sound.md`, `craft/11-script-and-vo.md`, `craft/12-audio-library.md`.
Run from `launch-video/`. Audio lands in `public/films/<slug>/` (wherever the commands print; never hardcode).
Exact flags: `npx launchfilm <cmd> --help`. Levels and defaults live in `harness.config.json` → `audio`, `providers`.

## Order (gate 4 of launch-film; storyboard must be approved)

1. VO → 2. word timings → 3. music → 4. beat grid → 5. refit picture timings → 6. SFX on events → 7. mix check.
Music before VO only for no-VO films. Skip VO steps for text-only films.

## 1. Voice-over

```bash
npx launchfilm vo <slug>                      # all VO lines from film.json, default provider (kokoro, af_heart)
npx launchfilm vo <slug> --takes 5            # hero film: more takes
npx launchfilm vo <slug> --line l3            # redo one line
npx launchfilm vo <slug> --provider elevenlabs --voice <id>   # paid provider; key must be set in .env
```
- Provider order: the user's choice → `providers.tts.default` (kokoro, local, free) → nothing else. Never switch to a
  paid provider without the user asking; doctor shows which keys are set.
- Whole script per call when the provider allows it (consistent pace), then split by word timings.
- Pace 2.5–3 words/s (calm 2.1–2.5, fast ≤ 3.5); `--tempo` 1.00–1.085 max, above that it sounds sped up.
- Style lines (Gemini, OpenAI instructions, ElevenLabs tags): dry, low-key, documentary. Never "confident",
  "excited", "energetic", "upbeat", "commercial", "announcer": they produce an ad read `[craft/11#vo-style-lines]`.
- Pick the take by numbers, not vibes: [references/vo.md](references/vo.md) § selection.
- Licensing: macOS `say` is preview only (Apple's license is personal, non-commercial). ElevenLabs, Cartesia and Fish
  free tiers are non-commercial: warn before a final render on a free key.
Done when: one chosen take per line, −16 ±1 LUFS, ≤ −1.5 dBTP, 48 kHz mono, silence trimmed, choice recorded.

## 2. Word timings

```bash
npx launchfilm words public/films/<slug>/<vo>.wav --script films/<slug>/<script file or "text"> --out <words>.json
```
(`vo` may already write timings when the provider returns them; `--engine whisper|elevenlabs|deepgram`, default auto.)
- Assert: zero null timestamps (a null means DTW timing was disabled); every word has start < end.
- Script match ≥ 95 % (the command prints it). Below: the take skipped or garbled words → regenerate that line.
- Script spelling wins: captions show the script's words with the audio's timings ("Acme Ledgar" heard → "Acme Ledger").
- Captions use phrases (`|` breaks in the script, else pauses ≥ 250 ms, sentence ends, max 8 words) and one accent word
  per phrase (`*word*`) `[craft/11#script-markup]`.

## 3. Music

```bash
npx launchfilm music <slug> --len 30 --bpm 120 --mood "minimal electronic, warm"    # library pick (default provider)
npx launchfilm music <slug> --track <id>                                           # a specific library track
npx launchfilm music <slug> --provider lyria --prompt "<pattern>" --len 30          # generate with the user's key
```
- Instrumental only under VO. BPM: 100–130 product film · 130–150 hype/trailer · 80–95 founder story/calm.
- Integer grid at 30 fps: BPM = 1800 / n → 100 (18 fr), 112.5 (16), 120 (15), 128.57 (14), 150 (12). Ask for these
  when generating.
- License traffic lights and the generation prompt pattern: [references/music.md](references/music.md).
  ElevenLabs music output is never committed to any public repo or library.
- Write provenance (provider, model, prompt, seed, or library id + license + author + URL) next to the file; `package`
  collects credits from it.

## 4. Beat grid

```bash
npx launchfilm beats public/films/<slug>/<music>.wav --out public/films/<slug>/<music>.beats.json [--bpm 120]
```
- Output: BPM, beats[], downbeats[] (seconds). `beatFrame(n) = round(beats[n] × fps)`; never accumulate
  n × framesPerBeat `[craft/02#beat-grid]`.
- Checks: first downbeat ≤ 0.1 s; inter-beat interval spread ≤ 3 % (else the detector is wrong: pass `--bpm` as a hint;
  ambient beds often detect at double tempo).

## 5. Refit picture to measured sound

Update `film.json` timings: shot boundaries on downbeats (scene changes on bars, sections on 8/16-beat phrases), text on
word onsets, the outcome said 0.3–0.5 s before the UI shows it. Keep the storyboard order; move frames, not meaning.

## 6. SFX on events

```bash
npx launchfilm sfx list                 # what ships (procedural presets + CC0 packs)
npx launchfilm sfx search whoosh
npx launchfilm sfx gen whoosh --out public/films/<slug>/sfx/whoosh-1.wav     # or: sfx gen all
```
Map every event in `film.json` to an audio id from `craft/vocabulary.md` with an offset and a gain:
[references/sfx-placement.md](references/sfx-placement.md). Rules: every visual event has a sound and every sound a
visual; no whoosh on every cut; no meme or OS system sounds ever.

## 7. Mix and verify

Targets `[craft/02#mix]`: VO −16…−14 LUFS · music −22…−18 under VO, −14 solo · SFX peaks ≤ −6 dBTP · master −14 LUFS I,
−1.5 dBTP, two-pass loudnorm after a limiter · duck music 6–9 dB under VO (attack 150 ms starting before the word,
release 400 ms, VO gaps < 0.45 s merged) · silence = gain 0 for 0.5–2 s once in films > 20 s.
Measurement commands and the per-section check: [references/mix.md](references/mix.md).

## Report (to launch-film)

```
VO: kokoro af_heart · 6 lines · 3 takes each · picked by match/duration · 18.9 s of speech in a 30 s film (63 %) · −16.2 LUFS
Timings: match 100 % · 0 null · words json path
Music: library <id> (CC0) · 120 BPM · 60 beats · first downbeat 0.04 s · credits written
SFX: 23 events placed (tick ×8, pop ×6, whoosh ×2, notification ×3, ui-confirm ×4) · gains per sfx-placement.md
Mix: master −14.1 LUFS I, −1.6 dBTP · music under VO −20.3 LUFS short-term · silence 26.0–27.0 s
```
