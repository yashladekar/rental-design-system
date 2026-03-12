# Next.js MUI Design System Architecture

## Overview

This project implements a "Shadcn-like" custom design system for a Next.js App Router application strictly using **Material UI (MUI) Core** (`@mui/material`).

It intentionally avoids Tailwind CSS and `@mui/base`, relying instead on a hybrid approach of **Global Theme Overrides** and **API-Restricting Wrapper Components**. The goal is to strip away the default "Google Material" aesthetic to achieve a flat, modern, highly-customized UI while maintaining MUI's robust accessibility and complex component logic.

---

## The 3-Pillar Architecture

### Pillar 1: Global Theme Overrides (The Brain)

Instead of styling individual components with the `sx` prop or custom CSS, the visual identity is dictated by MUI's `createTheme` engine.

- **Location:** `src/theme/index.ts`
- **Purpose:** \* Define exact brand tokens (colors, typography, spacing, border radii).
  - Globally strip Material defaults (e.g., `disableRipple: true` on `MuiButtonBase`, `elevation: 0` on `MuiPaper`).
  - Inject custom design system variants directly into the theme (e.g., adding a `destructive` variant to `MuiButton`).
- **Next.js Integration:** Injected via `AppRouterCacheProvider` in `src/app/layout.tsx` for server-side Emotion CSS extraction (preventing FOUC).

### Pillar 2: API Restricting Wrappers (The Guardrails)

Developers do not import directly from `@mui/material`. Instead, they import strictly from the local `src/components/ui/` directory.

- **Location:** `src/components/ui/*` (e.g., `button.tsx`, `input.tsx`, `card.tsx`)
- **Purpose:**
  - **Restrict API:** Omit standard MUI props (like `color="secondary"`) and force developers to use only approved design system variants (e.g., `variant="destructive"`).
  - **Simplify Imports:** Act as a single source of truth for UI elements.
  - **Keep Code Clean:** These files remain remarkably thin because the actual CSS logic is handled by Pillar 1 (The Theme). They exist primarily for TypeScript interfaces and prop-mapping.

### Pillar 3: Utility Integration (`clsx`)

To allow seamless integration of standard CSS classes alongside MUI's generated classes, a utility function is utilized within the wrapper components.

- **Location:** `src/lib/utils.ts`
- **Implementation:** `export function cn(...inputs: ClassValue[]) { return clsx(inputs); }`
- **Purpose:** Allows developers to pass a standard `className` (e.g., `className="custom-animation"`) to a `components/ui` wrapper without overwriting the underlying MUI styles.

---

## Directory Structure

```text
src/
├── app/
│   ├── layout.tsx         # Setup AppRouterCacheProvider & ThemeProvider
│   └── page.tsx           # Uses components ONLY from @/components/ui
├── components/
│   ├── ui/                # The Restricted Design System Wrappers
│   │   ├── button.tsx     # (e.g., enforces custom 'destructive' variant)
│   │   ├── card.tsx       # (e.g., composes MuiPaper and Stack)
│   │   └── input.tsx
│   └── shared/            # Business logic / layout components
├── lib/
│   └── utils.ts           # clsx utility (cn function)
├── theme/
│   └── index.ts           # The Global createTheme configuration
└── types/
    └── mui.d.ts           # TypeScript module augmentations for custom variants
```
