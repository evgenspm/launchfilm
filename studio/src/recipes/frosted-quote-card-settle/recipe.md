# Frosted quote card over a pulled-back photo

A blurred glass card shrinks into place while a warm lifestyle photo pulls back behind it, then a customer quote writes in word by word, the attribution fades up and a heart lights. One calm, readable proof shot.

Source: https://jitter.video/template/the-stack-testimonial/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- A single customer quote as the social-proof beat of a launch film
- Silent feed posts where one testimonial must read in under 3 s
- You have a warm lifestyle or customer photo and no product UI to show
- Looping card for a site hero or testimonial carousel slot
Not for: several quotes in a row (this is one card; chain copies with hard cuts), or dark, UI-heavy films where a photo backdrop would clash.

## Format
other (1280×800, 16:10) · 5.13 s · 30 fps · light (warm mid-tone footage) · music none, cut_on_beat n/a (0 cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–0.77 | 0–23 | hook | warm photo of a person at a laptop, tight crop; empty heavily frosted rounded card centre-left; corner wordmark and URL | pull-out ~1.25 → 1.00 by 1.00 s, easings.outQuint | card shrinks ~60 % → 38 % of width and drifts right/down, springs.layout ~23 fr (overshoot not measurable) | hard-cut | none |
| 2 | 0.77–1.50 | 23–45 | social-proof | quote inside the card, 3 lines, about 14 words, praises time saved | pull-out settles at 1.00 s, then static | words write in line by line, blur-in per word, gap ~1.5 fr, easings.outExpo 12 fr (±0.25 s); set by f45 | hard-cut | type-click |
| 3 | 1.50–2.50 | 45–75 | social-proof | attribution row: round avatar, name + role in 2 grey lines, dim heart icon right | static | avatar fades in 1.50 s, name/role blur-in 1.77–2.00 s, easings.outExpo 12 fr (±0.25 s); card narrows ~36 % → 32 % of width, springs.ui (±0.25 s) | hard-cut | none |
| 4 | 2.50–5.13 | 75–154 | social-proof | finished card holds over the photo; heart solid white | static | card grows back to ~40 % of width as the heart lights at 2.50 s, springs.pop (overshoot not measurable); hold 79 fr | hard-cut | pop |

Evidence per row: row 1 sheet-01 cells 0–2 (0.00, 0.27, 0.50) + kf-000.50.jpg; row 2 sheet-01 cells 3–5 (0.77, 1.00, 1.27); row 3 sheet-01 cells 6–9 (1.50, 1.77, 2.00, 2.27); row 4 sheet-01 cells 10–15 + sheet-02 cells 0–4 + kf-003.50.jpg. No cut frames (cuts.json empty).

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| pull-out | 1–2 | craft/vocabulary.md#camera, craft/04-motion.md |
| word-reveal | 2 | craft/vocabulary.md#type (WordReveal) |
| blur-in | 2–3 | craft/vocabulary.md#type (BlurIn) |

## Look
Palette: #B37D42 (wood wall, background), #CD9F65 (lit wood highlight), #996538 (mid wood), #7D4C25 (shadow wood), #56381E (deep shadow), #292114 (darkest, window frame). Quote text white, attribution muted grey. Type: neutral grotesk, regular, sentence case, ~3.4 % H, quote 3 lines, attribution 2 lines. Treatment: none from the look list; the card is a frosted glass panel (heavy backdrop blur, ~20 % white tint, large corner radius ~12 % of card height, no hairline). Background: footage (single still photo, warm golden light).

## What to adapt
- Copy: one quote, 12–16 words, max 3 lines; author name and role, 2 short lines; URL top-right; wordmark top-left.
- Brand: the card is neutral glass, so the photo carries the colour; the heart icon can take the accent.
- Timing: the pull-out (30 fr) and quote write-in (by f45) keep their frame counts; the final hold (row 4) stretches or trims to fit the edit.

## Pitfalls
- The card must blur the photo strongly (it reads as an opaque frosted panel at 0.00 s); a weak blur makes the white quote unreadable over the face and sweater.
- Quote and card enter together with the pull-out; if the text starts before the card settles (~0.77 s) it smears.
- Keep the quote at 3 lines: the card width (~40 % of frame) is sized to it.

## Missing components
- FrostedCard: rounded panel with backdrop-filter blur ~40 px over footage, white tint ~20 %, radius ~12 % of height, animatable width/height on springs.layout (techniques: proposed frosted-card). Surface lacks a backdrop-blur mode.

## Proposed terms
- frosted-card: translucent glass panel with heavy backdrop blur over footage, carries text (rows 1–4) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strip extracted; source file is not inside the allowed paths). Not measurable: card spring overshoot, per-word stagger (estimated ~1.5 fr), exact pull-out start scale (motion.json gives -24 %/s over second 0). Theme: footage mid luminance (~0.45) falls between the dark and light thresholds; set to light by the warm, bright photo. SFX planned by the glue rule, not measured. cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no music).

## Study log
- id frosted-quote-card-settle, family social-promo, 5.13 s, 4 rows (1 shot split at state changes), 0 cuts
- techniques 3 (pull-out, word-reveal, blur-in); cut_on_beat n/a (silent, 0 cuts)
- not measurable at 0.25 s: card overshoot, word stagger, pull-out start scale
- proposed terms: frosted-card
- missing components: FrostedCard (backdrop-blur card)
- phase B: not run
