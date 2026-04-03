# Symphony AI Integration Guide

Symphony Anthology is AI-ready today because its output contract is stable, semantic, and documented. This guide focuses on patterns that already ship in the package.

## Use Symphony like this

### 1. Prefer semantic HTML

```html
<article>
  <header>
    <h2>Product headline</h2>
    <p>Short summary for humans and machines.</p>
  </header>

  <p>Body content.</p>

  <footer>
    <button data-variant="primary">Buy now</button>
  </footer>
</article>
```

### 2. Use `data-*` for variants

```html
<button data-variant="primary">Primary</button>
<button data-variant="outline" data-size="sm">Secondary</button>

<article class="card" data-elevation="raised">
  <h3>Card title</h3>
</article>
```

### 3. Use layout primitives instead of utility soup

```html
<section class="container">
  <div class="stack" data-gap="lg">
    <header class="stack" data-gap="sm">
      <h1>Readable structure</h1>
      <p class="text-lg">A model can follow this without custom training.</p>
    </header>

    <div class="grid" data-columns="3" data-gap="lg">
      <article class="card">...</article>
      <article class="card">...</article>
      <article class="card">...</article>
    </div>
  </div>
</section>
```

## Files generators should know

- `@symphonyui/symphonycss/tokens.json`
- `@symphonyui/symphonycss/schema`
- `@symphonyui/symphonycss/schema-presets.json`

These files describe the design system and component contract without requiring the generator to inspect CSS selectors directly.

## Recommended prompt frame

```text
Generate HTML for Symphony Anthology v1.
Use semantic HTML first.
Use these primitives when needed: container, grid, stack, cluster, sidebar, switcher, center, cover, card, prose.
Use data attributes for variants instead of extra classes.
Preserve accessible landmarks, labels, headings, and native controls.
```

## Conservatory -> Symphony mapping

| Conservatory finding | Symphony pattern |
| --- | --- |
| Weak heading hierarchy | semantic sectioning + `.stack` |
| Low CTA clarity | `button[data-variant="primary"]` |
| Hard-to-scan card layouts | `.grid` + `.card` with semantic `header/footer` |
| Form accessibility issues | native `label`, `input`, `select`, `textarea` |
| Dense content blocks | `.container[data-size="prose"]` + `.prose` |

See [RECIPES.md](./RECIPES.md) for concrete before/after implementations.

## Manual structured data

Automated schema injection is still a roadmap item. Today, pair Symphony with explicit microdata or JSON-LD when you need richer AI/search consumption.

```html
<article
  class="card"
  itemscope
  itemtype="https://schema.org/Product">
  <h2 itemprop="name">Anthology Kit</h2>
  <p itemprop="description">Semantic-first starter kit.</p>
  <p>
    <data itemprop="price" value="29">US$29</data>
  </p>
  <button data-variant="primary">Buy now</button>
</article>
```

## Roadmap boundary

Not shipped yet:

- custom elements
- schema auto-injection
- `create-symphony`
- `symphony verify`
- framework adapters package family
