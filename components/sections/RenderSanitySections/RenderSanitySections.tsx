import Hero from '../Hero'
import { Page } from '@/sanity.types'
import RichText from '../RichText'
import ImageCTA from '../ImageCTA'
import TwoColumnCTA from '../TwoColumnCTA'
import FeaturedColumns from '../FeaturedColumns'
import Members from '../Members'

interface SectionProps {
  slug: string | undefined
  content: Page['content']
}

export default function RenderSanitySections({ slug, content }: SectionProps) {
  return content?.map((section, index) => {
    switch (section._type) {
      case 'heroSection':
        return <Hero key={index} slug={slug} data={section} />
      case 'richTextSection':
        return <RichText key={index} data={section} />
      case 'imageCTASection':
        return <ImageCTA key={index} data={section} />
      case 'twoColumnCTASection':
        return <TwoColumnCTA key={index} data={section} />
      case 'featuredColumnsSection':
        return <FeaturedColumns key={index} data={section} />
      case 'membersSection':
        return <Members key={index} data={section} />
      default:
        return null
    }
  })
}
