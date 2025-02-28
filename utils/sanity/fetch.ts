import { sanityClient } from '@/utils/sanity/lib/client'
import { BlogPost } from '@/sanity.types'

export async function getBlogPostByRef(
  refId: string | undefined
): Promise<BlogPost | null> {
  if (!refId) return null

  return sanityClient.fetch(
    `*[_type == "blogPost" && _id == $refId][0]{
      title,
      slug,
      featuredImage,
      publishedAt,
      excerpt
    }`,
    { refId }
  )
}
