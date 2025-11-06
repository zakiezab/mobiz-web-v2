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
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
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
          description: 'Image for social media shares (1200x630px recommended). Falls back to Featured Image if not set.',
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
