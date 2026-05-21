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
