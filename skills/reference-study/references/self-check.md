# Self-check before writing a status

Every item is PASS or FAIL. Any FAIL: fix and re-run the list. In batch mode, a FAIL you cannot fix becomes
`BLOCKED.md` (item number + reason) and the status is not written.

## Phase A (before `status: "studied"`)

1. recipe.json validates: the ajv command in SKILL.md prints `valid`.
2. Vocabulary check prints `vocabulary ok`: every `techniques[]`, `structure[].beat`, `structure[].transition_out`,
   `structure[].sfx` and `audio.sfx[].sound` id is in craft/vocabulary.md.
3. `id` is kebab-case, unique under `<studio>/src/recipes/`, and contains no source brand, product, author or template name.
4. `title` ≤ 60 chars, `summary` ≤ 240 chars; neither names the source nor quotes its copy.
5. `source.url` is an http(s) URL from meta.json or the batch job; no local path anywhere in recipe.json or recipe.md.
6. `format.aspect`, `fps`, `duration_s` match meta.json by the rules in measure.md §1.
7. `structure` rows are contiguous: first t0 = 0, each t1 = next t0, last t1 = duration_s (±0.05).
8. Every cut in cuts.json (except merged montage runs) is a row boundary.
9. Every row cites evidence in recipe.md (sheet + cells, cut frame).
10. Every row has `beat`, `shot`, `camera`, `motion`, `transition_out` filled; `camera` is not `static` unless no cell of
    the row shows any change in scale or position.
11. `motion` values use names from craft/04 (springs.* / easings.*) with frame counts; numbers below 0.25 s carry
    `(±0.25 s)` unless measured from a 30 fps strip.
12. `audio.vo` equals audio.json `has_vo`; `music.bpm` equals audio.json bpm (1 decimal); `cut_on_beat` follows the
    ≥ 0.6 rule and the ratio is written in recipe.md.
13. `look.palette` has 1–6 uppercase `#RRGGBB` values from the palettegen command; `theme` follows measure.md §8.
14. Each technique is visible in at least one row and listed in the Techniques table with its rows.
15. Unknown techniques appear only in recipe.md `Proposed terms`, never in recipe.json.
16. `inputs` reflect what a user must supply (lines counted, url/logo flags set).
17. `components` names exist in `<studio>/API.md` (or the presets/components index); anything else is in
    `Missing components` with a one-line spec.
18. `difficulty` and `render_cost` follow measure.md §10.
19. No quoted source copy anywhere: search recipe.md and recipe.json for every transcript phrase of ≥ 3 words; zero hits.
20. No em dash character in recipe.md.
21. recipe.md has every template section (none deleted; `none` where empty).
22. The Study log (≤ 15 lines) is appended.

## Phase B (before `status: "built"`)

23. The golden recipe exists and Recipe.tsx follows its file layout and prop pattern (brand + content params).
24. Only files inside the recipe folder changed (`git status --short` shows nothing else, renders excluded).
25. No inline spring configs or forbidden nondeterminism (grep commands in build-phase.md return nothing).
26. `npx remotion compositions` lists the recipe's composition without errors.
27. Stills exist for every row midpoint and were read.
28. Rendered duration is within ±20 % of the reference (`npx remotion ffprobe` duration ÷ `format.duration_s`).
29. Our sheet exists and the row-by-row comparison table is in recipe.md with every boundary within ±3 fr (after scaling)
    or a written reason.
30. Shot count within ±25 % of the reference's rows.
31. Final mp4 and poster (frame 0) exist; poster is not black.
32. `preview` fields are filled only with URLs the batch provided; otherwise omitted.
