# Typed intro, skill words on tilted screens, desk pull-out

A personal showcase: a caret types a greeting and a name on flat light grey, then each skill word cascades in beside a tilted screen of that work, and the profile page is pushed in, panned and pulled back onto a desk monitor.

Source: https://www.raylight.app/templates/9mfuMfbY (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A freelancer or creator introducing themselves and three to four skills
- A portfolio reel built from screenshots rather than footage
- A profile or cover-image showcase that has to end on the full page in context
- Voice-over intros where the type follows the speaker word by word
Not for: products with a single hero claim, or silent autoplay (the blank holds at 7.93 s and the 2 s tail need VO to carry them).

## Format
16:9 · 28.69 s · 30 fps · light · music 122.6 BPM, cut_on_beat 2/7 (false) · VO yes, ~42 words, ~1.5 words/s

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.27 | 0–68 | hook | caret blinks, greeting line types and runs into a half sentence | locked frame; line slides left as it grows | caret alone 0.27–1.00 s; typing ~10 chars/s (±0.25 s); slide easings.linear | continuous | type-click |
| 2 | 2.27–5.00 | 68–150 | reveal | 3-word label + name typed in bold teal caps; fades; name returns small, plain, dark | locked frame; line slides ~2 % per cell | one letter per 0.25 s cell; fade 3.00–3.27 s ~8 fr (±0.25 s); hold 1.5 s | continuous | type-click |
| 3 | 5.00–7.93 | 150–238 | feature | 3-word lead types top left; skill word 1 spaced caps + swash underline; tilted profile screenshot, then photo collage, rise at right | locked; screenshot travels up ~340–400 px/s @1920, grows ~12 %/s | lead types 5.00–5.50 s; skill + swash 5.77 s; screen enters easings.outExpo ~10 fr (±0.25 s); skill word recolours 7.00–7.77 s | hard-cut | swoosh-short |
| 4 | 7.93–11.77 | 238–353 | feature | 1.3 s empty grey; 2-word aside, 3-word lead in teal; skill word 2 cascades letter by letter in blue beside a tilted dark editor screen | locked; dark screen tilted ~-5° rises from bottom left ~110 px/s @1920 | aside 9.50 s on offset baselines; lead 10.00 s; letters on a diagonal ~4 fr stagger (±0.25 s); lead fades by 10.77 s | hard-cut | swoosh-short |
| 5 | 11.77–14.83 | 353–445 | feature | skill word 3 (green) beside a tilted light browser screen; at 13.00 s skill word 4 (coral) with five floating app icons beside a tilted dark node-graph screen | locked; each screen rises and settles tilted, ~100–190 px/s @1920 | same letter cascade; previous screen exits up as next rises; icons drift ~10 px/cell; settle springs.ui (overshoot not measurable) | hard-cut | swoosh-short |
| 6 | 14.83–16.97 | 445–509 | feature | tilted light window with an agent prompt and status list; then 2-line closing claim right, six tool logos scattered left | locked; window rises ~190 px/s @1920, exits up by 15.77 s | rise easings.outExpo (±0.25 s); claim in 15.77 s; logos drift out easings.inExpo (±0.25 s) | hard-cut | swoosh-short |
| 7 | 16.97–19.77 | 509–593 | feature | full profile page: cover banner, avatar, name typing in, bio lines | push-in 1.00 → ~2.0 over 84 fr, accelerating (17 → 72 %/s), drift up-left | name ~2 letters per cell (±0.25 s); easings.inOutSine (suggested) | hard-cut | hit |
| 8 | 19.77–21.63 | 593–649 | feature | close crop on banner tagline and name; travel across the banner to portrait and contact block | dolly up-right ~450–700 px/s @1920, scale ~2.0 held | easings.inOutSine 56 fr (suggested); settles by 20.77 s | hard-cut | none |
| 9 | 21.63–23.50 | 649–705 | feature | portrait crop opens to the whole cover page with a skills ticker under it | pull-out ~2.0 → 1.0 over 56 fr (-10 to -27 %/s) | springs.cameraOut (overshoot not measurable); cursor arrow on page | continuous | whoosh |
| 10 | 23.50–26.63 | 705–799 | feature | page becomes a desk monitor screen, blue backlight, plant, keyboard; 3 icon + verb rows right of it | pull-out continues, monitor to ~50 % W by 26.50 s | verb rows in 24.50 s, grow to ~4 % H by 26.50 s (±0.25 s); easings.outQuint (suggested) | hard-cut | whoosh |
| 11 | 26.63–28.69 | 799–861 | feature | empty flat light grey hold | locked frame, nothing moves | none; 62 fr hold | end | none |

Evidence per row: 1 `sheet-01 cells 0–8`; 2 `sheet-01 cells 9–15, sheet-02 cells 0–3`; 3 `sheet-02 cells 4–15`, `cuts/cut-007.93.jpg`; 4 `sheet-03 cells 0–15`, `cuts/cut-011.77.jpg`; 5 `sheet-04 cells 0–11`, `cuts/cut-014.83.jpg`; 6 `sheet-04 cells 12–15, sheet-05 cells 0–3`, `cuts/cut-016.97.jpg`; 7 `sheet-05 cells 4–15`, `cuts/cut-019.77.jpg`; 8 `sheet-06 cells 0–6`, `cuts/cut-021.63.jpg`; 9 `sheet-06 cells 7–13`; 10 `sheet-06 cells 14–15, sheet-07 cells 0–10`, `cuts/cut-026.63.jpg`; 11 `sheet-07 cells 11–15, sheet-08 cells 0–2`.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| typewriter | 1, 2, 3, 7 | craft/vocabulary.md#type, studio API `Typewriter` |
| tilt-plane | 3, 4, 5, 6 | craft/vocabulary.md#camera, `TiltPlane` |
| device-browser | 5, 6 | craft/vocabulary.md#ui, `BrowserFrame` |
| push-in | 7 | craft/vocabulary.md#camera, `Camera` |
| dolly | 8 | craft/vocabulary.md#camera, `Dolly` |
| pull-out | 9, 10 | craft/vocabulary.md#camera, `Camera` (cameraOut) |
| hard-cut | 3–8, 10 | craft/vocabulary.md#transitions |

## Look
Palette: #EBEBEB background grey, #233332 dark text, #2C6766 teal accent (name, leads), #356A68 banner teal, #293E6B desk blue, #B9C4C4 faded text. Skill words each take their own colour (blue, green, coral). Type: serif text face; small regular lines ~4 % H, skill words ~6–7 % H, first one in wide-tracked caps. Treatment: none. Background: flat light grey for the type and screens; footage-like desk scene for row 10.

## What to adapt
- Copy: greeting 3–5 words; label 3 words + name; 3–4 lead phrases of 2–3 words; 3–4 one-word skills; 2-line closing claim; 3 verbs.
- Brand: accent carries the name and leads; each skill word gets one colour from the brand set; tool logos are the user's stack.
- Timing: the typing rows follow the VO and may stretch; the screen rise per skill should stay ~1.5 s; the push-in, dolly and pull-out (rows 7–10) keep their frame counts.

## Pitfalls
- Rows 1–3 are one shot: no cuts until 7.93 s; use `continuous`, not cuts, between greeting, name and first skill.
- The camera speed rises inside row 7 (17 → 72 %/s); a constant push looks flat.
- The 1.3 s empty frame at 7.93 s and the 2 s empty tail read as dead air without VO.

## Missing components
- LetterCascade: letters of one word drop in on a diagonal, offset baselines, ~4 fr stagger, ~2 letters per 0.25 s (techniques: proposed letter-cascade)
- DeskMonitorScene: a monitor on a desk with backlight; a full-page image plays on its screen while the camera pulls out from screen-fill to ~50 % W over ~90 fr (techniques: pull-out)

## Proposed terms
- letter-cascade: a word built letter by letter on a falling diagonal, each letter landing on its own baseline (rows 4, 5)
- swash-underline: a hand-drawn curved stroke drawn under a word as it lands (row 3)
- desk-monitor-pullout: pull out from a full-screen page until it sits on a monitor in a desk scene (rows 9, 10)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strip was made. Not measurable: overshoot, stagger below 7.5 fr, exact easing curves (named ones are suggested), screen tilt angle (estimated from the sheets). Pan and zoom speeds from motion.json. SFX planned by the glue rule, not measured (mix is music + VO). cut_on_beat = 2/7 cuts within ±2 fr (11.77, 16.97).

## Study log
id typed-intro-skill-screen-showcase · family kinetic-type (catalogue hinted logo-brand; no mark moment on the sheets) · 28.69 s · 11 rows from 7 hard cuts plus 3 state-change splits
techniques 7 · cut_on_beat 2/7 (false) · energy build (1 cut in the first third, 3 in the last)
not measurable at 0.25 s: overshoot, letter stagger, easing curves, tilt angle
proposed terms: letter-cascade, swash-underline, desk-monitor-pullout
missing components: LetterCascade, DeskMonitorScene
phase B: not run
