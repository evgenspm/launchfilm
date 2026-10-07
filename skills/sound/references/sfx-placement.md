# SFX placement: event → sound, offset, gain

Glue rule `[craft/02#glue-rule]`: every visual event has a sound; every sound has a visual. Audio ids come only from
`craft/vocabulary.md` § audio. Assets are normalized to −3 dBFS peak, 48 kHz WAV, silence trimmed (`sfx gen` and the
shipped packs already are). Gains below are starting points on those assets; under VO subtract another 6 dB.
Offsets are in frames at the film fps relative to the event frame in `film.json` (negative = before).

## Table

| Visual event | Audio id | Offset | Gain (dB) | Notes |
|---|---|---|---|---|
| Typing, per character | `type-click` | 0 on each char frame | −20 | rotate 3–5 variants by seeded `random(i)`; vary gain ±2 dB; under VO −26 |
| Keycap press | `type-click` (or `ui-confirm` for Enter) | 0 on the press frame | −14 | the keycap appears 5 fr before; sound on the press, never on appear |
| Cursor click | `ui-confirm` | 0 on the click frame | −12 | squash and sound on the same frame |
| Element snaps / settles | `tick` | on the landing frame (first frame at 100 % position) | −16 | pitch feel: smaller element → lighter tick sample |
| Card / badge pops in | `pop` | +1 fr after first visible | −14 | staggered cards: one pop per card, follow the stagger |
| List row drops / writes in | `tick` | landing frame | −22 | many rows: every row, but quieter |
| Check-off / done | `ui-confirm` | on the tick-draw start | −12 | strike-through silent |
| Notification lands | `notification` | −2 fr before landing | −12 | sound leads the eye slightly |
| Fast move, zoom-through, whip | `whoosh` (300–500 ms) | loudest point 2–4 fr before arrival; ends ≤ 3 fr after arrival | −10 | never on every cut |
| Short slide / swipe | `swoosh-short` | same as whoosh | −12 | |
| Pull-out / reverse reveal | `reverse-cymbal` | ends on the cut or the reveal frame | −12 | |
| Long push-in into a hit | `riser` (1–2 s) | ends on the hit frame | −12 | optional; none for gentle drifts |
| Cut on the beat | music kick itself, or `hit` | 0 on the cut | −8 | only on section changes, not every cut |
| Climax / drop | `bass-drop` or `impact-low` | 0 on the hit | −6 / −8 | once or twice per film |
| Glitch / crash | `glitch-sfx` | 0 on the first glitch frame | −12 | match its length to the glitch frames |
| Sparkle / glint sweep | `shimmer` | 0 on sweep start | −16 | |
| Logo light-on | `swell` | starts with the light-on, peaks at +5 fr (halo) | −14 | then silence or the music tail |
| Photo montage frames | `camera-shutter` | 0 on each new photo | −12 | |
| Rhythm break | `silence-beat` | music gain 0 from frame A to B (0.5–2 s) | n/a | then return on a downbeat |
| Next shot leads with its sound | (any) | `j-cut`: 4–12 fr before the picture cut | as above | smooths hard cuts in calm films |
| End card | music tail or one soft tone | on the mark's arrival | −14 | no whoosh on a calm close |

## Density rules

- Max 3 SFX starting within any 6-frame window; drop the smallest events first (row ticks before pops before whooshes).
- Under a VO word: only UI clicks/ticks, 6 dB quieter than the table; no whoosh, riser or impact while a word is spoken.
- Statements carried by VO get no SFX; the voice is their sound.
- A sound with no visual on screen (hit on black, riser into nothing) is a defect unless it is the rhythm break.

## Procedure

1. List events: every row in STORYBOARD.md `sound` column plus every `film.json` event (cursor clicks, typing ranges,
   list events, cuts, transitions, logo moments).
2. `npx launchfilm sfx list` / `sfx search <q>` for each id; `sfx gen <preset>` for missing procedural ones
   (whoosh, riser, click, pop, impact, ding, glitch).
3. Write each SFX into `film.json` at event frame + offset with the gain (field names: studio/API.md).
4. Render a 0.5-scale pass and check 3–5 key events against the picture (film-qa does the full check).
