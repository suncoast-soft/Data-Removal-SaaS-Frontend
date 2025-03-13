import RenderSanitySections from '@/components/sections/RenderSanitySections'
import { Page } from '@/sanity.types'
import { sanityClient } from '@/utils/sanity/lib/client'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function FAQPage() {
  const data = await sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug: 'faq' }
  )
  if (!data) {
    return notFound()
  }

  const { slug, content } = data as Page

  return (
    <div className="bg-faqs-section-bg bg-cover bg-bottom pt-8 pb-16 text-dark">
      <RenderSanitySections slug={slug?.current} content={content} />
    </div>
  )
}
