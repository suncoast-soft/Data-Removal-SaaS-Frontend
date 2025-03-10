import SanityImage from '@/components/modules/SanityImage'
import { Button } from '@/components/ui/button'
import { BlogPost, BlogThumbnailSection } from '@/sanity.types'
import { cn } from '@/utils/cn'
import { getBlogPostByRef } from '@/utils/sanity/fetch'
import { getUser } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import { format } from 'date-fns'
import { TimerIcon } from 'lucide-react'
import Link from 'next/link'

export default async function BlogThumbnail({
  data,
  index
}: {
  data: BlogThumbnailSection
  index: number
}) {
  const supabase = await createClient()
  const user = await getUser(supabase)

  const blogData = await getBlogPostByRef(data.selectedBlog?._ref)

  const { title, slug, featuredImage, publishedAt, excerpt } =
    blogData as BlogPost

  return (
    <section className={cn('py-12 lg:py-20', index % 2 === 0 && 'bg-sky')}>
      <div className="container max-w-4xl">
        <div
          className={cn(
            'flex flex-col md:flex-row md:items-center gap-8',
            index % 2 === 0 && 'md:flex-row-reverse'
          )}
        >
          <SanityImage
            src={featuredImage}
            width={500}
            height={500}
            alt={title}
            className="w-full md:w-1/2"
          />

          <div className="w-full md:w-1/2 p-5">
            {title && (
              <h3 className="text-2xl lg:text-3xl font-bold text-dark mb-2">
                {title}
              </h3>
            )}

            {excerpt && <p className="line-clamp-3 mb-4">{excerpt}</p>}

            {publishedAt && (
              <p className="flex items-center gap-1 mb-4">
                <TimerIcon size={20} className="text-primary" />
                <span>{format(new Date(publishedAt), 'PPP')}</span>
              </p>
            )}

            <Button
              variant="default"
              size="small"
              className="font-semibold"
              asChild
            >
              <Link
                href={
                  user
                    ? `/dashboard/blog/${slug?.current}`
                    : `/blog/${slug?.current}`
                }
              >
                Read More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
