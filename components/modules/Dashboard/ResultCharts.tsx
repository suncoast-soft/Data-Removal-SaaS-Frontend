import CleaningIcon from '@/components/icons/CleaningIcon'
import WebSearchIcon from '@/components/icons/WebSearchIcon'
import React from 'react'
import { PieChartCard } from '../PieChart/PieChart'
import { cn } from '@/utils/cn'
import { Tabs } from '@radix-ui/react-tabs'
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Loading from '../Loading/Loading'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import FAQs from '../Landing/FAQs/FAQs'

const COLORS = {
  GREEN: '#97D700',
  BLUE: '#3B82F6',
  CORAL: '#FF7F66',
  BLACK: '#1F2937'
}

const resultsRemovedData = [
  { name: 'Green Achieved', value: 25, color: COLORS.GREEN },
  { name: 'Blue Achieved', value: 25, color: COLORS.BLUE },
  { name: 'Remaining 1', value: 25, color: COLORS.CORAL },
  { name: 'Remaining 2', value: 25, color: COLORS.BLACK }
]

const resultsRemovedLegend = [
  { name: 'Achieved', color: COLORS.GREEN },
  { name: 'Remaining', color: COLORS.CORAL },
  { name: 'Achieved', color: COLORS.BLUE },
  { name: 'Remaining', color: COLORS.BLACK }
]

const resultTypesData = [
  { name: 'Social Media', value: 35, color: COLORS.GREEN },
  { name: 'Achieved', value: 35, color: COLORS.BLUE },
  { name: 'Addresses', value: 10, color: COLORS.CORAL },
  { name: 'Remaining', value: 20, color: COLORS.BLACK }
]

const resultTypesLegend = [
  { name: 'Social Media', color: COLORS.GREEN },
  { name: 'Addresses', color: COLORS.CORAL },
  { name: 'Achieved', color: COLORS.BLUE },
  { name: 'Remaining', color: COLORS.BLACK }
]

const digitalFootprintData = [
  { name: 'Achieved 1', value: 30, color: COLORS.GREEN },
  { name: 'Achieved 2', value: 25, color: COLORS.BLUE },
  { name: 'Remaining 1', value: 25, color: COLORS.CORAL },
  { name: 'Remaining 2', value: 20, color: COLORS.BLACK }
]

const digitalFootprintLegend = [
  { name: 'Achieved', color: COLORS.GREEN },
  { name: 'Remaining', color: COLORS.CORAL },
  { name: 'Achieved', color: COLORS.BLUE },
  { name: 'Remaining', color: COLORS.BLACK }
]

export default function ResultCharts({
  heroImage,
  title,
  subtitle,
  resultsCountSubtitle,
  wrapperClassName,
  categories
}: {
  heroImage?: string
  title?: string
  subtitle?: string
  resultsCountSubtitle?: string
  wrapperClassName?: string
  categories: any
}) {
  return (
    <div className={cn(wrapperClassName)}>
      <div className="text-center mx-auto">
        {heroImage ? (
          <Image
            width={233}
            height={185}
            src={heroImage}
            className="text-center mx-auto"
            alt="Vector"
          />
        ) : null}
        {title ? (
          <h1 className="text-[34px] lg:text-[50px] leading-[55px] font-bold text-center ">
            {title}
          </h1>
        ) : null}
        {resultsCountSubtitle ? (
          <p className="my-2 text-2xl lg:text-[22px] lg:leading-[55px]  text-center">
            {resultsCountSubtitle}
            <span className="text-greenMain font-bold">
              {' '}
              just through your name.
            </span>
          </p>
        ) : null}
        {subtitle ? (
          <p className="opacity-60 text-[22px] leading-[26px] subtitle">
            {subtitle}
          </p>
        ) : null}
      </div>
      <div className="mb-6 mt-6 lg:mt-[32px]">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((c: any) => (
            <span
              className={cn(
                'p-2 h-[96px] flex items-center justify-center  border border-darkMain/40 text-center rounded-2xl text-base gap-4 w-[191px] lg:w-[255px] category-box',
                c.isFill ? 'bg-darkMain text-white' : 'bg-[#342E3705]'
              )}
            >
              <span
                className={cn(
                  'text-orangeMain',
                  !c.isFill ? 'text-darkMain' : ''
                )}
              >
                {c.isFill ? <WebSearchIcon /> : <CleaningIcon />}
              </span>
              <span>
                <b className="font-bold text-2xl">{c.count} </b>
                {c.title}
              </span>
            </span>
          ))}
        </div>
      </div>
      <div className="flex overflow-x-auto gap-2 lg:gap-6 flex-wrap lg:flex-nowrap">
        <div className="w-[340px] min-w-[340px] h-[400px] p-6 rounded-[20px] border-[1.4px] border-darkMain/10">
          <PieChartCard
            title="Results Removed"
            data={resultsRemovedData}
            legendItems={resultsRemovedLegend}
          />
        </div>
        <div className="w-[340px] min-w-[340px] h-[400px] p-6 rounded-[20px] border-[1.4px] border-darkMain/10">
          <PieChartCard
            title="Result Types"
            data={resultTypesData}
            legendItems={resultTypesLegend}
          />
        </div>
        <div className="w-[340px] min-w-[340px] h-[400px] p-6 rounded-[20px] border-[1.4px] border-darkMain/10">
          <PieChartCard
            title="Digital footprint"
            data={digitalFootprintData}
            legendItems={digitalFootprintLegend}
          />
        </div>
      </div>
    </div>
  )
}
