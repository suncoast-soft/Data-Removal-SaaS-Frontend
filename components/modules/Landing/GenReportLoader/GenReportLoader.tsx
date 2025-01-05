import Image from 'next/image'
import React from 'react'

export default function GenReportLoader({ searchTerm }: any) {
  return (
    <div className="bg-lp-hero-section-bg bg-cover bg-bottom pt-12 pb-[61px] lg:pb-[71px] text-darkMain h-[calc(100vh-60px)] fixed min-w-[100vw] min-h-screen top-0 left-0 z-[9999]">
      <div className="container mx-auto px-4 lg:px-[110px] h-full">
        <div className="text-center max-w-[543px] mx-auto h-full flex flex-col justify-center items-center gap-[67px] lg:gap-6">
          <Image
            src={'/loaders/hero-image.png'}
            width={309}
            height={358}
            alt={`Vector`}
            className="order-2 lg:order-1"
          />
          <div className="order-1 lg:order-2">
            <h1 className="text-[34px] lg:text-[50px] leading-[55px] font-bold text-center ">
              Generating your report
            </h1>
            <p className="mt-4 text-[22px] leading-[26px]  text-center opacity-60">
              This will only take a second
            </p>
            <p className="font-semibold text-[22px] leading-[26px]  text-center mt-4">
              Searching: ...{searchTerm}...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
