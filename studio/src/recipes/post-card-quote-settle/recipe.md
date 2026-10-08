# Social post card quote settle

One white social-post card on a blue diagonal gradient: avatar and footer land first, name and handle rise, the two-line quote sweeps in word by word within 1 s, then the card holds still and fades out. Social proof in one calm beat.

Source: https://jitter.video/template/animated-tweet/ (link only; the original is not redistributed) · studied 2026-10-07 · status: studied

## When to use
- Sharing one user quote or public post as social proof
- A square feed clip that must read as a real platform post
- A short insert between feature shots in a longer launch film
- Silent autoplay where one sentence carries the message
Not for: several quotes at once (no stagger or stack here), long quotes over 3 lines, films that need a product reveal or CTA.

## Format
1:1 · 5 s · 30 fps · light · music none, cut_on_beat n/a (0 cuts, no beats) · VO no · loopable (last frame = first frame, empty gradient)

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.00 | 0–30 | hook | empty blue gradient, then a white rounded post card centred: photo avatar, name + verified badge, handle, 2-line quote, grey meta footer | static | card present at final place by f8 (entrance not measurable, ±0.25 s); avatar and footer set at f8; name and handle rise from a clip mask f8–f15, springs.ui (overshoot not measurable); quote word-reveal left to right f15–f30, easings.outQuint per word (±0.25 s) | hard-cut | pop |
| 2 | 1.00–4.73 | 30–142 | social-proof | full card holds: quote 2 lines, about 12 words + one emoji, the user's reaction | static | hold 112 fr, nothing moves | blur-dissolve | none |
| 3 | 4.73–5.00 | 142–150 | social-proof | card fades out and shrinks slightly, empty gradient remains | static (card scales, camera does not) | opacity 1→0, scale 1.00→~0.94 over 5 fr (f142–f147), easings.inExpo; empty f147–f150 | hard-cut | swoosh-short |

Evidence per row:
- Row 1: sheet-01 cells 0–4 (0.00 empty gradient; 0.27 card with avatar and footer, handle half-revealed, no name, no quote; 0.50 name sharp, quote first line partly faded in left to right; 0.77 line 1 sharp, line 2 still fading; 1.00 all settled).
- Row 2: sheet-01 cells 4–15, sheet-02 cells 0–2 (identical frames; motion.json diff 0.0 for 1–4 s); keyframes kf-001.50 … kf-004.50.
- Row 3: sheet-02 cell 3 (4.77 SOFT, card translucent and slightly smaller); cuts/cut-004.73.jpg (before 4.70 card full, after 4.90 empty gradient); cuts.json soft 4.733–4.900, frames 142–147.

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| word-reveal | 1 | craft/vocabulary.md#type (WordReveal) |
| mask-rise | 1 (name and handle) | craft/vocabulary.md#type (BlurIn enter="mask") |

## Look
Palette: #2B9FDE background mid, #39A9E8 gradient light corner (top-left), #1C7FBB gradient dark corner (bottom-right), #FFFFFF card surface, #1C3649 dark text (dimmed sample from the fade frame; full text is near-black), #8ECBF1 card edge / shadow tint. Type: neutral grotesk, sentence case, normal tracking; quote regular ~4 % H, name bold ~2.7 % H, handle and footer regular grey ~2.4 % H, footer source link in accent blue. Treatment: none. Background: diagonal linear gradient, light top-left to darker bottom-right. Card: x 104–1083 of 1188 (82 % W), y 368–820 (38 % H), radius ~2 % W, soft blue-tinted drop shadow.

## What to adapt
- Copy: one quote of 1–3 lines (about 12–20 words), a display name, a handle, a footer meta line (time, date, client).
- Brand: the gradient comes from the brand accent; the verified badge and footer link use the accent; the card stays white (or brand surface).
- Timing: row 2 (hold) stretches freely; the entrance (30 fr) and the exit (5 fr + 3 fr empty) keep their frame counts.

## Pitfalls
- The whole entrance finishes in 1 s; a slower word reveal makes the hold feel short and the clip drag.
- The hold is fully static (no drift); adding a scale creep breaks the clean loop because frame 0 is empty.
- The exit is short (5 fr); a long fade reads as a mistake, not a loop.
- Use a real photo avatar only with the person's consent; otherwise initials.

## Missing components
- PostCard: social post card with circle photo avatar (~11 % card width), name + verified badge, handle, quote body, meta footer with accent link; props for staged reveal (avatar/footer at f0, name/handle mask-rise f8, body word-reveal f15, 15 fr) and exit (fade + scale to 0.94 over 5 fr). Testimonial is close but uses initials only and has no handle/badge/footer (techniques: word-reveal, mask-rise).

## Proposed terms
- post-card: platform-accurate social post card rebuilt as UI (avatar, name, badge, handle, body, meta), row 1–3 (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (no 30 fps strip extracted). Not measurable: card entrance type and duration (it is already in place at 0.27), name/handle mask overshoot, per-word stagger of the quote, exact exit scale curve. Exit window 4.73–4.90 from cuts.json (frame accurate). SFX planned by the glue rule, not measured (reference is silent). cut_on_beat = 0/0 cuts within ±2 fr (no cuts, no beats) → false.

## Study log
id post-card-quote-settle · family social-promo · 5.00 s, 1:1, 30 fps, 3 rows (hook 1.00 s, hold 3.73 s, exit 0.27 s).
Techniques: 2 (word-reveal, mask-rise). Catalogue hint card-grid rejected: a single card, no cascade.
cut_on_beat: n/a (0 hard cuts, 1 soft exit at 4.73–4.90; silent, no beats) → false.
Not measurable at 0.25 s: card entrance, mask overshoot, word stagger, exit curve.
Proposed terms: post-card. Missing components: PostCard (photo avatar, badge, handle, meta footer).
Loopable: yes (first and last frames are the empty gradient).
phase B: not run.
