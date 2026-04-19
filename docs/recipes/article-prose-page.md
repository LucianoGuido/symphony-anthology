# Article / Prose Page

Use this for changelogs, blog posts, documentation articles, and long-form editorial content.

## Problem

Long-form pages become hard to read when reading measure, paragraph spacing, and heading rhythm are uncontrolled.

## Use when

- you publish articles or release notes
- you need calm reading width
- you want AI-generated or editorial content to stay readable by default

## Pattern

```html
<main class="container" data-size="prose">
  <article class="prose">
    <header>
      <h1>Release notes</h1>
      <p>Anthology 0.1.0 stabilizes the public CSS contract and AI-ready metadata files.</p>
    </header>

    <p>Long-form content...</p>
    <h2>What changed</h2>
    <p>More content...</p>
  </article>
</main>
```

## Why it works

- `data-size="prose"` narrows the reading measure
- `.prose` improves rhythm for long content
- semantic article structure works well for docs and editorial pages

## AI-readable notes

- preserve a real heading hierarchy
- avoid dumping dense content into a single anonymous container
- keep section titles meaningful and specific
