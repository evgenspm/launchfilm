# Product Hunt copy

Limits change; check the submission form on launch day. Write to these:

| Field | Limit | Rule |
|---|---|---|
| Name | the product name | exact casing from brand.json |
| Tagline | ≤ 60 characters | what it does, concrete, no product name repeated, no period needed |
| Description | ≤ 260 characters | what it does, for whom, the one specific, what's free |
| Maker first comment | ≤ 120 words (our rule) | why you built it, what is in v1, what is next, a specific feedback ask |
| Gallery video | YouTube URL | upload the `ph-16x9` render to YouTube (unlisted is fine) and paste the link |
| Gallery images | 1270×760 px recommended | stills from the film: `npx launchfilm still <slug> <t> --preset ph-16x9` at the 3–4 strongest frames, then resize |

Count characters:
```bash
node -e 'console.log([...process.argv[1]].length)' "<tagline>"
```

## Tagline patterns (Acme examples, fictional)

| Pattern | Example | Length |
|---|---|---|
| verb + object + outcome | "Invoices that send their own reminders" | 38 |
| for whom + what | "Invoicing for freelancers who hate chasing money" | 48 |
| before → after | "From timesheet to paid invoice without follow-up emails" | 55 |
Avoid: "The future of invoicing", "AI-powered invoicing platform", "Invoicing, reimagined".

## Description shape

`<What it does, one sentence>. <For whom / when>. <One specific or honest scope>. <What's free / how to start>.`
Example (fictional, 198 chars): "Acme Ledger turns a timesheet into an invoice and sends the reminders on day 1, 7 and 14.
Made for freelancers who bill monthly. v1 does invoicing and reminders only. Free for your first 10 clients."

## Maker comment (≤ 120 words)

1. Who you are in half a sentence and the problem you had (first person).
2. What v1 does, in 2–3 concrete lines.
3. What it does not do yet (honest scope builds trust on PH).
4. What is next (1 line, no dates you can't keep).
5. A specific ask: "If you invoice more than 5 clients, tell me which reminder schedule you'd want."
No "Hey Hunters 👋 excited to share", no upvote requests (against PH rules), no fake urgency.

## Rules

- Same message as the film and the X/LinkedIn posts; don't introduce new claims.
- Numbers only from BRIEF.md with a source.
- Credit line (only if the user opted in): last line of the maker comment, one of the lines from
  `npx launchfilm credit lines`.
