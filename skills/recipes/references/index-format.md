# Recipe catalog format

Two generated files at the harness root, both built by `scripts/build-index.mjs` from every
`<studio>/src/recipes/*/recipe.json` (schema: `schemas/recipe.schema.json`). If they are missing or stale, read the
recipe.json files directly.

- `recipes/CATALOG.md`: for reading. Grouped by family; one line per recipe:
  `` `id` | title | aspect · length · theme · VO, music | top techniques | needs: inputs | source: [name](url) | text or code ``.
- `recipes/index.json`: for scripts. `{version, count, families[], recipes[]}`; each entry has the fields below.

| Field | Type | Use when choosing |
|---|---|---|
| `id` | kebab-case | `npx launchfilm new <slug> --recipe <id>`; never contains a source brand name |
| `title` | ≤ 60 chars | our own descriptive title |
| `summary` | ≤ 240 chars | what the viewer sees and why it works |
| `use_when` | ≤ 5 strings | situations it fits |
| `family` | enum | launch-film · product-ui · ai-chat · mobile-app · kinetic-type · logo-brand · transitions · social-promo · 3d-device · data-stats |
| `tags` | ≤ 12 kebab strings | free search terms |
| `techniques` | vocabulary ids | overlap with the storyboard's needs (craft/vocabulary.md) |
| `format` | `{aspect, duration_s, fps, loopable?}` | aspect ∈ 16:9, 9:16, 1:1, 4:5, other |
| `theme` | dark · light · mixed | from `look.theme` |
| `music` | `{bpm, energy}` or null | BPM band to keep |
| `vo` | boolean | the reference had a voice-over |
| `difficulty` | easy · medium · hard | effort to adapt |
| `render_cost` | light · medium · heavy | heavy = WebGL, 3D, motion blur |
| `inputs` | `{product_name, logo, tagline, lines, screenshots, screen_recording, ui_rebuild, stats, url}` | what the user must provide |
| `source` | `{name, url, author}` | the original; show `url` to the user so they can watch it |
| `status` | studied · built · reviewed | studied = text recipe (default, enough to build from); built = has a ready Recipe.tsx; reviewed = checked by a human |
| `code` | boolean | Recipe.tsx + index.tsx exist (scaffold renders it directly) |
| `preview` | `{video?, poster?, demo_brand?}`, optional | only when the recipe author linked their own render; usually absent |
| `path` | string | the recipe folder, relative to the harness repo |

The beat sheet itself (`structure[]`), `audio.sfx`, `look`, `components`, `params` and `notes` are in the recipe's own
`recipe.json`; read it once you have a shortlist.

Quick filters:
- Vertical social: `format.aspect == "9:16"` and `format.duration_s <= 30`.
- Statement-led launch: `techniques` contains `statement-sequence` or `word-per-cut`.
- Needs no product UI: `inputs.ui_rebuild != true` and `inputs.screen_recording != true` and `inputs.screenshots == 0`.
- Logo moments only: `family == "logo-brand"`.
- Ready code only: `code == true`.
