# Music: license, pick, generate, fit

Full law: `craft/12-audio-library.md` and `craft/02#music-choice`. Engineering guidance, not legal advice; verify
current terms of any provider or library before a commercial release.

## License traffic lights

| Light | Sources | In the user's film | In a public repo |
|---|---|---|---|
| Green | CC0 / public domain; procedural or self-made audio; the bundled library tracks marked CC0 | yes | yes |
| Yellow | CC BY 4.0 (credit required: title, author, source URL, license in the post/description and `credits` file); AI music generated with the user's own key (Lyria, Stable Audio, ElevenLabs) | yes, with credit / provenance | CC BY: yes with manifest; AI output: keep it in the user's project only. **ElevenLabs music: never commit to any public repo or library (their terms forbid music libraries)** |
| Orange | Pixabay Music, Mixkit, Uppbeat, YouTube Audio Library, Zapsplat | the user downloads it themselves and uses it in the video | never (their terms forbid redistributing the files) |
| Red | CC BY-SA, CC BY-ND, any NC license (syncing music to video counts as an adaptation); Udio; Bensound; automated Suno downloads; commercial songs; TikTok/meme sounds; OS system sounds | no | no |

## Pick from the library (default)

`npx launchfilm music <slug> --len <film s> --bpm <n> --mood "<words>"` picks; `--track <id>` forces one.
Choose by, in order:
1. No vocals (under VO). Instrumental only.
2. BPM band for the mode: 100–130 product · 130–150 hype · 80–95 calm. Prefer integer grids at 30 fps
   (100, 112.5, 120, 128.57, 150).
3. Energy arc that matches the structure: quiet under the problem, lift at the reveal, a hit or stop for the end.
4. Clean intro (first downbeat ≤ 0.1 s) and clear transients (the beat detector finds a steady grid).
5. Timbre that fits the brand theme: dark/technical → synth pulse, glassy arps; light/warm → keys, soft drums.
6. Green before yellow. Yellow → write the credit line now.

## Generate (user's key; optional)

`npx launchfilm music <slug> --provider lyria|elevenlabs|stable-audio --prompt "<prompt>" --len <s> [--bpm <n>]`
Prompt pattern:
`<genre>, <BPM> BPM, <instrumentation>, <energy curve>, instrumental, no vocals, clean intro, hard stop at <n> s`
Examples:
- "minimal electronic pulse, 120 BPM, soft kick, round synth bass, glassy arpeggio, steady then lifts at 10 s,
  instrumental, no vocals, clean intro, hard stop at 30 s"
- "warm lo-fi, 90 BPM, dusty drums, electric piano, calm throughout, instrumental, no vocals, clean intro, hard stop at 45 s"
- "dark drone with ticking percussion into strings and drums, 75 BPM felt pulse, tension 0–16 s then a hopeful release,
  instrumental, no vocals, hard stop at 30 s"
Generate 3, keep the one with the steadiest beat grid (inter-beat spread ≤ 3 %) and the arc that matches the storyboard.
Record provider, model id, prompt, seed and the account plan next to the file (for Content ID disputes).
Some providers return fixed-length clips (e.g. 30 s); the CLI loops on downbeats with short seams. Check the seam.

## Fit to the film

- Length: the bed must cover the film; loop only on downbeats (seam ≤ 40 ms crossfade), never mid-bar.
- Ending: a hard stop on a downbeat with its natural tail, or music out 1–2 s before the end for a silent close
  `[craft/02#silence-and-hard-stop]`. The shipped config fades out over 1.5 s (`audio.music.fadeOutS`): fine for
  product films; set it to 0 and cut on the downbeat for launch films.
- Rhythm break: in films > 20 s, gain 0 for 0.5–2 s once (e.g. the turn at 8–10 s of a 30 s film), then come back on
  a downbeat.
- Levels: the bed file sits at −14 LUFS (solo level); the film sets −22…−18 under VO through ducking (mix.md).

## Beat detection notes

- `npx launchfilm beats <file> --out <json> [--bpm <hint>]` returns BPM, beats and downbeats in seconds.
- Ambient or rubato beds often detect at double or half tempo: pass the felt BPM as `--bpm`.
- Downbeat phase matters more than BPM: cuts go on downbeats; verify 2–3 downbeats by ear-proxy (they should coincide
  with kick transients in a waveform still) or by the detector's downbeat list.
