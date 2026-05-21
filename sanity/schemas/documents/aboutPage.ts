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
