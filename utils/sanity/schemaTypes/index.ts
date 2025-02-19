import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './contents/block'
import { heroSection } from './sections/hero'
import { featuredColumnsSection } from './sections/featuredColumns'
import { imageCTASection } from './sections/imageCTA'
import { twoColumnCTASection } from './sections/twoColumnCTA'
import { membersSection } from './sections/members'
import { richTextSection } from './sections/richText'
import { pageType } from './documents/page'
import { settingsType } from './documents/settings'
import { blogPostType } from './documents/blogPost'
import { blogCategoryType } from './documents/blogCategory'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    heroSection,
    featuredColumnsSection,
    imageCTASection,
    twoColumnCTASection,
    membersSection,
    richTextSection,
    blogPostType,
    blogCategoryType,
    pageType,
    settingsType
  ]
}
