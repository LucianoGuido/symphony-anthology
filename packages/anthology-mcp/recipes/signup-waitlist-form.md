# Signup / Waitlist Form

Use this for launch signup, early access, newsletters, and short onboarding flows.

## Problem

Short forms often rely on placeholder-only inputs, detached labels, or vague submit actions that weaken usability and audits.

## Use when

- you need one or two fields
- the page goal is subscription or waitlist signup
- you want a simple conversion pattern with good defaults

## Pattern

```html
<section class="container" data-size="prose">
  <header>
    <h2>Join the waitlist</h2>
    <p>Get release updates and early access announcements.</p>
  </header>

  <form class="stack" data-gap="md">
    <label>
      Email address
      <input type="email" name="email" autocomplete="email" required>
    </label>

    <button type="submit" data-variant="primary">Request early access</button>
  </form>
</section>
```

## Why it works

- labels make the form understandable without placeholders
- the layout stays compact without utility-heavy markup
- one clear submit action keeps intent obvious

## AI-readable notes

- keep field labels explicit
- use submit labels that describe the outcome
- do not replace labels with placeholder copy
