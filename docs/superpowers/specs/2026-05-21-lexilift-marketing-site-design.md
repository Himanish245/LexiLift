# LexiLift Marketing Website — Design Specification

## Product Overview

**LexiLift** is a B2B SaaS platform that provides an AI-powered knowledge base with RAG (Retrieval-Augmented Generation) retrieval. Businesses upload their documents/data and get an intelligent knowledge base with chat and search capabilities for their teams or customers.

**Target Audience:** Both technical decision-makers (CTOs, engineering leads) and non-technical business stakeholders (ops, support managers). The site must speak to both audiences.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Server Components, ISR) |
| CMS | Sanity v3 with embedded Studio at `/studio` |
| Data Fetching | `next-sanity` + GROQ queries, ISR with on-demand revalidation via Sanity webhooks |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion (scroll/page transitions) + GSAP (complex parallax/scroll-driven) |
| Particles | tsparticles or custom canvas for neural mesh + gradient orbs |
| Fonts | Inter (or similar premium sans-serif) via `next/font` |
| Deployment | Vercel |

---

## Pages

1. **Home** — Hero, features, social proof, how-it-works, CTA
2. **Pricing** — 3-tier comparison (Free / Pro / Enterprise), monthly/yearly toggle, FAQ
3. **Blog** — List page with category filters + individual post pages (Portable Text)
4. **About** — Mission, story, values, team members
5. **Contact / Book a Demo** — Contact form + calendar embed (Calendly/Cal.com) side by side

---

## CMS Scope

**Everything is managed from Sanity.** All page content (hero text, features, pricing tiers, team members, blog posts, site settings) is editable from the CMS.

### Sanity Schemas

**Single-Instance Documents:**
- `homePage` — hero (title, subtitle, ctaText, ctaLink), features[], socialProof (logos[], stats[]), howItWorks[], ctaSection
- `pricingPage` — headline, subtitle, tiers[] (name, price, interval, features[], ctaText, ctaLink, highlighted), faqs[]
- `aboutPage` — headline, subtitle, mission, story (rich text), values[], teamMembers[] → ref
- `contactPage` — headline, subtitle, formFields config, calendarEmbedUrl, contactInfo

**Collection Documents:**
- `blogPost` — title, slug, excerpt, coverImage, body (Portable Text), author → ref, categories[] → ref, publishedAt, seo
- `author` — name, image, bio, role
- `category` — title, slug, description
- `teamMember` — name, role, image, bio, socialLinks[]

**Singleton:**
- `siteSettings` — siteName, logo, favicon, navLinks[], footerLinks[], socialLinks[], seo defaults

---

## Visual Design

### Theme
- **Dark-dominant** with vibrant accent colors
- Inspired by VoyageAI but darker and more techy
- Primary background: `#0a0a0f` (deep dark)
- Accent gradient: `#7c5cff` (purple) → `#00d4aa` (teal)
- Card backgrounds: `#111118`
- Borders: `#1a1a2e`

### Navbar
- **Glassmorphism Floating Bar** — frosted glass effect with subtle border glow
- Floats with margin from edges (not edge-to-edge)
- Logo left, minimal links center, gradient CTA ("Book a Demo") right
- On scroll: shrinks slightly, backdrop blur increases
- Mobile: hamburger with animated slide-out drawer

### Hero (Homepage)
- **Centered hero** — Large headline + subtitle + dual CTAs
- **Neural mesh network** concentrated behind the hero text as focal point
- **Floating gradient orbs** in the wider background atmosphere
- Staggered fade-in + slide-up animations on page load

### Animations
- **On load:** Elements fade-in and slide-up with staggered delays (Framer Motion)
- **On scroll:** Sections reveal via intersection observer with slide/fade transitions (Framer Motion)
- **Complex scroll:** Parallax and scroll-driven effects via GSAP ScrollTrigger
- **Background:** Continuously animated gradient orbs + interactive particle neural mesh
- **Hover:** Glow effects on cards, button scale/color transitions
- **Respects `prefers-reduced-motion`** for accessibility

---

## Project Structure

```
lexilift/
├── app/
│   ├── (site)/               # Marketing pages route group
│   │   ├── layout.tsx         # Shared navbar + footer
│   │   ├── page.tsx           # Home
│   │   ├── pricing/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   └── blog/
│   │       ├── page.tsx       # Blog list
│   │       └── [slug]/page.tsx # Blog post
│   ├── studio/[[...tool]]/page.tsx  # Sanity Studio
│   ├── api/revalidate/route.ts      # Webhook for ISR
│   ├── layout.tsx             # Root layout (fonts, metadata)
│   └── globals.css
├── sanity/
│   ├── schemas/               # All content schemas
│   │   ├── documents/         # homePage, pricingPage, blogPost, etc.
│   │   └── objects/           # Reusable field types (seo, link, etc.)
│   ├── lib/
│   │   ├── client.ts          # Sanity client config
│   │   ├── queries.ts         # GROQ queries
│   │   ├── image.ts           # Image URL builder
│   │   └── portable-text.tsx  # Portable Text components
│   └── sanity.config.ts
├── components/
│   ├── layout/                # Navbar, Footer, MobileMenu
│   ├── home/                  # HeroSection, FeaturesGrid, HowItWorks, CTASection, LogoMarquee
│   ├── pricing/               # PricingCard, PricingToggle, FAQAccordion
│   ├── blog/                  # BlogCard, CategoryFilter, FeaturedPost
│   ├── about/                 # TeamGrid, ValuesGrid, MissionCard
│   ├── contact/               # ContactForm, CalendarEmbed
│   ├── shared/                # Button, Card, SectionHeader, AnimatedSection
│   └── animations/            # ParticleNetwork, GradientOrbs, ScrollReveal
├── lib/
│   └── utils.ts               # Shared utilities
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Performance & Responsiveness

- **Mobile-first responsive** — Breakpoints: 375px → 768px → 1024px → 1280px
- **next/image** — Auto WebP/AVIF, lazy loading, responsive srcset
- **Dynamic imports** — Heavy components (particle canvas, GSAP, Framer) code-split
- **ISR caching** — Pages pre-rendered at build, revalidated on Sanity webhook
- **next/font** — Font optimization with `display: swap`, zero layout shift
- **Reduced motion** — Respects `prefers-reduced-motion` media query
- **Lighthouse targets** — Performance 90+, Accessibility 95+, SEO 100

---

## Page Details

### Homepage Sections (top → bottom)
1. Navbar (sticky, glassmorphism)
2. Hero (centered headline, neural mesh + orbs, staggered load animation)
3. Logo Marquee (auto-scrolling trusted company logos)
4. Features Grid (6 cards, hover glow, scroll-reveal)
5. How It Works (3-step flow: Upload → Index → Ask)
6. Bottom CTA (gradient background, conversion push)
7. Footer (links, social, copyright)

### Pricing Page
- Monthly/Yearly toggle with discount badge
- 3-tier cards (Free / Pro / Enterprise), Pro highlighted with "POPULAR" badge
- FAQ accordion below

### Blog
- Category filter pills
- Featured post (large horizontal card)
- Post grid (3-column responsive, cover images, metadata)
- Individual post: Portable Text rendering with code blocks, images, callouts

### About
- Mission + Story side-by-side cards
- Values grid (3 columns with icons)
- Team member grid with photos, roles, social links

### Contact / Book a Demo
- Two-column: Contact form (left) + Calendar embed (right)
- Form: Name, Email, Company, Message → API route / email service
- Calendar: Calendly/Cal.com iframe embed
- Direct contact info below calendar
