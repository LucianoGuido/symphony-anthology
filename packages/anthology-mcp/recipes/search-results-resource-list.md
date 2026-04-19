# Search Results / Resource List

Use this for search pages, doc indexes, changelog archives, and resource libraries.

## Problem

Search and listing pages often collapse into repeated links without enough metadata to support quick scanning or structured reuse.

## Use when

- you need a list of related resources
- each result includes title, summary, and metadata
- you want a reusable pattern for docs or content surfaces

## Pattern

```html
<main class="container" data-size="prose">
  <header>
    <h1>Search results</h1>
    <p>12 patterns matched “forms”.</p>
  </header>

  <section>
    <article>
      <h2><a href="/docs/recipes/contact-form">Contact form</a></h2>
      <p>Semantic form pattern with labels, grouped actions, and clear intent.</p>
      <p><small>Recipe • Forms • Updated for 0.1.0</small></p>
    </article>
  </section>
</main>
```

## Why it works

- result items remain simple semantic articles
- titles, summaries, and metadata are easy to scan
- the pattern works for docs, search, and resource directories

## AI-readable notes

- keep each result self-contained
- prefer explicit metadata over visual badges only
- do not hide the result title inside generic wrappers
