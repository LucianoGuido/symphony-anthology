# Anthology Verify Preview

`anthology-verify` is the verification layer for Symphony Anthology.

Today it exists in this repo as the local, publish-ready package [`@symphonyui/anthology-verify`](../packages/anthology-verify/README.md), with an `anthology-verify` CLI.

## What it checks today

- missing `main` landmarks
- sections or articles without headings
- unlabeled form controls
- buttons inside forms without `type`
- images without `alt`
- `details` elements without `summary`
- multiple unlabeled nav landmarks
- heading level skips
- multi-action clusters without a primary action

## Local usage

```bash
node packages/anthology-verify/bin/anthology-verify.mjs ./index.html
```

Strict mode:

```bash
node packages/anthology-verify/bin/anthology-verify.mjs ./docs --strict
```

JSON output:

```bash
node packages/anthology-verify/bin/anthology-verify.mjs ./index.html --format json
```

## Why it matters

Anthology is not only a CSS layer. It is also a contract for:

- semantic structure
- accessible defaults
- predictable AI-readable markup

`anthology-verify` is the bridge that checks whether real HTML follows that contract.

## Roadmap boundary

This package is ready for a first publish, but some follow-up work is still open:

- published npm package
- richer file-type support beyond the current HTML-first focus
- deeper token and schema-aware rules
- CI integrations and autofix-style workflows
