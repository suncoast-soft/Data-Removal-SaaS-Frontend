import ContactForm from '@/components/modules/AccountForms/ContactForm'
import Image from 'next/image'
import React from 'react'

export default async function contactUsPage() {
  return (
    <div className="bg-lp-hero-section-bg bg-cover bg-bottom py-[70px] lg:py-[100px]">
      <div className="container mx-auto px-4 lg:px-[110px]">
        <div className="flex items-center flex-col lg:flex-row gap-[39px] lg:gap-[50px]">
          <div className="rounded-[30px] bg-dark p-4 py-6 lg:pb-10 lg:p-10 max-w-[616px]">
            <h1 className="font-bold text-[43px] lg:text-[50px] text-white leading-[55px] mb-4 lg:mb-6">
              Get in touch today
            </h1>
            <p className="font-normal text-lg lg:text-[22px] leading-[26px] mb-4 lg:mb-6 text-white opacity-60">
              Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu
              dolorol egestas morbi sem vulputate etiam facilisis pellentesque
              ut quis.
            </p>
            <ContactForm />
          </div>
          <div className="">
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
