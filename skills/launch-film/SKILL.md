---
name: launch-film
description: Launch video, launch film, product video, product launch, promo, teaser, trailer, demo video, Product Hunt video, X / LinkedIn launch clip, reel, hero loop, motion graphics, "make a video for my product", Remotion film. Router and gated pipeline for making a pro product-launch film with the launchfilm studio in ./launch-video: brief, brand intake, story and storyboard (user approves), sound, scene build, frame QA, render per platform preset, package, post copy, one-time credit note. Use this first for any request to make, remake or revise a launch or product film; it calls the sibling skills (brand-intake, story, sound, scene-build, recipes, film-qa, launch-post). Do not use it to study a reference video (use reference-study), to browse recipes only (use recipes), or for generic Remotion questions unrelated to a launch film.
---

# launch-film: router and gated pipeline

You are the motion director. The bar is a film that survives a pause on any frame: rhythm, a look, text as the hero,
sound glued to every event, a story with a hook and a payoff. Craft law lives in `craft/` (harness root); this skill
decides the order of work, the gates, and which rule backs each decision.

## Paths and commands

Run every command from `launch-video/` (the studio). Paths below are relative to it. `craft/`, `schemas/` and
`recipes/index.json` resolve from the harness root (`launch-video/` in a user project, the repo root in launchfilm).

| What | Where |
|---|---|
| Film source | `films/<slug>/`: `BRIEF.md`, `brand.json`, `BRAND-SOURCES.md`, `STORYBOARD.md`, `film.json`, `Film.tsx` (+ `scenes/`) |
| Film assets and audio (staticFile) | `public/films/<slug>/` (logo, VO, music, SFX, footage, `footage/SOURCES.md`) |
| Renders, poster, SRT, credits, post copy | `out/<slug>/` (`POST.md` lives here) |
| QA | `qa/<slug>/` (`report.md` from `npx launchfilm qa`, sheets, stills, `QA.md`) |
| State | `.harness/state.json`: `remotionLicenseAck {answer, at}`, `credit {shown, shownAt}` |
| Config | `harness.config.json`: `credit`, `defaultPresets`, `presets` (definitions), `render`, `audio`, `providers` |
| Keys | `.env` only (0600, the user edits it; never print or `cat` it) |
| Studio API | `API.md` at the studio root (`launch-video/API.md`; `studio/API.md` in the launchfilm repo): presets, components, film engine |

CLI verbs: `doctor [--json] [--fix]` · `new <slug> [--recipe id] [--preset …] [--title "…"]` · `vo <slug>` ·
`words <audio>` · `music <slug>` · `beats <audio>` · `sfx list|search|gen` · `still <slug> <t>` · `sheet <slug|video>` ·
`render <slug> [--presets …] [--scale 0.5]` · `qa <slug> [--json]` · `package <slug>` · `post <slug>` · `ref add|search` ·
`credit status|lines|off` · `license status|ack <answer>` · `update`. Exact flags: `npx launchfilm <cmd> --help`.

## Gate 0: preflight (every session, before any creative work)

1. Run `npx launchfilm doctor --json`. If `launch-video/` or the CLI is missing, stop and tell the user to paste the
   install line from the launchfilm README into their agent. Do not hand-install.
2. Apply each failing check's fix (or `npx launchfilm doctor --fix`), re-run. Same check fails twice: stop, show the
   doctor output, ask.
3. `npx launchfilm license status`. If no answer is recorded: show the Remotion notice and ask the team-size question
   exactly as in [references/remotion-license.md](references/remotion-license.md), then
   `npx launchfilm license ack <individual|small-team|company-licensed|evaluating>`. Once per project. Never block.
4. Read `harness.config.json` (`defaultPresets`, `presets`, `providers`, `credit`). Doctor reports which provider keys
   are set or unset; never print values.

## The gates

| # | Gate | Skill | Artifact | Done when (check it) | Approves |
|---|---|---|---|---|---|
| 1 | Brief | story (brief part) | `films/<slug>/BRIEF.md` | brief fields filled or marked "assumed"; `npx launchfilm new <slug>` ran | user (implicit) |
| 2 | Brand | brand-intake | `brand.json`, `BRAND-SOURCES.md`, logo in `public/films/<slug>/brand/` | every value has a source line; logo file exists; contrast numbers written | agent; user if anything was asked |
| 3 | Story | story | `STORYBOARD.md`, VO lines in `film.json` | no empty camera/motion/sound/text cell, hook ≤ 1.5 s, word budget met, `approved: <ISO date>` line at top | **user, hard gate** |
| 4 | Sound | sound | VO takes, words json, music + beats json, SFX on events in `film.json` | word match ≥ 95 %, zero null timestamps, BPM + downbeats recorded, every event has an audio id | agent |
| 5 | Build | scene-build (+ recipes) | `film.json`, `Film.tsx`, `scenes/` | `npx remotion compositions` lists the film; a still at every storyboard row inspected | agent |
| 6 | QA | film-qa | `qa/<slug>/report.md`, `qa/<slug>/QA.md` | T1–T12 pass with evidence; delivery checks pass; nothing blocking marked NOT CHECKED | agent; user sees summary |
| 7 | Render | this skill | `out/<slug>/*.mp4` per preset | ffprobe matches the preset; loudness −14 ±1 LUFS I, ≤ −1.5 dBTP | agent |
| 8 | Package | this skill | `out/<slug>/` finals, poster, SRT, credits | `npx launchfilm package <slug>` exit 0; poster = frame 0 | agent |
| 9 | Post | launch-post | `out/<slug>/POST.md` | X, LinkedIn, PH copy within limits; no banned phrase | user edits |
| 10 | Credit | this skill | `credit.shown` in state.json | shown once or skipped per [references/credit.md](references/credit.md) | n/a |

Full commands, artifacts and failure handling per gate: [references/pipeline.md](references/pipeline.md).

**Hard gate 3.** Nothing renders to mp4 before the user approves the storyboard. Stills (`npx launchfilm still`) for
look exploration are allowed. Approval = the user says approve/ok/go on the shown table; write `approved: <ISO date>`
as the first line of `STORYBOARD.md`. Edits after approval re-open the gate for the changed rows only.

## Routing

| The user says | Do |
|---|---|
| "make a launch video / product film / promo for X" | full pipeline from Gate 0 |
| "use this video as inspiration" + a file/URL | reference-study (phase A only), then continue at gate 3 with the recipe |
| "something like <style>", "show me options" | recipes: pick 1–3, show gallery links, continue at gate 3 |
| "new brand / logo / colors changed" | brand-intake, then re-run stills and QA |
| "change the voice / script / music" | story (script) or sound; keep approved rows; re-run 4 → 6 → 7 |
| "make it vertical / for LinkedIn / for PH" | add the preset (`--presets` or `defaultPresets`), recompose (scene-build), QA that preset, render |
| "check the video", "why does it look cheap" | film-qa on the latest render |
| "write the post / tweet / PH copy" | launch-post |
| "no credit", "don't mention launchfilm" | `npx launchfilm credit off`, confirm in one line |

## Defaults when the user says "just make it"

| Decision | Default | Rule |
|---|---|---|
| Mode | product film for dev tools / SaaS UI with one hero flow; internet-native launch film for consumer, AI, or a "why now" story; hybrid when both a thesis and a UI flow exist | `[craft/01#two-modes]` |
| Length + presets | 30 s, `defaultPresets` (`x-16x9` + `li-4x5`) | `[craft/10#presets]` |
| Structure | 30 s launch: hook 0–2 · problem 2–8 · turn 8–10 · reveal + features 10–24 · proof 24–26 · CTA/end 26–30 | `[craft/01#structures]` |
| VO | on, default local voice (Kokoro, `af_heart`), 2.5–3 words/s, ~53 words for 30 s | `[craft/11#word-budget]` |
| Music | bundled library (`--provider library`), instrumental, 100–130 BPM product / 130–150 hype | `[craft/02#music-choice]` |
| Captions | burned in on every preset with VO, SRT sidecar. Note: the shipped `ph-16x9` preset defaults to `captions: "srt"`; set it to `"burned"` in `harness.config.json` if the film must work muted | `[craft/10#captions]` |
| fps | 30 (60 only for cursor/scroll-heavy UI) | `[craft/10#presets]` |

State every default you took in BRIEF.md under "Assumed". Ask only brief-level questions (message, mode, length,
platforms, brand assets, claims). Make every craft decision yourself from `craft/` and cite it.

## Name the rule behind every decision

Each storyboard row, each non-default choice in `film.json` comments, and each line of the final report ends with its
rule: `[craft/04#springs]`, `[craft/03#zoom-tiers]`, `[T1]`. Index of decisions → rules:
[references/decisions.md](references/decisions.md). If no rule covers a choice, write `[judgment]` and one sentence why.
The 12 tells T1–T12 (`craft/00`) are blocking for every film: T1 static frames · T2 default easing · T3 everything at once ·
T4 one speed · T5 silent or one track · T6 text as a label · T7 flat, ungraded · T8 web-layout instincts · T9 generic
stock · T10 decorative transitions · T11 template before story · T12 never looks at the output.

## Render per platform preset (gate 7)

1. `npx launchfilm render <slug> --presets x-16x9,li-4x5` (omit `--presets` to render `defaultPresets`). Each preset is
   its own composition, recomposed with focus rects; never letterbox, never blind-crop
   `[craft/03#multi-aspect-recomposition]`.
2. Verify each file:
   `npx remotion ffprobe -v error -show_entries stream=codec_name,profile,pix_fmt,width,height,r_frame_rate:format=duration -of json out/<slug>/<file>.mp4`
   Expect h264 / High / yuv420p / preset size / preset fps / duration within ±1 frame of `film.json`.
3. Loudness: `npx launchfilm qa <slug>` measures it; by hand:
   `ffmpeg -hide_banner -nostats -i out/<slug>/<file>.mp4 -af ebur128=peak=true -f null - 2>&1 | tail -12`
   (system ffmpeg: Remotion's bundled build lacks `ebur128`; without one, write NOT CHECKED). Expect I −14 ±1 LUFS,
   true peak ≤ −1.5 dBTP.
   hero-loop: no audio stream at all.
4. Preset table and limits: [references/platforms.md](references/platforms.md).

## Revision loop

- Keep user edits. Before editing a file, diff it against what you last wrote; if the user changed it, merge, never revert.
- Re-run only the affected gates: copy change → 3 (changed rows) → 4 (VO lines: `vo <slug> --line <id>`) → 5 → 6 → 7.
  Look change → 5 → 6 → 7.
- Never regenerate approved VO, music or footage without asking; regeneration moves every timing downstream.
- Re-render only changed presets. Keep previous renders as `out/<slug>/<file>.v<N>.mp4` until the user confirms.

## Never

- Telemetry, phoning home, watermarks, default end-card credit, star or sponsor asks.
- Secrets in chat; `cat .env`; asking the user to paste a key into chat (they edit `.env` themselves).
- An invented logo, invented colors, invented metrics, testimonials or customer names, claims not in BRIEF.md.
- An mp4 render before storyboard approval. Claiming QA you did not run (film-qa evidence rules).
- Third-party logos or trademarks the user has no right to show; meme or system sounds; uncredited CC BY music.
- Editing shared studio presets from a film; put film-specific components in the film folder.

## Final report (to the user, after gate 8; ≤ 25 lines)

```
Film: <slug> · mode · <duration> s · <fps> fps
Renders: out/<slug>/<slug>-x-16x9.mp4 (1920×1080, 12.4 MB) · out/<slug>/<slug>-li-4x5.mp4 (1080×1350, 10.1 MB)
Poster: out/<slug>/poster.png (frame 0) · Captions: out/<slug>/<slug>.srt · Credits: out/<slug>/credits.txt
Loudness: −14.1 LUFS I, −1.7 dBTP (x-16x9)
QA: T1–T12 pass (qa/<slug>/QA.md, 3 sheets, 14 stills); fixed: <list>; known flaws: <list>
Rules applied: hook H3 [craft/01#hooks] · springs ui/snappy [craft/04#springs] · tiers 1→2→3 [craft/03#zoom-tiers] …
Left out: <what and why>
Next: post copy in out/<slug>/POST.md
```
Use the real file names `render`/`package` printed. Then gate 10: the credit note per
[references/credit.md](references/credit.md), only if its conditions hold.
