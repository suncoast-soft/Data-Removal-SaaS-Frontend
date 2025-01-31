import BrokerSearchResults from '@/components/sections/SearchReport/SearchResults/SearchResult/Broker'
import GoogleSearchResults from '@/components/sections/SearchReport/SearchResults/SearchResult/Google'
import Loading from '@/components/modules/Loading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tables } from '@/types_db'

type GoogleSearch = Tables<'google_searches'>
type BrokerSearch = Tables<'broker_searches'> & {
  broker: Tables<'brokers'>
}

interface SectionProps {
  googleSearches: GoogleSearch[]
  brokerSearches: BrokerSearch[]
}

export default function RemovalResults({
  googleSearches,
  brokerSearches
}: SectionProps) {
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

  return (
    <div className="my-20">
      <h2 className="text-2xl lg:text-4xl font-bold text-center mb-8">
        Stay up to date on your removals
      </h2>

      <Tabs defaultValue="broker" className="w-full">
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

        <TabsContent value="broker">
          {Array.isArray(brokerSearches) && brokerSearches.length > 0 ? (
            <BrokerSearchResults searches={brokerSearches as any} />
          ) : (
            <div className="py-8">
              <Loading />
            </div>
          )}
        </TabsContent>

        <TabsContent value="google">
          {googleSearches[0].search_result ? (
            <GoogleSearchResults
              results={googleSearches[0].search_result as any[]}
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
