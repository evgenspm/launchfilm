# Recipe index format

`recipes/index.json` is generated from every `<studio>/src/recipes/*/recipe.json` (schema: `schemas/recipe.schema.json`).
The gallery site reads the same file. Treat it as an array of recipe objects (or `{recipes: [...]}`); every entry has the
fields below. If the index is missing or stale, read the recipe.json files directly.

| Field | Type | Use when choosing |
|---|---|---|
| `id` | kebab-case | `npx launchfilm new <slug> --recipe <id>`; never contains a source brand name |
| `title` | ≤ 60 chars | our own descriptive title |
| `summary` | ≤ 240 chars | what the viewer sees and why it works |
| `use_when` | ≤ 5 strings | situations it fits |
| `source` | `{name, url, author?, author_url?, ref_id?}` | link to the original only; `name` from the schema's enum (`own` = our own film, `other` = anything not in the enum) |
| `family` | enum | launch-film · product-ui · ai-chat · mobile-app · kinetic-type · logo-brand · transitions · social-promo · 3d-device · data-stats |
| `tags` | ≤ 12 kebab strings | free search terms |
| `techniques` | vocabulary ids | overlap with the storyboard's needs (craft/vocabulary.md) |
| `format` | `{aspect, duration_s, fps, loopable?}` | aspect ∈ 16:9, 9:16, 1:1, 4:5, other |
| `look` | `{theme, palette?, type_style?, treatment?}` | theme ∈ dark, light, mixed |
| `audio` | `{vo, music{present, bpm, energy, genre, cut_on_beat}, sfx[{event, sound}]}` | VO plan, BPM band, the glue map |
| `structure` | `[{t0, t1, beat, shot, camera?, motion?, transition_out?, sfx?}]` | the timing skeleton you rescale |
| `inputs` | `{product_name, logo, tagline, lines, screenshots, screen_recording, ui_rebuild, stats, url}` | what the user must provide |
| `components` | strings | studio exports Recipe.tsx uses |
| `params` | object | Recipe.tsx props beyond brand: name → description (remix without reading code) |
| `difficulty` | easy · medium · hard | effort to adapt |
| `render_cost` | light · medium · heavy | heavy = WebGL, 3D, motion blur |
| `notes` | string | pitfalls, measured numbers |
| `preview` | `{video, poster, demo_brand}` | gallery media URLs |
| `status` | studied · built · reviewed | studied = analysis only, no Recipe.tsx |

Quick filters:
- Vertical social: `format.aspect == "9:16"` and `format.duration_s <= 30`.
- Statement-led launch: `techniques` contains `statement-sequence` or `word-per-cut`.
- Needs no product UI: `inputs.ui_rebuild != true` and `inputs.screen_recording != true` and `inputs.screenshots == 0`.
- Logo moments only: `family == "logo-brand"`.
