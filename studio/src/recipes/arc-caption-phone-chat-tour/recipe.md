# Caption-led phone and assistant chat tour

Short centred captions on black alternate with product moments: a 3D phone spins in, a tilted sign-up screen glides, an assistant chat types and streams, a payment flow confirms. A violet horizon arc sweeps and brightens toward the logo.

Source: https://www.raylight.app/templates/HtYnnecO (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- A consumer or fintech mobile app with two or three screens and an in-app assistant
- Silent autoplay where small captions announce each feature before it is shown
- Showing an AI answer that turns into one concrete action with a confirm
- Dark, restrained brand with one accent glow
Not for: products with no phone UI, or films that need VO-driven pacing.

## Format
16:9 · 24.97 s · 30 fps · dark · music none (silent), cut_on_beat n/a · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.77 | 0–53 | hook | caption, 5 words, core promise; thin violet arc rim lower left | drift: arc rotates ~4 deg/s | caption on from f0, no entrance, holds 53 fr | hard-cut | none |
| 2 | 1.77–4.77 | 53–143 | reveal | 3D phone, home screen (balance card, 6 asset tiles, tab bar), spins front, back, edge, tilted close-up, settles frontal | orbit + push-in ~17 %/s, then pull-out −7.6 %/s | y-rotation ~360 deg over 15 fr easings.outExpo (±0.25 s); glide 30 fr; settle springs.heavy (overshoot not measurable) | hard-cut | whoosh |
| 3 | 4.77–6.27 | 143–188 | feature | caption, 4 words, fast sign-up | drift: arc scale creep ~5 %/s | cut in f143, holds 45 fr | hard-cut | none |
| 4 | 6.27–8.50 | 188–255 | feature | 3D phone in perspective, sign-up form (2 fields, button, 3 social rows) | dolly: rises from below, travels down the screen, up to 465 px/s @1920 | enters f188 tilted ~20 deg, springs.heavy; travel easings.inOutSine 67 fr | hard-cut | none |
| 5 | 8.50–10.50 | 255–315 | feature | caption, 5 words, introduces the assistant | drift: arc rises on left, glow top right | cut in f255, holds 60 fr | hard-cut | none |
| 6 | 10.50–11.77 | 315–353 | feature | dark chat panel, assistant header + divider; question, 6 words, types in a violet pill | static panel, arc drifts | panel on f315 (±0.25 s); typing ~12 chars/s, pill grows springs.ui | hard-cut | type-click |
| 7 | 11.77–12.77 | 353–383 | feature | searching status line with animated dots | static panel; arc enters top right | status f353, dots cycle 30 fr | hard-cut | none |
| 8 | 12.77–15.50 | 383–465 | feature | answer streams into grey bubble under a processed-time label, 3 lines, recommends one asset and offers a monthly amount | static panel; glow brightens | ~5 words/s over 60 fr, bubble grows springs.layout; holds 15 fr | blur-dissolve | none |
| 9 | 15.50–17.50 | 465–525 | proof | one line: amount, arrow with small label, asset name | static | values blur-in 8 fr (±0.25 s); label blur-in f473; arrow draws 30 fr easings.outQuint | hard-cut | none |
| 10 | 17.50–18.00 | 525–540 | proof | thin violet ring with spinner arc, resolves to bold violet check | static | spinner 8 fr; check draws ~8 fr springs.pop (overshoot not measurable) | hard-cut | ui-confirm |
| 11 | 18.00–20.00 | 540–600 | proof | caption, 6 words, positioning; blurred violet band behind | drift: band widens | cut in f540, holds 60 fr | hard-cut | none |
| 12 | 20.00–21.77 | 600–653 | proof | caption, 7 words, closing claim, word by word grey to white | drift: band sweeps upper half | ~3 words per 0.25 s, each 8 fr fade + slight drop easings.outExpo; full f623; holds 22 fr | hard-cut | none |
| 13 | 21.77–23.77 | 653–713 | logo | mark above wide wordmark, white | drift: band brightens | lockup on f660 (±0.25 s), holds 53 fr | blur-dissolve | swell |
| 14 | 23.77–24.97 | 713–749 | cta | product URL alone, centred | static | URL resolves from blur < 8 fr (±0.25 s), holds to end | hard-cut | none |

Evidence: row 1 sheet-01 cells 0–6; row 2 sheet-01 cells 7–15, sheet-02 cells 0–2; row 3 sheet-02 cells 3–8; row 4 sheet-02 cells 9–15, sheet-03 cells 0–1; row 5 sheet-03 cells 2–9; row 6 sheet-03 cells 10–14; row 7 sheet-03 cell 15, sheet-04 cells 0–2; row 8 sheet-04 cells 3–13; row 9 sheet-04 cells 14–15, sheet-05 cells 0–5; row 10 sheet-05 cells 6–7; row 11 sheet-05 cells 8–15; row 12 sheet-06 cells 0–6; row 13 sheet-06 cells 7–14; row 14 sheet-06 cell 15, sheet-07 cells 0–3. No cut frames (cuts.json empty); keyframes kf-003.50, kf-013.50, kf-022.50 for palette.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| statement-sequence | 1, 3, 5, 11, 12 | craft/vocabulary.md#type (StatementSequence) |
| horizon-arc | 1–14 | craft/vocabulary.md#brand (HorizonArc) |
| device-phone | 2, 4 | craft/vocabulary.md#ui (PhoneFrame) |
| device-3d | 2, 4 | craft/vocabulary.md#3d |
| orbit | 2 | craft/vocabulary.md#camera |
| dolly | 4 | craft/vocabulary.md#camera |
| ui-rebuild | 2, 4, 6–10 | craft/vocabulary.md#ui |
| prompt-typing | 6 | craft/vocabulary.md#ui (PromptBar) |
| thinking-state | 7, 10 | craft/vocabulary.md#ui (ThinkingState, Spinner) |
| stream-text | 8 | craft/vocabulary.md#ui (StreamText) |
| blur-in | 9, 14 | craft/vocabulary.md#type (BlurIn) |
| word-reveal | 12 | craft/vocabulary.md#type (WordReveal) |
| end-card | 13–14 | craft/vocabulary.md#brand (EndCard) |
| hard-cut | 1–7, 9–12, 14 | craft/vocabulary.md#transitions |
| glow | 1–14 | craft/vocabulary.md#look |

## Look
Palette: #010101 background, #EDE8F0 text, #5C2AB1 accent violet, #8D5BDF arc mid, #B996F2 arc highlight, #232036 panel and UI surface. Type: geometric sans, medium, sentence case, ~3 % H captions, centred. Treatment: glow. Background: flat black with one blurred violet arc that grows across the film.

## What to adapt
- Copy: 5 captions of 4–7 words (promise, sign-up, assistant, positioning, closing claim); one 6-word question; a 3-line answer ending in an offer; one amount → target line; URL.
- Brand: accent colours the arc, the prompt pill, the arrow and the check; logo only in row 13.
- Timing: caption rows can stretch 45–60 fr; the spin in row 2 must stay ~15 fr; the answer stream scales with answer length.

## Pitfalls
- Captions are small and appear without entrance; making them large turns this into a kinetic-type film.
- The arc never cuts: it is one continuous background layer, otherwise the hard cuts between caption and UI feel jumpy.
- The spin hides the screen for ~8 fr (back and edge); keep it fast or the reveal stalls.

## Missing components
- Phone3D: rendered phone model with screen texture, y-spin 360 deg in 15 fr, perspective tilt up to 25 deg and camera travel down the screen (techniques: device-3d, orbit, dolly)
- FlowArrow: amount → label arrow → target on one line, arrow draws 30 fr outQuint (techniques: proposed arrow-flow)
- CheckConfirm: thin ring + spinner arc resolving to a bold check in ~8 fr with ring fill (techniques: thinking-state, proposed check-confirm)

## Proposed terms
- check-confirm: spinner ring resolves into a drawn check mark as the payoff of an action, row 10 (not in craft/vocabulary.md; not used in recipe.json)
- arrow-flow: value, arrow with label, destination on one line, arrow draws left to right, row 9 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strips made). Not measurable: entrance and exit curves of captions, spin overshoot, settle springs, typing jitter. All boundaries are state changes; scdet found 0 cuts (near misses 1.60, 4.60, 8.30 s). Camera rates from motion.json. SFX planned by the glue rule, not measured (silent reference). cut_on_beat = 0/0 cuts (no music).

## Study log
id arc-caption-phone-chat-tour · family mobile-app · 24.97 s, 14 rows · 15 techniques
cut_on_beat: n/a (silent, 0 cuts) · VO none
Not measurable: sub-0.25 s entrances, spring overshoot, typing cadence (±0.25 s from 4 fps sheets)
Proposed terms: check-confirm, arrow-flow
Missing components: Phone3D, FlowArrow, CheckConfirm
phase B: not run
