# Migration Guide: v0.x to v1

Symphony v1 freezes the public contract around semantic HTML, modern primitives, and `data-*` variants.

## Biggest change

The main bundles no longer carry legacy `.symphony-*` aliases by default.

If you need time to migrate, load the compatibility bundle:

```css
@import '@symphonyui/symphonycss/symphony.core.css';
@import '@symphonyui/symphonycss/compat';
```

## Recommended migration order

1. Replace layout aliases with modern primitives.
2. Replace legacy component modifiers with `data-*`.
3. Remove `compat` when no `.symphony-*` selectors remain.

## Mapping examples

| Older usage | v1 usage |
| --- | --- |
| `.symphony-container` | `.container` |
| `.symphony-grid` | `.grid` |
| `.symphony-flex` | `.flex` or `.cluster` / `.stack` |
| `.symphony-button--primary` | `data-variant="primary"` |
| `.symphony-button--sm` | `data-size="sm"` |
| `.symphony-card--elevated` | `.card[data-elevation="raised"]` |

## Example

Before:

```html
<div class="symphony-container">
  <div class="symphony-flex symphony-flex--justify-between symphony-flex--align-center">
    <button class="symphony-button symphony-button--primary symphony-button--sm">
      Save
    </button>
  </div>
</div>
```

After:

```html
<div class="container">
  <div class="cluster" data-justify="between" data-align="center">
    <button data-variant="primary" data-size="sm">Save</button>
  </div>
</div>
```

## Notes

- The v1 core intentionally favors semantic patterns over large alias surfaces.
- Use `compat` only as a transition aid.
- Re-test pages with [testing/index.html](../testing/index.html) before removing `compat`.
