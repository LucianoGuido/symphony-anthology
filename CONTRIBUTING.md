# Contributing to Symphony Anthology

## Principles

- Keep the public contract stable: semantic HTML + primitives + `data-*`
- Keep docs honest: do not document roadmap features as shipped
- Keep legacy support isolated to `compat`
- Keep generated artifacts reproducible from source

## Local workflow

```bash
npm run build
npm run verify
npm test
```

## Pull request checklist

- Update source files instead of editing generated `dist` files manually
- Update the canonical metadata source in `metadata/` instead of editing generated JSON in `dist/` or `docs/`
- Rebuild artifacts before opening the PR
- Keep documentation examples aligned with shipped features
- Add or update migration notes when public behavior changes
- Keep `npm pack --dry-run` clean

## Structure

- `src/` contains the framework sources
- `src/compat/legacy.css` contains opt-in aliases only
- `metadata/` contains the canonical metadata source
- `scripts/` contains build and verification scripts
- `docs/` contains public guidance and generated schema outputs

## Scope guidance

- Use the main bundles for shipped features only
- Put migration helpers in `compat`
- Put future ecosystem plans in roadmap docs, not product docs
- Treat `metadata/anthology-metadata.json` as the metadata source of truth
