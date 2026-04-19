# Docs Sidebar Layout

Use this for documentation, guides, changelogs, and content-heavy product surfaces with local navigation.

## Problem

Documentation pages often use visually complex wrappers that obscure the underlying landmarks and reduce navigability.

## Use when

- you need navigation plus content in the same view
- the page has multiple sections or anchors
- you want a docs pattern that stays easy to scan

## Pattern

```html
<main class="container">
  <div class="sidebar" data-gap="lg">
    <nav aria-label="Documentation sections">
      <ul>
        <li><a href="#install">Install</a></li>
        <li><a href="#contract">Contract</a></li>
        <li><a href="#recipes">Recipes</a></li>
      </ul>
    </nav>

    <article class="prose">
      <section id="install">
        <h1>Install Anthology</h1>
        <p>Start with the core bundle and add themes only when needed.</p>
      </section>
    </article>
  </div>
</main>
```

## Why it works

- `nav`, `main`, `article`, and `section` expose the page structure directly
- the sidebar primitive handles layout without utility clutter
- anchor navigation stays legible in static and generated content

## AI-readable notes

- use clear anchor labels
- keep the main article as the canonical content region
- prefer section headings over anonymous wrappers
