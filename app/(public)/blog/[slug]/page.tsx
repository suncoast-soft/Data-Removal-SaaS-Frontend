import { sanityClient } from '@/utils/sanity/lib/client'
import RenderSanitySections from '@/components/sections/RenderSanitySections'
import { BlogPost } from '@/sanity.types'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await sanityClient.fetch(`*[_type == "blogPost"]{ slug }`)

  return posts?.map((post: any) => ({ slug: post.slug.current }))
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  const data = await sanityClient.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]`,
    { slug: slug }
  )
  if (!data) {
    return notFound()
  }

  const { content } = data as BlogPost

  return <RenderSanitySections slug={slug} content={content} />
}
