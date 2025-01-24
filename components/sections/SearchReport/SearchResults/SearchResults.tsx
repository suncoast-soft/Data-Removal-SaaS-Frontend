import BrokerSearchResults from '@/components/sections/SearchReport/SearchResults/SearchResult/Broker'
import GoogleSearchResults from '@/components/sections/SearchReport/SearchResults/SearchResult/Google'
import Loading from '@/components/modules/Loading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tables } from '@/types_db'

type Profile = Tables<'profiles'>
type Search = Tables<'searches'>

interface SectionProps {
  search: {
    profile: Profile
    searches: Search[]
  }
}

export default function SearchResults({ search }: SectionProps) {
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

  const brokerSearches = search.searches?.filter(
    (search) => search.broker_type === 'broker_site'
  )
  const googleSearches = search.searches?.filter(
    (search) => search.broker_type === 'google'
  )[0]

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
          {googleSearches?.search_result ? (
            <GoogleSearchResults
              results={googleSearches.search_result as any}
            />
          ) : (
            <div className="py-8">
              <Loading />
            </div>
          )}
        </TabsContent>

        <TabsContent value="broker">
          {Array.isArray(brokerSearches) && brokerSearches.length > 0 ? (
            <BrokerSearchResults searches={brokerSearches as any} />
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
