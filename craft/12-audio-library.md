# 12 · Audio library: music and SFX you can actually use

Sound is half of the film (T5) and most of the legal risk. This file says what is safe, how to pick and generate music,
where SFX come from, and how every file is recorded. Mix levels live in craft/02#mix. Engineering guidance, not legal
advice: licence terms change, verify before a launch.

## Traffic lights

| Light | Meaning | Sources |
|---|---|---|
| **GREEN** | use freely; may be shipped in the harness repo | CC0 / public domain (Kenney audio packs; OpenGameArt items marked CC0, checked per asset; Wikimedia Commons PD/CC0; Freesound items marked CC0, downloaded from the website and recorded) · procedural SFX from `launchfilm sfx gen` (our code, our output, CC0) · the 7 CC0 sounds in Remotion's SFX list (whoosh, whip, mouse click, two shutters, switch, page turn) · the user's own recordings and music they own · maintainer-generated beds from providers whose terms allow it (Stable Audio, local ACE-Step), dedicated CC0 |
| **YELLOW** | use with a credit or a condition; stays in the user's project | CC BY 4.0 music (Incompetech, Free Music Archive CC BY tracks, ccMixter "free for commercial use", Commons CC BY): credit in the description + `credits.txt` · runtime AI music and SFX with the user's own paid key (Lyria, ElevenLabs Music / SFX, Stable Audio): record provider, model, prompt, seed, plan; no vendor indemnifies music output · local models with conditional licences (e.g. a community licence capped by revenue: register as required) |
| **ORANGE** | link only: the user downloads manually; used inside the video; never committed, never redistributed, never fetched by a bot | Pixabay music and SFX · Mixkit · Uppbeat (free tier needs a credit) · YouTube Audio Library (YouTube use; elsewhere unclear) · Zapsplat (free tier needs a credit) · Sonniss bundles · Chosic (accept CC0 / CC BY tracks only) |
| **RED** | never | CC BY-SA, CC BY-ND and any NC music (syncing music to picture creates an adaptation under CC 4.0: ND is unusable, SA would force the whole film onto SA) · ElevenLabs music committed to any public repo or library (their terms prohibit music libraries and repositories) · Udio (no downloads, personal non-commercial) · Bensound free tier (bans use in video-generating tools) · Suno through unofficial wrappers · meme and system sounds (OS alerts, game sounds, TV jingles, viral clips; the 25 non-CC0 sounds in Remotion's list) · BBC Sound Effects (no commercial use) · commercial tracks, social-app library sounds, anything ripped from a video · macOS `say` output (Apple's licence forbids publishing it) · free-tier output from providers whose free plan is non-commercial (ElevenLabs Free, Cartesia Free, Fish Free) · output of NC-licensed model weights (MusicGen, AudioGen, MMAudio) · Freesound or Jamendo API downloads for commercial use without negotiated terms |

Check: every audio file in the render has a manifest entry (below) with a GREEN or YELLOW licence; ORANGE files have a
row with the download page URL and stay out of git (`git ls-files | grep -iE "\.(wav|mp3|ogg|m4a)$"` lists only GREEN files).

## Picking music

| Criterion | Rule | Check |
|---|---|---|
| Vocals | none under VO; instrumental only (wordless vocal pads compete too) | run the words step on the track: 0 recognised words |
| BPM | 100–130 product film · 130–150 trailer / hype · 80–95 founder story / calm | `npx launchfilm beats <audio>` |
| Grid quality | BPM stable (halves within ±1 BPM), beats regular | beats.json; ambient tracks give false BPM (measured: a drone bed read 160.7 BPM, felt pulse ~80): cut those to word timings, not the grid |
| Integer grid | when you can choose, BPM = 1800 / n at 30 fps (100, 112.5, 120, 128.57, 150) | craft/02#beat-grid |
| Energy curve | quiet under the hook → lift at the turn → peak under features → stop for the break → tail under the end card | short-term loudness per section (ebur128) |
| Clean intro | first downbeat ≤ 0.1 s (trim to it); no fade-in, it kills the hook | waveform or beats.json `beats[0]` |
| Length | ≥ film length, or loopable on downbeats | duration; loop seams |
| Arc | a track with a tension → release arc plays it once; never loop it | listen or sections' loudness |
| Density | sparse mids under VO; busy high-mid arpeggios need the full 9 dB duck | duck depth |
| Palette | warm acoustic / lo-fi with a film look; synth pulse with a clean dark product; piano / strings for a founder story | storyboard look column |

Looping: cut from the first to the last downbeat, crossfade seams 40 ms, so the beat stays regular. End with a hard stop on a
downbeat (final hit, tail ≤ 1.5 s) or take the music out 1–2 s before the end for a silent close (craft/02#silence-and-hard-stop).

## Generating music

Prompt pattern:
`<genre>, <BPM> BPM, <instrumentation>, <energy curve with times>, instrumental, no vocals, clean intro, hard stop at <n> s`

Examples (write your own per film):
- "minimal electronic pulse, 120 BPM, soft kick, round synth bass, glassy arpeggio, quiet for 4 s then builds until 20 s,
  drops out at 24 s, instrumental, no vocals, clean intro, hard stop at 30 s"
- "warm lo-fi, 85 BPM, dusty drums, electric piano, vinyl texture, steady, instrumental, no vocals, clean intro, hard stop at 45 s"
- "hybrid trailer, 140 BPM, big drums and distorted sub bass, sharp snares, risers into a drop at 18 s, silence at 26 s,
  instrumental, no vocals, hard stop at 30 s"

Procedure:
1. `npx launchfilm music <slug> --len 30 --bpm 120 --mood "minimal electronic pulse"` with `--provider library|lyria|elevenlabs|stable-audio`
   (default from harness.config.json). `library` (the free default) picks a bundled track (`--track <id>` to choose one);
   generating providers take `--prompt "..."` in the pattern above.
2. **Generate 3, keep 1:** best beat regularity, sections match the storyboard, 0 recognised words, clean first downbeat.
3. Providers that return fixed-length clips (e.g. 30 s) are looped on downbeats to the film length.
4. **Provenance:** write a JSON next to the track: provider, model id, prompt, seed, length, date, plan. Keep it for disputes.
5. Never commit generated music to the harness repo unless the provider's terms allow redistribution (never ElevenLabs).
   Some providers embed inaudible watermarks; that is expected.

## SFX sources

Order: (1) procedural preset → (2) bundled CC0 library → (3) the user's paid key (ElevenLabs SFX, Stable Audio: always pass a
duration) → (4) the user's own Freesound token with a CC0 filter.

| Preset | Length | Recipe | Vocabulary id |
|---|---|---|---|
| whoosh | 0.8 s | noise with a sweeping band, centroid ~1.3 → 4.0 → 1.2 kHz | `whoosh` (`swoosh-short`: trim to 0.3 s) |
| riser | 2 s | exponential saw chirp 110 → 880 Hz + rising noise, band-limited | `riser` |
| click | 60 ms | pitch-dropping sine + noise transient | `type-click`, `ui-confirm` |
| pop | 80 ms | 400 → 900 Hz upward blip, 2 ms attack | `pop`, `tick` |
| impact | 1.2 s | 150 → 40 Hz drop + noise burst, limited | `hit`, `impact-low`, `bass-drop` |
| ding | 1.5 s | high tone + harmonics, staggered decays | `notification`, `shimmer` |
| glitch | 0.4 s | FM saw, bit-crushed, 28 Hz tremolo | `glitch-sfx` |

- `npx launchfilm sfx gen whoosh [--out f.wav]` (`gen all` renders every preset) · `npx launchfilm sfx list` ·
  `npx launchfilm sfx search "camera shutter"` · AI SFX with the user's key: `sfx gen <name> --provider <p> --prompt "..."`.
- **Variants:** repeated events (typing, ticks, pops) rotate 3–5 different samples chosen with a seeded `random(seed + i)` and
  a ±2 dB level jitter. Never the same sample 10 times in a row.
- **Normalize every asset:** peak −3 dBFS, 48 kHz stereo WAV, silence trimmed at both ends so the transient sits at sample 0
  and frame placement is exact. Kenney packs ship as OGG: convert to WAV.
- **Pre-render, then place.** Generate WAVs ahead of time and place them with `<Audio>` + `staticFile`; never synthesize audio
  inside a composition.
- Gains and the event → sound map: craft/02#mix and craft/02#glue-rule.

## Manifest

Every bundled or added audio file has one entry. Library manifests: `<studio>/public/music/manifest.json` and
`<studio>/public/sfx/manifest.json` (exact location per studio/API.md). User-added files for one film use the same fields.

```json
{
  "id": "pulse-120",
  "file": "music/pulse-120.wav",
  "title": "Pulse 120",
  "author": "launchfilm maintainers",
  "source_url": "https://github.com/evgenspm/launchfilm",
  "license": "CC0-1.0",
  "license_url": "https://creativecommons.org/publicdomain/zero/1.0/",
  "modified": "looped to 60 s on downbeats; loudnorm -14 LUFS",
  "sha256": "<64 hex chars of the file as committed>",
  "bpm": 120
}
```

- `license`: an SPDX id where one exists (`CC0-1.0`, `CC-BY-4.0`), else `LicenseRef-own-generated` or `LicenseRef-user-owned`.
- `bpm` for music only. `sha256` changes when the file changes; regenerate the entry.
- No entry, no use. CI fails the harness build if a bundled file lacks an entry with `CC0-1.0` or `LicenseRef-own-generated`.

## Credits and Content ID

- **CC BY credit text** (post or video description, in the author's requested form when they give one):
  `"<Title>" by <Author> (<source URL>), licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)`.
  Some catalogues register tracks with Content ID and check the description, not an on-screen credit.
- `npx launchfilm package <slug>` writes `out/<slug>/credits.txt` with every YELLOW item (music, SFX, footage); the
  `launch-post` skill adds the music credit line to the post copy when the licence requires it.
- **Content ID risk, low → high:** own / procedural / CC0 → a platform's own audio library on that platform → CC BY with
  credit → stock libraries where individual contributors register tracks → AI music (no vendor addresses Content ID; keep
  the provenance JSON).
- On a claim: dispute with the licence page, the manifest entry and the provenance JSON or licence certificate.
