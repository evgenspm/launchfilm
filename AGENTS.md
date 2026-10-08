# AGENTS.md: working on launchfilm itself

This file is for agents and people changing the harness. Users of launchfilm never read it: their agent loads the
skills in `skills/` and the studio copied into their `launch-video/`. If you are making a film, use the `launch-film`
skill instead of this file.

launchfilm = Agent Skills + craft law with numbers + a Remotion studio template + a CLI, so any coding agent can make
a product-launch film at a pro bar: rhythm, a look, text as hero, sound glued to every event, a story with a hook and a
payoff, and frame QA before shipping. MIT. Remotion is a dependency under its own license, never vendored.

## Repo map

| Path | What | Ships to users as |
|---|---|---|
| `skills/<name>/` | The behavior. `SKILL.md` + `references/*.md` + `LICENSE.txt`. Single source of truth | `.agents/skills/<name>/` (+ `.claude/skills/<name>` link or copy) |
| `craft/` | The law: `00`–`13` numbered docs, `families/*.md`, `vocabulary.md` (closed technique list) | `launch-video/craft/` |
| `schemas/` | `recipe.schema.json`, `film.schema.json`, `brand.schema.json` | `launch-video/schemas/` |
| `studio/` | Remotion project template: `src/presets`, `src/components`, `src/film` (film engine), `src/recipes/<id>/`, `films/_sample`, `public/{fonts,sfx,music}`, `scripts/` | `launch-video/` |
| `studio/API.md` | Exports of presets, components and the film engine. Skills tell agents to read it first | `launch-video/API.md` |
| `studio/cli/` | `launchfilm` CLI (one verb per pipeline step) and provider adapters in `studio/cli/providers/` | `launch-video/cli/`, run as `npx launchfilm …` |
| `recipes/index.json`, `recipes/CATALOG.md` | Catalog generated from `studio/src/recipes/*/recipe.json` by `scripts/build-index.mjs`: JSON for scripts and `ref search`, Markdown (one line per recipe, by family) for people and agents | `launch-video/recipes/` |
| `examples/` | 2–3 films of fictional products, as code | not installed |
| `INSTALL.md`, `UPDATE.md` | Agent-executable install and update, pinned to a tag | fetched by URL |
| `.claude-plugin/`, `plugin.json`, `gemini-extension.json` | Thin manifests pointing at `./skills/` | plugin installs |
| `README.md`, `CREDITS.md`, `SHOWCASE.md`, `llms.txt` | People-facing docs, attributions, showcase, docs index | repo only |
| `CLAUDE.md`, `GEMINI.md` | One import line each: they load this file | repo only |

Ownership is by folder. A change that crosses folders (a new component a skill teaches, a CLI flag a skill calls) lands
in one PR that updates both sides.

## Rules (all of them are checked in review)

**Privacy and hygiene**
1. No absolute home-directory paths, cloud project ids, internal hostnames, emails, or names of private people in any
   tracked file. No secrets anywhere; keys live only in the user's `launch-video/.env`.
2. No third-party media in git: no reference videos, no frames of them, no brand logos you don't own, no stock files
   whose license forbids redistribution (craft/12#traffic-lights). Reference videos are linked by URL, never committed.
3. Never paste other people's copy (taglines, VO lines, UI strings of real products) into docs, recipes or examples.
   Examples use fictional products (`Acme Ledger`, `Acme Inbox`, `Acme Deploy`, `Acme Notes`) and our own lines.
4. Recipe ids, titles, summaries and tags never contain the source's brand or product name. `source.url` carries the link.
5. Repo stays under ~20 MB. No Git LFS (skill installers deliver pointer files). Demo MP4s go to GitHub Release assets.
   We don't pre-render or host recipe previews: a recipe is text, and its source link is what people watch. Skill
   folders are text only.

**Licensing**
6. Code, skills and craft: MIT. Every skill folder carries its own `LICENSE.txt` (installers copy only the folder).
   Our own media: CC BY 4.0 (or CC0). Fonts: OFL only, with `OFL.txt` next to the files. Map globs in `REUSE.toml`.
7. Depend on `remotion` and `@remotion/*` from npm, pinned exactly, all on the same version. Never vendor Remotion source
   or `remotion-dev/skills` (no license file): link and install them instead.
8. Bundled SFX and music: only CC0, our own procedural output, or CC BY 4.0 with a manifest entry and credit line.
   Never commit ElevenLabs music output. No meme, system or app sounds. See craft/12.

**Behavior we promise users**
9. No telemetry. No watermark. No end card or credit inside a user's film unless they opt in (`CreditCard`, off by default).
10. The credit note is shown once per project, after the first attended render, per
    `skills/launch-film/references/credit.md` and `npx launchfilm credit` (state `credit.shown`). Opt-outs:
    `"credit": false` (or `npx launchfilm credit off`), `LAUNCHFILM_NO_CREDIT`, `DO_NOT_TRACK`, `CI`.
11. The Remotion license notice is shown once per project (`npx launchfilm license ack <answer>` writes
    `remotionLicenseAck` in `.harness/state.json`). It never blocks a render.
12. Zero-key defaults must keep working end to end: Kokoro TTS, whisper.cpp timings, bundled CC0/CC BY music,
    procedural SFX, no generated footage. A paid provider is always optional.
13. No network calls in scripts beyond npm, GitHub, and the provider a user explicitly configured. No `sudo`.

**Craft and docs**
14. Numbers beat adjectives: frames, ms, px, LUFS, words/s. Every rule must say how to check it.
15. `craft/vocabulary.md` is a closed list. Recipes tag `techniques[]` and `audio.sfx[].sound` only from it. Add a term by
    PR to that file first; never rename or remove an id (recipes, the catalog and `ref search` filter on them).
16. Skills cite craft by stable H2 anchors (`craft/04#springs`) and the tells by id (`T1`…`T12`). Renaming an H2 in a
    craft file breaks citations: grep `skills/` and fix every hit in the same PR.
17. No em dash character (U+2014) in craft, skills or root docs. The only exception is the `id`, dash, definition format
    of `craft/vocabulary.md`.
    Launch copy and post templates follow the banned list in craft/11#banned-phrases.
18. Skill frontmatter is spec-only: `name` (equals the folder name, `a-z0-9-`) and `description` (≤ 1024 chars, trigger
    phrases first). Body ≤ 400 lines; detail goes to `references/*.md`, one level deep, linked by relative path.
19. Craft docs are generic. Studio-specific prop names belong in `studio/API.md`; craft names the technique and its numbers.

**Studio code**
20. Frame-driven and deterministic: no `Math.random` (use `random(seed)`), no `Date.now`, no timers, no CSS
    transitions or animations. `delayRender` until fonts and assets load.
21. Named springs and easings only (`studio/src/presets`). No inline `{stiffness, damping}` and no `ease-in-out` in
    components or recipes.
22. Presets and components take a theme from `brand.json`; they never import a brand. Sizes come from `useVideoConfig()`,
    never a hardcoded 1920×1080.
23. A recipe touches only `studio/src/recipes/<id>/`. A new component it needs lives inside that folder until a curator
    promotes it to `src/components/` with docs in `studio/API.md`.

## How to add a recipe

A recipe is text first: `studio/src/recipes/<id>/recipe.md` (beat sheet, techniques, what to adapt, pitfalls) and
`recipe.json` (schema `schemas/recipe.schema.json`), status `studied`. That is the deliverable, and a user's agent
builds a film from it on top of the studio presets and components. Ready code is optional.

1. Study the reference with the `reference-study` skill: `npx launchfilm ref add <file|url>` produces the analysis dir;
   phase A writes `recipe.md` + `recipe.json` (status `studied`) into `studio/src/recipes/<id>/`.
2. Optional, only if you want ready code: phase B adds `Recipe.tsx` (parametrized by `brand` + content props) and
   `index.tsx` (a `<Composition>` with a demo brand), imitating `studio/src/recipes/statement-sequence-launch/`, checks
   it with stills and a local half-scale render against the reference sheet, and sets status `built`. Renders stay
   local in `out/` (gitignored); nothing is uploaded.
3. Validate (commands below): `node scripts/validate-recipes.mjs` (schema, vocabulary ids, recipe.md present, code files
   only as a pair and required for `built`); for `built` also typecheck and `npx remotion compositions`.
4. Regenerate the catalog, `node scripts/build-index.mjs` (writes `recipes/index.json` + `recipes/CATALOG.md`), and
   commit both with the recipe. CI runs `--check`.
5. PR checklist: no source brand in id/title/tags, no source copy, no committed source media, `source.url` set, render
   cost stated.

## How to add a component or preset

1. `studio/src/components/<Name>.tsx` (or `src/presets/<area>.ts`). Props: content, `theme` (from brand), frame inputs
   (`at`, `startFrame`), sizes relative to `useVideoConfig()`.
2. Motion from named springs/easings; sound cues exported as frame lists so the film engine can glue SFX (craft/02#glue-rule).
3. A demo composition and one golden still. Document the props in `studio/API.md`.
4. If it implements a new technique, add the vocabulary id first (rule 15) and teach it in the right craft file.

## How to add a provider

1. An adapter in `studio/cli/providers/` registered in its registry, implementing the capability interface. The model id
   is configurable in `harness.config.json` (`providers`); never hardcode a preview id (they are retired within months).
2. Key name goes into `studio/.env.example`; `doctor` reports set or unset, never the value.
3. Record terms that matter in CREDITS.md or the provider doc: commercial use, free-tier limits, whether outputs may be
   redistributed, training on inputs. Warn on free tiers that forbid commercial use before a final render.
4. The zero-key path stays the default. Add the provider to the README table.

## How to change craft or skills

- Keep the H2 headings listed at the top of each craft file stable (rule 16).
- A changed number in craft must be changed everywhere it is quoted: `grep -rn "<old number>" craft skills`.
- When you add a craft rule, add its check to `craft/08-qa-checklist.md` or to the `film-qa` skill.
- Run the checks below before opening the PR.

## Validation commands

Run from the repo root. Commands marked (planned) depend on files other parts of the repo add.

```bash
# studio: install, typecheck, every composition bundles
npm --prefix studio ci
npm --prefix studio run typecheck
(cd studio && npx remotion compositions)

# skills: spec-only frontmatter, name == folder, description <= 1024 chars, body <= 400 lines, LICENSE.txt present
node --input-type=module <<'EOF'
import fs from 'node:fs'; import path from 'node:path';
let bad = 0; const fail = (...m) => { console.log('FAIL', ...m); bad++; };
for (const d of fs.readdirSync('skills')) {
  const dir = path.join('skills', d), f = path.join(dir, 'SKILL.md');
  if (!fs.existsSync(f)) { fail(d, 'no SKILL.md'); continue; }
  if (!fs.existsSync(path.join(dir, 'LICENSE.txt'))) fail(d, 'no LICENSE.txt');
  const s = fs.readFileSync(f, 'utf8'); const m = s.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) { fail(d, 'no frontmatter'); continue; }
  const keys = [...m[1].matchAll(/^([A-Za-z][\w-]*):/gm)].map(x => x[1]);
  if (keys.join(',') !== 'name,description') fail(d, 'frontmatter keys', keys.join(','));
  const name = (m[1].match(/^name:\s*(.+)$/m) || [])[1]?.trim();
  if (name !== d) fail(d, 'name != folder', name);
  const desc = m[1].split(/^description:/m)[1].replace(/^\s*[>|][-+]?\s*$/m, '').split('\n').map(l => l.trim()).join(' ').trim().replace(/^["']|["']$/g, '');
  if (desc.length > 1024) fail(d, 'description', desc.length, 'chars');
  if (s.split('\n').length > 400) fail(d, 'SKILL.md over 400 lines');
  for (const ref of s.matchAll(/\]\((references\/[^)#]+)/g)) if (!fs.existsSync(path.join(dir, ref[1]))) fail(d, 'missing', ref[1]);
}
console.log(bad ? `${bad} problem(s)` : 'skills ok'); process.exit(bad ? 1 : 0);
EOF

# recipes: schema, vocabulary ids, sibling files; then the catalog (recipes/index.json + recipes/CATALOG.md)
node scripts/validate-recipes.mjs
node scripts/build-index.mjs --check
# same schema check without the repo scripts
npx -y -p ajv-cli@5 -p ajv-formats ajv validate --spec=draft2020 -c ajv-formats \
  -s schemas/recipe.schema.json -d "studio/src/recipes/*/recipe.json"
node --input-type=module <<'EOF'
import fs from 'node:fs'; import path from 'node:path';
const vocab = new Set([...fs.readFileSync('craft/vocabulary.md', 'utf8').matchAll(/`([a-z0-9]+(?:-[a-z0-9]+)*)`/g)].map(m => m[1]));
const root = 'studio/src/recipes'; let bad = 0;
for (const id of fs.existsSync(root) ? fs.readdirSync(root) : []) {
  const f = path.join(root, id, 'recipe.json'); if (!fs.existsSync(f)) continue;
  const r = JSON.parse(fs.readFileSync(f, 'utf8'));
  const used = [...(r.techniques || []), ...((r.audio?.sfx) || []).map(s => s.sound)];
  for (const t of used) if (!vocab.has(t)) { console.log('FAIL', id, 'unknown id', t); bad++; }
  if (r.id !== id) { console.log('FAIL', id, 'folder != id', r.id); bad++; }
}
console.log(bad ? `${bad} problem(s)` : 'recipe vocabulary ok'); process.exit(bad ? 1 : 0);
EOF

# hygiene: home paths and em dashes in the docs we ship (vocabulary.md keeps its dash format)
D="$(printf '\xe2\x80\x94')"
! grep -rnE '/Users/[a-z]|/home/[a-z]+/|Desktop/' craft skills schemas README.md CREDITS.md SHOWCASE.md llms.txt
! grep -rn "$D" craft skills README.md AGENTS.md CREDITS.md SHOWCASE.md llms.txt | grep -v '^craft/vocabulary.md:'
# optional: your own private denylist (one term per line, kept outside the repo)
[ -n "$LAUNCHFILM_DENYLIST" ] && ! grep -rniF -f "$LAUNCHFILM_DENYLIST" craft skills schemas studio/src studio/cli *.md llms.txt

# (planned) manifests, licenses, links
claude plugin validate --strict .
reuse lint
```

A PR is ready when every command above passes, the sample film renders (`npm --prefix studio run render` on
`films/_sample`, see `studio/API.md`), and the catalog is regenerated (`node scripts/build-index.mjs --check`).

## Versioning

SemVer tags (`v0.1.0`), a `VERSION` file and `CHANGELOG.md`. The README install line and INSTALL.md pin the tag; bump
both on release. Remotion upgrades land only as a PR that CI renders (sample + golden stills).
