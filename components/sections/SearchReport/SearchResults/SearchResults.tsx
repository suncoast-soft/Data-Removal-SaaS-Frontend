import BrokerSearchResults from '@/components/sections/SearchReport/SearchResults/SearchResult/Broker'
import GoogleSearchResults from '@/components/sections/SearchReport/SearchResults/SearchResult/Google'
import Loading from '@/components/modules/Loading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tables } from '@/types_db'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontalIcon } from 'lucide-react'

type GoogleSearch = Tables<'google_searches'>
type BrokerSearch = Tables<'broker_searches'> & {
  broker: Tables<'brokers'>
}

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
      value: 'broker',
      text: 'Data Brokers'
    },
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
    }
  ]

  return (
    <div className="my-20">
      <h2 className="text-2xl lg:text-4xl font-bold text-center mb-8">
        Search Results
      </h2>

      <Tabs defaultValue="broker" className="w-full">
        <div className="hidden lg:block">
          <TabsList className="h-12 bg-transparent rounded-none !justify-start py-0 w-fit">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="text-lg border-b-2 border-white data-[state=active]:border-primary data-[state=active]:font-bold"
              >
                {tab.text}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="lg:hidden">
          <TabsList className="h-12 bg-transparent rounded-none !justify-start py-0 w-fit">
            {tabs.slice(0, 3).map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="text-lg border-b-2 border-white data-[state=active]:border-primary data-[state=active]:font-bold"
              >
                {tab.text}
              </TabsTrigger>
            ))}

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className="p-2">
                <MoreHorizontalIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {tabs.slice(3).map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="text-lg border-b-2 border-white data-[state=active]:border-primary data-[state=active]:font-bold"
                  >
                    {tab.text}
                  </TabsTrigger>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </TabsList>
        </div>

        <TabsContent value="broker">
          {brokerSearches.length > 0 ? (
            <BrokerSearchResults searches={brokerSearches} />
          ) : (
            <div className="py-8">
              <Loading />
            </div>
          )}
        </TabsContent>

        <TabsContent value="google">
          {googleSearches[0]?.search_result ? (
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
