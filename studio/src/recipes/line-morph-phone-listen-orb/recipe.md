# Wordmark line morphs into a phone with a listening orb

A two-bar mark shrinks and unfolds into a wordmark, a line splits it and widens into a white phone; a reading screen with word highlights gives way to an assistant screen with a big gradient orb, then a quiet closing line.

Source: https://www.raylight.app/templates/fVAR6JLl (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A mobile reading, listening or voice-assistant app with two hero screens
- One continuous shot from logo to product, no cuts, silent autoplay
- A soft pastel brand that wants calm, premium motion instead of fast cutting
- Showing an AI or voice mode as an orb rather than a chat thread
Not for: products whose value needs many screens or fast proof; dark, high-energy brands; films with VO that needs cuts on the beat.

## Format
16:9 · 25.43 s · 30 fps · light · no music (silent), cut_on_beat n/a · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.25 | 0–38 | hook | two-bar mark, white, large, centred on a blurred peach / slate-blue field | bg push-in ~0.1 %/s; mark scale 1.00→0.28 | holds to 0.27 s, shrinks by 1.00 s, closest easings.inOutSine ~22 fr (±0.25 s), slides left to the wordmark start | continuous | none |
| 2 | 1.25–2.25 | 38–68 | logo | mark becomes the first glyph of a two-word wordmark, wiped on left to right behind a thin vertical bar | bg push-in ~0.1 %/s | bar appears at 1.27 and travels right; word one bold, word two regular; full at 1.77 (~15 fr, ±0.25 s); hold to 2.00 | continuous | shimmer (planned) |
| 3 | 2.25–3.25 | 68–98 | reveal | words part, a vertical line grows in the gap, words fade, the line fattens to a pill and then to the phone body | bg push-in ~0.2 %/s | 2.27 words apart ~0.1 W, line ~33 % H; 2.50 line ~68 % H; 2.77 pill ~4 % W; 3.00 phone ~7 % W × 67 % H; springs.layout (overshoot not measurable), ~8 fr per stage (±0.25 s) | continuous | swoosh-short (planned) |
| 4 | 3.25–8.50 | 98–255 | feature | reader screen: header, serif paragraph with current words dark bold, rest faded, progress bar, playback controls | bg push-in 0.3–0.6 %/s; phone 1.00→1.11 from 4.00 to 8.00 (±3 %) | UI fades in 3.27→3.77 (~15 fr, ±0.25 s); highlight advances ~2 words/s; progress bar easings.linear | continuous | none |
| 5 | 8.50–9.25 | 255–278 | feature | reader content fades to a blank white phone with only the status bar | zoom −1.5 %/s at 9–10 s | content 1→0 from 8.50 to 9.00 (~15 fr, ±0.25 s), easings.linear; blank hold 1 cell | continuous | none |
| 6 | 9.25–12.75 | 278–383 | feature | assistant screen: header label + book line, gradient orb centre, hint line, 4 suggestion chips, mic and talk buttons | bg push-in ~0.1 %/s | fades in 9.27; orb ~0.35→1.00 by 9.77 (~15 fr), springs.ui (overshoot not measurable); chips in by 10.27; chips + hint out 12.50→12.77 | continuous | swell (planned) |
| 7 | 12.75–22.75 | 383–683 | feature | listening state: chips gone, larger orb holds centre, header and two round buttons only | bg push-in 0.3–0.5 %/s; phone 1.00→1.21 from 13.00 to 22.00 (±3 %) | orb ~1.00→1.35 by 13.00 (springs.ui, overshoot not measurable); gradient slowly shifts (amplitude not measurable at 4 fps) | continuous | none |
| 8 | 22.75–24.00 | 683–720 | feature | phone turns translucent and shrinks away into the field | zoom −0.7 %/s at 22–23 s | opacity 1→0 22.77→23.77 (~30 fr, ±0.25 s), scale 1.00→0.86, easings.inExpo suggested; empty field at 23.77 | continuous | whoosh (planned) |
| 9 | 24.00–25.43 | 720–763 | logo | closing credit line, 3 words, white, centred | bg push-in ~0.4 %/s | blur-in with a small rise, second part lags ~1 cell, settled 24.50 (~15 fr, ±0.25 s); holds to end | end | tick (planned) |

Evidence per row (no cuts in cuts.json, so no cut frames):
1. sheet-01 cells 0–4; keyframe kf-000.50
2. sheet-01 cells 4–8; kf-001.50
3. sheet-01 cells 9–12; kf-002.50
4. sheet-01 cells 13–15, sheet-02 cells 0–15, sheet-03 cells 0–1; kf-005.50
5. sheet-03 cells 2–4
6. sheet-03 cells 5–15, sheet-04 cells 0–2; kf-010.50
7. sheet-04 cells 3–15, sheet-05 all, sheet-06 cells 0–10; kf-013.50, kf-016.50, kf-019.50, kf-022.50
8. sheet-06 cells 11–15
9. sheet-07 cells 0–5

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| morph | 1–3 (mark → wordmark → line → phone) | craft/vocabulary.md#transitions |
| device-phone | 3–8 | craft/vocabulary.md#ui, PhoneFrame |
| ui-rebuild | 4–7 (reader and assistant screens) | craft/vocabulary.md#ui |
| push-in | 1–9 (background creep), 4 and 7 (phone scale) | craft/vocabulary.md#camera, KenBurns |
| blur-in | 9 | craft/vocabulary.md#type, BlurIn |
| mesh-gradient | 1–9 (blurred two-hue field) | craft/vocabulary.md#look |

## Look
Palette: #E1AFA0 peach background, #FEFEFE white (mark, phone, type), #B39DA1 mauve mid-tone, #98A5B8 slate blue, #7A7786 dark corner shade, #CB9488 deep peach (orb uses peach → grey-blue linear gradient). Type: geometric grotesk wordmark, bold + regular words, ~6 % H; small sans UI labels and a serif reading text; closing line bold rounded grotesk ~3 % H. Treatment: mesh-gradient. Background: blurred gradient field, peach top-right, slate blue left with a darker blob bottom-left.

## What to adapt
- Copy: wordmark (2 words), reader paragraph (own or public-domain text, ~60 words), assistant header (≤ 4 words), hint line, 4 chips (≤ 5 words each), closing line (≤ 4 words).
- Brand: background pair = brand accent + a cool complement; orb gradient uses the same two hues; phone stays white.
- Timing: row 7 (10 s listening hold) is the stretchy one; rows 1–3 keep their frame counts so the morph chain reads.

## Pitfalls
- The morph chain lives in 3 s; each stage is ~1 cell (7–8 fr). Slower stages break the "one line becomes the phone" illusion.
- No cuts at all: do not add hard cuts between the two screens; the swap is a fade to a blank white phone (rows 5–6).
- The 10 s listening hold is long for social; without the subtle orb gradient shift and the slow phone push-in the frame reads as frozen.

## Missing components
- LineToDeviceMorph: a vertical line grows (0→68 % H), fattens to a pill (4 % W), then to a rounded phone body (7 % W × 67 % H) in ~3 × 8 fr, then hands over to PhoneFrame (techniques: morph, device-phone)
- BarWipeWordmark: letters revealed left to right behind a thin moving vertical bar, ~15 fr for two words (techniques: morph)
- ReaderHighlight: paragraph where the current word(s) turn dark bold at ~2 words/s, rest at ~0.3 opacity, with a progress bar (techniques: ui-rebuild)

## Proposed terms
- bar-wipe wordmark: letters revealed behind a moving vertical bar, row 2 (not in craft/vocabulary.md; not used in recipe.json)
- line-to-device morph: a line grows and fattens into a device silhouette, row 3 (not in craft/vocabulary.md; not used in recipe.json)
- reading highlight: word-by-word bold advance inside a paragraph, row 4 (not in craft/vocabulary.md; not used in recipe.json)
- listening orb: large gradient orb holding as the voice state, rows 6–7 (AgentOrb exists; no vocabulary id)

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strips taken). Not measurable: entrance frame counts below 0.25 s, spring overshoot, word stagger in row 9, orb breathing amplitude. Phone scale from sheet cell heights (±3 %); background zoom from motion.json. Palette from palettegen on kf-000.50, kf-006.50, kf-015.50 (no cut frames exist). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts (no cuts, no beats).

## Study log
- id line-morph-phone-listen-orb · family mobile-app · 25.43 s, 9 rows, one shot (0 cuts), all transitions continuous
- techniques 6 (morph, device-phone, ui-rebuild, push-in, blur-in, mesh-gradient)
- cut_on_beat n/a (silent, 0 cuts, 0 beats); all 5 sfx planned
- not measurable: sub-0.25 s entrances, overshoot, row 9 stagger, orb breathing
- proposed terms: bar-wipe wordmark, line-to-device morph, reading highlight, listening orb
- missing components: LineToDeviceMorph, BarWipeWordmark, ReaderHighlight
- phase B: not run
