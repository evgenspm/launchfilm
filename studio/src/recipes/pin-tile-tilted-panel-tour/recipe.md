# Pin tile into a tilted dark panel tour

A warning card on a tilted plane yields to a white pin that settles into an app tile; glowing pills draw in, tilted UI panels pass under rack focus, then a two-line close and a flat wordmark.

Source: https://www.raylight.app/templates/adbjR59l (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- Privacy, security or utility products whose story is "you are exposed, here is the switch"
- Silent autoplay launches where dark tilted UI and soft glow carry the premium feel
- Small apps with 3 to 5 distinct panels that read well leaned back in 3D
- An app icon built on one strong glyph that can hold the frame alone for 4 s
Not for: products whose value needs a live interaction (typing, dragging): nothing on the panels changes state, the camera does all the work.

## Format
16:9 · 34.90 s · 30 fps · dark · no music (reference is silent), cut_on_beat n/a (0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–4.00 | 0–120 | hook | dark card on a back-tilted plane: bold warning headline (6 words) over a 4-line body; a white pin rises from behind its top edge | tilt-plane rotateX ~25°, drift down ~70 px/s @1920, grows 0.8–1.9 %/s | body words light grey to white left to right, ~1.1 s per line (±0.25 s); pin rises from 1.00 on springs.heavy ~75 fr; rack focus card to pin at 3.00, 18 fr | rack-focus | none |
| 2 | 4.00–6.20 | 120–186 | logo | white pin with a dark shield cut-out alone in centre; blurred card sinks out below | pull-out: pin 1.00→0.80 over 66 fr, easings.inOutSine | card slides down, blur 0→14 px, easings.inExpo 60 fr (±0.25 s) | morph | none |
| 3 | 6.20–8.10 | 186–243 | logo | rounded dark-grey tile grows behind the pin: the full app icon | push-in 1.00→1.06 over 12 fr, then static | tile 0.6→1.0 from behind the pin, springs.ui 15 fr, opacity over 10 fr; holds 1.4 s | smash-cut-black | pop |
| 4 | 8.10–10.00 | 243–300 | feature | black; thin elbow connector lines draw down, each ending in a glowing rounded pill with a red dot, a coordinate meta line and a place name; pills 1–3 of 6 | near static: slow pull-out −1.1 %/s, drift right ~10 px/s @1920, easings.linear | per pill: line 6 fr easings.outQuint, outline closes 8 fr, label fades 6 fr; starts 8.20, 8.87, 9.33 (~13 fr apart) | hard-cut | tick |
| 5 | 10.00–12.23 | 300–367 | feature | same field: pills 4–6 draw in lower right and top right; all six hold glowing | slow pull-out −1.9 to −2.6 %/s, easings.linear | same pill draw at 10.00, 10.50, 11.00 (15 fr stagger); full set holds 22 fr | hard-cut | tick |
| 6 | 12.23–14.00 | 367–420 | feature | the pill field jumps to a steep tilted plane, close and large; nearest pill sharp, far pills soft | tilt-plane rotateX ~45°, rotateZ −15°; dolly left ~90 px/s @1920 with push-in +14 %/s, easings.linear | no element motion; depth blur by distance (maxBlur ~6 px) | hard-cut | whoosh |
| 7 | 14.00–16.27 | 420–488 | feature | dolly continues; the nearest pill leaves frame left, far pills reach centre | dolly left ~95 px/s @1920, push-in +13 %/s, easings.linear | nearest pill exits left at ~16.00 | hard-cut | none |
| 8 | 16.27–18.27 | 488–548 | logo | pin glyph and wordmark on a tilted dark slab, letters softly glowing | tilt-plane rotateZ −8°, pull-out −6 %/s, slight drift down | letter glow breathes 0.6→1.0 over 30 fr (±0.25 s); the cut is the reveal | hard-cut | whoosh |
| 9 | 18.27–20.27 | 548–608 | feature | close tilted settings card: two protection rows with icons and green on-toggles; the wordmark header slides in blurred above | tilt-plane rotateZ −15°, pull-out −6 %/s, pan up ~190 px/s @1920 at 18.50–19.25 | header enters from top under blur (rack-focus 18 fr, ±0.25 s); toggles already on | hard-cut | whoosh |
| 10 | 20.27–24.20 | 608–726 | feature | the whole panel frontal on a back-tilted plane: header, two toggles, a map card unfolds below, then a location row with coordinates | tilt-plane rotateX ~30°, pull-out −2.6 %/s, drift up ~25 px/s @1920 | map card height 0→full over 22 fr from 20.77 (springs.layout, overshoot not measurable); location row fades in 8 fr at 21.50 | hard-cut | ui-confirm |
| 11 | 24.20–26.17 | 726–785 | feature | city picker on a steep tilted plane: search field, heading, 5 rows with flags, one row checked | tilt-plane rotateX ~40°, rotateZ 15°; push-in +12.5 %/s, list drifts up ~90 px/s @1920 | rows hold; far rows lose focus | hard-cut | whoosh |
| 12 | 26.17–28.20 | 785–846 | feature | edge of a phone: segmented 3-tab control above an allowed-sites list of 3 rows | tilt-plane rotateZ ~25°; push-in +17 %/s, drift left ~25 px/s @1920 | middle tab already selected; near phone edge blurred | hard-cut | whoosh |
| 13 | 28.20–32.13 | 846–964 | feature | flat black: centred bold line (5 words) restating the problem; at 30.27 a grey second line (5 words) offers the fix | push-in 1.00→1.06 across the row (+2.8 %/s) | line 1 blur-in whole line, blur 8 px→0, opacity 0.3→1, easings.outExpo 12 fr; line 2 same entrance at 30.27 while line 1 moves up half a line, springs.ui 10 fr (±0.25 s) | blur-dissolve | none |
| 14 | 32.13–34.90 | 964–1047 | logo | flat black: pin glyph and wordmark centred, white, 5 % H | static | appears on one frame after 1 empty frame; holds 83 fr | hard-cut | hit |

Evidence per row: 1 sheet-01 cells 0.00–3.77, strip none; 2 sheet-02 cells 4.00–6.00, strip-6.0; 3 sheet-02 cells 6.27–7.77, sheet-03 cell 8.00, strip-8.0 (tile frames 0–2, black from frame 3 = 8.10); 4 sheet-03 cells 8.27–9.77, strip-8.0; 5 sheet-03 cells 10.00–11.77, sheet-04 cell 12.00; 6 sheet-04 cells 12.27–13.77, strip-12.0 (jump on frame 7 = 12.23); 7 sheet-04 cells 14.00–15.77, sheet-05 cell 16.00; 8 sheet-05 cells 16.27–18.00, strip-16.0 (jump on frame 8 = 16.27); 9 sheet-05 cells 18.27–19.77, sheet-06 cell 20.00, strip-18.0 (frame 8 = 18.27); 10 sheet-06 cells 20.27–23.77, sheet-07 cell 24.00, strip-20.0 (frame 8 = 20.27); 11 sheet-07 cells 24.27–26.00, strip-24.0 (frame 6 = 24.20); 12 sheet-07 cells 26.27–27.77, sheet-08 cell 28.00, strip-26.0 (frame 5 = 26.17); 13 sheet-08 cells 28.27–31.77, sheet-09 cell 32.00, strip-28.0 (frame 6 = 28.20); 14 sheet-09 cells 32.27–34.77, strip-32.0 (empty frame 3, wordmark from frame 4 = 32.13). cuts.json lists 0 cuts, so there are no cuts/*.jpg files.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| tilt-plane | 1, 6, 8–12 | craft/03-camera-and-staging.md, TiltPlane |
| rack-focus | 1, 6, 9, 11 | craft/03-camera-and-staging.md, RackFocus |
| dolly | 6, 7 | craft/03-camera-and-staging.md, Dolly |
| push-in | 3, 6, 7, 11–13 | craft/03-camera-and-staging.md#drift-and-push-in |
| pull-out | 2, 8–10 | craft/03-camera-and-staging.md |
| blur-in | 13 | craft/05-typography.md |
| blur-dissolve | 13 | craft/09-transitions.md#blur-dissolve |
| morph | 2 | craft/09-transitions.md (pin becomes the icon glyph) |
| smash-cut-black | 3 | craft/09-transitions.md |
| ui-rebuild | 1, 9–12 | craft/04-motion.md, product UI rebuilt in React |
| device-phone | 12 | phone edge framing the list |
| hard-cut | 4–12, 14 | craft/09-transitions.md |
| glow | 4–8 | look: outline glow on pills and wordmark letters |

## Look
Palette: #000000 background, #FEFEFE text and glyph, #9C9C9C second line and muted labels, #282828 panel surface, #1B1B1B card fill, #565656 body text before it lights. Accents the palettegen pass misses (small areas): red dots in the pills, green toggles, an orange country outline on the map. Type: medium grotesk, sentence case, normal tracking; UI labels 2–3 % H on tilted panels, close statement bold 4.5 % H, second line grey; wordmark 5 % H with a pin glyph. Treatment: glow (pill outlines carry a slight chromatic fringe). Background: flat black, a faint diagonal hatch texture under the pill field.

## What to adapt
- Copy: warning card (headline 4–7 words, body 3–4 lines); 6 pill labels with a short meta line; close in two lines of about 5 words each (problem, then fix); wordmark.
- Brand: the glyph becomes the app tile; brand accent can replace the red pill dots and the green toggles; no other colour.
- Timing: panel shots keep a 60 fr period (rows 8, 9, 11, 12); row 10 stretches for its unfold; pill stagger 13–15 fr must stay or the field reads as a single pop.

## Pitfalls
- Nothing on the panels changes state: toggles are already on. The interest comes only from tilt, dolly and focus; a static frontal panel kills it.
- Panel cuts land on a 2 s grid; uneven holds make the tour feel random.
- Keep the black gap between icon and pill field (row 3 ends on 1 fr of tile then black): it resets the eye before the lines draw.
- Depth of field must be strong on steep planes (rows 6, 11); without it the tilted UI looks like a flat skew.

## Missing components
- ConnectorPill: elbow line draws down from off-frame, ends in a rounded outlined pill with a dot, meta line and label; line 6 fr, outline 8 fr, label 6 fr, glow on the stroke (techniques: glow)
- ToggleRow / SettingsCard: labelled row with icon and an on-state switch, for the rebuilt panels (techniques: ui-rebuild)
- UnfoldCard: card whose height grows 0→full from its top edge on springs.layout over ~22 fr (techniques: ui-rebuild)
- ReadAlongText: paragraph whose words brighten from muted to text colour left to right at ~1 line per 1.1 s (techniques: ui-rebuild)

## Proposed terms
- read-along-light: body text brightens word by word as if being read, no movement (row 1)
- connector-pill-draw: elbow connector draws, then its labelled pill outline closes and lights (rows 4, 5)
- tile-behind-glyph: a rounded tile scales up behind a standalone glyph to form the app icon (row 3)
- card-unfold: a card inside a panel grows its height from 0 to reveal content (row 10)

## Measurement notes
Resolution: 0.25 s from sheets; 1 fr from 30 fps strips at t = 6, 8, 12, 16, 18, 20, 24, 26, 28, 32 s (system ffmpeg, local source file, strips kept outside the repo). Not measurable: plane rotation angles (estimated from perspective, ±10°), spring overshoot on the tile and map unfold, exact pill draw frames (±0.25 s for durations under 8 fr), blur radii. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no beats; cuts.json found 0 cuts, 9 visual cuts found in strips).

## Study log
id pin-tile-tilted-panel-tour · family product-ui · 34.90 s, 14 rows
techniques 13 (incl. glow and hard-cut) · cut_on_beat n/a: silent reference, 0 beats
cuts.json had 0 cuts; 9 hard cuts located to 1 fr from 30 fps strips (8.10, 12.23, 16.27, 18.27, 20.27, 24.20, 26.17, 28.20, 32.13)
not measured: plane angles (±10°), overshoot, pill draw sub-durations (±0.25 s), blur radii
proposed terms: read-along-light, connector-pill-draw, tile-behind-glyph, card-unfold
missing components: ConnectorPill, ToggleRow/SettingsCard, UnfoldCard, ReadAlongText
phase B: not run
