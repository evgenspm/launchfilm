# Tilted docs tour with a travelling focus band

A dark product UI leaned back in 3D, the camera trucking slowly and linearly across it while a narrow focus band sits on one element per shot; eight UI shots, then a flat mark and a flat wordmark.

Source: https://www.raylight.app/templates/vrZJ0X9q (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A developer tool or docs product whose UI is the story, silent autoplay, no VO
- Calm, premium product tour where reading speed matters more than energy
- Several UI states (landing, article, search, API page) to show in under 25 s
- Dark UI with one accent colour that survives heavy vignetting
Not for: light UIs (the vignette and focus falloff read as dirt on white), products with no distinct screens, films that need a spoken or typed claim.

## Format
16:9 · 29.4 s · 30 fps · dark · music none (silent), cut_on_beat n/a (0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–3.10 | 0–93 | hook | docs landing: nav, product title, two-line intro, two blue feature cards with captions | tilt-plane rotateX ~15–25°; no pan; push-in 1.000→1.034 over 93 fr, easings.linear | no element motion; focus band on middle third | hard-cut | none |
| 2 | 3.10–6.77 | 93–203 | feature | sidebar nav with active item, overview article (two-line heading, two paragraphs) | tilt-plane X+Y, baseline +8°; dolly left 2.4 px/fr, easings.linear, 110 fr; +0.6 %/s; roll +0.4°/s | none; focus on heading and sidebar | hard-cut | none |
| 3 | 6.77–11.27 | 203–338 | feature | explainer diagram card under a section heading | tilt-plane rotateY ~−25°, rotateX ~15–20°; dolly up 2.4 px/fr + push-in 1.00→1.12 over 135 fr; thirds 2.68/2.47/2.18 px/fr, easings.outQuint; roll +0.5°/s | none; focus on diagram | hard-cut | none |
| 4 | 11.27–12.50 | 338–375 | feature | page title, two-line subtitle, install section, cursor near a copy button | tilt-plane; dolly right 2.0 px/fr, easings.linear, 37 fr | cursor drifts to top bar, easings.linear (±0.25 s); very shallow focus (middle 12×) | hard-cut | none |
| 5 | 12.50–15.50 | 375–465 | feature | search popup over dimmed page: recent results, then a typed query refills the list | tilt-plane; dolly right 1.9 px/fr, easings.linear, 90 fr | popup open at 12.50 (±0.25 s); typewriter from 13.77, ~6 cps, 5 chars; list swaps per keystroke (±0.25 s); bottom third out of focus | hard-cut | type-click |
| 6 | 15.50–19.67 | 465–590 | feature | section heading over a recipe card grid; an input in the first card fills with a short question | tilt-plane, strong lean, far edge top; dolly left 1.1 px/fr, easings.linear, 125 fr | typewriter 16.00–19.25, ~7 words, ~10 cps with caret; focus on card, far edge blurred hardest | hard-cut | type-click |
| 7 | 19.67–21.40 | 590–642 | feature | API reference page: endpoint list, title, method pill, primary button, code panel | tilt-plane; dolly left 2.2 px/fr, easings.linear, 52 fr | cursor-path to the button by 20.27, click ~20.50, springs.click (overshoot not measurable, ±0.25 s); wider focus | hard-cut | tick |
| 8 | 21.40–22.60 | 642–678 | feature | same page closer: request panel with an error response, code sample | tilt-plane punched in ~1.4× on the same vector; dolly left 2.1 px/fr, easings.linear, 36 fr | none; focus on request panel | hard-cut | none |
| 9 | 22.60–25.25 | 678–758 | logo | flat white mark centred on near-black, ~8 % H | static | appears on the cut, holds 80 fr | hard-cut | hit |
| 10 | 25.25–29.40 | 758–882 | logo | flat light-grey wordmark centred, ~4 % H | static | appears on the cut, holds 124 fr to the end | hard-cut | none |

Evidence per row: 1 `sheet-01 cells 0–12`, kf-001.50; 2 `sheet-01 cells 13–15`, `sheet-02 cells 0–10`; 3 `sheet-02 cells 11–15`, `sheet-03 cells 0–8`, kf-008.50; 4 `sheet-03 cells 9–15`, `sheet-04 cells 0–1`; 5 `sheet-04 cells 2–13`; 6 `sheet-04 cells 14–15`, `sheet-05 cells 0–14`; 7 `sheet-05 cell 15`, `sheet-06 cells 0–5`, kf-020.50; 8 `sheet-06 cells 6–10`; 9 `sheet-06 cells 11–15`, `sheet-07 cells 0–4`; 10 `sheet-07 cells 5–15`, `sheet-08 cells 0–5`, kf-026.50. cuts/ is empty (0 detected cuts).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| tilt-plane | 1–8 | craft/vocabulary.md#camera, TiltPlane (studio/API.md) |
| dolly | 2–8 | craft/vocabulary.md#camera, TiltPlane `pan` / Dolly |
| typewriter | 5, 6 | craft/vocabulary.md#type, Typewriter |
| cursor-path | 4, 7 | craft/vocabulary.md#ui, Cursor |
| ui-rebuild | 1–8 | craft/vocabulary.md#ui |
| vignette | 1–8 | craft/vocabulary.md#look, Vignette |

## Look
Palette: #0B0C0D background, #E8E8F4 wordmark / headings, #1044A1 accent (cards, active nav, buttons), #35558D muted accent, #8993A1 body text, #182646 dark blue tint. Type: UI grotesk, sentence case, page titles ~3 % H, body ~1.5 % H; wordmark medium weight ~4 % H. Treatment: vignette (heavy, corners near black). Background: flat near-black, UI fills the frame.

## What to adapt
- Copy: no copy lines of our own; the UI carries text. One search query (~5 chars) and one card question (~7 words) are typed.
- Brand: accent on feature cards, active sidebar item and primary button; mark and wordmark close the film on flat brand bg.
- Timing: reading shots (rows 2, 3, 6) may stretch to 4.5 s; action shots (4, 7, 8) stay 1.2–1.7 s; keep truck speed 1.1–2.7 px/fr at 1920 regardless of length.

## Pitfalls
- No UI frame is static: every UI shot trucks at constant speed; a held UI frame breaks the "camera on a plane" feel.
- Focus band must be narrow (middle third 3–12× sharper than top/bottom); without it the film reads as a plain screen recording.
- Rows 7→8 punch-in keeps the same move vector; changing direction there turns it into a jump cut.
- Rotation: moderate (rotateY ~−25°, rotateX 15–20°). Steeper makes body text unreadable at 720p.
- Cursor is linear and the weakest part of the reference; use Cursor springs instead.

## Missing components
- FocusBand placement per shot: TiltPlane `dof.focus` exists; needs a helper to aim the band at a named child element (bounding box → plane coordinate). One-line spec: `focusOn(ref) → dof.focus 0–1`, band 0.15–0.3, edge blur 4–10 px at 1920. (techniques: tilt-plane)
- RebuiltDocsScreens: React rebuilds of landing, article, diagram, search popup, card grid, API page in brand tokens (techniques: ui-rebuild)

## Proposed terms
- focus-band: narrow in-plane depth-of-field band placed on one element of a tilted UI, rows 1–8 (not in craft/vocabulary.md; not used in recipe.json)
- vector-punch-in: cut to a closer framing that continues the exact same camera vector, rows 7→8 (not in craft/vocabulary.md; not used in recipe.json)
- flat-mark-card: mark and wordmark cut in flat with no entrance animation, rows 9–10 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; camera speeds, scale, roll and focus ratios from the frame-by-frame notes (ORB fit, px/fr at 1920) and motion.json (per-second pan/zoom agrees: −78 px/s ≈ −2.6 px/fr rows 2–3, +70 px/s row 4–5, −24 px/s row 6, −75 px/s rows 7–8). cuts.json found 0 cuts (dark low-contrast frames); boundaries from sheet cells and the notes, matching near misses at 3.10, 6.77, 11.27, 15.50, 19.67. Not measurable: popup entrance spring, cursor overshoot, per-keystroke cadence (±0.25 s). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/9 cuts (no beats; no music).

## Study log
id tilted-docs-truck-focus · family product-ui · 29.4 s, 10 rows (8 UI shots + mark + wordmark).
Techniques 6 (tilt-plane, dolly, typewriter, cursor-path, ui-rebuild, vignette). cut_on_beat n/a: silent, 0 beats.
Scene detector found 0 cuts; 9 boundaries taken from sheet cells and the measured notes.
Not measurable at 0.25 s: popup entrance, cursor overshoot, keystroke cadence.
Proposed terms: focus-band, vector-punch-in, flat-mark-card.
Missing components: focus-on-element helper for TiltPlane dof, rebuilt docs screens.
Difficulty hard (ui_rebuild > 3 screens), render_cost medium (tilt-plane with DOF). Phase B not run.
