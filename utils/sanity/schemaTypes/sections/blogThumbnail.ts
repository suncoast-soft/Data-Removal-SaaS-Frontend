import { defineField, defineType } from 'sanity'

export const blogThumbnailSection = defineType({
  name: 'blogThumbnailSection',
  title: 'Blog Thumbnail Section',
  type: 'object',
  fields: [
    defineField({
      name: 'selectedBlog',
      title: 'Selected Blog',
      type: 'reference',
      to: [{ type: 'blogPost' }],
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'selectedBlog.title',
      media: 'selectedBlog.thumbnail'
    },
    prepare({ title, media }) {
      return {
        title: title || 'No blog selected',
        media
      }
    }
  }
})
