import { defineField, defineType, defineArrayMember } from 'sanity'

export const faqsSection = defineType({
  name: 'faqsSection',
  title: 'FAQs Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string'
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'blockContent'
            })
          ],
          preview: {
            select: {
              title: 'question'
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
})
