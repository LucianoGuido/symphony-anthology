# Hero + CTA

Use this for landing pages, product intros, and any first-screen section that needs a clear next step.

## Problem

Pages often open with generic containers and equally weighted actions, so the message is readable but directionless.

## Use when

- you need a homepage hero
- you need a product section with one primary next action
- you want clear AI-readable page intent near the top of the document

## Pattern

```html
<section class="container" data-size="prose">
  <header>
    <p>Semantic and AI-first CSS framework</p>
    <h1>Give semantic HTML a real default shape for the AI era.</h1>
    <p>
      Start with meaningful structure. Add data attributes when intent matters.
      Reach for layout primitives only when composition gets denser.
    </p>
  </header>

  <div class="cluster" data-gap="sm">
    <a href="/docs" class="button" data-variant="primary">Read the docs</a>
    <a href="/demo" class="button" data-variant="outline">See the demo</a>
  </div>
</section>
```

## Why it works

- a real heading gives the page a strong semantic anchor
- supporting copy stays close to the headline
- primary and secondary actions are clearly separated

## AI-readable notes

- use one dominant intent in the hero
- avoid CTA labels that compete with each other
- keep the first heading descriptive, not decorative
