'use client'

import CleaningIcon from '@/components/icons/CleaningIcon'
import WebSearchIcon from '@/components/icons/WebSearchIcon'
import MetricsCard from '@/components/modules/MetricsCard'
import MetricsChart from '@/components/modules/MetricsChart'
import { Button } from '@/components/ui/button'
import { Tables } from '@/types_db'
import { hasKeyInData } from '@/utils/helpers'
import { getBuyLink } from '@/utils/stripe/client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type BrokerSearch = Tables<'broker_searches'>

interface SectionProps {
  brokerSearches: BrokerSearch[]
  hasAccount: boolean
  isPremium: boolean
}

export default function SearchSummary({
  brokerSearches,
  hasAccount,
  isPremium
}: SectionProps) {
  const [buyLink, setBuyLink] = useState('')
  useEffect(() => {
    async function handle() {
      const link = await getBuyLink()
      setBuyLink(link)
    }
    handle()
  }, [])

  const totalSearches = brokerSearches.length

  const successfulSearches = brokerSearches.filter(
    (search) => search.search_status === 'completed'
  ).length

  const reportMetrics = [
    {
      icon: <WebSearchIcon />,
      count: `${totalSearches}`,
      text: 'Data brokers searched',
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
      color: 'bg-primary fill-primary'
    },
    {
      name: 'In Progress',
      value: brokerSearches.filter((search) =>
        ['in_progress', 'need_customer_action'].includes(
          search.removal_status ?? 'queued'
        )
      ).length,
      color: 'bg-blue fill-blue'
    },
    {
      name: 'Failed',
      value: brokerSearches.filter(
        (search) => search.removal_status === 'failed'
      ).length,
      color: 'bg-secondary fill-secondary'
    },
    {
      name: 'Remaining',
      value: brokerSearches.filter(
        (search) =>
          search.removal_status === 'queued' || search.removal_status === null
      ).length,
      color: 'bg-slate-900 fill-slate-900'
    }
  ]

  const resultTypeData = [
    {
      name: 'Address',
      value: brokerSearches.filter((search) =>
        hasKeyInData(search.search_result, 'address')
      ).length,
      color: 'bg-primary fill-primary'
    },
    {
      name: 'Email',
      value: brokerSearches.filter((search) =>
        hasKeyInData(search.search_result, 'email')
      ).length,
      color: 'bg-blue fill-blue'
    },
    {
      name: 'Phone',
      value: brokerSearches.filter((search) =>
        hasKeyInData(search.search_result, 'phone')
      ).length,
      color: 'bg-secondary fill-secondary'
    },
    {
      name: 'Other',
      value:
        brokerSearches.filter((search) =>
          hasKeyInData(search.search_result, null, [
            'email',
            'address',
            'phone',
            'first_name',
            'last_name'
          ])
        ).length / 3,
      color: 'bg-slate-900 fill-slate-900'
    }
  ]

  const reportCharts = [
    {
      title: 'Result Types',
      data: resultTypeData
    },
    {
      title: 'Results Removed',
      data: removalStatusData
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

      <h1 className="text-2xl lg:text-4xl font-bold text-center mb-12">
        We found your personal information on {successfulSearches} data broker
        sites
      </h1>

      <div className="max-w-3xl mx-auto grid lg:grid-cols-3 gap-3 mb-5">
        {reportMetrics.map((card, index) => (
          <MetricsCard key={index} card={card} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-3 mb-5">
        {reportCharts.map((chart, index) => (
          <MetricsChart key={index} title={chart.title} data={chart.data} />
        ))}
        <div className="flex flex-col gap-3">
          {!hasAccount && (
            <div className="w-full flex-grow p-4 rounded-2xl bg-dark/5 flex flex-col justify-center">
              <h3 className="text-2xl font-bold">
                Create a <strong>FREE</strong> account
              </h3>
              <p className="text-sm mb-3">
                to access your full report (free to view, forever)
              </p>
              <Button variant="secondary" asChild>
                <Link href="/auth/register">START FOR FREE</Link>
              </Button>
            </div>
          )}

          <div className="w-full flex-grow p-4 rounded-2xl bg-dark/5 flex flex-col justify-center">
            {isPremium ? (
              <>
                <Image
                  src={'/lp-pro-pricing-image.png'}
                  width={154}
                  height={175}
                  alt="Protected!"
                  className="mb-4"
                />
                <p className="text-secondary font-medium">
                  You are protected by Pup Premium!
                </p>
              </>
            ) : (
              <>
                <p className="text-sm">Start removing your digital footprint</p>
                <h3 className="text-2xl font-bold mb-3">
                  with <strong>Pup Premium</strong>
                </h3>
                <Button variant="default" asChild>
                  <Link href={buyLink}>Upgrade Now</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
