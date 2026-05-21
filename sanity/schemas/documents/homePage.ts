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
