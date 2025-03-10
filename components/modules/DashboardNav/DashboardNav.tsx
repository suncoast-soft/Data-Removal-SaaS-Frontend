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
import SignoutForm from '@/components/sections/Forms/SignoutForm'

type NavItem = {
  icon: ReactElement<any>
  name: string
  link: string
  isInbox?: boolean
}

interface NavProps {
  navs: NavItem[]
}

function DashboardNavDesktop({ navs }: NavProps) {
  const currentPath = usePathname()
  const [search, setSearch] = useState('')

  return (
    <aside className={s.root}>
      <nav className="flex flex-col items-start px-4 py-6 justify-between min-h-screen">
        <div className="w-full">
          <Link href="/dashboard" className={cn(s.logo)} aria-label="Logo">
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
