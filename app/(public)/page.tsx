import { sanityClient } from '@/utils/sanity/lib/client'
import { Page } from '@/sanity.types'
import RenderSanitySections from '@/components/sections/RenderSanitySections'

export default async function HomePage() {
  const data = await sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug: 'home' }
  )

  const { slug, content } = data as Page

  return <RenderSanitySections slug={slug?.current} content={content} />
}
