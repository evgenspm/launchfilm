# launchfilm

Your coding agent, working as a launch-film motion designer. Story, motion, voice, music, captions and per-platform
exports for product launches, built on Remotion. Open source (MIT), and the defaults need no API keys.

<!-- HERO VIDEO: drag the showcase mp4 (≤ 10 MB) into a GitHub issue, paste the user-attachments URL on the next line. -->
<!-- https://github.com/user-attachments/assets/REPLACE-WITH-HERO-ID -->
_Hero film coming with the first release. Meanwhile, see the gallery: [motion.eugenefounder.lol](https://motion.eugenefounder.lol)._

## Install: paste one line into your agent

```text
Fetch and follow https://raw.githubusercontent.com/evgenspm/launchfilm/v0.1.0/INSTALL.md
```

Run it from the root of your product's repo, so the agent can use your real components, colors and fonts. An empty folder
works too. It works in Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot, OpenCode and Amp.

The install puts the skills in `.agents/skills/` (linked into `.claude/skills/` for Claude Code), creates the studio in
`./launch-video/`, renders a 3-second sample to prove everything works, and asks for no keys. Running it again changes
nothing.

**Native routes** (these install the skills; the first time you ask for a film, the agent sets up `./launch-video/`
with the same INSTALL.md):

| Agent | Command |
|---|---|
| Claude Code | `/plugin marketplace add evgenspm/launchfilm` then `/plugin install launchfilm@launchfilm` |
| Codex | `codex plugin marketplace add evgenspm/launchfilm` |
| Gemini CLI | `gemini extensions install https://github.com/evgenspm/launchfilm --ref v0.1.0` |
| Anything that reads `.agents/skills` | `npx skills add evgenspm/launchfilm` |

Needs Node 20+ and git. A studio takes about 420 MB on disk (Remotion plus its headless Chrome). If something is
missing, `npx launchfilm doctor` from `launch-video/` says what and how to fix it.

## Then ask for a film

```text
Make a 30-second launch film for this product, for X and LinkedIn.
Make a 15-second product film of the onboarding flow, 4:5.
Study this video and turn it into a recipe: https://…
Write the X, LinkedIn and Product Hunt posts for the film.
```

The agent works through gates and shows you the storyboard before it builds anything:

brief → brand from your repo → storyboard you approve → voice, music, sound effects → scenes → frame-by-frame QA →
renders per platform → post copy.

## What you get

| Skill | What it does |
|---|---|
| `launch-film` | The director. Runs the pipeline, asks only for decisions that are yours, names the rule behind every craft call |
| `brand-intake` | Reads colors, fonts, radius and logo from your repo (Tailwind, CSS variables, shadcn tokens), then your site, then screenshots. Stops and asks rather than inventing a logo |
| `story` | Brief, hook, structure for 6/15/30/45/60/90 s, voice-over script at 2.5–3 words per second, storyboard table |
| `sound` | Voice-over, word timings, music on a beat grid, a sound effect on every visual event, mix at −14 LUFS |
| `scene-build` | Builds scenes from studio presets: named springs, zoom tiers, kinetic type, transitions, UI rebuilt in React |
| `recipes` | Searches the recipe library and remixes 1–3 recipes into your film |
| `reference-study` | Turns any video you like into a reusable recipe: measured beat sheet, techniques, then a working remake |
| `film-qa` | Contact sheets, stills at key timestamps, readability, contrast, safe zones, loudness, ffprobe. Reports only what it checked |
| `launch-post` | Post copy for X, LinkedIn and Product Hunt in a human voice |

Behind the skills:

- **Craft law with numbers** (`craft/`): 12 tells of amateur motion and their fixes, story structures, beat-grid math,
  springs with stiffness and damping, type sizes, transition frame counts, mix levels, QA checks.
- **A Remotion studio** (`launch-video/`): presets, components (windows, browser, phone, cursor, keycaps, prompt bar,
  notification stack, list, chart, counter, logo reveal, end card) and a film engine that turns `film.json` into
  scenes, voice, ducked music, sound effects and burned-in captions.
- **Recipes**: studied launch films rebuilt as parametrized compositions. Browse them with previews at
  [motion.eugenefounder.lol](https://motion.eugenefounder.lol).
- **Platform presets**, recomposed per aspect rather than cropped:

| Preset | Size | Length | Notes |
|---|---|---|---|
| `x-16x9` | 1920×1080 | 30–45 s | captions burned in, hook within 1.5 s |
| `li-4x5`, `li-1x1` | 1080×1350, 1080×1080 | 30–60 s | captions burned in, made for muted autoplay |
| `ph-16x9` | 1920×1080 | 60–90 s | voice and music, for the Product Hunt gallery (via YouTube) |
| `hero-loop` | 1920×1080 | 10–20 s | silent seamless loop for a site or README |
| `reel-9x16` | 1080×1920 | 15–30 s | platform safe zones, hook within 1 s |

Every render: H.264 High, yuv420p, AAC 48 kHz, faststart, master at −14 LUFS / −1.5 dBTP, poster = frame 0, `.srt` next to it.

## No keys by default

| Capability | Default: free, runs on your machine | Optional: your key in `launch-video/.env` |
|---|---|---|
| Voice-over | Kokoro-82M (voice `af_heart`) | ElevenLabs, Cartesia, Azure Speech, Gemini TTS, OpenAI TTS |
| Word timings | From the TTS when it returns them, else whisper.cpp aligned to your script | ElevenLabs Forced Alignment, Deepgram |
| Music | A CC0 and CC BY 4.0 library, downloaded at install, with beat grids and credit lines | Lyria, ElevenLabs Music (never committed to git), Stable Audio |
| Sound effects | Our procedural presets (whoosh, riser, click, pop, impact, ding, glitch), CC0 | ElevenLabs sound effects, Stable Audio, your own Freesound token |
| Footage and images | None: motion graphics, your UI, your screen recordings | Gemini, OpenAI (images), Runway, fal |
| Studying a reference video | Frame sheets, cut list and a local transcript, read by your own agent | Gemini video understanding |
| Fonts | Inter, Geist, Geist Mono, JetBrains Mono, Manrope, Unbounded (OFL, loaded offline) | Your brand font, if you hold the rights |

You edit `.env` yourself. The agent never asks you to paste a key into chat and never prints one; `doctor` only reports
whether each key is set. Some providers' free tiers forbid commercial use, and launchfilm warns before a final render
that would rely on one.

## Remotion license

launchfilm is MIT. Remotion, the engine that renders the films, is source-available under its own license: free for
individuals and for companies of up to 3 people (Remotion's newer terms count contractors). A larger company needs a
Remotion company license: [remotion.dev/license](https://www.remotion.dev/license). launchfilm installs Remotion from
npm, never bundles it, and mentions this once per project before your first film.

## No telemetry, no watermark

- launchfilm sends nothing about you or your films anywhere. Network calls go to npm and GitHub (install, plus at most
  one update check a day) and to the providers you configure yourself.
- Your films carry no watermark, logo or end card of ours.
- Once per project, after your first successful render, the agent says in one sentence who made launchfilm and offers
  credit lines you can paste if you post the film. You won't see it again in that project.
- To turn that off: run `npx launchfilm credit off` in `launch-video/`, set `"credit": false` in
  `launch-video/harness.config.json`, or set `LAUNCHFILM_NO_CREDIT=1`. launchfilm also
  skips it when `DO_NOT_TRACK` or `CI` is set.

## Made by

Eugene Li ([@evgenspm on X](https://x.com/evgenspm), [LinkedIn](https://linkedin.com/in/evgenspm)), cofounder of
[Sharpy](https://getsharpy.com).

## Credit, if you want to

Nothing is required. If you post your film and want to credit launchfilm, paste one of these:

```text
Made with launchfilm by @evgenspm
```

```text
Video made with launchfilm, an open-source kit by Eugene Li: github.com/evgenspm/launchfilm
```

Badge for your README:

```markdown
[![Made with launchfilm](https://img.shields.io/badge/made%20with-launchfilm-1C1915)](https://github.com/evgenspm/launchfilm)
```

To list your film in [SHOWCASE.md](SHOWCASE.md), open a pull request.

## Contributing and license

- Working on the harness itself (recipes, components, providers, craft): read [AGENTS.md](AGENTS.md).
- Code, skills and craft docs: MIT ([LICENSE](LICENSE)). Our sample media: CC BY 4.0. Fonts: SIL OFL 1.1.
- Third-party credits and prior art: [CREDITS.md](CREDITS.md).
