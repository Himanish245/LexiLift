# LexiLift Marketing Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark-themed, animated marketing website for LexiLift (AI knowledge base / RAG product) with 5 pages, full Sanity CMS integration, and premium animations.

**Architecture:** Next.js 15 App Router with Server Components fetching content from Sanity v3 via GROQ queries. Pages are statically generated with ISR and on-demand revalidation. Sanity Studio is embedded at `/studio`. Animations powered by Framer Motion + GSAP. Particle network and gradient orbs rendered via tsparticles/canvas.

**Tech Stack:** Next.js 15, Sanity v3, next-sanity, Tailwind CSS v4, Framer Motion, GSAP, tsparticles, TypeScript

**Design Spec:** `docs/superpowers/specs/2026-05-21-lexilift-marketing-site-design.md`

---

## File Structure

```
lexilift/
├── app/
│   ├── layout.tsx                      # Root layout: fonts, metadata, global providers
│   ├── globals.css                     # Tailwind directives + custom CSS vars
│   ├── (site)/
│   │   ├── layout.tsx                  # Site layout: Navbar + Footer wrapper
│   │   ├── page.tsx                    # Homepage
│   │   ├── pricing/page.tsx            # Pricing page
│   │   ├── about/page.tsx              # About page
│   │   ├── contact/page.tsx            # Contact / Book a Demo
│   │   └── blog/
│   │       ├── page.tsx                # Blog list
│   │       └── [slug]/page.tsx         # Individual blog post
│   ├── studio/[[...tool]]/page.tsx     # Sanity Studio embed
│   └── api/
│       └── revalidate/route.ts         # Webhook for on-demand ISR
├── sanity/
│   ├── sanity.config.ts                # Sanity project config
│   ├── sanity.cli.ts                   # CLI config
│   ├── env.ts                          # Environment variable helpers
│   ├── schemas/
│   │   ├── index.ts                    # Schema barrel export
│   │   ├── documents/
│   │   │   ├── homePage.ts
│   │   │   ├── pricingPage.ts
│   │   │   ├── aboutPage.ts
│   │   │   ├── contactPage.ts
│   │   │   ├── blogPost.ts
│   │   │   ├── author.ts
│   │   │   ├── category.ts
│   │   │   ├── teamMember.ts
│   │   │   └── siteSettings.ts
│   │   └── objects/
│   │       ├── seo.ts
│   │       ├── link.ts
│   │       └── feature.ts
│   └── lib/
│       ├── client.ts                   # Sanity client instance
│       ├── queries.ts                  # All GROQ queries
│       ├── image.ts                    # Image URL builder
│       └── portable-text.tsx           # Portable Text renderer components
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── MobileMenu.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── LogoMarquee.tsx
│   │   ├── FeaturesGrid.tsx
│   │   ├── HowItWorks.tsx
│   │   └── CTASection.tsx
│   ├── pricing/
│   │   ├── PricingCard.tsx
│   │   ├── PricingToggle.tsx
│   │   └── FAQAccordion.tsx
│   ├── blog/
│   │   ├── BlogCard.tsx
│   │   ├── FeaturedPost.tsx
│   │   └── CategoryFilter.tsx
│   ├── about/
│   │   ├── MissionStory.tsx
│   │   ├── ValuesGrid.tsx
│   │   └── TeamGrid.tsx
│   ├── contact/
│   │   ├── ContactForm.tsx
│   │   └── CalendarEmbed.tsx
│   ├── shared/
│   │   ├── Button.tsx
│   │   ├── SectionHeader.tsx
│   │   └── AnimatedSection.tsx
│   └── animations/
│       ├── ParticleNetwork.tsx
│       └── GradientOrbs.tsx
├── lib/
│   └── utils.ts
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Task 1: Project Scaffold & Dependencies

**Files:**
- Create: `lexilift/` (entire project via `create-next-app`)
- Modify: `package.json` (add dependencies)
- Create: `tailwind.config.ts` (custom theme)
- Create: `app/globals.css` (Tailwind + custom vars)
- Create: `.env.local` (Sanity env vars)
- Create: `.gitignore` (add `.superpowers/`)

- [ ] **Step 1: Check create-next-app options**

```bash
npx -y create-next-app@latest --help
```

Review available flags for non-interactive setup.

- [ ] **Step 2: Scaffold the Next.js project**

```bash
cd /Users/himanishsalgotra/Desktop/projects
npx -y create-next-app@latest ./lexilift --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

Expected: Project created with App Router, TypeScript, Tailwind, ESLint.

- [ ] **Step 3: Install core dependencies**

```bash
cd /Users/himanishsalgotra/Desktop/projects/lexilift
npm install sanity next-sanity @sanity/image-url @sanity/vision @portabletext/react framer-motion gsap @tsparticles/react @tsparticles/slim
```

- [ ] **Step 4: Install dev dependencies**

```bash
npm install -D @sanity/eslint-config-studio
```

- [ ] **Step 5: Create environment variables file**

Create `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-21
SANITY_API_READ_TOKEN=your_read_token
SANITY_REVALIDATE_SECRET=your_revalidate_secret
```

> **Note:** The developer must create a Sanity project at sanity.io/manage and fill in the actual values. For now these are placeholders to be replaced.

- [ ] **Step 6: Configure Tailwind with custom dark theme**

Overwrite `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        foreground: "#e0e0e0",
        card: "#111118",
        border: "#1a1a2e",
        muted: "#888888",
        "muted-foreground": "#666666",
        accent: {
          purple: "#7c5cff",
          teal: "#00d4aa",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-medium": "float 8s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(20px, -15px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 7: Set up globals.css with custom variables and base styles**

Overwrite `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --gradient-primary: linear-gradient(135deg, #7c5cff, #00d4aa);
    --bg-glass: rgba(255, 255, 255, 0.03);
    --border-glass: rgba(255, 255, 255, 0.06);
  }

  body {
    @apply bg-background text-foreground antialiased;
  }

  ::selection {
    background: rgba(124, 92, 255, 0.3);
    color: #fff;
  }
}

@layer components {
  .gradient-text {
    @apply bg-clip-text text-transparent;
    background-image: var(--gradient-primary);
  }

  .gradient-button {
    background-image: var(--gradient-primary);
    @apply text-white rounded-full font-medium transition-all duration-300;
  }

  .gradient-button:hover {
    @apply opacity-90 scale-105;
    box-shadow: 0 0 30px rgba(124, 92, 255, 0.3);
  }

  .glass-card {
    background: var(--bg-glass);
    border: 1px solid var(--border-glass);
    backdrop-filter: blur(12px);
  }

  .card-hover {
    @apply transition-all duration-300;
  }

  .card-hover:hover {
    border-color: rgba(124, 92, 255, 0.3);
    box-shadow: 0 0 20px rgba(124, 92, 255, 0.1);
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

- [ ] **Step 8: Update .gitignore**

Append to `.gitignore`:

```
.superpowers/
.env.local
```

- [ ] **Step 9: Verify scaffold runs**

```bash
npm run dev
```

Expected: Dev server starts at http://localhost:3000 with no errors.

- [ ] **Step 10: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js 15 project with Tailwind v4, Sanity deps, and custom dark theme"
```

---

## Task 2: Sanity Configuration & Environment

**Files:**
- Create: `sanity/env.ts`
- Create: `sanity/sanity.config.ts`
- Create: `sanity/sanity.cli.ts`
- Create: `sanity/lib/client.ts`
- Create: `sanity/lib/image.ts`

- [ ] **Step 1: Create Sanity environment helpers**

Create `sanity/env.ts`:

```typescript
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-21";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}
```

- [ ] **Step 2: Create Sanity project config**

Create `sanity/sanity.config.ts`:

```typescript
"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./env";
import { schemas } from "./schemas";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemas,
  },
});
```

- [ ] **Step 3: Create Sanity CLI config**

Create `sanity/sanity.cli.ts`:

```typescript
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
});
```

- [ ] **Step 4: Create Sanity client**

Create `sanity/lib/client.ts`:

```typescript
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// Preview client without CDN cache
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});
```

- [ ] **Step 5: Create image URL builder**

Create `sanity/lib/image.ts`:

```typescript
import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: Image) {
  return builder.image(source);
}
```

- [ ] **Step 6: Commit**

```bash
git add sanity/
git commit -m "feat: add Sanity v3 configuration, client, and image helpers"
```

---

## Task 3: Sanity Schemas — Object Types

**Files:**
- Create: `sanity/schemas/objects/seo.ts`
- Create: `sanity/schemas/objects/link.ts`
- Create: `sanity/schemas/objects/feature.ts`

- [ ] **Step 1: Create SEO object schema**

Create `sanity/schemas/objects/seo.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      validation: (rule) => rule.max(60).warning("Keep under 60 characters"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      validation: (rule) =>
        rule.max(160).warning("Keep under 160 characters"),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
```

- [ ] **Step 2: Create link object schema**

Create `sanity/schemas/objects/link.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isExternal",
      title: "Open in new tab?",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
```

- [ ] **Step 3: Create feature object schema**

Create `sanity/schemas/objects/feature.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const feature = defineType({
  name: "feature",
  title: "Feature",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon (emoji or icon name)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
  ],
});
```

- [ ] **Step 4: Commit**

```bash
git add sanity/schemas/objects/
git commit -m "feat: add Sanity object schemas (seo, link, feature)"
```

---

## Task 4: Sanity Schemas — Document Types

**Files:**
- Create: `sanity/schemas/documents/homePage.ts`
- Create: `sanity/schemas/documents/pricingPage.ts`
- Create: `sanity/schemas/documents/aboutPage.ts`
- Create: `sanity/schemas/documents/contactPage.ts`
- Create: `sanity/schemas/documents/blogPost.ts`
- Create: `sanity/schemas/documents/author.ts`
- Create: `sanity/schemas/documents/category.ts`
- Create: `sanity/schemas/documents/teamMember.ts`
- Create: `sanity/schemas/documents/siteSettings.ts`
- Create: `sanity/schemas/index.ts`

- [ ] **Step 1: Create homePage schema**

Create `sanity/schemas/documents/homePage.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroHighlight",
      title: "Hero Highlighted Text",
      type: "string",
      description: "The gradient-colored part of the headline",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "heroCtaPrimary",
      title: "Primary CTA",
      type: "link",
    }),
    defineField({
      name: "heroCtaSecondary",
      title: "Secondary CTA",
      type: "link",
    }),
    defineField({
      name: "heroTagline",
      title: "Hero Tagline (above title)",
      type: "string",
    }),
    defineField({
      name: "trustedByLogos",
      title: "Trusted By Logos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", title: "Company Name" }),
            defineField({ name: "logo", type: "image", title: "Logo", options: { hotspot: true } }),
          ],
        },
      ],
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "feature" }],
    }),
    defineField({
      name: "featuresHeadline",
      title: "Features Section Headline",
      type: "string",
    }),
    defineField({
      name: "featuresTagline",
      title: "Features Section Tagline",
      type: "string",
    }),
    defineField({
      name: "howItWorksHeadline",
      title: "How It Works Headline",
      type: "string",
    }),
    defineField({
      name: "howItWorksSteps",
      title: "How It Works Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Step Title" }),
            defineField({ name: "description", type: "string", title: "Step Description" }),
            defineField({ name: "icon", type: "string", title: "Icon (emoji)" }),
          ],
        },
      ],
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA Section Title",
      type: "string",
    }),
    defineField({
      name: "ctaHighlight",
      title: "CTA Highlighted Text",
      type: "string",
    }),
    defineField({
      name: "ctaSubtitle",
      title: "CTA Subtitle",
      type: "string",
    }),
    defineField({
      name: "ctaButton",
      title: "CTA Button",
      type: "link",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
});
```

- [ ] **Step 2: Create pricingPage schema**

Create `sanity/schemas/documents/pricingPage.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const pricingPage = defineType({
  name: "pricingPage",
  title: "Pricing Page",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "tiers",
      title: "Pricing Tiers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", title: "Tier Name", validation: (rule) => rule.required() }),
            defineField({ name: "description", type: "string", title: "Short Description" }),
            defineField({ name: "priceMonthly", type: "string", title: "Monthly Price (display)", description: "e.g. '$49' or 'Custom'" }),
            defineField({ name: "priceYearly", type: "string", title: "Yearly Price (display)", description: "e.g. '$39' or 'Custom'" }),
            defineField({ name: "interval", type: "string", title: "Interval Label", initialValue: "/mo" }),
            defineField({ name: "features", type: "array", title: "Features List", of: [{ type: "string" }] }),
            defineField({ name: "ctaText", type: "string", title: "CTA Text" }),
            defineField({ name: "ctaLink", type: "string", title: "CTA Link" }),
            defineField({ name: "highlighted", type: "boolean", title: "Highlight this tier?", initialValue: false }),
            defineField({ name: "badge", type: "string", title: "Badge Text", description: "e.g. 'POPULAR'" }),
          ],
          preview: {
            select: { title: "name" },
          },
        },
      ],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", type: "string", title: "Question", validation: (rule) => rule.required() }),
            defineField({ name: "answer", type: "text", title: "Answer", validation: (rule) => rule.required() }),
          ],
        },
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Pricing Page" };
    },
  },
});
```

- [ ] **Step 3: Create aboutPage schema**

Create `sanity/schemas/documents/aboutPage.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "headlineHighlight", title: "Highlighted Text", type: "string" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "text", rows: 2 }),
    defineField({ name: "missionTitle", title: "Mission Title", type: "string" }),
    defineField({ name: "missionBody", title: "Mission Body", type: "text", rows: 4 }),
    defineField({ name: "storyTitle", title: "Story Title", type: "string" }),
    defineField({ name: "storyBody", title: "Story Body", type: "text", rows: 4 }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "icon", type: "string", title: "Icon (emoji)" }),
            defineField({ name: "title", type: "string", title: "Value Title" }),
            defineField({ name: "description", type: "string", title: "Description" }),
          ],
        },
      ],
    }),
    defineField({
      name: "teamMembers",
      title: "Team Members",
      type: "array",
      of: [{ type: "reference", to: [{ type: "teamMember" }] }],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
```

- [ ] **Step 4: Create contactPage schema**

Create `sanity/schemas/documents/contactPage.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({ name: "formHeading", title: "Form Section Heading", type: "string", initialValue: "Send a Message" }),
    defineField({ name: "calendarHeading", title: "Calendar Section Heading", type: "string", initialValue: "Book a Live Demo" }),
    defineField({ name: "calendarEmbedUrl", title: "Calendar Embed URL", type: "url", description: "Calendly or Cal.com scheduling link" }),
    defineField({ name: "contactEmail", title: "Contact Email", type: "string" }),
    defineField({ name: "contactPhone", title: "Contact Phone", type: "string" }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "platform", type: "string", title: "Platform" }),
            defineField({ name: "url", type: "url", title: "URL" }),
          ],
        },
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Page" };
    },
  },
});
```

- [ ] **Step 5: Create blogPost schema**

Create `sanity/schemas/documents/blogPost.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: (rule) => rule.max(200) }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
        {
          type: "object",
          name: "codeBlock",
          title: "Code Block",
          fields: [
            defineField({ name: "language", type: "string", title: "Language" }),
            defineField({ name: "code", type: "text", title: "Code" }),
          ],
        },
      ],
    }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "categories", title: "Categories", type: "array", of: [{ type: "reference", to: [{ type: "category" }] }] }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime", validation: (rule) => rule.required() }),
    defineField({ name: "featured", title: "Featured?", type: "boolean", initialValue: false }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  orderings: [
    { title: "Published Date, New", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", media: "coverImage", date: "publishedAt" },
    prepare({ title, media, date }) {
      return {
        title,
        media,
        subtitle: date ? new Date(date).toLocaleDateString() : "Draft",
      };
    },
  },
});
```

- [ ] **Step 6: Create author schema**

Create `sanity/schemas/documents/author.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 3 }),
    defineField({ name: "role", title: "Role", type: "string" }),
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
});
```

- [ ] **Step 7: Create category schema**

Create `sanity/schemas/documents/category.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
  ],
});
```

- [ ] **Step 8: Create teamMember schema**

Create `sanity/schemas/documents/teamMember.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", title: "Role", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "platform", type: "string", title: "Platform", options: { list: ["twitter", "linkedin", "github"] } }),
            defineField({ name: "url", type: "url", title: "URL" }),
          ],
        },
      ],
    }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
```

- [ ] **Step 9: Create siteSettings schema**

Create `sanity/schemas/documents/siteSettings.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Site Name", type: "string", initialValue: "LexiLift" }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "favicon", title: "Favicon", type: "image" }),
    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      of: [{ type: "link" }],
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Links",
      type: "array",
      of: [{ type: "link" }],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "platform", type: "string", title: "Platform" }),
            defineField({ name: "url", type: "url", title: "URL" }),
          ],
        },
      ],
    }),
    defineField({ name: "defaultSeo", title: "Default SEO", type: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
```

- [ ] **Step 10: Create schemas barrel export**

Create `sanity/schemas/index.ts`:

```typescript
import { homePage } from "./documents/homePage";
import { pricingPage } from "./documents/pricingPage";
import { aboutPage } from "./documents/aboutPage";
import { contactPage } from "./documents/contactPage";
import { blogPost } from "./documents/blogPost";
import { author } from "./documents/author";
import { category } from "./documents/category";
import { teamMember } from "./documents/teamMember";
import { siteSettings } from "./documents/siteSettings";
import { seo } from "./objects/seo";
import { link } from "./objects/link";
import { feature } from "./objects/feature";

export const schemas = [
  // Documents
  homePage,
  pricingPage,
  aboutPage,
  contactPage,
  blogPost,
  author,
  category,
  teamMember,
  siteSettings,
  // Objects
  seo,
  link,
  feature,
];
```

- [ ] **Step 11: Commit**

```bash
git add sanity/schemas/
git commit -m "feat: add all Sanity document and object schemas"
```

---

## Task 5: Sanity GROQ Queries & Portable Text

**Files:**
- Create: `sanity/lib/queries.ts`
- Create: `sanity/lib/portable-text.tsx`

- [ ] **Step 1: Create all GROQ queries**

Create `sanity/lib/queries.ts`:

```typescript
import { groq } from "next-sanity";

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    logo,
    favicon,
    navLinks[] { label, href, isExternal },
    footerLinks[] { label, href, isExternal },
    socialLinks[] { platform, url },
    defaultSeo { metaTitle, metaDescription, ogImage }
  }
`;

// Home Page
export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroTitle,
    heroHighlight,
    heroSubtitle,
    heroTagline,
    heroCtaPrimary { label, href, isExternal },
    heroCtaSecondary { label, href, isExternal },
    trustedByLogos[] { name, logo },
    featuresHeadline,
    featuresTagline,
    features[] { icon, title, description },
    howItWorksHeadline,
    howItWorksSteps[] { title, description, icon },
    ctaTitle,
    ctaHighlight,
    ctaSubtitle,
    ctaButton { label, href, isExternal },
    seo { metaTitle, metaDescription, ogImage }
  }
`;

// Pricing Page
export const pricingPageQuery = groq`
  *[_type == "pricingPage"][0] {
    headline,
    subtitle,
    tiers[] {
      name,
      description,
      priceMonthly,
      priceYearly,
      interval,
      features,
      ctaText,
      ctaLink,
      highlighted,
      badge
    },
    faqs[] { question, answer },
    seo { metaTitle, metaDescription, ogImage }
  }
`;

// About Page
export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    headline,
    headlineHighlight,
    subtitle,
    missionTitle,
    missionBody,
    storyTitle,
    storyBody,
    values[] { icon, title, description },
    teamMembers[]-> {
      _id,
      name,
      role,
      image,
      bio,
      socialLinks[] { platform, url }
    },
    seo { metaTitle, metaDescription, ogImage }
  }
`;

// Contact Page
export const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    headline,
    subtitle,
    formHeading,
    calendarHeading,
    calendarEmbedUrl,
    contactEmail,
    contactPhone,
    socialLinks[] { platform, url },
    seo { metaTitle, metaDescription, ogImage }
  }
`;

// Blog List
export const blogListQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    featured,
    author-> { name, image },
    categories[]-> { title, slug }
  }
`;

// Blog Post by Slug
export const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    body,
    publishedAt,
    author-> { name, image, bio, role },
    categories[]-> { title, slug },
    seo { metaTitle, metaDescription, ogImage }
  }
`;

// All blog slugs for generateStaticParams
export const blogSlugsQuery = groq`
  *[_type == "blogPost" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// Categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`;
```

- [ ] **Step 2: Create Portable Text renderer**

Create `sanity/lib/portable-text.tsx`:

```typescript
"use client";

import { PortableText as PortableTextComponent } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "./image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8 rounded-xl overflow-hidden">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || "Blog image"}
            width={800}
            height={450}
            className="w-full h-auto"
          />
          {value.caption && (
            <figcaption className="text-sm text-muted-foreground mt-2 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    codeBlock: ({ value }) => (
      <pre className="bg-card border border-border rounded-xl p-4 my-6 overflow-x-auto">
        <code className="text-sm text-accent-teal font-mono">
          {value.code}
        </code>
      </pre>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-foreground/80 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent-purple pl-4 my-6 text-muted italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-accent-purple hover:text-accent-teal transition-colors underline"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="bg-card px-1.5 py-0.5 rounded text-sm text-accent-teal font-mono">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-1 mb-4 text-foreground/80">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-1 mb-4 text-foreground/80">{children}</ol>
    ),
  },
};

interface PortableTextProps {
  value: any;
}

export function PortableText({ value }: PortableTextProps) {
  return <PortableTextComponent value={value} components={components} />;
}
```

- [ ] **Step 3: Commit**

```bash
git add sanity/lib/
git commit -m "feat: add GROQ queries and Portable Text renderer"
```

---

## Task 6: Sanity Studio Route & Revalidation Webhook

**Files:**
- Create: `app/studio/[[...tool]]/page.tsx`
- Create: `app/api/revalidate/route.ts`

- [ ] **Step 1: Create Sanity Studio page**

Create `app/studio/[[...tool]]/page.tsx`:

```typescript
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

- [ ] **Step 2: Create revalidation webhook route**

Create `app/api/revalidate/route.ts`:

```typescript
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { _type } = body;

    // Revalidate based on content type
    switch (_type) {
      case "homePage":
      case "siteSettings":
        revalidatePath("/", "page");
        break;
      case "pricingPage":
        revalidatePath("/pricing", "page");
        break;
      case "aboutPage":
      case "teamMember":
        revalidatePath("/about", "page");
        break;
      case "contactPage":
        revalidatePath("/contact", "page");
        break;
      case "blogPost":
      case "author":
      case "category":
        revalidatePath("/blog", "page");
        // Also revalidate individual post if slug is available
        if (body.slug?.current) {
          revalidatePath(`/blog/${body.slug.current}`, "page");
        }
        break;
      default:
        revalidatePath("/", "layout");
    }

    return NextResponse.json({ revalidated: true, type: _type });
  } catch (error) {
    return NextResponse.json(
      { message: "Error revalidating", error },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Update next.config.ts for Sanity image domains**

Modify `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 4: Commit**

```bash
git add app/studio/ app/api/ next.config.ts
git commit -m "feat: add Sanity Studio route and revalidation webhook"
```

---

## Task 7: Shared Components & Utilities

**Files:**
- Create: `lib/utils.ts`
- Create: `components/shared/Button.tsx`
- Create: `components/shared/SectionHeader.tsx`
- Create: `components/shared/AnimatedSection.tsx`

- [ ] **Step 1: Create utility functions**

Create `lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx";

// Simple class joiner (no twMerge needed for this project size)
export function cn(...inputs: (string | undefined | false | null)[]) {
  return inputs.filter(Boolean).join(" ");
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function estimateReadTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}
```

- [ ] **Step 2: Create Button component**

Create `components/shared/Button.tsx`:

```typescript
import Link from "next/link";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isExternal?: boolean;
  className?: string;
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  isExternal = false,
  className = "",
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 cursor-pointer";

  const variants = {
    primary: "gradient-button",
    secondary: "bg-card border border-border text-foreground hover:border-accent-purple/40 hover:shadow-[0_0_20px_rgba(124,92,255,0.1)]",
    outline: "border border-accent-purple/40 text-accent-purple hover:bg-accent-purple/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  const combinedClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClass}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClass}>
      {children}
    </Link>
  );
}
```

- [ ] **Step 3: Create SectionHeader component**

Create `components/shared/SectionHeader.tsx`:

```typescript
interface SectionHeaderProps {
  tagline?: string;
  title: string;
  subtitle?: string;
  taglineColor?: "purple" | "teal";
  align?: "center" | "left";
}

export function SectionHeader({
  tagline,
  title,
  subtitle,
  taglineColor = "purple",
  align = "center",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  const taglineColorClass = taglineColor === "purple" ? "text-accent-purple" : "text-accent-teal";

  return (
    <div className={`${alignClass} mb-12 md:mb-16`}>
      {tagline && (
        <p className={`text-xs tracking-[0.2em] uppercase ${taglineColorClass} mb-3`}>
          {tagline}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Create AnimatedSection component**

Create `components/shared/AnimatedSection.tsx`:

```typescript
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const directionOffsets = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
    none: { y: 0, x: 0 },
  };

  const offset = directionOffsets[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add lib/ components/shared/
git commit -m "feat: add shared components (Button, SectionHeader, AnimatedSection) and utilities"
```

---

## Task 8: Animation Components (Particle Network + Gradient Orbs)

**Files:**
- Create: `components/animations/GradientOrbs.tsx`
- Create: `components/animations/ParticleNetwork.tsx`

- [ ] **Step 1: Create GradientOrbs component**

Create `components/animations/GradientOrbs.tsx`:

```typescript
"use client";

import { motion } from "framer-motion";

export function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Large purple orb - top left */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(124,92,255,0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "-10%",
          left: "-10%",
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Teal orb - bottom right */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(0,212,170,0.35) 0%, transparent 70%)",
          filter: "blur(70px)",
          bottom: "-5%",
          right: "-5%",
        }}
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 20, -10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Smaller purple orb - center right */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(124,92,255,0.3) 0%, transparent 70%)",
          filter: "blur(60px)",
          top: "40%",
          right: "20%",
        }}
        animate={{
          x: [0, -15, 25, 0],
          y: [0, 25, -15, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Create ParticleNetwork component**

Create `components/animations/ParticleNetwork.tsx`:

```typescript
"use client";

import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

interface ParticleNetworkProps {
  className?: string;
}

export function ParticleNetwork({ className = "" }: ParticleNetworkProps) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      className={`absolute inset-0 ${className}`}
      init={particlesInit}
      options={{
        fullScreen: false,
        fpsLimit: 60,
        particles: {
          number: {
            value: 60,
            density: { enable: true },
          },
          color: {
            value: ["#7c5cff", "#00d4aa"],
          },
          links: {
            enable: true,
            color: "#7c5cff",
            distance: 150,
            opacity: 0.15,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            outModes: { default: "bounce" },
          },
          opacity: {
            value: { min: 0.2, max: 0.5 },
          },
          size: {
            value: { min: 1, max: 2.5 },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.3,
              },
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/animations/
git commit -m "feat: add GradientOrbs and ParticleNetwork animation components"
```

---

## Task 9: Layout Components (Navbar, MobileMenu, Footer)

**Files:**
- Create: `components/layout/Navbar.tsx`
- Create: `components/layout/MobileMenu.tsx`
- Create: `components/layout/Footer.tsx`
- Create: `app/(site)/layout.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create Navbar component**

Create `components/layout/Navbar.tsx`:

```typescript
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MobileMenu } from "./MobileMenu";
import { Button } from "@/components/shared/Button";
import { urlFor } from "@/sanity/lib/image";

interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface NavbarProps {
  siteName: string;
  logo?: any;
  navLinks: NavLink[];
}

export function Navbar({ siteName, logo, navLinks }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-4 left-4 right-4 z-50 mx-auto max-w-7xl rounded-2xl transition-all duration-500 ${
          scrolled
            ? "glass-card py-3 px-6 shadow-lg shadow-black/20"
            : "bg-transparent py-4 px-6"
        }`}
        style={{
          backdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {logo ? (
              <Image
                src={urlFor(logo).width(32).height(32).url()}
                alt={siteName}
                width={32}
                height={32}
                className="rounded-lg"
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-purple to-accent-teal" />
            )}
            <span className="text-lg font-bold text-white">{siteName}</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-white transition-colors duration-200"
                {...(link.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact" className="text-sm text-muted hover:text-white transition-colors">
              Log in
            </Link>
            <Button href="/contact" size="sm">
              Book a Demo
            </Button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-3">
            <Button href="/contact" size="sm">
              Demo
            </Button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-muted"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-3.5 h-0.5 bg-muted"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-muted"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
```

- [ ] **Step 2: Create MobileMenu component**

Create `components/layout/MobileMenu.tsx`:

```typescript
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/shared/Button";

interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

export function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-20 left-4 right-4 z-50 bg-card border border-border rounded-2xl p-6 md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block text-lg font-medium text-foreground hover:text-accent-purple transition-colors py-2 border-b border-border/50"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
                className="pt-2"
              >
                <Button href="/contact" size="lg" className="w-full text-center">
                  Book a Demo
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Create Footer component**

Create `components/layout/Footer.tsx`:

```typescript
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface FooterProps {
  siteName: string;
  footerLinks: FooterLink[];
  socialLinks: SocialLink[];
}

export function Footer({ siteName, footerLinks, socialLinks }: FooterProps) {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent-purple to-accent-teal" />
            <span className="font-bold text-white">{siteName}</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-white transition-colors"
                {...(link.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-accent-purple transition-colors capitalize"
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/30 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Create root layout with fonts**

Overwrite `app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LexiLift — AI-Powered Knowledge Base",
    template: "%s | LexiLift",
  },
  description: "Transform your documents into an intelligent AI knowledge base with RAG-powered search and chat.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

- [ ] **Step 5: Create site layout with Navbar + Footer**

Create `app/(site)/layout.tsx`:

```typescript
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await client.fetch(siteSettingsQuery);

  const defaultNavLinks = [
    { label: "Home", href: "/", isExternal: false },
    { label: "Pricing", href: "/pricing", isExternal: false },
    { label: "Blog", href: "/blog", isExternal: false },
    { label: "About", href: "/about", isExternal: false },
  ];

  const defaultFooterLinks = [
    { label: "Privacy", href: "/privacy", isExternal: false },
    { label: "Terms", href: "/terms", isExternal: false },
  ];

  return (
    <>
      <Navbar
        siteName={settings?.siteName || "LexiLift"}
        logo={settings?.logo}
        navLinks={settings?.navLinks || defaultNavLinks}
      />
      <main className="min-h-screen">{children}</main>
      <Footer
        siteName={settings?.siteName || "LexiLift"}
        footerLinks={settings?.footerLinks || defaultFooterLinks}
        socialLinks={settings?.socialLinks || []}
      />
    </>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add components/layout/ app/layout.tsx app/\(site\)/layout.tsx
git commit -m "feat: add Navbar (glassmorphism), MobileMenu, Footer, and layout structure"
```

---

## Task 10: Homepage — All Sections

**Files:**
- Create: `components/home/HeroSection.tsx`
- Create: `components/home/LogoMarquee.tsx`
- Create: `components/home/FeaturesGrid.tsx`
- Create: `components/home/HowItWorks.tsx`
- Create: `components/home/CTASection.tsx`
- Create: `app/(site)/page.tsx`

- [ ] **Step 1: Create HeroSection component**

Create `components/home/HeroSection.tsx`:

```typescript
"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { GradientOrbs } from "@/components/animations/GradientOrbs";
import { Button } from "@/components/shared/Button";

const ParticleNetwork = dynamic(
  () => import("@/components/animations/ParticleNetwork").then((m) => m.ParticleNetwork),
  { ssr: false }
);

interface HeroSectionProps {
  tagline?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  ctaPrimary?: { label: string; href: string; isExternal?: boolean };
  ctaSecondary?: { label: string; href: string; isExternal?: boolean };
}

export function HeroSection({
  tagline,
  title,
  highlight,
  subtitle,
  ctaPrimary,
  ctaSecondary,
}: HeroSectionProps) {
  const stagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background layers */}
      <GradientOrbs />
      <ParticleNetwork className="z-[1]" />

      {/* Content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto px-4"
      >
        {tagline && (
          <motion.p
            variants={fadeUp}
            className="text-xs tracking-[0.2em] uppercase text-accent-purple mb-4"
          >
            {tagline}
          </motion.p>
        )}
        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-6"
        >
          {title}
          {highlight && (
            <>
              <br />
              <span className="gradient-text">{highlight}</span>
            </>
          )}
        </motion.h1>
        {subtitle && (
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            {subtitle}
          </motion.p>
        )}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          {ctaPrimary && (
            <Button href={ctaPrimary.href} size="lg" isExternal={ctaPrimary.isExternal}>
              {ctaPrimary.label} →
            </Button>
          )}
          {ctaSecondary && (
            <Button href={ctaSecondary.href} variant="secondary" size="lg" isExternal={ctaSecondary.isExternal}>
              {ctaSecondary.label}
            </Button>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Create LogoMarquee component**

Create `components/home/LogoMarquee.tsx`:

```typescript
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Logo {
  name: string;
  logo?: any;
}

interface LogoMarqueeProps {
  logos: Logo[];
}

export function LogoMarquee({ logos }: LogoMarqueeProps) {
  if (!logos?.length) return null;

  // Triple the logos for seamless infinite scroll
  const tripled = [...logos, ...logos, ...logos];

  return (
    <section className="py-12 border-y border-border/30">
      <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground text-center mb-8">
        Trusted by innovative teams
      </p>
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee gap-20 items-center">
          {tripled.map((item, i) => (
            <div key={`${item.name}-${i}`} className="flex-shrink-0 opacity-40 hover:opacity-70 transition-opacity">
              {item.logo ? (
                <Image
                  src={urlFor(item.logo).height(40).url()}
                  alt={item.name}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              ) : (
                <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create FeaturesGrid component**

Create `components/home/FeaturesGrid.tsx`:

```typescript
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesGridProps {
  headline?: string;
  tagline?: string;
  features: Feature[];
}

export function FeaturesGrid({ headline, tagline, features }: FeaturesGridProps) {
  return (
    <section className="py-20 md:py-32 px-4 max-w-7xl mx-auto">
      <AnimatedSection>
        <SectionHeader
          tagline={tagline || "Features"}
          title={headline || "Everything You Need"}
          taglineColor="teal"
        />
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {features.map((feature, i) => (
          <AnimatedSection key={feature.title} delay={i * 0.1}>
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 card-hover group h-full">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create HowItWorks component**

Create `components/home/HowItWorks.tsx`:

```typescript
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

interface Step {
  title: string;
  description: string;
  icon: string;
}

interface HowItWorksProps {
  headline?: string;
  steps: Step[];
}

export function HowItWorks({ headline, steps }: HowItWorksProps) {
  return (
    <section className="py-20 md:py-32 px-4 bg-[#08080d]">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <SectionHeader
            tagline="How It Works"
            title={headline || "Three Steps to Smarter Knowledge"}
            taglineColor="purple"
          />
        </AnimatedSection>
        <div className="flex flex-col md:flex-row gap-8 md:gap-4 items-center justify-center">
          {steps.map((step, i) => (
            <AnimatedSection key={step.title} delay={i * 0.15} className="flex items-center gap-4 md:gap-0">
              <div className="text-center flex-1">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-purple to-accent-teal flex items-center justify-center mx-auto mb-4 text-xl font-bold text-white">
                  {i + 1}
                </div>
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-muted-foreground text-sm max-w-[200px] mx-auto">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block text-muted-foreground/30 text-2xl mx-4">→</div>
              )}
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create CTASection component**

Create `components/home/CTASection.tsx`:

```typescript
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/shared/Button";

interface CTASectionProps {
  title?: string;
  highlight?: string;
  subtitle?: string;
  button?: { label: string; href: string; isExternal?: boolean };
}

export function CTASection({ title, highlight, subtitle, button }: CTASectionProps) {
  return (
    <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-[#08080d] to-[#0d0d1f]">
      <AnimatedSection className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {title || "Ready to"}{" "}
          <span className="gradient-text">{highlight || "Supercharge"}</span>{" "}
          Your Knowledge?
        </h2>
        {subtitle && (
          <p className="text-muted-foreground text-lg mb-8">{subtitle}</p>
        )}
        {button && (
          <Button href={button.href} size="lg" isExternal={button.isExternal}>
            {button.label} →
          </Button>
        )}
      </AnimatedSection>
    </section>
  );
}
```

- [ ] **Step 6: Create Homepage**

Create `app/(site)/page.tsx`:

```typescript
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { homePageQuery } from "@/sanity/lib/queries";
import { HeroSection } from "@/components/home/HeroSection";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CTASection } from "@/components/home/CTASection";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(homePageQuery);
  return {
    title: data?.seo?.metaTitle || "LexiLift — AI-Powered Knowledge Base",
    description: data?.seo?.metaDescription || "Transform your documents into an intelligent AI knowledge base.",
  };
}

export default async function HomePage() {
  const data = await client.fetch(homePageQuery);

  // Fallback data when Sanity is empty
  const hero = {
    tagline: data?.heroTagline || "AI-Powered Knowledge Base",
    title: data?.heroTitle || "Your Knowledge,",
    highlight: data?.heroHighlight || "Supercharged with AI",
    subtitle: data?.heroSubtitle || "Transform your documents into an intelligent knowledge base. Instant answers powered by RAG retrieval.",
    ctaPrimary: data?.heroCtaPrimary || { label: "Get Started Free", href: "/contact" },
    ctaSecondary: data?.heroCtaSecondary || { label: "Watch Demo", href: "/contact" },
  };

  const defaultFeatures = [
    { icon: "🔍", title: "Smart Search", description: "Semantic search across all your documents" },
    { icon: "💬", title: "AI Chat", description: "Ask questions, get instant cited answers" },
    { icon: "📄", title: "Doc Ingestion", description: "Upload PDFs, docs, web pages, and more" },
    { icon: "🔗", title: "Integrations", description: "Connect Slack, Notion, Drive & more" },
    { icon: "🔒", title: "Enterprise Security", description: "SOC 2, SSO, role-based access control" },
    { icon: "📊", title: "Analytics", description: "Track what your team searches for" },
  ];

  const defaultSteps = [
    { icon: "📤", title: "Upload", description: "Add your docs, PDFs, web pages" },
    { icon: "⚡", title: "Index", description: "AI processes & indexes everything" },
    { icon: "💬", title: "Ask", description: "Get instant, cited answers" },
  ];

  return (
    <>
      <HeroSection {...hero} />
      <LogoMarquee logos={data?.trustedByLogos || []} />
      <FeaturesGrid
        headline={data?.featuresHeadline}
        tagline={data?.featuresTagline}
        features={data?.features || defaultFeatures}
      />
      <HowItWorks
        headline={data?.howItWorksHeadline}
        steps={data?.howItWorksSteps || defaultSteps}
      />
      <CTASection
        title={data?.ctaTitle}
        highlight={data?.ctaHighlight}
        subtitle={data?.ctaSubtitle || "Start for free. No credit card required."}
        button={data?.ctaButton || { label: "Get Started Free", href: "/contact" }}
      />
    </>
  );
}
```

- [ ] **Step 7: Verify homepage renders**

```bash
npm run dev
```

Open http://localhost:3000 — should see the full homepage with fallback content, animations, and particle network.

- [ ] **Step 8: Commit**

```bash
git add components/home/ app/\(site\)/page.tsx
git commit -m "feat: add complete homepage with Hero, Features, HowItWorks, LogoMarquee, CTA"
```

---

## Task 11: Pricing Page

**Files:**
- Create: `components/pricing/PricingToggle.tsx`
- Create: `components/pricing/PricingCard.tsx`
- Create: `components/pricing/FAQAccordion.tsx`
- Create: `app/(site)/pricing/page.tsx`

- [ ] **Step 1: Create PricingToggle component**

Create `components/pricing/PricingToggle.tsx`:

```typescript
"use client";

interface PricingToggleProps {
  isYearly: boolean;
  onToggle: (yearly: boolean) => void;
}

export function PricingToggle({ isYearly, onToggle }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-0 mt-6">
      <button
        onClick={() => onToggle(false)}
        className={`px-5 py-2 text-sm rounded-l-full transition-all ${
          !isYearly
            ? "bg-border text-white"
            : "bg-card text-muted-foreground border border-border"
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => onToggle(true)}
        className={`px-5 py-2 text-sm rounded-r-full transition-all ${
          isYearly
            ? "bg-border text-white"
            : "bg-card text-muted-foreground border border-border"
        }`}
      >
        Yearly <span className="text-accent-teal ml-1">-20%</span>
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Create PricingCard component**

Create `components/pricing/PricingCard.tsx`:

```typescript
import { Button } from "@/components/shared/Button";

interface PricingCardProps {
  name: string;
  description?: string;
  price: string;
  interval?: string;
  features: string[];
  ctaText?: string;
  ctaLink?: string;
  highlighted?: boolean;
  badge?: string;
}

export function PricingCard({
  name,
  description,
  price,
  interval = "/mo",
  features,
  ctaText = "Get Started",
  ctaLink = "/contact",
  highlighted = false,
  badge,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-6 md:p-8 flex flex-col h-full transition-all duration-300 ${
        highlighted
          ? "bg-gradient-to-br from-accent-purple/10 to-accent-teal/5 border border-accent-purple/30 scale-[1.02] shadow-[0_0_40px_rgba(124,92,255,0.15)]"
          : "bg-card border border-border card-hover"
      }`}
    >
      {badge && (
        <span className="absolute -top-3 right-4 gradient-button px-3 py-1 text-xs font-semibold">
          {badge}
        </span>
      )}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="mb-6">
        <span className="text-4xl font-extrabold text-white">{price}</span>
        {price !== "Custom" && (
          <span className="text-muted-foreground ml-1">{interval}</span>
        )}
      </div>
      <Button
        href={ctaLink}
        variant={highlighted ? "primary" : "secondary"}
        className="w-full text-center mb-6"
      >
        {ctaText}
      </Button>
      <ul className="space-y-3 flex-1">
        {features.map((feat) => (
          <li key={feat} className="flex items-start gap-2 text-sm text-muted">
            <span className="text-accent-teal mt-0.5">✓</span>
            {feat}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 3: Create FAQAccordion component**

Create `components/pricing/FAQAccordion.tsx`:

```typescript
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto">
      {faqs.map((faq, i) => (
        <div key={faq.question} className="border-b border-border/50">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left"
          >
            <span className="text-sm md:text-base font-medium text-white pr-4">
              {faq.question}
            </span>
            <motion.span
              animate={{ rotate: openIndex === i ? 45 : 0 }}
              className="text-accent-purple text-xl flex-shrink-0"
            >
              +
            </motion.span>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-sm text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Create Pricing page**

Create `app/(site)/pricing/page.tsx`:

```typescript
"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { pricingPageQuery } from "@/sanity/lib/queries";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PricingToggle } from "@/components/pricing/PricingToggle";
import { PricingCard } from "@/components/pricing/PricingCard";
import { FAQAccordion } from "@/components/pricing/FAQAccordion";

const defaultTiers = [
  {
    name: "Free", description: "For individuals exploring", priceMonthly: "$0", priceYearly: "$0",
    interval: "/mo", features: ["50 documents", "100 queries/day", "Basic search", "1 user"],
    ctaText: "Get Started", ctaLink: "/contact", highlighted: false, badge: "",
  },
  {
    name: "Pro", description: "For growing teams", priceMonthly: "$49", priceYearly: "$39",
    interval: "/mo", features: ["Unlimited docs", "5,000 queries/day", "AI chat + search", "10 users", "Integrations", "Priority support"],
    ctaText: "Start Free Trial", ctaLink: "/contact", highlighted: true, badge: "POPULAR",
  },
  {
    name: "Enterprise", description: "For large organizations", priceMonthly: "Custom", priceYearly: "Custom",
    interval: "", features: ["Everything in Pro", "Unlimited users", "SSO / SAML", "Custom SLA", "Dedicated support", "On-prem option"],
    ctaText: "Contact Sales", ctaLink: "/contact", highlighted: false, badge: "",
  },
];

const defaultFaqs = [
  { question: "Can I switch plans later?", answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately." },
  { question: "Is there a free trial?", answer: "Yes! The Pro plan comes with a 14-day free trial. No credit card required." },
  { question: "What payment methods do you accept?", answer: "We accept all major credit cards, wire transfers for Enterprise plans, and can also invoice annually." },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    client.fetch(pricingPageQuery).then(setData);
  }, []);

  const tiers = data?.tiers || defaultTiers;
  const faqs = data?.faqs || defaultFaqs;

  return (
    <div className="pt-32 pb-20">
      {/* Header */}
      <section className="px-4 mb-12" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(124,92,255,0.08) 0%, transparent 60%)" }}>
        <AnimatedSection>
          <SectionHeader
            tagline="Pricing"
            title={data?.headline || "Simple, Transparent Pricing"}
            subtitle={data?.subtitle || "Start free. Scale as you grow. No hidden fees."}
            taglineColor="purple"
          />
          <PricingToggle isYearly={isYearly} onToggle={setIsYearly} />
        </AnimatedSection>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-stretch">
          {tiers.map((tier: any, i: number) => (
            <AnimatedSection key={tier.name} delay={i * 0.12}>
              <PricingCard
                {...tier}
                price={isYearly ? tier.priceYearly : tier.priceMonthly}
              />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 py-16 bg-[#08080d] rounded-3xl mx-4">
        <AnimatedSection>
          <SectionHeader title="Frequently Asked Questions" />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <FAQAccordion faqs={faqs} />
        </AnimatedSection>
      </section>
    </div>
  );
}
```

- [ ] **Step 5: Verify pricing page**

```bash
npm run dev
```

Open http://localhost:3000/pricing — should see tier cards, toggle, and FAQ accordion.

- [ ] **Step 6: Commit**

```bash
git add components/pricing/ app/\(site\)/pricing/
git commit -m "feat: add Pricing page with 3-tier cards, toggle, and FAQ accordion"
```

---

## Task 12: Blog Pages (List + Post)

**Files:**
- Create: `components/blog/CategoryFilter.tsx`
- Create: `components/blog/FeaturedPost.tsx`
- Create: `components/blog/BlogCard.tsx`
- Create: `app/(site)/blog/page.tsx`
- Create: `app/(site)/blog/[slug]/page.tsx`

- [ ] **Step 1: Create CategoryFilter component**

Create `components/blog/CategoryFilter.tsx`:

```typescript
"use client";

interface Category {
  title: string;
  slug: { current: string };
}

interface CategoryFilterProps {
  categories: Category[];
  activeSlug: string | null;
  onChange: (slug: string | null) => void;
}

export function CategoryFilter({ categories, activeSlug, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onChange(null)}
        className={`px-4 py-1.5 rounded-full text-sm transition-all ${
          activeSlug === null
            ? "bg-accent-purple text-white"
            : "bg-card border border-border text-muted-foreground hover:text-white"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug.current}
          onClick={() => onChange(cat.slug.current)}
          className={`px-4 py-1.5 rounded-full text-sm transition-all ${
            activeSlug === cat.slug.current
              ? "bg-accent-purple text-white"
              : "bg-card border border-border text-muted-foreground hover:text-white"
          }`}
        >
          {cat.title}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create FeaturedPost component**

Create `components/blog/FeaturedPost.tsx`:

```typescript
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/lib/utils";

interface FeaturedPostProps {
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: any;
  publishedAt: string;
  author?: { name: string };
  categories?: { title: string }[];
}

export function FeaturedPost({
  title, slug, excerpt, coverImage, publishedAt, author, categories,
}: FeaturedPostProps) {
  return (
    <Link href={`/blog/${slug.current}`} className="block mb-12">
      <article className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col md:flex-row card-hover">
        <div className="md:w-[45%] bg-gradient-to-br from-border to-background p-8 flex items-center justify-center min-h-[200px]">
          {coverImage ? (
            <Image
              src={urlFor(coverImage).width(600).height(400).url()}
              alt={title}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-full"
            />
          ) : (
            <div className="text-5xl">📄</div>
          )}
        </div>
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-accent-purple font-medium">FEATURED</span>
            {categories?.[0] && (
              <span className="text-xs text-muted-foreground">· {categories[0].title}</span>
            )}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">{title}</h2>
          {excerpt && (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{excerpt}</p>
          )}
          <div className="text-xs text-muted-foreground">
            {formatDate(publishedAt)}
            {author && <span> · {author.name}</span>}
          </div>
        </div>
      </article>
    </Link>
  );
}
```

- [ ] **Step 3: Create BlogCard component**

Create `components/blog/BlogCard.tsx`:

```typescript
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: any;
  publishedAt: string;
  categories?: { title: string; slug: { current: string } }[];
}

export function BlogCard({
  title, slug, excerpt, coverImage, publishedAt, categories,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug.current}`}>
      <article className="bg-card border border-border rounded-xl overflow-hidden card-hover h-full flex flex-col">
        <div className="h-44 bg-gradient-to-br from-border/50 to-background relative">
          {coverImage ? (
            <Image
              src={urlFor(coverImage).width(400).height(250).url()}
              alt={title}
              fill
              className="object-cover"
            />
          ) : null}
        </div>
        <div className="p-5 flex flex-col flex-1">
          {categories?.[0] && (
            <span className="text-xs text-accent-teal mb-2">{categories[0].title}</span>
          )}
          <h3 className="text-base font-semibold text-white mb-2 line-clamp-2">{title}</h3>
          {excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">{excerpt}</p>
          )}
          <div className="text-xs text-muted-foreground">{formatDate(publishedAt)}</div>
        </div>
      </article>
    </Link>
  );
}
```

- [ ] **Step 4: Create Blog list page**

Create `app/(site)/blog/page.tsx`:

```typescript
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { blogListQuery, categoriesQuery } from "@/sanity/lib/queries";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { BlogCard } from "@/components/blog/BlogCard";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on AI, RAG, and knowledge management from the LexiLift team.",
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    client.fetch(blogListQuery),
    client.fetch(categoriesQuery),
  ]);

  const featuredPost = posts?.find((p: any) => p.featured) || posts?.[0];
  const remainingPosts = posts?.filter((p: any) => p._id !== featuredPost?._id) || [];

  return (
    <div className="pt-32 pb-20 px-4" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,170,0.06) 0%, transparent 60%)" }}>
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <SectionHeader
            tagline="Blog"
            title="Insights & Updates"
            subtitle="Latest on AI, RAG, and knowledge management"
            taglineColor="teal"
          />
        </AnimatedSection>

        {/* Featured Post */}
        {featuredPost && (
          <AnimatedSection delay={0.1}>
            <FeaturedPost {...featuredPost} />
          </AnimatedSection>
        )}

        {/* Post Grid */}
        {remainingPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingPosts.map((post: any, i: number) => (
              <AnimatedSection key={post._id} delay={i * 0.08}>
                <BlogCard {...post} />
              </AnimatedSection>
            ))}
          </div>
        )}

        {(!posts || posts.length === 0) && (
          <p className="text-center text-muted-foreground py-20">
            No posts yet. Add your first post in{" "}
            <a href="/studio" className="text-accent-purple hover:underline">Sanity Studio</a>.
          </p>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create individual Blog post page**

Create `app/(site)/blog/[slug]/page.tsx`:

```typescript
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { blogPostQuery, blogSlugsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@/sanity/lib/portable-text";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch(blogSlugsQuery);
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(blogPostQuery, { slug });
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch(blogPostQuery, { slug });

  if (!post) notFound();

  return (
    <article className="pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/blog"
          className="text-sm text-muted-foreground hover:text-accent-purple transition-colors mb-8 inline-block"
        >
          ← Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          {post.categories && (
            <div className="flex gap-2 mb-4">
              {post.categories.map((cat: any) => (
                <span key={cat.slug.current} className="text-xs text-accent-teal bg-accent-teal/10 px-3 py-1 rounded-full">
                  {cat.title}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 text-balance">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.image && (
                  <Image
                    src={urlFor(post.author.image).width(32).height(32).url()}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span>{post.author.name}</span>
              </div>
            )}
            <span>·</span>
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="rounded-2xl overflow-hidden mb-10">
            <Image
              src={urlFor(post.coverImage).width(800).height(450).url()}
              alt={post.title}
              width={800}
              height={450}
              className="w-full h-auto"
              priority
            />
          </div>
        )}

        {/* Body */}
        <div className="prose-custom">
          <PortableText value={post.body} />
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add components/blog/ app/\(site\)/blog/
git commit -m "feat: add Blog list page and individual post page with Portable Text"
```

---

## Task 13: About Page

**Files:**
- Create: `components/about/MissionStory.tsx`
- Create: `components/about/ValuesGrid.tsx`
- Create: `components/about/TeamGrid.tsx`
- Create: `app/(site)/about/page.tsx`

- [ ] **Step 1: Create MissionStory component**

Create `components/about/MissionStory.tsx`:

```typescript
import { AnimatedSection } from "@/components/shared/AnimatedSection";

interface MissionStoryProps {
  missionTitle?: string;
  missionBody?: string;
  storyTitle?: string;
  storyBody?: string;
}

export function MissionStory({ missionTitle, missionBody, storyTitle, storyBody }: MissionStoryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
      <AnimatedSection direction="left">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 h-full">
          <p className="text-xs tracking-[0.15em] uppercase text-accent-purple mb-4">
            {missionTitle || "Our Mission"}
          </p>
          <p className="text-foreground/80 leading-relaxed">
            {missionBody || "To democratize access to organizational knowledge through AI, making every team member as informed as the most senior expert."}
          </p>
        </div>
      </AnimatedSection>
      <AnimatedSection direction="right">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 h-full">
          <p className="text-xs tracking-[0.15em] uppercase text-accent-teal mb-4">
            {storyTitle || "Our Story"}
          </p>
          <p className="text-foreground/80 leading-relaxed">
            {storyBody || "Founded in 2025, LexiLift was born from the frustration of watching teams waste hours searching for answers buried in docs and wikis."}
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
```

- [ ] **Step 2: Create ValuesGrid component**

Create `components/about/ValuesGrid.tsx`:

```typescript
import { AnimatedSection } from "@/components/shared/AnimatedSection";

interface Value {
  icon: string;
  title: string;
  description?: string;
}

interface ValuesGridProps {
  values: Value[];
}

export function ValuesGrid({ values }: ValuesGridProps) {
  return (
    <div className="mb-16">
      <AnimatedSection>
        <h3 className="text-2xl font-bold text-center mb-10">Our Values</h3>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map((value, i) => (
          <AnimatedSection key={value.title} delay={i * 0.1}>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">{value.icon}</div>
              <h4 className="text-lg font-semibold text-white mb-2">{value.title}</h4>
              {value.description && (
                <p className="text-sm text-muted-foreground">{value.description}</p>
              )}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create TeamGrid component**

Create `components/about/TeamGrid.tsx`:

```typescript
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image?: any;
  bio?: string;
  socialLinks?: { platform: string; url: string }[];
}

interface TeamGridProps {
  members: TeamMember[];
}

export function TeamGrid({ members }: TeamGridProps) {
  if (!members?.length) return null;

  return (
    <div className="py-16 bg-[#08080d] rounded-3xl px-6 md:px-8">
      <AnimatedSection>
        <h3 className="text-2xl font-bold text-center mb-12">Meet the Team</h3>
      </AnimatedSection>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {members.map((member, i) => (
          <AnimatedSection key={member._id} delay={i * 0.08}>
            <div className="text-center group">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full mx-auto mb-4 overflow-hidden bg-gradient-to-br from-accent-purple to-border">
                {member.image && (
                  <Image
                    src={urlFor(member.image).width(120).height(120).url()}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <h4 className="font-semibold text-white">{member.name}</h4>
              <p className="text-sm text-muted-foreground">{member.role}</p>
              {member.socialLinks && (
                <div className="flex justify-center gap-3 mt-2">
                  {member.socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-accent-purple transition-colors capitalize"
                    >
                      {social.platform}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create About page**

Create `app/(site)/about/page.tsx`:

```typescript
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MissionStory } from "@/components/about/MissionStory";
import { ValuesGrid } from "@/components/about/ValuesGrid";
import { TeamGrid } from "@/components/about/TeamGrid";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(aboutPageQuery);
  return {
    title: data?.seo?.metaTitle || "About",
    description: data?.seo?.metaDescription || "Learn about the team and mission behind LexiLift.",
  };
}

export default async function AboutPage() {
  const data = await client.fetch(aboutPageQuery);

  const defaultValues = [
    { icon: "🎯", title: "Accuracy First", description: "We obsess over delivering correct, cited answers." },
    { icon: "🔓", title: "Open & Transparent", description: "Honest pricing, open roadmap, clear communication." },
    { icon: "🚀", title: "Ship Fast", description: "Rapid iteration driven by customer feedback." },
  ];

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <SectionHeader
            tagline="About Us"
            title={`${data?.headline || "Building the Future of"}`}
            subtitle={data?.subtitle || "We believe every team deserves instant access to their collective knowledge."}
            taglineColor="purple"
          />
        </AnimatedSection>

        {/* Mission + Story */}
        <MissionStory
          missionTitle={data?.missionTitle}
          missionBody={data?.missionBody}
          storyTitle={data?.storyTitle}
          storyBody={data?.storyBody}
        />

        {/* Values */}
        <ValuesGrid values={data?.values || defaultValues} />

        {/* Team */}
        <TeamGrid members={data?.teamMembers || []} />
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add components/about/ app/\(site\)/about/
git commit -m "feat: add About page with MissionStory, ValuesGrid, and TeamGrid"
```

---

## Task 14: Contact / Book a Demo Page

**Files:**
- Create: `components/contact/ContactForm.tsx`
- Create: `components/contact/CalendarEmbed.tsx`
- Create: `app/(site)/contact/page.tsx`

- [ ] **Step 1: Create ContactForm component**

Create `components/contact/ContactForm.tsx`:

```typescript
"use client";

import { useState, type FormEvent } from "react";

export function ContactForm({ heading }: { heading?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    // TODO: Connect to an email service (Resend, SendGrid, etc.)
    // For now, simulate a submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
          <p className="text-muted-foreground text-sm">We&apos;ll get back to you within 24 hours.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
      <h3 className="text-lg font-bold text-white mb-6">{heading || "Send a Message"}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs text-muted mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-accent-purple/50 transition-colors"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-2">Work Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-accent-purple/50 transition-colors"
            placeholder="john@company.com"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-2">Company</label>
          <input
            type="text"
            name="company"
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-accent-purple/50 transition-colors"
            placeholder="Acme Corp"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-2">Message</label>
          <textarea
            name="message"
            required
            rows={4}
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-accent-purple/50 transition-colors resize-none"
            placeholder="Tell us about your needs..."
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full gradient-button py-3 text-sm disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Send Message →"}
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Create CalendarEmbed component**

Create `components/contact/CalendarEmbed.tsx`:

```typescript
interface CalendarEmbedProps {
  heading?: string;
  embedUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  socialLinks?: { platform: string; url: string }[];
}

export function CalendarEmbed({
  heading,
  embedUrl,
  contactEmail,
  contactPhone,
  socialLinks,
}: CalendarEmbedProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
      <h3 className="text-lg font-bold text-white mb-6">{heading || "Book a Live Demo"}</h3>
      <div className="bg-background border border-border rounded-xl overflow-hidden mb-6 min-h-[300px]">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            width="100%"
            height="400"
            frameBorder="0"
            className="w-full"
            title="Schedule a demo"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center p-6">
            <div className="text-5xl mb-4">📅</div>
            <p className="text-muted-foreground text-sm mb-2">Calendar embed will appear here</p>
            <p className="text-xs text-muted-foreground/60">Set the Calendly/Cal.com URL in Sanity Studio</p>
          </div>
        )}
      </div>
      <div className="bg-background/50 rounded-xl p-4">
        <p className="text-sm text-muted mb-3">Or reach us directly:</p>
        <div className="space-y-2 text-sm text-muted-foreground">
          {contactEmail && <p>📧 {contactEmail}</p>}
          {contactPhone && <p>📱 {contactPhone}</p>}
          {socialLinks?.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-accent-purple transition-colors capitalize"
            >
              🔗 {s.platform}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create Contact page**

Create `app/(site)/contact/page.tsx`:

```typescript
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { contactPageQuery } from "@/sanity/lib/queries";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ContactForm } from "@/components/contact/ContactForm";
import { CalendarEmbed } from "@/components/contact/CalendarEmbed";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(contactPageQuery);
  return {
    title: data?.seo?.metaTitle || "Contact",
    description: data?.seo?.metaDescription || "Get in touch or book a live demo of LexiLift.",
  };
}

export default async function ContactPage() {
  const data = await client.fetch(contactPageQuery);

  return (
    <div className="pt-32 pb-20 px-4" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,170,0.06) 0%, transparent 60%)" }}>
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <SectionHeader
            tagline="Contact"
            title={data?.headline || "Let's Talk"}
            subtitle={data?.subtitle || "Get in touch or book a live demo"}
            taglineColor="teal"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedSection direction="left" delay={0.1}>
            <ContactForm heading={data?.formHeading} />
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.2}>
            <CalendarEmbed
              heading={data?.calendarHeading}
              embedUrl={data?.calendarEmbedUrl}
              contactEmail={data?.contactEmail || "hello@lexilift.com"}
              contactPhone={data?.contactPhone}
              socialLinks={data?.socialLinks}
            />
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/contact/ app/\(site\)/contact/
git commit -m "feat: add Contact page with form and calendar embed"
```

---

## Task 15: Final Integration, Build Verification & Cleanup

**Files:**
- Modify: `app/(site)/page.tsx` (if needed for build fixes)
- Create: `.gitignore` entry for `.superpowers/`

- [ ] **Step 1: Run the dev server and verify all pages**

```bash
npm run dev
```

Manually check each route:
- http://localhost:3000 — Homepage
- http://localhost:3000/pricing — Pricing
- http://localhost:3000/blog — Blog
- http://localhost:3000/about — About
- http://localhost:3000/contact — Contact
- http://localhost:3000/studio — Sanity Studio

Expected: All pages render with fallback data, no console errors. Studio loads.

- [ ] **Step 2: Run production build to check for type/build errors**

```bash
npm run build
```

Expected: Build succeeds with no errors. Fix any TypeScript or import issues that arise.

- [ ] **Step 3: Run production server and verify**

```bash
npm start
```

Check all routes again at http://localhost:3000. Verify:
- Animations play on load and scroll
- Navbar glassmorphism works
- Mobile responsive (resize browser or use DevTools)
- Particle network renders
- No layout shift on font loading

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete LexiLift marketing site with all pages, Sanity CMS, and animations"
```

---

## Summary

| Task | Description | Files |
|---|---|---|
| 1 | Project scaffold + deps + Tailwind theme | 6 files |
| 2 | Sanity config + client + image helpers | 5 files |
| 3 | Sanity object schemas (seo, link, feature) | 3 files |
| 4 | Sanity document schemas (9 types) + barrel | 10 files |
| 5 | GROQ queries + Portable Text renderer | 2 files |
| 6 | Studio route + revalidation webhook | 3 files |
| 7 | Shared components (Button, SectionHeader, AnimatedSection) | 4 files |
| 8 | Animation components (GradientOrbs, ParticleNetwork) | 2 files |
| 9 | Layout components (Navbar, MobileMenu, Footer) + layouts | 5 files |
| 10 | Homepage (Hero, Features, HowItWorks, LogoMarquee, CTA) | 6 files |
| 11 | Pricing page (Cards, Toggle, FAQ) | 4 files |
| 12 | Blog pages (List, Post, Cards, CategoryFilter) | 5 files |
| 13 | About page (Mission, Values, Team) | 4 files |
| 14 | Contact page (Form, Calendar) | 3 files |
| 15 | Final integration + build verification | — |
