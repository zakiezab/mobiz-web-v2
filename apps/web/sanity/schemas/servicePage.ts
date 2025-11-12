import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Cloud Services', value: 'cloud-services'},
          {title: 'Data & AI', value: 'data-ai'},
          {title: 'Digital Engineering', value: 'digital-engineering'},
          {title: 'Modernization', value: 'modernization'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      description: 'Service category for filtering and organization.',
    }),
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      description: 'Short label that prefixes the hero headline (e.g., "Execution /").',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Hero image displayed at the top of the service page. Recommended size: 1200x800px (3:2 aspect ratio). Will use default image if not provided.',
    }),
    defineField({
      name: 'problemHeadline',
      title: 'Problem Headline',
      type: 'string',
    }),
    defineField({
      name: 'problemDescription',
      title: 'Problem Description',
      type: 'text',
    }),
    defineField({
      name: 'solutionDescription',
      title: 'Solution Description',
      type: 'text',
    }),
    defineField({
      name: 'capabilities',
      title: 'Core Capabilities',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'capability',
          title: 'Capability',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              description: 'Optional image for this capability. Recommended size: 600x400px (3:2 aspect ratio).',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'featuresSection',
      title: 'Features Section',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'kicker',
          title: 'Kicker',
          type: 'string',
          description: 'Optional label that appears before the title.',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Optional image for this section. Recommended size: 800x600px (4:3 aspect ratio).',
        }),
        defineField({
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'featureItem',
              title: 'Feature Item',
              fields: [
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  description: 'Image for this item. Recommended size: 400x300px (4:3 aspect ratio).',
                }),
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'additionalSections',
      title: 'Additional Sections',
      type: 'array',
      description: 'Optional additional sections. You can add multiple sections.',
      of: [
        {
          type: 'object',
          name: 'additionalSection',
          title: 'Additional Section',
          fields: [
            defineField({
              name: 'kicker',
              title: 'Kicker',
              type: 'string',
              description: 'Optional label that appears before the title.',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'media',
              title: 'Image / Video',
              type: 'object',
              description: 'Optional image or video for this section.',
              fields: [
                defineField({
                  name: 'type',
                  title: 'Media Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Image', value: 'image' },
                      { title: 'Video', value: 'video' },
                    ],
                    layout: 'radio',
                  },
                  initialValue: 'image',
                }),
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  hidden: ({ parent }) => parent?.type !== 'image',
                  description: 'Recommended size: 1200x800px (3:2 aspect ratio).',
                }),
                defineField({
                  name: 'videoUrl',
                  title: 'Video URL',
                  type: 'url',
                  hidden: ({ parent }) => parent?.type !== 'video',
                  description: 'YouTube, Vimeo, or other video URL.',
                }),
                defineField({
                  name: 'videoFile',
                  title: 'Video File',
                  type: 'file',
                  options: {
                    accept: 'video/*',
                  },
                  hidden: ({ parent }) => parent?.type !== 'video',
                  description: 'Upload a video file (MP4, WebM, etc.).',
                }),
              ],
            }),
            defineField({
              name: 'alignment',
              title: 'Content Alignment',
              type: 'string',
              options: {
                list: [
                  { title: 'Start (Left)', value: 'start' },
                  { title: 'Center', value: 'center' },
                  { title: 'End (Right)', value: 'end' },
                ],
                layout: 'radio',
              },
              initialValue: 'start',
              description: 'Text alignment for this section.',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'proofKicker',
      title: 'Proof Kicker',
      type: 'string',
    }),
    defineField({
      name: 'proofMetric',
      title: 'Proof Metric',
      type: 'string',
      description: 'Large metric value (e.g., "$47M").',
    }),
    defineField({
      name: 'proofContext',
      title: 'Proof Context',
      type: 'string',
    }),
    defineField({
      name: 'proofBody',
      title: 'Proof Body',
      type: 'text',
    }),
    defineField({
      name: 'proofCaseStudyLink',
      title: 'Case Study Reference',
      type: 'reference',
      to: [{type: 'caseStudy'}],
    }),
    defineField({
      name: 'ctaHeadline',
      title: 'CTA Headline',
      type: 'string',
    }),
    defineField({
      name: 'ctaBody',
      title: 'CTA Body',
      type: 'text',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
    }),
    defineField({
      name: 'metaKeywords',
      title: 'Meta Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'SEO keywords for this service page (e.g., "enterprise cloud transformation partner", "azure migration").',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
})
