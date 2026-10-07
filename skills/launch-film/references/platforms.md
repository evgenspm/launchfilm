# Platform presets (summary)

Full law: `craft/10-platforms.md` (encode, captions, SRT, safe zones, poster, per-platform notes).
Preset ids are keys of `presets` in `harness.config.json` (each a definition: `width`, `height`, `fps`, `duration`
[min, max], `maxDuration`, `captions` `burned|srt|none`, `audio`, `hookMaxS`, `loop`, `safe` fractions). `defaultPresets`
lists what `npx launchfilm render <slug>` renders when `--presets` is omitted (shipped: `x-16x9`, `li-4x5`).

| id | size | fps | length (max) | hook by | audio | captions | safe zone px T/R/B/L |
|---|---|---|---|---|---|---|---|
| `x-16x9` | 1920×1080 | 30 (60 UI-heavy) | 30–45 s (≤ 2:20) | 1.5 s | muted autoplay assumed | burned | 60/96/120/96 |
| `li-4x5` | 1080×1350 | 30 | 30–60 s | 1.5 s | muted autoplay | burned (+ SRT upload) | 80/64/160/64 |
| `li-1x1` | 1080×1080 | 30 | 30–60 s | 1.5 s | muted autoplay | burned (+ SRT) | 64/64/140/64 |
| `ph-16x9` | 1920×1080 | 30 | 60–90 s | 3 s | VO + music | burned recommended (+ SRT for YouTube); shipped config default is `srt` | 54/96/110/96 |
| `hero-loop` | 1920×1080 (1280×720 for a README ≤ 10 MB) | 30 | 10–20 s | n/a | none (no audio track) | none | subject inside the centred 75 % |
| `reel-9x16` | 1080×1920 | 30 | 15–30 s (≤ 90 s) | 1 s | VO/music | burned | 220/140/480/60 |

If a preset's `safe` fractions in `harness.config.json` differ from this table, use the larger margin of the two.
To burn captions on ph-16x9, set `presets["ph-16x9"].captions` to `"burned"` in `harness.config.json`.

## Encode (all presets; `render` block of harness.config.json)

H.264 High, yuv420p, BT.709, CRF 18 (hero-loop 23–28), x264 preset medium, constant fps, AAC-LC 48 kHz 192 kbps
stereo, `-movflags +faststart`. Master −14 LUFS I / −1.5 dBTP. Poster = frame 0 (`render.poster: "frame0"`): design
it, never black, never a blank fade-in.

## Checks after render

| Check | How | Pass |
|---|---|---|
| Size, fps, codec | `npx remotion ffprobe -v error -show_entries stream=codec_name,profile,pix_fmt,width,height,r_frame_rate -of json <file>` | matches the row; `h264`, `High`, `yuv420p` |
| Duration | same with `format=duration` | within ±1 frame of film.json; inside the preset length range |
| Loudness | `npx launchfilm qa <slug>`, or system `ffmpeg -hide_banner -nostats -i <file> -af ebur128=peak=true -f null - 2>&1 \| tail -12` (Remotion's bundled ffmpeg lacks `ebur128`) | I −14 ±1 LUFS, peak ≤ −1.5 dBTP |
| hero-loop audio | ffprobe stream list | no audio stream |
| hero-loop seam | still at the last frame vs frame 0 | frame N+1 == frame 0 (no visible jump) |
| Safe zone | stills at every caption/CTA frame | no text or logo inside the reserved margins |
| File size | `ls -lh out/<slug>/` | X ≤ 512 MB; README hero ≤ 10 MB |

## Notes

- Each preset is its own composition recomposed with focus rects; a 9:16 is never a crop of the 16:9.
- Product Hunt plays gallery video from a YouTube link: upload `ph-16x9` (unlisted is fine) and paste the URL.
- LinkedIn and reels autoplay muted: burned captions carry the story; the SRT is a bonus for accessibility.
