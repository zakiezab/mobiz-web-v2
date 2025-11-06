import { defineField, defineType } from "sanity";

export default defineType({
  name: "deliveredValuePage",
  title: "Delivered Value Page",
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
      name: "storiesLabel",
      title: "Stories Label",
      type: "string",
    }),
    defineField({
      name: "storiesTitle",
      title: "Stories Title",
      type: "string",
    }),
    defineField({
      name: "stories",
      title: "Stories",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "client",
              title: "Client",
              type: "string",
            }),
            defineField({
              name: "metricValue",
              title: "Metric Value",
              type: "string",
            }),
            defineField({
              name: "metricContext",
              title: "Metric Context",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "videoLink",
              title: "Video Link",
              type: "object",
              fields: [
                defineField({
                  name: "href",
                  title: "Href",
                  type: "string",
                }),
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                }),
              ],
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
