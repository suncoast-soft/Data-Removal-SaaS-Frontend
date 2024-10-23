import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardBreadcrumb from '@/components/modules/DashboardBreadcrumb'
import { DesktopNav, MobileNav } from '@/components/modules/Sidenav'
import {
  Gauge,
  LifeBuoy,
  ListChecks,
  PackageSearch,
  Settings
} from 'lucide-react'
import { User } from '@/components/modules/User/User'

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  /**
   * Dashboard Menu Config
   */
  const navs = [
    {
      icon: <Gauge />,
      name: 'Profiles',
      link: '/dashboard/profiles'
    },
    {
      icon: <PackageSearch />,
      name: 'Search Reports',
      link: '/dashboard/reports'
    },
    {
      icon: <ListChecks />,
      name: 'Protections',
      link: '/dashboard/protections'
    },
    {
      icon: <LifeBuoy />,
      name: 'Support',
      link: '/dashboard/support'
    },
    {
      icon: <Settings />,
      name: 'Settings',
      link: '/dashboard/settings/account'
    }
  ]

  if (!user) {
    return redirect('/signin')
  } else {
    return (
      <main className="flex min-h-screen w-full flex-row bg-muted/40">
        <DesktopNav navs={navs} />

        <div className="flex flex-col sm:gap-4 sm:py-4 sm:px-8 w-full">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 px-4">
            <MobileNav navs={navs} />

            <div className="flex flex-row justify-between items-center w-full bg-slate-50 px-4 py-2 shadow-md">
              <DashboardBreadcrumb />
              <User />
            </div>
          </header>

          <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
            {children}
          </main>
        </div>
      </main>
    )
  }
}
