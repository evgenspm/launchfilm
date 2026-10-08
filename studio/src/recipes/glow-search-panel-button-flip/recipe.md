# Glowing search icon pulls out to a panel, button flips in

One dark shot: a red-haloed search icon pulls out to reveal it sits in a sidebar header with a red rim light, the panel dims away, then a glowing button turns from edge-on to face the camera.

Source: https://www.raylight.app/templates/PUDTdZJt (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A 7 s teaser for one UI action (search, share, export) on a dark brand
- Intro or social loop where one icon and one button carry the story
- Brands with a saturated accent that can act as the only light source
Not for: products that need copy or several features explained; light themes (the glow carries everything)

## Format
16:9 · 7.37 s · 30 fps · dark · music none, cut_on_beat n/a (0 cuts, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.25 | 0–38 | hook | outline search glyph in a large red radial halo on black | pull-out ~1.00→0.70 over 38 fr, drift right then down-left | halo shrinks with scale, easings.inOutSine ~38 fr (suggested, ±0.25 s) | continuous | none |
| 2 | 1.25–2.00 | 38–60 | reveal | glyph is the search button of a dark sidebar panel (mark, workspace name + chevron, two tabs); red rim light on the panel's top-left corner | pull-out continues ~1.6→1.0, springs.cameraOut ~22 fr (overshoot not measurable) | halo hands over from glyph to panel rim; panel fades up ~8 fr (±0.25 s) | continuous | whoosh (planned) |
| 3 | 2.00–3.50 | 60–105 | reveal | panel corner hold, rim glow along top and left edges | drift push 1.00→~1.02, pan down ~5 px/fr @1920 | rim glow breathes; nothing enters; easings.linear (suggested) | continuous | none |
| 4 | 3.50–4.25 | 105–128 | reveal | panel dims and slides down, glow fades to a dull red band, near black | drift down continues | opacity 1→~0.3 by 4.00 s, gone by 4.27 s, easings.inQuad ~22 fr (±0.25 s) | continuous | none |
| 5 | 4.25–5.50 | 128–165 | feature | thin vertical glowing sliver (button edge-on) with faint orange halo, wandering across centre | static frame, object moves | light-on ~8 fr (±0.25 s), lateral sway ~1/6 W per 0.25 s, easings.inOutSine (suggested) | continuous | shimmer (planned) |
| 6 | 5.50–6.50 | 165–195 | feature | sliver rotates in Y to show its face: rounded red-orange gradient button, one-word action label | static frame, object width ~3x | rotateY ~90→0 deg + Z tilt straightening, springs.heavy ~30 fr (overshoot not measurable) | continuous | swoosh-short (planned) |
| 7 | 6.50–7.37 | 195–221 | cta | front-on action button, bold one-word label, orange halo on black | drift: sways left (7.00) and back (7.27) | settled, residual sway easings.inOutSine ~26 fr (suggested); no exit | end | ui-confirm (planned) |

Evidence per row: 1 = sheet-01 cells 0–4 (0.00–1.00); 2 = sheet-01 cells 5–7 (1.27–1.77), kf-001.50; 3 = sheet-01 cells 8–13 (2.00–3.27), kf-002.50; 4 = sheet-01 cells 14–15 + sheet-02 cell 0 (3.50–4.00), kf-003.50; 5 = sheet-02 cells 1–5 (4.27–5.27), kf-004.50; 6 = sheet-02 cells 6–9 (5.50–6.27), kf-005.50; 7 = sheet-02 cells 10–13 (6.50–7.27), kf-006.50. No cut frames (cuts.json empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| pull-out | 1–2 | craft/vocabulary.md#camera, craft/04#springs (cameraOut) |
| ui-rebuild | 2–4 | craft/vocabulary.md#ui |
| glow | 1–7 | craft/vocabulary.md#look |
| vignette | 1–7 | craft/vocabulary.md#look |

## Look
Palette: #040201 background, #A51918 halo red, #8E0E0E deep rim red, #CE4D41 rim highlight, #FD6A48 button orange, #FFB388 button highlight (palettegen on kf-000.50, kf-002.50, kf-006.50; no cut frames exist). Type: UI grotesk, sentence case; panel labels ~4 % H, button label bold ~9 % H white. Treatment: glow, vignette (dark corners on every cell). Background: flat black with one moving radial light.

## What to adapt
- Copy: workspace name (1–2 words), two tab labels, one-word action on the button
- Brand: accent = halo, rim and button gradient; logo mark top-left of the panel
- Timing: row 3 hold can stretch; rows 1–2 pull-out and row 6 flip must keep their frame counts

## Pitfalls
- The light is the narrative: keep one accent colour; a second colour breaks the handover glyph → rim → button
- Row 4 to 5 is not a cut: the frame goes almost black and the sliver lights up out of it; do not add a dissolve
- The edge-on button must be thin (≈ 2 % W) before the flip, otherwise the reveal reads as a scale-up

## Missing components
- SidebarPanel: dark panel corner with mark, name + chevron row, tab pills, search glyph button, hairline dividers, rim glow on two edges (techniques: ui-rebuild, glow)
- FlipButton: rounded gradient button rotating rotateY 90→0 deg with Z tilt and a following halo, edge glow visible when edge-on (techniques: none, proposed edge-flip)

## Proposed terms
- edge-flip: an object enters seen exactly edge-on as a glowing line, then rotates in Y to face the camera (rows 5–6) (not in craft/vocabulary.md; not used in recipe.json)
- glow-handover: one radial light moves from one element to the next across a one-shot film instead of a cut (rows 1–5) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strip (source file not provided to the job). Not measurable: spring overshoot, exact pull-out curve, flip angle (estimated from width ratio), sway period. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts (no cuts, no beats). Catalogue hint prompt-typing not seen on the sheets.

## Study log
id glow-search-panel-button-flip · family product-ui · 7.37 s, 7 rows, one shot (0 cuts)
techniques 4 (pull-out, ui-rebuild, glow, vignette) · cut_on_beat n/a (silent, 0 cuts)
not measurable: overshoot, curves, flip angle, all at 0.25 s resolution; sfx planned
proposed terms: edge-flip, glow-handover · missing components: SidebarPanel, FlipButton
phase B: not run
