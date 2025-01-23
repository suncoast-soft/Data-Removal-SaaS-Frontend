'use client'

import React from 'react'
import ResultCharts from '@/components/sections/Dashboard/ResultCharts'
import Tags from '@/components/sections/Dashboard/Tags'
import ResultTabs from '@/components/sections/Dashboard/ResultTabs'
import { TabsContent } from '@/components/ui/tabs'
import BrokersTabContent from '@/components/sections/Dashboard/BrokersTabContent'
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import SearchResultTable from '@/components/sections/Dashboard/SearchResultTable'
import { Tables } from '@/types_db'
import { freeCategories, googleResults, proCategories } from '@/utils/const'

type Profile = Tables<'profiles'>
type Search = Tables<'searches'>

interface DashboardReportProps {
  profiles: Profile[]
  searches: Search[]
  isPaidUser: boolean
}

export default function DashboardReport({
  profiles,
  searches,
  isPaidUser = false
}: DashboardReportProps) {
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
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-primary" />
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
