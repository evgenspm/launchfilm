# Techniques vocabulary (closed list, v0)

Every recipe tags `techniques[]` only from this list. New term → PR to this file first.
Format: `id` — what it is (component that implements it, if any).

## camera
- `push-in` — slow constant zoom toward focus, 1.00→1.06–1.15 (Camera, KenBurns)
- `pull-out` — reveal by zooming out from detail to context
- `zoom-tier` — snap between the 4 zoom tiers (full / region / element / detail) on a spring (Camera)
- `zoom-through` — fly through an element into the next scene (ZoomThrough, PortalZoom)
- `whip-pan` — fast lateral move with motion blur hiding the cut
- `dolly` — lateral/vertical travel across a large UI plane (Dolly)
- `orbit` — camera circles a device/object (no built-in component yet; LaptopFrame for the device)
- `tilt-plane` — UI laid on a tilted 3D plane, perspective pan (TiltPlane)
- `rack-focus` — depth-of-field shift between layers (RackFocus)
- `frame-in-frame` — scene shrinks into a card/window inside the next one (FrameInFrame)
- `handheld` — subtle noise shake for documentary feel
- `cursor-follow` — camera tracks the cursor/click target (Screen Studio style)
- `speed-ramp` — a move that accelerates then decelerates (or the reverse) inside one shot, e.g. push speed thirds 6 / 29 / 11 px/fr
- `depth-field` — cards or fragments scattered in z with depth of field; the camera travels through them (DepthField)

## transitions
- `hard-cut` — on the beat, no effect (default)
- `match-cut` — shape/position carried across the cut
- `mask-wipe` — shape or text mask reveals next scene
- `morph` — element transforms into the next scene's element (PillMorph)
- `card-tunnel` — cards stream past camera in depth (no built-in component yet)
- `portal` — word/shape opens into next scene (PortalWord)
- `blur-dissolve` — directional/gaussian blur crossfade ≤ 12 fr
- `slide-push` — scene pushes previous out
- `flash` — 1–3 frame white/brand flash on a hit (Flash)
- `glitch-cut` — RGB split / slice glitch on the cut (Glitch, SliceGlitch, RGBSplit)
- `light-leak` — warm leak over the cut
- `smash-cut-black` — cut to black for a beat of silence
- `j-cut` — the next shot's sound starts 4–12 fr before its picture (audio leads the cut)

## type
- `blur-in` — words resolve from blur + y-offset (BlurIn)
- `statement-sequence` — one short claim per beat, timed to VO (StatementSequence)
- `word-swap` — one word in a sentence cycles (WordSwap)
- `typewriter` — human-cadence typing with caret (Typewriter, useTypewriter)
- `word-reveal` — word-by-word to VO timings (WordReveal)
- `stacked-roll` — lines roll vertically like a slot (StackedRoll)
- `scatter` — letters fly in/out from random positions (Scatter)
- `highlighter` — marker sweep behind key word (Highlighter)
- `kinetic-depth` — type moving in Z depth (DepthPhrase)
- `fit-word` — one word fills the frame width (fitText)
- `counter` — number ticker / rolling digits
- `quiet-close` — small serif line on black at the end (QuietClose)
- `sticker` — meme/sticker word pops (Sticker, MemeWord)
- `mask-rise` — letters or words rise out of a tight clip mask, 2 fr stagger, ~10 % overshoot (BlurIn enter="mask")
- `word-per-cut` — one word (or two) per shot on the beat; the cut is the animation, no in-animation
- `captions` — VO phrases burned in, whole phrase at once, ≤ 2 lines, one accent keyword (Subtitles)
- `dim-emphasis` — everything but the key word drops to ~0.32 opacity after ~0.5 s

## ui
- `cursor-path` — spring cursor with overshoot + click squash (Cursor)
- `click-ripple` — ring on click
- `keycaps` — on-screen key presses
- `prompt-typing` — prompt bar typing → submit (PromptBar)
- `thinking-state` — AI spinner/shimmer/thinking (ThinkingState, Spinner)
- `stream-text` — AI answer streaming in
- `list-assemble` — list builds/reorders/checks itself (ListAssemble)
- `notification-stack` — banners/notifications fly in and stack (NotificationStack, BannerStack)
- `island-morph` — dynamic island / notch pill expands (IslandPill)
- `card-grid` — feature cards cascade in with stagger
- `chart-draw` — line/bar chart draws on
- `ui-rebuild` — product UI rebuilt in React (crisp at any zoom)
- `screen-recording` — real recording with punch-ins (FootageClip punch)
- `device-phone` / `device-laptop` / `device-browser` — framed UI
- `converge` — scattered fragments accelerate into one core, each arrival a light hit (Converge)
- `orbit-ring` — items orbit a core on a tilted ring, then contract into it (OrbitRing)

## brand
- `logo-from-dot` — logo grows from a point/line
- `glass-mark` — glass/refraction logo (GlassMark)
- `bloom` — light bloom on mark (Bloom)
- `particle-form` — particles assemble into logo (ParticleForm)
- `horizon-arc` — glowing horizon arc (HorizonArc)
- `tunnel` — brand-color tunnel (BrandTunnel)
- `end-card` — logo + URL + CTA hold 2–3 s (EndCard)
- `light-on` — the mark is revealed by light, not motion: 14 fr S-curve, halo lags 5 fr

## look
- `grain` · `vignette` · `scanlines` · `crt` · `dither` · `halftone` · `glow` · `liquid-glass` · `mesh-gradient` · `shader-bg` · `film-look` · `duotone` · `motion-blur` · `depth-grid` (no built-in component yet)
- `scrim` — dark gradient or plate behind text over footage to hold contrast (Scrim)

## 3d
- `device-3d` — R3F phone/laptop model · `physics` — falling/colliding objects · `extrude-type` — 3D text · `orbit-3d` — camera path in 3D scene

## audio (event → sound, used in `audio.sfx[]`)
- `type-click` · `tick` · `pop` · `whoosh` · `swoosh-short` · `hit` · `impact-low` · `riser` · `reverse-cymbal` · `glitch-sfx` · `ui-confirm` · `notification` · `camera-shutter` · `bass-drop` · `silence-beat` · `shimmer` (sparkle/glint sweep) · `swell` (low swell under a light-on or reveal)

## beats (structure[].beat)
`hook` · `problem` · `tension` · `reveal` · `feature` · `proof` · `social-proof` · `cta` · `logo` · `outro`
