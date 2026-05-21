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
