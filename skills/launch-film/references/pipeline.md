# Pipeline: every gate in detail

Run all commands from `launch-video/`. `<slug>` is kebab-case (`a-z0-9-`), e.g. `acme-ledger-launch`.
Exact flags change between versions: `npx launchfilm <cmd> --help` is the source of truth.
General failure rule: a command fails → read the error, apply one fix, retry. Fails twice → stop, show the user the
exact output (doctor JSON, QA report or stderr tail) and ask. Never loop silently.

## Gate 0: preflight

| Step | Command / action | Pass |
|---|---|---|
| Doctor | `npx launchfilm doctor --json` (`--fix` applies safe fixes) | `"ok": true`; optional providers may be unset |
| Studio present | `ls launch-video/package.json` | exists; else tell the user to run the README install line |
| Remotion notice | `npx launchfilm license status` | answer recorded; else notice + `license ack <answer>` (remotion-license.md) |
| Update hint | `npx launchfilm update --check` (≤ once a day) | mention a newer version once in one line; `update --apply` only if the user asks |

## Gate 1: brief

1. Ask the brief questions (story skill, its `references/brief.md`): max 5 at once, defaults pre-filled.
2. `npx launchfilm new <slug> [--recipe <id>] [--preset x-16x9,li-4x5] [--title "<Product>"]` scaffolds `films/<slug>/`.
3. Write `films/<slug>/BRIEF.md`:
   ```
   product: Acme Ledger · invoicing for freelancers
   message: Invoices that chase themselves.
   mode: product film · length: 30 s · presets: x-16x9, li-4x5
   audience: freelancers who bill monthly · CTA: Try it free · acme-ledger.example
   VO: yes, Kokoro af_heart, dry founder style
   must show: invoice created from a timesheet; auto reminder
   must not claim: bank integrations, user counts
   Assumed: <every default taken>
   ```
Done when: all fields filled or marked "assumed"; `films/<slug>/` exists.

## Gate 2: brand

Run brand-intake. Artifacts: `films/<slug>/brand.json`, `films/<slug>/BRAND-SOURCES.md`, logo files in
`public/films/<slug>/brand/`. Hard stops: no logo file → ask for one; colors not captured → ask. Never invent either.
Done when: brand.json validates (if `schemas/brand.schema.json` exists) and every value has a source line.

## Gate 3: story (hard gate)

1. Pick a hook (story `references/hooks.md`) and a structure for the length (`references/structures.md`).
2. Optionally pick 1–3 recipes (recipes skill, `recipes/CATALOG.md`) whose structure fits; show the user each pick's
   source link, then cite their ids and the rows you use in the storyboard.
3. Write the VO script inside the word budget: seconds × 2.5–3 wps × 0.55–0.7 coverage. VO lines go into `film.json`
   (the `vo` command reads them from there; see `schemas/film.schema.json` and studio/API.md for the field names).
4. Write `STORYBOARD.md` (table format in story `references/storyboard-template.md`). Every row cites rules.
5. Look stills only if they help the user judge (`npx launchfilm still <slug> <t>` once a draft scene exists).
6. Show the table and ask: "Approve, or tell me what to change." Record `approved: <ISO date>` as line 1.
Done when: the approval line exists. Without it, gates 4–10 do not start (stills excepted).

## Gate 4: sound

| Step | Command | Check |
|---|---|---|
| VO | `npx launchfilm vo <slug>` (`--takes 5` for the hero film, `--line <id>` to redo one line) | takes generated, chosen take recorded; −16 LUFS, 48 kHz mono |
| Word timings | `npx launchfilm words public/films/<slug>/<vo file> --script films/<slug>/script.txt --out <words json>` (or what `vo` already wrote) | match ≥ 95 % vs script; zero null timestamps |
| Music | `npx launchfilm music <slug> --len 30 --bpm 120 --mood "<mood>"` (`--provider library` default) | instrumental; license green/yellow; provenance written |
| Beat grid | `npx launchfilm beats <music file> --out <beats json>` | BPM, beats and downbeats saved; first downbeat ≤ 0.1 s |
| SFX | `npx launchfilm sfx list` / `sfx search <q>` / `sfx gen <preset>` | every film.json event mapped to an audio id |
Details: sound skill. Fit picture beats to the measured VO durations, not to the script's estimate.

## Gate 5: build

1. Read the studio's `API.md` (`launch-video/API.md`). Prefer `film.json` data over TSX; write TSX only for scenes the engine can't express.
2. Place cuts on beat frames (`round(beats[n] × fps)`), text on word onsets, events on the frames the sound plan uses.
3. `npx remotion compositions` must list the film's compositions for every preset.
4. Stills at the midpoint of every storyboard row: `npx launchfilm still <slug> <t> --preset <id>`. Look at each one.
Done when: compositions list; every row has a still you inspected.

## Gate 6: QA

Run film-qa. It uses `npx launchfilm render <slug> --scale 0.5` for a fast pass, `npx launchfilm sheet <slug>`,
stills at key timestamps, and `npx launchfilm qa <slug>` (sheets + ffprobe + loudness + checks →
`qa/<slug>/report.md`), and writes `qa/<slug>/QA.md` with evidence per T1–T12 and delivery checks.
Fix → re-render affected ranges → re-check. Max 3 QA rounds; still failing → report the open items to the user.

## Gate 7: render

`npx launchfilm render <slug> --presets <list>` then ffprobe + loudness checks (SKILL.md gate 7).
Use `--concurrency` only below what doctor recommends; heavy 3D/blur recipes render slower.

## Gate 8: package

`npx launchfilm package <slug>` collects finals per preset, `poster.png` (frame 0), SRT, and credits (music and
footage credits for CC BY sources, provider/model for AI assets) into `out/<slug>/` (or `--to <dir>`).
Check: every CC BY item from the manifests appears in the credits file with title, author, source URL, license.

## Gate 9: post

Run launch-post. It starts from `npx launchfilm post <slug>` (scaffold for X, LinkedIn, Product Hunt) and writes
`out/<slug>/POST.md`. The user posts; never post for them.

## Gate 10: credit

Per `credit.md`. Last thing after the first successful delivery in an attended session, once per project.

## Artifacts summary

| File | Written by | Read by |
|---|---|---|
| films/<slug>/BRIEF.md | gate 1 | all |
| films/<slug>/brand.json, BRAND-SOURCES.md | brand-intake | scene-build, film-qa |
| films/<slug>/STORYBOARD.md | story | sound, scene-build, film-qa, launch-post |
| films/<slug>/film.json | story (VO lines) + sound + scene-build | film engine, film-qa |
| public/films/<slug>/ | brand-intake, sound, footage | the composition (staticFile) |
| qa/<slug>/report.md, QA.md | `qa` command, film-qa | final report |
| out/<slug>/* | render, package, launch-post | user |
