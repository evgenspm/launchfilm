# Credit line, window rise, sidebar zoom

A two-word credit line on white hands over to a rounded app window that rises from below, a two-word title lands above it, then the camera snaps in on the window's sidebar menu and holds so every item can be read.

Source: https://www.raylight.app/templates/TpL12kTM (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- Announcing one navigation or menu change inside an existing chat or app UI
- A short silent teaser that ends on a readable UI detail instead of a logo
- Light, restrained product voice with one camera move
- Opening shot of a longer UI walkthrough
Not for: products whose news is an interaction (typing, answers); the film shows only a static menu.

## Format
16:9 · 9.8 s · 30 fps · light · music none, cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.00 | 0–60 | hook | credit line, 2 words (maker + role), small, centred on white | push-in ~1.00→1.02 over 60 fr | fade in grey→black 0.27→0.50 s (~8–15 fr, easings.outQuint suggested, ±0.25 s), hold | continuous | none |
| 2 | 2.00–2.77 | 60–83 | reveal | rounded app window (sidebar, greeting, prompt field) rises from the bottom; credit slides down behind it | static frame, window moves | translate-y ~55 % H → rest, ≤ 8 fr, springs.layout (overshoot not measurable, ±0.25 s), opacity ramp | continuous | whoosh (planned) |
| 3 | 2.77–3.77 | 83–113 | feature | title, 2 words (product name + feature noun) above the window | static | fades in with a wide word gap that closes, full by 3.00 s (~7 fr, easings.outExpo suggested, ±0.25 s), holds 23 fr | continuous | pop (planned) |
| 4 | 3.77–4.27 | 113–128 | feature | camera goes from full window to the sidebar; title leaves up | zoom-tier full→region, ×1.63, pan up-left, springs.cameraIn 15 fr (±0.25 s) | title exits up with the camera | continuous | swoosh-short (planned) |
| 5 | 4.27–9.80 | 128–294 | feature | close framing on sidebar: app name row, 9 menu items with icons, one tag chip, lower items fade to white | static | spring settle tail inside second 4, then 166 fr hold | end | none |
Evidence: row 1 sheet-01 cells 0–7 (kf-000.50, kf-001.50); row 2 sheet-01 cells 8–10; row 3 sheet-01 cells 11–15 (kf-003.50); row 4 sheet-01 cell 15 → sheet-02 cells 0–1; row 5 sheet-02 cells 1–15, sheet-03 cells 0–7 (kf-005.50 … kf-008.50). No cut frames (cuts.json empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| ui-rebuild | 2–5 | craft/vocabulary.md#ui (MacWindow, SidebarItem) |
| zoom-tier | 4 | craft/04-motion.md#springs (cameraIn), FocusCamera |
| push-in | 1 | craft/vocabulary.md#camera (Camera) |

## Look
Palette: #FFFFFF background, #2A2A2A text, #F4F4F4 window surface, #E7E7E7 active row, #888A8C muted text, #BEBEBF dividers. Type: geometric sans, regular, sentence case; credit ~3.5 % H, title ~8 % H. Treatment: none (catalogue hint glow not visible). Background: flat white; window bottom fades to white.

## What to adapt
- Copy: credit line 2 words (maker + role); title 2 words (name + feature); 8–10 sidebar labels, one with a small tag chip.
- Brand: no accent colour in the reference; put the brand accent on the active sidebar row or the tag chip.
- Timing: row 5 hold (166 fr) can shrink to ~60 fr for feeds; keep the rise ≤ 8 fr and the zoom ~15 fr.

## Pitfalls
- The final hold is 5.5 s of no motion; on a feed it reads as frozen. Add a slow push-in or shorten it.
- Sidebar must be crisp at ×1.63: rebuild it in React, not as a screenshot.
- Lower menu items fade to white at the bottom of the window; keep that fade so the crop does not look cut off.

## Missing components
none (MacWindow + SidebarItem + FocusCamera cover it; prompt field via PromptBar idle with placeholder)

## Proposed terms
- word-gap-close: title words start apart and slide together while fading in, row 3 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets, no strips. Not measurable: entrance frame counts under 8 fr, overshoot of the rise and the zoom, title gap distance. Zoom ×1.63 from sidebar width 218 → 356 px (kf-003.50, kf-005.50). SFX planned by the glue rule, not measured (reference silent). cut_on_beat = 0/0 cuts within ±2 fr.

## Study log
id window-rise-sidebar-zoom · family ai-chat · 9.8 s, 5 rows, one shot, 0 cuts
techniques 3 (ui-rebuild, zoom-tier, push-in) · cut_on_beat n/a (silent, no cuts)
not measurable: sub-0.25 s entrances and overshoot (4 fps sheets), spring names suggested
proposed terms: word-gap-close · missing components: none
phase B: not run
