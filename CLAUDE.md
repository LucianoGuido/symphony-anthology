# Symphony Anthology Project Memory

Use Anthology as a semantic-first implementation contract, not as a generic class soup framework.

## Core contract

- Prefer semantic HTML first.
- Use `data-*` attributes for intent before adding more classes.
- Use layout primitives only when composition needs them.
- Keep generated markup readable for humans and machines.
- Preserve accessibility basics every time: landmarks, heading order, labels, button `type`, `alt`, `summary`, and clear primary actions.

## Shipped primitives

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

### Variants and intent

- `data-variant`
- `data-size`
- `data-shape`
- `data-layout`
- `data-elevation`
- `data-padding`
- `data-spacing`
- `data-gap`
- `data-columns`
- `data-fixed`
- `data-state`

## Typography model

Think in roles, not brand names:

- `body` -> `--symphony-font-sans`, `--symphony-text-base`
- `heading` / `display` -> `--symphony-font-display`, tight leading
- `code` -> `--symphony-font-mono`

Anthology may visually use `Mona Sans` and `Inter Tight`, but generated code should rely on role-based tokens and CSS variables instead of hardcoding font names unless you are editing a theme or font pack.

## Theme boundary

- The core contract is dark-first.
- The Anthology theme is opt-in.
- Do not assume `data-theme="anthology"` is present unless the task explicitly asks for it.

## AI-ready sources of truth

Use these before inventing new patterns:

- `README.md`
- `docs/AI_INTEGRATION.md`
- `docs/ANTHOLOGY_MCP.md`
- `docs/RECIPES.md`
- `docs/MIGRATION.md`
- `metadata/anthology-metadata.json`
- `dist/tokens.json`
- `docs/symphony-schema.json`
- `docs/schema-presets.json`

## Shared Claude Code setup

This repo ships a shared Claude Code setup:

- `.mcp.json` registers the local `anthology` MCP server for the project
- `.claude/settings.json` auto-approves that project MCP server and grants only the Anthology MCP tools that currently ship
- local overrides belong in `.claude/settings.local.json` and `CLAUDE.local.md`

If Claude Code does not seem to pick up the config, run `/status` to inspect active settings and `/mcp` to inspect the project server list.

## Workflow

1. Start from the smallest semantic structure that solves the problem.
2. Reuse a shipped recipe when one already exists.
3. Add `data-*` variants only where intent matters.
4. Add primitives only where layout truly needs them.
5. If structured data is needed today, use explicit microdata or JSON-LD manually.
6. Validate with Anthology expectations before finishing.

Useful commands:

- `npm run build`
- `npm test`
- `node packages/anthology-verify/bin/anthology-verify.mjs ./index.html --strict`
- `node packages/anthology-verify/bin/anthology-verify.mjs ./docs --strict`
- `node packages/anthology-mcp/bin/anthology-mcp.mjs`

## Roadmap boundary

Do not present these as shipped features:

- custom elements
- schema auto-injection
- framework adapters package family
- published npm release of `@symphonyui/anthology-mcp`

## Skills available in this repo

- `/anthology-generate`
- `/anthology-migrate`
- `/anthology-audit-fix`
- `/anthology-design-handoff`
