# Organic Knowledge Design Migration

## Objective
Migrate the LexiLift website from its current dark mode, neon-aesthetic to the "Organic Modernism" design system as defined in `DESIGN.md`. The focus is on a "digital sanctuary" aesthetic using light, warm cream tones (Sage, Terracotta, Stone) and soft pill shapes.

## Architecture & Implementation Strategy

### Phase 1: Global Configuration Setup
- **Typography Integration:** Update `app/layout.tsx` to replace `Inter`, `Space_Grotesk`, and `Sora` with `Literata` (headings) and `Plus_Jakarta_Sans` (body).
- **Tailwind Theme Overhaul (`globals.css`):**
  - Overwrite the existing `@theme` block with Semantic Tokens mapping to the specific hex codes from `DESIGN.md`.
  - Introduce variables like `--color-surface`, `--color-primary`, `--color-secondary`.
  - Apply the new Typography Scale (`headline-xl`, `body-md`, `label-md`).
  - Introduce new spacing (`stack-sm`, `stack-lg`) and border-radius tokens (`md`, `lg`, `xl`, `full`).
  - Replace existing neon animations/glows with soft, sage-tinted shadows for Level 1 and Level 2 elevation.

### Phase 2: Component Refactoring (Semantic Overhaul)
- Remove hard-coded dark mode colors (`bg-[#0f172a]`, `text-blue-500`) and custom utility classes (e.g., `.gradient-button`, `.glass-card`) from global styles.
- Go through the home page components (`HeroSection`, `FeaturesGrid`, etc.) and replace the removed utility classes with standard Tailwind classes using the new semantic variables. 
  - e.g., Buttons become `bg-primary text-on-primary rounded-full`.
  - Cards become `bg-surface-container-low shadow-sm rounded-2xl`.

### Phase 3: Layout & Spacing
- Ensure `page.tsx` and main sections adhere to the Fixed-Fluid hybrid grid (max-width `1280px`).
- Apply `48px` (`stack-lg`) vertical spacing between major sections to maintain the airy, un-cluttered aesthetic.

## Data Flow & State
There is no change to data flow. The components continue to receive props from Sanity CMS as before. The changes are strictly CSS/styling related.

## Testing & Verification
- Verify the dev server runs without CSS errors.
- Visually inspect the `HeroSection`, `FeaturesGrid`, and `HowItWorks` components to ensure pill buttons, Literata typography, and soft sage shadows are correctly rendered.
