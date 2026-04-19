# Dashboard Summary

Use this for product overviews, analytics summaries, and admin entry screens with lightweight metrics.

## Problem

Dashboard UIs often become div-heavy and visually dense, which makes them harder to maintain and harder to interpret programmatically.

## Use when

- you need a small set of summary metrics
- you need grouped panels for status or actions
- you want a dashboard pattern without a heavy component framework

## Pattern

```html
<main class="container">
  <header class="stack" data-gap="sm">
    <h1>Release overview</h1>
    <p>Track adoption, docs coverage, and package health.</p>
  </header>

  <div class="grid" data-columns="3" data-gap="lg">
    <article class="card">
      <h2>Core bundle</h2>
      <p><strong>15.2KB</strong> gzip</p>
    </article>

    <article class="card">
      <h2>Recipes</h2>
      <p><strong>12</strong> launch patterns</p>
    </article>

    <article class="card">
      <h2>Browser smoke</h2>
      <p><strong>3</strong> modern browsers covered</p>
    </article>
  </div>
</main>
```

## Why it works

- each metric block is a semantic article
- the page uses simple sectioning instead of custom dashboard primitives
- the pattern can scale into richer admin surfaces later

## AI-readable notes

- label each metric clearly
- keep values and units together
- separate summary blocks from detailed tables or logs
