---
name: Organic Knowledge
colors:
  surface: '#fbf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#fbf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ef'
  surface-container: '#efeeea'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e4e2de'
  on-surface: '#1b1c1a'
  on-surface-variant: '#424843'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f0ed'
  outline: '#727973'
  outline-variant: '#c1c8c1'
  surface-tint: '#446652'
  primary: '#42634f'
  on-primary: '#ffffff'
  primary-container: '#5a7c67'
  on-primary-container: '#f6fff6'
  inverse-primary: '#aacfb7'
  secondary: '#8c4e37'
  on-secondary: '#ffffff'
  secondary-container: '#feae91'
  on-secondary-container: '#793f29'
  tertiary: '#5f5c52'
  on-tertiary: '#ffffff'
  tertiary-container: '#78746a'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c6ebd2'
  primary-fixed-dim: '#aacfb7'
  on-primary-fixed: '#002112'
  on-primary-fixed-variant: '#2c4d3b'
  secondary-fixed: '#ffdbcf'
  secondary-fixed-dim: '#ffb59b'
  on-secondary-fixed: '#380d00'
  on-secondary-fixed-variant: '#6f3722'
  tertiary-fixed: '#e8e2d6'
  tertiary-fixed-dim: '#cbc6ba'
  on-tertiary-fixed: '#1e1c14'
  on-tertiary-fixed-variant: '#4a473e'
  background: '#fbf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2de'
typography:
  headline-xl:
    fontFamily: Literata
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Literata
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Literata
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Literata
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 32px
  margin-mobile: 20px
  margin-desktop: 64px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is rooted in "Organic Modernism"—a philosophy that prioritizes cognitive ease and emotional warmth over technical coldness. It treats knowledge management not as a data-crunching exercise, but as a digital sanctuary for thought. 

The aesthetic is characterized by an editorial flair, drawing inspiration from high-end print journals and wellness spaces. It utilizes generous whitespace, soft-focus depth, and a human-centric approach to AI interactions, ensuring the platform feels like a helpful librarian rather than an impersonal machine. The goal is to evoke a sense of "digital hygge": comfort, clarity, and quiet confidence.

## Colors

This design system utilizes a palette of sun-bleached neutrals and botanical tones to reduce eye strain and foster long-form reading and thinking.

- **Primary (Sage):** Used for primary actions, success states, and brand recognition. It represents growth and stability.
- **Secondary (Terracotta):** Used for accents, secondary CTAs, and highlighting important insights. It adds warmth and a human touch.
- **Neutral (Cream/Stone):** The foundation of the UI. Backgrounds use a soft cream rather than pure white to prevent harsh "blue-light" fatigue.
- **Text:** Deep charcoal with a hint of warm brown is used instead of pure black to maintain the soft, editorial contrast.

Avoid using vibrant neons or high-contrast dark modes; the "dark" alternative should feel like deep charcoal or navy rather than pitch black.

## Typography

The typography strategy is "Editorial Accessibility." 

**Literata** is used for headings to provide a sophisticated, literary feel that anchors the AI's "knowledge" in human tradition. It should be used with slightly tighter letter-spacing for large displays to maintain a premium look.

**Plus Jakarta Sans** provides a friendly, modern contrast for body text and interface elements. Its soft terminals and open apertures ensure high legibility in dense knowledge-management views. 

Maintain generous line-height (1.6x for body) to ensure the text "breathes," encouraging a calm, paced reading experience.

## Layout & Spacing

This design system follows a **Fixed-Fluid hybrid grid**. Content is centered within a maximum width of 1280px to prevent long line lengths that hinder readability.

The spacing rhythm is based on an 8px scale but leans toward the larger end of the spectrum to maintain a spacious, "un-cluttered" feel. Use **stack-lg (48px)** between major sections and **stack-md (24px)** between card elements. 

On mobile, gutters reduce to 20px, and vertical stacks are compressed slightly to ensure visibility of content while maintaining the airy aesthetic. Elements should never feel "cramped"; when in doubt, increase the padding.

## Elevation & Depth

To maintain the "human" feel, avoid heavy, dark shadows. Instead, use **Tonal Layering** combined with **Ambient Tinted Shadows**.

1.  **Level 0 (Base):** The neutral cream background.
2.  **Level 1 (Cards/Containers):** Pure white surfaces with a very soft, diffused shadow tinted with the primary sage color (e.g., `rgba(107, 142, 120, 0.08)`).
3.  **Level 2 (Modals/Popovers):** Higher elevation with a slightly larger blur radius and a subtle 1px border in a light stone color.

Depth should feel like physical paper or cards stacked on a warm desk, not like glowing digital layers. Use backdrop blurs sparingly on navigation bars to maintain the "glassmorphism" feel without over-digitizing the aesthetic.

## Shapes

The shape language is defined by **Pill-shaped (Level 3)** roundedness. There are almost no sharp corners in this design system.

- **Standard Buttons:** Fully rounded (pill) to feel inviting and safe.
- **Cards & Input Fields:** 1rem (16px) or 2rem (32px) depending on the size of the container. 
- **Icons:** Should use a rounded cap and join style to match the UI's softness.

Large containers like main content areas should use `rounded-xl` (3rem/48px) to create a "container" feel that feels like a modern interior design space.

## Components

- **Buttons:** Primary buttons use the Sage Green background with white text. Secondary buttons use a Sage Green outline with a subtle cream hover state. All buttons are pill-shaped.
- **Knowledge Cards:** These are the heart of the system. They use a white background, 24px internal padding, and the Level 1 tinted shadow. Headlines within cards use the Literata font.
- **Input Fields:** Use a soft stone background (`#E8E2D6`) with a 16px corner radius. On focus, the border should transition to Sage Green with a soft glow.
- **Chips/Tags:** Used for categorization. These should be small, pill-shaped, and use low-saturation versions of the primary/secondary colors (e.g., a very light sage background with dark sage text).
- **AI Response Bubbles:** To differentiate AI-generated content, use a very subtle secondary terracotta-tinted background with a unique icon treatment to signal "machine-assisted" thought.
- **Lists:** Use generous vertical spacing and subtle dividers in a warm stone color. Avoid heavy lines; let the whitespace define the separation.