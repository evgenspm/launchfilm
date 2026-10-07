---
name: film-qa
description: QA a rendered launch film before anyone ships it. Use for "QA the video", "check the render", "is it ready to post", "review the film", "why does it look cheap", "check the captions/safe zones/loudness", after every render and before package. Reads the CLI's automatic report (`npx launchfilm qa <slug>`), contact sheets and stills at key timestamps, then checks text-at-time readability, contrast, platform safe zones, loudness (−14 LUFS, −1.5 dBTP), ffprobe encode specs, black and frozen frames, cuts on the beat, and the 12 amateur tells as blocking checks. Writes qa/<slug>/QA.md where every line cites a file or a measured number; a check that was not run says NOT CHECKED, never PASS. Use scene-build to fix picture problems it finds, sound to fix the mix, launch-film for the whole pipeline, reference-study for reference videos.
---

# film-qa

You check frames and numbers, not intentions. A PASS needs evidence: a file path you opened or a number you measured.
Anything else is `NOT CHECKED: <reason>`. Never write PASS for something you did not look at or measure.

Paths (relative to `launch-video/`, or `studio/` in the launchfilm repo): film source `films/<slug>/` (film.json,
STORYBOARD.md, BRIEF.md), renders `out/<slug>/`, QA `qa/<slug>/` (the CLI writes `report.md`; you write `QA.md` next to it).
Exact CLI flags: `npx launchfilm <cmd> --help`. Commands with tested syntax: [references/commands.md](references/commands.md).

## Procedure

1. **Automatic pass.** `npx launchfilm qa <slug>` → read `qa/<slug>/report.md` first (sheets, ffprobe, loudness,
   automatic checks). Copy its measured numbers into QA.md as evidence; don't re-measure what it measured.
2. **Sheets.** Open every contact sheet the report lists (or `npx launchfilm sheet <slug>`). Read every cell. List the
   files you opened in QA.md (T12 evidence).
3. **Stills.** `npx launchfilm still <slug> <t> --preset <id>` for each preset the film ships, at: every shot boundary
   + 6 fr, every text onset + hold/2, frame 0, the last frame, and every interval the freeze or black-frame scan flags.
   Plus one still at `--scale 0.25` (480×270 for 16:9) on the hero text frame: the X timeline preview. Read each PNG.
4. **Measure** what the report did not: loudness, true peak, black frames, frozen intervals, cut times vs beats,
   contrast behind text, safe zones, caption line lengths. Commands in references/commands.md.
5. **Blocking checks** T1–T12 below, then delivery checks D1–D16. Each gets PASS / FAIL / NOT CHECKED + evidence + rule.
6. **Write `qa/<slug>/QA.md`** from [references/qa-template.md](references/qa-template.md).
7. **Fix loop.** Any FAIL: hand the finding to scene-build or sound with frame numbers, re-render only the affected range
   (`npx remotion render … --frames=<a>-<b>` or the CLI equivalent), re-check those items. Max 2 loops; then report the
   remaining FAILs to the user with stills attached. Never downgrade a FAIL to PASS without new evidence.

## Blocking checks: the 12 tells (craft/00)

| Id | Pass condition | Evidence |
|---|---|---|
| T1 static | no frozen interval ≥ 0.6 s except the end-card settle (≤ 3 s); every flagged interval verified by stills at its start and end showing drift or motion | freezedetect output + 2 stills per interval |
| T2 default easing | grep G1 (scene-build) empty in `films/<slug>`; no CSS transitions | grep output |
| T3 all at once | every group of ≥ 3 siblings enters staggered (partial states visible in a sheet cell or stagger ≥ 1 fr in code); group entrance ≤ 24 fr | sheet cell refs or code lines |
| T4 one speed | film > 20 s has ≥ 1 rhythm break (silence, smash cut to black, palette flip, hold ≥ 2× median shot); launch mode: every cut within ±2 fr of a beat | film.json boundaries vs beats.json; detected cuts |
| T5 sound | every film.json visual event has an sfx or is covered by VO/music; music ducks under VO; true silence where planned | event count with/without sound; loudness of a VO window vs a music-only window |
| T6 text as label | hero text ≥ 8 % of frame height when text is the message (statements 10 %); every text holds ≥ 0.2 × (words + 1) s; ≤ 3 lines; captions ≤ 2 lines | per-item table |
| T7 flat look | launch mode: grain + vignette present; one named treatment per section; product mode: hairlines, soft shadows; no banding in the darkest gradient of the mp4 still | grep + still from the mp4 |
| T8 web layout | one focal point per still; no paragraph > 3 lines; no bullets; UI chrome only where the chrome is the point | stills |
| T9 generic stock | every footage clip in `films/<slug>/footage/SOURCES.md` with source + license; stock clips graded and cut ≤ 1.5 s | SOURCES.md + stills |
| T10 decorative transitions | transitions ⊂ vocabulary; non-cut transitions ≤ 1 per 5 s; `blur-dissolve` ≤ 12 fr | film.json |
| T11 template before story | STORYBOARD.md has `approved:`; frame 0 not black and differs from the still at 0.5 s; category of product clear by 1.5 s (x, li) / 1 s (reel); payoff after the problem; ≥ 2 s calm on brand surface at the end | stills 0, 0.5, 1.5 s, last 2 s |
| T12 never looked | this QA: every sheet and still listed as opened | file list in QA.md |
Any FAIL in T1–T12 blocks render-for-delivery and package.

## Delivery checks (per preset; numbering = craft/08#delivery-checks)

Values from harness.config.json `presets`, else craft/10#presets. Use these ids exactly; craft/08 and QA.md share them.

| Id | Pass condition |
|---|---|
| D1 | video h264, profile High (Remotion's ffprobe prints `100`), pix_fmt yuv420p, container mp4 |
| D2 | width × height exactly the preset's |
| D3 | constant fps = composition fps (`r_frame_rate` = `avg_frame_rate`) |
| D4 | duration = film.json ±1 fr, and inside the preset's length range (x-16x9 ≤ 140 s, reel-9x16 ≤ 90 s) |
| D5 | audio aac LC (Remotion's ffprobe prints `1`), 48000 Hz, 2 channels, ~192 kbps; hero-loop: no audio stream |
| D6 | integrated loudness −14 ±1 LUFS; true peak ≤ −1.5 dBTP; VO −16…−14 LUFS where measurable |
| D7 | `moov` before `mdat` (faststart) |
| D8 | poster = frame 0 of that preset exists, same size, not black (YAVG > 20), shows the hook |
| D9 | SRT next to the render for every preset with VO; same phrases as the captions; `HH:MM:SS,mmm`; ≤ 2 lines; ≥ 0.8 s each; times ±2 fr |
| D10 | nothing important (captions, text, logo, the UI being used) outside the preset's safe zone (overlay still) |
| D11 | captions burned on every preset with VO (hero-loop: none, ph-16x9 per its config); ≤ 2 lines; ≤ 42 chars/line (16:9), ≤ 32 (4:5, 1:1, 9:16); never over the changing element; contrast ≥ 4.5:1 for captions and text over footage, ≥ 3:1 accent on bg; readable on the 480 px (16:9) and 360 px (4:5, 9:16) wide stills |
| D12 | freeze and black lists match the designed holds and black beats only (listed in film.json or STORYBOARD) |
| D13 | BT.709 tags or untagged HD; the darkest gradient shows no new banding in the mp4 still vs the PNG |
| D14 | file size under the cap: x ≤ 512 MB, README hero ≤ 10 MB |
| D15 | `out/<slug>/credits.txt` lists every CC BY asset with its credit line; `films/<slug>/footage/SOURCES.md` complete |
| D16 | hero-loop only: frame N equals frame 0; a 3× looped file shows no jump at the seams |

## Text-at-time readability

For every text item in film.json (statements, captions, labels, UI copy the VO points at): words, in/out frames,
hold = (out − in) / fps, required = 0.2 × (words + 1) s. Also check at the 480×270 still that the hero line is still
readable (letters distinguishable). One row per item in QA.md.

## Rules for the report

- Every PASS cites evidence: `qa/<slug>/stills/x-16x9-12.30.png`, `I = −14.2 LUFS`, `grep G1: 0 lines`.
- Measured numbers keep units and the tool that produced them (`system ffmpeg 8.1 ebur128` or `remotion ffmpeg loudnorm`).
  Remotion's bundled ffmpeg lacks `ebur128`, `signalstats`, `freezedetect`, `tile`, `drawbox` and rawvideo output: use a
  system ffmpeg for those and say so; if none exists, those items are NOT CHECKED.
- A FAIL names the frame range, the rule (`craft/NN#anchor` or `T#`/`D#`) and the proposed fix.
- The summary block says READY only when T1–T12 and D1–D16 are all PASS (D16 only for hero-loop) (NOT CHECKED counts as not ready, with reason).
