# Phone call pill and queued notification stack

A phone swings in, the camera snaps to its top where a dark call pill materialises, then tilts down as light cards rise from a visible depth queue and a dark missed-call card fades in. Dark-on-pastel contrast sets hierarchy.

Source: https://www.raylight.app/templates/dLQiU3Bl (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A messaging, calling or CRM app whose value is the stream of incoming events
- Showing that a product catches calls and messages the user would otherwise miss
- A short silent loop for a landing page hero or a social feed
- Phone-first products with no desktop UI to show
Not for: products with a desktop-only UI, or films that need a named claim or CTA (there is no copy beyond UI labels).

## Format
16:9 · 6.23 s · 30 fps · light · music none (no BPM), cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.80 | 0–24 | hook | empty white; small phone edge-on turns to face camera while growing to ~60 % H, then goes soft | static frame; device scales ~8 % H to 60 % H (object move) | y-rotation edge-on to front + scale, easings.outExpo 15 fr (f6–f21); pale/blurred at 0.77 as push starts (±0.25 s) | zoom-tier | whoosh |
| 2 | 0.80–1.80 | 24–54 | feature | macro on top third: status bar, camera cutout, dark call pill (avatar initial, two-line caller label, red and green round buttons) | zoom-tier full to detail, ~6x in 4 fr (f21–f25), springs.cameraIn; creep ~1.00 to 1.03 over 30 fr | call pill materialises in place: opacity 0.15 to 1, blur 8 px to 0, no scale, easings.linear 8 fr (f29–f37); content present from frame one; hold 17 fr | dolly | notification |
| 3 | 1.80–2.48 | 54–74 | feature | camera travels down the screen; pill leaves off the top; four light glass cards stream up and stack | dolly down ~half a screen in 9 fr (f54–f63), easings.inOutSine | queue with depth: depth 1 scale 0.89 / opacity 0.5, depth 2 scale 0.79 / opacity 0.2 / blur 1–2 px; each card rises in 6 fr, springs.ui (no overshoot), stagger 3 fr, f55 to ~f69 | hard-cut | pop |
| 4 | 2.48–3.85 | 74–116 | feature | two message cards above, dark missed-call card at the bottom (avatar, red status line, caller line, red call-back glyph) | drift: slight downward settle ~1 % over 41 fr | missed-call card materialises: opacity 0.2 to 1 with blur, easings.linear 5 fr (f74–f79); hold 35 fr | blur-dissolve | notification |
| 5 | 3.85–6.23 | 116–187 | feature | empty white, held to the end so the loop restarts on white | static | phone dissolves to white in 3 fr (f116–f119), then nothing moves for 68 fr | hard-cut | none |

Evidence per row: 1 = sheet-01 cells 0–3; 2 = sheet-01 cells 4–7 (call pill ghosted at 1.00, solid at 1.27); 3 = sheet-01 cells 8–9 (pill at top at 2.00, cards stacking at 2.27, depth-faded card under the stack at 2.00); 4 = sheet-01 cells 10–15 (missed-call card faint at 2.50, solid at 2.77, hold to 3.77); 5 = sheet-02 cells 0–8 (all white). cuts.json: 0 cuts, no cut frames; near-miss at 0.80 (score 9.1) is the macro snap.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-phone | 1–4 | craft/vocabulary.md (PhoneFrame) |
| zoom-tier | 1–2 | craft/vocabulary.md, Camera tiers |
| dolly | 3 | craft/vocabulary.md (Dolly / Camera y keys) |
| notification-stack | 3–4 | craft/vocabulary.md (NotificationStack) |
| blur-dissolve | 4 | craft/vocabulary.md transitions |

## Look
Palette: #FFFFFF background, #010104 dark pills and text, #9684C1 wallpaper violet (accent), #D6BED0 wallpaper pink, #F3F1F0 glass card fill, #4F487E deep wallpaper violet. Type: system grotesk at UI scale, semibold titles, regular bodies, ~2 % H at macro; huge thin clock numerals behind the cards; red label on the missed card. Treatment: none (frosted glass cards via backdrop blur). Background: flat white outside the phone, soft pastel gradient wallpaper on screen.

## What to adapt
- Copy: caller initial + 2 short lines; 4 cards with app glyph, 1-word title, 1 short body line, time label; missed card 2 lines. No headline.
- Brand: accent carries the wallpaper and the call-back glyph; red/green call buttons stay semantic. Use neutral app glyphs, never third-party marks.
- Timing: row 5 white tail can shrink to 0 for a tight loop; rows 2–4 keep their frame counts (8 fr materialise, 6 fr arrival, 3 fr stagger, 9 fr dolly).

## Pitfalls
- The pill is not an island morph: it appears full size, only opacity and blur change (8 fr). A width spring looks cheap here.
- The wide to macro snap is 4 fr; slower and it reads as a zoom, not a match cut.
- Keep depth-1/2 queue cards visible below the stack; without them arrivals look like plain slides.
- Dark elements must stay the only dark things on screen; dark cards for messages kill the hierarchy.

## Missing components
- PhoneSwingIn: device enters edge-on (rotateY 90 to 0) with scale 0.13 to 1 over 15 fr, easings.outExpo (techniques: device-phone)
- CallPill: dark lockscreen call card (avatar, 2 lines, two round buttons) with a materialise entrance, opacity 0.15 to 1 + blur 8 to 0 px over 8 fr (techniques: notification-stack)

## Proposed terms
- device-swing-in: device turns from edge-on to facing camera while scaling up (row 1)
- materialize: element appears in place at full size, opacity + blur only, no scale or travel (rows 2, 4)
- queue-depth: list items waiting below their slot, smaller and fainter by depth, then springing up (row 3)

## Measurement notes
Resolution: 1 fr from the human 30 fps frame-by-frame measurement (windows 0.80–1.30 s and 1.85–2.65 s); other numbers checked against 0.25 s sheets. Not measurable: overshoot of the camera snap (assumed springs.cameraIn), exact drift in row 4 (±0.25 s). SFX planned by the glue rule, not measured (source is silent). cut_on_beat = 0/0 cuts within ±2 fr. Palette from keyframes kf-000.50 and kf-001.50 (no cut frames exist).

## Study log
id phone-call-pill-queue-stack · family mobile-app · 6.23 s, 5 rows (0 cuts, split at state changes 0.80 / 1.80 / 2.48 / 3.85).
Techniques: 5 (device-phone, zoom-tier, dolly, notification-stack, blur-dissolve). cut_on_beat: n/a, silent, no music.
Measured: timings and depth curve from human 30 fps notes, confirmed on sheet-01; sheet-02 all white.
Not measurable at 0.25 s: camera snap overshoot, row 4 drift amount.
Proposed terms: device-swing-in, materialize, queue-depth.
Missing components: PhoneSwingIn, CallPill.
Phase B: not run.
