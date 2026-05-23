# Organic Knowledge Design Migration Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Migrate the website to the "Organic Modernism" design system with soft cream tones and sage accents.

**Architecture:** We will replace the Tailwind v4 `@theme` block in `globals.css` with semantic color tokens and new typography variables. Then, we will swap the Google Fonts in `app/layout.tsx`. Finally, we will refactor the home page components (`HeroSection`, `FeaturesGrid`, `CTASection`, `HowItWorks`) to use these new semantic classes (e.g. `bg-surface`, `rounded-full`).

**Tech Stack:** Next.js, Tailwind CSS v4

---

### Task 1: Setup Fonts and Global Layout

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Write the failing test**
Run: `npm run lint` or `npm run build` to verify the project currently builds cleanly before we start breaking styles.
Expected: PASS

**Step 2: Write minimal implementation**
Update `app/layout.tsx` to remove `Inter`, `Space_Grotesk`, and `Sora`, and replace them with `Literata` and `Plus_Jakarta_Sans`. Update the `className` on the `<html>` and `<body>` tags accordingly.

**Step 3: Run test to verify it passes**
Run: `npm run build` to verify no typescript/linting errors.
Expected: PASS

**Step 4: Commit**
```bash
git add app/layout.tsx
git commit -m "style: switch fonts to Literata and Plus Jakarta Sans"
```

---

### Task 2: Define Tailwind v4 Theme Variables

**Files:**
- Modify: `app/globals.css`

**Step 1: Write the failing test**
Visually verify that the current `globals.css` has old variables like `--color-background: #020617` and `--gradient-primary`.

**Step 2: Write minimal implementation**
Replace the `@theme` block in `app/globals.css` with the "Organic Knowledge" palette:
- `surface`: `#fbf9f5`
- `primary`: `#42634f`
- Typography variables corresponding to the new Google Fonts.
- Update `body` background to use `var(--color-surface)`.

**Step 3: Run test to verify it passes**
Run: `npm run dev` and navigate to `http://localhost:3000`. The background should now be the new cream surface color.

**Step 4: Commit**
```bash
git add app/globals.css
git commit -m "style: apply organic knowledge theme tokens to globals.css"
```

---

### Task 3: Refactor Home Page Components

**Files:**
- Modify: `components/home/HeroSection.tsx` (and other home components if they exist, to be checked during execution)

**Step 1: Write the failing test**
Visually inspect `http://localhost:3000` — components will look broken because we removed `.gradient-button` and `.glass-card`.

**Step 2: Write minimal implementation**
Find and replace all instances of `.gradient-button` with `bg-primary text-on-primary rounded-full hover:opacity-90 transition-all`. Replace `.glass-card` with `bg-surface-container-low shadow-sm border border-outline-variant rounded-2xl`. Replace `.gradient-text` with `text-primary`.
(The agent executing this will need to `grep_search` and `view_file` the actual component files to do the replacements accurately).

**Step 3: Run test to verify it passes**
Run: `npm run dev` and verify the UI looks complete without neon gradients or broken layouts.

**Step 4: Commit**
```bash
git add components/home/
git commit -m "style: refactor home components to use organic semantic classes"
```
