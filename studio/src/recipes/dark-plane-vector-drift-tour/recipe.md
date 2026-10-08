# Dark tilted dashboard drift tour

Seven close-ups of a dark dev-tool dashboard leaned back in steep perspective, each a single constant-speed drift in a new direction, lit by a soft spot that fades the plane into black; then a flat wordmark and mark.

Source: https://www.raylight.app/templates/T89DiaWb (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A dense developer or analytics tool whose UI looks ordinary flat but expensive in depth
- A silent product tour where staging, not copy, carries the film
- Dark-themed products with one bright focal element per screen (a pill, an active row)
- A 30-40 s showcase for a landing page hero or a feed
Not for: light-themed products (the spot falloff needs a near-black ground), or films that must explain a claim in words (there is no copy at all).

## Format
16:9 · 35.93 s · 30 fps · dark · music none (reference silent), cut_on_beat n/a (0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–4.23 | 0–127 | hook | whole app on a tilted plane: sidebar nav + request table, table on its own layer above the sidebar | tilt-plane rotateX 30-35°, rotateY ≈ -15°; dolly left 3.1 px/fr @1920; push-in 1.00→1.031 over 127 fr | fade-up from black 15 fr, easings.outQuint; camera easings.linear; two-layer parallax | flash | hit |
| 2 | 4.23–7.50 | 127–225 | feature | close-up of the status and method columns, green and blue row pills | dolly up 2.6 px/fr; push-in 1.00→1.18 over 98 fr (5.5 %/s) | easings.linear, no settle; 1-frame white flash on entry | hard-cut | swoosh-short |
| 3 | 7.50–11.03 | 225–331 | feature | component render list with counts, icons, status pills right; steep lean | dolly up 1.5 px/fr; scale ≈ 1.00 | easings.linear; focus band through the middle third | hard-cut | swoosh-short |
| 4 | 11.03–15.23 | 331–457 | proof | area chart with four peaks, sidebar and filter column; flattest angle | pan 0.05 px/fr; pull-out 1.00→0.977 over 126 fr | chart already drawn on entry (±0.25 s); easings.linear | hard-cut | swoosh-short |
| 5 | 15.23–19.77 | 457–593 | feature | diagnosis panel at an extreme angle: glowing white prompt pill, cause text, three proportion bars | tilt-plane rotateX ≈ 45°, rotateZ ≈ -20°; dolly down 1.1 px/fr; push-in +0.37 %/s | easings.linear; glow on the pill as the single target | hard-cut | swoosh-short |
| 6 | 19.77–23.90 | 593–717 | feature | state-change log with a red/green code diff, glowing pill above | dolly right 2.6 px/fr; push-in +0.92 %/s; roll -1.0°/s | easings.linear | hard-cut | swoosh-short |
| 7 | 23.90–28.67 | 717–860 | proof | floating metric card: severity chip, four figures, four coloured cost bars | dolly left 1.1 px/fr; pull-out 1.00→0.94 over 141 fr, slight easings.inQuad | edges dissolve into black via spot falloff; 2 black frames at 28.60 | hard-cut | swoosh-short |
| 8 | 28.67–31.55 | 860–947 | logo | product wordmark, light grey, centred on flat near-black | static | appears by cut, no entrance visible (±0.25 s); holds 86 fr | hard-cut | impact-low |
| 9 | 31.55–35.93 | 947–1078 | logo | product mark alone, metallic grey gradient, centred | static | appears by cut; holds 131 fr to the end | hard-cut | shimmer |

Evidence per row:
1. sheet-01 cells 0–15, sheet-02 cell 0; cut frame cuts/flash-004.23.jpg (before side).
2. sheet-02 cells 1–9 (4.27–6.27 visible), cuts/flash-004.23.jpg (after side), sheet-02 cells 10–13.
3. sheet-02 cells 14–15 (list appears at 7.50), sheet-03 cells 0–12.
4. sheet-03 cells 13–15 (chart from 11.27), sheet-04 cells 0–12.
5. sheet-04 cells 13–15 (pill panel from 15.27), sheet-05 cells 0–14.
6. sheet-05 cell 15 (diff from 19.77), sheet-06 cells 0–15.
7. sheet-07 cells 0–15 (card from 24.00), sheet-08 cells 0–2.
8. sheet-08 cells 3–14 (wordmark 28.77–31.50).
9. sheet-08 cell 15 (mark from 31.77), sheet-09 cells 0–15.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| tilt-plane | 1–7 | craft/03-camera-and-staging.md, TiltPlane in studio/API.md (screen.tsx) |
| dolly | 1–3, 5–7 | craft/03-camera-and-staging.md |
| push-in | 1, 2, 5, 6 | craft/03-camera-and-staging.md#drift-and-push-in |
| pull-out | 4, 7 | craft/03-camera-and-staging.md |
| ui-rebuild | 1–7 | craft/vocabulary.md#ui |
| flash | 1→2 | craft/09-transitions.md, CutFlash |
| hard-cut | 2–9 | craft/09-transitions.md |
| glow | 5, 6 | craft/vocabulary.md#look, Bloom |
| vignette | 1–7 (spot falloff reads as a strong vignette) | craft/vocabulary.md#look, Vignette |

## Look
Palette: #0C0C0D background (near-black, never pure), #BFBFBE foreground text and lit pill, #747777 muted UI labels, #262938 chart area fill (indigo), #5D5560 chart line tint, #2F3234 panel surface. Type: small UI sans on the plane; end wordmark medium-weight grotesk, sentence case, ~6 % H. Treatment: glow, vignette. Background: flat near-black with a soft spot lighting the plane centre.

## What to adapt
- Copy: none on screen beyond the UI itself; the wordmark and mark close the film.
- Brand: the accent goes into one focal element per shot (pill, active row, chart line); mark and wordmark on the end cards.
- Timing: UI shots may stretch between 98 and 141 fr; keep every shot one linear vector and keep the 2 black frames before the wordmark.

## Pitfalls
- Easing the camera kills the look: every UI shot is easings.linear and the cut lands mid-move.
- Repeating a direction makes the edit feel like one long scroll; change vector every shot (left, up, up, none, down, right, left).
- Only one hard push (row 2, 5.5 %/s); others stay at 0.4–1.4 %/s.
- A visible plane rectangle breaks the illusion: the spot must fade to the background before the plane edge.
- A pure #000 background looks cheap here; use #0C0C0D.

## Missing components
- none (TiltPlane covers rotate, pan, scale drift, dof, spot; CutFlash the 1-frame flash; LineChart with `area` the chart). The dashboard screens themselves are a ui_rebuild the user supplies.

## Proposed terms
- spot-falloff: plane lit by a soft spot, brightness reaches the background before the plane edge so no rectangle is visible (rows 1–7). Not in craft/vocabulary.md; not used in recipe.json.
- tilt-shift-band: a narrow sharp band through the middle third of a tilted plane, edges 4–20× softer (rows 1, 3, 5, 6). Not in craft/vocabulary.md; not used in recipe.json.
- vector-alternation: each consecutive shot moves on a different camera vector at constant speed (rows 1–7). Not in craft/vocabulary.md; not used in recipe.json.

## Measurement notes
Resolution: 0.25 s from sheets; shot boundaries, pan px/fr, scale %/s, angles (±5°) and the flash taken from a human frame-by-frame measurement and confirmed by the sheet cell where each new screen appears. cuts.json reported 0 hard cuts (dark footage; near misses at 7.50, 11.03, 15.23, 19.77, 23.90 match the sheet changes), only the 1-frame flash at 4.23. Not measurable: chart draw-on (none visible), end-card entrances (±0.25 s). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/8 cuts within ±2 fr (no beats).

## Study log
id dark-plane-vector-drift-tour · family product-ui · 35.93 s, 9 rows (7 UI shots + wordmark + mark).
techniques: 9 (tilt-plane, dolly, push-in, pull-out, ui-rebuild, flash, hard-cut, glow, vignette).
cut_on_beat: false (silent reference, 0 beats).
Not measurable from sheets: entrance curves of end cards and any chart draw-on (±0.25 s); camera numbers from human notes.
cuts.json found no hard cuts; boundaries from sheet state changes aligned with near misses.
Proposed terms: spot-falloff, tilt-shift-band, vector-alternation.
Missing components: none (UI screens are a user rebuild).
phase B: not run.
