# Symphony Anthology

Semantic and AI-first CSS framework for clean HTML, accessible defaults, and machine-readable interfaces.

Give semantic HTML a real default shape for the AI era.

Symphony Anthology ships a semantic baseline, optional layout primitives, data-attribute variants, AI-ready metadata, and an opt-in compatibility layer for older `.symphony-*` aliases.

## Features

- Semantic-first baseline: headings, text, forms, tables, navigation, dialog, and content elements render with meaningful defaults
- Classes optional: start with semantic HTML, add `data-*` variants when needed, reach for layout primitives only when composition gets complex
- OKLCH-driven design system: base colors and state tokens are built around modern perceptual color workflows
- AI-ready outputs: `tokens.json`, `schema`, and `schema-presets.json` ship with the package
- Modern CSS architecture: cascade layers, custom properties, native nesting, and container-query-aware components
- Dark-first core theme: the current core ships with a dark visual baseline tuned for Anthology
- Lightweight bundles: current build is about `15.2KB` gzip for `core` and `16.5KB` gzip for the full bundle
- Opt-in legacy support: older `.symphony-*` selectors live in a separate `compat` bundle instead of polluting the main contract

## Install

```bash
npm install @symphonyui/symphonycss
```

### CSS entry points

```html
<!-- Full bundle -->
<link rel="stylesheet" href="https://unpkg.com/@symphonyui/symphonycss/dist/symphony.min.css">

<!-- Reduced production bundle -->
<link rel="stylesheet" href="https://unpkg.com/@symphonyui/symphonycss/dist/symphony.core.min.css">

<!-- Optional theme -->
<link rel="stylesheet" href="https://unpkg.com/@symphonyui/symphonycss/dist/themes/anthology/anthology.min.css">

<!-- Optional legacy aliases -->
<link rel="stylesheet" href="https://unpkg.com/@symphonyui/symphonycss/dist/symphony.compat.min.css">
```

### NPM imports

```js
import '@symphonyui/symphonycss/symphony.core.css';
import '@symphonyui/symphonycss/themes/anthology';
```

## Quick start

This works with semantic HTML first, without needing utility classes just to get a usable page:

```html
<header>
  <nav>
    <a href="/">Symphony Anthology</a>
    <ul>
      <li><a href="/docs">Docs</a></li>
      <li><a href="/examples">Examples</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Semantic HTML with a real default shape</h1>
    <p>Start with meaningful structure. Add variants only when intent matters.</p>
    <button data-variant="primary">Get started</button>
  </article>
</main>
```

When you need more control, layer on Anthology primitives:

```html
<main class="container" data-size="prose">
  <article class="stack" data-gap="lg">
    <header class="stack" data-gap="sm">
      <p class="text-sm text-muted">Symphony Anthology</p>
      <h1>Semantic-first CSS that stays readable for humans and AI</h1>
      <p class="text-lg">
        Use semantic HTML first. Reach for data attributes when you need variants.
      </p>
    </header>

    <div class="cluster" data-gap="sm">
      <button data-variant="primary">Primary action</button>
      <button data-variant="outline">Secondary action</button>
    </div>
  </article>
</main>
```

## Three levels, one mental model

1. Semantic HTML by default
2. Data attributes for intent
3. Optional primitives for layout and composition

That means Anthology can feel classless for simple pages, but still scale into a full implementation layer when the UI gets denser.

## What ships today

### Semantic baseline

- Typography and long-form content
- Links, lists, media, blockquotes, code, and tables
- Forms and native controls
- Navigation patterns
- Native `dialog`
- Native `details` and `summary`

### Layout primitives

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
- `.button`
- `.prose`

### Data-attribute API

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

### AI-ready metadata

- `@symphonyui/symphonycss/tokens.json`
- `@symphonyui/symphonycss/schema`
- `@symphonyui/symphonycss/schema-presets.json`
- [Metadata contract](./docs/METADATA.md)

## Color system and tokens

Anthology uses OKLCH as the base color model in the core design system, then maps those values into semantic tokens that components consume.

In practice the stack looks like this:

- [src/core/_variables.css](./src/core/_variables.css): base OKLCH scales, hues, surfaces, text, spacing, radii, shadows
- [src/core/_tokens.css](./src/core/_tokens.css): component-facing aliases used by the shipped core theme
- [src/symphony.core.css](./src/symphony.core.css): imports variables first, then token aliases, then layout and components

Example:

```css
:root {
  --symphony-hue-primary: 264;
  --symphony-primary: oklch(60% 0.15 var(--symphony-hue-primary));
}
```

The current Anthology core is dark-first and maps its visual theme from brand-driven tokens such as `--symphony-background`, `--symphony-surface`, and `--symphony-primary`.

## Public contract

The v1 contract is:

- semantic HTML
- modern layout primitives
- `data-*` variants
- machine-readable metadata

Older `.symphony-*` aliases are not bundled into the main outputs anymore. If you are migrating an older implementation, load `@symphonyui/symphonycss/compat` explicitly and follow [docs/MIGRATION.md](./docs/MIGRATION.md).

## AI-ready today

Anthology is AI-ready because the current contract is:

- predictable
- semantic
- machine-readable
- documented in JSON

Use these files in generators, audits, prompts, or validation workflows:

- [dist/tokens.json](./dist/tokens.json)
- [docs/symphony-schema.json](./docs/symphony-schema.json)
- [docs/schema-presets.json](./docs/schema-presets.json)
- [docs/RECIPES.md](./docs/RECIPES.md)
- [docs/METADATA.md](./docs/METADATA.md)
- [docs/AI_INTEGRATION.md](./docs/AI_INTEGRATION.md)

### Conservatory to Symphony workflow

Conservatory identifies structural or UX issues on rendered pages. Symphony Anthology then provides repeatable implementation patterns to fix them.

Example flows:

- Heading hierarchy issue -> semantic sectioning + `.stack`
- Weak CTA clarity -> `button[data-variant="primary"]`
- Card density issue -> `.grid` + `.card` + semantic headers and footers
- Accessibility friction in forms -> native labels and inputs with Anthology defaults

## Bundle outputs

```text
dist/
├── symphony.css
├── symphony.min.css
├── symphony.core.css
├── symphony.core.min.css
├── symphony.compat.css
├── symphony.compat.min.css
├── themes/anthology/anthology.css
├── themes/anthology/anthology.min.css
└── tokens.json
```

### Current sizes

From `npm run size` on the current build:

- `dist/symphony.core.min.css`: `15189` bytes gzip
- `dist/symphony.min.css`: `16454` bytes gzip
- `dist/symphony.compat.min.css`: `728` bytes gzip
- `dist/themes/anthology/anthology.min.css`: `1391` bytes gzip

## Development

```bash
# Build CSS + metadata artifacts
npm run build

# Verify package contents and docs references
npm run verify

# Build + verify in one command
npm test

# Print output sizes
npm run size
```

## Docs and examples

- [Documentation](./docs/index.html)
- [Landing page example](./docs/examples/landing-page.html)
- [AI-ready patterns demo](./docs/examples/ai-first-demo.html)
- [Conservatory to Symphony recipes](./docs/RECIPES.md)
- [Metadata contract](./docs/METADATA.md)
- [Browser smoke guide](./docs/TESTING.md)
- [Migration guide](./docs/MIGRATION.md)
- [Internal preview](./testing/preview.html)
- [Browser smoke harness](./testing/index.html)

## What does not ship yet

These are roadmap items, not current package features:

- Custom elements / `@symphony/elements`
- `create-symphony`
- `symphony verify`
- Automated schema injection
- Framework adapters package family

## Ecosystem position

Symphony Anthology is the implementation layer in the wider Symphony ecosystem:

- Conservatory: detects issues and opportunities
- Unison Metrics: scores quality across dimensions
- Symphony Anthology: provides reusable implementation patterns
- Future add-ons: schema, elements, adapters, CLI, verification

## Contributing

Contribution and release expectations live in [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT
