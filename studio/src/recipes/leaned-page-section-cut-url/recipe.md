# Leaned website sections, cut tour to a URL card

A vertical tour of one website: four page sections on a leaned 3D plane, each a slow camera move of 3-4 s joined by hard cuts, closing on a small serif URL on black. Depth and drift make a static site feel filmed.

Source: https://www.raylight.app/templates/zfMy2UXL (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A studio, agency or freelancer shows off a site it built, vertical feed
- A landing page with a hero, a services block, a form and contact details
- Silent autoplay where the UI itself has to carry the film
- A short portfolio piece that must end on the URL
Not for: products whose value is an interaction (nothing is clicked or typed here); films that need a claim or VO.

## Format
9:16 · 17.13 s · 30 fps · light (last 2.97 s dark) · no music, no audio track, cut_on_beat n/a (0 beats) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–3.10 | 0–93 | hook | page hero on a leaned plane: 3-line serif headline, 4-line sub, two buttons, two stat figures | push-in 1.00→1.03 over 93 fr, plane leaned back | no element animation at 4 fps; camera creep easings.linear | hard-cut | none |
| 2 | 3.10–6.37 | 93–191 | feature | services block: 3 mono bullets, then a card with icon tile, 2-word title, 3-line body, 3 bullets | dolly up ~4.3 px/fr @1920 + push-in ~1.00→1.22 over 98 fr, roll ~+1°/s | static content; easings.linear (no ease visible at ±0.25 s) | hard-cut | swoosh-short (planned) |
| 3 | 6.37–10.03 | 191–301 | cta | inquiry form on a steep plane: blurred heading, 3 fields, dark pill submit in focus | lateral dolly left ~1.9 px/fr @1920, roll ~+2°/s; first ~0.5 s slight pull-out | shallow DOF fixed on the button; easings.linear drift | hard-cut | swoosh-short (planned) |
| 4 | 10.03–14.17 | 301–425 | cta | contact card on black, skewed: mono eyebrow + 4 rows (email, phone, handle, city) with round icon chips | lateral dolly right ~4.5 px/fr @1920, push-in ~1 %/s, roll ~-0.7°/s | static card; easings.linear over 124 fr | hard-cut | swoosh-short (planned) |
| 5 | 14.17–17.13 | 425–514 | cta | site URL, one small condensed serif line, centred on near-black | static | on at the first cell after the cut (14.27); no entrance visible at ±0.25 s; holds 89 fr | end | silence-beat (planned) |

Evidence: row 1 sheet-01 cells 0–12, cuts/cut-003.10.jpg (before); row 2 sheet-01 cells 13–15, sheet-02 cells 0–9, cut-003.10 (after), cut-006.37 (before); row 3 sheet-02 cells 10–15, sheet-03 cells 0–8, cut-006.37 (after), cut-010.03 (before); row 4 sheet-03 cells 9–15, sheet-04 cells 0–8, cut-010.03 (after), cut-014.17 (before); row 5 sheet-04 cells 9–15, sheet-05 cells 0–4, cut-014.17 (after).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| tilt-plane | 1–4 | craft/vocabulary.md#camera, TiltPlane in studio/API.md |
| dolly | 2–4 | craft/vocabulary.md#camera, Dolly |
| push-in | 1, 2, 4 | craft/vocabulary.md#camera |
| ui-rebuild | 1–4 | craft/vocabulary.md#ui |
| quiet-close | 5 | craft/vocabulary.md#type, QuietClose |
| hard-cut | 1–4 out | craft/vocabulary.md#transitions |
| end | 5 | craft/vocabulary.md#transitions |

## Look
Palette: #F1F5F7 page background, #171B28 navy text and button, #353B49 secondary text, #8C8486 and #A1A6AB greys (plane shading, muted copy), #070B0C black surround and close. Type: light high-contrast serif headline with one italic accent word (~5 % H), wide grotesk body, tracked uppercase mono for lists and eyebrows, condensed serif URL (~2 % H). Treatment: none as look ids; the plane edges darken into the black surround (lighting on the plane, not a vignette layer). Background: flat black behind the planes.

## What to adapt
- Copy: hero headline 3 short lines + 4-line sub + 2 buttons + 2 stats; services 3 bullets + 1 card; form heading + 3 fields + submit; 4 contact rows; URL.
- Brand: accent on the filled buttons and bullet dots; the URL on black is the only brand moment.
- Timing: rows 1–4 can stretch ±20 %; keep each section to one continuous move and the close ≥ 2.5 s.

## Pitfalls
- Each section is one linear move; adding eases or a second direction inside a section breaks the filmed-camera feel.
- Alternate the move direction per section (up, left, right) so the hard cuts read as new shots.
- Row 3 DOF: keep the CTA sharp and the heading blurred, else the steep plane reads as a mistake.

## Missing components
none

## Proposed terms
- plane-dof: fixed shallow depth of field on a tilted UI plane, one element sharp, rest blurred (row 3). Covered by TiltPlane `dof`; not used in recipe.json.

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strip). Camera speeds from motion.json global model (px/s at 1920 wide, zoom %/s, roll °/s), cross-checked against cell positions; easing names are defaults (linear), not measurable at 4 fps. Not measurable: easing curves, URL entrance (if any, < 0.25 s), exact roll. SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/4 cuts within ±2 fr (no beats).

## Study log
id leaned-page-section-cut-url · family product-ui (hint social-promo overridden: website UI, no sticker grammar)
17.13 s, 5 rows, 4 hard cuts, 0 soft · techniques 7 (incl. hard-cut, end)
cut_on_beat n/a: silent, 0/4
Not measurable: easings and URL entrance at 0.25 s; camera numbers from motion.json estimates
Proposed terms: plane-dof · Missing components: none
phase B: not run
