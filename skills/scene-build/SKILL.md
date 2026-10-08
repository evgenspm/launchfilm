---
name: scene-build
description: Build, animate or fix the scenes of a launch film or product video in the launchfilm Remotion studio. Use for "build the scenes", "animate this shot", "make the camera zoom to the button", "add a transition", "rebuild our UI in the video", "make the text move", "fix this shot", "the motion feels cheap", "add a 3D laptop", or any edit to film.json, Film.tsx or files under films/<slug>/scenes/. Covers film.json first, then TSX: camera and zoom tiers, named springs and easings, kinetic type, transitions, UI rebuilds and screen recordings, looks and grain, 3D devices, stills before renders, determinism and render cost. Requires an approved STORYBOARD.md and a brand.json. Use story for the script and storyboard, sound for VO, music and SFX, recipes to start from an existing recipe, film-qa to check a render, launch-film for the whole pipeline, reference-study to turn a reference video into a recipe.
---

# scene-build

You turn an approved storyboard into frames. Data first (`film.json`), code only where data can't express the shot.
Every craft decision you make names its rule: `craft/NN#anchor` or a tell id `T1`…`T12` (craft/00).

Paths: run commands from `launch-video/` (user project) or `studio/` (launchfilm repo). `<studio>` is that folder.
| What | Where (relative to `<studio>`) |
|---|---|
| Film source: BRIEF.md, brand.json, STORYBOARD.md, film.json, Film.tsx, scenes/ | `films/<slug>/` |
| Film assets and audio (`staticFile()` paths) | `public/films/<slug>/` |
| Renders | `out/<slug>/` |
| QA (report.md from the CLI, QA.md from film-qa, sheets, stills) | `qa/<slug>/` |
`craft/`, `schemas/` resolve from the harness root. Exact CLI flags: `npx launchfilm <cmd> --help`.

## 0. Read before you write (in this order)

1. `<studio>/API.md`: the studio's exports, the film engine, the `film.json` fields. If it is missing, read
   `<studio>/src/presets/index.ts` and `<studio>/src/components/` and use only what exists. Family presets
   (`list`, `notifications`, `brandmark`) may not be re-exported from the index: import them by file. Device and app frames
   are components (e.g. `MacWindow`, `BrowserFrame`, `PhoneFrame`, `Desktop`, `AIChat`, `Keycaps`); the film engine
   (`Film`, `Sound`, `Subtitles`, `FootageClip`, `EndCard`, `CreditCard`) lives in `src/film/`. Names are still moving:
   API.md wins.
2. `films/<slug>/STORYBOARD.md`: must say `approved:` (date + who). No approval → stop and hand back to `story`.
3. `films/<slug>/brand.json`: colours, fonts, logo, radius, theme. No brand.json → stop and hand back to `brand-intake`.
4. `schemas/film.schema.json` if present; audio artefacts from `sound` (words.json, beats.json) if the film has VO/music.
5. craft/00 (the 12 tells). Keep it open.

## 1. Build order

1. **Scaffold** if the film has no folder: `npx launchfilm new <slug> [--recipe <id>] [--preset x-16x9]`.
2. **film.json first.** One shot per storyboard row: `in/out` frames, beat label, camera, motion, transition out, text,
   sfx event. Snap every shot boundary to the beat grid (`beatFrame(n) = round(beats[n] × fps)`; never `n × framesPerBeat`)
   or to a VO word onset (craft/02#placement-on-the-grid). The engine derives subtitles, ducking, SFX and text timing from it.
3. **Scenes as components** in `films/<slug>/scenes/<NN>-<name>.tsx`, one per shot or per continuous camera move.
   Each takes `brand` from `useBrand()` and its timing from props, never from hardcoded frames copied out of film.json.
4. **Stills before renders.** For every shot: `npx launchfilm still <slug> <t> [--preset <id>]` at the shot midpoint and
   at every text onset + hold/2 (`<t>` as `2.5`, `2.5s` or `75f`), for every preset the film ships. Read each PNG. Fix,
   re-still. Only then render.
5. **Preview render** at half scale for motion: `npx launchfilm render <slug> --presets x-16x9 --scale 0.5`, then
   `npx launchfilm sheet <slug>`.
6. Hand off to `film-qa`. You are not done until QA.md exists and has no FAIL.

## 2. Rules (each one checkable)

| # | Rule | Check | Cite |
|---|---|---|---|
| 1 | Named springs and easings only: `springs.<name>`, `easings.<name>`. No inline `{stiffness, damping}`, no CSS `ease`/`ease-in-out` on entrances | grep G1 (below) returns nothing | craft/04#springs, T2 |
| 2 | Nothing static > 18 fr (600 ms): drift 1.00→1.03–1.05, a pan 1.1–3.1 px/fr, or internal motion | sheet: no two consecutive 4 fps cells identical except the end-card settle | craft/03#drift-and-push-in, T1 |
| 3 | Camera moves one zoom tier at a time, arrives 6 fr before the action, never during a layout morph, ≤ 3 punch-ins per 15 s | read camera keyframes; count | craft/03#zoom-tiers |
| 4 | Siblings stagger (chars 1, words 2–3, rows 3–4, cards 5–6 fr); group entrance ≤ 24 fr | read code; sheet | craft/04#stagger-and-overlap, T3 |
| 5 | Exits exist and are shorter than entrances (≤ 0.6×); overshoot on entrances only | read code | craft/04#entrances-and-exits |
| 6 | Hard cut by default; any other transition is spatial and named from the vocabulary | film.json `transition` values ⊂ vocabulary transitions | craft/09#default, T10 |
| 7 | Text holds ≥ 0.2 × (words + 1) s; ≤ 3 lines; one hierarchy level per shot | per text item: (out − in)/fps | craft/02#readability-holds, T6 |
| 8 | UI body text ≥ 26 px rendered on a 1080-high 16:9 frame (≥ 30 px on 1080-wide portrait) after camera scale | font px × camera scale | craft/03#readability-under-the-camera |
| 9 | Every visual event in film.json has an `sfx` (or is covered by VO/music hit) | count events without sound | craft/02#glue-rule, T5 |
| 10 | Deterministic: no `Math.random`, `Date.now`, `new Date()`, `setTimeout`, `setInterval`, CSS `transition`/`animation`/`@keyframes`, `requestAnimationFrame` loops; use `random(seed)` and `useCurrentFrame()` | grep G2 (below) returns nothing | craft/04#determinism |
| 11 | Fonts and assets loaded before measuring or rendering: `delayRender` until `document.fonts` / images / GLBs resolve | first frame of each text shot shows the brand font | craft/05#gotchas |
| 12 | Animate `transform` and `opacity`; never `width/height/top/left` per frame (except a FLIP you measured) | grep style props driven by frame | craft/04#entrances-and-exits |
| 13 | Frames are written at 30 fps and scaled: `Math.round(f × fps / 30)` | grep for hardcoded frame numbers outside film.json | craft/04#durations |
| 14 | Recompose per aspect with focus rects (`FocusCamera`/`useFocusCamera`); never letterbox, never crop blind | stills of every preset: nothing important within the safe-zone margins | craft/03#multi-aspect-recomposition, craft/10#safe-zones |
| 15 | Never edit shared presets/components from a film: copy into `films/<slug>/scenes/` and change the copy | `git diff --stat src/presets src/components` is empty | §5 below |
| 16 | Frame 0 is the poster: never black, never a blank fade-in; the hook's first state is visible | still at t=0 | craft/10#poster |

Greps (run from `<studio>`):
```bash
grep -rnE --include="*.ts*" "stiffness:|damping:|ease-in-out|'ease'" films/<slug>                               # G1
grep -rnE --include="*.ts*" "Math.random|Date.now|new Date\(|setTimeout|setInterval|transition:|animation:|@keyframes" films/<slug>   # G2
```

## 3. Topic references (load the one you need)

| Task | Read |
|---|---|
| Zoom tiers, drift, focus rects per aspect, cursor keyframes | [references/camera.md](references/camera.md) |
| Springs, easings, durations, stagger, entrances/exits code | [references/motion.md](references/motion.md) |
| Statements, mask-rise, word swap, VO typewriter, captions, fitText | [references/type.md](references/type.md) |
| Cuts on the beat, transitions and their duration math, j-cut | [references/transitions.md](references/transitions.md) |
| Rebuilding product UI in points, scripted events, screen recordings | [references/ui.md](references/ui.md) |
| Grade, grain, vignette, scrim, banding, clean product look | [references/look.md](references/look.md) |
| R3F devices, GL renderer, headless capture gotchas | [references/3d.md](references/3d.md) |

Family playbooks with measured numbers: `craft/families/{notifications,converge,list,screen,statement,brandmark}.md`.

## 4. Mode defaults (decide from BRIEF.md)

| | Product film | Internet-native launch film |
|---|---|---|
| Picture | UI rebuilt in React, real tokens | montage + hero type, product as payoff |
| Camera | one continuous spring camera, tiers 1→4 | drift on every shot, cuts on downbeats |
| Cuts | 0–2 per 15 s | 0.4–2 s shots |
| Look | clean: no grain on UI, soft shadows, hairlines | grain 0.08–0.15 + vignette 20–35 %, one grade per section |
| Type | product's own sizes; camera zooms, type does not grow | hero type 50–80 % of width, synced to VO/beat |
Hybrid: launch-film open, product-film middle, launch-film close. Cite craft/00#two-modes.

## 5. Working with the engine

- Prefer engine fields (shot `transition`, `sfx`, `text`, `camera`) over hand-placed Sequences: QA and the SFX
  auto-placement read film.json, not your TSX.
- Hand-written timing goes through the timing helpers (`sec`, `ms`, `stagger`, `beatGrid`, `wordsToFrames`).
- A scene that needs a new component: build it in `films/<slug>/scenes/` from the numbers in craft. If it is reusable,
  say so in your report; a curator promotes it to `src/components/` in a separate change.
- Recipes: when `<studio>/src/recipes/<id>/Recipe.tsx` exists it is parametrized by `brand` + `content`; reuse it as a
  scene instead of re-implementing. A text recipe (recipe.md only) leaves `TodoScene` placeholders in `Film.tsx`:
  replace each with a scene built from its row's motion, springs and frame counts (see the `recipes` skill,
  references/remix.md §4). `npx launchfilm qa` fails while one is left.

## 6. Render cost

| Cost driver | Budget | Fix when over |
|---|---|---|
| `backdrop-filter` (glass cards) | ≤ 8 on screen at once | fake glass: pre-blurred background copy |
| DOF copies / blur layers | ≤ 4 levels | drop `levels` to 3, blur only far/near |
| WebGL / R3F / motion blur (`Trail`, `CameraMotionBlur`) | `render_cost: heavy` | render those shots at concurrency 2, rest higher |
| Video footage | `OffthreadVideo` / `@remotion/media` `Video` only | never `<video>` tags |
Render concurrency: default; 2 for WebGL or when several renders share the machine.

## 7. Done when

- Every storyboard row exists in film.json with in/out on the grid, camera, motion, transition, text, sfx (no empty cells).
- Rules 1–16 hold (grep outputs empty, stills read).
- Stills for every shot and preset exist under `qa/<slug>/`, a sheet exists, and `film-qa` has run.
- Your report lists each craft decision with its rule, every deviation from the storyboard with the reason, and any
  component you had to build locally.
