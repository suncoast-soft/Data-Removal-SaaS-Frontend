'use client'

import CleaningIcon from '@/components/icons/CleaningIcon'
import WebSearchIcon from '@/components/icons/WebSearchIcon'
import MetricsCard from '@/components/modules/MetricsCard'
import MetricsChart from '@/components/modules/MetricsChart'
import { Badge } from '@/components/ui/badge'
import { Tables } from '@/types_db'
import { tags } from '@/utils/const'
import { hasKeyInData } from '@/utils/helpers'
import Image from 'next/image'

type GoogleSearch = Tables<'google_searches'>
type BrokerSearch = Tables<'broker_searches'>

interface SectionProps {
  googleSearches: GoogleSearch[]
  brokerSearches: BrokerSearch[]
}

const COLORS: Record<string, string> = {
  GREEN: '#97D700',
  BLUE: '#3B82F6',
  CORAL: '#FF7F66',
  BLACK: '#1F2937'
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

  const removalStatusData = [
    {
      name: 'Achieved',
      value: brokerSearches.filter(
        (search) => search.removal_status === 'completed'
      ).length,
      color: COLORS.GREEN
    },
    {
      name: 'In Progress',
      value: brokerSearches.filter((search) =>
        ['in_progress', 'need_customer_action'].includes(
          search.removal_status ?? 'queued'
        )
      ).length,
      color: COLORS.BLUE
    },
    {
      name: 'Failed',
      value: brokerSearches.filter(
        (search) => search.removal_status === 'failed'
      ).length,
      color: COLORS.CORAL
    },
    {
      name: 'Remaining',
      value: brokerSearches.filter(
        (search) =>
          search.removal_status === 'queued' || search.removal_status === null
      ).length,
      color: COLORS.BLACK
    }
  ]

  const sourceTypeData = [
    {
      name: 'Broker',
      value: brokerSearches.length,
      color: COLORS.GREEN
    },
    {
      name: 'Google',
      value: googleSearches.length,
      color: COLORS.BLUE
    },
    {
      name: 'Bing',
      value: 0,
      color: COLORS.CORAL
    },
    {
      name: 'Other',
      value: 0,
      color: COLORS.BLACK
    }
  ]

  const resultTypeData = [
    {
      name: 'Address',
      value: brokerSearches.filter((search) =>
        hasKeyInData(search.search_result, ['address'])
      ).length,
      color: COLORS.GREEN
    },
    {
      name: 'Email',
      value: brokerSearches.filter((search) =>
        hasKeyInData(search.search_result, ['email'])
      ).length,
      color: COLORS.BLUE
    },
    {
      name: 'Phone',
      value: brokerSearches.filter((search) =>
        hasKeyInData(search.search_result, ['phone'])
      ).length,
      color: COLORS.CORAL
    },
    {
      name: 'Other',
      value: brokerSearches.filter((search) =>
        hasKeyInData(search.search_result, [], true)
      ).length,
      color: COLORS.BLACK
    }
  ]

  const reportCharts = [
    {
      title: 'Results Removed',
      data: removalStatusData
    },
    {
      title: 'Data source Types',
      data: sourceTypeData
    },
    {
      title: 'Result Types',
      data: resultTypeData
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
          <MetricsChart key={index} title={chart.title} data={chart.data} />
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
