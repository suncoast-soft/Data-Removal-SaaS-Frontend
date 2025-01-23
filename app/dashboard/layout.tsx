import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import {
  DashboardNavDesktop,
  DashboardNavMobile
} from '@/components/modules/DashboardNav'
import { Mail } from 'lucide-react'
import DashboardIcon from '@/components/icons/DashboardIcon'
import { getPricingPlan, getUser } from '@/utils/supabase/queries'
import AccountIcon from '@/components/icons/AccountIcon'
import BillingIcon from '@/components/icons/BillingIcon'
import FAQsIcon from '@/components/icons/FAQsIcon'
import BlogIcon from '@/components/icons/BlogIcon'
import ScanHistoryIcon from '@/components/icons/ScanHistoryIcon'
import { isRemovalActive } from '@/utils/helpers'
import DashboardHeader from '@/components/modules/DashboardHeader'

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const user = await getUser(supabase)

  if (!user) {
    return redirect('/signin')
  }

  const pricingPlan = await getPricingPlan(supabase)
  const removalActivated = pricingPlan && isRemovalActive(pricingPlan)

  const navs = [
    {
      icon: <DashboardIcon />,
      name: 'Dashboard',
      link: '/dashboard'
    },
    {
      icon: <AccountIcon />,
      name: 'Account',
      link: '/dashboard/settings/account'
    },
    {
      icon: <Mail />,
      name: 'Inbox',
      link: '/dashboard/inbox',
      isInbox: true
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
      <DashboardNavDesktop
        navs={navs}
        user={user}
        isPaidUser={removalActivated}
      />

      <div className="w-full">
        <header className="sticky top-0">
          <DashboardNavMobile
            navs={navs}
            user={user}
            isPaidUser={removalActivated}
          />
        </header>

        <main className="container mx-auto max-w-6xl">
          <DashboardHeader />

          {children}
        </main>
      </div>
    </main>
  )
}
