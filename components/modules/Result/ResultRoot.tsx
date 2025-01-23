'use client'

import React, { useEffect } from 'react'
import ResultTabs from '../../sections/Dashboard/ResultTabs'
import ResultCharts from '../../sections/Dashboard/ResultCharts'
import SocialPlatformResultsTab from '../../sections/Dashboard/SocialPlatformResultsTab'
import { TabsContent } from '@/components/ui/tabs'
import BrokersTabContent from '../../sections/Dashboard/BrokersTabContent'
import useResult from '@/hooks/useResult'
import GenReportLoader from '../Landing/GenReportLoader/GenReportLoader'

const tabs = [
  {
    value: 'google',
    name: 'Google',
    count: 200
  },
  { value: 'bing', name: 'Bing', count: 32 },
  {
    value: 'duckduckgo',
    name: 'Duck Duck Go',
    count: 18
  },
  {
    value: 'yahoo',
    name: 'Yahoo',
    count: 11
  },
  {
    value: 'brokers',
    name: 'Data Brokers',
    count: 37
  }
]

const brokersResult = [
  {
    name: 'Joe Smith',
    url: 'www.whitepages.com',
    data: ['Mary Johnson', 'Boston']
  },
  {
    name: 'Joe Smith',
    url: 'www.otherpages.com',
    data: ['45 years old', 'Chicago', '123 North Street'],
    phone: '(123) 454-6543'
  },
  {
    name: 'Joe Smith',
    url: 'www.otherpages.com',
    data: ['Mary Smith', 'Bob Johnson', 'Mary Johnson'],
    phone: '(333) 454-8541'
  }
]

const googleResults = [
  {
    name: 'Congratulations Joe | Scouts BSA Troops 279...',
    url: 'www.website.org',
    subUrl: 'https://www.scouttroop279.org/2024/11/07/',
    date: 'Nov 7, 2024 ... Tonight November 7th 2024'
  },
  {
    name: 'Congratulations Joe | Scouts BSA Troops 279...',
    url: 'www.website.org',
    subUrl: 'https://www.scouttroop279.org/2024/11/07/',
    date: 'Nov 7, 2024 ... Tonight November 7th 2024'
  },
  {
    name: 'Congratulations Joe | Scouts BSA Troops 279...',
    url: 'www.website.org',
    subUrl: 'https://www.scouttroop279.org/2024/11/07/',
    date: 'Nov 7, 2024 ... Tonight November 7th 2024'
  },
  {
    name: 'Congratulations Joe | Scouts BSA Troops 279...',
    url: 'www.website.org',
    subUrl: 'https://www.scouttroop279.org/2024/11/07/',
    date: 'Nov 7, 2024 ... Tonight November 7th 2024'
  }
]

const categories = [
  { count: '300', title: 'sites searched', isFill: true },
  { count: '137', title: 'sites found', isFill: true },
  { count: '0/100', title: 'search results removed' },
  { count: '0/100', title: 'broker reports removed' }
]

export default function ResultRoot({ name }: { name: string }) {
  const { isLoading, googleResultData } = useResult()

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined')
      window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [isLoading])

  if (isLoading) return <GenReportLoader searchTerm={name} />

  return (
    <>
      <ResultCharts
        categories={categories}
        title="Your Scan Results"
        subtitle="Don’t worry, we’re here to get them offline for you"
        resultsCountSubtitle="We found your personal data on 137 sites"
      />
      <div className="mt-[25px] lg:mt-[60px]">
        <ResultTabs tabs={tabs} defaultValue="brokers">
          <TabsContent value="google">
            <SocialPlatformResultsTab
              searchTerm={name}
              data={googleResultData.length ? googleResultData : googleResults}
            />
          </TabsContent>

          <TabsContent value="bing">
            <SocialPlatformResultsTab
              searchTerm={name}
              data={googleResultData.length ? googleResultData : googleResults}
            />
          </TabsContent>
          <TabsContent value="duckduckgo">
            <SocialPlatformResultsTab
              searchTerm={name}
              data={googleResultData.length ? googleResultData : googleResults}
            />
          </TabsContent>
          <TabsContent value="yahoo">
            <SocialPlatformResultsTab
              searchTerm={name}
              data={googleResultData.length ? googleResultData : googleResults}
            />
          </TabsContent>
          <TabsContent value="brokers">
            <BrokersTabContent data={brokersResult} />
          </TabsContent>
        </ResultTabs>
      </div>
    </>
  )
}
