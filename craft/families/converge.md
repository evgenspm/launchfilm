# Family: converge (scattered inputs collapse into one core)

The central idea of many AI and data products: fragments from everywhere (messages, mail, events, tabs, files, tool
tiles) are pulled into one core, which then produces the answer. Numbers measured frame by frame on studied references at
30 fps; scale frames by fps/30. `m` = min(W, H); `H` = frame height.

## When

| Beat | Use | Why |
|---|---|---|
| Inputs are everywhere (`hook`, `problem`) | depth field of fragment cards | real parallax + depth of field reads as a world, not a grid |
| All your sources (`feature`) | carousel ring (tilt 74–83°) of tool tiles around the core | many tools orbiting one centre = "one place" |
| It understands (`reveal`) | converge into the core, then the ring contracts | gravity: fragments accelerate in, each arrival a light hit, the last one a shockwave |
| A calm centre line with the world around it | item wheel | items pass in front of and behind the words |
| How complete is the picture (`proof`) | progress ring | one decisive steep fill, number in sync |
| Fragments → core (transition) | camera rush through the depth field into the far core (`zoom-through`) + light burst on the cut | spatial transition, not a dissolve |

## Numbers

| Technique | Values |
|---|---|
| Dolly through a ring | radius 0.44 → 0.76 (3 fr) → 0.90 (9 fr) → 0.96 (24 fr) → 0.98 (40 fr) of its end value: `outExpo` over 40 fr. Explodes open on the cut, keeps creeping, never stops |
| Ring line | 8 segments, 3–4° gaps, ~3 px core at 1080p; white-accent core stroke over a blurred accent stroke ×4 wide; lit from one side (gradient 100 % → 40 %) |
| Carousel ring (measured) | tilt ≈ 83° (almost edge-on), focal ≈ 2.3 H (long lens, near/far 1.5), 45°/s, front row moves left, back items 0.6–0.7 opacity, dimmed not blurred |
| Carousel defaults | tilt 74–77° (more readable ellipse), `faceOut` 0.3 (tiles yaw as they go round), depth sort by z, core between the halves, front half of the ring line drawn over the core |
| Face-on orbit | r 0.264 H, items Ø 0.089 H, core Ø 0.23 H, 8 items. A creep, then **one** in-out spin of 107° over 53 fr (peak 9.5°/fr), then 0.3–0.5°/fr drift. Entrance: items 1–2 fr apart while radius grows 0.89 → 1 |
| Converge: rest | fragments on an elliptical band at 0.55–0.92 of half-frame, idle bob 6 px, drift 7 % inward (nothing static) |
| Converge: each arrival | 3–4 fr apart, closest first (gravity): 3.5 % lift (anticipation) → pulled in with `inQuad` over 26–28 fr along a spiral (±28–35°), shrinking to 7 %, brightening ×2.8, blurring 5 px at the end |
| Converge: light | comet head (white → accent radial, screen blend) grows over the item from e = 0.2 so it turns into light; a streak 3 × its 3-frame travel; 3 blurred ghosts (motion blur) |
| Converge: core energy | each arrival = `hitPulse` (2 fr attack, 9 fr decay); the last one = shockwave. Arrival frame of item i = `at + i × stagger + duration` |
| Contract | radius → 0 with `inQuad` over 24–26 fr, angular speed-up +160° ∝ p², items shrink to 15 % and brighten ×2.4, fade in the last 28 % |
| Absorb (one frame triggers all) | shockwave Ø 0.12 → 1.1 m, `outExpo`, 26 fr + a second smaller one 5 fr later + light burst 6 fr (radial, screen blend; never a grey full-frame flash) + camera kick +3 % (`hitPulse` 16 fr) + core pulse |
| Depth field | one focal length (≈ max(W, H)), stratified depths, one in-out camera move per shot (≈ 0 speed at both ends, peak mid-shot, not linear) |
| Depth field on dark cards | DOF 3.2 px per 1000 px of defocus, max 10 px; rack focus (e.g. 1900 → 700); fog at the far end; near-plane fade (scale 1.6–2.8); brightness 0.62–0.75 by depth; a few glowing tiles as light points |
| Item wheel | vertical wheel turned 71° about the vertical axis, radius 0.74 H (runs off frame), 34°/s linear, scale by depth 1 → 0.24 set explicitly (positional perspective only 1.4×), axis +0.035 W right of centre, ~22 items, text at depth 0; near items cross in front of its right end, far ones behind its left part; words blur in ~3 fr apart |
| Progress ring | 0 → 100 % in 27 fr, in-out-expo (20 % → 78 % inside 3 fr), start at 9 o'clock, counter-clockwise, stroke 0.19 r, butt caps, number driven by the same value |
| Glow for an element of size S | rim 1–2 px (0.011 S), tight glow 0.06 S, mid 0.25 S (half intensity ≈ 0.28 S), wide 0.6 S |
| Core | a lens or an orb, never an atom: white-hot pupil → accent → deep → black, three dashed iris rings at different speeds, thin outer bezel with 4 ticks, glass rim, halo grows with energy; breathes 2 % at 0.45 Hz |
| Vertical (9:16) | ring radius 0.37 m (0.46 m clips the side tiles); everything else scales from m |

## Choreography

A 9 s technique reel at 30 fps (a reel, not an edit: a film uses one or two of these per beat):

| fr | Event |
|---|---|
| 0–75 | depth field of fragments ("Acme Inbox · 14 unread", "Standup moved to 11:30", a PDF tab), camera rush with an in-out curve |
| 75 | cut on a 6 fr light burst from the core position |
| 75–115 | carousel ring dolly-in, 40 fr `outExpo`, tiles orbit at 45°/s |
| 120–175 | 8 fragments converge, 3 fr apart, 27 fr each, closest first |
| 175–200 | ring contracts, 25 fr |
| 200 | absorb: shockwave + second shockwave at 205 + 6 fr burst + 3 % camera kick |
| 200–270 | hold on the core with a mono label ("Context ready"), breathing 2 % |

Rules: the core is the anchor at the same screen position across shots (centre), so cuts between field, ring and converge
are match cuts. Cut on the light (4–6 fr burst). Converge arrivals first, ring contracts last, one absorb; never all at once.

## Components

`Converge`, `OrbitRing`, `DepthField`, `ItemWheel`, `ProgressRing`, `Core`, `Shockwave`, `LightBurst`, `FragmentCard`.
None are in the studio's core list: verify the API in studio/API.md; if missing, build them inside the film/recipe folder
from the Numbers.

```tsx
<DepthField items={fragments} camera={{from: 0, to: 1, at: 0, duration: 75}} focus={[1900, 700]} />
<OrbitRing items={tiles} tilt={76} speed={-45} enter={{at: 75, dolly: 0.44, dollyFrames: 40}} contract={{at: 175, duration: 25}} />
<Converge items={fragments} at={120} stagger={3} duration={27} order="near-first"
  core={({energy, pulse}) => <Core energy={energy} pulse={pulse} />} />
// all frame-driven, deterministic via random(seed); sizes default to fractions of min(W, H)
```

## Sound

Gains on −3 dBFS assets; subtract 6 dB under VO.

| Event | Audio id | When | Gain |
|---|---|---|---|
| depth-field rush | `riser` | across the rush, peak at the cut | −12 dB |
| rush into the cut | `whoosh` | ends on the cut frame | −10 dB |
| light-burst cut | `hit` | cut frame | −8 dB |
| ring explodes open | `swoosh-short` | dolly frame 0 | −12 dB |
| ring spin (107°) | `swoosh-short` | spin peak | −14 dB |
| each converge arrival | `tick` | arrival frame | −16 dB |
| contract | `riser` | contract start → absorb | −12 dB |
| absorb | `impact-low` | absorb frame | −8 dB |
| core lights up after absorb | `swell` | absorb +2 fr | −14 dB |
| progress ring | `tick` at start, `ui-confirm` at 100 % | fill start / fill end | −16 / −12 dB |
| wheel, idle drift | none (music carries) | | |

## Pitfalls

- Grey full-frame flash on the cut (reads as a glitch): always a radial burst from the core, screen blend.
- Too much DOF turns dark cards into grey mud: cap 10 px.
- Ring contract and converge at the same time: one absorb, sequenced.
- Moving the core between shots breaks the match cuts.
- 9:16 ring at 0.46 m clips the side tiles.
- Core drawn as two crossing ellipses reads as an atom or a well-known JS logo.
- Third-party logos on tiles: no yaw, rotation or brightness change; far side and contraction fade by opacity only; in a
  converge the logo item fades early and the comet light replaces it.
- DOF copies multiply render cost; keep layers ≤ 4.

## Techniques

`converge` · `orbit-ring` · `depth-field` · `zoom-through` · `rack-focus` · `match-cut` · `flash` · `counter` ·
`chart-draw` · `glow` · `bloom` · `push-in` · audio: `riser` · `whoosh` · `hit` · `swoosh-short` · `tick` · `impact-low` ·
`swell` · `ui-confirm`
