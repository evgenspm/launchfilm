# Remotion license notice: once per project

launchfilm (skills, craft, CLI, studio code) is MIT. It renders with Remotion, which is a separate product under its
own license. launchfilm's MIT license does not cover Remotion. Remotion is source-available, not open source.
This is engineering guidance, not legal advice; Remotion's terms change, so link to them instead of paraphrasing more.

## When

At Gate 0 of the first film in a project, before the first render, if `npx launchfilm license status` reports no
answer (state: `remotionLicenseAck` empty in `.harness/state.json`). Once per project. Never again after it is recorded.

## What to say (verbatim)

> Rendering uses Remotion. Remotion is free for individuals and for companies of up to 3 people; larger companies need
> a Remotion company license: https://www.remotion.dev/license.
> Is this video for a company of 4 or more people? (Remotion's newer terms count contractors too.)

## Record the answer

| User answer | Command | Then |
|---|---|---|
| individual, solo, side project | `npx launchfilm license ack individual` | continue |
| company or team of ≤ 3 people (contractors included) | `npx launchfilm license ack small-team` | continue |
| 4+ people and they have a company license | `npx launchfilm license ack company-licensed` | continue |
| 4+ people without a license yet, trying it out, unsure, or no answer | `npx launchfilm license ack evaluating` | say once: "Commercial use at 4+ people needs a Remotion company license: https://www.remotion.dev/license. Change the answer any time with `npx launchfilm license ack <answer>`." Continue |

The CLI writes `"remotionLicenseAck": {"answer": "<answer>", "at": "<ISO>"}` into `.harness/state.json`.
Without the CLI, merge that object by hand, keeping other keys.

## Rules

- Never block a render, a preview or any gate on the answer. The license is the user's responsibility.
- Never repeat the notice, remind about it later, or ask again after `remotionLicenseAck` is set.
- Never claim launchfilm grants Remotion rights, and never call the stack "fully open source".
- Never vendor or copy Remotion source; the studio depends on pinned npm packages only.
- In non-interactive runs (CI, batch, headless): do not ask and do not record an answer for the user. The README and
  INSTALL already carry the notice for those users.
