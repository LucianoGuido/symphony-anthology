const fixGuides = {
  'main-landmark-missing': {
    summary: 'Wrap the primary page content in one <main> landmark.',
    guidance: [
      'Keep the global header and footer outside the main landmark.',
      'Use one clear <main> region per document unless the page is an embedded fragment.',
    ],
    example: `<main class="container">
  <article class="stack" data-gap="lg">
    <h1>Page title</h1>
    <p>Primary document content.</p>
  </article>
</main>`,
    relevantRecipes: ['hero-cta', 'article-prose-page', 'docs-sidebar-layout'],
  },
  'nav-label-missing': {
    summary: 'Give repeated navigation landmarks an accessible label.',
    guidance: [
      'If a page has more than one <nav>, label each one with aria-label or aria-labelledby.',
      'Keep the label specific to the navigation purpose, such as Primary, Docs, or Footer.',
    ],
    example: `<nav aria-label="Docs navigation">
  <ul>
    <li><a href="#intro">Introduction</a></li>
  </ul>
</nav>`,
    relevantRecipes: ['docs-sidebar-layout'],
  },
  'section-heading-missing': {
    summary: 'Add a heading or accessible label to every sectioning container.',
    guidance: [
      'Prefer a visible heading because it improves both scanability and machine interpretation.',
      'If a visible heading is not appropriate, add aria-label or aria-labelledby.',
    ],
    example: `<section class="stack" data-gap="sm">
  <header>
    <h2>Pricing</h2>
    <p>Choose the plan that fits your team.</p>
  </header>
</section>`,
    relevantRecipes: ['hero-cta', 'feature-grid', 'article-prose-page', 'conservatory-finding-to-fix'],
  },
  'form-control-unlabeled': {
    summary: 'Associate each form control with a visible label or aria-label.',
    guidance: [
      'Use a native <label for> relationship whenever possible.',
      'Reserve aria-label for cases where no visible label fits the UI.',
    ],
    example: `<div class="stack" data-gap="xs">
  <label for="email">Work email</label>
  <input id="email" name="email" type="email" autocomplete="email">
</div>`,
    relevantRecipes: ['signup-waitlist-form', 'contact-form'],
  },
  'button-type-missing': {
    summary: 'Declare an explicit type for buttons inside forms.',
    guidance: [
      'Use type="submit" for the primary form action.',
      'Use type="button" for secondary actions that should not submit the form.',
    ],
    example: `<div class="cluster" data-gap="sm">
  <button type="submit" data-variant="primary">Join waitlist</button>
  <button type="button" data-variant="outline">Learn more</button>
</div>`,
    relevantRecipes: ['signup-waitlist-form', 'contact-form'],
  },
  'image-alt-missing': {
    summary: 'Add an alt attribute to every image.',
    guidance: [
      'Use descriptive alt text for meaningful images.',
      'Use alt="" for purely decorative images so assistive tech can skip them.',
    ],
    example: `<img src="/team.jpg" alt="The Symphony team reviewing product analytics dashboards">`,
    relevantRecipes: ['card-collection', 'feature-grid'],
  },
  'details-summary-missing': {
    summary: 'Every <details> disclosure needs a <summary> trigger.',
    guidance: [
      'Use the summary as the visible question or label.',
      'Keep summary text short and concrete.',
    ],
    example: `<details>
  <summary>What ships in Anthology today?</summary>
  <p>Semantic defaults, layout primitives, data attributes, and AI-ready metadata.</p>
</details>`,
    relevantRecipes: ['accordion-disclosure'],
  },
  'heading-level-skip': {
    summary: 'Keep heading levels sequential so document structure stays readable.',
    guidance: [
      'Do not jump from h1 to h3 or h2 to h4 unless an intermediate heading exists.',
      'When in doubt, fix the surrounding section structure instead of styling a lower heading level.',
    ],
    example: `<section class="stack" data-gap="sm">
  <h2>Documentation</h2>
  <h3>Installation</h3>
  <p>Start with the core bundle.</p>
</section>`,
    relevantRecipes: ['article-prose-page', 'docs-sidebar-layout', 'conservatory-finding-to-fix'],
  },
  'action-group-no-primary': {
    summary: 'Multi-action groups should expose one dominant primary action.',
    guidance: [
      'Use data-variant="primary" for the default next step.',
      'Keep secondary actions visually supportive, not equally weighted.',
    ],
    example: `<div class="cluster" data-gap="sm">
  <a href="/docs" class="button" data-variant="primary">Read the docs</a>
  <a href="/demo" class="button" data-variant="outline">See the demo</a>
</div>`,
    relevantRecipes: ['hero-cta', 'pricing-section', 'conservatory-finding-to-fix'],
  },
};

export const supportedFindingCodes = Object.keys(fixGuides).sort();

export function getFixGuide(findingCode) {
  return fixGuides[findingCode] ?? {
    summary: 'Use the closest shipped Anthology pattern instead of inventing a one-off fix.',
    guidance: [
      'Look for semantic structure first.',
      'Prefer a documented recipe when the issue repeats across screens.',
    ],
    example: `<section class="stack" data-gap="sm">
  <header>
    <h2>Section title</h2>
    <p>Clear supporting copy.</p>
  </header>
</section>`,
    relevantRecipes: ['conservatory-finding-to-fix'],
  };
}
