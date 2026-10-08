# Macro phone screen glide with a hero pull-back

Four equal close-ups glide across one phone home screen in a dark blue void with shallow focus, each on one region (header, actions, balance, tab bar), then the whole device rises into a centred hold. Quiet, premium, one screen is enough.

Source: https://www.raylight.app/templates/z21E5wed (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A mobile app with one strong home screen and no story to tell yet
- Silent loop or background reel for a fintech or consumer app page
- A premium, calm teaser with no copy and no VO
- Opening a longer film with a tactile look at the UI before features
Not for: apps whose value is a flow (multiple screens, interaction); films that need a claim or a CTA.

## Format
16:9 · 19.3 s · 30 fps · dark · no music (silent), cut_on_beat n/a (0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–3.87 | 0–116 | hook | macro on the top of the screen: status bar, avatar, search pill, two icon buttons; deep blue gradient | hold 0.00–1.00, then push-in 1.00→1.25 (±0.05), roll -1.3 deg/s, drift down | tilt-plane, shallow focus on the search row; push easings.inOutSine 86 fr (±0.25 s); no UI animation | hard-cut | none |
| 2 | 3.87–7.73 | 116–232 | feature | macro lower: four round action buttons with labels, two transaction rows, a see-all link | dolly: plane drifts up ~25 % H over 116 fr, easings.linear (±0.25 s) | rack-focus from first row (sharp 5.00–6.00) to second row (sharp by 6.77), ~45 fr easings.inOutSine (±0.25 s) | hard-cut | swoosh-short |
| 3 | 7.73–11.60 | 232–348 | feature | steep diagonal macro on the balance block: account label, large figure with small decimals, pill under it | dolly + push-in: down-right ~50 px/s @1920, +6 %/s, roll -4 deg/s, 116 fr | screen rolled ~30 deg, focus on the figure; easings.linear drift | hard-cut | swoosh-short |
| 4 | 11.60–15.43 | 348–463 | feature | low-angle macro on the bottom corner: card edge, section label, five-tab bar; device body edge visible | push-in +8 %/s + drift up-right ~35 px/s @1920, 115 fr | device-3d body with rim highlight; tab bar sharp, card above soft; easings.linear | hard-cut | swoosh-short |
| 5 | 15.43–19.30 | 463–579 | feature | empty dark blue backdrop with grey glow top-right; whole phone rises from below into a centred front view, holds, exits up | static | empty 10 fr; device rises, settles by 17.00, springs.heavy ~37 fr (overshoot not measurable); hold 17.00–19.00; exit up by 19.27, easings.inExpo ~8 fr (±0.25 s) | hard-cut | swell |

Evidence per row:
1. sheet-01 cells 0–15 (0.00–3.77), cuts/cut-003.87.jpg (before)
2. sheet-01 cell 15 → sheet-02 cells 0–14 (4.00–7.50), cuts/cut-003.87.jpg (after), cuts/cut-007.73.jpg (before)
3. sheet-02 cell 15 (7.77) → sheet-03 cells 0–14 (8.00–11.50), cuts/cut-007.73.jpg (after), cuts/cut-011.60.jpg (before)
4. sheet-03 cell 15 (11.77) → sheet-04 cells 0–13 (12.00–15.27), cuts/cut-011.60.jpg (after), cuts/cut-015.43.jpg (before)
5. sheet-04 cells 14–15 (15.50, 15.77), sheet-05 cells 0–13 (16.00–19.27), cuts/cut-015.43.jpg (after)

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| device-phone | 1–5 | craft/vocabulary.md#ui, PhoneFrame |
| device-3d | 4, 5 | craft/vocabulary.md#3d (body thickness, rim light) |
| tilt-plane | 1–4 | craft/vocabulary.md#camera, TiltPlane |
| push-in | 1, 3, 4 | craft/vocabulary.md#camera, Camera/KenBurns |
| dolly | 2, 3, 4 | craft/vocabulary.md#camera, Dolly |
| rack-focus | 2 (shallow focus in 1–4) | craft/vocabulary.md#camera, RackFocus |
| hard-cut | 1–4 | craft/vocabulary.md#transitions |
| vignette | 1–5 | craft/vocabulary.md#look |

## Look
Palette: #020438 background navy, #7386C5 light UI text/pills, #0F37E0 screen blue, #3665F0 screen highlight, #303146 dark card grey, #0A0E42 deep shadow. Type: UI type only, no overlay copy; hero figure ~18 % H in macro. Treatment: vignette. Background: dark navy gradient with one soft grey glow top-right (row 5).

## What to adapt
- Copy: none; the screen carries it. One hero figure (balance or total) for row 3.
- Brand: screen gradient takes the brand accent; backdrop stays near-black in the same hue.
- Timing: all five shots are ~116 fr; keep them equal. Row 5 hold can stretch to make a loop or end card.

## Pitfalls
- Every macro shot moves; a still macro reads as a screenshot. Keep push or drift running for the full 116 fr.
- Focus band must be narrow (one row sharp); without heavy blur the macro looks flat.
- Row 2 cut lands on the same screen region boundary as row 1 ends; regions must not overlap or the cut reads as a jump.

## Missing components
- DeviceRise: phone enters from below frame, grows small → full height, settles on springs.heavy ~37 fr, then exits upward ~8 fr (techniques: device-phone, device-3d)

## Proposed terms
- device-rise: the full device enters from below into a centred hold after macro shots (row 5) (not in craft/vocabulary.md; not used in recipe.json)
- macro-region-tour: a series of equal macro close-ups, one screen region each, on one tilted screen (rows 1–4) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips taken. Scales and pans from motion.json per-second model, rounded. Not measurable: spring overshoot on the device rise, exact focus-shift duration, exit length. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/4 cuts within ±2 fr (no beats).

## Study log
id phone-macro-focus-glide · family mobile-app · 19.3 s, 5 rows (4 hard cuts, shots ~116 fr each)
techniques: 8 (device-phone, device-3d, tilt-plane, push-in, dolly, rack-focus, hard-cut, vignette)
cut_on_beat: n/a, no audio (0/4)
not measurable: overshoot on device rise, focus-shift length, exit frames (±0.25 s)
proposed terms: device-rise, macro-region-tour
missing components: DeviceRise
phase B: not run
