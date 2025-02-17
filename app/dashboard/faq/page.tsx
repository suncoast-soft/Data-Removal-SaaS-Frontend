import PublicFAQs from '@/components/sections/PublicFAQs'
import Image from 'next/image'
import React from 'react'

export default function FAQPage() {
  return (
    <div className="bg-faqs-section-bg bg-cover bg-bottom pt-8 pb-16 text-dark">
      <div className="container max-w-5xl">
        <div className="text-center max-w-2xl mx-auto flex flex-col justify-center">
          <Image
            src={'/faq/hero-image.png'}
            width={539}
            height={335}
            alt={`Vector`}
            className="object-contain mx-auto mb-4"
          />

          <h1 className="text-4xl font-bold text-center">
            Frequently Asked Questions
          </h1>

          <p className="mt-4 text-lg text-center text-dark/60">
            Cras tincidunt lobortis feugiat vivamus at morbi leo urna molestie
            atole elementum eu facilisis faucibus interdum posuere.
          </p>
        </div>

        <div className="mt-6 lg:mt-10">
          <PublicFAQs />
        </div>
      </div>
    </div>
  )
}
