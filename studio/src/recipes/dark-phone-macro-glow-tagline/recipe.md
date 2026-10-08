# Dark phone macro tour with glowing name close

Four tight macro shots of a dark phone (hero art, score rings, suggestion card, hero again) on hard cuts, the whole phone rises out of black, fades, then the name and a short tagline glow in on black.

Source: https://www.raylight.app/templates/cTutKC8e (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A mobile app with one striking hero visual on its home screen
- Premium, moody 9:16 teaser where the device is the set
- An app whose home screen shows a score or a few ring metrics
- Closing on name plus a 3-word tagline instead of a URL card
Not for: apps without a strong visual on the home screen; light brands; films that need a CTA or URL.

## Format
9:16 · 27.71 s · 30 fps · dark · music 151.9 BPM, cut_on_beat 2/4 = 0.50 (false) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–3.60 | 0–108 | hook | macro of the phone's top corner, tilted; home screen with time, glowing wordmark, gem on rock in a dark cave | lateral drift -140 px/s, roll -2 deg/s, push 1.00→~1.05 over 108 fr | camera only, easings.linear (±0.25 s) | hard-cut | swoosh-short |
| 2 | 3.60–6.87 | 108–206 | proof | tilted close-up of the score block: big number, 3 ring metric pills, suggestion card out of focus | drift +125 px/s, roll +1 deg/s, pull back ~-1.5 %/s, shallow DoF | lower card blur grows (±0.25 s) | hard-cut | swoosh-short |
| 3 | 6.87–10.43 | 206–313 | feature | bottom edge of the phone, steep angle: suggestion card, button, tab bar; rim light on the chamfer | drift -125 px/s, roll +3 deg/s, push ~+1 %/s, rack-focus soft→sharp | focus settles ~9.00 (±0.25 s) | hard-cut | swoosh-short |
| 4 | 10.43–14.03 | 313–421 | feature | very tight tilted shot of the hero gem, wordmark and score blurred at edges | push-in 4.5→9 %/s with tilt up, easings.inOutSine | gem brightens toward centre | hard-cut | swoosh-short |
| 5 | 14.03–16.50 | 421–495 | feature | black, soft overhead light; whole phone rises from the bottom edge and grows to ~0.7 H | dolly up/in, phone ~0.2 H at 15.00 → ~0.7 H at 16.00, springs.heavy (overshoot not measurable) | phone enters ~14.75, settles ~16.50 (±0.25 s) | continuous | swell |
| 6 | 16.50–18.50 | 495–555 | feature | full phone front-on in a soft spotlight, full home screen | near static, float < 1 %/s | fade to black 18.00→18.50, easings.inOutSine 15 fr (±0.25 s) | continuous | |
| 7 | 18.50–20.75 | 555–623 | logo | black with faint radial vignette; product name small at centre | static | name blur-in 18.77→19.27 (~15 fr, easings.outQuint); mint glow halo peaks 20.00, grey by 20.27 (±0.25 s) | continuous | shimmer |
| 8 | 20.75–23.60 | 623–708 | logo | name gains a period and a 3-word tagline on one centred line | static | tagline word-reveal 20.77→21.50, line recentres; glow pass over new words 21.27→21.77; grey by 22.00; hold (±0.25 s) | continuous | shimmer |
| 9 | 23.60–27.71 | 708–831 | outro | small grey sign-off line, 3 words, centred on black | static | swaps in on one cell (±0.25 s); holds ~3.5 s; fades from ~27.20 | end | silence-beat |

Evidence: row 1 sheet-01 cells 0–14, cuts/cut-003.60.jpg; row 2 sheet-01 cell 15, sheet-02 cells 0–11, cuts/cut-006.87.jpg; row 3 sheet-02 cells 12–15, sheet-03 cells 0–9, cuts/cut-010.43.jpg; row 4 sheet-03 cells 10–15, sheet-04 cells 0–8, cuts/cut-014.03.jpg; row 5 sheet-04 cells 9–15, sheet-05 cells 0–1; row 6 sheet-05 cells 2–9; row 7 sheet-05 cells 10–15, sheet-06 cells 0–2; row 8 sheet-06 cells 3–14; row 9 sheet-06 cell 15, sheet-07 cells 0–14.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-phone | 1–6 | craft/vocabulary.md#ui (PhoneFrame) |
| device-3d | 1–6 | craft/vocabulary.md#3d |
| rack-focus | 2, 3 | craft/vocabulary.md#camera (RackFocus) |
| push-in | 1, 4 | craft/vocabulary.md#camera (Camera, KenBurns) |
| dolly | 2, 3, 5 | craft/vocabulary.md#camera (Dolly) |
| blur-in | 7 | craft/vocabulary.md#type (BlurIn) |
| word-reveal | 8 | craft/vocabulary.md#type (WordReveal) |
| quiet-close | 7–9 | craft/vocabulary.md#type (QuietClose) |
| glow | 1–4, 7, 8 | craft/vocabulary.md#look |
| vignette | 5–9 | craft/vocabulary.md#look (Vignette) |
| hard-cut | 1–4 | craft/vocabulary.md#transitions |

## Look
Palette: #0D0E0E background, #C8DECE pale-mint UI text and glow, #8D9A92 muted grey-green, #3F473F rock mid, #4A564D card fill, #454646 close-type grey. Type: UI rounded grotesk with glowing numerals; close medium grotesk, sentence case, ~2 % H, centred. Treatment: glow, vignette. Background: rendered 3D phone and dark cave art, then flat black with a radial vignette.

## What to adapt
- Copy: name (1 word), tagline (3 words, extends the name on one line), sign-off (3 words, optional).
- Brand: the accent colour carries the UI glow and the glow pass on the close; the wordmark sits on the home screen in shots 1 and 4.
- Timing: macro shots keep ~107 fr each; rows 5–6 can shrink to ~3 s; the close needs ≥ 2 s hold after the tagline.

## Pitfalls
- Flat UI on a flat PhoneFrame will not read as this film: the depth of field and rim light on the chamfer carry it.
- Keep each macro shot one direction of drift, alternating left/right between shots.
- The close type is small (~2 % H); a big headline breaks the restraint.

## Missing components
- PhoneMacroPlate: 3D or pre-rendered phone with DoF, camera at 1–3 cm, drift ±125–150 px/s, roll ±2–4 deg/s, focus distance animatable (techniques: device-3d, rack-focus)
- GlowSweep: glow halo that travels across a text line left to right over ~15 fr, then fades to the base grey (techniques: glow)

## Proposed terms
- glow-sweep: a soft accent glow passes over a line of type as words appear, then fades to grey (rows 7, 8) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips. Camera speeds from motion.json (per second, 1920 basis). Not measurable: entrance easing and overshoot on the phone rise and type, glow timing below 0.25 s. SFX planned by the glue rule, not measured, except the silence 22.50–27.71 from audio.json. cut_on_beat = 2/4 cuts within ±2 fr (3.60, 14.03).

## Study log
id dark-phone-macro-glow-tagline · family mobile-app · 27.71 s, 9 rows (5 shots, shot 5 split at 16.50, 18.50, 20.75, 23.60).
techniques 11 (incl. look ids and hard-cut) · cut_on_beat false (2/4).
Not measurable: overshoot and easing of phone rise and type (0.25 s sheets, no strips).
Proposed terms: glow-sweep. Missing components: PhoneMacroPlate, GlowSweep.
phase B: not run.
