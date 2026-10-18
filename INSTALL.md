# Install launchfilm

> For coding agents (Claude Code, Codex, Cursor, Gemini CLI, Copilot, OpenCode, Amp…). Makes this repo's agent a
> product-launch motion designer on Remotion. Version **v0.1.0**. Follow the steps in order; each one is safe to re-run.

**OBJECTIVE:** launchfilm skills installed in this repo, the studio in `./launch-video/`, the sample film rendered.

**DONE WHEN:** inside `launch-video/`, `npx launchfilm doctor --json` prints `"ok": true` **and** `launch-video/out/_sample.mp4`
exists (the installer renders it at half scale and checks it with ffprobe: 3.00 s, 960×540, 30 fps).

## Rules

- Work from the root of the user's repo (or an empty folder they chose). No `sudo`. Don't change files outside this repo.
- **Don't ask for API keys.** The default path is free: Kokoro voice, procedural CC0 SFX, CC0 / CC BY music, local
  whisper timings. Only when the user asks for a paid provider, name the variable they should add to `launch-video/.env`
  **themselves** (see `.env.example`). Never ask them to paste a key into chat. Never print, `cat` or summarise `.env`.
- If a step fails twice, stop and show the user the failing lines and the `npx launchfilm doctor` output.

## Steps

1. **Installing or retrying?** Run these steps in both cases. A version in `.harness/state.json` does not prove the
   previous install finished. The installer preserves your films, keys and config, and skips unchanged dependencies.
2. **Check the tools.** `node -v` must be ≥ 20 and `git --version` must work. If not, tell the user to install Node 20+
   from https://nodejs.org (and git), then stop.
3. **Fetch the pinned release** into a temporary folder. On a retry, reuse `.launchfilm-tmp` only after verifying
   its remote is this repository and its checked-out tag is `v0.1.0`; otherwise use a new temporary folder:
   ```bash
   git clone --depth 1 --branch v0.1.0 https://github.com/evgenspm/launchfilm .launchfilm-tmp
   ```
4. **Run the installer.** Delete the clone only if it exits successfully; keep it on failure for the retry:
   ```bash
   node .launchfilm-tmp/studio/scripts/install.mjs --target . && rm -rf .launchfilm-tmp
   ```
   In PowerShell, run the installer first, then `if ($LASTEXITCODE -eq 0) { Remove-Item -Recurse -Force .launchfilm-tmp }`.
   It prints one line per step and ends with `DONE` or `NOT DONE`. What it does:
   - copies the studio template to `./launch-video/`, with `craft/`, `schemas/`, the recipe catalog (`recipes/index.json`, `recipes/CATALOG.md`) and `API.md` inside it
     (the same relative paths the skills use). It never overwrites `films/`, `harness.config.json` or `.env`;
   - installs the skills as real files in `.agents/skills/<name>`, and `.claude/skills/<name>` as a relative link
     (a junction on Windows, a copy if links fail);
   - adds a marked block of 10 lines to `AGENTS.md` (created if missing), and to `CLAUDE.md` / `GEMINI.md` if they exist.
     Only the text between `<!-- launchfilm:begin` and `<!-- launchfilm:end -->` is ever rewritten;
   - creates `launch-video/.env` (mode 0600, every key empty);
   - runs `npm ci`, fetches the Kenney CC0 sound packs and the CC0 / CC BY music beds, runs `doctor --fix`, then renders
     `films/_sample` at half scale and probes it.

   Flags: `--skip-media` (offline; fetch later with `npm run fetch:media`), `--skip-render`, `--studio-dir <name>`, `--json`.
5. **Verify.** `cd launch-video && npx launchfilm doctor`. Apply each printed fix (`npx launchfilm doctor --fix` repairs
   `.claude/skills` links and downloads Chrome Headless Shell), then re-run until it says `ok`. `warn` lines are fine.
6. **Remotion licence (ask once).** Remotion is source-available: free for individuals and teams of up to 3 people
   (contractors count from Remotion 5.0); companies of 4 or more need a Company License (https://www.remotion.pro/license).
   Ask the user which applies and record it:
   `npx launchfilm license ack individual|small-team|company-licensed|evaluating`
7. **Report in five lines or fewer:** what was installed and where, how to start
   ("make a launch film for <product> from <url>": the `launch-film` skill takes it from there), that keys are optional,
   and the Remotion licence line from step 6 (once).

## Other routes (same skills, the studio still comes from step 4)

- Claude Code: `/plugin marketplace add evgenspm/launchfilm` then `/plugin install launchfilm@launchfilm`
- Codex / Copilot CLI: read `.claude-plugin/marketplace.json` from this repo; Cursor / Codex also read the root `plugin.json`
- Gemini CLI: `gemini extensions install https://github.com/evgenspm/launchfilm --ref v0.1.0`
- Any agent: `npx skills add evgenspm/launchfilm`

## Notes

- **No telemetry, no watermark.** One optional, text-only credit line is offered once per project after the first
  attended render; off with `LAUNCHFILM_NO_CREDIT=1`, `DO_NOT_TRACK=1`, `CI`, or `"credit": false` in `harness.config.json`.
- **Unattended pipelines:** set `LAUNCHFILM_BATCH=1`: no prompts, no credit, and a failing step writes `BLOCKED.md` into
  the film folder and exits non-zero.
- **Disk:** about 450 MB per studio (Remotion + Chrome Headless Shell) plus ~60 MB of fetched media. The Kokoro voice
  (~130 MB) and whisper model (~1.6 GB, or set `providers.words.whisper.model` to `small.en`) download on first use into
  the shared cache `~/.cache/launchfilm`.
- **ffmpeg:** Remotion's bundled ffmpeg is enough to make films. A full system ffmpeg (`brew install ffmpeg`,
  `sudo apt install ffmpeg`, `winget install Gyan.FFmpeg`) enables the freeze/black/cut QA checks.
