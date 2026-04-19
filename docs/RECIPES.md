# Symphony Anthology Recipe Library

Symphony Anthology recipes turn real interface problems into repeatable implementation patterns.

They are not just UI components in isolation. Each recipe is a practical pattern with:

- the problem it solves
- semantic HTML first
- `data-*` guidance when variants help
- accessibility notes
- AI-readable implementation hints

These recipes only use features that ship today in Anthology 0.1.0.

## Launch set

### Core sections

- [Hero + CTA](./recipes/hero-cta.md)
- [Feature grid](./recipes/feature-grid.md)
- [Pricing section](./recipes/pricing-section.md)
- [Card collection](./recipes/card-collection.md)

### Forms and interaction

- [Signup / waitlist form](./recipes/signup-waitlist-form.md)
- [Contact form](./recipes/contact-form.md)
- [Accordion / disclosure](./recipes/accordion-disclosure.md)

### Content and product surfaces

- [Docs sidebar layout](./recipes/docs-sidebar-layout.md)
- [Article / prose page](./recipes/article-prose-page.md)
- [Dashboard summary](./recipes/dashboard-summary.md)
- [Search results / resource list](./recipes/search-results-resource-list.md)

### Conservatory mapping

- [Conservatory finding -> Anthology fix](./recipes/conservatory-finding-to-fix.md)

## Recommended implementation order

1. [Hero + CTA](./recipes/hero-cta.md)
2. [Signup / waitlist form](./recipes/signup-waitlist-form.md)
3. [Accordion / disclosure](./recipes/accordion-disclosure.md)
4. [Card collection](./recipes/card-collection.md)
5. [Feature grid](./recipes/feature-grid.md)
6. [Conservatory finding -> Anthology fix](./recipes/conservatory-finding-to-fix.md)

## What a recipe is

A recipe is broader than a component.

- A component is a piece of UI like an accordion or card.
- A recipe is the implementation pattern around that piece: semantic structure, layout, variants, accessibility, and where it fits in a real page.

That makes recipes more useful for:

- teams adopting Anthology quickly
- AI generators that need a predictable contract
- Conservatory follow-up flows
- examples, tutorials, demos, and launch content

## How to use this library

1. Start from the page or product problem you need to solve.
2. Pick the smallest recipe that fits.
3. Keep semantic HTML as the baseline.
4. Add `data-*` or primitives only where intent or layout truly needs them.
5. Reuse the same recipe in docs, demos, and product implementations so the public contract stays stable.

## Related docs

- [AI integration guide](./AI_INTEGRATION.md)
- [Metadata contract](./METADATA.md)
- [Documentation index](./index.html)
