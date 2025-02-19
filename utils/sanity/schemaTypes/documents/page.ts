import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title'
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text'
        }),
        defineField({ name: 'metaImage', title: 'Meta Image', type: 'image' })
      ]
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        defineArrayMember({ type: 'heroSection' }),
        defineArrayMember({ type: 'featuredColumnsSection' }),
        defineArrayMember({ type: 'imageCTASection' }),
        defineArrayMember({ type: 'twoColumnCTASection' }),
        defineArrayMember({ type: 'membersSection' }),
        defineArrayMember({ type: 'richTextSection' })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'seo.metaImage'
    }
  }
})
