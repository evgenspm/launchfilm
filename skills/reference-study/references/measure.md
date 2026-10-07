# Measuring a reference: the rules behind steps A1–A11

All rules are deterministic: two agents given the same analysis dir must produce the same rows, labels and names.
Tools: the commands below need a system `ffmpeg` (Remotion's bundled build, `npx remotion ffmpeg`, lacks `tile`,
`rawvideo` output and `signalstats`). Without one: skip strips (keep ±0.25 s), omit `look.palette` (optional in the
schema), and write both in recipe.md `Measurement notes`. Never block a study on it.
F = reference fps (meta.json). "fr@30" = frames at 30 fps = round(seconds × 30).

## 1. Format (A1)

| meta.json | recipe.json |
|---|---|
| width/height within ±2 % of 16/9, 9/16, 1, 4/5 | `format.aspect` = that ratio, else `other` |
| fps | `format.fps` = nearest of 24, 25, 30, 50, 60 |
| duration | `format.duration_s` = 2 decimals |
| last sheet cell matches the first (same layout, same objects, positions within ~2 %) | `format.loopable: true` |

## 2. Cuts (A2)

- `cuts.json` holds cut times in seconds (objects with a time field or bare numbers: accept both). Sort, round to 2
  decimals, drop cuts < 0.05 s from the start or the end.
- Frame at the reference fps: round(t × F). Frame at 30 fps: round(t × 30).
- A "cut" whose frames before and after show the same composition with a brightness spike is a `flash`, not a new shot.
- Product films can have zero cuts: then rows come from the state changes in §4.

## 3. Reading sheets (A3)

- Sheet k (1-based) covers [4(k − 1), 4k) s. Cell index i (0–15, row-major) is at 4(k − 1) + 0.25 × i s.
  The burned-in timestamp wins over the formula.
- Resolution is 0.25 s (7.5 fr@30). Anything faster (entrances of 6–12 fr, staggers of 1–3 fr, overshoot) is not
  measurable from sheets alone.
- If the source file is available locally (meta.json path, or the batch says so), extract a 30 fps strip for the
  window you need (30 frames = 1 s, 6×5 grid; `mkdir -p <analysis>/strips` first):
  `ffmpeg -v error -ss <t> -t 1 -i <src> -vf "fps=30,scale=480:-2,tile=6x5" -frames:v 1 <analysis>/strips/strip-<t>.jpg`
  Never download the source to get one. Without a strip, write the 0.25 s resolution next to the number.
- For each cell write one line in your working list only when something changes: `t · what changed`.

## 4. Structure rows (A4)

1. Boundaries B = [0, cuts…, duration].
2. Montage merge: consecutive shots shorter than 6 fr@30 (0.2 s) merge into one row; `shot` says
   `montage: N cuts, avg X s`.
3. Long-shot split: a shot longer than 4 s is split at each visible state change from §3 (new text line, new element
   entering, camera direction or speed change, palette flip). Use the cell time of the change.
4. If more than 20 rows remain, merge consecutive rows with the same beat and the same main technique, keeping the count
   and the average length in `shot`.
5. Rows are contiguous and ordered: row[i].t1 = row[i+1].t0; first t0 = 0; last t1 = duration_s.

## 5. Beat labels (A5): first matching rule wins, top to bottom

| Rule | Beat |
|---|---|
| row starts at 0 | `hook` |
| the brand mark or wordmark is the subject | `logo` |
| a URL, "try/get/join/download"-type instruction, or a price is the subject | `cta` |
| rows after the last `logo`/`cta` row | `outro` |
| customer logos, quotes, ratings, user counts | `social-proof` |
| a number, chart, result or before/after that proves a claim | `proof` |
| the product (UI, device, name) appears for the first time | `reveal` |
| the product is shown doing one capability | `feature` |
| the pain, the old way, the broken state, before the product appears | `problem` |
| escalation: shots get faster, a crash, a silence, a rhythm break | `tension` |
| none of the above | the previous row's beat |

## 6. Per-row fields (A6)

- `shot`: what is on screen in our words, ≤ 120 chars. Text described by function and length, never quoted.
- `camera`: `static` (only if truly static), `drift 1.00→1.03` (scale or px/fr), vocabulary camera ids with numbers
  (`push-in 1.00→1.10 over 60 fr`), zoom tier names for UI films.
  Scale from sheets: width of the same object in the first and last cell of the row; % change ÷ row seconds = %/s.
  Pan: px moved ÷ frames, normalized to a 1920-wide frame.
- `motion`: entrances/exits with names and frames: `words blur-in, stagger 2 fr, easings.outExpo 12 fr (±0.25 s)`.
- `transition_out`: vocabulary transition id; `hard-cut` when nothing but a cut is visible.
- `sfx`: a vocabulary audio id for the row's main event (planned by the glue rule), else omit.

Spring naming (needs a 30 fps strip to see overshoot; from 4 fps sheets pick the no-overshoot name and add `(overshoot
not measurable)`). Overshoot % = (max extent − final) / (final − start).

| Observed | Name |
|---|---|
| no overshoot, settles ≤ 15 fr, UI or layout | `springs.ui` (`springs.layout` for containers growing) |
| no overshoot, settles > 24 fr, large object | `springs.heavy` |
| overshoot 5–12 %, text or logo | `springs.snappy` |
| overshoot 9–13 %, letters in a clip mask | `springs.maskRise` |
| overshoot 12–20 %, cards, badges | `springs.pop` |
| overshoot > 20 % | `springs.bouncy` |
| press squash ~10 % | `springs.click` |
| zoom in, ≤ 3 % overshoot | `springs.cameraIn` |
| zoom out, no overshoot | `springs.cameraOut` |
| deceleration only, fast start | `easings.outExpo` (softer: `outQuint`) |
| acceleration into an exit or zoom-through | `easings.inExpo` |
| constant velocity | `easings.linear` |
| slow-in slow-out camera | `easings.inOutSine` |

## 7. Audio (A7)

- `vo` = audio.json `has_vo`. VO lines from transcript.json are counted (words, words per second), never copied.
- `music.present` = bpm is a number and loudness is above −40 LUFS; `bpm` to 1 decimal.
- `cut_on_beat` = (cuts with a beat within ±2 fr@30) / (all cuts) ≥ 0.6. Write the ratio in recipe.md.
- `energy`: `high` if cuts per second ≥ 1 or bpm ≥ 130; `calm` if bpm < 100 and cuts per second < 0.3; `build` if the
  cut rate in the last third is ≥ 2× the first third; else `medium`.
- `genre`: only if unambiguous from audio.json or the brief; else null.
- `sfx[]`: `{event, sound}` for each recurring visual event, by craft/02#glue-rule. You cannot hear the reference:
  write in `notes` "sfx planned by the glue rule, not measured".

## 8. Look (A8)

- Theme: background luminance of the cut frames. Majority dark (L < 0.2) → `dark`; majority light (L > 0.6) → `light`;
  both present for ≥ 25 % of the runtime → `mixed`.
- Palette (≤ 6, `#RRGGBB` uppercase): on 3 cut frames (first, middle, last non-logo shot) run
  `ffmpeg -v error -i <analysis>/cuts/<n>.jpg -vf "palettegen=max_colors=6:reserve_transparent=0" -f rawvideo -pix_fmt rgb24 - | xxd -p -c 3 | awk '!s[$0]++'`
  Merge colours whose channels all differ by ≤ 8; order: background, foreground text, accent, then the rest.
- `type_style`: weight, case, tracking, size relative to frame height (`bold grotesk, sentence case, tight, 10 % H`).
- `treatment`: look ids you can see (`grain`, `vignette`, `glow`, `film-look`…). Grain is visible on flat areas of cut
  frames as noise; if unsure, leave it out.

## 9. Inputs, components, params (A10)

- `inputs`: what a user needs to make their version: `product_name`, `logo`, `tagline`, `lines` (number of on-screen
  copy lines or statements), `screenshots`, `screen_recording`, `ui_rebuild`, `stats` (number of figures), `url`.
- `components`: studio exports the rebuild will use, checked against `<studio>/API.md` (or the presets index).
- Missing components: anything the rebuild needs that the studio lacks; recipe.md lists each with a one-line spec
  (`OrbitRing: items on a tilted ring around a core, tilt 74–83°, 45°/s`). Not in recipe.json.
- `params`: Recipe.tsx props beyond brand, name → one-line description (`statements: 4 claims, ≤ 6 words each`).

## 10. Naming and classification (A11)

- `id`: kebab-case from family + main technique + one distinguishing word (`statement-blur-dark`, `notification-land-stack`).
  Check `<studio>/src/recipes/` for a clash; append `-2`, `-3`.
- `title` ≤ 60 chars, `summary` ≤ 240 chars (what the viewer sees and why it works), `use_when` ≤ 5, `tags` ≤ 12.
  None may contain the source brand, product, author or template name.
- `family`: the schema enum value that matches the dominant content: `kinetic-type` (text is the picture),
  `product-ui` (UI rebuild or recording), `ai-chat` (prompt/answer UI), `mobile-app` (phone-first),
  `logo-brand` (mark moments), `transitions` (the cut is the subject), `3d-device`, `data-stats` (charts, counters),
  `social-promo` (vertical, sticker/meme grammar), `launch-film` (full story with hook → payoff).
- `difficulty`: `easy` = ≤ 4 techniques (not counting look ids and `hard-cut`), no ui_rebuild, no 3D; `hard` = any 3D, WebGL shader, ui_rebuild of > 3 screens,
  or > 20 rows; else `medium`.
- `render_cost`: `heavy` = any `3d` id, `shader-bg`, `liquid-glass`, `motion-blur`, `depth-field`, `particle-form`;
  `medium` = glass cards (backdrop blur), `tilt-plane` with depth of field, `rack-focus`, `bloom`; else `light`.
