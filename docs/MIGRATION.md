# Migration Guide: Legacy Snapshots to 0.1.0

Symphony Anthology 0.1.0 freezes the public contract around semantic HTML, modern primitives, and `data-*` variants.

## Biggest change

The main bundles no longer carry legacy `.symphony-*` aliases by default.

If you need time to migrate, load the compatibility bundle:

```css
@import '@symphonyui/symphony-anthology/symphony.core.css';
@import '@symphonyui/symphony-anthology/compat';
```

## Recommended migration order

1. Replace layout aliases with modern primitives.
2. Replace legacy component modifiers with `data-*`.
3. Remove `compat` when no `.symphony-*` selectors remain.

## Mapping examples

| Older usage | 0.1.0 usage |
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

- The 0.1.0 core intentionally favors semantic patterns over large alias surfaces.
- Use `compat` only as a transition aid.
- Re-test pages with [testing/index.html](../testing/index.html) before removing `compat`.
