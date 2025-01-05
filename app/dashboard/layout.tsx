import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardBreadcrumb from '@/components/modules/DashboardBreadcrumb'
import { DesktopNav, MobileNav } from '@/components/modules/Sidenav'
import {
  CreditCard,
  Gauge,
  LifeBuoy,
  ListChecks,
  Mail,
  PackageSearch,
  Settings
} from 'lucide-react'
import { User } from '@/components/modules/User/User'
import InjectUserSettings from '@/components/modules/InjectUserSettings/InjectUserSettings'
import DashboardIcon from '@/components/icons/DashboardIcon'
import {
  getPricingPlans,
  getPrimaryProfile,
  getProfiles
} from '@/utils/supabase/queries'
import ProfileForm from '@/components/modules/AccountForms/ProfileForm'
import AccountIcon from '@/components/icons/AccountIcon'
import BillingIcon from '@/components/icons/BillingIcon'
import FAQsIcon from '@/components/icons/FAQsIcon'
import BlogIcon from '@/components/icons/BlogIcon'
import ScanHistoryIcon from '@/components/icons/ScanHistoryIcon'
import { isRemovalActive } from '@/utils/helpers'

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  const profiles = await getProfiles(supabase)
  const primaryProfile = await getPrimaryProfile(supabase, user?.id ?? '')
  const pricing = await getPricingPlans(supabase, primaryProfile.id)
  const removalActivated = pricing ? isRemovalActive(pricing) : false

  const isPaidUser = true || removalActivated

  /**
   * Dashboard Menu Config
   */
  const navs = [
    {
      icon: <DashboardIcon />,
      name: 'Dashboard',
      link: '/dashboard'
    },
    // {
    //   icon: <PackageSearch />,
    //   name: 'Search Reports',
    //   link: '/dashboard/reports'
    // },
    {
      icon: <Mail />,
      name: 'Inbox',
      link: '/dashboard/inbox',
      isInbox: true
    },
    // {
    //   icon: <ListChecks />,
    //   name: 'Removals',
    //   link: '/dashboard/removals'
    // },
    {
      icon: <AccountIcon />,
      name: 'Account',
      link: '/dashboard/settings/account'
    },
    // {
    //   icon: <Gauge />,
    //   name: 'Profiles',
    //   link: '/dashboard/settings/profiles'
    // },
    {
      icon: <BillingIcon />,
      name: 'Billing',
      link: '/dashboard/settings/billing'
    },
    {
      icon: <ScanHistoryIcon />,
      name: 'Scan History',
      link: '/dashboard/scan-history'
    },
    // {
    //   icon: <LifeBuoy />,
    //   name: 'Support',
    //   link: '/dashboard/support'
    // },
    {
      icon: <FAQsIcon />,
      name: 'FAQs',
      link: '/faq'
    },
    {
      icon: <BlogIcon />,
      name: 'Blog',
      link: '/blog'
    }
  ]

  if (!user) {
    return redirect('/signin')
  } else {
    return (
      <main className="flex min-h-screen w-full flex-row bg-white">
        <DesktopNav navs={navs} user={user} isPaidUser={isPaidUser} />

        <div className="w-full">
          <header className="sticky top-0">
            <MobileNav navs={navs} user={user} isPaidUser={isPaidUser} />

            <div className="flex flex-row justify-between items-center w-full bg-slate-50 px-4 py-2">
              <div />
              {/* <DashboardBreadcrumb /> */}
              {/* <User /> */}
            </div>
          </header>

          <main className="grid flex-1 items-start gap-2 px-4 py-6 bg-white lg:px-[34px] lg:py-[60px]">
            <InjectUserSettings user={user} />
            {(profiles?.length || 0) === 0 ? (
              <ProfileForm defaultOpen={true} />
            ) : (
              children
            )}
          </main>
        </div>
      </main>
    )
  }
}
