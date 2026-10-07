---
name: launch-post
description: Write the launch post that goes with the film: X / Twitter post, LinkedIn post, Product Hunt tagline, description and maker comment, written in the founder's own voice, concrete, no AI slop ("excited to announce", em dashes, buzzwords). Triggers: write the tweet, launch post, LinkedIn post, Product Hunt copy, PH tagline, maker comment, caption for the video, announcement copy. Use after the film is rendered (or when the user asks for post copy for an existing film); starts from `npx launchfilm post <slug>` and the film's BRIEF.md and STORYBOARD.md, writes out/<slug>/POST.md. Never posts anything. Not for the film's own on-screen script or VO (story).
---

# launch-post: copy that sounds like the founder

The film does the showing; the post says one concrete thing and gets out of the way. Write like the founder writes,
not like a launch template. Output: `launch-video/out/<slug>/POST.md`. You never post, schedule or open a browser.

## Inputs (read all before writing)

1. `npx launchfilm post <slug>`: the scaffold (sections for X, LinkedIn, Product Hunt, plus credit lines). Start from it.
2. `films/<slug>/BRIEF.md`: product, message, audience, CTA, URL, must-not-claim.
3. `films/<slug>/STORYBOARD.md`: VO script and on-screen claims (the post must not contradict them).
4. The film facts: length, presets rendered, what the viewer sees in the first 2 s.
5. The founder's voice: their README intro, changelog, past posts or messages the user pastes. Note sentence length,
   capitalization habits, use of "I" vs "we", emoji habits. Match them. No samples → plain, short, first person.

## Steps

1. Pick the one concrete thing: what the product does, for whom, in one sentence with a noun and a verb.
   "Acme Ledger sends the payment reminders so you don't have to." beats "Meet the future of invoicing."
2. Find one real specific: a number the user can back (from BRIEF.md with a source), a before/after, a time, a
   limitation stated plainly. No number without a source.
3. Write per platform: [references/x.md](references/x.md), [references/linkedin.md](references/linkedin.md),
   [references/product-hunt.md](references/product-hunt.md). Limits are hard; count them.
4. Run the slop check (below). If a de-slop skill is installed (for example one named stop-slop), run it on the
   draft too.
5. Credit line: add it only if the user said they want one, as the last line, from `npx launchfilm credit lines` or
   the lines in launch-film `references/credit.md`. Default: no credit line in the post.
6. Write `out/<slug>/POST.md` with each variant and its measured length. Show the user the X post and the LinkedIn
   first line inline; the rest stays in the file.

## Slop check (zero hits required)

- Banned phrases `[craft/11#banned-phrases]`: excited to announce · thrilled to share · proud to announce · we're live ·
  game-changer · revolutionary/revolutionize · seamless(ly) · AI-powered · powered by AI · unlock · unleash ·
  supercharge · elevate · empower · next-gen · cutting-edge · state-of-the-art · best-in-class · world-class ·
  effortless(ly) · streamline · leverage · robust · harness the power · in today's fast-paced world · say goodbye to ·
  look no further · the future of X is here · reimagine(d) · transform the way you · take X to the next level ·
  one-stop shop · all-in-one (unless literal) · magic/magical (unless one literal click) · "it's not just X, it's Y" ·
  imagine a world · what if I told you · let's dive in · buckle up · without further ado · stay tuned · 10x (unless
  measured).
- No em dash character. No more than 1 emoji per post. No more than 2 hashtags (default 0).
- No triplets of parallel adjectives ("fast, simple, and powerful"). No rhetorical question as the opener unless the
  founder writes that way. No closing moral ("Because your time matters.").
- No "Introducing X:" headline style on LinkedIn; X can start with the product name if it reads naturally.
- No claims beyond BRIEF.md; no user counts, revenue or customer names without the user's confirmation.
Check: both return nothing:
`grep -inE 'excited|thrilled|game.?changer|seamless|unlock|supercharge|elevate|empower|next.?gen|cutting.?edge|effortless|streamline|leverage|reimagin|revolution' out/<slug>/POST.md`
and the em dash check `grep -n "$(printf '\xe2\x80\x94')" out/<slug>/POST.md` (works in any POSIX shell).

## POST.md format

```markdown
# Post copy: <slug>
## X (video attached natively)
<variant A>  (241/280)
<variant B>  (198/280)
Reply (optional): <link + one line>

## LinkedIn (video uploaded natively, burned captions on)
<post>  (first line 94/120 chars)

## Product Hunt
Tagline: <≤ 60>  (48/60)
Description: <≤ 260>  (233/260)
Maker comment: <≤ 120 words>  (104 words)
Gallery video: YouTube link of ph-16x9

## Credit line (only if the user opted in)
<line>
```

## Rules

- Never post, schedule, DM, or open a browser. The user posts.
- The video is uploaded natively on X and LinkedIn (autoplays in feed); links go in the text or the first reply.
- One message per post. If the user wants to say three things, the other two go to the maker comment or a thread.
- Keep the user's edits; on revision change only what they asked.
