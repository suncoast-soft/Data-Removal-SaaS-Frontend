import { sanityClient } from '@/utils/sanity/lib/client'
import RenderSanitySections from '@/components/sections/RenderSanitySections'
import { Page } from '@/sanity.types'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const pages = await sanityClient.fetch(`*[_type == "page"]{ slug }`)

  return pages.map((page: any) => ({ slug: page.slug.current }))
}

export default async function SlugPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  const data = await sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug: slug }
  )
  if (!data) {
    return notFound()
  }

  const { content } = data as Page

  return <RenderSanitySections slug={slug} content={content} />
}
