'use client'

import BrokerSearchResults from '@/components/sections/SearchReport/SearchResults/SearchResult/Broker'
import GoogleSearchResults from '@/components/sections/SearchReport/SearchResults/SearchResult/Google'
import Loading from '@/components/modules/Loading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tables } from '@/types_db'

type GoogleSearch = Tables<'google_searches'>
type BrokerSearch = Tables<'broker_searches'>

interface SectionProps {
  googleSearches: GoogleSearch[]
  brokerSearches: BrokerSearch[]
}

export default function SearchResults({
  googleSearches,
  brokerSearches
}: SectionProps) {
  const tabs = [
    {
      value: 'google',
      text: 'Google'
    },
    {
      value: 'bing',
      text: 'Bing'
    },
    {
      value: 'duckduckgo',
      text: 'Duck Duck Go'
    },
    {
      value: 'yahoo',
      text: 'Yahoo!'
    },
    {
      value: 'broker',
      text: 'Data Brokers'
    }
  ]

  return (
    <div className="my-20">
      <h2 className="text-2xl lg:text-4xl font-bold text-center mb-8">
        Search Results
      </h2>

      <Tabs defaultValue="google" className="w-full">
        <TabsList className="h-12 bg-transparent rounded-none !justify-start py-0 w-fit">
          {tabs.map((tab, index) => (
            <TabsTrigger
              key={index}
              value={tab.value}
              className="text-lg border-b-2 border-white data-[state=active]:border-primary data-[state=active]:font-bold"
            >
              {tab.text}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="google">
          {googleSearches[0]?.search_result ? (
            <GoogleSearchResults
              results={googleSearches[0].search_result as any}
            />
          ) : (
            <div className="py-8">
              <Loading />
            </div>
          )}
        </TabsContent>

        <TabsContent value="broker">
          {Array.isArray(brokerSearches[0]?.search_result) &&
          brokerSearches[0].search_result.length > 0 ? (
            <BrokerSearchResults
              searches={brokerSearches[0].search_result as any}
            />
          ) : (
            <div className="py-8">
              <Loading />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
