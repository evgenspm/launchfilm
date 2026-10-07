# Mix: targets, ducking, measurement

Full law: `craft/02#mix`. Shipped defaults: `harness.config.json` → `audio` (master I −14 / TP −1.5 / LRA 11;
VO I −16; music file I −14; SFX peak −3 dBFS). The film engine applies ducking and levels; `render` and `qa` master and
measure. Use the commands below to verify by hand. `ffmpeg` = system ffmpeg or `npx remotion ffmpeg` (config
`ffmpeg.binary`); if the bundled build lacks a filter, use the system one.

## Targets

| Element | Target | Check |
|---|---|---|
| VO | −16…−14 LUFS integrated (file at −16) | ebur128 on the VO stem or a VO-only section |
| Music under VO | −22…−18 LUFS short-term | ebur128 short-term values over a VO section minus the VO, or a section with VO muted |
| Music solo (no VO) | about −14 LUFS short-term | music-only section |
| SFX | peaks ≤ −6 dBTP before master | per-event peak in the stem |
| Master | −14 LUFS I (±1), ≤ −1.5 dBTP, LRA ≤ 11 | ebur128 on the final mp4 |
| Silence | gain 0 (no room tone, no music) for 0.5–2 s | momentary loudness at −70 LUFS or below in that window |

A studied test mix measured: VO section −13.6 LUFS, music-only stretch −21.8, end card −18.1. Use as a sanity range.

## Ducking

- Music −6 to −9 dB under VO.
- Attack 150 ms, starting before the word (look-ahead from word timings), release 400 ms.
- Merge VO gaps < 0.45 s into one span so the bed doesn't pump between words.
- Over the end card the music lifts back to its full level (+6 dB from ducked) unless the close is silent.

## Measure

Integrated, LRA, true peak of the final:
```bash
ffmpeg -hide_banner -nostats -i out/<slug>/<file>.mp4 -af ebur128=peak=true -f null - 2>&1 | tail -12
```
A section (e.g. 2.0–8.0 s):
```bash
ffmpeg -hide_banner -nostats -ss 2.0 -to 8.0 -i out/<slug>/<file>.mp4 -af ebur128=peak=true -f null - 2>&1 | tail -12
```
Momentary/short-term over time (look for pumping and the silence window):
```bash
ffmpeg -hide_banner -nostats -i out/<slug>/<file>.mp4 -af ebur128=framelog=verbose -f null - 2>&1 | grep -E 'M:|S:' | head -60
```
Clipping check: true peak ≤ −1.5 dBTP; any sample at 0 dBFS in a stem is a defect.

## Two-pass loudnorm (what the master step does; for manual fixes)

1. Limit first, so AAC encoding does not push true peak over the target (AAC adds about +0.5 dB):
   `alimiter=limit=0.79` (≈ −2 dBFS).
2. Pass 1, measure:
   `ffmpeg -i mix.wav -af "alimiter=limit=0.79,loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json" -f null -`
3. Pass 2, apply with the measured values (`measured_I`, `measured_TP`, `measured_LRA`, `measured_thresh`,
   `target_offset`) and `linear=true`, output 48 kHz.
4. Re-measure the encoded mp4 (not the wav): I −14 ±1, TP ≤ −1.5.

## Common faults

| Symptom | Cause | Fix |
|---|---|---|
| Master −14 but VO hard to hear | music not ducked enough | duck 9 dB; check music short-term ≤ −20 under VO |
| Bed pumps between words | gaps not merged | merge VO gaps < 0.45 s |
| TP −0.9 after export | no limiter before loudnorm, AAC overshoot | limiter first, re-run two-pass |
| Silence has hiss | room tone or a music tail left on | gain 0 for the window |
| SFX louder than VO | gains from the table not reduced under VO | −6 dB more under words; no whoosh during words |
