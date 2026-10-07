# Brief questions and defaults

Ask max 5 at once, numbered, each with its default in brackets. Pre-fill from the repo README, site, brand.json and
package.json; ask only what is still unknown. The user can answer "ok" to accept all defaults.

## Questions (in priority order)

| # | Field | Question | Default |
|---|---|---|---|
| 1 | product | What is it, in one line? | README first sentence / site `og:description` |
| 2 | message | The one thing a viewer must remember (≤ 8 words)? | the strongest concrete outcome in the README |
| 3 | audience | Who is it for (role + situation)? | inferred from README ("for teams that…") |
| 4 | platforms | Where will it play? | X + LinkedIn → `x-16x9`, `li-4x5` |
| 5 | length | How long? | 30 s (15 s for a single feature, 60–90 s for Product Hunt) |
| 6 | mode | Product film, launch film or hybrid? | by product type (story SKILL.md § 2) |
| 7 | VO | Voice-over? Which voice? | yes, default local voice, dry founder style |
| 8 | tone | 3 adjectives, or a film they like | "plain, precise, calm" |
| 9 | CTA | What should the viewer do, and the URL? | "Try it" + homepage URL from brand.json |
| 10 | must show | Screens, flows or features that must appear | the hero flow in the README |
| 11 | must not claim | Things that are not true yet, numbers you can't cite | none assumed: never invent metrics |
| 12 | assets | Screenshots, recordings, real data to show | rebuild UI from repo components |
| 13 | deadline | When is the launch? | none; affects scope only |

## Rules

- The message is a claim the product can back today. Future features go to "Not this film".
- Numbers in the film need a source line (`must show: "2,400 invoices sent" ← user, Oct 2026`). No source → no number.
- Customer names, logos, quotes: only with the user's confirmation that they have permission.
- If the user's answers conflict (90 s for a reel), point out the preset limit and offer the nearest fit.

## BRIEF.md template

```
# Brief: <slug>
product: <one line>
message: <≤ 8 words>
audience: <role + situation>
mode: <product film | launch film | hybrid> · length: <s> · fps: 30
presets: <ids>
VO: <yes/no> · voice: <provider/voice> · style: <style line>
tone: <3 words>
CTA: <text> · <url>
must show: <list>
must not claim: <list>
assets: <list with paths>
deadline: <date or none>
Assumed: <every default taken without the user's answer>
Not this film: <parked messages>
```
