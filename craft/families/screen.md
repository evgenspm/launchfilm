# Family: screen (staging a product screen, real or placeholder)

Wherever the film needs the product but the UI is not ready, or is ordinary, make the staging expensive: how the screen is
lit, tilted, framed and moved through. A placeholder screen is swapped for the real UI later in one line. Numbers measured
frame by frame on studied references with a motion tracker (px at 1920 wide, 30 fps).

## When

| Need | Use |
|---|---|
| Product beat, UI not ready | tilted plane + placeholder, extreme lean (rotateX 45°, rotateZ −20°), linear truck 1.5–2.5 px/fr, 3.5–4.5 s, cut while moving; alternate truck direction shot to shot |
| "It lives on your laptop" | laptop reveal from dark, 3/4 view, yaw drift ~0.17°/fr (−36° → −10° over 5 s), push into the display |
| Detail on one part | dolly flat to the region (×2–2.4), or a tilted plane with a narrow focus band (0.12) placed on the part |
| Hand-off to a hero element | rack focus from the screen to a foreground card |
| Not for | real UI recordings (use them flat and bare: craft/13), full 3D orbits beyond ±40° yaw (use a 3D device: `device-3d`) |

## Numbers

| Technique | Values |
|---|---|
| One linear drift per shot | pan 1.1–3.1 px/fr, equal speed in all thirds of the shot (no ease); scale drift ±0.3–1.1 %/s; cut while still moving; direction changes every shot |
| Deliberate push | +1.8 %/s · +2.7 %/s · +5.5 %/s (once per film) |
| Speed-ramped push (short energetic shot) | speed thirds 6 / 29 / 11 px/fr over 1.6 s, scale ×1.23–1.48 |
| Lean-back angles (perspective ≈ frame width) | mild: rotateX 15–25° · side lean: rotateY −25° + rotateX 15–20° + roll −8° · extreme: rotateX 45° + rotateZ −20° |
| Focus band along the tilt | middle third 3–12× sharper than the edges (Laplacian) ≈ 6–12 px blur at the edges; macro foreground (keyboard) ≈ 12–20 px |
| Spot / vignette | the plane fades to black before its edge; background luma 9 (`#0A0A0B`), not pure black |
| Opening fade-up | 0.5 s, 70 % of it in the first 0.33 s |
| Flash cut | 1 fr at +200 % luma, once per film |
| Lid opening, front-on | ≈ 20 fr ease-in-out; content visible once the lid passes ~75° |
| Screen as key light | screen on → whole frame +34 % luma over ~0.9 s; keyboard picks up spill near the hinge |
| Shot lengths | UI reads 3.5–5.2 s; action shots 1.2–1.7 s |
| Our render, measured | push speed thirds 3.5 / 4.6 / 2.2 px/fr (ramp ×2.9); truck 1.66 px/fr constant (thirds 1.68 / 1.63 / 1.69); focus band 14× sharper than the edges |

Placeholder screen: authored at **1512 × 982** (14-inch laptop display points; menu bar 37 pt; laptop notch 190 × 32 at
top centre). Fill in the brand accent with a soft top-left bloom and a darker foot, 56 px grid (major lines every 4 cells),
registration corners, static noise, a mono label ("PRODUCT UI"). Real UI built at the same 1512 × 982 drops in unchanged.

Laptop reveal: rise `outQuint` 42 fr from 16 % lower with exposure 0 → 1 → lid opens `inOutSine` 34 fr → display fades up
`inOutSine` 20 fr once the lid passes 75° → optional push (`inOutSine` = the measured speed ramp). Base width default 42 % of
a landscape frame, 66 % of a portrait one. At push = 1 the display covers the frame × fill 1.04 (16:9 and 9:16).

Dolly: arc-free; the camera centre moves on a straight line, zoom is interpolated in log space, so the target slides
straight to centre at a constant perceived zoom rate. Default `inOutSine`, or a named spring.

Rack focus (craft defaults, not measured): 12–24 fr pull, max blur 14 px, lens breathing 0.012.

Depth of field on a tilted plane: computed along the plane's real depth axis: N blurred copies (levels 4) with
partition-of-unity masks composited `plus-lighter`; blur grows with the lean, full from ~28°; band 0.24, ramp 0.6.

What makes it expensive: constant slow vectors, physically plausible extreme angles, a narrow focus band, light that
dissolves the plane into black, dark bodies lit only by the screen. The UI itself can be ordinary.

## Choreography

Product beat for "Acme Deploy", 3 shots, 10.5 s, UI not ready:

| s | Shot | Camera | Notes |
|---|---|---|---|
| 0–4.0 | laptop reveal from dark, 3/4 view | yaw −36° → −22°, rise 42 fr, lid 34 fr, display up 20 fr | frame luma < 3 for ≤ 1.2 s by design |
| 4.0–6.0 | push into the display to fill 1.04 | `inOutSine` push | match cut prepared |
| 6.0 | match cut → tilted plane | plane flat, scale = 1.04 × max(W / 1512, H / 982), pan from [0, 0], spot floor 1 | same chrome on both sides |
| 6.0–10.5 | plane leans to rotateX 45° / rotateZ −20°, truck 2 px/fr left | `tiltIn` (start from rest, then constant) | focus band on the deploy button; cut while moving |

The invisible match cut: frames on either side differed by a mean 0.68 (8-bit), less than neighbouring moving frames
(0.9–1.2). `inOutSine` on both sides of the cut stalls ~0.8 s; leave the landing with `tiltIn`.

Swapping the placeholder later: build the real UI as a component at 1512 × 982 (static or frame-driven); pass it as the
placeholder's child; keep the same chrome on both sides of a match cut; re-render stills and check legibility in the band.

## Components

`ScreenSlot` (placeholder), `TiltPlane`, `Dolly`, `RackFocus`, and a laptop frame/reveal (may live under `DeviceFrame` or
`MacWindow`). Not all are in the studio's core list: verify the API in studio/API.md; if missing, build them inside the
film/recipe folder from the Numbers. The 2D zoom-tier camera covers flat screens.

```tsx
<TiltPlane rotateX={[20, 45]} rotateZ={[-8, -20]} pan={[[0.2, 0], [-0.2, 0]]} duration={135}
  dof={{focus: 0, band: 0.24}} spot={{radius: 0.8, floor: 0.4}}>
  <ScreenSlot chrome="menubar">{/* real UI here later */}</ScreenSlot>
</TiltPlane>
<Dolly from={{x: 0, y: 0, scale: 1}} to={{x: -0.18, y: 0.1, scale: 2.2}} start={0} duration={36} />
<RackFocus layers={[{node: <Screen />, depth: 1}, {node: <Card />, depth: 0}]} from={1} to={0} start={20} duration={18} />
```

## Sound

Gains on −3 dBFS assets; subtract 6 dB under VO.

| Event | Audio id | When | Gain |
|---|---|---|---|
| fade-up from dark / laptop rise | `swell` | fade start | −14 dB |
| lid settles open | `tick` | lid settle frame | −16 dB |
| screen turns on (key light) | `swell` | display fade-up start | −14 dB |
| speed-ramped push | `whoosh` | peaks with the fastest third, ends on the cut | −10 dB |
| long deliberate push | `riser` | across the push | −12 dB |
| flash cut | `hit` | flash frame | −8 dB |
| rack focus | `swoosh-short` (optional) | pull start | −16 dB |
| linear drift, invisible match cut | none (music carries) | | |

## Pitfalls

- The browser rasterizes 3D faces at their local size; a push-in magnifies them and text goes soft: supersample 2.5× on
  any shot that pushes in.
- `filter` flattens `preserve-3d`: blur leaf faces only, never a 3D container.
- `useVideoConfig().durationInFrames` inside a Sequence is the Sequence's length: "whole shot" defaults are per Sequence.
- DOF copies multiply the cost of heavy children: drop to 3 levels or blur only the far side.
- The important element must sit inside the focus band; move `dof.focus` rather than accept a blurred CTA.
- Reveal from dark: keep the near-black opening ≤ 1.2 s, or start exposure higher when frame 0 is the poster.
- Pure `#000` background makes the spot edge band: use `#0A0A0B` + grain (craft/06#banding-and-encode).
- CSS 3D holds about ±40° of yaw; beyond that use a real 3D device.

## Techniques

`tilt-plane` · `dolly` · `rack-focus` · `speed-ramp` · `push-in` · `match-cut` · `device-laptop` · `flash` · `vignette` ·
`ui-rebuild` · audio: `swell` · `tick` · `whoosh` · `riser` · `hit` · `swoosh-short`
