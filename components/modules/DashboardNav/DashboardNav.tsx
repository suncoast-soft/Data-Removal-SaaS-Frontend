'use client'

import Link from 'next/link'
import { ReactElement, useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import LogoWhite from '@/components/icons/LogoWhite'
import { cn } from '@/utils/cn'
import s from './DashboardNav.module.css'
import { usePathname } from 'next/navigation'
import MenuIcon from '@/components/icons/MenuIcon'
import SignoutForm from '@/components/sections/Forms/SignoutForm'
import { createClient } from '@/utils/supabase/client'
import { getNotifications } from '@/utils/supabase/queries'
import { Tables } from '@/types_db'

type Notification = Tables<'notifications'>

type NavItem = {
  icon: ReactElement<any>
  name: string
  link: string
}

interface NavProps {
  navs: NavItem[]
}

function DashboardNavDesktop({ navs }: NavProps) {
  const currentPath = usePathname()

  const supabase = createClient()
  const [inboxCount, setInboxCount] = useState(0)

  useEffect(() => {
    async function fetchNotificationsCount() {
      const notifications = (await getNotifications(supabase)) as Notification[]
      setInboxCount(
        notifications.filter((notification) => !notification.read).length
      )
    }
    fetchNotificationsCount()
  }, [supabase, currentPath])

  return (
    <aside className={s.root}>
      <nav className="flex flex-col items-start px-4 py-6 justify-between min-h-screen">
        <div className="w-full">
          <Link href="/dashboard" className={cn(s.logo)} aria-label="Logo">
            <LogoWhite />
          </Link>

          <div className="w-full overflow-y-auto">
            {navs.map((nav, index) => (
              <Link
                key={index}
                href={nav.link}
                className={cn(
                  s.link,
                  'flex justify-between',
                  currentPath === nav.link && s.active
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 text-primary">{nav.icon}</span>
                  <span>{nav.name}</span>

                  {nav.name === 'Inbox' && inboxCount > 0 && (
                    <span className="w-5 h-5 text-sm text-center rounded bg-secondary text-dark font-bold -mt-4">
                      {inboxCount}
                    </span>
                  )}
                </div>
              </Link>
            ))}

            <SignoutForm />
          </div>
        </div>
      </nav>
    </aside>
  )
}

function DashboardNavMobile({ navs }: NavProps) {
  const currentPath = usePathname()

  const supabase = createClient()
  const [inboxCount, setInboxCount] = useState(0)

  useEffect(() => {
    async function fetchNotificationsCount() {
      const notifications = (await getNotifications(supabase)) as Notification[]
      setInboxCount(
        notifications.filter((notification) => !notification.read).length
      )
    }
    fetchNotificationsCount()
  }, [supabase, currentPath])

  return (
    <Sheet>
      <div className="lg:hidden bg-dark w-full h-[70px] flex justify-between items-center px-4">
        <Link
          href="/dashboard"
          className={cn(s.logo, 'w-[170px] !mb-0')}
          aria-label="Logo"
        >
          <LogoWhite />
        </Link>

        <SheetTrigger asChild>
          <Button size="icon" className="text-white p-0" variant={'link'}>
            <MenuIcon />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
      </div>

      <SheetContent side="left" className={'bg-dark'}>
        <nav className="flex flex-col items-start px-4 py-6">
          <SheetTitle className="sr-only">Menu</SheetTitle>

          <Link href="/dashboard" className={cn(s.logo)} aria-label="Logo">
            <LogoWhite />
          </Link>

          <div className="w-full">
            {navs.map((nav, index) => (
              <Link
                key={index}
                href={nav.link}
                className={cn(s.link, currentPath === nav.link && s.active)}
              >
                <span className="w-6 h-6 text-primary">{nav.icon}</span>
                <span>{nav.name}</span>

                {nav.name === 'Inbox' && inboxCount > 0 && (
                  <span className="w-5 h-5 text-sm text-center rounded bg-secondary text-dark font-bold -mt-4">
                    {inboxCount}
                  </span>
                )}
              </Link>
            ))}

            <SignoutForm />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export { DashboardNavDesktop, DashboardNavMobile }
