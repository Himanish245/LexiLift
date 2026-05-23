# Front Page Redesign Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Redesign the LexiLift landing page to match the provided screenshot design, driven by Sanity CMS schema data with built-in editorial fallbacks.

**Architecture:** We will modify the existing site components (`Navbar`, `Footer`, `HeroSection`, `FeaturesGrid`, `CTASection`) to match the style and layout from the screenshot. Each component will accept props from the Sanity fetch, falling back to the screenshot's specific content and layout structure when props are missing or empty. We will use the theme colors and Literata (serif) / Plus Jakarta Sans (sans) fonts defined in `app/globals.css`.

**Tech Stack:** Next.js 16.2 (App Router), React 19, Tailwind CSS v4, Framer Motion.

---

### Task 1: Update Navbar Component

**Files:**
- Modify: `components/layout/Navbar.tsx`

**Step 1: Write implementation**
Modify `components/layout/Navbar.tsx` to:
- Use clean text-based `LexiLift` logo in font-serif green style.
- Render nav links: Platform, Resources, Pricing, Company. Platform has an active state showing a solid bottom underline.
- Render a text-only "Login" link on the right.
- Render a dark green pill "Get Started" button on the right.
- Ensure fallback links and styling match the screenshot.

**Step 2: Commit**
```bash
git add components/layout/Navbar.tsx
git commit -m "feat: update Navbar to match screenshot layout and design"
```

---

### Task 2: Update HeroSection Component

**Files:**
- Modify: `components/home/HeroSection.tsx`

**Step 1: Write implementation**
Modify `components/home/HeroSection.tsx` to:
- Render a left column containing:
  - "Intelligent Knowledge Hub" tagline pill badge.
  - Left-aligned title: "Transform Your Team's Knowledge into Shared Wisdom." (using `font-serif`).
  - Left-aligned paragraph: "The human-centric AI that turns scattered documentation into a living digital sanctuary for your organization's collective intelligence."
  - Two pill buttons: Solid green "Start Free Trial" and outlined "Watch Story" (with a play SVG icon).
- Render a right column containing:
  - An olive-green background container frame.
  - Placed inside the frame, the team meeting image (`/team_meeting.png`).
  - An overlapping white floating card at the bottom-left of the image containing a sparkle icon, the text "Insight Generated", and the quote: "The project history indicates a strong preference for iterative design..."
- Support Sanity dynamic props for tagline, title, subtitle, and primary/secondary CTAs, falling back to the above text values.

**Step 2: Commit**
```bash
git add components/home/HeroSection.tsx
git commit -m "feat: update HeroSection with two-column layout and overlapping insight card"
```

---

### Task 3: Update LogoMarquee to Trusted Logos Section

**Files:**
- Modify: `components/home/LogoMarquee.tsx`

**Step 1: Write implementation**
Modify `components/home/LogoMarquee.tsx` to:
- Render a clean, non-scrolling, static layout containing "TRUSTED BY VISIONARY TEAMS AT" in muted uppercase text.
- Render 5 equally spaced neutral gray rounded rectangles as logo placeholders.
- Maintain responsive alignment.

**Step 2: Commit**
```bash
git add components/home/LogoMarquee.tsx
git commit -m "feat: update LogoMarquee to static trusted logos row"
```

---

### Task 4: Update FeaturesGrid Component

**Files:**
- Modify: `components/home/FeaturesGrid.tsx`

**Step 1: Write implementation**
Modify `components/home/FeaturesGrid.tsx` to:
- Render centered header "Cultivating Clarity" (in `font-serif`) and paragraph.
- Implement a custom 4-card grid:
  - Card 1 (Wide): Spans 2 columns on desktop. Has an icon badge, title "1. Seamless Collection", description, and a loaded document mockup graphic on the right.
  - Card 2 (Narrow): Spans 1 column. Has a badge, title "2. Contextual Synthesis", description.
  - Card 3 (Narrow): Spans 1 column. Has a badge, title "3. Natural Inquiry", description.
  - Card 4 (Wide): Spans 2 columns. Deep green background (`bg-primary`), white text. Has an icon badge, title "4. Shared Evolution", description, and a white pill button "Explore Collaborative Hub" on the right.
- Ensure fallback data matches the screenshot copy exactly.

**Step 2: Commit**
```bash
git add components/home/FeaturesGrid.tsx
git commit -m "feat: update FeaturesGrid to custom asymmetric layout with mockups"
```

---

### Task 5: Update CTASection Component

**Files:**
- Modify: `components/home/CTASection.tsx`

**Step 1: Write implementation**
Modify `components/home/CTASection.tsx` to:
- Render a large rounded container with a soft cream-to-orange gradient fading in the top right.
- Title: "Ready to cultivate your team's wisdom?" (in `font-serif`).
- Subtitle: "Join over 500+ forward-thinking teams using LexiLift to transform their digital environment into a sanctuary for thought."
- Buttons: Solid green pill "Get Started for Free" and white pill "Book a Demo".
- Subtext: "No credit card required. 14-day free trial."
- Support Sanity custom props, falling back to these values.

**Step 2: Commit**
```bash
git add components/home/CTASection.tsx
git commit -m "feat: update CTASection with gradient card and pill buttons"
```

---

### Task 6: Update Footer Component

**Files:**
- Modify: `components/layout/Footer.tsx`

**Step 1: Write implementation**
Modify `components/layout/Footer.tsx` to:
- Render left section: "LexiLift" text logo, copyright "© 2024 LexiLift AI. Cultivating clarity through thought.", and two circular social/share icons.
- Render right section with 3 distinct columns:
  - Product: Product, Guides, Pricing
  - Company: Community, About, Blog
  - Legal: Privacy, Terms
- Keep layout clean and styled in warm cream-neutral tones.

**Step 2: Commit**
```bash
git add components/layout/Footer.tsx
git commit -m "feat: update Footer design and columns structure"
```

---

### Task 7: Run Next.js Build Verification

**Files:**
- None

**Step 1: Verify build**
Run the production build:
`npm run build`
Expected: The app compiles successfully with zero TypeScript or webpack build errors.

**Step 2: Commit**
```bash
git add docs/plans/task.md
git commit -m "chore: complete front page redesign implementation"
```
