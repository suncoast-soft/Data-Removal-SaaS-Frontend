'use client'

import CleaningIcon from '@/components/icons/CleaningIcon'
import WebSearchIcon from '@/components/icons/WebSearchIcon'
import MetricsCard from '@/components/modules/MetricsCard'
import MetricsChart from '@/components/modules/MetricsChart'
import { Badge } from '@/components/ui/badge'
import { Json } from '@/types_db'
import {
  digitalFootprintData,
  digitalFootprintLegend,
  resultsRemovedData,
  resultsRemovedLegend,
  resultTypesData,
  resultTypesLegend,
  tags
} from '@/utils/const'

interface SectionProps {
  searches: {
    broker_type: string
    search_result: Json
  }[]
}

export default function SearchSummary({ searches }: SectionProps) {
  const reportMetrics = [
    {
      icon: <WebSearchIcon />,
      count: `300`,
      text: 'sites searched',
      color: 'bg-dark text-white'
    },
    {
      icon: <WebSearchIcon />,
      count: `${searches.length}`,
      text: 'sites found',
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
