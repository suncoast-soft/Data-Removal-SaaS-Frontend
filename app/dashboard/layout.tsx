import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import {
  DashboardNavDesktop,
  DashboardNavMobile
} from '@/components/modules/DashboardNav'
import { Mail, MessageSquare } from 'lucide-react'
import DashboardIcon from '@/components/icons/DashboardIcon'
import { getUser } from '@/utils/supabase/queries'
import AccountIcon from '@/components/icons/AccountIcon'
import BillingIcon from '@/components/icons/BillingIcon'
import FAQsIcon from '@/components/icons/FAQsIcon'
import BlogIcon from '@/components/icons/BlogIcon'
import { Suspense } from 'react'
import { Toaster } from '@/components/ui/toaster'

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const user = await getUser(supabase)

  if (!user || user.is_anonymous) {
    return redirect('/auth/login')
  }

  const navs = [
    {
      icon: <DashboardIcon />,
      name: 'Dashboard',
      link: '/dashboard'
    },
    {
      icon: <AccountIcon />,
      name: 'Account',
      link: '/dashboard/account'
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
      link: '/dashboard/billing'
    },
    {
      icon: <FAQsIcon />,
      name: 'FAQs',
      link: '/dashboard/faq'
    },
    {
      icon: <BlogIcon />,
      name: 'Blog',
      link: '/dashboard/blog'
    },
    {
      icon: <MessageSquare />,
      name: 'Contact',
      link: '/dashboard/contact'
    }
  ]

  return (
    <main className="flex min-h-screen w-full flex-row bg-white">
      <DashboardNavDesktop navs={navs} />

      <div className="w-full">
        <header className="sticky top-0">
          <DashboardNavMobile navs={navs} />
        </header>

        <main className="container max-w-6xl">{children}</main>
      </div>

      <Suspense>
        <Toaster />
      </Suspense>
    </main>
  )
}
