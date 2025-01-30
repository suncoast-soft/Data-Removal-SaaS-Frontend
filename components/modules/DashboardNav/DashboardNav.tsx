'use client'

import Link from 'next/link'
import { ReactElement, useState } from 'react'
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
import { SearchIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import MenuIcon from '@/components/icons/MenuIcon'
import { User } from '@supabase/supabase-js'
import ProfileForm from '../../sections/Forms/ProfileForm'

type NavItem = {
  icon: ReactElement<any>
  name: string
  link: string
  isInbox?: boolean
}

interface NavProps {
  navs: NavItem[]
  user: User
  isPaidUser?: boolean
}

function DashboardNavDesktop({ navs, user, isPaidUser }: NavProps) {
  const currentPath = usePathname()
  const [search, setSearch] = useState('')

  return (
    <aside className={s.root}>
      <nav className="flex flex-col items-start px-4 py-6 justify-between min-h-screen">
        <div className="w-full">
          <Link
            href="/dashboard"
            className={cn(s.logo, 'no-underline')}
            aria-label="Logo"
          >
            <LogoWhite />
          </Link>

          <div className="relative w-full mb-6">
            <div className="absolute left-5 top-[50%] -translate-y-[50%]">
              <SearchIcon className="w-[18px] h-[18px] text-primary" />
            </div>

            <Input
              type="text"
              placeholder="Search for..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-[48px] bg-transparent border border-white [&::placeholder]:text-white [&::placeholder]:opacity-60 text-white text-base h-12"
            />
          </div>

          <div
            className={cn(
              'w-full overflow-y-auto',
              isPaidUser ? 'max-h-[calc(100vh-428px)]' : ''
            )}
          >
            {navs.map((nav, index) => (
              <Link
                key={index}
                href={nav.link}
                className={cn(
                  s.link,
                  'no-underline flex justify-between',
                  currentPath === nav.link && s.active
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 text-primary">{nav.icon}</span>
                  <span>{nav.name}</span>
                </div>
                {nav.isInbox ? (
                  <span className="w-[25px] h-[25px] text-white text-xs flex items-center justify-center bg-secondary rounded-full">
                    2
                  </span>
                ) : null}
              </Link>
            ))}
          </div>
        </div>

        <FooterOptions user={user} isPaidUser={isPaidUser} />
      </nav>
    </aside>
  )
}

function DashboardNavMobile({ navs, user, isPaidUser }: NavProps) {
  const currentPath = usePathname()

  return (
    <Sheet>
      <div className="lg:hidden bg-dark w-full h-[70px] flex justify-between items-center px-4">
        <Link
          href="/dashboard"
          className={cn(s.logo, 'no-underline w-[170px] !mb-0')}
          aria-label="Logo"
        >
          <LogoWhite />
        </Link>

        <SheetTrigger asChild>
          <Button
            size="icon"
            className="text-white hover:no-underline p-0"
            variant={'link'}
          >
            <MenuIcon />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
      </div>

      <SheetContent side="left" className={'bg-dark'}>
        <nav className="flex flex-col items-start px-4 py-6">
          <SheetTitle className="sr-only">Menu</SheetTitle>

          <Link
            href="/dashboard"
            className={cn(s.logo, 'no-underline')}
            aria-label="Logo"
          >
            <LogoWhite />
          </Link>

          <div className="w-full">
            {navs.map((nav, index) => (
              <Link
                key={index}
                href={nav.link}
                className={cn(
                  s.link,
                  'no-underline',
                  currentPath === nav.link && s.active
                )}
              >
                <span className="w-6 h-6 text-primary">{nav.icon}</span>
                <span>{nav.name}</span>
              </Link>
            ))}
          </div>

          <FooterOptions user={user} isPaidUser={isPaidUser} />
        </nav>
      </SheetContent>
    </Sheet>
  )
}

const FooterOptions = ({
  user,
  isPaidUser
}: {
  user: User
  isPaidUser?: boolean
}) => {
  return (
    isPaidUser && (
      <div className="py-4 space-y-2">
        <h3 className="text-white text-xl font-bold text-center">
          Loving Pup Premium?
        </h3>

        <Button
          variant="outline"
          size="small"
          className="text-white border-primary hover:bg-primary w-full"
        >
          Send Someone a Gift
        </Button>

        <Button
          variant="outline"
          size="small"
          className="text-white border-primary hover:bg-primary w-full"
        >
          Refer a Friend
        </Button>

        <ProfileForm user={user}>
          <Button
            variant="outline"
            size="small"
            className="text-white border-primary hover:bg-primary w-full"
          >
            Add a Family Member
          </Button>
        </ProfileForm>
      </div>
    )
  )
}

export { DashboardNavDesktop, DashboardNavMobile }
