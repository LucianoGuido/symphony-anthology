# Releasing Anthology Packages

This repo currently contains four publishable package surfaces:

- `@symphonyui/symphony-anthology`
- `@symphonyui/create-symphony-anthology`
- `@symphonyui/anthology-schema`
- `@symphonyui/anthology-verify`

## Current package versions

- `@symphonyui/symphony-anthology`: `0.1.0`
- `@symphonyui/create-symphony-anthology`: `0.1.0`
- `@symphonyui/anthology-schema`: `0.1.0`
- `@symphonyui/anthology-verify`: `0.1.0`

## Before publishing

Run the full verification suite from the repo root:

```bash
npm test
```

That currently verifies:

- build artifacts
- generated metadata
- docs references
- package tarballs
- `npm publish --dry-run` for `@symphonyui/symphony-anthology`
- `@symphonyui/create-symphony-anthology` starter generation
- `npm publish --dry-run` for subpackages

## Recommended order

1. publish `@symphonyui/create-symphony-anthology`
2. publish `@symphonyui/anthology-schema`
3. publish `@symphonyui/anthology-verify`
4. publish `@symphonyui/symphony-anthology` updates when needed

## Local publish commands

### @symphonyui/symphony-anthology

From the repo root:

```bash
npm publish --access public
```

### @symphonyui/create-symphony-anthology

```bash
cd packages/create-symphony-anthology
npm publish --access public
```

### @symphonyui/anthology-schema

```bash
cd packages/anthology-schema
npm publish --access public
```

### @symphonyui/anthology-verify

```bash
cd packages/anthology-verify
npm publish --access public
```

## Versioning

- bump the package version before publishing
- keep release notes aligned with what actually shipped
- run `npm publish --dry-run` again after version changes if anything structural changed

### Suggested next publish set

- publish `@symphonyui/create-symphony-anthology@0.1.0`
- publish `@symphonyui/anthology-schema@0.1.0`
- publish `@symphonyui/anthology-verify@0.1.0`
- publish `@symphonyui/symphony-anthology@0.1.0`

### Why align everything at `0.1.0`

This is the first public release line for the ecosystem packages, so aligning them at `0.1.0` keeps the launch simpler and easier to understand:

- docs playground
- canonical metadata source
- `@symphonyui/create-symphony-anthology`
- `@symphonyui/anthology-schema`
- `@symphonyui/anthology-verify`
- release workflows and dry-run checks

This keeps the first public npm surface consistent instead of mixing `0.x` helpers with a `1.x` core package.

## GitHub Actions

The repo includes a manual workflow at `.github/workflows/publish-packages.yml`.

To use it:

1. add an `NPM_TOKEN` repository secret
2. trigger the workflow manually
3. choose which package(s) to publish
4. use dry-run first, then run the real publish
