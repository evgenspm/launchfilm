# Portal letter dive into a light tunnel

One word on a pale page; its round letter is a live window into a blue vortex. The camera dives through it in 8 frames, then two short lines rise from depth and leave past the camera, so the tunnel reads as space.

Source: https://www.raylight.app/templates/ef2v0JXY (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A 3 s teaser or opener that has to feel like going somewhere, not a wipe
- The hook word has a round glyph or a dot that can become a window
- Naming a product after one setup line, no UI yet
- A light-to-dark flip that opens a darker film
Not for: copy longer than one 6-word line per beat; hook words with no round glyph or dot.

## Format
16:9 · 2.97 s · 30 fps · mixed (light 0.93 s, dark 2.03 s) · no music, cut_on_beat n/a (0/1, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.93 | 0–28 | hook | one short word, near-black on off-white, centred; its round letter is a disc showing the vortex | static f0–22; zoom-through about the disc f23–31, scale 1.00 → ~14 | disc content drifts while the word holds; dive eased on ln(scale), easings.inExpo 8 fr (4 fr anticipation); outgoing letters blur 6–12 px @1080; inner scene grows ~5× vs disc ~14× (parallax) | portal | whoosh |
| 2 | 0.93–1.87 | 28–56 | hook | vortex with a dark hole and lit rim crescent; setup statement, 5 words, sets up the launch moment | drift, tunnel zoom ~1.2 %/s, rim light ~10°/s | line inside the disc at f28 blurred, sharp f33 (easings.outExpo 5 fr); hold f33–51, scale creep 1.00 → 1.12 accelerating (easings.inExpo); exit f52–55 scale 1.12 → 1.35, blur 0 → 8 px, fade, 4 fr | blur-dissolve | swoosh-short |
| 3 | 1.87–2.97 | 56–89 | reveal | same vortex; two-word line introducing the product by name | drift, tunnel zoom ~1.6 %/s, slight rotation | from depth f56–60: scale 0.55 → 1, blur 8 → 0 px, easings.outExpo 5 fr; holds f60–88 | hard-cut | swell |

Evidence: row 1 `sheet-01 cells 0–3` (0.00–0.77, word static, disc content shifts), `cuts/cut-000.93.jpg` (0.90 blurred letters around the growing disc, 0.93 disc near full bleed with the blurred line inside). Row 2 `sheet-01 cells 4–7` (1.00 blurred line, 1.27–1.77 sharp and growing), `keyframes/kf-001.50.jpg`. Row 3 `sheet-01 cells 8–11` (2.00 small and blurred, 2.27–2.77 sharp hold). Frame-level numbers from the human 30 fps measurement notes.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| portal | 1 | craft/09-transitions.md, PortalWord |
| zoom-through | 1 | craft/03-camera-and-staging.md, PortalZoom |
| tunnel | 1 (inside disc), 2–3 | craft/vocabulary.md#brand, BrandTunnel |
| kinetic-depth | 2–3 | craft/05-typography.md, DepthPhrase |
| push-in | 2 (text scale creep) | craft/03-camera-and-staging.md |
| glow | 2–3 (rim crescent light) | craft/06-look.md |

## Look
Palette: #FBFAF5 page, #000002 ink / tunnel hole, #1B57DA rim light, #013FBF tunnel field, #003293 field shadow, #021E4D deep corner. Type: geometric grotesk; hook word medium-bold, cap height ~11 % H; tunnel lines weight ~500, lowercase, tracking 0, ~3.5 % H, white. Treatment: glow. Background: flat page, then a soft volumetric vortex (dark hole upper centre, lit crescent on its lower lip).

## What to adapt
- Copy: hook = 1 word with a round glyph (3–5 letters); setup = 1 line ≤ 6 words; name = ≤ 3 words with the product name.
- Brand: accent drives the tunnel field and rim light; the page and ink come from the brand bg/fg (dark brands: light ink on dark page, portal stays accent).
- Timing: the dive keeps 8 fr (8–12 max); setup hold can stretch to ≥ 36 fr for readability; the exit 4 fr and entrance 5 fr keep their counts.

## Pitfalls
- Easing the dive on scale instead of ln(scale) makes it a pop, not a dive: measured log progress 0, .02, .11, .18, .28, .46, .78, .87, 1.0.
- The next line must already be inside the disc during the dive (f28); starting it after the zoom leaves a dead blue frame.
- Text never fades in place: enter from 0.55 scale + blur, leave past the camera at 1.35, or the depth illusion breaks.
- The disc content must move while the word holds (rim drift), else the window reads as a flat sticker.

## Missing components
none (PortalZoom, PortalWord, BrandTunnel, DepthPhrase exist in API.md; BrandTunnel is documented for dark brands, so a light page outside the disc needs PortalZoom's outgoing layer, not the tunnel).

## Proposed terms
- `log-zoom`: zoom whose easing is applied to ln(scale), constant perceived speed; row 1 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; frame-level numbers (dive scales f23–31, exit/entrance frames, blur px) from the human 30 fps measurement. Detector cut at 0.93 s is the frame turning blue mid-dive, not a real cut; kept as a row boundary. Palette from palettegen on kf-000.50 and kf-001.50. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/1 cuts within ±2 fr (no beats).

## Study log
id portal-glyph-tunnel-dive · family kinetic-type · 2.97 s, 3 rows (1 detected cut, 1 state split) · 6 techniques · cut_on_beat n/a (silent, 0/1).
Not measurable from sheets: dive curve, entrance/exit frames, blur px (taken from the 30 fps human notes).
Proposed terms: log-zoom. Missing components: none. Hint statement-sequence not used (two lines, depth type instead).
Phase B: not run (study only).
