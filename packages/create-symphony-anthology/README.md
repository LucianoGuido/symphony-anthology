# @symphonyui/create-symphony-anthology Preview

`@symphonyui/create-symphony-anthology` is the starter scaffolder for Symphony Anthology.

Use it when you want to start a new project already wired for Anthology.

This is different from installing `@symphonyui/symphony-anthology` into an existing project:

- `npm install @symphonyui/symphony-anthology` adds Anthology to a project you already have
- `@symphonyui/create-symphony-anthology` creates a new project folder with starter files, structure, and Anthology CSS already in place

This package currently lives in the repo as a publish-ready local package. It is not yet published to npm from this environment.

## Supported templates

- `html`
- `astro`
- `next`

## Local usage

```bash
node packages/create-symphony-anthology/bin/create-symphony-anthology.mjs my-anthology-app --template html
```

The CLI copies the current built `symphony.core.css` artifact into the generated starter so the project can start from the real Anthology contract that exists in the repo today.

Once published, the intended usage will be:

```bash
npm create @symphonyui/symphony-anthology@latest my-anthology-app
```

or:

```bash
npx @symphonyui/create-symphony-anthology my-anthology-app
```
