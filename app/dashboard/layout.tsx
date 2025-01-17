import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { DesktopNav, MobileNav } from '@/components/modules/Sidenav'
import { Mail } from 'lucide-react'
import InjectUserSettings from '@/components/modules/InjectUserSettings/InjectUserSettings'
import DashboardIcon from '@/components/icons/DashboardIcon'
import {
  getPricingPlan,
  getPrimaryProfile,
  getUser
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
  const user = await getUser(supabase)

  if (!user) {
    return redirect('/signin')
  }

  const primaryProfile = await getPrimaryProfile(supabase)
  const pricingPlan = await getPricingPlan(supabase)
  const removalActivated = pricingPlan && isRemovalActive(pricingPlan)

  const navs = [
    {
      icon: <DashboardIcon />,
      name: 'Dashboard',
      link: '/dashboard'
    },
    {
      icon: <Mail />,
      name: 'Inbox',
      link: '/dashboard/inbox',
      isInbox: true
    },
    {
      icon: <AccountIcon />,
      name: 'Account',
      link: '/dashboard/settings/account'
    },
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

  return (
    <main className="flex min-h-screen w-full flex-row bg-white">
      <DesktopNav navs={navs} user={user} isPaidUser={removalActivated} />

      <div className="w-full">
        <header className="sticky top-0">
          <MobileNav navs={navs} user={user} isPaidUser={removalActivated} />

          <div className="flex flex-row justify-between items-center w-full bg-slate-50 px-4 py-2"></div>
        </header>

        <main className="grid flex-1 items-start gap-2 px-4 py-6 bg-white lg:px-8 lg:py-14">
          <InjectUserSettings user={user} />
          {!primaryProfile ? <ProfileForm defaultOpen={true} /> : children}
        </main>
      </div>
    </main>
  )
}
