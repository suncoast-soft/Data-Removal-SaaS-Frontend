import { defineType, defineField } from 'sanity'

export const richTextSection = defineType({
  name: 'richTextSection',
  title: 'Rich Text Section',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent'
    })
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
})
