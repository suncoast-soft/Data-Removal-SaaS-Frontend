import Link from 'next/link'
import LogoText from '@/components/icons/LogoText'
import { Button } from '@/components/ui/button'
import Menu from './Menu'
import { User } from '@supabase/supabase-js'

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
      link: '/contact',
      name: 'Contact'
    }
  ]

  return (
    <nav className="sticky top-0 bg-dark z-40 transition-all duration-150 h-16 md:h-20 shadow-sm shadow-white/60">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>

      <div className="container px-4 lg:px-[110px] mx-auto h-full">
        <div className="relative flex flex-row justify-between align-center h-full">
          <div className="flex items-center flex-1 justify-between">
            <Link href="/" className="no-underline" aria-label="Logo">
              <LogoText />
            </Link>

            <Menu navLinks={navLinks} />

            <div className="items-center justify-between gap-6 hidden lg:flex">
              <nav className="mx-6 flex gap-7">
                {navLinks.map((nav, index) => (
                  <Link
                    key={index}
                    href={nav.link}
                    className="no-underline text-white hover:text-white/80"
                  >
                    {nav.name}
                  </Link>
                ))}
              </nav>

              {!user ? (
                <>
                  <Button variant="secondary" className="h-12 px-6" asChild>
                    <Link
                      href="/signin/signup"
                      className="no-underline font-semibold"
                    >
                      Get started
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-12 px-6 text-primary border-primary hover:text-dark hover:bg-primary"
                    asChild
                  >
                    <Link href="/signin" className="no-underline font-semibold">
                      Login
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
