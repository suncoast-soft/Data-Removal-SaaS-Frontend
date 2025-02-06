'use client'

import CleaningIcon from '@/components/icons/CleaningIcon'
import WebSearchIcon from '@/components/icons/WebSearchIcon'
import MetricsCard from '@/components/modules/MetricsCard'
import MetricsChart from '@/components/modules/MetricsChart'
import { Badge } from '@/components/ui/badge'
import { Tables } from '@/types_db'
import {
  digitalFootprintData,
  digitalFootprintLegend,
  resultsRemovedData,
  resultsRemovedLegend,
  resultTypesData,
  resultTypesLegend,
  tags
} from '@/utils/const'
import Image from 'next/image'

type GoogleSearch = Tables<'google_searches'>
type BrokerSearch = Tables<'broker_searches'>

interface SectionProps {
  googleSearches: GoogleSearch[]
  brokerSearches: BrokerSearch[]
}

export default function SearchSummary({
  googleSearches,
  brokerSearches
}: SectionProps) {
  const totalSearches =
    (Array.isArray(googleSearches[0]?.search_result)
      ? googleSearches[0].search_result.length
      : 0) + brokerSearches.length

  const successfulSearches =
    (Array.isArray(googleSearches[0]?.search_result)
      ? googleSearches[0].search_result.length
      : 0) +
    brokerSearches.filter((search) => search.search_status === 'completed')
      .length

  const reportMetrics = [
    {
      icon: <WebSearchIcon />,
      count: `${totalSearches}`,
      text: 'sites searched',
      color: 'bg-dark text-white'
    },
    {
      icon: <WebSearchIcon />,
      count: `${successfulSearches}`,
      text: 'results found',
      color: 'bg-dark text-white'
    },
    {
      icon: <CleaningIcon />,
      count: `0/${successfulSearches}`,
      text: 'search results removed',
      color: 'bg-dark/5 text-dark'
    },
    {
      icon: <CleaningIcon />,
      count: `0/${successfulSearches}`,
      text: 'broker reports removed',
      color: 'bg-dark/5 text-dark'
    }
  ]

  const reportCharts = [
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

  return (
    <div className="my-8">
      <Image
        width={233}
        height={185}
        src={'/free-dashboard-image.png'}
        className="mx-auto mb-4"
        alt="Vector"
      />

      <h1 className="text-2xl lg:text-4xl font-bold text-center mb-2">
        We found your personal data on {successfulSearches}
      </h1>

      <p className="text-lg lg:text-xl text-dark/70 text-center mb-8">
        Don’t worry, we’re here to erase them for you
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-5">
        {reportMetrics.map((card, index) => (
          <MetricsCard key={index} card={card} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-2 mb-5">
        {reportCharts.map((chart, index) => (
          <MetricsChart
            key={index}
            title={chart.title}
            data={chart.data}
            legendItems={chart.legend}
          />
        ))}
      </div>

      <div className="flex flex-row flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge key={index}>
            <span className="text-xs font-light">{tag}</span>
          </Badge>
        ))}
      </div>
    </div>
  )
}
