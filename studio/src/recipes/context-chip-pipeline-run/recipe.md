# Prompt chips to a running pipeline

A dark prompt card gets a task, the camera pushes onto its context chip and pans across two dropdowns, then a tile library pulls out under a build button and a status-dot pipeline lights up stage by stage.

Source: https://www.raylight.app/templates/kHjMpLD6 (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- AI or computer-vision tools where the user picks sources (device, camera) and a model before a job runs.
- A 7 s product beat that shows setup, then the run, without VO.
- Small UI that must stay legible at 720p or in 9:16: the camera pushes in instead of shrinking the UI.
- A serious product voice: 2-3 fr fades, damped camera moves, only one pop in the whole film.
Not for: products with no configuration step, or consumer apps that need warmth and bounce.

## Format
16:9 · 6.97 s · 30 fps · dark (with a light last shot) · no music, no BPM, cut_on_beat n/a (0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00-3.17 | 0-95 | hook | dark prompt card on a chrome-pink backdrop: upload strip, one-line task (5 words, names the job), context chip, model picker, send button; first dropdown (group label + one device), then a second one (2 options + add-new) | `zoom-tier` full -> element: push-in 1.0 -> 1.6 on the chip f30-39 (`springs.cameraIn`, 9 fr); `dolly` right to the second dropdown f60-72 (`springs.ui`, 10 fr) | card rises 6 fr (`easings.outExpo`); task typed by f15; chips fade together f15-24; send button by f23 (±0.25 s); dropdown 1: 3 fr fade + 6 px drop f25-27; dropdown 2: same at f66-69 (±0.25 s); `cursor-path` to option 1, click f78-84; check fades in 2 fr f84-85 | hard-cut | tick (click) |
| 2 | 3.17-5.77 | 95-173 | feature | black field, 6x4 grid of dark model tiles with tiny uppercase labels; accent build button (icon + 2 words) pops centre; grid dims | `pull-out`: tiles shrink about 25 % f95-114 (`springs.cameraOut`, about 19 fr, ±0.25 s), then hold | grid present at the cut, no stagger visible (±0.25 s); button `springs.pop` f132-135 (overshoot not measurable); grid dims to about 35 % f135-143 (`easings.outQuint`, ±0.25 s); hold to f173 | hard-cut | pop (button) |
| 3 | 5.77-6.97 | 173-209 | feature | light chrome backdrop; dark card, 1-word title, rail of three status-dot stages (done green, running red, queued grey), each with a label (2 words) and a sub-line (4-5 words) | drift: card rises about 12 px and settles by f180 (`springs.ui`, ±0.25 s), then hold | card fill light grey -> dark in 3 fr f173-175; title types from f173; stages 7 fr apart (f176, f183, f190): dot dim 1 fr then full; label + sub-line type at 2 chars/fr with a 3-char trailing fade; dashed connector fills in 2 fr under a done stage; check fades with the done sub-line; hold f200-209 | hard-cut | ui-confirm (stage done) |

Evidence per row:
1. sheet-01 cells 0-12 (0.00 black, 0.27 card rising with empty fields, 0.50 task + chips, 0.77 send button, 1.00 first dropdown, 1.27-2.00 pushed in on chip + dropdown, 2.27 panned to second dropdown, 2.50-2.77 cursor on option 1, 3.00 check visible); `cuts/cut-000.03.jpg` (black -> backdrop at f1), keyframes kf-000.50, kf-001.50, kf-002.50.
2. sheet-01 cells 13-15 (3.27 close tiles, 3.50 fewer larger tiles, 3.77 full grid), sheet-02 cells 0-6 (4.00-4.27 grid hold, 4.50 button over grid, 4.77-5.50 grid dimmed); `cuts/cut-003.17.jpg`, kf-003.50, kf-004.50.
3. sheet-01 none; sheet-02 cells 7-11 (5.77 light-grey card ghost with first title letter, 6.00 stage 1 typing, 6.27 stage 2 typing, 6.50 stage 3 typing, 6.77 all settled); `cuts/cut-005.77.jpg`.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| ui-rebuild | 1-3 | craft/vocabulary.md#ui; all UI drawn in React (prompt card, dropdowns, tiles, pipeline) |
| prompt-typing | 1 | craft/vocabulary.md#ui (PromptBar) |
| cursor-path | 1 | craft/vocabulary.md#ui (Cursor) |
| zoom-tier | 1 | craft/03-camera-and-staging.md, presets/camera.tsx ZOOM_TIERS |
| dolly | 1 | craft/03-camera-and-staging.md (lateral pan to the second dropdown) |
| pull-out | 2 | craft/03-camera-and-staging.md (tile grid revealed by zooming out) |
| card-grid | 2 | craft/vocabulary.md#ui (library tiles) |
| list-assemble | 3 | craft/vocabulary.md#ui (stages check themselves); see Proposed terms |

## Look
Palette: #000200 (black field, row 2), #F1E8E4 (light chrome backdrop / text), #B83E18 (accent, send + build buttons; brighter orange on screen), #181C1D (card surface), #AA9992 (backdrop mid-tone), #DBD6D3 (light card ghost, row 3). Type: neutral grotesk (Inter-like), sentence case, prompt and titles 600 about 2.5 % H, stage labels 600 about 1.4 % H, muted 400 sub-lines, tiny uppercase tile labels. Treatment: none. Background: soft blurred chrome-ring gradient (rows 1, 3), flat black (row 2).

## What to adapt
- Copy: task 4-6 words; chip label 1 word; dropdown 1 = group label + one item (3-4 words); dropdown 2 = two options + add-new row; up to 24 tile labels of 2 words; button 1-2 words; pipeline title 1 word + 3 stages (label 2 words, sub-line 4-5 words).
- Brand: accent on send and build buttons only; pipeline dots use status colours (done = accent or green, running = warm, queued = muted); the backdrop can be `DesktopBackdrop` in brand tones. Draw our own chip glyph.
- Timing: row 1 keeps its frame counts (3 fr dropdowns, 9 fr push, 10 fr pan); row 2 hold can stretch; row 3 stage gap is `timing.stageGap` (7 fr), add stages by extending the row.

## Pitfalls
- Dropdowns are 3 fr fades with a 6 px drop and no scale; a scale pop makes it look like a toy.
- The check after the click fades in 2 fr; keep it quiet.
- Push the camera in to make small UI legible; do not enlarge the UI itself or the layout breaks at the pan.
- Pipeline labels type at machine speed (60 chars/s) with a trailing fade; human cadence typing reads as a person, not the system.
- Frame 0 is black; for a poster use a frame from row 1 after f15.

## Missing components
- StatusRail variant of `SourcePipeline`: status per stage (done / running / queued) with per-state dot colour and a dashed connector of 4-5 dashes per gap filling in 2 fr (techniques: list-assemble). Check `SourcePipeline` props first; it has `at`/`doneAt` but no explicit running/queued colour state.
- TileLibrary: 6x4 grid of dark tiles with uppercase labels, global dim to 35 % in 8 fr when an overlay button appears (techniques: card-grid, pull-out). `FeatureCards` is close but cascades and has bodies.
- Second dropdown attached beside the first (option list with bullets, add-new row, trailing check): `ContextChip` covers one dropdown; a sibling option menu is needed.

## Proposed terms
- status-pipeline: a vertical rail of status dots, each stage lights in turn (done, running, queued) while its label types and the connector fills; row 3 (not in craft/vocabulary.md; not used in recipe.json).
- dim-behind: everything behind a popped overlay drops to about 35 % opacity; row 2 (not in craft/vocabulary.md; not used in recipe.json).

## Measurement notes
Resolution: 0.25 s from sheets; frame numbers for dropdowns, push, pan, check, card fill and stage gaps taken from the human 30 fps pass (notes.md), other numbers carry ±0.25 s. Not measurable: overshoot of the build button, exact tile pull-out curve, card rise distance in row 3. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/3 cuts within ±2 fr (no beats).

## Study log
- id context-chip-pipeline-run, family product-ui, 6.97 s, 3 rows (cuts at 0.03 merged into row 1 start, 3.17, 5.77).
- 8 techniques: ui-rebuild, prompt-typing, cursor-path, zoom-tier, dolly, pull-out, card-grid, list-assemble.
- Audio: silent, no VO, no beats; cut_on_beat 0/3, false.
- Not measurable at 0.25 s: button overshoot, pull-out curve, row 3 card rise.
- Proposed terms: status-pipeline, dim-behind.
- Missing components: status-state rail for SourcePipeline, TileLibrary with dim, sibling option menu for ContextChip.
- Phase B: not run (study only).
