# Metadata Contract

Symphony Anthology ships AI-ready metadata, but those public JSON files are generated artifacts, not the place to edit by hand.

## Source of truth today

The current authoritative metadata sources live in [`metadata/`](../metadata):

- [`metadata/tokens.json`](../metadata/tokens.json)
- [`metadata/symphony-schema.json`](../metadata/symphony-schema.json)
- [`metadata/schema-presets.json`](../metadata/schema-presets.json)

These three files are the current source of truth for package metadata.

## Generated outputs

Running `npm run build` copies metadata from `metadata/` into the public package surfaces:

- `metadata/tokens.json` -> [`dist/tokens.json`](../dist/tokens.json)
- `metadata/symphony-schema.json` -> [`docs/symphony-schema.json`](./symphony-schema.json)
- `metadata/schema-presets.json` -> [`docs/schema-presets.json`](./schema-presets.json)

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

## Current limitation

`metadata/` is the authoritative metadata directory today, but it is not yet a single-file canonical schema system.

Right now we maintain three coordinated JSON sources. A future step is to generate tokens, schema, and presets from one canonical model instead of maintaining them in parallel.
