import { defineField, defineType, defineArrayMember } from 'sanity'

export const twoColumnCTASection = defineType({
  name: 'twoColumnCTASection',
  title: 'Two Column CTA Section',
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
              name: 'title',
              title: 'Column Title',
              type: 'string'
            }),
            defineField({
              name: 'subtitle',
              title: 'Column Subtitle',
              type: 'string'
            }),
            defineField({
              name: 'description',
              title: 'Column Description',
              type: 'text'
            }),
            defineField({
              name: 'image',
              title: 'Column Image',
              type: 'image',
              options: { hotspot: true }
            }),
            defineField({
              name: 'features',
              title: 'Features List',
              type: 'array',
              of: [{ type: 'string' }]
            }),
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string'
            }),
            defineField({
              name: 'buttonLink',
              title: 'Button Link',
              type: 'string'
            }),
            defineField({
              name: 'backgroundType',
              title: 'Background Type',
              type: 'string',
              options: {
                list: ['white', 'dark']
              }
            }),
            defineField({
              name: 'columnWidth',
              title: 'Column Width',
              type: 'number'
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
