# Pricing Section

Use this for plan comparison, product packaging, and clear conversion pages.

## Problem

Pricing layouts often present plan data as visually styled boxes without strong headings, comparable structure, or action hierarchy.

## Use when

- you have 2 to 4 plans
- you need a featured plan
- you want plan metadata to stay easy to scan

## Pattern

```html
<section class="container">
  <header class="stack" data-gap="sm">
    <h2>Choose the plan that fits your team</h2>
    <p>All plans use the same semantic structure so comparison stays clear.</p>
  </header>

  <div class="grid" data-columns="3" data-gap="lg">
    <article class="card" data-elevation="raised">
      <header class="stack" data-gap="xs">
        <h3>Starter</h3>
        <p>For smaller product teams.</p>
      </header>

      <p><strong>$19</strong> per month</p>

      <ul>
        <li>Semantic baseline</li>
        <li>Core primitives</li>
        <li>Email support</li>
      </ul>

      <footer>
        <button data-variant="primary">Choose Starter</button>
      </footer>
    </article>
  </div>
</section>
```

## Why it works

- each plan is a semantic `article`
- headings and lists make plans comparable
- the primary action can be emphasized without changing the underlying markup model

## AI-readable notes

- keep price, plan name, and key limits close together
- avoid hiding core plan differences in decorative badges alone
- keep one primary CTA per plan card
