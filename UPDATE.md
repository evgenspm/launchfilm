# Update launchfilm

> For coding agents. Updates an existing install (studio in `./launch-video/`) to a newer release. Nothing changes
> until the user says yes.

**OBJECTIVE:** the studio code, skills and the managed `AGENTS.md` block on the latest release; the user's films, keys
and settings untouched.

**DONE WHEN:** `npx launchfilm doctor --json` (in `launch-video/`) prints `"ok": true`, `launch-video/.harness/state.json`
shows the new `version`, and `npm run render:sample` writes `out/_sample.mp4`.

## Rules

- Ask before applying. Show the user the version and the changelog lines first.
- Never touch `films/`, `.env`, `harness.config.json` or `public/films/` (VO, music) by hand; the installer leaves them alone.
- Don't ask for keys; never print `.env`.

## Steps

1. **Check.** `cd launch-video && npx launchfilm update` (at most one GitHub API call per day; `--force` re-checks).
   It prints the newer version and the CHANGELOG entries since yours, or "up to date". If up to date, stop.
2. **Ask the user** whether to update, quoting the version and the 2–3 most relevant changelog lines.
3. **Apply (only on yes).** `npx launchfilm update --apply`. It clones the release tag into a temp folder and re-runs its
   installer with `--update`: studio code (`cli/`, `src/`, `scripts/`, presets, procedural SFX), `craft/`, `schemas/`,
   `recipes/index.json`, `API.md`, skills and the marked block are replaced; your films, `.env`, `harness.config.json`
   and fetched/generated media are kept. New config keys come from defaults, so an older `harness.config.json` keeps working.
   Without network access to `api.github.com`, do the same by hand:
   ```bash
   git clone --depth 1 --branch vX.Y.Z https://github.com/evgenspm/launchfilm .launchfilm-tmp
   node .launchfilm-tmp/studio/scripts/install.mjs --target <repo root> --update
   rm -rf .launchfilm-tmp
   ```
4. **Verify.** `npx launchfilm doctor` (apply its fixes), then `npm run render:sample`. If a film of the user's no longer
   renders, run `npx launchfilm validate <slug>` and fix what it names; the CHANGELOG lists breaking changes.
5. **Report** the new version and anything the user has to do in one or two lines.

Claude Code plugin users can also run `/plugin update launchfilm` (auto-update is off by default for third-party
marketplaces); that updates the skills only, so still run step 3 for the studio.
