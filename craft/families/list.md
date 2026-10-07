# Family: the list that maintains itself (and ask → think → answer)

For products whose core object is a list that changes by itself: a to-do, an inbox, a queue, a pipeline, deal stages.
Script the changes as events; the component does the choreography. Numbers measured frame by frame on studied references
at 30 fps; scale frames by fps/30.

## When

- **The list changes by itself**: product mode (craft/00#two-modes): real tokens, clean look, slow push-in 1.00 → 1.04
  over the shot, no grain on the UI.
- **Ask → it works → answer**: prompt bar → thinking state → the result (a row, the list, a card).
- **Where did it get that?**: a source pipeline lighting up in order, or a context chip that knows N things.

## Numbers

| Technique | Recipe | Values |
|---|---|---|
| Drop-in from the camera | row starts huge, soft, translucent, offset lower-left; scale, blur, opacity and offset ride ONE spring | scale 2.2 → 1 (≈ 108 % of frame width) · blur 12 → 0 px (clears ~15 % before landing) · opacity = p × 1.8 · offset (−8 % width, +48 px) · `drop` 200/22/0.8 lands in **9 fr** (2 % band), 0.4 % settle · stagger 4 fr (reference 3–6, mean 4.5) |
| Write-in (new item) | card fades in, checkbox pops (`snappy`), source tag grows from its left edge, title revealed by a moving gradient mask with an accent leading edge | card 4 fr · tag 3 fr (+1) · text 10 fr `outQuint` (+2) · whole row ≈ 12 fr (reference: tag 2–3, text 6–8, rows 3–4 fr apart) |
| Insert mid-list | rows below make room at `at` (`layout`), the new row lands 3 fr later, then an accent "new" glow fades | insert delay 3 fr · glow 40 fr |
| FLIP reorder | each row has an additive spring track of y targets, so interrupted moves blend. The row that rises most is **carried** (`drag`, scale 1.03, 56 px shadow, top z); the rest follow 3 fr later on `layout` | carried ≈ 16 fr · followers ≈ 13 fr |
| Check-off | ring fills (`pop`) → tick draws → strike-through draws → text dims → hold → row collapses (opacity, scale 0.96, −6 px, `inQuad`) → gap closes (`layout`) | tick 8 fr · strike 10 fr (+6) · hold 26 fr (≈ 0.9 s, the tick is read before it goes) · collapse 8 fr · gap +2 fr |
| Stale → drop or move | row dims to muted, meta swaps to the question, two pills pop (`snappy`, 3 fr stagger), the pick presses (`click`, 10 % squash, fill). Drop = slide right 60 % width with blur (`inQuad` 10 fr), gap closes. Move = carried to target, meta → resolved label | dim 10 fr · pills +8 fr · pick +30 fr · exit +35 fr |
| Focus ring ("right now") | 2 px accent ring, 4 px halo, 44 px glow; its rect is a weighted blend of row rects; a focus change hands weight old → new through `ui`, so it travels and follows moving rows. Focused row grows 30 px for an eyebrow and tints toward the accent. A carried row passing over it fades the ring (occlusion) | travel ≈ 14 fr |
| Live height | the list's height is spring-animated; centre the list on it so it recentres as rows arrive and leave | |
| Colour-trail typing | newest chars in the accent, cooling to fg over 5 fr; caret solid while typing, 1 Hz blink when idle | 30 chars/s ± 15 ms, +½ interval after a space (reference 23 and 38 chars/s, 3–4 char trail) |
| Send press | button lights when the first char lands; press = `click` squash 14 %, accent ripple ring; a glow blooms behind the bar and a shimmer band sweeps inside it; exit dissolves the bar so the next element grows out of the glow | light 4 fr · ripple 14 fr · exit blur 18 px, scale 1.05 × 0.85, 8 fr (reference press 3 fr to 0.84; bar → glow 2–3 fr) |
| Thinking shimmer | gradient text, bright band ≈ 44 % wide sweeping left → right | sweep 14 fr, period 30 fr · spinner 24 fr/turn · step lines 5 fr apart, 4 fr fade + 4 px rise · resolve: blur-out 8 fr, content blur-in 14 fr starting 4 fr later (reference sweep 10–12, period ≥ 25, lines 2–6 fr apart) |
| Status-dot pipeline | dot dim → full, running = accent pulse ring, done = solid + check; label and sub-line typed with a 3-char fade trail; 5 dashes between dots fill top → bottom when the stage above completes | dot 2 fr · pulse 24 fr · check 3 fr · 60 chars/s · dashes 0.6 fr apart · stages 6–8 fr apart |
| Context chip | pill with a neutral glyph, `snappy` scale 0.92 → 1, count ticks up, dropdown opens with a 6 px drop, items stagger, check fades | count 1 step per 3 fr · dropdown 3 fr · items 2 fr apart · check 2 fr |
| Geometry | size 1 = row 92 px, title 30 px (hero size at 1080p); 9:16: size ≈ 1.05, width 1000 | |

What reads as expensive: one curve per element (scale, blur, opacity, offset on the same spring) · 2–3 rows in flight
(overlap) · one object moves first in every reorder · every change has a visible cause (a signal flies from where it
happens, holds beside the list, dissolves into the row it changes; it never sits under the list) · exits shorter than
entrances · no bounce on UI (the only overshoot is the check fill).

## Choreography

"Acme Inbox triage", 14 s (420 fr), one shot, push-in 1.00 → 1.04, list centred on its live height:

| s | Event |
|---|---|
| 0.07 | header "Today · Fri 3 Oct" |
| 0.27–1.1 | five rows drop in, 4 fr apart |
| 1.5 | focus ring on "Review the Q3 contract" |
| 2.2 | chat signal ("Dana: can you send pricing?") pops right of row 2 |
| 3.0 | it flies into the list; "Send Dana the pricing sheet" writes in at #2 |
| 4.1 | calendar signal "Call moved to 11:30" |
| 5.0 | reorder: "Prep notes for the 11:30 call" carried to the top, rest step down 3 fr later, ring rides with its row |
| 6.9 | "Send invoice #1042" ticks, strikes, collapses at 7.8, gap closes |
| 8.4 | "Rewrite onboarding email" goes stale: Drop / Move pills; Drop pressed at 9.4, row slides out |
| 10.4 | "Call starts in 10 minutes" updates the top row's meta |
| 11.2 | focus travels to the call row; hold to 14.0 |

Event format (`at` = absolute composition frame):

| type | fields | what happens |
|---|---|---|
| `add` | `task {id, title, source?, meta?}`, `index?` (default end), `enter?` drop / rise / write, `glow?` | rows below make room at `at`; mid-list rows land +3 fr |
| `done` | `id` | check, tick, strike, dim; collapses at `at + 26`, gap closes |
| `move` | `id`, `to` | carried to index `to`, rest follow +3 fr |
| `order` | `ids` (partial ok) | full reorder; the row that rises most is carried |
| `stale` | `id`, `label?`, `choice?` drop / move, `to?` | dim, pills +8, pick +30, exit +35 |
| `focus` | `id` or null | ring travels; focused row grows 30 px |
| `update` | `id`, `patch` | meta cross-swaps (4 fr out, 6 fr in); title/source switch on the frame |
| `remove` | `id` | collapse without a tick |

## Components

`ListAssemble` and `PromptBar` (in the studio list); `ThinkingState`, `SourcePipeline`, `ContextChip`, `TaskRow` may not
exist: verify the API in studio/API.md; if missing, build them inside the film/recipe folder from the Numbers.

```tsx
<ListAssemble width={940} size={1} header={{title: 'Today', date: 'Fri · 3 Oct'}} events={[
  ...assemble(rows, 8),                       // add × n, 4 fr apart, enter 'drop'
  {at: 46, type: 'focus', id: 'contract'},
  {at: 92, type: 'add', task: {id: 'pricing', title: 'Send Dana the pricing sheet', source: 'chat'}, index: 1, enter: 'write'},
  {at: 152, type: 'order', ids: ['call', 'contract', 'pricing']},
  {at: 208, type: 'done', id: 'inv'},
]} />
<PromptBar text="Summarize this week's churn" startFrame={10} cps={30} sendAt={70} exitAt={84} />
```

## Sound

The event list IS the cue sheet. Gains on −3 dBFS assets; subtract 6 dB under VO.

| Event | Audio id | When | Gain |
|---|---|---|---|
| row drops in | `tick` | landing frame (at + 9) | −16 dB |
| write-in / prompt typing | `type-click` (3–5 variants) | each char | −20 dB |
| carried row | `swoosh-short` | carry start | −12 dB |
| check-off | `ui-confirm` | tick start | −12 dB |
| stale pills pop | `pop` | at + 8 | −14 dB |
| pick press | `type-click` | at + 30 | −14 dB |
| drop slide-out | `swoosh-short` | at + 35 | −12 dB |
| focus travels | `swoosh-short` | focus frame | −16 dB |
| send press | `ui-confirm` | sendAt | −12 dB |
| thinking resolves | `shimmer` | resolve frame | −16 dB |
| pipeline stage done | `tick` | each doneAt | −16 dB |
| chip count | `tick` | every 2nd step | −20 dB |

## Pitfalls

- Camera moving during a reorder or insert (layout morph): sequence morph → camera → morph (craft/03#zoom-tiers).
- Several rows moving at equal speed in a reorder: one row must lead and sit on top.
- The focus ring briefly on the wrong row while a carried row passes: fade it by occlusion.
- Bounce on rows or pills; check fill is the only overshoot.
- List scrolling past the frame, multi-line titles, nested sub-tasks: not covered by these numbers; keep titles to 1 line.
- A cursor-driven pick needs cursor keyframes (craft/03#cursor-and-keycaps): arrive 6 fr before the press.
- Source tags may show real app marks only whole and unmodified; otherwise use neutral stroke glyphs.

## Techniques

`list-assemble` · `prompt-typing` · `thinking-state` · `stream-text` · `click-ripple` · `cursor-path` · `ui-rebuild` ·
`push-in` · `glow` · audio: `tick` · `type-click` · `swoosh-short` · `ui-confirm` · `pop` · `shimmer`
