---
name: anthology-migrate
description: Migrate legacy or utility-heavy markup into Symphony Anthology. Use when converting older .symphony-* usage, BEM-heavy component markup, or utility-first HTML into Anthology's semantic-first contract.
---

Migrate toward Anthology without breaking meaning or accessibility.

## Migration priorities

1. Preserve semantics and behavior.
2. Reduce class soup.
3. Replace old Anthology aliases with the modern contract.
4. Keep `compat` only as a temporary bridge.

## Mapping guidance

### Legacy Anthology

- `.symphony-container` -> `.container`
- `.symphony-grid` -> `.grid`
- `.symphony-flex` -> `.flex` only if needed, otherwise prefer `.cluster` or `.stack`
- `.symphony-button--primary` -> `data-variant="primary"`
- `.symphony-button--sm` -> `data-size="sm"`
- `.symphony-card--elevated` -> `.card[data-elevation="raised"]`

See `docs/MIGRATION.md` before keeping any legacy alias.

### Utility-heavy markup

- Collapse purely presentational wrappers when semantics can carry the structure.
- Replace repeated spacing/layout utility combinations with `.stack`, `.cluster`, `.grid`, and `.container`.
- Keep only the minimum classes needed for composition.

## Rules

- Prefer semantic elements over anonymous `div` wrappers.
- Prefer `data-*` for component intent over modifier classes.
- Do not carry forward legacy names just because they already exist.
- If `compat` is still required, keep that decision explicit and temporary.

## After migrating

- Re-check heading hierarchy and landmarks.
- Re-check forms and action groups.
- Suggest `anthology-verify` when the migration touched real HTML surfaces.
