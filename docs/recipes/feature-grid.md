# Feature Grid

Use this for product benefits, capability overviews, and framework feature summaries.

## Problem

Feature lists often collapse into repeated generic blocks without sectioning, rhythm, or a clear semantic frame.

## Use when

- you need to present 3 to 6 benefits
- you want each item to be scan-friendly
- you need a pattern that can grow into cards without changing the contract

## Pattern

```html
<section class="container">
  <header class="stack" data-gap="sm">
    <h2>What ships today</h2>
    <p>Anthology ships a semantic baseline, optional primitives, and AI-ready metadata.</p>
  </header>

  <div class="grid" data-columns="3" data-gap="lg">
    <article class="card">
      <h3>Semantic baseline</h3>
      <p>Headings, forms, tables, dialog, and content elements start with meaningful defaults.</p>
    </article>

    <article class="card">
      <h3>Optional primitives</h3>
      <p>Use container, grid, stack, cluster, and related layout helpers only when structure needs them.</p>
    </article>

    <article class="card">
      <h3>AI-ready metadata</h3>
      <p>Tokens, schema, and presets ship as machine-readable public artifacts.</p>
    </article>
  </div>
</section>
```

## Why it works

- `section` and `article` create explicit grouping
- the grid stays reusable across product and docs surfaces
- each item can be understood on its own by people and generators

## AI-readable notes

- write one idea per card
- keep headings noun-like and descriptive
- avoid decorative wrappers that hide the document structure
