import React from 'react'
import HelpBanner from './HelpBanner'
import { cn } from '@/utils/cn'
import { SlidersHorizontal } from 'lucide-react'
import ResultItem from './ResultItem'

export default function SocialPlatformResultsTab({
  data,
  searchTerm = 'Joe Smith'
}: any) {
  return (
    <div className="border border-darkMain/10 bg-[#342E3705] rounded-[20px] pb-[26px] lg:pb-[15px] py-[15px] flex flex-wrap gap-6 justify-between px-[30px] items-center">
      <div>
        <div className="mb-6 lg:mb-[32px] flex gap-4 items-center text-mainDark">
          <SlidersHorizontal />
          <p className="text-lg font-semibold">
            {data?.length} Results for your profile:{' '}
            <span className="text-orangeMain">“{searchTerm}”</span>
          </p>
        </div>
        <div className="min-w-[50%] text-darkMain">
          {data?.map((item: any, i: number) => (
            <ResultItem item={item} isLast={i === data?.length - 1} />
          ))}
        </div>
      </div>

      <div className="max-w-[421px] flex h-full items-center">
        <HelpBanner />
      </div>
    </div>
  )
}
