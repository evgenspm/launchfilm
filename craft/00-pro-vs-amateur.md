# 00 · Pro vs amateur: the 12 tells

Read this first. Every other craft file is the how; this is the bar. Agent-made motion looks amateur for twelve
specific, checkable reasons. Each one below is **blocking**: a film with an open tell does not render for delivery.
QA (`craft/08#blocking-checks`) and the `film-qa` skill cite these IDs (`T1`…`T12`).

## The 12 tells (blocking)

| ID | Tell | Antidote (with numbers) | How to check | Fix |
|---|---|---|---|---|
| T1 | **Static frames.** A card fades in, then nothing moves for 3 s. | Nothing static > 18 fr (600 ms). Every otherwise-static shot drifts: scale 1.00→1.03–1.05 over the shot, or a linear pan 1.1–3.1 px/fr at 1920 wide. Exceptions: the end-card settle (≤ 3 s) and a deliberate silence beat. See `craft/03#drift-and-push-in`. | Contact sheet at 4 fps: any 3 consecutive identical cells = fail. Storyboard `camera` column never says `static` for > 18 fr. | Wrap the shot in the camera preset with a drift; or add internal motion (ticker, particles, rim light). |
| T2 | **Default easing.** `ease-in-out 300ms` or linear on entrances. | Named springs and easings only (`craft/04#springs`). Entrances: outExpo or a spring with ζ 0.55–1.0. Exits: inExpo, shorter than the entrance. Use linear only for continuous motion. | `grep -rnE "ease-in-out|Easing\.ease\b|transition:|stiffness:\s*[0-9]" films/<slug> src/recipes/<id>` → any hit outside `presets/` fails. | Replace with a preset name from `springs`/`easings`. |
| T3 | **Everything appears at once.** Five items, one keyframe. | Stagger: chars 1 fr, words 2–3 fr, rows 3–4 fr, cards 5–6 fr. Group entrance ≤ 24 fr. Next element starts at ~60 % of the previous one's motion (`craft/04#stagger-and-overlap`). | Stills at entrance frame +0, +4, +8: siblings must be in different states. | Add `stagger` per sibling index; overlap sections. |
| T4 | **One speed the whole film.** | Rhythm with contrast: slow → fast → hard stop → rebuild. Cuts on downbeats (±2 fr). At least one rhythm break (silence, stop, palette flip) in any film > 20 s. Shot lengths by mode in `craft/02#shot-length-by-mode`. | Compare cut list to `beats.json`; storyboard has a row with beat `tension` or a `silence-beat` sound. | Re-cut on the grid; insert a 0.5–2 s silence before the payoff. |
| T5 | **Silent, or one track laid under.** | Glue rule: every visual event has a sound, every sound a visual (`craft/02#glue-rule`). Music has a beat grid the edit follows. Silence is punctuation. | For each `film.json` event: an sfx id, or a VO word / music hit within ±2 fr. Count unglued events = fail if > 0. | Place sfx from the vocabulary audio ids; mute music for the break. |
| T6 | **Text is a label.** Small, top-left, explains the visual. | Text is the picture: hero line 50–80 % of frame width, statement ≥ 10 % of frame height (108 px at 1080), dead centre, one idea per shot, synced to the VO word. | Still at each text shot: measure the text bbox width ÷ frame width. Count ideas per shot = 1. | Enlarge, centre, split into shots (`craft/05#sizes`). |
| T7 | **Flat, ungraded, no texture.** Pure #fff on #000, CSS shadows. | A named look per section (`craft/06#grade-discipline`). Launch mode: grain 0.08–0.15 opacity, vignette 20–35 % at the corners. Big soft shadows, 1 px hairlines at 8–12 % white. | Storyboard names a look per section; still shows grain at 200 % zoom; no gradient wider than 400 px without grain or dither. | Add the look preset; dither dark gradients. |
| T8 | **Web-layout instincts.** Header, paragraphs, cards in a grid, a safe area everywhere. | Frame as canvas: one focal point per frame, ≤ 3 lines, no paragraphs, no bullets, no UI chrome unless the chrome is the point. Hero type may bleed when energy calls for it; captions and UI keep the platform safe zone (`craft/10#safe-zones`). | Still per shot: count focal points (1), lines (≤ 3), bullet glyphs (0). | Cut content, split shots, crop to the subject. |
| T9 | **Generic stock or nothing.** "Person smiling at laptop". | Footage with a point of view: product UI rebuilt in React, the user's own recordings and photos, public-domain archive, generated clips under one grade (`craft/07#sources`). | `footage/SOURCES.md` lists every clip with source and license; no clip tagged generic stock without a grade. | Replace with a rebuild or a sourced, graded clip. |
| T10 | **Transitions as decoration.** Dissolves and wipes everywhere. | Hard cut by default. Non-cut transitions only when spatial (zoom-through, match cut, frame-in-frame, flash on a hit), ≤ 1 per 5 s (`craft/09#default`). Dissolves only between calm shots in one palette, ≤ 12 fr. | Count non-`hard-cut` values in storyboard `transition out` ÷ duration. | Convert to hard cuts on the beat. |
| T11 | **Template before story.** | Story first: a hook that changes something by frame 15 and is clear by 1.5 s (1 s on reels), one message, a payoff, a CTA. The storyboard is approved by the user before scene code exists (`craft/01#order-of-work`). | `STORYBOARD.md` has `approved:` with a date before the first commit to `Film.tsx`. | Stop building; write and approve the storyboard. |
| T12 | **Never looks at the output.** Renders, ships. | Frame QA: contact sheets read, stills at every beat, loudness and ffprobe measured, evidence written to `qa/<slug>/QA.md` (`craft/08#procedure`). | `qa/<slug>/QA.md` exists, every line cites a file or a number; no line says pass without evidence. | Run `npx launchfilm qa <slug>`, read every sheet, fix, re-render. |

### Fast pass (10 minutes, before any delivery render)

1. `npx launchfilm sheet <slug>` and read every sheet: T1 (3 identical cells), T3, T6, T8, T10.
2. `npx launchfilm still <slug> <t>` at frame 0 and at every storyboard `t0` + 0.5 s: T6, T7, T8, hook rules (`craft/01#hooks`).
3. The two greps in T2 and `craft/04#determinism`: 0 hits.
4. Cut frames vs `beats.json`, text onsets vs word timings: T4 (±2 fr).
5. Event list vs sfx cues: T5 (0 unglued events).
6. `STORYBOARD.md` `approved:` date and `footage/SOURCES.md`: T11, T9.
7. Write each result with its evidence path or number into `qa/<slug>/QA.md`: T12.

Rules of use:
- A tell is either **open** (fail) or **closed with evidence**. "Mostly fine" is open.
- Fixing one tell must not open another (adding a dissolve to fix T4 opens T10).
- The tells apply to both modes; the numbers differ by mode where marked in the linked files.

## Two modes

Decide the mode in the brief (`craft/01#two-modes`). The rules are shared; the numbers differ.

| | Product film | Internet-native launch film |
|---|---|---|
| What carries it | The product UI, rebuilt in React with real tokens | Hero type synced to VO or beat, over montage |
| Camera | Slow spring camera through 4 zoom tiers (`craft/03#zoom-tiers`), a cursor performs | Drift on every shot, center-anchored fast cuts |
| Cuts | 0–2 per 15 s; beats every 1.5–2.5 s via camera moves | 0.4–2 s shots; hype 0.6 s avg, word-per-cut 0.78 s avg |
| Look | Product palette, clean: no grain on UI, soft shadows, hairlines | One grade unifies all sources: grain + vignette on |
| Type | Product font at real UI size; the camera zooms, the type does not grow | Hero statements 10 % of frame height and up; meme-literate type once or twice |
| Product | Present from frame 0 | Arrives as the payoff, on its own background, at a slower pace |
| Typical length | 10–20 s | 15–90 s |

**Hybrid:** launch-film open (hook + problem in montage) → product-film middle (UI, camera tiers) → launch-film close
(thesis line on black, logo). Mark the switch in the storyboard; the grade changes exactly on that cut.

Do not mix by accident: a product film with grain on the UI, or a launch film that cuts to a static screenshot, fails T7/T1.

## One sentence

Premium = **rhythm** (cuts, staggers and springs on a beat) + **a look** (grade, grain, treatment) + **text as the hero**
+ **sound glued to every event** + **a story with a hook and a payoff** + **reading your own frames before you ship**.
