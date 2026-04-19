# @symphonyui/anthology-verify Preview

`@symphonyui/anthology-verify` is the verification companion for Symphony Anthology.

It checks semantic HTML, form labeling, heading structure, and a few Anthology-aligned interaction patterns so teams can catch structural issues before shipping.

## Current status

This package exists locally in the repo as a publish-ready package and is not published yet from this environment.

## What it checks today

- missing `main` landmarks
- sections or articles without headings
- unlabeled form controls
- buttons inside forms without `type`
- images without `alt`
- `details` elements without `summary`
- multiple unlabeled nav landmarks
- skipped heading levels
- multi-action groups without a primary action

## Local usage

```bash
node packages/anthology-verify/bin/anthology-verify.mjs ./index.html
```

Strict mode:

```bash
node packages/anthology-verify/bin/anthology-verify.mjs ./index.html --strict
```

JSON output:

```bash
node packages/anthology-verify/bin/anthology-verify.mjs ./index.html --format json
```

## Intended usage after publishing

```bash
npx @symphonyui/anthology-verify ./index.html
```
