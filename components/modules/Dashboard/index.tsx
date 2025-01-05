'use client'
import ResultCharts from '@/components/modules/Dashboard/ResultCharts'
import Tags from '@/components/modules/Dashboard/Tags'
import ResultTabs from '@/components/modules/Dashboard/ResultTabs'
import { TabsContent } from '@/components/ui/tabs'
import BrokersTabContent from '@/components/modules/Dashboard/BrokersTabContent'
import SocialPlatformResultsTab from '@/components/modules/Dashboard/SocialPlatformResultsTab'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import SearchResultTable from '@/components/modules/Dashboard/SearchResultTable'
import { User } from '@supabase/supabase-js'
import { Tables } from '@/types_db'
import useResult from '@/hooks/useResult'

type Profile = Tables<'profiles'>

export default function DashboardRoot({
  user,
  primaryProfile,
  isPaidUser
}: {
  user: User | null
  primaryProfile: Profile | null
  isPaidUser?: boolean
}) {
  const { googleResultData, brokerResultData } = useResult(primaryProfile)
  const tags = [
    { label: 'phone number' },
    { label: 'ssn' },
    { label: 'address' },
    { label: 'employer' },
    { label: 'ssn' },
    { label: 'phone number' },
    { label: 'employer' },
    { label: 'address' },
    { label: 'ssn' },
    { label: 'address' },
    { label: 'employer' },
    { label: 'phone number' },
    { label: 'address' },
    { label: 'ssn' },
    { label: 'address' }
  ]
  const proTags = [
    { label: 'phone number', variant: 'outline' },
    { label: 'ssn', variant: 'outline' },
    { label: 'address', variant: 'secondary' },
    { label: 'employer', variant: 'secondary' },
    { label: 'ssn', variant: 'secondary' },
    { label: 'phone number', variant: 'secondary' },
    { label: 'employer' },
    { label: 'address' },
    { label: 'ssn' },
    { label: 'address' },
    { label: 'employer' },
    { label: 'phone number' },
    { label: 'address' },
    { label: 'ssn' },
    { label: 'address' }
  ]
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
  const paidTabs = [
    {
      value: 'queue',
      name: 'In Queue',
      count: 135
    },
    { value: 'in_progress', name: 'In Progress', count: 3 },
    {
      value: 'erased',
      name: 'Successfully Erased',
      count: 1
    },
    {
      value: 'action_required',
      name: 'Your Action Required'
    },
    {
      value: 'unable_to_remove',
      name: 'Unable to Remove'
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

  return (
    <>
      <ResultCharts
        categories={isPaidUser ? proCategories : freeCategories}
        heroImage="/free-dashboard-image.png"
        title={
          isPaidUser
            ? 'Welcome to Pup Premium!'
            : 'We found your personal data on 137'
        }
        subtitle={
          isPaidUser
            ? 'We are already hard at work removing your data'
            : 'Don’t worry, we’re here to erase them for you '
        }
        wrapperClassName={`[&>div>p]:!mt-4 [&>div>p]:mb-10 max-w-[1068px] ${isPaidUser ? '[&>div>div>span]:flex-1' : ''}`}
      />
      <div className="mt-6 mb-[60px] lg:my-6">
        <Tags tags={isPaidUser ? proTags : tags} />
      </div>
      <hr className="my-4 border-darkMain/10 border-[1.4px] mt-6 hidden lg:block mb-[50px] " />
      <h2 className="text-2xl lg:text-[32px] lg:leading-[35px] font-bold text-center ">
        {isPaidUser ? 'Stay up to date on your removals' : 'Search Results'}
      </h2>

      <div className="mt-[25px] lg:mt-[60px]">
        <ResultTabs
          defaultValue={isPaidUser ? 'queue' : 'brokers'}
          tabs={isPaidUser ? paidTabs : tabs}
          // onChange={}
        >
          <div className="flex flex-wrap justify-between items-center">
            {isPaidUser ? (
              <h3 className="text-center lg:text-left text-2xl font-bold ">
                135 Removals Queued
              </h3>
            ) : (
              <div />
            )}

            <div className="relative w-full lg:w-[224px] ml-auto mb-4">
              <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                <Search className="w-[24px] h-[24px] text-greenMain" />
              </div>
              <Input
                type="text"
                placeholder="Search for..."
                // value={search}
                // onChange={(e) => setSearch(e.target.value)}
                className="pl-[48px] bg-transparent border-darkMain border-[1.4px] [&::placeholder]:text-darkMain [&::placeholder]:opacity-60 text-greenMain text-base h-12"
              />
            </div>
          </div>
          <TabsContent value={isPaidUser ? 'queue' : 'google'}>
            {isPaidUser ? (
              <SearchResultTable
                data={
                  googleResultData.length ? googleResultData : googleResults
                }
              />
            ) : (
              <SocialPlatformResultsTab
                data={
                  googleResultData.length ? googleResultData : googleResults
                }
              />
            )}
          </TabsContent>

          <TabsContent value={isPaidUser ? 'in_progress' : 'bing'}>
            {isPaidUser ? (
              <SearchResultTable
                data={
                  googleResultData.length ? googleResultData : googleResults
                }
              />
            ) : (
              <SocialPlatformResultsTab
                data={
                  googleResultData.length ? googleResultData : googleResults
                }
              />
            )}
          </TabsContent>
          <TabsContent value={isPaidUser ? 'erased' : 'duckduckgo'}>
            {isPaidUser ? (
              <SearchResultTable
                data={
                  googleResultData.length ? googleResultData : googleResults
                }
              />
            ) : (
              <SocialPlatformResultsTab
                data={
                  googleResultData.length ? googleResultData : googleResults
                }
              />
            )}
          </TabsContent>
          <TabsContent value={isPaidUser ? 'action_required' : 'yahoo'}>
            {isPaidUser ? (
              <SearchResultTable
                data={
                  googleResultData.length ? googleResultData : googleResults
                }
              />
            ) : (
              <SocialPlatformResultsTab
                data={
                  googleResultData.length ? googleResultData : googleResults
                }
              />
            )}
          </TabsContent>
          <TabsContent value={isPaidUser ? 'unable_to_remove' : 'brokers'}>
            {isPaidUser ? (
              <SearchResultTable
                data={
                  googleResultData.length ? googleResultData : googleResults
                }
              />
            ) : (
              <BrokersTabContent data={brokersResult} />
            )}
          </TabsContent>
        </ResultTabs>
      </div>
    </>
  )
}
