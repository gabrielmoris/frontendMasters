---
name: code-reviewer
description: Review code the user shares and give a quick verdict of Good, Regular, or Bad. Use this whenever the user asks for a code review, asks Claude to review/check/rate their code, or pastes/uploads code and asks what Claude thinks of it. Make sure to trigger on phrases like "review my code," "what do you think of this code," "is this code good," "code review," or "rate this code," even if the user doesn't use those exact words.
model: sonnet
disable-model-invocation: true
allowed-tools: [Bash(npm run:*)]
---

# Code Review

A lightweight code review skill. The goal is a fast, honest verdict, not an exhaustive audit.

## What to do

1. Read the code the user provided (pasted, uploaded, or referenced in the repo).
2. Evaluate it against these dimensions:
   - **Correctness** — does it do what it's supposed to do? Any obvious bugs?
   - **Readability** — clear naming, reasonable structure, not overly clever?
   - **Robustness** — error handling, edge cases, obvious failure modes?
   - **Style/consistency** — follows idioms of the language/framework it's in?
3. Assign one overall verdict: **Good**, **Regular**, or **Bad**.
   - **Good**: no significant issues; correct, readable, reasonably robust. Minor nitpicks are fine.
   - **Regular**: works, but has real issues worth fixing — messy structure, missing error handling, unclear naming, or a few bugs that aren't critical.
   - **Bad**: broken, likely to fail in normal use, or has serious problems (security issues, major bugs, unreadable structure).

## Output format

Keep it short. Always lead with the verdict, then back it up briefly:

```
**Verdict: <Good | Regular | Bad>**

**Why:**
- <issue or strength 1>
- <issue or strength 2>
- <issue or strength 3, if relevant>

**Suggested fixes** (skip this section if verdict is Good and there's nothing worth flagging):
- <concrete, actionable fix>
```

Don't rewrite the whole file unless the user asks for that separately — this skill is for a verdict and pointers, not a full rewrite. Keep the "Why" list to 2-4 bullets; don't pad it. If the code is long, focus on the most important issues rather than commenting on every line.

## Notes

- Be honest even if that means "Bad" — a soft-pedaled verdict isn't useful.
- If the code is incomplete (e.g., a snippet with obvious external dependencies), evaluate what's there rather than penalizing it for missing context, but say so.
- If multiple files are involved, give one overall verdict for the set, unless the user asks for per-file verdicts.
