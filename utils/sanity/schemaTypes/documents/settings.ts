import { CogIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const settingsType = defineType({
  name: 'settings',
  title: 'Global Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Site Name'
    }),
    defineField({
      name: 'description',
      type: 'string',
      title: 'Site Description'
    }),
    defineField({
      name: 'logo_white',
      type: 'image',
      title: 'White Logo',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'logo_dark',
      type: 'image',
      title: 'Dark Logo',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'navLinks',
      title: 'Header Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'link', title: 'URL', type: 'string' })
          ]
        })
      ]
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'link', title: 'URL', type: 'string' })
          ]
        })
      ]
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'icon', title: 'Icon', type: 'image' }),
            defineField({ name: 'link', title: 'URL', type: 'url' })
          ],
          preview: {
            select: {
              title: 'link',
              media: 'icon'
            }
          }
        })
      ]
    }),
    defineField({
      name: 'basicFeatures',
      title: 'Basic Features',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'pupGuardFeatures',
      title: 'PupGuard Features',
      type: 'array',
      of: [{ type: 'string' }]
    })
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo_dark'
    }
  }
})
