# Conservatory Finding -> Anthology Fix

Use this when Conservatory identifies a structural or UX issue and you want a stable implementation response in Anthology.

## Problem

Audit findings are useful, but teams still need a clear path from diagnosis to shipped markup.

## Use when

- a Conservatory report flags a repeatable issue
- you want a before/after implementation pattern
- you need the same recommendation to work for humans and AI tooling

## Pattern

### Finding: weak heading hierarchy

```html
<div>
  <div>Pricing</div>
  <div>Choose the plan that fits your team.</div>
</div>
```

### Fix

```html
<section>
  <header class="stack" data-gap="sm">
    <h2>Pricing</h2>
    <p>Choose the plan that fits your team.</p>
  </header>
</section>
```

### Finding: low CTA clarity

```html
<div>
  <button>Start free</button>
  <button>Talk to sales</button>
</div>
```

### Fix

```html
<div class="cluster" data-gap="sm">
  <button data-variant="primary">Start free</button>
  <button data-variant="outline">Talk to sales</button>
</div>
```

## Why it works

- the audit finding maps to a documented Anthology pattern
- fixes stay within the shipped public contract
- teams can reuse the same response across docs, prompts, and implementation work

## AI-readable notes

- phrase findings in clear problem language
- keep the replacement small and concrete
- prefer stable documented patterns over one-off fixes
