# Phone screen that assembles from the lens

An empty phone on flat grey fills itself group by group: header, three action tiles, a section label, five list rows and a tab bar each fall from the camera, big and blurred, onto their slots with overlapping staggers.

Source: https://www.raylight.app/templates/NI7nJpks (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A mobile app whose home screen is a list of items (projects, devices, accounts, workspaces).
- A 5 s silent loop, or the opener of a longer feature tour.
- Showing that setup is instant or that a workspace fills itself.
- A light, calm product voice where depth comes from motion, not 3D.
Not for: desktop or web products with wide layouts; screens without a repeated list; films that need a claim in large type.

## Format
16:9 · 5.03 s · 30 fps · light · music none (no audio track), cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.30 | 0–9 | hook | empty white rounded phone body, no bezel, centred on flat light grey | static | none, hold 9 fr | hard-cut | none |
| 2 | 0.30–0.90 | 9–27 | reveal | status bar and app header (round badge, app name, menu icon) arrive at the phone top | static | slides down from ~40 px above, easings.outExpo 12 fr, short settle (overshoot not measurable) | hard-cut | none |
| 3 | 0.90–1.50 | 27–45 | feature | three outlined action tiles, icon + two-word label each | static | fly-in from the camera: scale ~2.5 → 1, blur ~10 → 0 px, opacity ~0.3 → 1, offset up-right → 0 on one curve, listSprings.drop 9 fr; stagger 4–5 fr | hard-cut | pop |
| 4 | 1.50–2.50 | 45–75 | feature | section label, then five two-line rows (chevron, 3D icon, name, muted count, more icon); tab bar rises | static | rows fly in from the camera on a lower-left vector: scale 2.2–5 → 1, blur 8–14 → 0 px, opacity 0.35 → 1, listSprings.drop 8–10 fr; stagger 3–6 fr (mean 4.5), up to 3 rows in flight; tab bar from below at f69, scaleX settle ~3 % | hard-cut | tick |
| 5 | 2.50–5.03 | 75–151 | feature | fully assembled home screen holds | drift 1.00 → ~1.02 from 3.0 s (motion.json 0.5–1.4 %/s) | none, hold 76 fr | hard-cut | none |

Evidence per row (no cut frames exist: cuts.json is empty):
1. sheet-01 cells 0–1 (0.00, 0.27): bare white phone.
2. sheet-01 cells 2–4 (0.50, 0.77, 1.00): header above the phone top at 0.50, landed by 0.77.
3. sheet-01 cells 4–6 (1.00, 1.27, 1.50): oversized tiles at upper-right of the phone at 1.00 and 1.27, near their slots at 1.50.
4. sheet-01 cells 6–10 (1.50 to 2.50): section label large at upper-left at 1.50; large blurred rows over the left half at 1.77 and 2.00; last row in flight at 2.27; tab bar landed at 2.50.
5. sheet-01 cells 10–15 and sheet-02 cells 0–4 (2.50 to 5.00): unchanged layout; keyframes kf-002.50 to kf-004.50.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-phone | 1–5 | craft/vocabulary.md#ui, PhoneFrame in studio/API.md |
| ui-rebuild | 2–5 | craft/vocabulary.md#ui |
| list-assemble | 4 | craft/vocabulary.md#ui, ListAssemble enter 'drop' (presets/list.tsx) |
| card-grid | 3 | craft/vocabulary.md#ui |

## Look
Palette: #ECECEC background grey, #49514F text, #4A8F6A accent (header badge), #FFFFFF phone screen, #AFACA9 muted line, #74907A tint from icons. Type: geometric sans, regular and medium, sentence case, small UI sizes (row title ~2.4 % H, muted count below, section label ~2 % H). Treatment: none. Background: flat.

## What to adapt
- Copy: app name (1 line), 3 tile labels of 2–3 words, 1 section label, 4–6 rows of name + short count. 9 lines in total at the reference count.
- Brand: the accent sits only on the header badge; rows stay in text and muted colours. Your logo replaces the badge.
- Timing: rows 1–4 keep their frame counts (the cascade is the film); row 5 hold stretches or shrinks freely, and should get a push-in.

## Pitfalls
- Every element of a group must use the same vector: header from above, tiles from upper-right, rows from lower-left, tab bar from below. Mixed directions read as noise.
- Rows overlap: 2–3 in flight at once. A sequential queue (stagger ≥ landing time) loses the cascade.
- Scale, blur and opacity ride one spring; blur is gone ~2 fr before the scale lands. Separate curves look like a fade plus a zoom.
- No bounce on landing (≤ 2 % settle): a bouncy spring makes the UI look cartoony.
- The tab bar lands before the last row: close the frame while content still settles.
- The 2.5 s dead hold is the weak part; add a slow push-in.

## Missing components
- PhoneScreenAssemble: schedules group entrances inside PhoneFrame (header, tile row, list, tab bar), each group with its own entry vector and the drop curve of ListAssemble; groups 4–5 fr staggered internally (techniques: device-phone, list-assemble, card-grid).
- Drop-in for non-list elements: ListAssemble's 'drop' enter only covers list rows; header, tiles and tab bar need the same scale 2.5 → 1 + blur 10 → 0 + opacity fly-in with a configurable offset vector.

## Proposed terms
- camera-drop: a UI element falls from the lens onto its slot, starting 2–5× scale, blurred and translucent, landing in ~9 fr with no bounce; one direction per group (rows 3–4). Not in craft/vocabulary.md; not used in recipe.json.

## Measurement notes
Resolution: 0.25 s from sheets; entrance frame counts, staggers, scales and blur values come from the human 30 fps measurement in the reference notes. Not measurable from sheets: header settle overshoot, exact tab bar overshoot (~3 % from notes), push-in in row 5 (motion.json only, below 0.25 s sheet resolution). SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts (no cuts, no music).

## Study log
- id phone-list-camera-drop · family mobile-app (phone-first; catalogue hint was product-ui) · 5.03 s, 16:9, 30 fps, 1 shot, 5 rows by state change.
- techniques 4: device-phone, ui-rebuild, list-assemble, card-grid · difficulty medium · render_cost light.
- audio: none in the reference; cut_on_beat false (0/0); sfx planned by the glue rule (tick, pop, ui-confirm).
- measured from notes at 30 fps: row landing 8–10 fr, stagger 3–6 fr (mean 4.5), start scale 2.2–5×, blur 8–14 px.
- not measurable from sheets: header settle, tab bar overshoot, the slight push-in during the hold (±0.25 s).
- proposed term: camera-drop.
- missing components: PhoneScreenAssemble, drop-in for non-list elements.
- phase B: not run (study only).
