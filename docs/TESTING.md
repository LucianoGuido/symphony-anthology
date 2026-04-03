# Browser Smoke Guide

Use [`testing/index.html`](../testing/index.html) as the manual smoke harness before a release.

## Browsers

- Chrome latest
- Firefox latest
- Safari latest

## Viewports

- Desktop around `1440px`
- Tablet around `768px`
- Mobile around `390px`

## What to verify

### Themes

- Light theme toggles correctly
- Dark theme toggles correctly
- Text contrast remains readable in both themes

### Navigation

- Brand icon and wordmark stay on one line
- Brand link never receives the active navigation pill
- Nav links wrap or stack cleanly on narrow widths

### Buttons and hierarchy

- Primary, outline, ghost, and default buttons keep clear hierarchy
- Focus rings stay visible when tabbing

### Layout reflow

- Grid cards reflow without overlap or clipped content
- Spacing and padding remain consistent while resizing

### Forms

- Inputs, selects, and textareas keep visible borders
- Focus states remain visible in both themes
- Checkbox and switch controls stay aligned with labels

### Dialog and disclosure

- `details` opens and closes cleanly
- `dialog` opens, closes, and renders backdrop correctly
- Footer actions keep spacing and hierarchy

### Tables

- Header and body cells stay aligned
- Borders and spacing remain consistent

## Release rule

Do not ship a public release if one of the above regresses in Chrome, Firefox, or Safari.
