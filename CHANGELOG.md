# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2026-04-04

### Added
- `@symphonyui/create-symphony-anthology` local starter package for HTML, Astro, and Next
- `@symphonyui/anthology-schema` local package generated from canonical Anthology metadata
- `@symphonyui/anthology-verify` local package for semantic and AI-first HTML verification
- docs playground with live, copyable launch recipes
- release workflow and dry-run publication checks for subpackages

### Changed
- metadata generation now uses a single canonical source file
- package release documentation now covers the Anthology subpackages

## Internal Milestones Before Public Release

### 2026-04-03 build stabilization snapshot

### Fixed
- Replaced the `cat`-based build with a real source-entry pipeline that resolves relative CSS imports
- Generated the missing public artifacts: `symphony.min.css`, `symphony.core.min.css`, `symphony.compat.css`, `symphony.compat.min.css`, and theme minified outputs
- Added dist verification and tarball smoke checks so broken exports fail early

### Changed
- Froze the current public contract around semantic HTML, current primitives, and `data-*` variants
- Moved legacy `.symphony-*` aliases into an explicit compatibility bundle
- Rewrote the README, docs, examples, and manual smoke harness to reflect shipped functionality only
- Added canonical metadata sources under `metadata/` for generated JSON artifacts

### Added
- `CONTRIBUTING.md`
- `docs/MIGRATION.md`
- `docs/METADATA.md`
- `docs/RECIPES.md`
- `docs/TESTING.md`
- `testing/preview.html`
- GitHub Actions CI workflow

### 2025-11-28 architecture snapshot

### 🎉 Major Update

#### Added
- **Modern CSS Architecture**: Cascade Layers (@layer) with 7-layer system
- **OKLCH Color System**: Perceptually uniform colors with easy theming
- **Container Queries**: Components respond to container width
- **Native CSS Nesting**: Modern browser nesting with & selector
- **Data-Attribute API**: `data-variant`, `data-size`, `data-elevation` instead of BEM classes
- **New Components**:
  - Dialog (native `<dialog>` support)
  - Navigation patterns
  - Accordion (details/summary)
  - Responsive tables
- **CUBE CSS Layouts**: Stack, Cluster, Sidebar, Switcher, Center, Cover
- **AI Integration**: Documentation and JSON schema for AI code generators

#### Changed
- Replaced 12-column grid with intrinsic responsive grid (auto-fit pattern)
- Migrated to semantic-first zero-class baseline styling
- Updated all components to use data-attributes for variants
- Optimized typography scale and spacing system
- Improved dark mode with better OKLCH color transitions

#### Performance
- **Bundle Size**: 91KB minified, **16KB gzipped** ✅
- Compression ratio: 5.6:1
- Zero JavaScript required
- Lighthouse-ready performance

#### Documentation
- Added `AI_INTEGRATION.md` guide
- Created `symphony-schema.json` for AI tools
- Updated README with modern examples
- Removed outdated architecture reports

### Breaking Changes
- Grid system changed from 12-column to intrinsic responsive
- Some utility classes replaced with data-attributes
- CSS custom properties renamed to `--symphony-*` prefix

### Migration Guide
For users upgrading from v0.1.x:
- Replace `.col-*` classes with semantic grid
- Update button variants: `.btn-primary` → `<button data-variant="primary">`
- Review custom CSS that relied on old variable names

---

### Initial local prototype

- Basic component library
- 12-column grid system
- Semantic HTML styling
