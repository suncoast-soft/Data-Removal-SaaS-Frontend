import { defineField, defineType, defineArrayMember } from 'sanity'

export const featuredColumnsSection = defineType({
  name: 'featuredColumnsSection',
  title: 'Featured Columns Section',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true }
            }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text'
            })
          ]
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
