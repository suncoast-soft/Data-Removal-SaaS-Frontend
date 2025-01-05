import React from 'react'
import FAQs from '../Landing/FAQs/FAQs'

export default function FaqsSection() {
  return (
    <div className="bg-result-faqs-bg rounded-[30px] px-4 py-6 lg:px-[32px] lg:py-[36px]">
      <div className="mb-4 lg:mb-[33px]">
        <h2 className="text-2xl lg:text-[32px] lg:leading-[35px] font-bold text-center ">
          FAQs
        </h2>
        <p className="opacity-60 text-lg lg:text-[22px] lg:leading-[26px] mt-4">
          Learn more about how puperase works
        </p>
      </div>
      <FAQs
        accordionItemClassName="!p-4 !border-none !bg-white !text-darkMain w-full !h-fit lg:max-w-[48%] mb-0"
        accordionTriggerClassName="!text-base lg:!text-lg [&[data-state=open]>div]:rotate-45"
        accordionContentClassName="!text-darkMain text-sm lg:text-base [&>hr]:hidden"
        accordionClassName="flex flex-wrap gap-2 lg:gap-4"
      />
    </div>
  )
}
