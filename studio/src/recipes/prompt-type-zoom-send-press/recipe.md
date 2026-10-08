# Dark prompt card types, zooms in, cursor presses send

A small dark prompt card types a two-line request at speed, the camera springs in toward its left half, then a pointer slides up and presses the blue send button. A 4.5 s silent loop of one prompt being written and sent.

Source: https://www.raylight.app/templates/mPotbvtC (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- Showing that an AI tool starts from one typed request
- A short insert before a result or answer scene
- Silent autoplay social clip for a prompt-driven product
- Opening beat of a longer ai-chat film
Not for: products where the answer, not the request, is the selling point (this film ends before any result appears).

## Format
16:9 · 4.5 s · 30 fps · dark · music none (no audio track), cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.00 | 0–30 | hook | empty dark rounded prompt card ~45 % W, centred; plus icon bottom-left, blue send arrow bottom-right; first line types | drift: zoom -1.1 %/s, ~21 px/s down, near static | typing from ~f2 at ~50 chars/s, easings.linear, no caret visible (±0.25 s); card widens ~10 % as line 1 fills, springs.layout (overshoot not measurable) | hard-cut | type-click |
| 2 | 1.00–2.00 | 30–60 | feature | request wraps to line 2 and ends with a period; card one line taller | drift: zoom -0.6 %/s, ~11 px/s, near static | typing ~50 chars/s, done ~1.77 s (f53, ±0.25 s); height grows one line, springs.layout; 7 fr hold | hard-cut | type-click |
| 3 | 2.00–3.27 | 60–98 | feature | camera pushes into the card text; left edge of the text leaves frame; card fills upper left | zoom-tier region to element: 1.00 to ~1.6 (±10 %), toward upper left, ~245 px/s left, ~160 px/s up | springs.cameraIn f60 to ~f87 settle (±0.25 s, overshoot not measurable), then hold | hard-cut | whoosh |
| 4 | 3.27–4.50 | 98–135 | feature | white pointer hand enters from below right, lands on send and presses; holds to the end | static after the zoom (0.0–0.2 %/s) | cursor-path from below-right, on the button by f105 (±0.25 s), springs.ui; press squash springs.click ~f105–f113 (±0.25 s); hold 37 fr | hard-cut | ui-confirm |
Evidence: row 1 sheet-01 cells 0–3 (0.00–0.77), keyframe kf-000.50; row 2 sheet-01 cells 4–7 (1.00–1.77), kf-001.50; row 3 sheet-01 cells 8–12 (2.00–3.00), kf-002.50, motion.json second 2 (zoom 79.5 %/s, pan -245,-162); row 4 sheet-01 cells 13–15 (3.27–3.77), sheet-02 cells 0–1 (4.00–4.27), kf-003.50. cuts.json: 0 cuts, no cuts/*.jpg.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| prompt-typing | 1–4 | craft/vocabulary.md (PromptBar) |
| typewriter | 1–2 | craft/vocabulary.md (Typewriter) |
| zoom-tier | 3 | craft/vocabulary.md (Camera, ZOOM_TIERS) |
| cursor-path | 4 | craft/vocabulary.md (Cursor) |
| ui-rebuild | 1–4 | craft/vocabulary.md |

## Look
Palette: #090B0A background, #F5F5F5 prompt text, #3E63AC send button (renders as a saturated blue, ~#2F5BFF in frame), #2E2F30 card border, #9A9B9B plus icon. Type: bold grotesk, sentence case, normal tracking, 2 lines, ~2.5 % H before the zoom, ~6 % H after. Treatment: none. Background: flat near-black, card a hair lighter with a 1 px grey border, radius ~12 px.

## What to adapt
- Copy: one request, ~80 characters, wraps to exactly 2 lines at the card width; first word a verb.
- Brand: the send button carries the accent; no logo appears.
- Timing: typing (rows 1–2) stretches with prompt length at ~50 chars/s; keep the 7 fr hold before the zoom and the ~8 fr press.

## Pitfalls
- The card is small (~45 % W) before the zoom: typed text is ~2.5 % H and unreadable on phones until row 3; keep the prompt short.
- The zoom crops the left of the text; aim the camera so the line ends and the send button stay in frame.
- No answer appears; if the film continues, cut on the press frame (f105) or the hold reads as dead time.

## Missing components
- MultilinePromptCard: prompt card ~45 % W that wraps typed text to 2+ lines and grows height on springs.layout, plus icon left, accent send button right (techniques: prompt-typing). PromptBar is single-line by its API; check before building.

## Proposed terms
- multiline-prompt-card: prompt input that grows a line as typed text wraps, rows 1–2 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips extracted. Not measurable: typing cadence jitter, card growth overshoot, camera spring overshoot, cursor entrance curve, exact press squash. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts (no audio, no cuts). Palette from palettegen on keyframes 0.50, 2.50, 3.50 (no cut frames exist).

## Study log
id prompt-type-zoom-send-press · family ai-chat · 4.50 s, 4 rows (0 cuts, split at state changes 1.00, 2.00, 3.27)
techniques: 5 (prompt-typing, typewriter, zoom-tier, cursor-path, ui-rebuild) · cut_on_beat: n/a (0/0, silent)
not measurable at 0.25 s: springs overshoot, typing jitter, cursor curve, press squash
proposed terms: multiline-prompt-card · missing components: MultilinePromptCard
phase B: not run
