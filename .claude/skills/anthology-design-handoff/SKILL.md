---
name: anthology-design-handoff
description: Turn a design handoff, screenshot, or Claude Design output into Symphony Anthology implementation. Use when translating visual work into shipped Anthology markup, tokens, and patterns.
---

Convert design intent into Anthology code without losing semantics.

## Inputs this skill can handle

- screenshots
- mockups
- Figma-like specs
- Claude Design handoff bundles
- standalone HTML exports
- annotated product requirements with visual direction

## Translation method

1. Identify the page landmarks and section boundaries.
2. Extract hierarchy: title, supporting text, actions, cards, forms, navigation, tables, dialogs.
3. Map layout to Anthology primitives.
4. Map component styling to `data-*` variants and token-driven styling.
5. Keep typography role-based:
   - `body`
   - `heading` / `display`
   - `code`
6. Keep custom CSS small, local, and token-based when the shipped contract is not enough.

## Important rules

- Do not reproduce a design literally if it requires abandoning semantics.
- Do not hardcode brand font names in implementation code unless working on a theme or font pack.
- Prefer Anthology patterns that survive future edits and agent handoffs.
- If a design asks for something not shipped by Anthology, implement the smallest safe extension and clearly separate it from the public contract.

## Handoff output should include

- semantic HTML structure
- Anthology primitives and `data-*` usage
- any minimal custom CSS needed
- explicit note when the design exceeds Anthology's shipped surface
