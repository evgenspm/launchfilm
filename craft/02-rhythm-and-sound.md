# 02 · Rhythm and sound

Two files are the timeline: the word timings (from `npx launchfilm vo <slug>`, or `npx launchfilm words <audio> --script <file>`)
and the beat grid (`npx launchfilm beats <audio>` → `beats.json`). Every cut, text onset and sound lands on one of them (`T4`, `T5`).

## Beat grid

`framesPerBeat = fps × 60 / BPM`. A bar = 4 beats, a phrase = 8 or 16 beats.

| BPM | fr/beat @30 | fr/bar @30 | fr/beat @60 | Typical use |
|---|---|---|---|---|
| 90 | 20 | 80 | 40 | founder story, calm |
| 100 | 18 | 72 | 36 | product film |
| 110 | 16.36 | 65.45 | 32.73 | product film |
| 112.5 | 16 | 64 | 32 | product film, integer grid |
| 120 | 15 | 60 | 30 | product / launch, integer grid |
| 128 | 14.06 | 56.25 | 28.13 | launch |
| 128.57 | 14 | 56 | 28 | launch, integer grid |
| 140 | 12.86 | 51.43 | 25.71 | hype trailer |
| 150 | 12 | 48 | 24 | hype trailer, integer grid |

Snapping (the only allowed method):
- `beatFrame(n) = round(beats[n] × fps)` from `beats.json`. **Never** `n × framesPerBeat`: real tracks drift, and a
  rounded grid accumulates error (128 BPM rounded to 14 fr/beat is off 0.0625 fr per beat = 4 fr after 64 beats, i.e. 30 s).
- Downbeats: `beats.json` downbeats when present; otherwise every 4th beat from the first kick (check one bar by ear or onset).
- If you generate music, ask for an integer-grid tempo (BPM = 1800 / n at 30 fps: 100, 112.5, 120, 128.57, 150).
- To land a spring on a beat: `spring({frame: frame - start, fps, config, durationInFrames: beatFrame(n) - start})`.

Check: list every cut frame from `film.json`; for each, distance to the nearest `beatFrame` ≤ 2 fr in montage sections.

## Placement on the grid

| What | Lands on | Tolerance | Note |
|---|---|---|---|
| Cut in montage | downbeat or kick | target ±1 fr, QA ±2 fr | the kick frame is the cut frame |
| Cut in a VO film | the phrase boundary (gap ≥ 150 ms) nearest a beat | never mid-word | VO wins over the beat |
| Text onset (VO) | the word onset | ±2 fr | captions: first-word onset −2 fr |
| Text onset (no VO) | the beat or half-beat | ±2 fr | |
| Scene change | the bar (every 4 beats) | ±2 fr | |
| Section change | the phrase (8 or 16 beats) | ±2 fr | grade/look changes here |
| Staggered group | first sibling on the beat | siblings follow by stagger | `craft/04#stagger-and-overlap` |
| Hit / impact | the cut frame | 0 fr | |
| Whoosh | ends on the arrival frame | starts 9–15 fr earlier | 300–500 ms |
| Next shot's audio (`j-cut`) | 4–12 fr before its picture | | softens hard cuts in calm sections |

## Shot length by mode

Measured on studied references.

| Mode | Typical shot | Fastest | Longest hold |
|---|---|---|---|
| Hype trailer | 0.6 s avg (52 cuts / 30 s) | 250 ms flashes in a center-anchored run | 4 s end card |
| Manifesto, word per cut | 0.78 s avg; one word ≈ 400 ms, three words ≈ 800 ms | 300 ms | 4 s thesis line |
| Founder story | ~2 s; 0.5–1 s in the chaos act | 500 ms | 5 s on the pain shot |
| AI montage | 1–1.5 s, hard cuts only, cut on the clip's motion peak | 500 ms | none |
| Product film | 0–2 cuts per 15 s; a camera beat every 1.5–2.5 s | n/a | 4–5 s on the result |
| UI on a tilted plane / staged screen | UI shots 3.5–5.2 s, action shots 1.2–1.7 s | 1.2 s | 5.2 s |

Pick one pace per section, then break it on purpose (`craft/01#rules` rule 4).

## Readability holds

**hold_s ≥ 0.2 × (words + 1)**, measured from the frame the text is fully legible to the frame it starts leaving.

| Words on screen | Min hold | Frames @30 |
|---|---|---|
| 1 | 0.4 s | 12 |
| 3 | 0.8 s | 24 |
| 5 (one line) | 1.2 s | 36 |
| 9 (two lines) | 2.0 s | 60 |

If the text is gone, the shot changes. A word swap must stay ≥ 20 fr between swaps. Check: for every text element in
`film.json`, `exit_start − settled_frame ≥ ceil(0.2 × (words + 1) × fps)`.

## Glue rule

Every visual event has a sound; every sound has a visual. VO counts as the sound for statements and captions.
Gains are starting points on assets normalized to −3 dBFS peak; under VO subtract another 6 dB.

| Visual event | Audio id | Timing | Gain |
|---|---|---|---|
| Typing | `type-click` per char, 3–5 variants rotated by seeded random | on each char frame | −20 dB |
| Snap / settle into place | `tick` | on the settle frame | −16 dB |
| Card, badge, comment pops in | `pop` | on the first visible frame, staggered with the visuals | −14 dB |
| Button press, submit, check | `ui-confirm` | on the squash frame | −12 dB |
| Notification lands | `notification` | on the landing frame | −12 dB |
| Cut on the beat | the kick itself, or `hit` | the cut frame; no whoosh on every cut | −8 dB |
| Fast move, zoom-through, whip-pan | `whoosh` (300–500 ms) | ends on the arrival frame | −10 dB |
| Short slide, card exit | `swoosh-short` | starts with the motion | −12 dB |
| Pull-out, reverse reveal | `reverse-cymbal` | peaks on the reveal frame | −12 dB |
| Long push toward a reveal | `riser` (1–2 s) | ends on the reveal | −12 dB |
| Glitch, crash | `glitch-sfx` | on the glitch frames | −12 dB |
| Sparkle, glint, shimmer pass | `shimmer` | across the pass | −16 dB |
| Logo light-on, reveal | `swell` | starts with the light, peaks at full | −14 dB |
| Photo montage | `camera-shutter` | per photo | −12 dB |
| Climax, product drop | `bass-drop` or `impact-low` | the reveal frame | −6 dB |
| Rhythm break | `silence-beat` | music to gain 0 | n/a |
| End card | music tail or one soft tone | on the mark settle | n/a |

Check: every event in `film.json` has an sfx id or a VO word / music hit within ±2 fr; every sfx cue has an event.

## Mix

| Layer | Target | Check |
|---|---|---|
| VO | −16…−14 LUFS integrated (file at −16) | `ffmpeg -i vo.wav -af ebur128=peak=true -f null -` |
| Music under VO | −22…−18 LUFS short-term | momentary readout in VO sections vs music-only sections |
| Music solo | −14 LUFS | |
| SFX | peaks ≤ −6 dBTP | |
| Master | −14 LUFS I, −1.5 dBTP | `ffmpeg -hide_banner -i out.mp4 -af ebur128=peak=true -f null - 2>&1 \| tail -12` |

Ducking: music down 6–9 dB under VO, attack 150 ms starting before the word onset, release 400 ms. Merge VO gaps shorter
than 0.45 s into one span so the bed does not pump. Music lifts back to full over the end card.
Master: limiter first, then two-pass `loudnorm` (I=−14, TP=−1.5); AAC encoding adds ~0.5 dB true peak, so measure after encode.
Reference mix measured on a finished film: VO section −13.6 LUFS, music-only stretch −21.8, end card −18.1.

## Music choice

| Mode | BPM | Character |
|---|---|---|
| Product film | 100–130 | minimal electronic pulse, soft kick, glassy arp, low-mid kept clear for UI sounds |
| Launch / hype trailer | 130–150 | punchy drums, driving bass; builds to the reveal, drops at the break |
| Founder story, calm | 80–95 | warm keys or strings, sparse percussion |

Rules:
- **Instrumental only under VO.** No vocals, no vocal chops in VO sections.
- **Clean intro:** first downbeat within 0.1 s of the music start (or start the music on its first downbeat).
- **Energy curve matches the structure:** build through the problem, drop or stop at the tension, return on the reveal.
- **Grid clarity beats taste:** of 3 candidates, keep the one whose beat detection is steadiest; ambient tracks give
  unreliable BPM (a felt pulse of ~80 read as 160).
- Sources, licensing and generation prompts: `craft/12#picking-music`, `craft/12#generating-music`.

## Silence and hard stop

- **Rhythm break:** at the climax, music to gain 0 for 0.5–2 s (real silence: no room tone, no bed at −40 dB), then the
  reveal returns with a hit, or the quiet close plays. Once per film > 20 s.
- **Hard stop:** music ends on a downbeat with a tail ≤ 1.5 s, or stops 1–2 s before the end for a silent close.
  Never a slow fade-out mid-phrase.
- **Trims and loops:** cut on downbeats only, 20–40 ms fades at seams; loop a short bed on its own downbeat grid.
- Check: `ffmpeg -i out.mp4 -af silencedetect=noise=-50dB:d=0.4 -f null -` lists the planned break and nothing else
  inside the film body.
