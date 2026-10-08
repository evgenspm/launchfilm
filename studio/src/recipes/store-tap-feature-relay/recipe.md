# Store tap into a feature relay with ring and orbit

A store listing is tapped, then the app answers in fast single-idea shots: twin phones swing in, a card flips, a chart counts up, a band types a claim, a ring fills, coins orbit a globe, and the wordmark wipes on. Each shot is under 2.3 s, motion is front-loaded, then holds.

Source: https://www.raylight.app/templates/f2RRus1f (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A finance or wallet app launch that has to show five or six capabilities in about 15 s.
- Silent feed autoplay: every shot carries one idea, no VO needed.
- A download push: the film opens on the store listing and the tap.
- Brands with one saturated accent per scene that can alternate black and white grounds.
Not for: products with one deep feature worth a long demo; brands that need one constant theme (the black/white flips are part of the rhythm).

## Format
16:9 · 14.1 s · 30 fps · mixed (black 0.00-5.43 and 9.63-11.73, white 5.43-9.63 and 11.73-14.10) · no music in the reference (silent), cut_on_beat n/a (0/2, no beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00-1.33 | 0-40 | hook | store listing strip on black: icon, name line + subline, action pill; cursor presses the pill | push-in: listing 12 % W -> 35 % W by 0.77, 37 % at 1.00, back to 28 % at 1.27 | scale up springs.cameraIn ~23 fr (overshoot not measurable); cursor-path from lower right 0.50-1.00, springs.click press at f30 (±0.25 s); recede easings.inExpo 8 fr (±0.25 s) | hard-cut | ui-confirm |
| 2 | 1.33-2.77 | 40-83 | reveal | two phones with the app home screen (balance, round actions, list), one offset back | pull-out: shrink and sink 237 px/s @1920 from 2.00, -6 %/s | phones edge-on (Y ~85 deg) at 1.50, swing to 3/4 by 1.77 on springs.heavy ~13 fr (±0.25 s); corner glint at 1.77; lean 2.00-2.50, sink out easings.inExpo ~8 fr (±0.25 s) | hard-cut | whoosh |
| 3 | 2.77-4.00 | 83-120 | feature | gradient payment card (pink to blue, chip, small wordmark) alone on black | pull-out at the end: 25 % W at 3.50 -> 15 % W at 3.77 | slides down from top edge at 2.77; Y flip: edge-on 3.00, 3/4 3.27, near face-on 3.50 (180 deg in ~22 fr, easings.inOutCubic, ±0.25 s); recede easings.inExpo | hard-cut | swoosh-short |
| 4 | 4.00-5.43 | 120-163 | proof | investment chart on black: big balance figure, green delta line, thin white wavy line, two stat pairs, pill badge | static, then drift left + scale down 5.00-5.27 (±0.25 s) | balance counter 4.00-4.77 (23 fr, easings.outExpo); line draws left to right 4.00-4.50 (15 fr, ±0.25 s); stats count with the balance; fade to black 5.27-5.40 (~4 fr) | hard-cut | none |
| 5 | 5.43-7.37 | 163-221 | feature | white frame, full-width black band mid-frame; a 3-word claim types in white | static | band ~60 % H at the cut settles to ~27 % H by 6.00 (springs.layout ~17 fr, ±0.25 s); typewriter 5.77-7.00 (~16 cps, 21 chars in 37 fr); band collapses by 7.27 (≤ 8 fr, easings.inExpo, ±0.25 s) | flash | type-click |
| 6 | 7.37-9.63 | 221-289 | proof | white frame: 2-word label on top, thick green progress ring, bold percent inside | static | 2 fr black flash at 7.37; label words fade in staggered (7.50, 7.77); ring 0 -> 100 % in 27 fr (7.50-8.40), steep in-out (easings.inOutCubic as nearest; reference 20 -> 78 % in 3 fr), start 9 o'clock, ccw, butt caps, no track; counter driven by the same value; hold to 9.00; fade out by 9.27 | hard-cut | tick |
| 7 | 9.63-11.73 | 289-352 | feature | black frame: 5-word headline + tiny subline, violet globe, 8 currency coins on a face-on circle | push-in 1.00 -> 1.05, easings.inOutSine | black band grows from mid-frame to full 9.63-10.27 (~19 fr, springs.layout) as the globe rises; coins appear clockwise 1.3 fr apart 9.97-10.20, radius 0.89 -> 1.00; creep 1 deg/fr, one in-out spin ~107 deg over 53 fr (peak 9.5 deg/fr at 10.95), then 0.3-0.5 deg/fr drift; glyphs upright | mask-wipe | pop |
| 8 | 11.73-14.10 | 352-423 | logo | white frame, black wordmark centred, ~18 % W | static | white panel wipes right to left 11.73-12.13 (12 fr, easings.inOutCubic); letters appear from the right end leftward 12.13-12.77 (~1-2 fr per letter, springs.snappy, overshoot not measurable); hold 40 fr | hard-cut | swoosh-short |

Evidence per row:
1. sheet-01 cells 0-5 (0.00-1.27); motion.json s0 zoom +30.5 %/s, s1 -27.8 %/s.
2. sheet-01 cells 6-10 (1.50-2.50); motion.json s2 pan y +237.
3. sheet-01 cells 11-15 (2.77-3.77); motion.json s3 zoom -31.9 %/s.
4. sheet-02 cells 0-5 (4.00-5.27); cuts/cut-005.43.jpg (before: black).
5. sheet-02 cells 6-13 (5.50-7.27); cuts/cut-005.43.jpg (after: band on white); cuts/flash-007.37.jpg.
6. sheet-02 cells 14-15, sheet-03 cells 0-6 (7.50-9.50); cuts/flash-007.37.jpg; human frame measures for the ring.
7. sheet-03 cells 7-15 (9.77-11.77); cuts/cut-009.63.jpg (band opening over grey/white); motion.json s10-11 rotate.
8. sheet-03 cell 15, sheet-04 cells 0-8 (12.00-14.00); cuts/cut-011.73.jpg (soft 11.73-12.13).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| push-in | 1, 7 | craft/03-camera-and-staging.md#drift-and-push-in |
| cursor-path | 1 | craft/vocabulary.md#ui (Cursor) |
| device-phone | 2 | craft/vocabulary.md#ui (PhoneFrame) |
| device-3d | 2, 3 | craft/vocabulary.md#3d |
| chart-draw | 4 | craft/vocabulary.md#ui (LineChart) |
| counter | 4, 6 | craft/vocabulary.md#type (Counter) |
| typewriter | 5 | craft/05-typography.md (Typewriter) |
| flash | 5 -> 6 | craft/09-transitions.md (Flash, black colour) |
| orbit-ring | 7 | craft/families (OrbitRing, face-on: tilt 0) |
| mask-wipe | 7 -> 8, 8 | craft/09-transitions.md#mask-wipe |
| ui-rebuild | 2, 4, 6, 7 | craft/vocabulary.md#ui |
| glow | 2, 7 | craft/vocabulary.md#look |
| hard-cut | 1-6 | craft/09-transitions.md |

## Look
Palette: #000000 background (dark rows), #FFFFFF background (light rows) and text on black, #10B981 ring accent, #806CC9 orbit violet (coins, globe), #332759 phone screen purple, #AFB6B2 muted chart labels. Type: geometric grotesk, semibold, sentence case, normal tracking; headlines 4-6 % H, figures bold tabular 3 % H, sublines 1.5 % H. Treatment: glow (phone corner glint, soft coin halo ~8 px). Background: flat black or flat white, alternating per row.

## What to adapt
- Copy: listing name line + subline (≤ 6 words); one band claim of ~3 words; ring label of 2 words; orbit headline of ~5 words + one short subline; wordmark. 5 lines total.
- Brand: one accent per scene. Ring takes a success colour, orbit takes the brand colour; the card art carries the brand gradient; logo only at the end.
- Timing: rows 1-4 and 7 can stretch ±10 frames; keep the ring at 27 fr, the orbit spin at 53 fr and the 2 fr black flash, they are the signature beats.

## Pitfalls
- Ring and counter must share one eased value; a separate counter drifts off the arc.
- A constant-speed orbit reads as a loader. Keep one decisive in-out spin, then a near-still drift.
- The ring is steep in the middle (20 -> 78 % inside 3 fr); a gentle ease looks slow.
- The black/white flips land on cuts only (5.43, 9.63, 11.73); a fade between them muddies to grey.

## Missing components
- CardFlip3D: flat card with gradient art slides in from the top edge, flips 180 deg on Y in ~22 fr with perspective, then recedes (techniques: device-3d).
- BandOpen: full-width black band on white whose height eases from ~60 % H to ~27 % H in ~17 fr and collapses in ≤ 8 fr, holding typed text (techniques: typewriter).
- StoreListingStrip: icon + name + subline + action pill, scales from 12 % to 35 % W with a cursor press (techniques: cursor-path, push-in).
- Twin 3D phones: PhoneFrame covers the frame; two phones swinging from edge-on with a corner glint need a tilt animation over two instances or device-3d.

## Proposed terms
- card-flip-3d: a single card flipping on Y in perspective, row 3 (not in craft/vocabulary.md; not used in recipe.json).
- band-open: a horizontal bar that opens and closes to carry one line of text, rows 5 and 7 (not in craft/vocabulary.md; not used in recipe.json).
- letter-wipe-reveal: wordmark letters arriving one by one behind a moving wipe edge, row 8 (not in craft/vocabulary.md; not used in recipe.json).

## Measurement notes
Resolution: 0.25 s from sheets; ring and orbit numbers from the human frame-by-frame notes (1 fr). Not measurable: entrance overshoot on the listing, phones and wordmark; exact card flip curve; band open curve (±0.25 s). Palette from palettegen on keyframes kf-002.50, kf-004.50, kf-008.50, kf-010.50. The reference is silent: SFX planned by the glue rule, not measured. cut_on_beat = 0/2 cuts within ±2 fr (no beats).

## Study log
id store-tap-feature-relay · family product-ui · 14.1 s, 8 rows (2 hard cuts, 1 soft wipe, 1 black flash, shot 1 split into 4 rows at state changes, shot 2 split at the flash).
techniques 13 (incl. glow, hard-cut) · cut_on_beat n/a: silent, 0/2.
Not measurable at 0.25 s: entrance overshoots, card flip and band curves; ring/orbit numbers taken from 1 fr human notes.
Proposed terms: card-flip-3d, band-open, letter-wipe-reveal.
Missing components: CardFlip3D, BandOpen, StoreListingStrip, twin swinging phones.
Phase B: not run.
