# X post

## Limits and facts

- ≤ 280 characters. Every link counts as 23 characters whatever its length. Longer posts exist on paid accounts;
  write for 280 anyway (the feed truncates long posts and the video does the talking).
- Upload the video natively (the `x-16x9` render). It autoplays muted: the film's burned captions carry it.
- Hashtags: 0 by default, max 2. Mentions only of people or companies who agreed to be mentioned.
- 1–2 variants. Optional first reply with the link if the user prefers the main post link-free.

Count (links as 23):
```bash
node -e 'const t=require("fs").readFileSync(0,"utf8").trim();const n=[...t.replace(/https?:\/\/\S+/g,"x".repeat(23))].length;console.log(n)' <<< "<post text>"
```

## Shapes that work

| Shape | Structure | Acme example (fictional, write your own) |
|---|---|---|
| Plain statement | what it does + for whom + link | "Acme Ledger turns your timesheet into an invoice and sends the reminders for you. Built for freelancers who hate chasing money. acme-ledger.example" |
| Before → after | the old way in 1 line, the new way in 1 line | "I used to spend Friday afternoons chasing invoices. Now Acme Ledger sends the reminders and I get the 'paid' email. acme-ledger.example" |
| Specific number | one sourced number + what changed | "Our beta users stopped writing reminder emails. 412 reminders sent in March, zero typed by hand. Acme Ledger is open to everyone today: acme-ledger.example" |
| Honest scope | what v1 does and does not do | "Acme Ledger v1 does one thing: invoices that chase themselves. No bank sync yet. acme-ledger.example" |

## Rules

- First 8–12 words carry the post (that's what shows next to the video).
- One sentence per idea; 2–4 sentences total.
- Plain words. Lowercase or sentence case as the founder writes. No "🚀", no "We're live!".
- Numbers must be in BRIEF.md with a source. No source → use the "honest scope" or "before → after" shape.
- Credit line (only if the user opted in): last line, `Made with launchfilm by @evgenspm`. It must still fit in 280.
