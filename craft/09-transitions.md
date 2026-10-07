# 09 · Transitions: a catalog keyed to the vocabulary

Tell T10 (craft/00) is "transitions as decoration". The default is a hard cut on the beat. Anything else must be spatial
(the camera or an element carries the eye into the next scene) and must earn its sound. Ids below are from
craft/vocabulary.md; recipes tag `structure[].transition_out` with them.

## Default

- **Hard cut on the downbeat.** Cut frame = `beatFrame(n)` (craft/02#beat-grid). QA tolerance ±2 fr.
- **The incoming shot is already moving** on its first frame (drift at 1.01–1.02, an element mid-entrance). A shot that starts
  from rest after a cut reads as a slideshow.
- **VO films cut on phrase boundaries or word onsets**, never mid-word.
- **Budget:** ≤ 1 non-cut transition per 5 s of film; ≤ 3 transition types in a film under 30 s.
- **Arrival on the beat:** for any transition with duration, the *arrival* frame (where the new scene is fully established)
  sits on the beat, not the start frame.

## Catalog

Each entry: when · frames and curve · sound (vocabulary audio id, timing) · avoid · mode.

### `hard-cut`
- When: default for every shot change; montage; any cut on a kick.
- Frames: 0. Next shot in motion on frame 1.
- Sound: the kick itself, or `hit` layered on it. No whoosh.
- Avoid: cutting from rest to rest; cuts off the grid in launch mode. Mode: both.

### `match-cut`
- When: the same shape, position or motion carries across two subjects (a round logo → an app icon; a card → a list row).
- Frames: 0. Centroid within 3 % of frame width, size within 10 %, motion direction kept. Hold the matched shape 2–4 fr each side.
- Sound: `tick` on the cut, or none if the beat carries it.
- Avoid: "almost" matches (they read as a jump). Mode: both; the best montage glue.

### `mask-wipe`
- When: a shape or a line of type sweeps and reveals the next scene behind it; a word's counter opens into the scene.
- Frames: 10–18, outExpo (or inOutSine for a calm sweep). Direction = reading or story direction.
- Sound: `swoosh-short` 200–300 ms ending on wipe completion.
- Avoid: clock, star, diamond wipes; more than one per film. Mode: both.

### `morph`
- When: an element of scene A becomes an element of scene B (input → message bubble, pill → island, card → row).
- Frames: 15–21 on `ui` (no overshoot) or a FLIP on `layout`. Content cross-fades inside 4–6 fr at the midpoint.
- Sound: `tick` or `ui-confirm` on the settle frame.
- Avoid: morphing while the camera moves (sequence them: morph, then camera); morphing unrelated shapes. Mode: product film.

### `card-tunnel`
- When: many items (messages, tasks, files) rush past the camera and reveal the scene they feed. Once per film.
- Frames (measured): 8 fr landing per card; gather on inOutSine ending 9 fr after the tunnel starts; travel on inQuad ~36 fr;
  blur ≤ 8 px; cards fade when they pass the camera. The destination scene is mounted underneath from the start.
- Sound: `riser` under the gather, `whoosh` ending on the clear frame.
- Avoid: readable text on the near cards (they are texture); more than one tunnel per film. Mode: launch film, hybrid.

### `portal`
- When: a word or shape opens and the next scene is already alive inside it (the counter of a letter, a disc, a window).
- Frames: 10 (measured 8) zoom on ln(scale) with bezier(0.85,0.25,0.5,0.7). End scale = 1.04 × frame diagonal / disc diameter
  (≈ 14× for a disc 9 % of frame width). Inner scene grows ~5× while the disc grows ~14× (parallax). Outgoing blur ≤ 14 px.
- Sound: `whoosh` starting 5 fr before the zoom, ending on arrival.
- Avoid: a static scene inside the disc; a disc that does not cover the frame at the end. Mode: launch film.

### `blur-dissolve`
- When: two calm shots in the same palette (a statement into its echo; one product state into the next with no motion).
- Frames: ≤ 12. Gaussian or directional blur peaks 8–16 px at the midpoint, opacity crossfade linear.
- Sound: none, or a music phrase boundary.
- Avoid: unrelated shots (that is the amateur cross-dissolve); anything longer than 12 fr. Mode: product film, quiet close.

### `slide-push`
- When: sequential states of one thing (step 1 → step 2, feature → next feature on the same surface).
- Frames: 12–18 on `ui` or outExpo. Both scenes move together, no gap. Motion blur on the edge if ≥ 200 px in ≤ 8 fr.
- Sound: `swoosh-short` centred on the midpoint.
- Avoid: a black gap between scenes; bounce; alternating directions. Mode: product film, social cuts.

### `flash`
- When: a hit on the climax or a drop; a montage beat change.
- Frames: 1–3 of white or the accent at ~+200 % luma; the next shot already in motion underneath.
- Sound: `hit` or `impact-low` on the flash frame; `bass-drop` at a climax.
- Avoid: grey full-frame flashes; more than 2 per film; **never more than 3 flashes in any 1 s** (photosensitivity). Mode: launch film.

### `glitch-cut`
- When: a crash, a break, "it went wrong", a tech-coded cut.
- Frames: RGB split 2–6 px and slice offsets for 2–4 fr around the cut; seeded noise, never `Math.random`.
- Sound: `glitch-sfx` 0.2–0.4 s centred on the cut.
- Avoid: product-film mode; more than 2 per film; glitching the logo unless the brand is built on it. Mode: launch film.

### `light-leak`
- When: warm, filmic sections (founder story, nostalgia) where the look already has grain and a film grade.
- Frames: 12–24, peaking on the cut; screen blend, peak opacity 0.5–0.8.
- Sound: `swell`, or let the music carry it.
- Avoid: clean product mode; cold digital palettes. Mode: launch film.

### `smash-cut-black`
- When: the rhythm break. Music stops, the frame goes black, then the payoff lands. Once per film.
- Frames: 6–60 (0.2–2 s) of true black, music at gain 0 (`silence-beat`), then a hard cut into the next shot with `hit` or VO.
- Sound: silence is the sound. Room tone off.
- Avoid: a fade to black (this is a cut); more than one per film. List the black frames in the storyboard (QA YAVG check). Mode: launch film.

### `j-cut`
- When: the next shot's sound leads its picture: a VO line starts over the outgoing shot, a notification ping before the card
  lands, a whoosh leading a zoom-through.
- Frames: sound leads by 4–12 fr. (The reverse, an L-cut where the outgoing sound tails over, is fine for music tails.)
- Avoid: leads > 12 fr (reads as a sync error). Mode: both.

### `zoom-through` (camera)
- When: an object with a transparent centre (a ring, a glass slab, a window, a letter counter) becomes the door.
- Frames: scale 1 → ~40 on inExpo over 18–24 fr until the hole fills the frame; the next scene is underneath and settles
  1.10 → 1.00 on `cameraOut`. Motion blur on the last 6 fr.
- Sound: `whoosh` 300–500 ms ending on the arrival frame (often as a `j-cut`).
- Avoid: zooming into a solid object (reads as a crop); a zoom-through for every scene. Mode: both.

### `whip-pan` (camera)
- When: lateral jump between two places on the same plane or to the next shot in a fast montage.
- Frames: 6–10; inExpo out, outExpo in; at the fastest frame the move is ≥ 30 % of frame width and the cut hides in the blur.
- Sound: `swoosh-short` or `whoosh` centred on the cut frame.
- Avoid: product UI with readable text in the blur; changing direction from whip to whip. Mode: launch film.

### `frame-in-frame` (camera)
- When: a scene shrinks into a card or window inside the next one, or a card scales up to full bleed.
- Frames: 18–30 on `ui` (UI) or `heavy` (hero objects); corner radius and glow (0 0 80px) scale with it.
- Sound: soft `whoosh` or `swell` on the settle.
- Avoid: a card aspect that differs from the scene aspect (visible crop jump at full bleed). Mode: both.

### `pull-out` (camera)
- When: reveal context from a detail (the number → the dashboard → the product on a desk).
- Frames: 24–36 on `cameraOut` (no overshoot), or a slow 2–4 s reveal on inOutSine.
- Sound: `reverse-cymbal` ending on the settle, or `riser` for the slow reveal.
- Avoid: pull-out straight after a push-in in the same shot (yo-yo). Mode: both; the standard product-film ending.

## Implementation

- **Cuts:** `<Series>` or back-to-back `<Sequence>`s. The cut frame comes from the beat grid or the word timings, never typed.
- **`TransitionSeries`** (`@remotion/transitions`): a `TransitionSeries.Transition` overlaps its neighbours, so the total
  duration **shrinks by the transition length**. Recompute every later cut frame after adding one. Allowed presentations:
  `fade` (base for `blur-dissolve`), `slide` (`slide-push`), `wipe` (`mask-wipe`), `none`. Do not use `clockWipe` or `flip`.
- **Spatial transitions are one scene, not two.** Mount the next scene underneath (absolute, already animating) and animate
  the outgoing element on top. No remount at the cut: state stays continuous and 3D scenes do not flash black.
- **Motion blur** on the transition window only: `CameraMotionBlur` (shutter angle 180°, 8–10 samples; cost × samples)
  or `Trail` for a single object (`@remotion/motion-blur`).
- **Sound is an event.** Each non-cut transition writes its sound into film.json events with the arrival frame; the whoosh
  ends on arrival, j-cut offsets are explicit.

## Avoid

| Never | Why / check |
|---|---|
| Cross-dissolve between unrelated shots | the "moodboard" look; QA T10 |
| More than 1 non-cut transition per 5 s | decoration, not spatial; count in the storyboard |
| A whoosh on every cut | sound stops meaning anything; whooshes only on moves |
| A transition window covering a spoken keyword | the eye goes to the move, the ear loses the word; check word timings |
| Built-in clock, star, cube, page-curl effects | slideshow software tells |
| Fade to black mid-film | use `smash-cut-black` (a cut) or keep moving |
| Dissolves longer than 12 fr | mush; cut instead |
| Random directions | slides and whips keep one direction per sequence |
