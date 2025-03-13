import { sanityClient } from '@/utils/sanity/lib/client'
import { Page, Settings } from '@/sanity.types'
import RenderSanitySections from '@/components/sections/RenderSanitySections'
import { notFound } from 'next/navigation'

export default async function HomePage() {
  const data = await sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug: 'home' }
  )
  if (!data) {
    return notFound()
  }

  const { slug, content } = data as Page

  const settings = ((await sanityClient.fetch(`*[_type == "settings"][0]`)) ??
    {}) as Settings

  return (
    <RenderSanitySections
      slug={slug?.current}
      content={content}
      settings={settings}
    />
  )
}
