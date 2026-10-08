# Glowing map tile with route dive

A rim-lit map tile grows out of dark space, a route draws across it, the camera dives to a nav arrow and follows it past three bold street labels, then pulls back to the whole tile. One continuous shot, no copy.

Source: https://www.raylight.app/templates/hgwVPnTG (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A navigation, delivery, travel or location product whose core idea is a route
- A short teaser where one continuous camera move replaces cuts and copy
- Dark premium brands that want a glowing object instead of a flat screenshot
- Opening a longer film with the product map before the feature beats
Not for: products without a spatial or path idea; films that must carry a claim or a URL (there is no copy and no end card).

## Format
16:9 · 9.45 s · 30 fps · dark · music 87.3 BPM, cut_on_beat 0/4 · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.23 | 0–7 | hook | black space, thin blue planet rim lower left, a small rim-lit rounded square lights at centre | drift 1.00→1.02 (±0.25 s) | square rim and halo light on, easings.outQuint ~6 fr (±0.25 s) | continuous | swell |
| 2 | 0.23–2.33 | 7–70 | reveal | square grows into a beveled dark map tile with blocks and five tiny labels; blue glow floods; cyan route draws | frame-in-frame scale 0.26→1.00 (tile 9 %→34 % W over 0.20→0.43), tile settles to centre 0.77→1.00 | tile scale springs.heavy ~9 fr (overshoot not measurable); route draws bottom-left up, right, up to the top edge 1.00→2.00, easings.linear ~30 fr (±0.25 s) | continuous | none |
| 3 | 2.33–3.50 | 70–105 | feature | route close-up, white nav arrow in a two-ring grey halo puck, tile bevel at frame left | zoom-tier full→detail ~6x over 2.33→2.77 (~13 fr), springs.cameraIn; then cursor-follow, map scrolls down (252 px/s) | arrow moves up the route, easings.linear | continuous | whoosh |
| 4 | 3.50–5.00 | 105–150 | feature | first turn: two-line bold street label (3 words) over the puck, route turns right | cursor-follow, arrow centred, slight roll on the turn | arrow heading turns ~90° 4.27→4.77, springs.ui ~15 fr (±0.25 s); label rides the zoom, no own entrance | continuous | tick |
| 5 | 5.00–6.60 | 150–198 | feature | second street: label of 2 words; route bends from horizontal to a diagonal | cursor-follow, map slides left then holds 5.27→6.50 | arrow heading follows the path tangent, springs.ui | continuous | tick |
| 6 | 6.60–7.77 | 198–233 | feature | third street: label of 2 words; tile edge and its light rim at frame right | cursor-follow pans up-right along the diagonal 6.60→7.07, slight push-in 7.00→7.77 | labels scroll with the map, easings.inOutSine ~14 fr (±0.25 s) | continuous | tick |
| 7 | 7.77–9.45 | 233–284 | feature | pull back to the full glowing tile with the finished route; planet rim arcs top right; music ends 8.30 | pull-out detail→full 7.77→8.27 (~14 fr), springs.cameraOut; tile drifts to centre 8.77→9.00, holds | nothing new enters; hold mirrors row 2 framing | end | swoosh-short |

Evidence per row:
1. sheet-01 cells 0–1, cuts/cut-000.23.jpg (before)
2. sheet-01 cells 1–9, cuts/cut-000.23.jpg (after), cuts/cut-002.33.jpg (before)
3. sheet-01 cells 10–13, cuts/cut-002.33.jpg (after)
4. sheet-01 cells 14–15, sheet-02 cells 0–3
5. sheet-02 cells 4–10, cuts/cut-006.60.jpg (before)
6. sheet-02 cells 11–15, cuts/cut-006.60.jpg (after), cuts/cut-007.77.jpg (before)
7. sheet-03 cells 0–5, cuts/cut-007.77.jpg (after)

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| frame-in-frame | 2, 7 | craft/vocabulary.md#camera, FrameInFrame (glowing card) |
| horizon-arc | 1, 2, 7 | craft/vocabulary.md#brand, HorizonArc |
| zoom-tier | 3 | craft/04-motion.md#springs (cameraIn), Camera / FocusCamera |
| cursor-follow | 3–6 | craft/vocabulary.md#camera, FocusCamera keys on the arrow |
| pull-out | 7 | craft/04-motion.md#springs (cameraOut) |
| ui-rebuild | 2–7 | map tile drawn in React/SVG |
| continuous | 1–6 | craft/vocabulary.md#transitions |
| glow | 1–7 | look: tile rim light and background bloom |

## Look
Palette: #010511 background, #323332 map block surface, #B8DFEC light text/rim, #3858A9 glow blue, #5576CE mid glow, #ACC2F1 highlight. Route is a saturated cyan (~#1EC8F0, by eye, not from palettegen). Type: bold rounded grotesk, title case, white, two-line street labels ~8 % H in close-ups, ~1.5 % H on the full tile. Treatment: glow. Background: black with a large blue radial glow and a planet rim arc.

## What to adapt
- Copy: 3 street or place labels for the close-ups (2–3 words, two lines each), up to 5 tiny labels on the full tile; nothing else.
- Brand: accent colour drives the route and the background glow; no logo appears, add an end card after row 7 if needed.
- Timing: rows 4–6 can stretch per extra street (~1.2–1.5 s each); the dive (~13 fr) and the pull-out (~14 fr) keep their frame counts.

## Pitfalls
- The film never cuts: every boundary is a camera move. A hard cut between streets breaks the idea.
- The arrow stays fixed at frame centre in close-ups; move the map, not the arrow.
- Labels are huge in close-ups and must stay legible on the puck (white over grey, the arrow overlaps the middle letters).
- Music stops at 8.30 s; the last 1.15 s is silent hold.

## Missing components
- MapTile: beveled rounded tile of street blocks (SVG paths), inner shading and a white rim glow, with labelled streets and a route polyline that draws by progress (techniques: ui-rebuild, frame-in-frame)
- NavPuck: white arrow in two concentric translucent grey rings (outer ~2.3x arrow, inner ~1.6x), rotates to the path tangent on springs.ui (techniques: cursor-follow)

## Proposed terms
- route-draw: a path line draws along a map polyline by progress, rows 2–7 (not in craft/vocabulary.md; not used in recipe.json)
- nav-puck: arrow-in-halo marker the camera locks onto while it travels a path, rows 3–6 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips taken. Not measurable: spring overshoot on tile growth, exact dive/pull-out frame counts, label entrances (they ride the zoom), exact route colour. Pan and roll numbers from motion.json. SFX planned by the glue rule, not measured. cut_on_beat = 0/4 cuts within ±2 fr (soft transitions at 0.23, 2.33, 6.60, 7.77; nearest beats 0.128 (3 fr off), 2.159 (5 fr off), none near 6.60 or 7.77). No hard cuts at all.

## Study log
id glow-tile-route-dive · family launch-film · 9.45 s, 7 rows (one continuous shot, 4 soft camera transitions as boundaries)
techniques 8 (frame-in-frame, horizon-arc, zoom-tier, cursor-follow, pull-out, ui-rebuild, continuous, glow)
cut_on_beat 0/4 (false); music 87.3 BPM, energy calm (bpm < 100, 0 hard cuts), silent from 8.30
not measurable at 0.25 s: tile spring overshoot, dive and pull-out frame counts, label entrances
proposed terms: route-draw, nav-puck
missing components: MapTile, NavPuck
phase B: not run
