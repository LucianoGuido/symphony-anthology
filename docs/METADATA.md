# Metadata Contract

Symphony Anthology ships AI-ready metadata, but those public JSON files are generated artifacts, not the place to edit by hand.

## Source of truth today

The current authoritative metadata source lives in [`metadata/`](../metadata):

- [`metadata/anthology-metadata.json`](../metadata/anthology-metadata.json)

This single canonical file contains the source data for:

- design tokens
- component schema
- schema presets

## Generated outputs

Running `npm run build` generates metadata from the canonical file into the public package surfaces:

- `metadata/anthology-metadata.json` -> [`dist/tokens.json`](../dist/tokens.json)
- `metadata/anthology-metadata.json` -> [`docs/symphony-schema.json`](./symphony-schema.json)
- `metadata/anthology-metadata.json` -> [`docs/schema-presets.json`](./schema-presets.json)

That generation step is implemented in [`scripts/build-ai-assets.mjs`](../scripts/build-ai-assets.mjs).

## Editing rule

- Edit files in `metadata/`
- Do not manually edit generated JSON in `dist/` or `docs/`
- Rebuild after metadata changes with `npm run build`
- Verify with `npm test`

## Why this matters

Anthology’s AI-first contract depends on these files staying predictable:

- generators can consume stable tokens
- prompts can target stable schema names
- docs can point to the same exported structures
- package consumers can trust that shipped JSON matches the repo sources

## Current state

Anthology now uses a single canonical metadata source file.

The next improvement area is not consolidation anymore, but richer generation:

- deriving more metadata directly from the CSS/token system
- expanding presets and schema coverage
- eventually exposing stronger verification around metadata drift
