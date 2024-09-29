'use client'

import Link from 'next/link'
import { ReactElement } from 'react'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/Sheet'
import Button from '@/components/ui/Button'
import LogoText from '@/components/icons/LogoText'
import { cn } from '@/utils/cn'
import s from './Sidenav.module.css'
import { PanelLeft } from 'lucide-react'
import { usePathname } from 'next/navigation'

type NavItem = {
  icon: ReactElement
  name: string
  link: string
}

interface NavProps {
  navs: NavItem[]
}

function DesktopNav({ navs }: NavProps) {
  const currentPath = usePathname()

  return (
    <aside className={s.root}>
      <nav className="flex flex-col items-start gap-2 px-2 sm:py-5">
        <Link
          href="/"
          className={cn(s.logo, 'disable-underline')}
          aria-label="Logo"
        >
          <LogoText />
        </Link>

        {navs.slice(0, -1).map((nav, index) => (
          <Link
            key={index}
            href={nav.link}
            className={cn(
              s.link,
              'disable-underline',
              currentPath === nav.link && s.active
            )}
          >
            <span className="w-5 h-5">{nav.icon}</span>
            <span>{nav.name}</span>
          </Link>
        ))}
      </nav>

      <nav className="mt-auto flex flex-col items-start gap-4 px-2 sm:py-5">
        {navs.slice(-1).map((nav, index) => (
          <Link
            key={index}
            href={nav.link}
            className={cn(
              s.link,
              'disable-underline',
              currentPath === nav.link && s.active
            )}
          >
            <span className="w-5 h-5">{nav.icon}</span>
            <span>{nav.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

function MobileNav({ navs }: NavProps) {
  const currentPath = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <SheetTitle className="sr-only">Menu</SheetTitle>

          <Link
            href="/"
            className={cn(s.logo, 'disable-underline')}
            aria-label="Logo"
          >
            <LogoText />
          </Link>

          {navs.map((nav, index) => (
            <Link
              key={index}
              href={nav.link}
              className={cn(
                s.link,
                'disable-underline',
                currentPath === nav.link && s.active
              )}
            >
              <span className="w-5 h-5">{nav.icon}</span>
              <span>{nav.name}</span>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export { DesktopNav, MobileNav }
