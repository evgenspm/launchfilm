# 03 · Camera and staging

The camera is virtual: one wrapper applies `scale` + `translate` to the whole scene on a spring (the camera preset;
see studio/API.md). Most of the "premium" feel of a product film is this wrapper moving well, and staying still when it must.

## Zoom tiers

Product mode. Four tiers, modeled on screen-recorder auto-zoom.

| Tier | Scale | Frames | Use | Spring |
|---|---|---|---|---|
| 1 · establishing | 0.80–0.90 | 27–36 (900–1200 ms) | whole UI floating on its surface; open and close | `cameraOut` when arriving here |
| 2 · region | 1.00–1.20 | 21–27 (700–900 ms) | a panel, a form, the chat column | `cameraIn` |
| 3 · element | 1.50–2.00 | 18–24 (600–800 ms) | a button, an input, a chart | `cameraIn` |
| 4 · detail | 2.50–3.00 | 15–18 (500–600 ms) | a click, a toggle, a number changing | `cameraIn` |

Rules:
- **One tier per move.** 1→3 in one jump reads as a mistake; 1→2→3 with a hold between reads as intent.
- **Arrive 6 fr (200 ms) before the action** at the target (cursor lands, then the click).
- **Never zoom during a layout morph.** Sequence: morph, then camera; or camera, then morph.
- **≤ 3 punch-ins per 15 s.** Wide establishing shots ≤ 1.2 s, then punch in.
- **Hold the result 3–5 s** at tier 1–2 before the final pull-out (social cuts ≥ 1.5 s).
- Zoom in on `cameraIn` (170/20, ~2 % overshoot); zoom out on `cameraOut` (120/26, none). Cursor follow within 160 ms of
  a click on `cameraSnappy` (700/30).
- Check: list camera keyframes from `film.json`; adjacent tiers only; ≤ 3 scale increases per 450 fr; no keyframe overlaps a morph event.

## Drift and push-in

Two different things; do not confuse them.

| | Drift (life) | Push-in (deliberate move, vocabulary `push-in`) |
|---|---|---|
| Purpose | Keep an otherwise static shot alive (`T1`) | Move the viewer toward a focus |
| Amount | scale 1.00→1.03–1.05 over the whole shot, or a pan 1.1–3.1 px/fr at 1920 | scale 1.00→1.06–1.15; measured +1.8 to +5.5 %/s |
| Curve | linear or `inOutSine`; constant speed through all thirds of the shot | `inOutSine`, or a `speed-ramp` (measured speed thirds 6 / 29 / 11 px/fr over 1.6 s, scale ×1.23–1.48) for short energetic shots |
| Reset | on every cut; alternate direction shot to shot | once per beat |
| Tagged in recipes | no (it is the default) | `push-in` / `speed-ramp` |

- Cut while still moving; never let a drift come to rest before the cut.
- On stills and photos add a 1–2 % translate in one direction (Ken Burns).
- A long deliberate push may carry a `riser`; drift carries no sound.

## Readability under the camera

UI body text must be readable on a phone after the camera scale:

**rendered_px = font_pt × camera_scale × px_per_pt ≥ 26** on a 1080-high 16:9 frame (≥ 30 on a 1080-wide portrait frame).

`px_per_pt` = output px per UI point at camera scale 1 (a 1512 pt wide UI fit to 1920 px → 1.27; to 1080 px → 0.71).
Example: 14 pt body, UI 1512 pt in 1920 px, needs scale ≥ 26 / (14 × 1.27) = 1.46 → tier 3.

- The camera arrives **before** text streams or rewrites and holds still while it streams.
- When a panel or card is the subject, it fills ~70–75 % of the frame width (≈ 1.7–2× on a 16:9 desktop UI).
- Build the UI at its real point size; the camera zooms, the type does not grow (`craft/13#measure-in-points`).

## Multi-aspect recomposition

Every preset is recomposed, never letterboxed and never blind-cropped.
- Author one scene; give each shot a **focus rect** (the region that must be visible: subject + the control acted on).
- The camera solves scale and translate per aspect so the focus rect fits inside the preset safe zone (`craft/10#safe-zones`).
- 4:5 and 9:16: the focus rect must contain the whole subject (avatars + subject line + body + the clicked control);
  no half-cropped word at a frame edge.
- Re-check `rendered_px ≥ 26` (≥ 30 portrait) per aspect: portrait frames often need one tier more.
- Check: one still per shot per preset; no text touches a safe-zone edge; nothing important cropped.

## Anchoring in montage

- **Center anchor:** in a run of 250–500 ms shots, the subject sits at the same frame position (± 3 % of width). The eye never hunts.
- **Text stays, footage changes:** one caption persists across 2–3 background cuts. Cheap and strong.
- **Match by geometry:** same shape, same position across the cut (`craft/09#match-cut`).
- **Frame-in-frame:** portrait or archival clip centered on black with a soft outer glow, scaling ~60 % → 75 % of frame
  height over the shot; the label sits on the frame, not below it.
- **Scale-collage:** images stack, each scaling 1.0→1.1 over 15–20 fr as the next lands on top on the beat.

## Cursor and keycaps

| Rule | Number |
|---|---|
| Path | keyframes `{x, y, frame}` smoothed by springs: default 170/20, `cameraSnappy` 700/30 within 160 ms of a click, `drag` 136/26 while dragging |
| Arrive early | at the target 6 fr before the click |
| Click | scale 1 → 0.9 → 1 over 8 fr (`click` spring), target gets its pressed state, `ui-confirm` or click sfx, optional one tier deeper |
| Human speed | cross-screen move 500–800 ms, never 200 |
| Never teleport, never idle | between actions drift 2–4 px or ease toward the next target |
| Typing | cursor leaves the input; caret blinks at 1 Hz; 30–60 ms/char, jitter ±15 ms; `type-click` per char |
| Keycaps | appear 5 fr (150 ms) before the press, never after; visible ≥ 0.8 s; big, bottom-centre, above the captions, never overlapping them |

Use the shipped cursor component (macOS cursor assets via `@remotion/mac-cursors`; hotspots are correct).

## Framing the product

| Framing | Spec | Use |
|---|---|---|
| Bare UI on a surface (default) | 1 px border at 8 % white, shadow `0 20px 60px rgba(0,0,0,.35)`, radius 12–16, no browser chrome | cleanest product film |
| Device frame (`device-phone`, `device-laptop`) | real proportions; the device is lit, the screen emits | mobile apps; "it lives on your laptop" beats |
| Browser frame (`device-browser`) | only when the URL bar is the message | web tools whose address matters |
| Fanned devices on black | 5 phones, center forward; children offset 110 % × i, rotate 5° × i, stagger 5 fr; parent 1.5 → 0.8 | product reveal in launch mode |
| Tilt plane (`tilt-plane`) for UI not ready | rotateX 15–25° mild, or rotateY −25° + rotateX 15–20° + roll −8°, extreme rotateX 45° + rotateZ −20°; perspective ≈ frame width; focus band 3–12× sharper than the edges (6–12 px edge blur at 1920); linear truck 1.5–2.5 px/fr for 3.5–4.5 s, cut while moving | staging a screen that is a placeholder; swap the real UI in later (`craft/families/screen.md`) |
| Real device footage | hand in frame, natural light, shallow depth of field; film the real app | warmth a rebuild cannot give |

Product-mode background: the product's own surface, or a shader background at low contrast driven by the frame
(`craft/06#depth-and-material`). Background luma ~9 (`#0A0A0B`) reads richer than pure black under a spot.
