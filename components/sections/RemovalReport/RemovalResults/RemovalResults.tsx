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

export default function RemovalResults({ search }: SectionProps) {
  const tabs = [
    {
      value: 'queue',
      text: 'In Queue'
    },
    {
      value: 'in_progress',
      text: 'In Progress'
    },
    {
      value: 'completed',
      text: 'Successfully Erased'
    },
    {
      value: 'action_requred',
      text: 'You Action Required'
    },
    {
      value: 'failed',
      text: 'Unable to Remove'
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
        Stay up to date on your removals
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
