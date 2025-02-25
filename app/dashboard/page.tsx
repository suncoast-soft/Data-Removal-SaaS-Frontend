import { getPricingPlan, getProfiles } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import UpgradeSection from '@/components/sections/Dashboard/UpgradeSection'
import HowToProtectSection from '@/components/sections/Dashboard/HowToProtectSection'
import ArticlesSection from '@/components/sections/Dashboard/ArticlesSection'
import { getErrorRedirect, isPremiumUser } from '@/utils/helpers'
import { redirect } from 'next/navigation'
import { BellIcon } from 'lucide-react'
import PrivateFAQs from '@/components/sections/PrivateFAQs'
import Link from 'next/link'
import SectionHeader from '@/components/modules/SectionHeader'
import SearchReport from '@/components/sections/SearchReport'
import ProfileDropdown from '@/components/modules/ProfileDropdown'
import { Tables } from '@/types_db'

type Profile = Tables<'profiles'>

export default async function Dashboard({
  searchParams
}: {
  searchParams: Promise<{ profile: string }>
}) {
  const selectedProfileId = (await searchParams).profile

  const supabase = await createClient()
  const [profiles, pricing] = await Promise.all([
    getProfiles(supabase) as Promise<Profile[]>,
    getPricingPlan(supabase)
  ])

  if (profiles?.length === 0) {
    redirect(
      getErrorRedirect(
        '/dashboard/account',
        'Profile',
        'Add a new profile to start scan'
      )
    )
  }

  if (selectedProfileId === undefined) {
    redirect(`/dashboard?profile=${profiles[0].id}`)
  }

  const isPremium = pricing && isPremiumUser(pricing)
  const notifications = 0

  return (
    <div className="relative">
      <SectionHeader
        title="Dashboard"
        cta1={
          <Button variant="link" type="button" className={'p-0'}>
            <div className="relative text-dark">
              {notifications > 0 && (
                <div className="absolute -right-1 -top-1 min-w-[18px] rounded-full min-h-[18px] text-white bg-secondary text-xs font-normal">
                  {notifications}
                </div>
              )}
              <BellIcon className="h-6 w-6 " />
            </div>
          </Button>
        }
      />

      <ProfileDropdown
        profiles={profiles}
        selectedProfileId={selectedProfileId}
      />

      <SearchReport
        profileId={selectedProfileId}
        hasAccount={true}
        isPremium={isPremium}
      />

      <UpgradeSection />

      <PrivateFAQs />

      <HowToProtectSection />

      <ArticlesSection />

      <div className="text-center my-12">
        <Button variant="secondary" asChild>
          <Link href="/checkout">Upgrade and protect yourself today</Link>
        </Button>
      </div>
    </div>
  )
}
