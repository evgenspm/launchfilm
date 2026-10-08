---
name: recipes
description: Find launchfilm recipes (published launch films studied frame by frame and written down as text, some with ready Remotion code) and build the user's film from 1 to 3 of them. Use for "use a template", "start from a recipe", "make a 30s launch film from recipe <id>", "something like this style", "show me options", "which recipe fits a 30 s vertical launch", "remix recipe X with our brand", or when a storyboard needs a proven hook, feature beat, logo reveal or end card. Searches recipes/CATALOG.md or recipes/index.json, scores and picks 1 to 3, shows each with its source link, reads the recipe.md beat sheet, then scaffolds with `npx launchfilm new <slug> --recipe <id>`: ready code when Recipe.tsx exists, else TODO scenes built from the beat sheet with studio presets, keeping the recipe's timings, springs and sounds re-timed to the user's length and beat grid. Use reference-study to make a new recipe, story for the storyboard, scene-build for scenes, launch-film for the whole pipeline.
---

# recipes

A recipe is one published launch film, studied and written down so an agent can rebuild its craft for another product.
It lives in `<studio>/src/recipes/<id>/`:

| File | Always | What it gives you |
|---|---|---|
| `recipe.md` | yes | when to use, the beat sheet (times, frames, picture, camera, motion, transition, sound), techniques linked to craft, what to adapt, pitfalls, missing components |
| `recipe.json` | yes | the same as data (schema `schemas/recipe.schema.json`): `structure[]`, `techniques`, `audio`, `inputs`, `components`, `source` |
| `Recipe.tsx` + `index.tsx` | only `status: "built"` | ready code: a component parametrized by `brand` + `content`, registered with a demo brand |

Most recipes are text only (`status: "studied"`), and that is enough to build from: you write the scenes from the beat
sheet with the studio's presets and components. A recipe never contains the source film, its frames or its copy; the
source link is how the user sees the reference.

Run commands from `launch-video/` (user) or `studio/` (launchfilm repo). `recipes/` and `schemas/` sit at the harness
root (`launch-video/` in a user project, the repo root in launchfilm).

## 1. Know what you need (from BRIEF.md / STORYBOARD.md)

Write down before searching: preset(s) (aspect), target duration, mode (product film / launch film / hybrid), theme
(dark/light from brand.json), VO yes/no, the beats you need covered (`hook`, `feature`, `logo`…), the inputs the user
actually has (logo, screenshots, a screen recording, a rebuildable UI, stats, a URL).

## 2. Search

Skim `recipes/CATALOG.md` (one line per recipe, grouped by family: format, top techniques, inputs, source, text/code),
or search:
```bash
npx launchfilm ref search "statement vertical dark"            # free text over title, summary, tags, techniques
npx launchfilm ref search "launch aspect:9:16 max:30 theme:dark" # filters: family: aspect: tech: theme: max: min: status:
```
Or filter `recipes/index.json` directly (fields: [references/index-format.md](references/index-format.md)):
```bash
node -e '
const idx=JSON.parse(require("fs").readFileSync("recipes/index.json","utf8")).recipes;
const want={aspect:"9:16",dur:30,techniques:["statement-sequence","end-card"],theme:"dark"};
for(const r of idx){const t=r.techniques.filter(x=>want.techniques.includes(x)).length;
 if(r.format.aspect===want.aspect||t>0) console.log(r.id,r.format.aspect,r.format.duration_s+"s",r.theme,r.vo?"vo":"-",t,r.code?"code":"text");}'
```
No index? Glob `src/recipes/*/recipe.json` and read them.

## 3. Score and pick 1–3

| Criterion | Points |
|---|---|
| `format.aspect` equals the main preset's aspect | +3 (recompose is possible but costs work) |
| `format.duration_s` within ±30 % of the target (or the recipe covers the beat you need) | +2 |
| each technique overlapping the storyboard's needs | +1 (max +4) |
| every `inputs` field it needs is something the user has | +2; any missing input that can't be made | −3 |
| `theme` matches brand.json `theme` | +1 |
| `vo` matches the plan | +1 |
| `code: true` (ready Recipe.tsx) when the user is in a hurry | +1; `status: "reviewed"` | +1 |
| `render_cost` heavy while the user is on a laptop or in a hurry | −1 |

Text vs code is a speed bonus, not a quality filter: a text recipe that fits the brief beats a coded one that doesn't.
Take the top 1 for a whole film, or up to 3 for different beats (hook from A, features from B, end card from C).

## 4. Show the picks

For each pick, show the user:
- **title** (`id`), and `text` or `code`;
- one line on why it fits their brief (aspect, length, the beat it covers, the inputs they have);
- the beat sheet in 3–6 short rows (`0–3.1 s hook: name blurs in word by word`…), summarised from recipe.md;
- the **source link** (`source.url`) so they can watch the original themselves. There are no hosted previews.

In an attended session let them choose. If they said "decide yourself", take the top score and say so in one line.

## 5. Read the recipe

Read the chosen `recipe.md` in full: the beat sheet, motion in frames and named springs, transitions, the sound on each
event, "What to adapt", "Pitfalls", "Missing components". Read `recipe.json` `structure[]`, `audio`, `inputs`,
`components`. These numbers are the craft you are reusing; the picture and copy will be the user's.

## 6. Scaffold

```bash
npx launchfilm new <slug> --recipe <id> --preset x-16x9 [--title "Product"] [--dry-run]
```
- **Recipe with code**: `films/<slug>/Film.tsx` gets one `recipe` scene that renders the recipe's component with its
  defaults; you change its `content` props (`recipe.json` `params`) and pass the brand.
- **Text recipe**: `film.json` gets one shot per beat-sheet row (the recipe's times, its transitions and SFX), and
  `Film.tsx` gets one `TodoScene` per shot with the row's picture, camera, motion and sound as comments. The CLI prints
  the list of TODOs. A TodoScene renders a labelled placeholder, and `npx launchfilm qa` fails (B1) while one is left.
- Both copy `recipe.md` to `films/<slug>/RECIPE.md` and pre-fill `STORYBOARD.md` with the recipe's rows.
- Combining recipes: scaffold from the one that owns the most runtime, then add the other recipes' rows as shots
  (their `Recipe` component as a scene when they have code, TODO scenes otherwise).

## 7. Build (details: [references/remix.md](references/remix.md))

1. Re-time the skeleton to the user's length and beat grid first (remix.md §3): keep beat order and proportions, snap
   every boundary to a downbeat or a VO phrase. Update `film.json` shots and the STORYBOARD rows; the user approves the
   storyboard (gate 3) before scenes are built.
2. Brand: brand.json into every scene through `useBrand()` (code recipes: the `brand` prop). Never edit the recipe folder.
3. Content: the user's product name, lines, stats and UI. Never the source film's copy or the demo brand's text.
4. Text recipe scenes: replace each `TodoScene` with a scene built from `src/presets` and `src/components` (read
   `API.md` first; the `scene-build` skill owns the rules). Use the components recipe.json lists; keep the row's named
   springs, frame counts, staggers and transition ids exactly; motion durations do not scale with the film length.
   A component the recipe lists under "Missing components" gets built in `films/<slug>/scenes/` from its spec.
5. Sound: every event in `audio.sfx` and each row's `sfx` keeps its sound at the new frame (glue rule, craft/02).
6. Stills at every shot before any render (scene-build step 4), then `film-qa`.

## Rules

- Recipes are starting points, not output: the film carries the user's story (STORYBOARD approved first).
- Nothing of the source goes into the film: no source copy, no source brand, no source footage. The source link is for
  the user to watch, and stays in `recipe.json` and your message, never in the film.
- Missing component → build it inside `films/<slug>/scenes/`, not in the recipe folder or shared presets.
- Record in STORYBOARD.md which recipe(s), which rows, the scale factor and params, so a re-run is reproducible.
