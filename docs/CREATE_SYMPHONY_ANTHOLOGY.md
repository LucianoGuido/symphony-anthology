# Create Symphony Anthology Preview

`@symphonyui/create-symphony-anthology` is the starter scaffolder for Symphony Anthology.

Use it when you want a brand-new project already wired for Anthology.

It is not the same as installing the framework into an existing project:

- `npm install @symphonyui/symphony-anthology` adds Anthology to a project you already have
- `@symphonyui/create-symphony-anthology` creates a new project folder with starter files and Anthology already included

Today it exists in this repo as a publish-ready local implementation. It is not yet published as a standalone npm package, but the CLI already works locally and generates starters from the current Anthology build artifacts.

## Supported templates

- `html`
- `astro`
- `next`

## Local usage

From the repo root:

```bash
node packages/create-symphony-anthology/bin/create-symphony-anthology.mjs my-anthology-app --template html
```

You can also use:

```bash
node packages/create-symphony-anthology/bin/create-symphony-anthology.mjs my-astro-app --template astro
node packages/create-symphony-anthology/bin/create-symphony-anthology.mjs my-next-app --template next
```

Once published, the intended usage will be:

```bash
npm create @symphonyui/symphony-anthology@latest my-anthology-app
```

or:

```bash
npx @symphonyui/create-symphony-anthology my-anthology-app
```

## What the CLI does today

- copies a real starter template into the target directory
- replaces project-name placeholders
- copies the current built `symphony.core.css` file into the generated app
- gives next steps based on the chosen template

## What ships in each starter

### HTML

- semantic landing page
- local `styles/symphony.core.css`
- local `styles/site.css`

### Astro

- semantic page under `src/pages/index.astro`
- base layout and local styles
- copied `src/styles/symphony.core.css`

### Next

- App Router starter
- semantic landing page under `app/page.jsx`
- copied `app/symphony.core.css`

## Verification

Run the local smoke test from the repo root:

```bash
npm run smoke:create-symphony-anthology
```

This generates temporary starters for all supported templates and checks that the key files exist and placeholders are resolved.

## Roadmap boundary

Still not done:

- publishing `@symphonyui/create-symphony-anthology` as its own npm package
- remote starter download/update flows
- richer starter variants beyond the initial three templates
