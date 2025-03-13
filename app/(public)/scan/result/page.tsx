import SearchReport from '@/components/sections/SearchReport'
import { getBroker, getBrokerSearches } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import { Tables } from '@/types_db'

type Broker = Tables<'brokers'>
type BrokerSearch = Tables<'broker_searches'> & {
  broker: Broker
}

export default async function ScanResultPage({
  searchParams
}: {
  searchParams: Promise<{
    profile: string
  }>
}) {
  const { profile } = await searchParams

  // Initial loading for completed searches
  const supabase = await createClient()

  const brokerSearches = (await getBrokerSearches(
    supabase,
    profile
  )) as BrokerSearch[]

  const completedSearches = (await Promise.all(
    brokerSearches
      .filter((s) => ['failed', 'completed'].includes(s.search_status!))
      .map((s) => s.broker_id && getBroker(supabase, s.broker_id))
  )) as Broker[]

  return (
    <div className="container max-w-6xl">
      <SearchReport
        profileId={profile}
        brokerSearches={brokerSearches}
        completedSearches={completedSearches}
      />
    </div>
  )
}
