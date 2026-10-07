# Phase B: build the recipe and compare it with the reference

Precondition: phase A passed self-check items 1–22. Work only inside `<studio>/src/recipes/<id>/`. Renders go to
`<studio>/out/recipes/<id>/` (never committed). Exact CLI flags: `npx launchfilm <cmd> --help`.

## B0. The golden recipe

`<studio>/src/recipes/statement-sequence-launch/` is the pattern for file layout, props, the demo brand and the
Composition id. Read all its files first. **If it does not exist: batch → write `BLOCKED.md` ("golden recipe missing")
and stop; attended → tell the user and stop. Do not improvise a structure.**

## B1. Implement

| File | Content |
|---|---|
| `Recipe.tsx` | the film, parametrized: `brand` (brand.json shape) + one prop per `params` key in recipe.json; timing from `structure[]` (frames at 30 fps scaled by `fps / 30`) |
| `index.tsx` | registers the Composition exactly like the golden recipe (id convention, demo brand, `format` size, fps, duration) |
| new components | inside the recipe folder only (e.g. `OrbitRing.tsx`); list them in recipe.json `components` and remove them from `Missing components` |

Rules (scene-build applies in full):
- Named springs/easings from the studio presets; check
  `grep -rnE --include="*.tsx" "stiffness:|damping:|ease-in-out" <studio>/src/recipes/<id>` returns nothing.
- Determinism: `grep -rnE --include="*.tsx" "Math.random|Date.now|new Date\(|setTimeout|setInterval|@keyframes|animation:|transition:" <studio>/src/recipes/<id>` returns nothing.
- Demo content is our own fictional copy (the golden recipe's demo brand); never the reference's copy, logo or footage.
- Text, colours and fonts come from `brand`; no hardcoded hex except inside the demo brand.

## B2. Stills

`npx remotion compositions` must list the composition without errors. Then a still at every row midpoint:
```bash
npx remotion still <entry> <CompId> out/recipes/<id>/still-<row>.png --frame=<round((t0+t1)/2 × 30)>
```
(`<entry>` = the studio's Remotion entry, see `<studio>/API.md`.) Read each still next to the reference cell at the same
time: same subject, same layout, same type scale (±15 %), same palette roles.

## B3. Half-scale render and our sheet

```bash
npx remotion render <entry> <CompId> out/recipes/<id>/qa.mp4 --scale=0.5 --crf=28
npx launchfilm sheet out/recipes/<id>/qa.mp4 --every 0.25 --cols 4 --width 480
# fallback without the CLI (no timestamps; cell i of sheet k = 4(k−1) + 0.25 i s):
ffmpeg -v error -i out/recipes/<id>/qa.mp4 -vf "fps=4,scale=480:-2,tile=4x4" out/recipes/<id>/ours-%02d.jpg
```

## B4. Compare, row by row

Write this table into recipe.md (`## Build comparison`):

| Row | Reference t0–t1 | Ours t0–t1 | Δ boundary (fr@30) | Subject / layout match | Motion character match | Fix |
|---|---|---|---|---|---|---|

Pass conditions:
- Every boundary within ±3 fr of the reference (after scaling if the duration was changed on purpose).
- Shot count within ±25 % of the reference rows.
- Theme equal; palette roles equal (bg, text, accent); type weight and case equal.
- Motion character equal per row: the same entrance family (blur-in / mask / cut-in / slide), same camera direction,
  same transition id. Speed within one 4 fps cell of the reference.

## B5. Fix loop

At most 3 iterations of B1–B4. Fix the largest failure first. After 3, keep the best iteration and write the remaining
differences in recipe.md `Pitfalls` (batch) or report them (attended).

## B6. Final render and poster

```bash
npx remotion render <entry> <CompId> out/recipes/<id>/<id>.mp4 --crf=18
npx remotion still <entry> <CompId> out/recipes/<id>/<id>-poster.png --frame=0
npx remotion ffprobe -v error -show_entries format=duration -of csv=p=0 out/recipes/<id>/<id>.mp4
```
Poster = frame 0 and must not be black: if frame 0 is black, the recipe's first frame is wrong (craft/10#poster), fix it.

## B7. Gate and status

| Gate | Check |
|---|---|
| schema valid | ajv command prints `valid` |
| render exists | `out/recipes/<id>/<id>.mp4` exists, ffprobe reads it |
| duration | ffprobe duration ÷ `format.duration_s` within 0.8–1.2 |
| sheet exists | our sheet files exist |
All pass → set `status: "built"`, add `components` actually used, fill `preview` only with URLs the batch provides.
Any fail → keep `status: "studied"`, write `BLOCKED.md` with the failing gate and the measured value.
Run self-check items 23–32.
