# Dark card close-ups pulling out to a status line

Two tight crops of a near-black payment card, each with an oversized wordmark that lights up and fades to a hairline outline, then a cut out to the whole card and a one-line status message that slowly grows over it.

Source: https://jitter.video/template/the-vault-card-reveal/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A fintech or banking launch where a physical or virtual card is the hero
- A premium, quiet 1:1 product moment with no UI to show
- Closing a longer film on a delivered, issued or activated state
- A silent autoplay loop where the wordmark has to carry the brand
Not for: products without a physical object or a strong wordmark; anything that needs to explain features.

## Format
1:1 · 16.27 s · 30 fps · dark · no music (silent), cut_on_beat n/a · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–2.97 | 0–89 | hook | close-up on the card's top-left corner: masked number tail top, oversized wordmark start bottom, overflowing the right edge | drift 1.00→0.99 (block match −0.2 to −0.5 %/s) | wordmark fill lights up 0.00→1.50 (45 fr, easings.inOutSine, ±0.25 s); number tail lights 0.77→1.00; fill fades to a hairline outline 1.77→2.00 (±0.25 s); outline dims to 2.97 | match-cut | swell |
| 2 | 2.97–6.00 | 89–180 | logo | close-up on the card's top-right corner: network mark top, wordmark tail bottom, lit on the first frame | drift, pan under 4 px/s at 1920 wide | no entrance (lit on the cut, 1 fr seam at f89 on a 30 fps strip); hold 1.5 s; fill fades to outline 4.50→5.77 (38 fr, easings.inOutSine, ±0.25 s) | match-cut | swoosh-short |
| 3 | 6.00–7.00 | 180–210 | logo | cut out to the whole card centred, 47 % of frame width, almost black, wordmark a ghost | static | card face holds dark; lower edge fades into black (vertical gradient) | hard-cut | none |
| 4 | 7.00–9.33 | 210–280 | logo | whole card: wordmark across the lower half and small network mark top right light up | static | wordmark light-on 7.00→7.50 (15 fr, easings.inOutSine, ±0.25 s); network mark from 7.27 (±0.25 s); hold 1.8 s | hard-cut | swell |
| 5 | 9.33–15.25 | 280–458 | outro | status line, 4 words, says the card has arrived, over the card centre; tiny attribution lockup (label, mark, wordmark) below | static on the card; the line alone scales 1.00→1.15 over 150 fr, decelerating | line and lockup fade in 9.33→9.80 (14 fr from a 30 fps strip, easings.outQuint); scale creep easings.outQuint 150 fr; card wordmark dims behind the line | hard-cut | notification |
| 6 | 15.25–16.27 | 458–488 | outro | same frame fading toward black | static | everything fades 31 fr, easings.linear (±0.25 s); last frame not fully black | hard-cut | none |

Evidence per row:
1. sheet-01 cells 0–11 (0.00–2.77), keyframe kf-001.50; 30 fps strip at 2.50 (cut on its frame 14).
2. sheet-01 cells 12–15, sheet-02 cells 0–7; 30 fps strip at 5.50 (cut on its frame 15).
3. sheet-02 cells 8–11, keyframe kf-006.50.
4. sheet-02 cells 12–15, sheet-03 cells 0–5.
5. sheet-03 cells 6–15, sheet-04 cells 0–12, keyframe kf-012.50; 30 fps strip at 9.00 (line first visible on its frame 10).
6. sheet-04 cells 13–15, sheet-05 cell 0.
cuts.json lists no cuts (0 hard, 0 soft): the two corner cuts happen on near-black frames below its threshold; there are no cuts/*.jpg.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| fit-word | 1, 2 | craft/vocabulary.md#type (FitWord); the wordmark overflows the frame width in both crops |
| light-on | 1, 2, 4 | craft/vocabulary.md#brand; the mark is revealed by light, not by motion |
| match-cut | 1→2, 2→3 | craft/vocabulary.md#transitions; same card edge and corner radius carried across the cut |
| pull-out | 2→3 | craft/vocabulary.md#camera; detail to context, done as a cut instead of a zoom |
| hard-cut | 3, 4, 5, 6 | craft/vocabulary.md#transitions |

## Look
Palette: #000000 background, #9C9C9C status text, #2B2B2B attribution and outline, #161616 card face top, #0C0C0C card face bottom, #202020 lit wordmark. Type: wordmark heavy geometric grotesk, sentence case, tight, cap height about 30 % H in the close-ups; status line regular grotesk, sentence case, 4 % H; attribution 2 % H. Treatment: none (no grain or vignette visible). Background: flat black; the card is a rounded rectangle with a vertical gradient, a 1 px light rim on the top edge, lower edge melting into black.

## What to adapt
- Copy: one status line, about 4 words, saying the card is ready or delivered; one small attribution label. Last 4 digits on the card.
- Brand: the wordmark is the only brand element on the card; the attribution lockup carries the mark. Use your own network-style mark, never a real card network logo. Keep everything grey; an accent would break the tone.
- Timing: rows 1 and 2 keep about 90 fr each; row 5 can stretch (it is a hold); row 3 dark beat must stay ≥ 30 fr.

## Pitfalls
- The whole film is below 10 % luminance until the status line: on bright screens it reads as black. Keep the wordmark fill at about #202020 on #141414, not lower.
- Cut detection misses the cuts because the frames are near black; time the cuts by hand at f89 and f180.
- The status line grows while the card stays still; scaling the card too kills the effect.
- The wordmark fade to outline is not a stroke-draw: the fill fades and a 1 px outline remains.

## Missing components
- PaymentCard: rounded card (radius 6 % of width, ratio 1.586), vertical gradient #161616→#000 with bottom fade, 1 px top rim, masked digits, small corner mark, huge wordmark slot with fill-to-outline fade (techniques: fit-word, light-on)
- OutlineFade: text whose fill opacity animates to 0 while a 1 px stroke stays at about 15 % white (techniques: light-on)

## Proposed terms
- outline-ghost: type fill fades out leaving a hairline outline of the letters, rows 1, 2 (not in craft/vocabulary.md; not used in recipe.json)
- crop-tour: successive hard-cut close-ups on different corners of one object before showing it whole, rows 1–3 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets; 1 fr from 30 fps strips at t = 2.50, 5.50, 9.00 (brightened curves for the dark frames, temp files removed). Not measurable: exact light-on curves (±0.25 s), overshoot (none visible), wordmark fade start in row 1. Camera from motion.json block matching: −0.2 to −0.5 %/s in row 1, under 1 %/s elsewhere; the 1.0–1.4 %/s "zoom" at 9–14 s is the status line growing, not the camera. SFX planned by the glue rule, not measured (silent reference). cut_on_beat = 0/2 cuts within ±2 fr (no beats; silent).

## Study log
id card-closeup-pullout-status · family logo-brand (hint said 3d-device; no 3D seen, the wordmark is the subject) · 16.27 s, 6 rows.
Techniques: 5 (fit-word, light-on, match-cut, pull-out, hard-cut) · difficulty easy · render_cost light.
cut_on_beat: n/a (silent, no beats) · 2 cuts found on 30 fps strips that cuts.json missed (f89, f180).
Not measurable: light-on curves at ±0.25 s. Hinted typewriter, notification-stack, device-phone, card-grid: not seen.
Proposed terms: outline-ghost, crop-tour. Missing components: PaymentCard, OutlineFade.
Phase B: not run (study job).
