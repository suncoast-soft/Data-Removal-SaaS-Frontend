import ContactForm from '@/components/modules/AccountForms/ContactForm'
import Image from 'next/image'
import React from 'react'

export default async function contactUsPage() {
  return (
    <div className="bg-lp-hero-section-bg bg-cover bg-bottom py-[70px] lg:py-[100px]">
      <div className="container mx-auto px-4 lg:px-[110px]">
        <div className="flex items-center flex-col lg:flex-row justify-between gap-8 lg:gap-16">
          <div className="rounded-[30px] bg-dark p-4 py-6 lg:pb-10 lg:p-10 lg:w-1/2 flex-shrink-0">
            <h1 className="font-bold text-3xl lg:text-[44px] leading-tight text-white mb-4">
              Get in touch today
            </h1>

            <p className="font-light text-xl leading-snug tracking-wide mb-4 text-white/60">
              Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu
              dolorol egestas morbi sem vulputate etiam facilisis pellentesque
              ut quis.
            </p>

            <ContactForm />
          </div>

          <div>
            <Image
              src={'/contact-us-image.png'}
              width={554}
              height={708}
              alt={`Vector`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
