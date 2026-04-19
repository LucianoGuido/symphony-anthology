# Card Collection

Use this for resource lists, feature overviews, directories, and product catalogs.

## Problem

Lists of offers or resources often render as visually similar boxes with no semantic framing, making them harder to scan and harder to transform.

## Use when

- you need repeated summary units
- each item has its own title, copy, and action
- the collection needs to adapt across viewports

## Pattern

```html
<section class="container">
  <header class="stack" data-gap="sm">
    <h2>Explore the recipe library</h2>
    <p>Browse shipped patterns and implementation guidance.</p>
  </header>

  <div class="grid" data-columns="3" data-gap="lg">
    <article class="card" data-elevation="raised">
      <header>
        <h3>Hero + CTA</h3>
        <p>Landing pattern with clear messaging and action hierarchy.</p>
      </header>

      <footer>
        <a href="./hero-cta.md" class="button" data-variant="primary">Open recipe</a>
      </footer>
    </article>
  </div>
</section>
```

## Why it works

- `.grid` gives the collection a stable responsive layout
- each `article` becomes a self-contained semantic unit
- `header` and `footer` make the item structure explicit

## AI-readable notes

- make card titles descriptive enough to stand alone
- keep actions consistent across the collection
- do not mix unrelated content types in the same repeated pattern
