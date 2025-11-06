import { defineField, defineType } from "sanity";

export default defineType({
  name: "executionPage",
  title: "Execution Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
    }),
    defineField({
      name: "heroKicker",
      title: "Hero Kicker",
      type: "string",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "servicesLabel",
      title: "Services Label",
      type: "string",
    }),
    defineField({
      name: "servicesTitle",
      title: "Services Title",
      type: "string",
    }),
    defineField({
      name: "servicesDescription",
      title: "Services Description",
      type: "text",
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "number",
              title: "Number",
              type: "string",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "outcome",
              title: "Outcome",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "ctaHeadline",
      title: "CTA Headline",
      type: "string",
    }),
    defineField({
      name: "ctaBody",
      title: "CTA Body",
      type: "text",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
