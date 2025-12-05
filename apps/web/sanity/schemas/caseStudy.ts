import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
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
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      description: 'Short label shown above the headline (e.g., "Global Financial Services").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cardHeadline',
      title: 'Card Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metricLarge',
      title: 'Large Metric',
      type: 'string',
      description: 'Headline result metric (e.g., "$47M").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metricContext',
      title: 'Metric Context',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          {title: 'Financial Services', value: 'financial'},
          {title: 'Healthcare', value: 'healthcare'},
          {title: 'Manufacturing', value: 'manufacturing'},
          {title: 'Energy', value: 'energy'},
          {title: 'Retail', value: 'retail'},
        ],
      },
    }),
    defineField({
      name: 'executionType',
      title: 'Execution Type',
      type: 'string',
      options: {
        list: [
          {title: 'Cloud Transformation', value: 'cloud'},
          {title: 'AI & Data', value: 'ai-data'},
          {title: 'Digital Product', value: 'digital-product'},
          {title: 'Core Systems', value: 'core-systems'},
        ],
      },
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'text',
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'technologiesUsed',
      title: 'Technologies Used',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'clientQuotes',
      title: 'Client Quotes',
      type: 'array',
      description: 'Optional client testimonial quotes. Add multiple quotes to create a carousel.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Quote Text',
              type: 'text',
              rows: 4,
              description: 'The testimonial quote from the client.',
            }),
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              description: 'Name of the person who provided the quote.',
            }),
            defineField({
              name: 'designation',
              title: 'Designation',
              type: 'string',
              description: 'Job title or role of the person (e.g., "Chief Technology Officer").',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Image used for thumbnails, hero sections, and social media previews.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility and SEO.',
        }),
      ],
    }),
    defineField({
      name: 'featuredMedia',
      title: 'Featured Media',
      type: 'object',
      description: 'Main featured content (image or video) displayed in the case study detail page.',
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
          options: { hotspot: true },
          hidden: ({ parent }) => parent?.type !== 'image',
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Alternative text for accessibility and SEO.',
            }),
          ],
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
        defineField({
          name: 'videoUrl',
          title: 'Video URL',
          type: 'url',
          hidden: ({ parent }) => parent?.type !== 'video',
          description: 'Optional: YouTube, Vimeo, or other video URL. Use this or upload a video file.',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      description: 'SEO metadata for search engines and social sharing.',
      fields: [
        defineField({
          name: 'title',
          title: 'Meta Title',
          type: 'string',
          description: 'Title for search results and social shares (50-60 characters recommended).',
        }),
        defineField({
          name: 'description',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Description for search results and social shares (150-160 characters recommended).',
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Target SEO keywords for this case study.',
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Image for social media shares (1200x630px recommended). Falls back to Featured Media if not set.',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'industry',
      media: 'featuredImage',
    },
  },
})
