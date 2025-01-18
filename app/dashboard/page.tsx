import { getPricingPlan, getPrimaryProfile } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import UpgradeSection from '@/components/modules/Dashboard/UpgradeSection'
import FaqsSection from '@/components/modules/Dashboard/FaqsSection'
import HowToProtectSection from '@/components/modules/Dashboard/HowToProtectSection'
import ArticlesSection from '@/components/modules/Dashboard/ArticlesSection'
import HelpBanner from '@/components/modules/Dashboard/HelpBanner'
import DashboardRoot from '@/components/modules/Dashboard'
import { isRemovalActive } from '@/utils/helpers'

export default async function Dashboard() {
  const supabase = createClient()

  const primaryProfile = await getPrimaryProfile(supabase)
  const pricing = await getPricingPlan(supabase)
  const removalActivated = pricing && isRemovalActive(pricing)

  const isPaidUser = true || removalActivated

  return (
    <>
      <div className="container mx-auto max-w-[1132px]">
        <DashboardRoot
          primaryProfile={primaryProfile}
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
      </div>
    </>
  )
}
