import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutUsPage",
  title: "About Us Page",
  type: "document",
  fields: [
    defineField({
      name: "heroLabel",
      title: "Hero Label",
      type: "string",
      description: "Label shown above the hero title (e.g., 'About Us').",
      initialValue: "About Us",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
      description: "Main hero title. Use line breaks for multi-line titles.",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "missionTitle",
      title: "Mission Title",
      type: "string",
      initialValue: "Our Mission",
    }),
    defineField({
      name: "missionContent",
      title: "Mission Content",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      validation: (Rule) => Rule.required().min(1),
      description: "Mission statement paragraphs. Each item will be displayed as a separate paragraph.",
    }),
    defineField({
      name: "visionTitle",
      title: "Vision Title",
      type: "string",
      initialValue: "Our Vision",
    }),
    defineField({
      name: "visionContent",
      title: "Vision Content",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "valuesTitle",
      title: "Values Title",
      type: "string",
      initialValue: "Our Values",
    }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [
        {
          type: "object",
          name: "value",
          title: "Value",
          fields: [
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
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "leadershipTitle",
      title: "Leadership Title",
      type: "string",
      initialValue: "Meet the Leadership Team",
    }),
    defineField({
      name: "leadershipDescription",
      title: "Leadership Description",
      type: "string",
      initialValue: "We are led by a world-class team of experts",
    }),
    defineField({
      name: "leadershipTeam",
      title: "Leadership Team",
      type: "array",
      of: [
        {
          type: "object",
          name: "member",
          title: "Team Member",
          fields: [
            defineField({
              name: "name",
              title: "Name",
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
              name: "image",
              title: "Photo",
              type: "image",
              options: {
                hotspot: true,
              },
              description: "Optional team member photo. Recommended size: 400x400px (square).",
            }),
            defineField({
              name: "bio",
              title: "Bio",
              type: "text",
              rows: 4,
              description: "Optional biography or description.",
            }),
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "title",
              media: "image",
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "certificationsTitle",
      title: "Certifications Title",
      type: "string",
      initialValue: "Certifications & Awards",
    }),
    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [
        {
          type: "object",
          name: "certificationGroup",
          title: "Certification Group",
          fields: [
            defineField({
              name: "category",
              title: "Category",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: "Category name (e.g., 'Microsoft', 'Palo Alto Networks').",
            }),
            defineField({
              name: "image",
              title: "Category Logo",
              type: "image",
              options: {
                hotspot: true,
              },
              description: "Optional category logo/image. Recommended size: 300x150px.",
            }),
            defineField({
              name: "items",
              title: "Certifications",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "certificationItem",
                  title: "Certification Item",
                  fields: [
                    defineField({
                      name: "name",
                      title: "Certification Name",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "image",
                      title: "Logo",
                      type: "image",
                      options: {
                        hotspot: true,
                      },
                      description: "Optional certification logo. Recommended size: 200x100px.",
                    }),
                  ],
                  preview: {
                    select: {
                      title: "name",
                      media: "image",
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              title: "category",
              subtitle: "items",
              media: "image",
            },
            prepare({ title, subtitle }) {
              const count = Array.isArray(subtitle) ? subtitle.length : 0;
              return {
                title: title || "Untitled",
                subtitle: `${count} certification${count !== 1 ? "s" : ""}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "awards",
      title: "Awards",
      type: "array",
      of: [
        {
          type: "object",
          name: "award",
          title: "Award",
          fields: [
            defineField({
              name: "name",
              title: "Award Name",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: "Award or recognition name (e.g., 'Minority Business Enterprise Certified').",
            }),
            defineField({
              name: "image",
              title: "Award Logo",
              type: "image",
              options: {
                hotspot: true,
              },
              description: "Optional award logo/image. Recommended size: 300x150px.",
            }),
          ],
          preview: {
            select: {
              title: "name",
              media: "image",
            },
          },
        },
      ],
      description: "Awards and recognitions.",
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA Title",
      type: "string",
      initialValue: "Ready to work with us?",
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA Description",
      type: "text",
      rows: 2,
      initialValue:
        "Let's discuss how our team can help transform your business with innovative technology solutions.",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      initialValue: "Start the Conversation",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "title",
          title: "Meta Title",
          type: "string",
        }),
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
          description: "Target SEO keywords for this page.",
        }),
        defineField({
          name: "ogImage",
          title: "OG Image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "heroTitle",
      subtitle: "heroDescription",
    },
  },
});

