# 10 · Platforms: export presets, captions, safe zones, poster

One film, several presets. Each preset is its own composition (`<slug>-<preset>`) recomposed with focus rects
(craft/03#multi-aspect-recomposition). Never crop a 16:9 render into 9:16, never letterbox.
Render: `npx launchfilm render <slug> --presets x-16x9,li-4x5` (no `--presets` = `defaultPresets` in harness.config.json);
files land in `out/<slug>/`. Package: `npx launchfilm package <slug>` (finals + poster + SRT + credits).
Preset definitions (size, fps, duration, captions, audio, hook, loop, safe zones) live in harness.config.json → `presets`.
Platform limits churn: the numbers marked *verify* were current in Oct 2026; check before a launch.

## Presets

| id | size | fps | length target (max) | hook by | audio | captions | safe zone px T/R/B/L |
|---|---|---|---|---|---|---|---|
| `x-16x9` | 1920×1080 | 30 (60 UI-heavy) | 30–45 s (≤ 2:20, *verify*) | 1.5 s | muted autoplay assumed | burned | 60 / 96 / 120 / 96 |
| `li-4x5` | 1080×1350 | 30 | 30–60 s | 1.5 s | muted autoplay | burned (+ SRT upload) | 80 / 64 / 160 / 64 |
| `li-1x1` | 1080×1080 | 30 | 30–60 s | 1.5 s | muted autoplay | burned (+ SRT) | 64 / 64 / 140 / 64 |
| `ph-16x9` | 1920×1080 | 30 | 60–90 s | 3 s | VO + music | burned (+ SRT for YouTube) | 54 / 96 / 110 / 96 |
| `hero-loop` | 1920×1080 (1280×720 for a README) | 30 | 10–20 s | n/a | none: no audio track | none | subject inside the centred 75 % |
| `reel-9x16` | 1080×1920 | 30 | 15–30 s (≤ 90 s) | 1 s | VO / music | burned | 220 / 140 / 480 / 60 |

- **fps:** 30 by default. 60 only for UI-heavy films (cursor paths, scrolling lists, fast pans). One fps per film; all presets
  of a film share it. Frame numbers in craft are at 30 fps: scale by fps/30.
- **Length:** a preset sets a target, not a crop. A 45 s x-16x9 film and a 25 s reel-9x16 cut are two edits of one story
  (story skill picks the structure per preset, craft/01#structures).
- **Hook by:** the second by which the viewer must know what this is (craft/01#hooks). Something visibly changes by frame 15 on
  every preset.

## Encode

| Setting | Value | Why |
|---|---|---|
| Codec / profile | H.264 High | plays everywhere, platforms re-encode from it |
| Pixel format | yuv420p | other formats fail on some players |
| Colour | BT.709 (`--color-space=bt709`, or untagged HD) | wrong tags shift colours after upload |
| Quality | CRF 18 (hero-loop CRF 23–28) | platforms re-encode; give them clean input |
| Frame rate | constant, = composition fps | variable fps judders after re-encode |
| Audio | AAC-LC, 48 kHz, stereo, 192 kbps | hero-loop: no audio stream at all |
| x264 preset | medium | harness.config.json → `render` holds crf, x264Preset, pixel format, audio codec, bitrate, sample rate |
| Loudness | −14 LUFS integrated, ≤ −1.5 dBTP (craft/02#mix) | two-pass loudnorm with a limiter first; AAC adds ~0.5 dB TP |
| Container | mp4 with `+faststart` | starts playing before the download finishes |

Remotion render (what `launchfilm render` wraps; use directly only as a fallback):

```bash
npx remotion render <entry> <slug>-x-16x9 out/<slug>/<slug>-x-16x9.mp4 \
  --codec=h264 --crf=18 --pixel-format=yuv420p --audio-codec=aac --audio-bitrate=192k
ffmpeg -i in.mp4 -c copy -movflags +faststart out.mp4          # faststart remux, no re-encode
```

Hero loop:

```bash
npx remotion render <entry> <slug>-hero-loop out/<slug>/hero.mp4 --codec=h264 --crf=26 --pixel-format=yuv420p --muted
ffmpeg -i out/<slug>/hero.mp4 -vf scale=1280:-2 -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 26 -an \
  -movflags +faststart out/<slug>/hero-720.mp4                          # README variant, must be ≤ 10 MB
```

Seamless loop: build the loop as `frame % N` so frame N equals frame 0 (every drift, rotation and noise phase completes a
whole cycle in N). Check: play the file 3× (`ffmpeg -stream_loop 2 -i hero.mp4 -c copy loop3.mp4`) and read the sheet across
the seams; no jump, no flash (QA D16).

## Captions

Burned in by default on every preset with VO. Muted autoplay is the normal case on X, LinkedIn and Reels.
The CLI's shipped default for `ph-16x9` is SRT-only (`captions: "srt"` in harness.config.json → `presets`), because
YouTube shows its own captions; set it to `"burned"` when the gallery autoplays muted. Values: `burned` · `srt` · `none`.

| Rule | Value |
|---|---|
| Unit | whole phrase at once, ≤ 2 lines (no karaoke by default) |
| Line length | ≤ 42 chars in 16:9; ≤ 32 chars in 4:5, 1:1, 9:16 |
| Size on output | 16:9 46–54 px (1080 high) · 4:5 and 1:1 52–60 px · 9:16 60–72 px |
| Font | the brand text font (default Inter), weight 500–600, sentence case, no all caps, no emoji |
| Plate | 80–86 % black, radius 12–16 px, padding ≈ 0.35 em × 0.6 em; or a 2–3 px outline when a plate fights the look |
| Contrast | text vs plate ≥ 4.5:1 |
| Accent | ≤ 1 keyword per phrase in the brand accent (if accent vs plate ≥ 3:1, else bold fg) |
| Timing | in at the first word onset −2 fr; out at the last word end +6–10 fr, or when the next phrase starts |
| Layering | above footage and UI, below keycaps; never covers the thing that changes (move the band up or hide it for that beat) |

Caption band position (plate bottom edge, output px): x-16x9 and ph-16x9 ≤ y 960 · li-4x5 ≤ y 1190 · li-1x1 ≤ y 940 ·
reel-9x16 inside y 1180–1440. Keycaps sit above the band (craft/03#cursor-and-keycaps).

## SRT

Sidecar next to each preset render with VO, in `out/<slug>/`, same base name as the mp4 with `.srt`. Built from the same phrases as the
burned captions, so timings match (QA D9).

```
1
00:00:00,400 --> 00:00:02,100
Invoices used to eat an afternoon.

2
00:00:02,200 --> 00:00:04,000
Now Acme Ledger sends them for you.
```

- UTF-8, plain text: strip script markup (`*word*`, `|`, craft/11#script-markup).
- Times: ms = round(frame / fps × 1000), format `HH:MM:SS,mmm`. Numbering from 1.
- ≤ 2 lines per cue, ≤ 42 chars per line; cue length 0.8–6 s (extend short cues into the gap, split long ones); gap between
  cues ≥ 2 fr.
- Some platforms want a language suffix in the file name (e.g. `.en.srt`); check the upload form (*verify*).

## Safe zones

Platform UI (buttons, progress bars, captions, profile rails) covers parts of the frame. Captions, logos, the CTA and any
text the story needs live inside the safe box. harness.config.json stores each preset's `safe` as fractions
`{top, bottom, left, right}`; the px below = fraction × frame size.

| Preset | Safe box (x, y, w × h) | What covers the outside |
|---|---|---|
| x-16x9 | 96, 60, 1728 × 900 | mute / time badges and player controls at the bottom |
| li-4x5 | 64, 80, 952 × 1110 | player controls and the CC button at the bottom |
| li-1x1 | 64, 64, 952 × 876 | player controls at the bottom |
| ph-16x9 | 96, 54, 1728 × 916 | YouTube controls and title overlays |
| hero-loop | 240, 135, 1440 × 810 | `object-fit: cover` crops the edges on narrow screens |
| reel-9x16 | 60, 220, 880 × 1220 | top bar, right button rail, bottom caption and description overlay (union of Reels, TikTok, Shorts; *verify*) |

Check: render a still per preset, draw the box (`drawbox` in ffmpeg or an overlay in the composition behind a flag), read it
(QA D10). Backgrounds and footage may bleed past the box; text may not.

## Poster

- **Poster = frame 0** of each preset (harness.config.json `render.poster: "frame0"`; `package` writes it). By hand:
  `npx launchfilm still <slug> 0 --preset x-16x9` (or `npx remotion still <entry> <comp> poster.png --frame=0`).
  Feeds and players show the first frame before and during muted autoplay, so frame 0 is the thumbnail.
- **Design frame 0:** never black, never the first frame of a fade-in; it shows the hook's first state (the friction, the claim,
  the product mid-action); ≤ 7 words of text, readable at 480 px wide; subject inside the safe box.
- Files: one PNG per preset in `out/<slug>/` (lossless, same size). Optional `poster.jpg` at quality ~90 for websites.
- Platforms that accept a custom thumbnail get the same poster, so the thumbnail and the first frame match.
- hero-loop: frame 0 is also the `<video poster>`; it must look like a frame of the loop, not a title card.

## Per platform notes

**X.** Muted autoplay in the timeline; 16:9 is the default, 1:1 (`li-1x1`) also works and takes more height on phones.
Length ≤ 2:20 for most accounts, ≤ 512 MB (*verify*). X re-encodes hard: avoid 1 px hairlines below 10 % contrast and dark
gradients without grain (craft/06#banding-and-encode). Post copy: `launch-post` skill.

**LinkedIn.** Muted autoplay. 4:5 takes the most feed height on mobile; 1:1 is the safe choice when desktop matters.
Upload the SRT as captions as well as burning them in (accessibility and search). Upload the poster as the thumbnail.
Long uploads are allowed; the feed sweet spot is 30–60 s.

**Product Hunt.** Gallery video plays from a YouTube link: upload `ph-16x9` to YouTube (unlisted is fine) with its SRT and
paste the URL in the gallery. 60–90 s, VO + music, hook by 3 s. Export gallery stills from the film at the gallery's
recommended size (*verify* current specs).

**README and site hero.** `hero-loop`: no audio, 10–20 s, seamless. GitHub: drag the mp4 into an issue or PR to get a
user-attachments URL, ≤ 10 MB on free plans (*verify*), so use the 1280×720 CRF 26 variant. Site: `<video autoplay muted
loop playsinline poster="...">`; keep the subject in the centred 75 % because `object-fit: cover` crops.

**Reels, TikTok, Shorts.** `reel-9x16`, hook by 1 s, 15–30 s. The right rail and the bottom overlay cover a lot: captions in
the y 1180–1440 band, nothing important right of x 940. Recompose from the film's focus rects; never upload the 16:9 cut
with bars.
