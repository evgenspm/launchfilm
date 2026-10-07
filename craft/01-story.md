# 01 · Story and storyboard

Story before template (`T11`). The storyboard is the contract: the user approves it before scene code exists.

## Order of work

Never skip a gate. Each gate leaves an artifact: sources in `<studio>/films/<slug>/`, assets and audio in
`<studio>/public/films/<slug>/`, QA in `<studio>/qa/<slug>/`, renders in `<studio>/out/<slug>/`.

| # | Gate | Artifact | Done when |
|---|---|---|---|
| 1 | Brief | `BRIEF.md` | product, the one message, audience, mode, length, presets, VO yes/no, CTA + URL, must-show, must-not-claim: all filled |
| 2 | Brand | `brand.json` + `brand/` | colors, fonts, logo captured from the repo, URL or screenshots; a failed capture is a hard stop, never invented |
| 3 | Story | VO script + `STORYBOARD.md` | every storyboard cell filled; user wrote "approved" (record `approved: <date>`) |
| 4 | Sound | VO (one call, best-of-N), word timings, music + `beats.json`, sfx plan | word timings and the beat grid exist: **these two files are the timeline** |
| 5 | Build | `film.json` + `Film.tsx`/scenes | every shot placed on a word onset or a beat frame |
| 6 | QA | `qa/<slug>/QA.md`, sheets, stills | all `T1`–`T12` closed with evidence (`craft/08#blocking-checks`) |
| 7 | Render | one file per preset | `craft/10#presets` encode checks pass in ffprobe |
| 8 | Package | poster (frame 0), `.srt`, `credits.txt` | files next to each render |
| 9 | Post | `out/<slug>/POST.md` | copy passes the banned-phrase list (`craft/11#banned-phrases`) |

Write the VO before touching code. Read it aloud at 2.5–3 words/s; the VO timings become the cut list.

## Two modes

Full comparison: `craft/00#two-modes`. Pick in the brief:

| Choose | When |
|---|---|
| Product film | The product UI is the story; one feature or one flow; 10–20 s; landing page, docs, feature drop, social demo |
| Internet-native launch film | A launch, a thesis, a category claim; 15–90 s; X/LinkedIn launch day; the product is the payoff |
| Hybrid | A launch that must also show the UI: montage open → product middle → montage close |

## Structures

Proportions measured on studied references and generalized. Scale times to the target length; keep the shares.
Beat labels only from the vocabulary (`hook · problem · tension · reveal · feature · proof · social-proof · cta · logo · outro`).

### 6 s

Bumper, hero teaser, reel loop.

| t0–t1 (s) | beat | share | on screen | camera | sound |
|---|---|---|---|---|---|
| 0–1 | hook | 17 % | the product word or the friction, already moving at frame 0 | drift 1.00→1.04 | hit on the first downbeat |
| 1–4.5 | proof | 58 % | one moment of the product working | tier 2 → 3 | tick/pop per event |
| 4.5–6 | logo | 25 % | mark + URL | heavy settle, then still | music tail |

### 15 s

**Product film (one feature, 0–1 cuts):**

| t0–t1 | beat | share | on screen | camera | sound |
|---|---|---|---|---|---|
| 0–1.5 | hook | 10 % | UI at 0.80–0.90 scale, empty state, title visible | tier 1, drift | soft tone |
| 1.5–4 | feature | 17 % | the user acts: typing, cursor | tier 2 | type-click per char, ui-confirm on submit |
| 4–11 | feature | 47 % | the product works: staggered rows, container grows, chart draws | tier 3 (1.5–2.0) | tick/pop per element |
| 11–14 | proof | 20 % | hold on the result | tier 2, drift only | music carries |
| 14–15 | logo | 6 % | pull-out to tier 1, mark | cameraOut | reverse-cymbal or tail |

**Reel (launch, 9:16):**

| t0–t1 | beat | share | on screen | camera | sound |
|---|---|---|---|---|---|
| 0–1 | hook | 7 % | claim card or friction, hard cut in | drift | hit |
| 1–4 | problem | 20 % | 3–4 shots of the pain, 0.6–1 s each | drift per shot | cuts on beats |
| 4–6 | reveal | 13 % | product on its own background | push-in 1.00→1.08 | swell or bass-drop |
| 6–12 | proof | 40 % | the product doing the job, 2 beats | tier 2 → 3 | glued sfx |
| 12–15 | logo | 20 % | mark + URL + CTA | settle | music tail |

### 30 s

| t0–t1 | beat | share | on screen | camera | sound |
|---|---|---|---|---|---|
| 0–2 | hook | 7 % | pattern from the hook bank | drift | first downbeat hit |
| 2–8 | problem | 20 % | the pain in 4–8 shots, one caption each | drift, center anchor | cuts on beats |
| 8–10 | tension | 7 % | the break: stop, black, one line | still or slow push | silence-beat 0.5–2 s |
| 10–24 | reveal → feature | 47 % | product enters, 2–3 features, 4–6 s each | tiers, one per move | glued sfx, music returns |
| 24–26 | proof | 7 % | a number, a result, a quote with a name | push-in | tick on counter steps |
| 26–30 | cta → logo | 13 % | one line on black or brand surface, mark, URL | settle to still | music out or tail |

### 45 s

| t0–t1 | beat | share | on screen |
|---|---|---|---|
| 0–2 | hook | 4 % | hook bank pattern |
| 2–9 | problem | 16 % | pain montage, 0.6–1.5 s shots |
| 9–11 | tension | 4 % | rhythm break |
| 11–35 | feature ×3 | 53 % | 8 s per feature: verb line → UI doing it → result held ≥ 1.5 s |
| 35–39 | proof | 9 % | numbers or social proof |
| 39–45 | cta → logo | 13 % | thesis line, mark, URL |

### 60 s

Product Hunt, LinkedIn long cut.

| t0–t1 | beat | share | on screen |
|---|---|---|---|
| 0–3 | hook | 5 % | hook bank pattern; category clear by 3 s |
| 3–12 | problem | 15 % | the pain, then who has it |
| 12–16 | reveal | 7 % | product on black, name in frame ≥ 0.7 s |
| 16–46 | feature ×3–4 | 50 % | 7–10 s each, each with its own micro-hook line |
| 46–52 | proof / social-proof | 10 % | result numbers, named quote (with permission) |
| 52–60 | cta → logo | 13 % | CTA line, mark, URL, 3–4 s hold |

### 90 s

Founder story. Three tonal acts; the grade changes on each act cut.

| t0–t1 | beat | share | on screen | pace |
|---|---|---|---|---|
| 0–3 | hook | 3 % | first line of the story, typed to the VO | 3–4 s shots |
| 3–27 | problem | 27 % | the world before: warm grade, slow push-ins, the value at stake | 3–4 s shots |
| 27–41 | tension | 16 % | the problem escalates: colder grade, meme-literate type once | 0.5–1 s shots |
| 41–45 | tension | 4 % | the break: glitch-cut, then silence | 1 shot |
| 45–51 | problem | 7 % | the pain, one held shot | 5 s hold |
| 51–75 | reveal → feature | 27 % | the answer: making-of, real device, the product calm | 2–3 s shots |
| 75–90 | cta → logo | 17 % | the promise: quiet-close serif on black, logo | 3–4 s holds |

## Hooks

Hook rules (all blocking):
- Something visibly changes by **frame 15** (0.5 s at 30 fps).
- The category (what kind of product, for whom) is clear by **1.5 s** on x/li, **1 s** on reels, **3 s** on ph.
- **Frame 0 is the poster** (`craft/10#poster`): never black, never a blank fade-in; the friction or the product name is
  already visible and readable at 480 px wide.

| # | Pattern | Frame 0 | Changed by frame 15 | Use when | Risk |
|---|---|---|---|---|---|
| H1 | Friction in frame | the user's screen with the pain visible (e.g. Acme Ledger: 47 overdue invoices, red badge) | one more item arrives, badge ticks | product film, social demo | reads as a bug screenshot without motion |
| H2 | The break | a calm, clean statement or UI | it scatters or glitch-cuts away | hype trailer | chaos with no payoff by 8 s |
| H3 | One-line magic | empty prompt bar, caret, first 2–3 chars typed | ~8 chars typed (30–60 ms/char) | AI products | typing slower than 60 ms/char kills it |
| H4 | The number | a real, sourced number at hero size | counter steps or a word lands beside it | proof-led, data products | unsourced numbers; never invent |
| H5 | Before → after | split frame, the "before" side moving | the wipe starts | tools that change a visible artifact | "after" not legible within 1 s |
| H6 | Claim card | one 4–7 word statement, hard cut in, no animation | dim-emphasis on the key word or line 2 rises | launch open, muted feeds | generic claims; must be specific and true |
| H7 | Question to the viewer | a specific question ("When did you last reconcile by hand?") | the answer cue starts | known, sharp pain | rhetorical questions read as ads |
| H8 | Detail to scale | a macro detail (one row, one cursor) | pull-out begins | products whose scale impresses | detail unreadable at preview size |
| H9 | The catalog | a label "Every deploy log has:" + item 1 | item 2 cuts in on the beat | dev audiences, self-aware tone | inside joke; turn to the product by 8 s |
| H10 | Mid-action | the UI mid-gesture (a drag in flight) | the gesture completes | the gesture is the product | unclear what was dragged |
| H11 | The clock | a clock at a specific time, a task undone | time jumps forward | time-saving products | fake durations; claims must be true |
| H12 | Sound-led type | first typed word on near-black with keyboard clacks | the second word lands | founder voice, intimate tone | muted viewers: the type alone must carry |

## Storyboard format

One row per shot in `STORYBOARD.md`. **An empty cell is a defect** (write `none` when deliberately empty, never blank).

| # | t0–t1 (s) | frames | beat | on screen | camera | motion | transition out | text | VO | sound | rule |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 3 | 4.00–5.20 | 120–156 | problem | Acme Ledger inbox, 47 overdue rows | drift 1.00→1.04 | rows drop in, `drop` spring, stagger 4 fr | hard-cut | "47 overdue." | "Forty-seven, overdue." | tick per row, −16 dB | craft/02#placement-on-the-grid |

Column rules:
- `frames` at the film fps; `t0` lands on a word onset or `beatFrame(n)` (`craft/02#placement-on-the-grid`).
- `camera` ∈ drift · push-in (from→to) · pull-out · tier N→M · dolly · tilt-plane · zoom-through · rack-focus.
- `motion` names presets and frames: "`snappy`, 12 fr, stagger 2 fr". Never adjectives alone.
- `transition out` and `sound` use vocabulary ids (`hard-cut`, `match-cut`; `tick`, `whoosh`).
- `rule` cites the craft anchor behind the main decision (`craft/04#springs`, `T6`).
- Add a header block: mode, length, presets, BPM, look per section, VO voice + style line, `approved:`.

## Rules

1. **Hook inside 1 s** (see Hooks). Frame 0 is designed.
2. **One idea per shot.** Two captions = two shots.
3. **The VO is the clock** (VO films): text appears on the word, cuts land on phrase boundaries, never mid-word.
4. **Contrast is the drama.** Every film > 20 s has one rhythm break: a stop, 0.5–2 s silence, a palette flip.
5. **The payoff is the product.** In launch mode it arrives after the tension, on its own background, at a slower pace.
   Its identity (mark or name) is in frame ≥ 0.7 s at first appearance.
6. **End calm.** Result held (3–5 s product film, ≥ 1.5 s social), then the end card 2–3 s (3–4 s on ph and long
   launch films). Music out or tail. Never end mid-motion.
7. **Sound-off first.** On x, li and reels assume mute: on-screen text plus burned captions carry the story.
8. **One friction per film** in social demos. Situation → friction → one gesture → payoff in the same pixels. Not a tour.
9. **True on pause.** Names, times, totals and dates add up across shots. Never script a feature the product lacks;
   `BRIEF.md` must-not-claim list is enforced. The product never acts on its own if the real one needs a click.
10. **Say the outcome 0.3–0.5 s before the UI shows it**, then stop talking while it lands (`craft/11#copy-rules`).
