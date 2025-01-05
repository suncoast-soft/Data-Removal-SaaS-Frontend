import FAQs from '@/components/modules/Landing/FAQs/FAQs'
import Image from 'next/image'
import React from 'react'

export default function FAQPage() {
  return (
    <div className="bg-faqs-section-bg bg-cover bg-bottom pt-7 pb-[61px] lg:pb-[71px] text-darkMain">
      <div className="container mx-auto px-4 lg:px-[110px] max-w-[1245px]">
        <div className="text-center max-w-[648px] mx-auto flex flex-col justify-center">
          <Image
            src={'/faq/hero-image.png'}
            width={539}
            height={335}
            alt={`Vector`}
          />
          <h1 className="text-[34px] lg:text-[50px] leading-[55px] font-bold text-center ">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg leading-[18px] lg:text-[22px] lg:leading-[26px]  text-center opacity-60">
            Cras tincidunt lobortis feugiat vivamus at morbi leo urna molestie
            atole elementum eu facilisis faucibus interdum posuere.
          </p>
        </div>
        <div className="mt-6 lg:mt-10 ">
          <FAQs />
        </div>
      </div>
    </div>
  )
}
