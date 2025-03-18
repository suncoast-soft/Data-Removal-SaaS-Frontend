import SearchReport from '@/components/sections/SearchReport'
import {
  getBroker,
  getBrokerSearches,
  getProfiles
} from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import { Tables } from '@/types_db'

type Profile = Tables<'profiles'>
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
  const { profile: profileId } = await searchParams

  // Initial loading for completed searches
  const supabase = await createClient()

  const profiles = ((await getProfiles(supabase)) ?? []) as Profile[]
  const profile = profiles.filter(
    (profile: Profile) => String(profile.id) === profileId
  )?.[0]

  const brokerSearches = ((await getBrokerSearches(supabase, profileId)) ??
    []) as BrokerSearch[]

  const completedSearches = (await Promise.all(
    brokerSearches
      .filter((s) => ['failed', 'completed'].includes(s.search_status!))
      .map((s) => s.broker_id && getBroker(supabase, s.broker_id))
  )) as Broker[]

  return (
    <div className="container max-w-6xl">
      <SearchReport
        profile={profile}
        brokerSearches={brokerSearches}
        completedSearches={completedSearches}
      />
    </div>
  )
}
