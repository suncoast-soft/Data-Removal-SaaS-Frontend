import { defineField, defineType, defineArrayMember } from 'sanity'

export const membersSection = defineType({
  name: 'membersSection',
  title: 'Members Section',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent'
    }),
    defineField({
      name: 'background_image',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'role', title: 'Role', type: 'string' }),
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
