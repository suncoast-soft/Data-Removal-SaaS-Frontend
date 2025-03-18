import BrokerSearchResults from '@/components/sections/SearchReport/SearchResults/SearchResult/Broker'
import { Tables } from '@/types_db'

type Profile = Tables<'profiles'>
type BrokerSearch = Tables<'broker_searches'> & {
  broker: Tables<'brokers'>
}

interface SectionProps {
  brokerSearches: BrokerSearch[]
  hasAccount: boolean
  isPremium: boolean
  profile: Profile
}

export default function SearchResults({
  brokerSearches,
  hasAccount,
  isPremium,
  profile
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
        profile={profile}
      />
    </div>
  )
}
