# QA commands (tested syntax)

`F` = a render, e.g. `out/<slug>/<slug>-x-16x9.mp4` (exact names: the CLI's output). Run from `launch-video/`.
`FF` = `ffmpeg` (system, preferred: all filters) or `npx remotion ffmpeg` (bundled; has `loudnorm`, `crop`, `scale`,
`palettegen`; lacks `ebur128`, `signalstats`, `freezedetect`, `tile`, `drawbox`, `select`/`showinfo` and rawvideo output).
Write in QA.md which one you used.

## CLI

```bash
npx launchfilm qa <slug>                         # qa/<slug>/report.md (+ --json): sheets, ffprobe, loudness, auto checks
npx launchfilm sheet <slug>                      # contact sheets of the latest render
npx launchfilm sheet F --every 0.25 --cols 4     # works on any video file
npx launchfilm still <slug> 12.3 --preset li-4x5 # t as 12.3, 12.3s or 369f
npx launchfilm still <slug> 0 --scale 0.25       # 480×270 X-preview check on a 1920×1080 preset
```

## Encode (D1–D5)

```bash
npx remotion ffprobe -v error -show_entries \
  stream=codec_name,profile,pix_fmt,width,height,r_frame_rate,sample_rate,channels,bit_rate,color_primaries,color_transfer,color_space:format=duration,size \
  -of json F
```
Expect video `h264`, profile `100` (High; a system ffprobe prints `High`), `yuv420p`, size and `r_frame_rate` of the
preset (`30/1`); audio `aac`, profile `1` (LC), `48000`, `2`. Duration in `format.duration` (seconds).

## Faststart (D7)

```bash
ffmpeg -v trace -i F 2>&1 | grep -m2 -oE "type:'(moov|mdat)'"     # first line must be type:'moov'
```

## Loudness (D6)

```bash
# system ffmpeg: integrated loudness and true peak
ffmpeg -hide_banner -nostats -i F -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+(I|Peak):"
# bundled or system: loudnorm measurement pass (-vn is required with the bundled build)
FF -hide_banner -nostats -i F -vn -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | grep -E '"input_(i|tp)"'
# a window (VO section vs music-only section): add -ss <t0> -t <dur> before -i
```
Targets: master −14 ±1 LUFS I, true peak ≤ −1.5 dBTP; VO sections −16…−14; music-only stretches −22…−18 under-VO level.

## Black frames (D8, D12)

```bash
ffmpeg -i F -vf "signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=-" -f null - 2>/dev/null \
 | awk '/pts_time/{split($0,a,"pts_time:"); t=a[2]} /YAVG/{split($0,b,"="); if (b[2]+0 <= 20) print t, b[2]}'
```
Prints `time YAVG` for each frame with YAVG ≤ 20 (8-bit limited range: pure black = 16).

## Frozen intervals (T1)

```bash
ffmpeg -hide_banner -nostats -i F -vf "freezedetect=n=0.003:d=0.6" -map 0:v -f null - 2>&1 \
 | grep -oE "freeze_(start|end|duration): [0-9.]+"
```
A `freeze_start` with no `freeze_end` runs to the end of the file (the end card). Slow drift can be flagged: open stills at
the interval's start and end; any change in scale or position = drift present = not a freeze.

## Cuts vs beats (T4)

```bash
ffmpeg -hide_banner -nostats -i F -vf "select='gt(scene,0.3)',showinfo" -an -f null - 2>&1 | grep -oE "pts_time:[0-9.]+"
```
Compare each cut time t with the nearest beat b from beats.json: pass if |t − b| × fps ≤ 2. Also check film.json shot
boundaries against `round(beats[n] × fps)`.

## Contrast (D11)

```bash
# average colour of a region of a still (system ffmpeg): crop=w:h:x:y in pixels of the still
ffmpeg -v error -i qa/<slug>/<still>.png -vf "crop=600:80:660:900,scale=1:1" -f rawvideo -pix_fmt rgb24 - | xxd -p
# WCAG contrast ratio of two hex colours
node -e 'const L=h=>{const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]};const [a,b]=process.argv.slice(1).map(L);console.log(((Math.max(a,b)+0.05)/(Math.min(a,b)+0.05)).toFixed(2))' "#F2F2F4" "#0B0B0F"
```
Sample the background just around the text box (not the glyphs); text colour from brand.json (or a crop inside a thick
glyph). `#F2F2F4` on `#0B0B0F` = 17.57. Pass ≥ 4.5 for text, ≥ 3 for the accent on bg.

## Safe zones (D10)

Safe zone px from harness.config.json `presets.<id>.safe` (fractions × size) or craft/10#safe-zones
(T/R/B/L: x-16x9 60/96/120/96 · li-4x5 80/64/160/64 · li-1x1 64/64/140/64 · ph-16x9 54/96/110/96 ·
reel-9x16 220/140/480/60). Overlay the box on a still and read it:
```bash
# reel-9x16 example: box from (60,220) to (1080-140, 1920-480)
ffmpeg -v error -y -i qa/<slug>/reel-9x16-3.00.png -vf "drawbox=x=60:y=220:w=880:h=1220:color=red@0.9:t=4" qa/<slug>/safe-reel-3.00.png
```
Pass: no text, logo or active UI element crosses the red box.

## Captions and SRT (D9, D11)

```bash
# lines longer than the limit (42 for 16:9; use 32 for 4:5, 1:1, 9:16)
awk 'NF && !/-->/ && !/^[0-9]+$/ && length($0) > 42 {print FILENAME": "FNR": "length($0)" chars"}' out/<slug>/*.srt
# cues with more than 2 text lines
awk 'BEGIN{RS="";FS="\n"} NF > 4 {print "cue", $1, "has", NF-2, "lines"}' out/<slug>/*.srt
```
Plus stills at each caption onset + hold/2: plate visible, ≤ 2 lines, not covering the changing element.

## Text holds (T6)

For each text item: `hold_s = (out − in) / fps ≥ 0.2 × (words + 1)`. One word 0.4 s, five words 1.2 s, nine words 2.0 s.
