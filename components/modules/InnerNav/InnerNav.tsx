'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { cn } from '@/utils/cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  name: string
  link: string
}

interface InnerNavProps {
  navs: NavItem[]
}

export default function InnerNav({ navs }: InnerNavProps) {
  const pathname = usePathname()

  return (
    <NavigationMenu className="w-full max-w-full justify-start px-2 py-2 bg-slate-200 rounded mb-8">
      <NavigationMenuList className="gap-2">
        {navs.map((nav, index) => (
          <NavigationMenuItem key={index}>
            <Link href={nav.link} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === nav.link
                    ? 'bg-white focus:bg-white'
                    : 'bg-transparent',
                  'no-underline'
                )}
              >
                {nav.name}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
