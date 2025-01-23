import {
  getPricingPlan,
  getProfiles,
  getSearches
} from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import UpgradeSection from '@/components/sections/Dashboard/UpgradeSection'
import FaqsSection from '@/components/sections/Dashboard/FaqsSection'
import HowToProtectSection from '@/components/sections/Dashboard/HowToProtectSection'
import ArticlesSection from '@/components/sections/Dashboard/ArticlesSection'
import HelpBanner from '@/components/sections/Dashboard/HelpBanner'
import { isRemovalActive } from '@/utils/helpers'
import DashboardReport from '@/components/sections/Dashboard/Report'
import { redirect } from 'next/navigation'
import { Tables } from '@/types_db'

type Profile = Tables<'profiles'>
type Search = Tables<'searches'>

export default async function Dashboard() {
  const supabase = await createClient()

  const [profiles, pricing] = await Promise.all([
    getProfiles(supabase),
    getPricingPlan(supabase)
  ])

  if (profiles?.length === 0) {
    redirect('/dashboard/settings/profiles/new')
  }

  const isPaidUser = pricing && isRemovalActive(pricing)

  const searches = await Promise.all(
    (profiles ?? []).map(
      async (profile) => await getSearches(supabase, profile.id)
    )
  )

  return (
    <>
      <DashboardReport
        profiles={profiles as Profile[]}
        searches={searches as unknown as Search[]}
        isPaidUser={isPaidUser}
      />

      {!isPaidUser && (
        <>
          <div className="my-[60px] lg:my-[50px]">
            <UpgradeSection />
          </div>

          <FaqsSection />

          <HowToProtectSection />

          <ArticlesSection />

          <div className="mt-4 lg:mt-[45px] flex justify-center mx-auto  px-4 lg:px-0">
            <Button
              variant="secondary"
              color="white"
              className="w-full lg:w-[371px] z-10 font-semibold text-lg text-dark border-primary hover:bg-primary hover:text-white border-2"
              type="submit"
            >
              Upgrade and protect yourself today
            </Button>
          </div>
        </>
      )}

      {isPaidUser && (
        <div className="mt-8">
          <HelpBanner />
        </div>
      )}
    </>
  )
}
