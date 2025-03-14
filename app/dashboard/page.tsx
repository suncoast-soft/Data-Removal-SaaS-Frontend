import {
  getBroker,
  getBrokerSearches,
  getPricingPlan,
  getProfiles
} from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import { isPremiumUser } from '@/utils/helpers'
import { redirect } from 'next/navigation'
import SectionHeader from '@/components/modules/SectionHeader'
import SearchReport from '@/components/sections/SearchReport'
import { Tables } from '@/types_db'
import { sanityClient } from '@/utils/sanity/lib/client'
import { Page } from '@/sanity.types'
import RenderSanitySections from '@/components/sections/RenderSanitySections'

type Profile = Tables<'profiles'>
type Broker = Tables<'brokers'>
type BrokerSearch = Tables<'broker_searches'> & {
  broker: Broker
}

export default async function Dashboard() {
  const supabase = await createClient()

  const [profiles, pricing] = await Promise.all([
    getProfiles(supabase) as Promise<Profile[]>,
    getPricingPlan(supabase)
  ])

  if (profiles?.length === 0) {
    redirect('/dashboard/account')
  }
  const profile = profiles[0]
  const selectedProfileId = String(profile.id)

  const isPremium = pricing && isPremiumUser(pricing)

  // Initial loading for completed searches
  const brokerSearches = ((await getBrokerSearches(
    supabase,
    selectedProfileId
  )) ?? []) as BrokerSearch[]

  const completedSearches = (await Promise.all(
    brokerSearches
      .filter((s) => ['failed', 'completed'].includes(s.search_status!))
      .map((s) => s.broker_id && getBroker(supabase, s.broker_id))
  )) as Broker[]

  // Additional Page data
  const freeDashboardData = ((await sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug: 'free-dashboard' }
  )) ?? {}) as Page
  const { content: freeDashboardContent } = freeDashboardData

  const pupguardDashboardData = ((await sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug: 'premium-dashboard' }
  )) ?? {}) as Page
  const { content: pupguardDashboardContent } = pupguardDashboardData

  return (
    <div className="relative">
      <SectionHeader title="Dashboard" />

      <SearchReport
        profileId={selectedProfileId}
        brokerSearches={brokerSearches}
        completedSearches={completedSearches}
        hasAccount={true}
        isPremium={isPremium}
      />

      {isPremium ? (
        <RenderSanitySections content={pupguardDashboardContent} />
      ) : (
        <RenderSanitySections content={freeDashboardContent} />
      )}
    </div>
  )
}
