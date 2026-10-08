# Mark handoff into a connector chat tour

Two-brand lockup opens, then one continuous dark UI tour: add a connector, three prompts with streamed answers, an authorize click that morphs into a permissions list, and the mark returns as the end card.

Source: https://www.raylight.app/templates/tnLnt5na (link only; the original is not redistributed) · studied 2026-10-08 · status: studied

## When to use
- An integration launch: one product becomes a connector inside an AI assistant, shown from install to first real task.
- A setup or onboarding walkthrough that must read without VO: add, ask, act, grant permissions.
- Partnership films: both marks share the opening lockup, then the tour lives in the partner's UI.
- Long-form (40-50 s) calm product demos on a dark UI.
Not for: products with no chat or tool-calling story; fast social cuts (this is one shot, no cuts, ~2.5 s per state).

## Format
16:9 · 45.79 s · 30 fps · dark · music 126.0 BPM, cut_on_beat 0/0 (no cuts) · VO no

## Beat sheet
| # | t (s) | frames @30 | beat | on screen | camera | motion | transition out | sound |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.75 | 0–53 | hook | two-bar product mark punches in huge on flat charcoal, then shrinks to a small centred glyph and holds | static frame; the mark scales ~6x down (motion.json -96 %/s in s0) | mark appears at 0.27 at ~0.3 H tall, shrinks to ~0.03 H by 1.00, easings.outExpo ~20 fr (±0.25 s); holds 1.00-1.75 | continuous | impact-low (planned) |
| 2 | 1.75–3.75 | 53–113 | logo | wordmark unfolds right out of the glyph, a grey suffix tag, a thin dash and the partner mark + name fade in: a two-brand lockup | static (motion.json zoom -0.2 %/s) | wordmark letters wipe out of the glyph by 1.77; suffix at 2.00; dash + partner mark blur-in 2.27-2.50, easings.outQuint ~8 fr (±0.25 s); lockup recentres as it grows | continuous | swell (planned) |
| 3 | 3.75–5.00 | 113–150 | logo | first wordmark fades, partner lockup slides to centre, its name drops away and the glyph alone rises toward the top | static | left half fades 3.77 (±0.25 s); partner lockup recentres 3.77-4.27 springs.ui (overshoot not measurable); name fades 4.50; glyph drifts up ~0.1 H by 4.77 | continuous | swoosh-short (planned) |
| 4 | 5.00–6.25 | 150–188 | reveal | assistant home screen: glyph + greeting line types in, a rounded prompt box with plus, model label and send fades in below; cursor enters from below | static, then zoom starts at ~6.00 (motion.json +4.6 %/s in s5) | greeting reveals left-to-right 5.00-5.27 (~8 fr, ±0.25 s); prompt box fades/rises with it; cursor arrives at 5.50, springs.ui | continuous | type-click (planned) |
| 5 | 6.25–7.25 | 188–218 | feature | close-up on the plus button of the prompt box; cursor hovers and presses it, the button fills grey | zoom-tier region to element ~1.0 to 2.5x by 6.27, then slow drift left (motion.json zoom +16.7 %/s in s7) | camera springs.cameraIn ~8 fr (±0.25 s); cursor press squash springs.click on 6.50; button hover fill 6.50-7.00 | continuous | ui-confirm (planned) |
| 6 | 7.25–9.50 | 218–285 | feature | a row of three menu chips (icon + label + chevron) replaces the box; camera dollies right along it to the third chip, which turns accent | dolly right along the row (motion.json pan -54 to -91 px/s @1920, zoom +17 %/s in s7-s9); zoom-tier element | chips slide in from left 7.27-7.77, stagger ~4 fr (±0.25 s); cursor tracks the target; third chip label + icon turn accent at 8.77; fill tints 9.00; label fades 9.27-9.50 | continuous | ui-confirm (planned) |
| 7 | 9.50–12.50 | 285–375 | feature | the emptied chip morphs into a connector card: square logo tile, name, verified badge, one-line description, plus; cursor clicks the plus, it becomes an accent check | static (motion.json hold, zoom < 0.5 %/s) | card grows from chip 9.50-10.00 springs.layout (overshoot not measurable); cursor glides to the plus 10.27-10.77; press 11.00; accent check pops 11.27 springs.pop (overshoot not measurable); hold to 12.27; content fades 12.50 | continuous | ui-confirm (planned) |
| 8 | 12.50–15.25 | 375–458 | feature | the card shrinks into a single prompt field; prompt one types in (question, 6 words) with the freshest characters in accent | static | card height collapses 12.50-13.00 springs.layout; typing 13.27-14.27 (~1 s, ~40 chars/s), trailing ~6 chars accent then settle to text colour by 14.77; hold to 15.00 | continuous | type-click (planned) |
| 9 | 15.25–16.75 | 458–503 | feature | pull back to the full chat: user bubble top right, assistant working line, tool-call rows tick in one by one, composer bar at the bottom | pull-out ~3x to full chat by 15.50, then tilt up through the thread (motion.json pan -80,-55 in s17) | camera springs.cameraOut ~8 fr (±0.25 s); 3 tool-call rows appear 15.77-16.50, one per ~0.25 s (±0.25 s), each icon + label fade | continuous | tick (planned) |
| 10 | 16.75–19.50 | 503–585 | proof | the assistant answer streams in serif: lead line, three bullets with figures, a follow-up question, then the action icon row | camera tilts up and pushes slightly (motion.json pan -154,-149, zoom +1.3 %/s in s18) | text streams line by line 17.27-18.77, ~0.25 s per line (±0.25 s), each line fades from 0.3 to 1 opacity; action icons 19.00; everything fades 19.27-19.50 | continuous | tick (planned) |
| 11 | 19.50–22.00 | 585–660 | feature | fresh prompt field; prompt two types in (request, 8 words) with accent tail | static (motion.json hold) | empty field fades in 19.50; typing 20.00-21.00 (~1 s), accent tail settles by 21.27; hold to 21.77; field fades by 22.00 | continuous | type-click (planned) |
| 12 | 22.00–24.75 | 660–743 | proof | assistant reply builds top-left: small status line, bold serif lead, a tiny tag chip, then a three-column table (name pill in accent, focus, link) | static (motion.json pan -26 px/s in s22, drift) | status line 22.50; lead streams 22.77-23.00; table headers 23.27; accent pill 23.50; middle and link columns 23.77; link underline 24.00; action icons 24.27; fade 24.75 | continuous | tick (planned) |
| 13 | 24.75–27.75 | 743–833 | feature | fresh prompt field; prompt three types over two lines (guardrail instruction, 9 words) with accent tail | static | empty field 24.77-25.00; typing 25.27-26.77 (~1.5 s), wraps to line two at 26.27; accent tail settles by 27.27; field dims 27.50 | continuous | type-click (planned) |
| 14 | 27.75–30.75 | 833–923 | proof | assistant confirms with one serif line and a ruled key/value spec table: name, description (2 lines), mode, violation rule; action icons | static (motion.json zoom < 1 %/s) | lead line 27.77; table rows build top-down 28.27-29.00, ~0.25 s per row (±0.25 s), rules draw with them; icons 29.77; hold to 30.50 | continuous | tick (planned) |
| 15 | 30.75–33.25 | 923–998 | feature | authorization dialog: partner glyph + title, filled email field, two buttons (deny, authorize); cursor rises from below to authorize | push-in from 32.27: dialog 1.0 to ~2x by 33.00 (motion.json zoom +126 %/s in s32), drifting to the right button | dialog fades in 30.77-31.00; cursor travels 31.00-32.00 springs.ui; camera springs.cameraIn ~15 fr (±0.25 s) | continuous | whoosh (planned) |
| 16 | 33.25–34.75 | 998–1043 | feature | everything but the authorize button blurs and fades; the button alone fills the centre, cursor presses, label turns accent | zoom-tier to element ~3.3x of the dialog by 34.27 (motion.json zoom +32.8 %/s in s33) | field and deny button blur out 33.27-33.77; press 34.27 springs.click; label accent 34.27-34.50; cursor leaves down-right 34.50 | continuous | ui-confirm (planned) |
| 17 | 34.75–36.25 | 1043–1088 | feature | the button morphs into a three-state segmented toggle (allow, ask, block); selection slides from ask to allow, which turns green | static, then the toggle shrinks and rises (motion.json -81 %/s in s35) | button collapses into toggle 34.77-35.00 springs.layout (overshoot not measurable); selection slides 35.27-35.50 springs.ui; shrink 35.77-36.00 | continuous | tick (planned) |
| 18 | 36.25–39.25 | 1088–1178 | proof | permission list assembles: six tool rows, each label + toggle + status pill; three allowed (green), two need approval (amber), one blocked (red) | static (motion.json hold) | toggle docks at top 36.27; rows add one per ~0.25 s 36.77-37.77 (±0.25 s), toggles set as rows land, pills fade 1 row behind; hold 38.00-39.00; list fades by 39.27 | continuous | tick (planned) |
| 19 | 39.25–41.00 | 1178–1230 | logo | return to the opening: the two-bar mark punches in huge and shrinks to a small glyph | static frame; mark scales ~6x down (motion.json animation in s39) | mark appears 39.50 at ~0.3 H, shrinks to small by 39.77-40.00, easings.outExpo ~10 fr (±0.25 s); holds to 40.77 | continuous | impact-low (planned) |
| 20 | 41.00–45.79 | 1230–1374 | logo | end card: wordmark unfolds from the glyph, grey suffix tag, then a small tagline (5 words) beneath; holds to the end | slow push-in ~1.9 %/s (motion.json s42-s45) | wordmark wipes out of the glyph 41.00-41.27; suffix fades 41.50; tagline fades in 42.27, easings.outQuint ~8 fr (±0.25 s); hold 3.5 s; music ends 41.4 | end | swell (planned) |

Evidence per row (cuts/ is empty: no cut frames exist for this reference):
- Row 1: sheet-01 cells 0-6; kf-000.50
- Row 2: sheet-01 cells 7-14; kf-001.50, kf-002.50, kf-003.50
- Row 3: sheet-01 cell 15, sheet-02 cells 0-3; kf-004.50
- Row 4: sheet-02 cells 4-8; kf-005.50
- Row 5: sheet-02 cells 9-12; kf-006.50
- Row 6: sheet-02 cells 13-15, sheet-03 cells 0-6; kf-007.50, kf-008.50
- Row 7: sheet-03 cells 6-15, sheet-04 cells 0-2; kf-010.50, kf-011.50
- Row 8: sheet-04 cells 2-12; kf-013.50, kf-014.50
- Row 9: sheet-04 cells 13-15, sheet-05 cells 0-2; kf-015.50, kf-016.50
- Row 10: sheet-05 cells 3-13; kf-017.50, kf-018.50
- Row 11: sheet-05 cells 14-15, sheet-06 cells 0-7; kf-020.50, kf-021.50
- Row 12: sheet-06 cells 8-15, sheet-07 cells 0-2; kf-022.50, kf-023.50, kf-024.50
- Row 13: sheet-07 cells 3-14; kf-025.50, kf-026.50, kf-027.50
- Row 14: sheet-07 cell 15, sheet-08 cells 0-10; kf-028.50, kf-029.50, kf-030.50
- Row 15: sheet-08 cells 11-15, sheet-09 cells 0-4; kf-031.50, kf-032.50
- Row 16: sheet-09 cells 5-10; kf-033.50, kf-034.50
- Row 17: sheet-09 cells 11-15, sheet-10 cell 0; kf-035.50
- Row 18: sheet-10 cells 1-9, 12; kf-036.50, kf-037.50, kf-038.50
- Row 19: sheet-10 cells 13-15, sheet-11 cells 0-3; kf-039.50, kf-040.50
- Row 20: sheet-11 cells 4-15, sheet-12 cells 0-6; kf-041.50, kf-043.50

## Techniques → craft
| id | rows | where the law is |
|---|---|---|
| ui-rebuild | 4–18 | craft/families (product UI), studio/API.md components |
| logo-from-dot | 2, 20 | wordmark unfolds out of the two-bar glyph; craft/vocabulary.md#brand |
| cursor-path | 4–7, 15–16 | craft/04-motion.md#springs (springs.ui travel, springs.click press) |
| zoom-tier | 5, 6, 16 | craft/03-camera-and-staging.md (zoom tiers) |
| dolly | 6 | craft/03-camera-and-staging.md |
| pull-out | 9 | craft/03-camera-and-staging.md |
| push-in | 15, 20 | craft/03-camera-and-staging.md#drift-and-push-in |
| prompt-typing | 8, 11, 13 | craft/05-typography.md (typewriter), PromptBar |
| stream-text | 10, 12, 14 | StreamText |
| list-assemble | 9, 18 | ListAssemble |
| morph | 7, 8, 17 | craft/09-transitions.md (used inside the shot: chip to card, card to field, button to toggle) |
| end-card | 20 | EndCard |

## Look
Palette: #1D1D1D background, #F2F2F2 text, #A67668 accent (palettegen value; reads as a warm orange on screen), #2E2E2E card/field fill, #8B8B8B secondary text, #151414 deep button fill. Status colours green / amber / red only in row 18. Type: UI in a neutral grotesk, sentence case, small (prompt text ~4 % H at element zoom, ~1.5 % H at full frame); assistant answers in a book serif; wordmark bold grotesk ~2.5 % H. Treatment: none. Background: flat charcoal, no gradient, no grain.

## What to adapt
- Copy: 3 prompts (6-9 words each, a question, a request, an instruction); 3 replies (bullet answer with 3 figures, a 3-column result table, a 4-row spec); 6 permission rows; a 5-word end tagline; 3 menu chip labels.
- Brand: your mark opens and closes the film (two-bar glyph role); the partner assistant's accent carries typing tails, the chosen chip, the check and the authorize label. Keep the accent off body text.
- Timing: each prompt/answer pair is ~2.5-3 s; rows 8-14 can repeat or drop a pair in 2.75 s units. The opening (rows 1-3, 5 s) and the end card (4.8 s) keep their lengths.

## Pitfalls
- Never cut: every state change is a fade, morph or camera move inside one shot; a hard cut breaks the "one continuous session" read.
- Empty frames between states are short (one 0.25 s cell at 22.00, 24.77, 39.27); longer blanks read as an ending.
- Answers stay small at full-frame zoom (~1.5 % H): the camera never zooms into them, only into controls (plus, chip, authorize). Zoom into the control you click, not into the text.
- Accent tail on typing must settle to the text colour within ~0.5 s or the prompt reads as an error.

## Missing components
- ConnectorCard: logo tile 40 px, name + verified badge, one-line description, trailing plus that pops to an accent check (springs.pop) (techniques: ui-rebuild, morph)
- AuthDialog: glyph + title row, read-only email field, two equal buttons (deny / authorize), ~320 px wide at 1280 (techniques: ui-rebuild, zoom-tier)
- TriToggle: 3-segment pill (allow / ask / block) with a sliding selected segment and per-state colour green / amber / red (techniques: list-assemble, morph)
- KeyValueTable: ruled rows, grey key column ~15 % width, serif value column, rows build top-down one per ~8 fr (techniques: stream-text)

## Proposed terms
- accent-tail-typing: while typing, the last ~6 characters are in the accent colour and settle to text colour (rows 8, 11, 13) (not in craft/vocabulary.md; not used in recipe.json)
- focus-isolate-blur: on a push-in, every element except the click target blurs and fades out, leaving the target alone in frame (row 16) (not in craft/vocabulary.md; not used in recipe.json)

## Measurement notes
Resolution: 0.25 s from sheets (7.5 fr@30); no 30 fps strips were extracted. Not measurable: overshoot of any spring, typing cadence per character, stagger below 0.25 s, exact zoom curves (magnitudes estimated from object widths in cells and motion.json zoom %/s). SFX planned by the glue rule, not measured: the reference has music only (126.0 BPM, -12.87 LUFS, silence 41.4-45.79 apart from a short tail). cut_on_beat = 0/0 cuts within ±2 fr (cuts.json lists no cuts; cut_on_beat false). Palette from palettegen on kf-010.50, kf-023.50, kf-034.50 (keyframes, as cuts/ is empty).

## Study log
- id mark-handoff-connector-chat-tour, family ai-chat, 45.79 s, 20 rows, one continuous shot (0 cuts).
- techniques 12; cut_on_beat 0/0 (false); music 126.0 BPM, energy medium, no VO.
- not measurable at 0.25 s: spring overshoot, per-char typing cadence, sub-cell staggers, zoom curves.
- proposed terms: accent-tail-typing, focus-isolate-blur.
- missing components: ConnectorCard, AuthDialog, TriToggle, KeyValueTable.
- phase B: not run.
