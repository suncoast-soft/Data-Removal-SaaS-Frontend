import { Button } from '@/components/ui/button'
import Link from 'next/link'
import SearchReport from '@/components/sections/SearchReport'
import UpgradeSection from '@/components/sections/Dashboard/UpgradeSection'
import HowToProtectSection from '@/components/sections/Dashboard/HowToProtectSection'
import ArticlesSection from '@/components/sections/Dashboard/ArticlesSection'
import PrivateFAQs from '@/components/sections/PrivateFAQs'
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

      <UpgradeSection />

      <PrivateFAQs />

      <HowToProtectSection />

      <ArticlesSection />

      <div className="text-center my-12">
        <Button variant="secondary" asChild>
          <Link href="/auth/login">
            Create account and protect yourself today
          </Link>
        </Button>
      </div>
    </div>
  )
}
