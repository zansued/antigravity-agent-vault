---
name: vibe-mastery
description: "Mastery of the Monday Vibe Design System adapted for the Antigravity/Metatron aesthetic. Use this skill when building complex, enterprise-ready UI components that need to maintain a mistic, ethereal, and high-performance feel."
risk: low
source: antigravity-core
date_added: "2026-03-19"
---

# Vibe Mastery (Antigravity Edition)

Equip the Metatron Agent with the ability to weave enterprise-grade React components into the Celestial Ledger. This skill bridges the gap between structured business UI (Monday.com Vibe) and mistic, weightless interfaces.

## When to Use

- When building new panels for the Metatron Portal.
- When creating "Wisdom Popups" or guided rituals (using `Tipseen`).
- When implementing data-dense views that require stability and accessibility.
- When a "Premium" and "Robust" feel is required for complex agentic workflows.

## Principles

1. **Celestial Theming**: Always wrap components in the `ThemeProvider` with the `black-app-theme` class, overriding Vibe tokens with Metatron's HSL variables (--celestial-neon, --celestial-void).
2. **Ethereal Feedback**: Use `Skeleton` with custom dimensions for loading states to simulate energy forming into data.
3. **Guilded Discovery**: Use `Tipseen` (via the `MetatronTipseen` wrapper) to provide mistic yet helpful context for complex terms.

## Usage Example

### Theming Overrides (src/index.css)
```css
.black-app-theme {
  --primary-color: #22d3ee;
  --primary-background-color: #020617;
  --icon-color: #22d3ee;
}
```

### Component Implementation
```tsx
import { Tipseen, Skeleton } from "@vibe/core";
import MetatronTipseen from "@/components/portal/MetatronTipseen";

// Use MetatronTipseen for "Magic Tooltips"
<MetatronTipseen title="Ley Lines" content="The energy flows through the code.">
  <Icon className="cursor-help" />
</MetatronTipseen>
```

## Ritual Checklist
- [ ] Install `@vibe/core` and `@vibe/icons`.
- [ ] Verify `tsconfig.app.json` has `composite: true` and `baseUrl: "."`.
- [ ] Import Vibe tokens in global CSS.
- [ ] Wrap Root in `ThemeProvider`.
- [ ] Replace standard loaders with `Skeleton` and adding `Tipseen` for guidance.
