import Image from 'next/image'
import React from 'react'

export default function ArticlesSection() {
  return (
    <div className="overflow-x-auto flex flex-wrap lg:flex-nowrap gap-4 lg:gap-6 justify-center">
      <div className="w-[340px] min-w-[340px] px-0 py-6 lg:p-6 rounded-[20px] flex flex-col gap-4 lg:gap-6 justify-center">
        <Image
          src={'/result-article1.png'}
          width={340}
          height={340}
          alt={`Vector`}
        />
        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-[30px] leading-[33px] font-bold lg:text-[30px] lg:leading-[33px]">
            Article Title
          </h3>
          <p className="text-[22px] leading-[26px] text-center opacity-60">
            Author, date
          </p>
        </div>
      </div>

      <div className="w-[340px] min-w-[340px] p-6 rounded-[20px] flex flex-col gap-4 lg:gap-6 justify-center items-center">
        <Image
          src={'/result-article2.png'}
          width={340}
          height={340}
          alt={`Vector`}
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-[30px] leading-[33px] font-bold lg:text-[30px] lg:leading-[33px]">
            Article Title
          </h3>
          <p className="text-[22px] leading-[26px] text-center opacity-60">
            Author, date
          </p>
        </div>
      </div>

      <div className="w-[340px] min-w-[340px] p-6 rounded-[20px] flex flex-col gap-4 lg:gap-6 justify-center items-center">
        <Image
          src={'/result-article3.png'}
          width={340}
          height={340}
          alt={`Vector`}
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-[30px] leading-[33px] font-bold lg:text-[30px] lg:leading-[33px]">
            Article Title
          </h3>
          <p className="text-[22px] leading-[26px] text-center opacity-60">
            Author, date
          </p>
        </div>
      </div>
    </div>
  )
}
