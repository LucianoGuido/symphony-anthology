# Accordion / Disclosure

Use this for FAQs, product detail toggles, and dense secondary information.

## Problem

Teams often reimplement disclosure UI with custom wrappers and JavaScript when native HTML already communicates the behavior clearly.

## Use when

- you need collapsible secondary content
- you want a semantic FAQ or settings page
- you want a stable baseline before adding richer interaction

## Pattern

```html
<section class="container" data-size="prose">
  <header>
    <h2>Frequently asked questions</h2>
  </header>

  <div class="stack" data-gap="sm">
    <details>
      <summary>Does Anthology require custom components?</summary>
      <p>No. Anthology starts with semantic HTML and only adds structure where it helps.</p>
    </details>

    <details>
      <summary>Does it ship metadata for AI workflows?</summary>
      <p>Yes. Tokens, schema, and presets ship as public machine-readable artifacts.</p>
    </details>
  </div>
</section>
```

## Why it works

- `details` and `summary` already describe disclosure behavior
- the pattern works without mandatory JavaScript
- the content remains searchable and structurally clear

## AI-readable notes

- make each summary a real question or topic label
- keep answers self-contained
- avoid hiding essential primary content inside collapsed sections
