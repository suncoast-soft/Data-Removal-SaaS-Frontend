import {
  getBrokers,
  getPricingPlan,
  getProfiles,
  getSearches
} from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import UpgradeSection from '@/components/sections/Dashboard/UpgradeSection'
import HowToProtectSection from '@/components/sections/Dashboard/HowToProtectSection'
import ArticlesSection from '@/components/sections/Dashboard/ArticlesSection'
import HelpBanner from '@/components/sections/Dashboard/HelpBanner'
import { isRemovalActive } from '@/utils/helpers'
import { redirect } from 'next/navigation'
import { Tables } from '@/types_db'
import { BellIcon } from 'lucide-react'
import SearchReport from '@/components/sections/SearchReport'
import RemovalReport from '@/components/sections/RemovalReport'
import PrivateFAQs from '@/components/sections/PrivateFAQs'
import Link from 'next/link'

type Broker = Tables<'brokers'>
type Profile = Tables<'profiles'>
type Search = Tables<'searches'>

export default async function Dashboard() {
  const supabase = await createClient()

  const [brokers, profiles, pricing] = await Promise.all([
    getBrokers(supabase),
    getProfiles(supabase),
    getPricingPlan(supabase)
  ])

  if (profiles?.length === 0) {
    redirect('/dashboard/settings/account')
  }

  const isPaidUser = pricing && isRemovalActive(pricing)

  const searches = await Promise.all(
    (profiles ?? []).map(async (profile) => {
      return {
        profile: profile as Profile,
        searches: (await getSearches(supabase, profile.id)) as Search[]
      }
    })
  )

  const notifications = 2

  return (
    <div className="relative">
      <div className="flex gap-6 justify-between items-center mt-8 mb-4">
        <h1 className="text-3xl lg:text-4xl font-bold text-dark">Dashboard</h1>

        <Button variant="link" type="button" className={'no-underline p-0'}>
          <div className="relative text-dark">
            {notifications > 0 && (
              <div className="absolute -right-1 -top-1 min-w-[18px] rounded-full min-h-[18px] text-white bg-secondary text-xs font-normal">
                {notifications}
              </div>
            )}
            <BellIcon className="h-6 w-6 " />
          </div>
        </Button>
      </div>

      {isPaidUser ? (
        <>
          <RemovalReport brokers={brokers as Broker[]} searches={searches} />

          <HelpBanner />
        </>
      ) : (
        <>
          <SearchReport searches={searches} />

          <HelpBanner />

          <UpgradeSection />

          <PrivateFAQs />

          <HowToProtectSection />

          <ArticlesSection />

          <div className="text-center my-12">
            <Button variant="secondary" asChild>
              <Link href="/checkout" className="no-underline">
                Upgrade and protect yourself today
              </Link>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
