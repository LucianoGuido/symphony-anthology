---
name: anthology-audit-fix
description: Fix markup based on anthology-verify or Conservatory-style findings using shipped Anthology patterns. Use when a page has structural, accessibility, hierarchy, CTA, or content-density problems.
---

Treat findings as implementation guidance, not as isolated linter noise.

## Fix patterns

- Weak heading hierarchy -> semantic sectioning + clear heading order + `.stack`
- CTA hierarchy unclear -> group actions with `.cluster` and make one action primary
- Card density or scanability issues -> `.grid` + `.card` + semantic `header` / `footer`
- Form accessibility issue -> explicit `label`, native control, helpful structure
- Dense prose -> `.container[data-size="prose"]` + `.prose`
- Missing section/article heading -> add a real heading or accessible label
- Multiple nav landmarks -> add `aria-label` or `aria-labelledby`
- Missing `summary` -> use native `details` / `summary`

## Rules

- Fix the root structural issue, not just the warning symptom.
- Prefer the shipped recipe library over bespoke rewrites.
- Keep the output within Anthology's current public contract.
- Preserve existing meaning and content unless the issue requires structural change.

## Verification mindset

When the issue list is short, fix all of it.

When the issue list is large:

1. fix landmarks and headings first
2. fix forms and interactive controls second
3. improve CTA clarity and scanability third

If multiple actions are present, ensure one is primary unless the page truly has equal-weight actions.
