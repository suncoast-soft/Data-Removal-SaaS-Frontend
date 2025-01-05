'use client'
import Link from 'next/link'
import LogoText from '@/components/icons/LogoText'
import { Button } from '@/components/ui/button'
import Menu from './Menu'
import { User } from '@supabase/supabase-js'
import { usePathname } from 'next/navigation'

export default async function Navbar({ user }: { user: User | null }) {
  const navLinks = [
    {
      link: '/',
      name: 'Home'
    },
    {
      link: '/about',
      name: 'About Us'
    },
    {
      link: '/blog',
      name: 'Blog'
    },
    {
      link: '/contact',
      name: 'Contact'
    }
  ]
  const pathname = usePathname()
  const isDashboardLayout = pathname?.split('/')[1] === 'dashboard'
  if (isDashboardLayout) return null
  return (
    <nav className="sticky top-0 bg-darkMain z-40 transition-all duration-150 h-16 md:h-20 shadow-sm">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>

      <div className="container px-4 lg:px-[110px] mx-auto h-full">
        <div className="relative flex flex-row justify-between align-center h-full">
          <div className="flex items-center flex-1 justify-between">
            <Link
              href="/"
              className="cursor-pointer rounded-full transform duration-100 ease-in-out no-underline w-[170px] lg:min-w-[170px] lg:h-[34.5px]"
              aria-label="Logo"
            >
              <LogoText />
            </Link>
            <Menu navLinks={navLinks} />

            <div className="items-center justify-between gap-6 hidden lg:flex">
              <nav className="ml-6 flex gap-7">
                {navLinks.map((nav, index) => (
                  <Link
                    key={index}
                    href={nav.link}
                    className="inline-flex items-center text-lg leading-[18px] font-normal transition ease-in-out duration-75 cursor-pointer text-white rounded-md p-1 hover:text-gray-300"
                  >
                    {nav.name}
                  </Link>
                ))}
              </nav>
              {!user ? (
                <>
                  <Button variant="secondary" asChild className="h-[54px]">
                    <Link href="/signin/signup" className="no-underline">
                      Get started
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-[54px]">
                    <Link href="/signin" className="no-underline">
                      Sign In
                    </Link>
                  </Button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
