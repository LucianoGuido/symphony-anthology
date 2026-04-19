---
name: anthology-generate
description: Generate or refactor UI using Symphony Anthology's shipped semantic-first contract. Use for pages, sections, components, landing pages, docs pages, and examples that should stay aligned with Anthology.
---

Build Anthology UI with the shipped contract only.

## Goals

- Produce semantic HTML that stays readable without framework-specific knowledge.
- Use Anthology primitives and `data-*` intentionally, not everywhere.
- Keep output friendly to `anthology-verify`, Conservatory follow-up work, and future agent handoffs.

## Workflow

1. Identify the nearest shipped recipe in `docs/RECIPES.md`.
2. Start with semantic elements and landmarks.
3. Add the smallest Anthology primitive set needed.
4. Add `data-*` only for variants, hierarchy, spacing, or state that matters.
5. Keep typography role-based: `body`, `heading`, `code`.
6. Prefer token-driven styling over one-off values.

## Allowed building blocks

### Layout

- `.container`
- `.grid`
- `.stack`
- `.cluster`
- `.sidebar`
- `.switcher`
- `.center`
- `.cover`

### Component primitives

- `.card`
- `.prose`

### Common variant attributes

- `data-variant`
- `data-size`
- `data-layout`
- `data-elevation`
- `data-gap`
- `data-columns`

## Rules

- Do not invent custom elements or unshipped APIs.
- Do not default to utility soup when a semantic structure is clearer.
- Do not hardcode font names in generated UI code unless editing a theme or font pack.
- If the request is visually specific but outside the shipped contract, keep custom CSS small and token-based.
- If the user needs richer structured data, use explicit microdata or JSON-LD.

## Final self-check

- Does the page have the right landmark structure?
- Do sections and articles have headings or accessible labels?
- Are forms labeled?
- If there are multiple actions, is one clearly primary?
- Is the result still recognizable as Anthology instead of arbitrary custom markup?
