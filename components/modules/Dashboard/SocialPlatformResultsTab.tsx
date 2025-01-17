import React from 'react'
import HelpBanner from './HelpBanner'
import { SlidersHorizontal } from 'lucide-react'
import ResultItem from './ResultItem'

interface Result {
  name: string
  url: string
  subUrl?: string
  date: string
}

interface SocialPlatformResultsTabProps {
  data: Result[]
  searchTerm?: string
}

export default function SocialPlatformResultsTab({
  data,
  searchTerm = 'Joe Smith'
}: SocialPlatformResultsTabProps) {
  return (
    <div className="border border-darkMain/10 bg-darkMain/5 rounded-2xl py-6 px-6 flex flex-wrap gap-6 justify-between items-center">
      {/* Results Section */}
      <div className="flex-1">
        <div className="mb-6 flex gap-4 items-center text-mainDark">
          <SlidersHorizontal />
          <p className="text-lg font-semibold">
            {data.length} Results for your profile:{' '}
            <span className="text-orangeMain">“{searchTerm}”</span>
          </p>
        </div>
        <div className="text-darkMain">
          {data.map((item, index) => (
            <ResultItem
              key={index}
              item={item}
              isLast={index === data.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Help Banner */}
      <div className="max-w-md flex h-full items-center">
        <HelpBanner />
      </div>
    </div>
  )
}
