import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Service Category",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Category Key",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Internal identifier (e.g., 'cloud-services', 'data-ai'). Must match the value used in service pages.",
      options: {
        list: [
          { title: "Cloud Services", value: "cloud-services" },
          { title: "Data & AI", value: "data-ai" },
          { title: "Digital Engineering", value: "digital-engineering" },
          { title: "Modernization", value: "modernization" },
        ],
      },
    }),
    defineField({
      name: "label",
      title: "Category Label",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Display name for the category (e.g., 'Cloud Services').",
    }),
    defineField({
      name: "image",
      title: "Category Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Image displayed above the category title on the services page. Recommended size: 400x400px (square).",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Optional description shown below the category title.",
      initialValue: "Explore our offerings. We deliver complex, production-grade systems with zero handoffs.",
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "key",
      media: "image",
    },
  },
});
