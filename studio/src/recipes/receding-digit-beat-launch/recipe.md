# Receding digits on the beat, then a launch lockup

Five oversized gradient digits descend to one, each arriving blurred on a music beat and sinking into depth; a hard cut lands a name-plus-status lockup on near-black with a violet light ribbon, then a short sign-off line.

Source: https://www.raylight.app/templates/drqfpfhx (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- Announcing that a product, feature or event has just launched
- A short opener before a longer launch film, built on a slow 80-90 BPM track
- A teaser with no UI to show yet, only the name
- Event screens or social posts that need a number-sequence hook in under 4 s
Not for: films that need to explain a feature or show UI; fast tracks (above ~110 BPM the digits never read).

## Format
16:9 · 9.43 s · 30 fps · dark · music 83.0 BPM, cut_on_beat 0/1 (false) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–3.67 | 0–110 | hook | five single digits high to low, one per beat, each larger than the frame height, on a dark wine radial field with a thin violet hairline curve | locked; depth from the digits: each scales ~1.6x → ~1.2x of H across its ~22 fr life (±0.25 s); last digit sinks to ~16 % H by 3.63 s | digit n enters on beat n (0.17, 0.72, 1.44, 2.17, 2.89 s) oversized and blurred, sharpens within ~7 fr on easings.outExpo (±0.25 s), recedes slowly; replaced by the next, no visible crossfade; last digit recedes on easings.inExpo ~4 fr (±0.25 s) | hard-cut | hit per digit (planned) |
| 2 | 3.67–6.70 | 110–201 | logo | lockup on near-black: small product-name label over a two-word status statement, centred; hairline grows into a soft violet light ribbon top-right | locked; ribbon drifts and widens (~+2 %/s at 6–7 s, motion.json) | statement lands ~2x and settles by ~4.27 s, ~18 fr springs.heavy (overshoot not measurable); label fades in ~7 fr (±0.25 s); pale-pink light sweep left to right through the statement 4.27–4.77 s (±0.25 s); hold ~1.9 s | continuous | impact-low on the cut, shimmer on the sweep (planned) |
| 3 | 6.70–9.43 | 201–283 | outro | lockup replaced by one short sign-off line (3 words) centred; violet ribbon crosses the frame diagonally, a glint rides it at the end | locked; ribbon keeps drifting, glint travels along it 9.00–9.27 s | swap within ~7 fr (±0.25 s); line grey → white by 7.00 s; light sweep through its letters 7.27–7.77 s (±0.25 s); exit blur + fade from ~9.10 s, ~10 fr (±0.25 s); music silent from 7.06 s | end | shimmer (planned) |

Evidence per row:
1. `sheet-01` cells 0–14 (0.00 empty field; 0.27/0.50 first digit; 0.77/1.00 second digit blurred then sharp; 1.27 sharp; 1.50/1.77/2.00 third; 2.27/2.50/2.77 fourth; 3.00/3.27/3.50 fifth), `cuts/cut-003.67.jpg` left (last digit small), `keyframes/kf-001.50.jpg` (blurred digit at arrival).
2. `sheet-01` cell 15 (3.77 red label, cut 3.67), `cuts/cut-003.67.jpg` right (statement oversized), `sheet-02` cells 0–10 (4.00–6.50; sweep visible 4.27–4.77), `keyframes/kf-004.50.jpg`.
3. `sheet-02` cells 11–15 (6.77 grey line, 7.00 white, 7.27–7.77 sweep), `sheet-03` cells 0–5 (8.00–9.27; glint 9.00, blur exit 9.27), `cuts.json` near-miss 6.70.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| counter | 1 | craft/vocabulary.md#type (stepped digits, one per beat, not a rolling ticker) |
| kinetic-depth | 1 | craft/vocabulary.md#type (digits travel in Z away from camera) |
| glow | 2–3 | craft/vocabulary.md#look (violet light ribbon, soft halo) |
| vignette | 1 | craft/vocabulary.md#look (dark corners around the wine radial field) |

## Look
Palette: #772143 wine field (row 1 background), #0F0D17 near-black (rows 2–3 background), #FFFFFF type, #FE02F7 magenta digit end, #AC06F3 violet digit start, #8346F7 ribbon violet. Type: heavy grotesk, numerals and sentence case, tight tracking; digits 100–200 % H with a violet → magenta horizontal gradient; status statement bold ~17 % H white, label bold ~6 % H; sign-off bold ~7 % H. Treatment: vignette, glow. Background: radial gradient (row 1), flat near-black with a moving light ribbon (rows 2–3).

## What to adapt
- Copy: product name (label, 1–3 words or the logo), status statement (2 words, the launch fact), sign-off (≤ 4 words).
- Brand: the two accents carry the digit gradient; the ribbon uses the cooler accent; logo replaces the label.
- Timing: digits are locked to beats (one per beat, 21.7 fr at 83 BPM); retime them with the track. The lockup hold (91 fr) and sign-off (82 fr) can stretch.

## Pitfalls
- Each digit lives only ~22 fr and is blurred for the first ~7 fr of it: keep the digits huge and simple, numerals only.
- The cut to the lockup lands ~1.7 fr after where the next beat would fall; put it exactly on the beat in a rebuild.
- Digits overflow the frame (cropped top and bottom); do not shrink them to fit, the crop is the scale cue.

## Missing components
- RecedingDigits: sequence of single digits, one per beat; each enters at ~1.6x H with 30 px blur, sharpens in 7 fr (outExpo), shrinks to ~1.2x H over its life, gradient fill from two accents; last one sinks to 16 % H (techniques: counter, kinetic-depth)
- LightRibbon: soft-edged violet band with a bright hairline edge, drifts and widens over 5 s, a glint travels along it (techniques: glow)

## Proposed terms
- receding-digit: a numeral that arrives oversized and blurred and sinks into depth before the next replaces it, row 1 (not in craft/vocabulary.md; not used in recipe.json)
- light-ribbon: a moving soft light band with a lit edge as the background element, rows 2–3 (not in craft/vocabulary.md; not used in recipe.json)
- letter-light-sweep: a pale highlight passing through the letters of a settled line, rows 2–3 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strips extracted). Not measurable: entrance blur duration, spring overshoot on the statement landing, exact swap at 6.70 s, sweep speed, exit length. SFX planned by the glue rule, not measured. cut_on_beat = 0/1 cuts within ±2 fr (3.667 s; nearest listed beat 2.891 s). Palette from palettegen on cut-003.67.jpg, kf-002.50.jpg, kf-007.50.jpg.

## Study log
id receding-digit-beat-launch · family data-stats · 9.43 s, 3 rows (1 hard cut at 3.67, state change at 6.70)
techniques 4 (counter, kinetic-depth, glow, vignette) · cut_on_beat 0/1 · energy calm · VO no
not measurable at 0.25 s: digit sharpen time, statement overshoot, swap and exit frame counts (marked ±0.25 s)
proposed terms: receding-digit, light-ribbon, letter-light-sweep
missing components: RecedingDigits, LightRibbon
phase B: not run
