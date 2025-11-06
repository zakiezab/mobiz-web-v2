import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactSubmission',
  title: 'Contact Submission',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'email'}),
    defineField({name: 'company', title: 'Company', type: 'string'}),
    defineField({name: 'message', title: 'Message', type: 'text'}),
    defineField({
      name: 'utm',
      title: 'UTM Parameters',
      type: 'object',
      fields: [
        defineField({name: 'source', title: 'Source', type: 'string'}),
        defineField({name: 'medium', title: 'Medium', type: 'string'}),
        defineField({name: 'campaign', title: 'Campaign', type: 'string'}),
      ],
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
  },
})
