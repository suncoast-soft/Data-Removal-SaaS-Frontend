import { defineField, defineType, defineArrayMember } from 'sanity'

export const imageCTASection = defineType({
  name: 'imageCTASection',
  title: 'Image CTA Section',
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
      type: 'array',
      of: [{ type: 'block' }]
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Button Text', type: 'string' }),
            defineField({ name: 'link', title: 'URL', type: 'string' })
          ]
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    }
  }
})
