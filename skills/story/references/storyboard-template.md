# STORYBOARD.md: format and a filled example

Columns are a superset of `craft/01#storyboard-format` (adds `fr`, `beat` and `rules`). One row per shot, or per camera
beat in a no-cut product film. Every cell filled; "none" is a valid value only for camera (with drift noted elsewhere it
is not), transition (continuous shot) and sound (only if VO covers it).

## Template

```markdown
approved: <ISO date, written only after the user approves>
# Storyboard: <slug>
mode: <mode> · length: <s> s · fps: 30 · presets: <ids> · BPM: <n> (<fr>/beat) · hook: <H-id>
recipes: <ids or none> · families: <names or none>

## VO script
<script with | phrase breaks and *accent* words> (<n> words, <wps> wps, <coverage> % coverage)

## Shots
| # | in–out s | fr | beat | on screen | camera | motion | transition out | text / VO | sound | rules |
|---|---|---|---|---|---|---|---|---|---|---|

## Assets
- logo: public/films/<slug>/brand/<file> · screenshots: <paths> · recordings: <paths> · rebuild in React: <screens> · generate: <prompts>

## Rhythm break
<where and how> · ## Not in this film: <parked>
```

Column rules:
- `in–out s`: two decimals. `fr`: start–end frame at the film fps (end exclusive).
- `beat`: vocabulary beat label.
- `camera`: tier and scale (`tier 2 1.10 → tier 3 1.60, cameraIn 24 fr`) or drift (`drift 1.00→1.04 linear`).
- `motion`: what moves, spring/easing name, duration and stagger in frames.
- `transition out`: vocabulary transition id (`hard-cut` default) or `none (continuous)`.
- `text / VO`: on-screen words in quotes; VO words in italics with their seconds.
- `sound`: vocabulary audio ids with frame and gain (`tick @12 −16 dB`); music cue points.
- `rules`: citations `[craft/NN#anchor]`, `[T#]`, `[craft/families/<name>#numbers]`.

## Filled example: Acme Ledger, 15 s product film (x-16x9), 120 BPM

```markdown
approved: 2026-10-07T18:20:00Z
# Storyboard: acme-ledger-reminders
mode: product film · length: 15 s · fps: 30 · presets: x-16x9, li-4x5 · BPM: 120 (15 fr/beat) · hook: H1
recipes: none · families: list, notifications

## VO script
Fifteen invoices out. | Nobody's *paid.* | Type who owes you. | Acme Ledger builds the *invoice* | and sends the reminders. | You just get *paid.*
(22 words, 2.6 wps over 8.4 s of speech, 56 % coverage)
```

| # | in–out s | fr | beat | on screen | camera | motion | transition out | text / VO | sound | rules |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.50 | 0–45 | hook | invoice list, 15 rows, red "Overdue" badges, counter "14 unpaid" (frame 0 = poster) | tier 1, 0.85 → 0.87 drift, linear | counter 14 → 15 at fr 10, snappy; newest row drops in fr 6, drop spring 9 fr | none (continuous) | caption "Fifteen invoices out. Nobody's paid." · VO *0.20–1.65 s* | music beat 1 @0; tick @10 −16 dB; pop @6 −14 dB | hook H1 [craft/01#hooks] · poster [craft/10#poster] · drift [craft/03#drift-and-push-in] · snappy [craft/04#springs] |
| 2 | 1.50–4.00 | 45–120 | feature | prompt bar under the list; cursor enters from bottom right | tier 1 → tier 2 (0.87 → 1.10), cameraIn, 24 fr, arrives fr 69 | cursor path 22 fr to the bar, arrives fr 63, click fr 69 squash 8 fr; typing "invoice Dana for March" 2 fr/char, fr 75–119, jitter ±15 ms | none | caption "Type who owes you." · VO *2.10–3.05 s* | ui-confirm @69 −12 dB; type-click per char −26 dB (under VO) | [craft/03#zoom-tiers] · [craft/03#cursor-and-keycaps] · [craft/04#durations] · glue [craft/02#glue-rule] |
| 3 | 4.00–11.00 | 120–330 | reveal | invoice card builds: 4 line items, total "$2,480.00", then 3 reminder rows "Mar 31 · Apr 7 · Apr 14" | tier 2 → tier 3 (1.10 → 1.60) on the total, cameraIn 21 fr, arrives fr 200; tier 3 → 2, cameraOut 27 fr from fr 270 | card grows on ui spring 18 fr; line items stagger 2 fr; total counts up 24 fr outExpo, lands fr 206; reminder rows drop in, 4 fr stagger, drop spring | none | caption "Acme Ledger builds the invoice and sends the reminders." · VO *4.30–7.40 s* | tick per line item @124–130 −22 dB; tick @206 −16 dB; pop per reminder row −20 dB (under VO) | [craft/04#stagger-and-overlap] · [craft/families/list#numbers] · one tier per move [craft/03#zoom-tiers] · [T3] |
| 4 | 11.00–14.00 | 330–420 | proof | "Paid" badge lands on Dana's invoice, row turns green, list re-sorts it to the top | tier 2, drift 1.10 → 1.13 linear | badge lands from camera, scale 1.47 → 1, 7 fr landing ease, fr 336; row carried to top, drag spring, followers +3 fr | none | caption "You just get paid." · VO *11.40–12.30 s* | notification @334 −12 dB; ui-confirm @336 −12 dB | hold ≥ 3 s [craft/02#readability-holds] · [craft/families/notifications#numbers] · [T1] |
| 5 | 14.00–15.00 | 420–450 | logo | list dims to 40 %, Acme Ledger mark + "acme-ledger.example" | tier 2 → tier 1 (1.13 → 0.85), cameraOut 24 fr | mark blur-in 10 fr outExpo at fr 424; URL fades in 8 fr at fr 430; settle static from fr 438 (end-card settle) | end | none | music hard stop on beat 30 (fr 450); soft tone @424 −14 dB | [craft/02#silence-and-hard-stop] · [craft/04#entrances-and-exits] |

```markdown
## Assets
- logo: public/films/acme-ledger-reminders/brand/mark.svg · rebuild in React: invoice list, prompt bar, invoice card (from the repo's components) · generate: none

## Rhythm break
none needed (film ≤ 20 s) · ## Not in this film: bank sync, team roles
```

Check before showing the user: every row cites ≥ 1 rule; holds ≥ 0.2 × (words + 1) s (row 4: 4 words → ≥ 1.0 s,
has 3.0 s); no static stretch > 18 fr except the final settle; cuts and section starts on beat frames
(45, 120, 330, 420, 450 are all multiples of 15).
