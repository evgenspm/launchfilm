---
name: recipes
description: Find and remix launchfilm recipes (studied reference films rebuilt as parametrized Remotion compositions) into the user's own launch video. Use for "use a template", "start from a recipe", "something like this style", "show me options", "make it look like the gallery one", "which recipe fits a 30 s vertical launch", "remix recipe X with our brand", or when a storyboard needs a proven structure for a hook, a feature beat, a logo reveal or an end card. Searches recipes/index.json by family, techniques, aspect, duration, theme and VO, picks 1 to 3 with a scoring rule, scaffolds with `npx launchfilm new <slug> --recipe <id>`, then maps brand.json and the user's copy into the recipe's params and re-times it to the new length and beat grid. Gallery of previews: https://motion.eugenefounder.lol. Use reference-study instead to turn a new video into a recipe, story to write the storyboard, scene-build to write new scenes, launch-film for the whole pipeline.
---

# recipes

A recipe = one studied reference rebuilt as code: `<studio>/src/recipes/<id>/` with `recipe.md` (when to use, beat sheet,
pitfalls), `recipe.json` (schema: `schemas/recipe.schema.json`), `Recipe.tsx` (parametrized by `brand` + `content`),
`index.tsx` (Composition with a demo brand). The recipe in the repo is the truth; the gallery
(https://motion.eugenefounder.lol) is a preview to show the user.

Run commands from `launch-video/` (user) or `studio/` (launchfilm repo).

## 1. Know what you need (from BRIEF.md / STORYBOARD.md)

Write down before searching: preset(s) (aspect), target duration, mode (product film / launch film / hybrid), theme
(dark/light from brand.json), VO yes/no, the beats you need covered (`hook`, `feature`, `logo`…), the inputs the user
actually has (logo, screenshots, a screen recording, a rebuildable UI, stats, a URL).

## 2. Search

```bash
npx launchfilm ref search "statement vertical dark"          # free-text over title, summary, tags, techniques
```
Or filter the index directly (`recipes/index.json`; if absent, glob the recipe.json files):
```bash
node -e '
const fs=require("fs"),path=require("path");
const idx=fs.existsSync("recipes/index.json")?JSON.parse(fs.readFileSync("recipes/index.json","utf8")):
  fs.readdirSync("src/recipes").map(d=>path.join("src/recipes",d,"recipe.json")).filter(fs.existsSync).map(f=>JSON.parse(fs.readFileSync(f,"utf8")));
const list=Array.isArray(idx)?idx:idx.recipes;
const want={aspect:"9:16",dur:30,techniques:["statement-sequence","end-card"],theme:"dark"};
for(const r of list){const t=r.techniques.filter(x=>want.techniques.includes(x)).length;
 if(r.format.aspect===want.aspect||t>0) console.log(r.id,r.format.aspect,r.format.duration_s+"s",r.look.theme,r.audio.vo?"vo":"-",t,r.status||"");}'
```
Field reference: [references/index-format.md](references/index-format.md).

## 3. Score and pick 1–3

| Criterion | Points |
|---|---|
| `format.aspect` equals the main preset's aspect | +3 (recompose is possible but costs work) |
| `format.duration_s` within ±30 % of the target (or the recipe covers the beat you need) | +2 |
| each technique overlapping the storyboard's needs | +1 (max +4) |
| every `inputs` field it needs is something the user has | +2; any missing input that can't be made | −3 |
| `look.theme` matches brand.json `theme` | +1 |
| `audio.vo` matches the plan | +1 |
| `status` = `reviewed` / `built` / `studied` | +2 / +1 / −2 (studied = no Recipe.tsx yet) |
| `render_cost` heavy while the user is on a laptop or in a hurry | −1 |
Take the top 1 for a whole film, or up to 3 for different beats (hook from A, features from B, end card from C).
Show the user the picks with their gallery preview links and one line each on why. In an attended session, let them
choose; if they said "decide yourself", take the top score and say so.

## 4. Scaffold

```bash
npx launchfilm new <slug> --recipe <id> --preset x-16x9
```
This creates `films/<slug>/` wired to the recipe. For combinations, scaffold from the recipe that owns the most runtime
and import the others' `Recipe` components as scenes for their beats.

## 5. Remix (details: [references/remix.md](references/remix.md))

1. Map brand.json into the recipe's `brand` prop (colours, fonts, logo, radius, theme). Never edit the recipe folder.
2. Map the user's content into the recipe's `params` (see `recipe.json` `params`): their copy, their product name, their
   UI. Never reuse the source film's copy or the demo brand's text.
3. Keep the timing skeleton (beat order and proportions), rescale it to the new duration, re-snap every boundary to the
   new beat grid or VO word onsets.
4. One look across combined recipes: the main recipe's treatment wins.
5. Re-check the glue rule: every event the recipe lists in `audio.sfx` keeps its sound after re-timing.
6. Stills before render (scene-build step 4), then `film-qa`.

## Rules

- Recipes are starting points, not output: the film must carry the user's story (STORYBOARD approved first).
- Nothing of the source goes into the film: no source copy, no source brand, no source footage; the source link lives
  only in `recipe.json`.
- Missing component → build it inside `films/<slug>/scenes/`, not in the recipe folder or shared presets.
- Record in STORYBOARD.md which recipe(s) and params were used, so a re-run is reproducible.
