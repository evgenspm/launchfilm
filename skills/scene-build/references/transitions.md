# Transitions: cuts on the beat, spatial transitions, duration math

Law: craft/09 (catalog per vocabulary id: when, frames, sound, avoid), craft/02#placement-on-the-grid, T10.
Default is `hard-cut` on a downbeat. Any other transition must be spatial (the view moves through, into or along
something) and named from craft/vocabulary.md#transitions. Budget: ≤ 1 non-cut transition per 5 s of film.

## Cut placement

| What changes | Lands on |
|---|---|
| Shot | a downbeat (`grid.downbeatFrame(n)`) or a beat; VO films: a phrase boundary, never mid-word |
| Text inside a shot | the word onset (VO) or a half-beat |
| Scene | the bar (4 beats) |
| Section | the phrase (8 or 16 beats) |
QA tolerance ±2 fr. Snap with `beatGrid(beats, fps).snap(frame)`; never accumulate `n × framesPerBeat`.

## Two duration models (know which one you are in)

1. **Studio engine (preferred).** film.json `shots[].transition = <id>`. The cut frame stays where you put it; for
   transitions with overlap the outgoing shot keeps playing `transitionFrames(id, fps)` past the cut while the incoming
   shot (on top) enters. Total film length does not change. By hand: wrap each shot in `ShotTransition` and extend the
   outgoing `Sequence` by `transitionOverlap(id, fps)`.
2. **`@remotion/transitions` `TransitionSeries`.** A `TransitionSeries.Transition` overlaps its neighbours and SHORTENS
   the total by its length: total = Σ sequence durations − Σ transition durations. Every later cut moves earlier by the
   accumulated transition frames, so re-snap downstream cuts to the grid after adding one.
   ```tsx
   <TransitionSeries>
     <TransitionSeries.Sequence durationInFrames={75}><ShotA /></TransitionSeries.Sequence>
     <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: 10})} />
     <TransitionSeries.Sequence durationInFrames={90}><ShotB /></TransitionSeries.Sequence>
   </TransitionSeries>  // total 155, not 165; ShotB starts at frame 65
   ```
Don't mix both models in one film.

## Spatial transitions (frames at 30 fps)

| Id | Frames | Recipe | Sound |
|---|---|---|---|
| `match-cut` | 0 | same shape, same frame position on both sides (circle → logo, phone → phone); verify with stills N−1 / N | the beat's kick |
| `zoom-through` | 18–24 | object with a transparent centre scales 1 → 40 on `easings.inExpo` until the hole fills the frame; next scene already behind it | whoosh ending on the arrival frame |
| `portal` | 10–18 | next scene alive inside a letter or dot; scale = exp(ln(end) × e(t)), e = bezier(0.85, 0.25, 0.5, 0.7); end scale covers the frame diagonal | whoosh 5 fr before |
| `flash` | 1–3 | white or brand colour on the hit; the new shot is already moving under it (`CutFlash at={cut}`) | hit |
| `smash-cut-black` | 6–15 of black | cut to black, true silence, then the next line | silence-beat |
| `frame-in-frame` | 15–30 | shot shrinks into a card inside the next scene, or a card scales to full bleed | swoosh-short |
| `card-tunnel` | 30–60 | cards accelerate past camera (`inQuad`) into the scene mounted underneath | riser into whoosh |
| `mask-wipe` | 12–16 | a shape or text mask reveals the next shot, `inOutCubic` | swoosh-short |
| `morph` | 15–21 | element becomes the next scene's element (FLIP on `springs.ui`) | tick on settle |
| `slide-push` | 12–16 | next shot pushes the previous out along the motion direction | whoosh |
| `blur-dissolve` | ≤ 12 | only between two calm shots in the same palette | none |
| `glitch-cut` | 2–4 around the cut | slice + RGB split; gritty sections only | glitch-sfx |
| `light-leak` | 8–16 | warm leak over the cut; film/retro look only | none or swell |
| `whip-pan` | 6–10 | fast lateral move with motion blur hiding the cut | whoosh |

## J-cut (audio leads picture)

The next shot's sound starts 4–12 fr before its picture: put its VO/SFX `Sequence` at `cut − n` while the picture
`Sequence` starts at `cut`. Use for reveals and for VO that names the next thing ("the outcome 0.3–0.5 s before the UI").
Tag the shot `j-cut` in recipes; in film.json set the audio offset field the engine exposes (see `<studio>/API.md`).

## Avoid

- Cross-dissolves between unrelated shots; a wipe or a slide as decoration; more than one transition style per section.
- A whoosh on every cut (the kick is the cut sound); a transition that hides a mid-word cut.
- Zooming the camera during a layout morph or a transition (sequence them).
- `blur-dissolve` > 12 fr: it reads as a mistake.
