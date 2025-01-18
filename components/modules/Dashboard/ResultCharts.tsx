import CleaningIcon from '@/components/icons/CleaningIcon'
import WebSearchIcon from '@/components/icons/WebSearchIcon'
import React from 'react'
import { PieChartCard } from '../PieChart/PieChart'
import { cn } from '@/utils/cn'
import Image from 'next/image'

const COLORS: Record<string, string> = {
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

interface Category {
  count: number | string
  title: string
  isFill?: boolean
}

interface ResultChartsProps {
  heroImage?: string
  title?: string
  subtitle?: string
  resultsCountSubtitle?: string
  wrapperClassName?: string
  categories: Category[]
}

export default function ResultCharts({
  heroImage,
  title,
  subtitle,
  resultsCountSubtitle,
  wrapperClassName,
  categories
}: ResultChartsProps) {
  // Render individual categories
  const renderCategories = () =>
    categories.map((c, index) => (
      <span
        key={index}
        className={cn(
          'p-2 h-24 flex items-center justify-center border border-dark/40 text-center rounded-2xl gap-4 w-48 lg:w-64',
          c.isFill ? 'bg-dark text-white' : 'bg-dark/5'
        )}
      >
        <span className={cn('text-secondary', !c.isFill && 'text-dark')}>
          {c.isFill ? <WebSearchIcon /> : <CleaningIcon />}
        </span>
        <span>
          <b className="font-bold text-2xl">{c.count}</b> {c.title}
        </span>
      </span>
    ))

  // Render pie charts
  const renderPieCharts = () => {
    const chartData = [
      {
        title: 'Results Removed',
        data: resultsRemovedData,
        legend: resultsRemovedLegend
      },
      {
        title: 'Result Types',
        data: resultTypesData,
        legend: resultTypesLegend
      },
      {
        title: 'Digital Footprint',
        data: digitalFootprintData,
        legend: digitalFootprintLegend
      }
    ]

    return chartData.map((chart, index) => (
      <div
        key={index}
        className="w-80 min-w-[340px] h-96 p-6 rounded-2xl border border-dark/10"
      >
        <PieChartCard
          title={chart.title}
          data={chart.data}
          legendItems={chart.legend}
        />
      </div>
    ))
  }

  return (
    <div className={cn(wrapperClassName)}>
      <div className="text-center mx-auto">
        {heroImage && (
          <Image
            width={233}
            height={185}
            src={heroImage}
            className="mx-auto"
            alt="Vector"
          />
        )}
        {title && (
          <h1 className="text-2xl lg:text-4xl font-bold text-center">
            {title}
          </h1>
        )}
        {resultsCountSubtitle && (
          <p className="my-2 text-xl lg:text-2xl text-center">
            {resultsCountSubtitle}{' '}
            <span className="text-primary font-bold">
              just through your name.
            </span>
          </p>
        )}
        {subtitle && (
          <p className="opacity-60 text-xl lg:text-2xl text-center">
            {subtitle}
          </p>
        )}
      </div>
      <div className="my-6 lg:my-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {renderCategories()}
        </div>
      </div>
      <div className="flex overflow-x-auto gap-4 lg:gap-6">
        {renderPieCharts()}
      </div>
    </div>
  )
}
