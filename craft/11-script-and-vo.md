# 11 · Script and voice-over

Write the words before any code (T11). In a VO film the voice is the timeline: word onsets become cut frames and text
onsets (craft/02#placement-on-the-grid). In a text-only film the on-screen statements are the script.

## Word budget

`words = seconds × words-per-second × VO coverage`. Pace 2.5–3 w/s (calm 2.1–2.5; fast sections ≤ 3.5). Coverage
55–70 %: at least 30 % of the film has no voice, so picture and music can land.

| Length | Pace | Coverage | VO words | Sentences (≤ 8 words) | Notes |
|---|---|---|---|---|---|
| 6 s | 2.5 | ≤ 60 % | ≤ 9 | 1 | usually no VO: one statement on screen |
| 15 s | 2.7 | 60 % | ≈ 24 | 3–4 | |
| 30 s | 2.7 | 65 % | ≈ 53 | 7–9 | the default launch film |
| 45 s | 2.7 | 65 % | ≈ 79 | 10–13 | |
| 60 s | 2.6 | 65 % | ≈ 101 | 13–16 | |
| 90 s | 2.4 | 65 % | ≈ 140 | 18–22 | founder story: calmer pace |

Text-only films: ≤ 7 words per card, each card held ≥ 0.2 s × (words + 1) (craft/02#readability-holds). A 30 s text-only
film carries 10–14 cards, ≈ 60 words in total.

Check: count the script's words (markup stripped), divide by the storyboard's VO spans; reject if > 3.5 w/s anywhere.

## Copy rules

1. **One idea per sentence, ≤ 8 words.** Hard max 12. If a sentence needs a breath in the middle, split it.
2. **Concrete nouns and verbs.** What goes in, what comes out, a number, a time of day. "Drop in a timesheet. Get an invoice."
3. **Say what the viewer does or gets**, not what the product is. No category words: platform, solution, tool, suite.
4. **Problem in the viewer's own words**, present tense, specific ("Friday, 6 pm, forty invoices left.").
5. **Product name ≤ 2 times** in the VO: once at the turn, once at the end.
6. **Say the outcome 0.3–0.5 s before the UI shows it**, then stop talking while it lands.
7. **Hero text = the VO's key phrase** (≤ 7 words), not a second message competing with the voice.
8. **Numbers are real and sourced** in BRIEF.md, or there are none. Never "10x" unless measured.
9. **Only claim what ships today.** BRIEF.md keeps a must-not-claim list; the script is checked against it.
10. **End line = action + place**, ≤ 6 words ("Try it at acmeledger.app."). Statements end with a period; questions only in the hook.
11. **Numbers, spoken vs shown.** TTS input spells out anything with units or abbreviations ("twelve hundred", "four dollars a
    month", "version two"); the screen shows digits with separators (1,200 · $4/mo · v2).
12. **Pronunciation.** Keep a `say` spelling for TTS ("Acme Ledger" said as "Ack-mee Ledger" if needed) separate from the
    display spelling. Captions always use the display spelling; the script spelling wins over speech recognition.
13. **Read it aloud with a timer** at the target pace before generating anything.

## Banned phrases

In VO, on-screen copy, post copy and storyboards. Each one marks the text as generated filler.

excited to announce · thrilled to share · proud to announce · we're live · game-changer · revolutionary / revolutionize ·
seamless(ly) · AI-powered · powered by AI · unlock · unleash · supercharge · elevate · empower · next-gen /
next-generation · cutting-edge · state-of-the-art · best-in-class · world-class · effortless(ly) · streamline · leverage ·
robust · harness the power · in today's fast-paced world · say goodbye to · look no further · the future of X is here ·
reimagine(d) · transform the way you · take X to the next level · one-stop shop · all-in-one (unless literal) ·
magic / magical (unless it is one literal click) · "it's not just X, it's Y" · imagine a world · what if I told you ·
let's dive in · buckle up · without further ado · stay tuned · 10x (unless measured) · em dashes · more than 1 emoji ·
more than 2 hashtags.

Check: `grep -inE "excited|thrilled|seamless|unlock|supercharge|elevate|empower|game.?changer|revolution|effortless|streamline|leverage|next.?gen|cutting.?edge|reimagin|AI-powered" STORYBOARD.md` returns nothing (plus a read for the patterns grep cannot catch).

| Don't write | Write |
|---|---|
| We're excited to announce Acme Ledger, the AI-powered invoicing platform. | Acme Ledger sends the invoice the day the work is done. |
| Seamlessly streamline your billing workflow. | Drop in a timesheet. Get an invoice out. |
| Say goodbye to inbox chaos. | 400 emails, sorted before your coffee. |
| Unlock the full power of your deploys. | Any deploy, rolled back in one click. |
| It's not just a notes app, it's your second brain. | Acme Notes finds the note you wrote in March. |
| Take your team's launches to the next level 🚀🚀 | Ship on Friday. Sleep on Friday. |

## VO style lines

The style line goes in front of the script (or in the provider's style field). Measured lesson from a blind judge test:
with "confident" in the style prompt every voice scored as an ad read (announcer-ness 6–9 of 10); with "casual,
understated" it fell to about 2. Takes of one voice varied more (fit 3.8–8.0) than voices did.

Ready lines:
- **Dry founder (default):** "Read this dry and low-key, slightly quick, like a founder telling a friend across the table what
  they built. Plain and matter-of-fact. No selling, no smile in the voice, no emphasis on every word, not a voice-over artist:"
- **Calm documentary:** "Read this calm and close to the mic, like a documentary narrator. Even pace, short pauses at full
  stops, warm but not soft, no drama:"
- **Warm explainer:** "Read this warmly and clearly, like explaining something useful to a colleague. Conversational and
  unhurried; a light smile only on the last line:"
- **Screen narration:** "Read this quick and plain, like narrating your own screen to a teammate. Short phrases, no sales tone:"

Banned style words: confident, excited, energetic, upbeat, commercial, announcer, enthusiastic, powerful, epic, hype,
"casual but brisk" (measured: pushed takes back to announcer).

## Generation

1. **One call for the whole script.** `npx launchfilm vo <slug> [--provider kokoro] [--voice v] [--takes N] [--tempo 1.0]`
   reads the VO lines from film.json. Prefer one request for the whole script so pace and prosody stay consistent, then
   place lines by word timings. `--line <id>` regenerates one line: only patch a line if its pace stays within ±5 % of the
   rest; otherwise regenerate the set with identical voice, style line, tempo and provider. If a provider refuses or
   mangles a very short line, generate it inside a longer sentence and cut it out.
2. **Provider:** the free local default (see README providers) or the user's configured paid provider. Free tiers of some paid
   providers forbid commercial use; warn before the final render (craft/12#traffic-lights). macOS `say` is preview only:
   Apple's licence does not allow publishing its output.
3. **Post chain** (the CLI does it): trim silence at both ends (keep ≤ 100 ms), tempo 1.00–1.085 with `atempo` (most TTS takes
   read slow; above 1.085 artifacts appear), two-pass loudnorm to −16 LUFS integrated, −1.5 dBTP, 48 kHz mono.
4. **Word timings:** `npx launchfilm words <audio> --script <file|"text"> [--engine whisper|elevenlabs|deepgram] --out <f.json>`. Order: timings returned by the TTS provider (character or word
   alignment) → else local whisper.cpp (large-v3-turbo, DTW token timestamps) aligned to the script. Script spelling wins.
   Every word must have a start time (a null means DTW silently fell back); a script match < 90 % means the take skipped words:
   regenerate it.
5. **Place on the timeline:** VO onsets drive text onsets and cuts; music ducks under the VO spans (craft/02#mix).

## Best-of-N

Generate N takes (`--takes N`): 3 by default, 5 for the hero film. Pick by measurement, then by ear if a human is present.

| Criterion | Pass | How |
|---|---|---|
| Script match | ≥ 95 % of words | the `words` alignment report |
| Duration | within ±5 % of the storyboard's VO span | ffprobe duration after the post chain |
| Last word | not clipped: ends ≥ 50 ms before the file end | word timings vs duration |
| Internal gaps | none > 0.6 s unless scripted (`|` or an intended pause) | gaps between word timings |
| Pace | 2.1–3.5 w/s over speech | words / speech time |
| Loudness | −16 ±1 LUFS, ≤ −1.5 dBTP | ebur128 (craft/08#procedure) |

Tie-break: ask the user to listen to the 2 finalists (10 s each). With no human, take the one closest to the target pace.
Optional audio-judge model: judge **each take alone** (several takes in one call gave unreliable scores), score naturalness,
fit and announcer-ness 1–10, reject announcer-ness ≥ 5. Keep all takes and scores next to the chosen file.

## Script markup

```
Invoices used to eat an afternoon. | Now *Acme Ledger* sends them for you.
```

- `|` = phrase break (one caption card). `*word*` = accent keyword, ≤ 1 per phrase (craft/10#captions).
- Without `|`, phrases break at pauses ≥ 250 ms, at `. ? !`, at a comma after ≥ 3 words, or at 8 words.
- The CLI strips the markup before TTS and uses it for caption phrases and accents.
- Do not pass the full script to speech recognition as a prompt (measured: it made the recogniser drop a word it "expected");
  pass only proper nouns.
