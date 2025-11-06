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
