import { defineType, defineField } from "sanity";

export const user = defineType({
  name: "user",
  title: "Users",
  type: "document",
  fields: [
    defineField({
      name: "username",
      title: "Username",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "password",
      title: "Password (Hashed)",
      type: "string",
      hidden: true, // Don't show this field in the studio UI for security
    }),
  ],
  preview: {
    select: {
      title: 'username',
      subtitle: 'email',
    },
  },
});
