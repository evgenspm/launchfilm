# 08 · QA checklist: look at the frames before you ship

Tell T12 (craft/00) is "never looks at the output". This file is the cure: a fixed procedure, blocking checks keyed to the
12 tells, delivery checks per preset, and rules for evidence. The `film-qa` skill runs it and writes its evidence report
to `qa/<slug>/QA.md` (the CLI's automated report is `qa/<slug>/report.md`; it is input, not a substitute).

## Procedure

Run from `launch-video/`. Every step leaves a file in `qa/<slug>/`. Finals live in `out/<slug>/`.

1. **Half-scale pass.** `npx launchfilm render <slug> --presets x-16x9 --scale 0.5 --out qa/<slug>/qa.mp4`.
   Fallback: `npx remotion render <entry> <composition> qa/<slug>/qa.mp4 --scale=0.5 --crf=28`.
2. **Automated pass.** `npx launchfilm qa <slug>` (`--json` for machine output) → `qa/<slug>/report.md`: sheets, ffprobe,
   loudness and scripted checks. Its numbers are evidence; its PASS lines never replace reading the sheets.
3. **Contact sheets.** `npx launchfilm sheet <slug>` (or `sheet qa/<slug>/qa.mp4 --every 0.25 --cols 4`) → timestamped
   sheets at 4 fps. Read **every** sheet.
4. **Stills at key timestamps.** `npx launchfilm still <slug> <t> --preset <id>` (t as `2.5`, `2.5s` or `75f`) for: 0.0 s,
   0.5 s, the hook deadline (1 s reel, 1.5 s x/li, 3 s ph), the midpoint of every text hold, every shot boundary ±2 fr,
   the last frame. Repeat the hook and caption stills for each portrait preset.
5. **Preview-size still.** `npx launchfilm still <slug> <t> --scale 0.25` (or `ffmpeg -i still.png -vf scale=480:-1 still-480.png`):
   the X timeline is ≈ 480 px wide. Hero text must still read.
6. **Cuts against the grid.** Detect cuts in the render and compare with `beats.json` and the word timings:
   `ffmpeg -i qa/<slug>/qa.mp4 -vf "select='gt(scene,0.3)',showinfo" -f null - 2>&1 | grep -o "pts_time:[0-9.]*"`.
7. **Frozen and black frames.**
   `ffmpeg -i qa/<slug>/qa.mp4 -vf freezedetect=n=0.001:d=0.6 -map 0:v -f null - 2>&1 | grep freeze_` (static spans ≥ 0.6 s) and
   `ffmpeg -i qa/<slug>/qa.mp4 -vf "signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=qa/<slug>/yavg.txt" -f null -`
   then list frames with YAVG < 20 (8-bit, limited range). Every hit must be designed (a `smash-cut-black`, a fade from the logo).
8. **Source grep.** `grep -rnE "ease-in-out|Easing\.ease\b|stiffness:|damping:|transition:|animation:|Math\.random|Date\.now|setTimeout" films/<slug>/`
   Every hit is a finding unless it is inside a shared preset import.
9. **Final render per preset** (`npx launchfilm render <slug>`, craft/10), then the delivery checks below on each file in `out/<slug>/`.
10. **Loudness and stream facts** on each final file:
   `npx remotion ffprobe -v error -show_entries stream=codec_name,profile,pix_fmt,width,height,r_frame_rate,avg_frame_rate,sample_rate,channels:format=duration,size -of json <file>`
   `ffmpeg -hide_banner -i <file> -af ebur128=peak=true -f null - 2>&1 | tail -12` (read `I:` and `Peak:`), or
   `ffmpeg -i <file> -af loudnorm=I=-14:TP=-1.5:print_format=json -f null - 2>&1 | tail -12` (read `input_i`, `input_tp`).
   harness.config.json `ffmpeg.binary` says which ffmpeg the CLI uses (`remotion` bundled or `system`); if the bundled one
   lacks a filter, use a system ffmpeg.
11. **Fix, re-render only the affected range** (`--frames=<from>-<to>` on the Remotion fallback), re-run the failed checks. Then final.

## Blocking checks

Each check passes or fails per shot. A FAIL blocks the final render. Numbers come from craft/02–06.

| ID | Check | Pass condition | Evidence required |
|---|---|---|---|
| T1 | Nothing static | no span > 18 fr (0.6 s) without drift, push-in or internal motion, except the end-card settle ≤ 3 s | freezedetect output + the sheet cells of each flagged span |
| T2 | Named motion only | grep (step 7) clean; every spring and easing is a name from craft/04#springs / #easings | grep command and its (empty) output |
| T3 | Stagger | siblings enter 1 fr (chars), 2–3 fr (words), 3–4 fr (rows), 5–6 fr (cards); group entrance ≤ 24 fr | stills at entrance +0 / +6 / +12 fr showing partial states |
| T4 | Rhythm | films > 20 s have ≥ 1 rhythm break (silence 0.5–2 s, music stop, palette flip); in launch mode every cut within ±2 fr of a beat unless the storyboard marks it off-grid; text onsets within ±2 fr of the word onset | cut list vs beat list table; the break's timestamp |
| T5 | Sound glued | every visual event in film.json has a vocabulary audio id or is covered by VO; no sound without a visual; music has a beat grid; music under VO 6–9 dB ducked | event → sound table; loudness of a VO stretch vs a music-only stretch |
| T6 | Text is the picture, and legible | hero statements ≥ 8 % of frame height (or 50–80 % of width for one word); one idea per shot; holds ≥ 0.2 s × (words + 1); text contrast ≥ 4.5:1 against its plate or background; text over footage has a plate, `scrim` or shadow; no font fallback on the first frame of any text shot | stills at each text hold midpoint; measured size; the contrast pair |
| T7 | A look | each section names its treatment in STORYBOARD; launch mode: grain 0.08–0.15 and vignette 20–35 % present; gradients carry grain or dither; no visible banding in the encoded file | stills from the encoded mp4 (not the PNG) of the darkest gradient shot |
| T8 | Frame as canvas | one focal point per frame; ≤ 3 lines; no paragraphs, no bullets; UI text in product mode ≥ 80 px from the sides at 1080 | sheet review notes per shot |
| T9 | Footage with a point of view | every clip has a row in `footage/SOURCES.md`; the product is shown as rebuilt UI or the user's recording; no generic stock as the hero shot | SOURCES.md path; count of rows = count of clips |
| T10 | Spatial transitions only | hard cut by default; ≤ 1 non-cut transition per 5 s; each non-cut transition is a vocabulary id from craft/09 and is in the storyboard | storyboard transition column vs cut list |
| T11 | Story first | STORYBOARD.md approved by the user before scene code; frame 0 is not black and shows the hook's first state; a visible change by frame 15; the viewer knows the category by the hook deadline; ≥ 2 s calm at the end | approval line in STORYBOARD.md; stills at 0, 0.5 s, hook deadline, last frame |
| T12 | Looked | QA.md lists every sheet read and every still taken, with paths; all rows above filled | QA.md itself |

Also blocking, inside the tells they belong to:
- **Motion (T2/T3):** exits shorter than entrances (≤ 0.6×); no overshoot on exits; no object jumps > 40 % of frame width
  in one frame; moves ≥ 200 px in ≤ 8 fr carry motion blur; camera moves one tier at a time and never during a layout morph.
- **Camera readability (T6):** UI body text ≥ 26 px on a 1080-high frame after camera scale (≥ 30 px on 1080-wide portrait);
  the camera holds still while text streams.
- **3D (T12):** no black first frames after a 3D mount (YAVG list); every black frame intentional.

## Delivery checks

Per rendered file. Values from craft/10#presets and craft/02#mix.

| ID | Check | Pass condition |
|---|---|---|
| D1 | Codec | video `h264`, profile `High`, `pix_fmt` `yuv420p`, container mp4 |
| D2 | Size | width × height exactly the preset's (1920×1080, 1080×1350, 1080×1080, 1080×1920) |
| D3 | Frame rate | `r_frame_rate` = `avg_frame_rate` = composition fps (30, or 60 for UI-heavy) |
| D4 | Duration | film.json duration ±1 fr |
| D5 | Audio stream | `aac`, 48000 Hz, 2 channels, ~192 kbps; hero-loop: **no** audio stream |
| D6 | Loudness | integrated −14 LUFS ±1; true peak ≤ −1.5 dBTP |
| D7 | Faststart | `moov` before `mdat`: `npx remotion ffprobe -v trace <file> 2>&1 \| grep -m2 -oE "type:'(moov\|mdat)'"` prints moov first |
| D8 | Poster | a PNG per preset in `out/<slug>/` equals frame 0 of that preset (`render.poster: "frame0"`), same size, not black |
| D9 | SRT | present for every preset with VO (and for presets set to `captions: "srt"`); phrase count = caption phrase count; times within ±2 fr of the caption phrases |
| D10 | Safe zones | captions and key text inside the preset safe box (craft/10#safe-zones); checked on a still with the box drawn |
| D11 | Caption legibility | captions readable on the 480 px wide still (16:9) and the 360 px wide still (4:5, 9:16) |
| D12 | No accidental freeze or black | freezedetect and YAVG lists match the designed holds and black beats only |
| D13 | Colour | BT.709 tags or untagged HD (players assume BT.709); darkest gradient shows no new banding vs the PNG |
| D14 | File size | under the platform cap (X ≤ 512 MB; README hero ≤ 10 MB; verify current limits) |
| D15 | Credits and sources | `out/<slug>/credits.txt` lists every CC BY asset with its credit line; `footage/SOURCES.md` complete |
| D16 | Loop (hero-loop only) | frame N equals frame 0 (built as `frame % N`); the 3× looped file shows no jump at the seams |

## Evidence rules

1. **No evidence, no PASS.** Every PASS cites a file path (sheet, still, log) or a measured number. "Looks good" is not evidence.
2. **NOT CHECKED is allowed and must be said.** Write `NOT CHECKED` with the reason (no ffmpeg filter, no human ears).
   Never imply a check that did not run.
3. **Agents cannot listen.** Audio rows are measured (LUFS, true peak, event → sound table). If no human listened, the row
   says "measured, not listened". Ask the user to listen once to the final before posting.
4. **Check the encoded file**, not the PNG still, for banding, colour and loudness.
5. **QA.md format:**

```
| check | result | evidence | fix applied |
|---|---|---|---|
| T1 | FAIL → PASS | qa/<slug>/freeze.txt: 2.10–2.95 s frozen; fixed with drift 1.00→1.04 | craft/03#drift-and-push-in |
| D6 | PASS | x-16x9: I −14.2 LUFS, TP −1.7 dBTP (qa/<slug>/report.md) | n/a |
| D11 | NOT CHECKED | reel preset not rendered yet | n/a |
```

6. **Report findings with their rule**: `shot · finding · rule (craft/NN#anchor or T/D id) · fix`. Re-run the failed check after
   the fix and update the row; keep the FAIL → PASS history.
