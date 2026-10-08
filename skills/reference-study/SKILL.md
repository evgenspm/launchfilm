---
name: reference-study
description: Turn a reference video into a launchfilm recipe. Use for "study this video", "break down this launch film", "how did they make this", "make a recipe from this reference", "ref add", or the unattended reference batch. Phase A (study, the deliverable) reads the analysis directory from `npx launchfilm ref add <file|url>` (meta.json, 4 fps timestamped contact sheets, cuts.json + cut frames, audio.json, optional transcript.json) and writes recipe.md + recipe.json valid against schemas/recipe.schema.json: timings measured from timestamps, motion in frames and named springs, techniques only from craft/vocabulary.md, our own title, source link only. That text recipe is complete; an agent builds a film from it. Phase B is optional (only when ready code is wanted): Recipe.tsx imitating the golden recipe, checked with stills and a local sheet against the reference, status built. Mechanical: no guessing, no questions in batch mode. Use recipes to reuse a recipe, scene-build for a user's film, film-qa to check a render.
---

# reference-study

One reference video in, one text recipe out. The same procedure runs attended (a user shares a video) and unattended
(a batch of ~200 references). Output must be identical in quality in both: measured, mechanical, reproducible.

The deliverable is phase A: `recipe.md` + `recipe.json` with `status: "studied"`. It must be precise enough that an
agent who never saw the reference can rebuild the film from studio presets: every row's timing, motion in frames and
named springs, transition, sound. Phase B (ready `Recipe.tsx`) is optional and runs only when the task asks for code.
Nothing is rendered for publishing and nothing is uploaded: there are no hosted previews; the source link is what
people watch.

## Modes

- **Batch mode**: the task says "batch", or env `LAUNCHFILM_BATCH=1` or `CI` is set. Never ask a question. On any
  missing input or failed precondition write `BLOCKED.md` (what is missing, which step, the exact error) in the recipe
  folder (or the analysis dir if no id yet) and stop. Never download the source again; never copy, commit or publish the
  source video or its frames.
- **Attended mode**: same steps; where batch mode would block, tell the user what is missing and stop.

## Inputs (`<analysis>` = the directory `ref add` printed; batch: the dir the job names)

| File | Content | Required |
|---|---|---|
| `meta.json` | duration (s), fps, size (width, height), aspect; source URL if `ref add` got one | yes |
| `sheets/sheet-*.jpg` | 4×4 grids at 4 fps with burned-in timestamps: one sheet = 16 cells = 4 s | yes (≥ 1) |
| `cuts.json` + `cuts/*.jpg` | scene-change times (s) and a full frame at each cut | yes (may be an empty list) |
| `audio.json` | loudness (LUFS), bpm, beats (s), has_vo | yes |
| `transcript.json` | VO words with times | no |
Other files `ref add` writes (e.g. motion estimates) may be used as extra evidence; they never replace reading the sheets.
Also read: `schemas/recipe.schema.json`, `craft/vocabulary.md`, `craft/04-motion.md#springs` (names you may use).

## Outputs

`<studio>/src/recipes/<id>/recipe.md` and `recipe.json` (`status: "studied"`), unless the batch names another output
dir. Done when both validate and the self-check passes; then run `node scripts/build-index.mjs` (harness repo) so the
recipe shows up in `recipes/index.json` and `recipes/CATALOG.md`. Optional phase B adds `Recipe.tsx` + `index.tsx` and
sets `status: "built"`; its renders stay local in `out/recipes/<id>/` (gitignored) as QA evidence. Never write a
`preview` field unless the task gives you a URL of a render its author hosts.

## Hard rules

1. Times come from timestamps, cut times and beats: 2 decimals in seconds. Durations are frames, given at the reference
   fps AND at 30 fps. Never estimate a number you could measure; if a number is not measurable at the available
   resolution, write the resolution (`±0.25 s`) next to it.
2. Techniques, beat labels, transitions and SFX ids only from craft/vocabulary.md. A technique not in the vocabulary
   goes to the `Proposed terms` section of recipe.md and to `notes`; never invent an id in recipe.json.
3. Our own words everywhere: title, summary, id, tags never contain the source's brand, product, author or template
   name. Never quote the source's copy (VO or on-screen text): describe its function and length
   (`statement, 5 words, names the problem`).
4. Source = link only: `source.url` is the URL given to `ref add` (meta.json), never a local path. No URL → BLOCKED.
5. Motion is described with craft names: `springs.<name>` / `easings.<name>` + frames, never "smooth" or "snappy-ish".
6. One pass, in order; no step skipped. Every structure row is backed by sheet cells you read (cite the sheet and cell).
7. JSON must validate (step A13). A recipe that fails validation is not written as `studied`.

## Phase A: study (do the steps in order)

| Step | Do | Detail |
|---|---|---|
| A0 | Preflight: the four required inputs exist and parse; schema and vocabulary readable | else BLOCKED |
| A1 | `format` from meta.json: `aspect` ∈ 16:9 / 9:16 / 1:1 / 4:5 when width/height is within ±2 % of it, else `other`; `fps` = nearest of 24, 25, 30, 50, 60 (23.976→24, 29.97→30, 59.94→60); `duration_s` = duration to 2 decimals; `loopable` only if the last cell ≈ the first | [measure.md §1](references/measure.md) |
| A2 | Cut list from cuts.json, sorted; frame = round(t × fps). Open every `cuts/*.jpg` | [measure.md §2](references/measure.md) |
| A3 | Read every sheet in order. Cell time = sheet start + index × 0.25 s (sheet k starts at 4 × (k − 1) s); trust the burned-in timestamp if it differs. Keep a working list: time → what changed | [measure.md §3](references/measure.md) |
| A4 | Structure rows: boundaries = 0, every cut, duration. Merge runs of shots < 6 fr (at 30 fps) into one montage row. Split any shot > 4 s at each visible state change (new text, new element, camera direction change). Rows are contiguous: row[i].t1 = row[i+1].t0, last t1 = duration | [measure.md §4](references/measure.md) |
| A5 | Beat label per row with the deterministic rules | [measure.md §5](references/measure.md) |
| A6 | Per row: `shot` (what is on screen, our words), `camera`, `motion` (names + frames), `transition_out` (vocabulary id; `hard-cut` default), `sfx` (vocabulary audio id or empty) | [measure.md §6](references/measure.md) |
| A7 | `audio`: vo = has_vo; music.present, bpm (1 decimal), energy, genre (only if unambiguous, else null), cut_on_beat (share of cuts within ±2 fr of a beat ≥ 0.6); sfx[] = event → sound map by the glue rule (craft/02#glue-rule), marked "planned" in notes | [measure.md §7](references/measure.md) |
| A8 | `look`: theme from background luminance, palette ≤ 6 hex sampled from cut frames, type_style, treatment (look ids seen) | [measure.md §8](references/measure.md) |
| A9 | `techniques`: every vocabulary id visible in ≥ 1 row (cite rows in recipe.md); look and audio ids allowed | |
| A10 | `inputs`, `components` (studio exports the rebuild will use, verified in `<studio>/API.md`), `params`, missing components (recipe.md only) | [measure.md §9](references/measure.md) |
| A11 | `id`, `title`, `summary`, `use_when`, `tags`, `family`, `difficulty`, `render_cost` by the rules | [measure.md §10](references/measure.md) |
| A12 | Write recipe.md from [recipe-md-template.md](references/recipe-md-template.md) and recipe.json with `status: "studied"` | |
| A13 | Validate (the commands below must pass), then run [self-check.md](references/self-check.md) | |

Validation (run from the harness root). In the launchfilm repo the first command covers schema, vocabulary and sibling
files for every recipe, offline; the other two check one file anywhere:
```bash
node scripts/validate-recipes.mjs          # launchfilm repo: needs `npm ci --prefix studio`
npx -y -p ajv-cli@5 -p ajv-formats ajv validate --spec=draft2020 -c ajv-formats \
  -s schemas/recipe.schema.json -d <studio>/src/recipes/<id>/recipe.json
node -e '
const fs=require("fs");const voc=fs.readFileSync("craft/vocabulary.md","utf8");
const ids=new Set([...voc.matchAll(/`([a-z0-9]+(?:-[a-z0-9]+)*)`/g)].map(m=>m[1]));
const r=JSON.parse(fs.readFileSync(process.argv[1],"utf8"));
const used=[...r.techniques,...(r.audio.sfx||[]).map(s=>s.sound),...r.structure.map(s=>s.beat),
  ...r.structure.map(s=>s.transition_out).filter(Boolean),...r.structure.map(s=>s.sfx).filter(Boolean)];
const bad=used.filter(x=>!ids.has(x));if(bad.length){console.error("not in vocabulary:",[...new Set(bad)].join(", "));process.exit(1)}
console.log("vocabulary ok:",used.length,"ids")' <studio>/src/recipes/<id>/recipe.json
```
If neither the repo script nor `npx` can run, write `BLOCKED.md` (batch) instead of skipping validation.

Worked example of the whole of phase A: [references/worked-example.md](references/worked-example.md).

## Phase B: build (optional, only if you want ready code)

Skip it unless the task or the user asks for ready code. A studied recipe is complete without it. Only after phase A
passed. Steps, comparison method and gate: [references/build-phase.md](references/build-phase.md).
Summary: imitate the golden recipe `<studio>/src/recipes/statement-sequence-launch/` (missing → BLOCKED / tell the user;
never improvise a structure); implement `Recipe.tsx` (brand + content params) and `index.tsx` (Composition with the demo
brand) inside the recipe folder only; stills at every row midpoint; a local half-scale render and our sheet at 4 fps
4×4; compare row by row with the reference sheet; fix (≤ 3 iterations); `status: "built"`.
Gate: schema valid, composition lists, local render duration within ±20 % of the reference, our sheet exists. If the
gate fails, keep the code out (or delete it) and leave `status: "studied"`: the text recipe stands on its own.

## Report (≤ 15 lines, also appended to recipe.md `## Study log`)

id, family, duration and rows, techniques count, cut_on_beat, what could not be measured and at which resolution,
proposed terms, missing components, phase B result if it ran (iterations, gate values; else "phase B: not run") or
BLOCKED reason.
