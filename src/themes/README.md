# Symphony Themes

This directory contains optional theme packages that extend Symphony's core styles.

## Available Themes

### 🎨 Anthology (v1.0)

Minimalist design system inspired by modern design languages like Cohere.

**Features:**
- Generous whitespace and breathing room
- Soft geometry (pill-shaped buttons, rounded corners)
- Subtle shadows and borders
- Relaxed typography with excellent readability
- Natural and synthetic color palette

**Usage:**
```html
<!-- Load core first -->
<link rel="stylesheet" href="symphony.css">
<!-- Then load theme -->
<link rel="stylesheet" href="themes/anthology/theme.css">

<!-- Apply theme -->
<html data-theme="anthology">
```

**Files:**
- `_tokens.css` - Design token overrides
- `_components.css` - Component style modifications
- `theme.css` - Bundle entry point

## Creating Custom Themes

1. Create a new directory: `src/themes/your-theme/`
2. Add `_tokens.css` with your design tokens
3. Add `_components.css` with component overrides
4. Create `theme.css` as the entry point

### Theme Token Structure

```css
@layer symphony.themes {
  [data-theme="your-theme"] {
    /* Override Symphony tokens */
    --symphony-primary: #your-color;
    --symphony-radius-md: 0.5rem;
    
    /* Add theme-specific tokens */
    --your-theme-custom: value;
  }
}
```

## Roadmap

### v1.1 (Q1 2026)
- [ ] Brutalist Theme (Bold, typography-first)
- [ ] Glassmorphic Theme (Frosted glass effects)

### v1.2 (Q2 2026)
- [ ] Neubrutalism Theme (Colorful, playful)
- [ ] Corporate Theme (Professional, enterprise)

### Community Themes
- [ ] Cyberpunk
- [ ] Pastel
- [ ] High Contrast (Accessibility)
