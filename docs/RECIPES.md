# Conservatory to Symphony Recipes

Conservatory finds structural and UX issues on rendered pages. Symphony Anthology turns those findings into repeatable implementation patterns.

These recipes only use features that ship today in Anthology v1.

## 1. Weak heading hierarchy

### Finding

Sections are visually separated, but the HTML does not communicate a clear outline.

### Replace this

```html
<div>
  <div>Pricing</div>
  <div>Choose the plan that fits your team.</div>
</div>
```

### With this

```html
<section>
  <header class="stack" data-gap="sm">
    <h2>Pricing</h2>
    <p>Choose the plan that fits your team.</p>
  </header>
</section>
```

### Why it works

- `section` and `header` create meaningful document structure
- a real heading improves scanability and accessibility
- `.stack` keeps spacing predictable without utility soup

## 2. Low CTA clarity

### Finding

Primary and secondary actions look equally important, so the page has no obvious next step.

### Replace this

```html
<div>
  <button>Start free</button>
  <button>Talk to sales</button>
</div>
```

### With this

```html
<div class="cluster" data-gap="sm">
  <button data-variant="primary">Start free</button>
  <button data-variant="outline">Talk to sales</button>
</div>
```

### Why it works

- `data-variant="primary"` creates a clear visual priority
- `.cluster` keeps actions aligned and wraps cleanly on smaller screens
- the markup stays simple and legible for generators

## 3. Hard-to-scan card layouts

### Finding

A list of offers or features is rendered as repeated generic blocks with no semantic framing.

### Replace this

```html
<div class="grid" data-columns="3">
  <div>
    <div>Starter</div>
    <div>For small teams</div>
    <div>$19</div>
  </div>
</div>
```

### With this

```html
<div class="grid" data-columns="3" data-gap="lg">
  <article class="card" data-elevation="raised">
    <header>
      <h3>Starter</h3>
      <p>For small teams</p>
    </header>

    <p><strong>$19</strong> per month</p>

    <footer>
      <button data-variant="primary">Choose Starter</button>
    </footer>
  </article>
</div>
```

### Why it works

- `.grid` provides a stable responsive layout
- `.card` gives the content a consistent surface
- semantic `header` and `footer` make each unit easier to interpret

## 4. Form accessibility friction

### Finding

Inputs rely on placeholders or detached labels, making forms harder to understand and audit.

### Replace this

```html
<form>
  <input type="email" placeholder="Email">
  <textarea placeholder="Message"></textarea>
  <button>Send</button>
</form>
```

### With this

```html
<form class="stack" data-gap="md">
  <label>
    Email address
    <input type="email" name="email" autocomplete="email">
  </label>

  <label>
    Message
    <textarea name="message"></textarea>
  </label>

  <div class="cluster" data-gap="sm">
    <button type="submit" data-variant="primary">Send message</button>
    <button type="reset" data-variant="ghost">Reset</button>
  </div>
</form>
```

### Why it works

- native labels remove ambiguity
- form controls use Anthology defaults without extra classes
- grouped actions stay readable and accessible

## 5. Dense long-form content

### Finding

Pages with editorial or documentation copy become hard to read because line length and spacing are uncontrolled.

### Replace this

```html
<main>
  <article>
    <h1>Release notes</h1>
    <p>Long block of content...</p>
  </article>
</main>
```

### With this

```html
<main class="container" data-size="prose">
  <article class="prose">
    <h1>Release notes</h1>
    <p>Long block of content...</p>
  </article>
</main>
```

### Why it works

- `data-size="prose"` narrows the reading measure
- `.prose` improves long-form readability
- the pattern works well for docs, changelogs, and AI-generated editorial content

## How to use these recipes

1. Start from the Conservatory finding.
2. Pick the smallest Anthology pattern that solves the issue.
3. Keep semantic HTML as the baseline.
4. Add `data-*` or primitives only where intent or structure truly needs them.

For the higher-level AI workflow, see [AI_INTEGRATION.md](./AI_INTEGRATION.md).
