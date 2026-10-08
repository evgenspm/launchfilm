# Typed name, rising phone, benefit chips

The app name types itself on a warm glow, a phone rises over it, tilts and sprouts three one-word benefit chips, then a macro close-up and a side profile with shallow focus before a short call to action and the name again.

Source: https://www.raylight.app/templates/0tu3irDD (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A consumer mobile app with one strong home screen to show
- Vertical feeds (stories, reels) where the product name must land in the first second
- Three one-word benefits (speed, safety, trust) that fit on chips
- A silent autoplay promo with a warm, friendly brand colour
Not for: products whose value needs a flow of several screens; the phone shows one static screen the whole time.

## Format
9:16 · 19.07 s · 30 fps · light · no music (bpm null), cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.27 | 0–38 | hook | product name, one word, typed, upper third; warm glow rising from the bottom | static | typewriter 7 letters in 0.77 s (~9 cps); glow fades up easings.inOutSine ~15 fr (±0.25 s); hold 15 fr | hard-cut | type-click |
| 2 | 1.27–3.27 | 38–98 | reveal | phone with the home screen rises from below over the name, settles face-on | drift 1.00→1.04 over 1.0 s | rise from +45 % H, springs.heavy ~22 fr (overshoot not measurable) | hard-cut | whoosh |
| 3 | 3.27–4.27 | 98–128 | feature | phone rolls to a 3/4 tilt and shrinks; chip 1 left | pull-out, width 78 % → 62 % W over 30 fr | ~25° z / ~30° y, springs.heavy ~24 fr; chip pops at 3.77, springs.pop ~10 fr (±0.25 s) | hard-cut | pop |
| 4 | 4.27–5.62 | 128–169 | feature | three chips around the tilted phone; hold; chips shrink | drift right ~4 % W | chips 2+3 pop together at 4.27 (springs.pop ~10 fr, ±0.25 s); hold 30 fr; chips out 8 fr from 5.27 | slide-push | pop |
| 5 | 5.62–6.73 | 169–202 | feature | phone flips flat and exits top; white breath; blurred close-up slides in from lower right | whip up, then slide-in | exit easings.inExpo ~10 fr; white 6.00–6.27; enter easings.outExpo ~14 fr, blur 14→6 px | slide-push | swoosh-short |
| 6 | 6.73–10.27 | 202–308 | feature | macro of the upper screen: header and two balance cards, tilted, shallow focus | push-in 1.00→1.05 over 3.0 s, accelerates up from 9.77 | rack-focus sharpens figures 6.73–7.50 (springs.heavy ~22 fr); hold 7.50–9.50 | hard-cut | none |
| 7 | 10.27–11.00 | 308–330 | feature | camera travels down past list and tab bar; phone exits bottom; white | dolly down ~1700 px/s @1920, easings.inExpo | content out within 15 fr (±0.25 s); 10.77–11.00 empty white | slide-push | swoosh-short |
| 8 | 11.00–14.22 | 330–427 | feature | side profile turns in from left to a 3/4 view; soft focus | yaw turn ~60° (11.00–11.77) then drift 1.00→1.03 | springs.heavy ~24 fr; screen rack-focus maxBlur ~6 px; glow returns 11.27–11.77 | zoom-through | whoosh |
| 9 | 14.22–15.00 | 427–450 | feature | camera flies into the screen; layers blur into the warm radial glow | zoom-through 1.0→3.0 over 16 fr, easings.inExpo | blur 0→20 px and fade, done by 14.77 | blur-dissolve | none |
| 10 | 15.00–17.00 | 450–510 | cta | call to action, 3 words, white on a centred orange radial glow | static | blur-in 12 px→0, easings.outExpo ~8 fr (±0.25 s); hold 52 fr | blur-dissolve | none |
| 11 | 17.00–19.07 | 510–572 | logo | product name in white on the glow; then all fades to white | static | swap ≤ 8 fr (±0.25 s); hold to 18.00; fade to white easings.inOutSine ~23 fr; white 9 fr | hard-cut | none |

Evidence per row: 1 sheet-01 cells 0–5; 2 sheet-01 cells 5–12; 3 sheet-01 cells 13–15, sheet-02 cell 0; 4 sheet-02 cells 1–5, cuts/cut-005.20.jpg; 5 sheet-02 cells 6–10, cuts/cut-006.23.jpg; 6 sheet-02 cells 11–15, sheet-03 cells 0–8; 7 sheet-03 cells 9–11; 8 sheet-03 cells 12–15, sheet-04 cells 0–7, cuts/cut-013.67.jpg; 9 sheet-04 cells 8–11; 10 sheet-04 cells 12–15, sheet-05 cells 0–3; 11 sheet-05 cells 4–12.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| typewriter | 1 | craft/05 (Typewriter) |
| device-phone | 2–9 | craft/03, PhoneFrame |
| push-in | 2, 6, 8 | craft/03#drift-and-push-in |
| slide-push | 4, 5, 7 | craft/09 |
| rack-focus | 6, 8 | craft/03 (RackFocus) |
| dolly | 7 | craft/03 (Dolly) |
| zoom-through | 8, 9 | craft/09 (ZoomThrough) |
| blur-in | 10 | craft/05#table-of-the-rest |
| blur-dissolve | 9, 10 | craft/09#blur-dissolve |
| glow | 1–11 | look: one soft radial brand glow (BrandBackdrop) |

## Look
Palette: #FFFFFF background, #0F0E0E device frame / dark type, #DC7852 accent glow core, #ED9B75 glow mid, #F6D7BF glow edge, #453C3B device metal shadow. Type: rounded humanist sans, semibold, sentence case; name ~4 % H, dark at the start, white at the end; chips small medium-weight labels with a line icon on translucent white pills. Treatment: glow. Background: white with one warm radial glow (bottom-anchored early, centred at the end).

## What to adapt
- Copy: name (1 word), 3 chips (1 word each, with an icon), call to action (2–4 words). 4 lines total.
- Brand: the accent drives the glow and the screen header; logo not needed (name is typed text).
- Timing: rows 6 and 8 stretch (macro holds); rows 1, 5, 7, 9 keep their frame counts, they carry the rhythm.

## Pitfalls
- No hard cuts: every change is carried by phone motion. A plain cut between rows 4→5 or 7→8 breaks the flow.
- The two white breaths (6.00–6.27 and 10.77–11.00, 8 and 7 fr) reset the eye; longer than ~10 fr reads as a glitch.
- Chips 2 and 3 land together, 0.50 s after chip 1; three equal staggers feel mechanical.
- Keep the macro blur strong at the edges (rack-focus); a sharp macro of a 2.5D frame looks flat.

## Missing components
- Phone3DPose: phone with real thickness, side buttons and camera bump, posable in yaw/pitch/roll ±90° with correct edge rendering (row 8 shows an edge-on side profile; PhoneFrame tilt is 2.5D). (techniques: device-phone)
- BenefitChip: pill with line icon + 1 word, translucent white with soft shadow, pops with springs.pop, anchored to points around a moving phone. (techniques: none in vocabulary)

## Proposed terms
- benefit-chip-pop: one-word benefit pills popping around a device and following it (rows 3–4). Not in craft/vocabulary.md; not used in recipe.json.

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strips extracted). Not measurable: spring overshoot of the phone and the chips, exact chip entrance frames, typing cadence jitter, blur radii (estimated from sheets). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no music).

## Study log
id typed-name-phone-chip-tour · family mobile-app (hint said social-promo; phone-first content wins) · 19.07 s, 11 rows, 0 hard cuts, 3 soft transitions.
10 techniques; cut_on_beat n/a (silent, no cuts).
Not measurable at 0.25 s: overshoot, chip pop frames, blur radii.
Proposed terms: benefit-chip-pop. Missing components: Phone3DPose, BenefitChip.
phase B: not run.
