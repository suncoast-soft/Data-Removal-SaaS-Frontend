import Hero from '../Hero'
import { Page, Settings } from '@/sanity.types'
import RichText from '../RichText'
import ImageCTA from '../ImageCTA'
import TwoColumnCTA from '../TwoColumnCTA'
import FeaturedColumns from '../FeaturedColumns'
import Members from '../Members'
import BlogThumbnail from '../BlogThumbnail'
import FAQs from '../FAQs'

interface SectionProps {
  slug?: string | undefined
  content: Page['content']
  settings: Settings
}

export default function RenderSanitySections({
  slug,
  content,
  settings
}: SectionProps) {
  return content?.map((section, index) => {
    switch (section._type) {
      case 'heroSection':
        return (
          <Hero key={index} slug={slug} data={section} settings={settings} />
        )
      case 'richTextSection':
        return <RichText key={index} data={section} />
      case 'imageCTASection':
        return <ImageCTA key={index} data={section} />
      case 'twoColumnCTASection':
        return <TwoColumnCTA key={index} data={section} />
      case 'featuredColumnsSection':
        return <FeaturedColumns key={index} data={section} index={index} />
      case 'membersSection':
        return <Members key={index} data={section} />
      case 'faqsSection':
        return <FAQs key={index} data={section} />
      case 'blogThumbnailSection':
        return <BlogThumbnail key={index} data={section} index={index} />
      default:
        return null
    }
  })
}
