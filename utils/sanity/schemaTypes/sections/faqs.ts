import { defineField, defineType } from 'sanity'

export const faqsSection = defineType({
  name: 'faqsSection',
  title: 'FAQs Section',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true }
    }),
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
      name: 'columns',
      title: 'Columns',
      type: 'number',
      options: {
        list: [
          { title: '1 Column', value: 1 },
          { title: '2 Columns', value: 2 }
        ],
        layout: 'radio'
      }
    })
  ],
  preview: {
    select: {
      title: 'title'
    }
  },
  initialValue: {
    columns: 1
  }
})
