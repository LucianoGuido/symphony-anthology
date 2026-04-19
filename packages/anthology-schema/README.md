# @symphonyui/anthology-schema Preview

`@symphonyui/anthology-schema` is the dedicated metadata package for Symphony Anthology.

It packages the machine-readable parts of the Anthology contract so AI tooling, generators, and validation workflows can consume them without depending on the full CSS package surface.

## What it includes

- `schema.json`
- `schema-presets.json`
- `tokens.json`

## Current status

This package is scaffolded locally as a publish-ready package and generated from the canonical metadata source in the repo. It is not published yet from this environment.

## Intended usage after publishing

```bash
npm install @symphonyui/anthology-schema
```

Then consume the exported files in your tooling pipeline.
