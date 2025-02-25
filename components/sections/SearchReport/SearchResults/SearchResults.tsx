import BrokerSearchResults from '@/components/sections/SearchReport/SearchResults/SearchResult/Broker'
import { Tables } from '@/types_db'

type BrokerSearch = Tables<'broker_searches'> & {
  broker: Tables<'brokers'>
}

interface SectionProps {
  brokerSearches: BrokerSearch[]
  hasAccount: boolean
  isPremium: boolean
}

export default function SearchResults({
  brokerSearches,
  hasAccount,
  isPremium
}: SectionProps) {
  return (
    <div className="my-20">
      <h2 className="text-2xl lg:text-4xl font-bold text-center mb-8">
        Search Results
      </h2>

      <BrokerSearchResults
        searches={brokerSearches}
        hasAccount={hasAccount}
        isPremium={isPremium}
      />
    </div>
  )
}
