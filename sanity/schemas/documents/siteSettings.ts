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
