# Dot portal into a grain-wave brand reveal

A one-word hook on cream whose letter dot opens into a dark scene with a drifting grainy green wave; short serif lines blur in, the mark grows, a dashboard pulls out to full view, then a typed URL and a mark hold close it.

Source: https://www.raylight.app/templates/36rUTa1B (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A calm launch for a web app with one dashboard screenshot worth showing
- Brand reveal where the mark and a two-tone name carry the middle of the film
- A serif, premium voice with music only and no voice-over
- Closing on a typed URL and a quiet mark hold
Not for: products with no round letter or dot in the hook word; feature-dense tours (only one UI screen, ~3.5 s).

## Format
16:9 · 15.98 s · 30 fps · dark (cream hook 0.93 s) · music 118.9 BPM, cut_on_beat 0/1 · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.93 | 0–28 | hook | one short word, black serif on cream, one letter a solid dot | push-in ~1.00→1.15 to 0.77 s | scale up easings.inOutSine ~28 fr (±0.25 s), motion blur last ~3 fr; dot becomes a disc mask | hard-cut | whoosh |
| 2 | 0.93–2.00 | 28–60 | problem | dark ground, grainy green wave; serif line, 4 words, names the finished chore | drift (wave only) | disc expands to full frame by 1.00 s; line blur-in easings.outExpo ~8 fr (±0.25 s), sharp 1.27 s; blur-out before 2.00 s | continuous | none |
| 3 | 2.00–3.00 | 60–90 | reveal | intro line, 2 words: verb + two-tone product name | drift (wave only) | blur-in from 2.00 s, sharp 2.27 s (outExpo ~8 fr, ±0.25 s); blur-out ~2.85 s | continuous | none |
| 4 | 3.00–4.00 | 90–120 | logo | brand mark (line icon) alone on the wave | push-in on mark ~0.9x→1.9x by 3.77 s | springs.heavy ~23 fr (overshoot not measurable); strokes thicken into filled white glyph with glow; gone by 4.00 s | continuous | swell |
| 5 | 4.00–6.50 | 120–195 | feature | name returns upper centre, dissolves into a 4-word capability line built word by word | drift; line re-centres 4.77→5.00 s | name blur-in 4.27 s; crossfade into first word 4.50 s; words every ~0.25 s, each outExpo ~6 fr (±0.25 s); re-centre springs.ui; white glow grows to 6.27 s | continuous | none |
| 6 | 6.50–8.00 | 195–240 | feature | tilted dark document card lands centre, 2 large words left and right of it; card flies up and out | drift (wave only) | card in ~-15 deg springs.pop (overshoot not measurable); words blur-in 6.77 s; card exits up 7.00–7.50 s easings.inExpo ~12 fr (±0.25 s); words fade by 7.77 s | continuous | none |
| 7 | 8.00–9.50 | 240–285 | reveal | dashboard close-up, cropped top-left: greeting, 4 stat tiles, flagged rows | detail tier drift, fast pull-out from 9.27 s | appears ~7.87 s (±0.25 s); pull-out springs.cameraOut ~15 fr (±0.25 s) with motion smear at 9.50 s | continuous | swoosh-short |
| 8 | 9.50–11.50 | 285–345 | feature | full dashboard in a dark rounded window over the wave | full tier, settled 9.77 s; slides up from 11.00 s | hold ~1.2 s; exits up easings.inExpo, gone by 11.50 s (±0.25 s) | continuous | none |
| 9 | 11.50–14.00 | 345–420 | cta | wave, then site URL typed in small white serif, held | drift (wave only) | typewriter from 11.77 s, ~16 chars in ~1.0 s (~16 cps), done 12.77 s; hold 1.0 s | continuous | type-click |
| 10 | 14.00–15.98 | 420–479 | logo | brand mark small, white, in the dip of the wave, held to the end | drift; mark ~1.6x→1.0x 14.00–14.27 s | springs.snappy ~8 fr (overshoot not measurable); hold 1.7 s | end | shimmer |

Evidence per row: 1 `sheet-01 cells 0–3`, `cuts/cut-000.93.jpg`; 2 `sheet-01 cells 4–7`; 3 `sheet-01 cells 8–11`; 4 `sheet-01 cells 12–15`; 5 `sheet-02 cells 0–9`; 6 `sheet-02 cells 10–15`, `keyframes/kf-007.50.jpg`; 7 `sheet-03 cells 0–6`; 8 `sheet-03 cells 7–9, 10–13`, `keyframes/kf-010.50.jpg`; 9 `sheet-03 cells 14–15`, `sheet-04 cells 0–7`; 10 `sheet-04 cells 8–15`.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| portal | 1–2 | craft/vocabulary.md#transitions (PortalZoom, PortalWord) |
| push-in | 1, 4 | craft/vocabulary.md#camera |
| blur-in | 2, 3, 5, 6 | craft/vocabulary.md#type (BlurIn) |
| word-reveal | 5 | craft/vocabulary.md#type (WordReveal) |
| pull-out | 7 | craft/vocabulary.md#camera |
| device-browser | 7–8 | craft/vocabulary.md#ui (ScreenSlot chrome window) |
| typewriter | 9 | craft/vocabulary.md#type (Typewriter) |
| end-card | 9–10 | craft/vocabulary.md#brand |
| grain | 2–10 | craft/vocabulary.md#look (Grain) |
| glow | 4, 5 | craft/vocabulary.md#look |

## Look
Palette: #000101 background, #F9F8F3 cream hook bg and white type, #094222 wave green, #4F795B wave highlight / name accent, #1D1F1E dashboard surface, #4C4D4A muted. Type: bold transitional serif, sentence case; hook ~14 % H, lines ~4 % H, split pair ~7 % H, URL ~3 % H. Treatment: grain, glow. Background: near-black with one wide grainy green sine band that drifts and changes phase the whole film; cream flat only in row 1.

## What to adapt
- Copy: hook word (1 word with a round letter), problem line (~4 words), intro (verb + name), capability line (~4 words), split pair (2 words), URL.
- Brand: accent green carries the wave and the second half of the name; mark appears at rows 4 and 10.
- Timing: rows 1–4 are ~1 s each on a ~2-beat grid (118.9 BPM); keep them. Rows 5, 8 and 9 can stretch.

## Pitfalls
- The disc mask must open from the exact position of the letter dot, otherwise the single cut reads as a jump.
- The wave must never stop; it is what makes the one-shot body feel continuous (no cuts after 0.93 s).
- Serif lines are small (~4 % H); keep contrast high, no text over the brightest part of the band.

## Missing components
- GrainWaveBand: wide sine band in the accent colour, heavy grain, soft edges, amplitude ~25 % H, phase drift ~0.1 cycle/s, slight vertical travel (techniques: grain, glow)
- TiltedDocCard: small dark document card with line rows and an accent bar, tilt ~-15 deg, flies off on a rotation (techniques: blur-in)

## Proposed terms
- `grain-wave`: one large grainy accent band drifting behind the whole film, rows 2–10 (not in craft/vocabulary.md; not used in recipe.json)
- `dot-portal`: a letter dot or round glyph of a word becomes the disc that opens into the next scene, row 1 (close to `portal`, which is used)

## Measurement notes
Resolution: 0.25 s from sheets; no 30 fps strips extracted. Not measurable: entrance lengths, springs and overshoot, word stagger, exact dashboard entry (~7.87 s, motion.json near-miss at 7.867 s), exact URL exit. Zoom and pan of rows 7–8 from motion.json. Palette from palettegen on keyframes 0.50, 1.50, 6.50, 10.50, 14.50. SFX planned by the glue rule, not measured. cut_on_beat = 0/1 cuts within ±2 fr (cut 0.93 s, nearest beat 1.08 s).

## Study log
- id: dot-portal-wave-dashboard-reveal · family logo-brand · 15.98 s · 10 rows · 1 hard cut
- techniques: 10 (portal, push-in, blur-in, word-reveal, pull-out, device-browser, typewriter, end-card, grain, glow)
- cut_on_beat: false (0/1); music 118.9 BPM, no VO
- not measurable at 0.25 s: springs, overshoot, stagger, entrance frame counts
- proposed terms: grain-wave, dot-portal
- missing components: GrainWaveBand, TiltedDocCard
- phase B: not run
