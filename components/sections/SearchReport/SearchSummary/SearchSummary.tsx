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
  const totalSearches = 4 + brokerSearches.length

  const successfulSearches =
    Array(googleSearches[0].search_result).length +
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
      count: '0/100',
      text: 'search results removed',
      color: 'bg-dark/5 text-dark'
    },
    {
      icon: <CleaningIcon />,
      count: '0/100',
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
      <div className="grid grid-cols-4 gap-2 mb-5">
        {reportMetrics.map((card, index) => (
          <MetricsCard key={index} card={card} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-5">
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
