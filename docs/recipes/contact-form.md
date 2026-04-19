# Contact Form

Use this for contact pages, support requests, demos, and lead capture with more context than a waitlist form.

## Problem

Contact forms often become a stack of loose inputs with weak grouping, unclear action hierarchy, and no semantic structure around the request.

## Use when

- you need 3 or more fields
- the form captures user intent or request type
- you want a pattern that scales beyond a single email field

## Pattern

```html
<section class="container" data-size="prose">
  <header class="stack" data-gap="sm">
    <h2>Contact the team</h2>
    <p>Tell us what you are building and how Anthology could help.</p>
  </header>

  <form class="stack" data-gap="md">
    <label>
      Name
      <input type="text" name="name" autocomplete="name">
    </label>

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
      <button type="reset" data-variant="ghost">Reset form</button>
    </div>
  </form>
</section>
```

## Why it works

- native labels reduce ambiguity
- grouped actions separate primary and secondary intent
- the form remains semantic and easy to audit

## AI-readable notes

- use human-readable field names
- keep help text close to the form header or the field it explains
- preserve one primary action
