'use client'

import React from 'react'
import ResultCharts from '@/components/modules/Dashboard/ResultCharts'
import Tags from '@/components/modules/Dashboard/Tags'
import ResultTabs from '@/components/modules/Dashboard/ResultTabs'
import { TabsContent } from '@/components/ui/tabs'
import BrokersTabContent from '@/components/modules/Dashboard/BrokersTabContent'
import SocialPlatformResultsTab from '@/components/modules/Dashboard/SocialPlatformResultsTab'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import SearchResultTable from '@/components/modules/Dashboard/SearchResultTable'
import { Tables } from '@/types_db'
import useResult from '@/hooks/useResult'

type Profile = Tables<'profiles'>

interface DashboardRootProps {
  primaryProfile: Profile | null
  isPaidUser?: boolean
}

export default function DashboardRoot({
  primaryProfile,
  isPaidUser = false
}: DashboardRootProps) {
  const { googleResultData } = useResult(primaryProfile)

  // Tags and Categories
  const tags = Array(15).fill({ label: 'phone number' })
  const proTags = tags.map((tag, index) => ({
    ...tag,
    variant: index % 2 === 0 ? 'secondary' : 'outline'
  }))
  const freeCategories = [
    { count: '300', title: 'sites searched', isFill: true },
    { count: '137', title: 'sites found', isFill: true },
    { count: '0/100', title: 'search results removed' },
    { count: '0/100', title: 'broker reports removed' }
  ]
  const proCategories = [
    { count: '40/100', title: 'search engine results removed' },
    { count: '3/7', title: 'data broker results removed' }
  ]

  // Tab Definitions
  const tabs = [
    { value: 'google', name: 'Google', count: 200 },
    { value: 'bing', name: 'Bing', count: 32 },
    { value: 'duckduckgo', name: 'Duck Duck Go', count: 18 },
    { value: 'yahoo', name: 'Yahoo', count: 11 },
    { value: 'brokers', name: 'Data Brokers', count: 37 }
  ]
  const paidTabs = [
    { value: 'queue', name: 'In Queue', count: 135 },
    { value: 'in_progress', name: 'In Progress', count: 3 },
    { value: 'erased', name: 'Successfully Erased', count: 1 },
    { value: 'action_required', name: 'Your Action Required' },
    { value: 'unable_to_remove', name: 'Unable to Remove' }
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

  const googleResults = Array(4).fill({
    name: 'Congratulations Joe | Scouts BSA Troops 279...',
    url: 'www.website.org',
    subUrl: 'https://www.scouttroop279.org/2024/11/07/',
    date: 'Nov 7, 2024 ... Tonight November 7th 2024'
  })

  const chartCategories = isPaidUser ? proCategories : freeCategories

  // Render Tab Content
  const renderTabsContent = (value: string) => {
    const isBrokersTab = value === 'brokers'
    const data = googleResultData.length ? googleResultData : googleResults

    return isBrokersTab ? (
      <BrokersTabContent data={brokersResult} />
    ) : isPaidUser ? (
      <SearchResultTable data={data} />
    ) : (
      <SocialPlatformResultsTab data={data} />
    )
  }

  return (
    <>
      {/* Chart Section */}
      <ResultCharts
        categories={chartCategories}
        heroImage="/free-dashboard-image.png"
        title={
          isPaidUser
            ? 'Welcome to Pup Premium!'
            : 'We found your personal data on 137'
        }
        subtitle={
          isPaidUser
            ? 'We are already hard at work removing your data'
            : 'Don’t worry, we’re here to erase them for you'
        }
        wrapperClassName={`max-w-[1068px] ${
          isPaidUser ? '[&>div>div>span]:flex-1' : ''
        }`}
      />

      {/* Tags Section */}
      <div className="mt-6 mb-16 lg:my-6">
        <Tags tags={isPaidUser ? proTags : tags} />
      </div>

      <hr className="my-4 border-dark/10 hidden lg:block" />

      {/* Tabs Section */}
      <h2 className="text-2xl lg:text-4xl font-bold text-center">
        {isPaidUser ? 'Stay up to date on your removals' : 'Search Results'}
      </h2>
      <div className="mt-6 lg:mt-16">
        <ResultTabs
          defaultValue={isPaidUser ? 'queue' : 'google'}
          tabs={isPaidUser ? paidTabs : tabs}
        >
          {/* Search Input */}
          <div className="flex flex-wrap justify-between items-center">
            {isPaidUser && (
              <h3 className="text-2xl font-bold">135 Removals Queued</h3>
            )}
            <div className="relative w-full lg:w-56 ml-auto mb-4">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-primary" />
              <Input
                type="text"
                placeholder="Search for..."
                className="pl-12 bg-transparent border-dark border text-base h-12"
              />
            </div>
          </div>

          {/* Dynamic Tab Content */}
          {(isPaidUser ? paidTabs : tabs).map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {renderTabsContent(tab.value)}
            </TabsContent>
          ))}
        </ResultTabs>
      </div>
    </>
  )
}
