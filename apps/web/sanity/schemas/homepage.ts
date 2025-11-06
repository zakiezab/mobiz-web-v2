import { defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroMetrics",
      title: "Hero Metrics",
      type: "array",
      of: [
        {
          type: "object",
          name: "metric",
          title: "Metric",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: "statsItems",
      title: "Stats Bar Items",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "accountabilityGapTitle",
      title: "Accountability Gap Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accountabilityGapBody",
      title: "Accountability Gap Body",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "modelItems",
      title: "Model Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "modelItem",
          title: "Model Item",
          fields: [
            defineField({
              name: "number",
              title: "Number",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: "deliveredStories",
      title: "Delivered Stories",
      type: "array",
      of: [
        {
          type: "object",
          name: "story",
          title: "Story",
          fields: [
            defineField({
              name: "client",
              title: "Client",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "metricValue",
              title: "Metric Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "metricContext",
              title: "Metric Context",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "videoLink",
              title: "Video Link",
              type: "object",
              fields: [
                defineField({
                  name: "href",
                  title: "URL",
                  type: "url",
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
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "recognitionItems",
      title: "Recognition Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "item",
          title: "Recognition Item",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "source",
              title: "Source",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [
        {
          type: "object",
          name: "service",
          title: "Service",
          fields: [
            defineField({
              name: "number",
              title: "Number",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "outcome",
              title: "Outcome",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "partners",
      title: "Technology Partners",
      type: "array",
      of: [
        {
          type: "object",
          name: "partner",
          title: "Partner",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "color",
              title: "Brand Color",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "industries",
      title: "Industries",
      type: "array",
      of: [
        {
          type: "object",
          name: "industry",
          title: "Industry",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "contactTitle",
      title: "Contact CTA Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contactDescription",
      title: "Contact CTA Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contactCtaLabel",
      title: "Contact CTA Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "title", title: "Meta Title", type: "string" }),
        defineField({
          name: "description",
          title: "Meta Description",
          type: "text",
        }),
        defineField({
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
          description: 'Target SEO keywords (e.g., "execution partner", "accountability gap").',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "Homepage",
    },
  },
});
