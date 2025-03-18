import Link from 'next/link'
import { Button } from '@/components/ui/button'
import NavbarMobile from './NavbarMobile'
import { User } from '@supabase/supabase-js'
import Image from 'next/image'

interface NavbarProps {
  name: string | undefined
  logo: string | undefined
  navLinks:
    | {
        name?: string | undefined
        link?: string | undefined
      }[]
    | undefined
  user?: User | null
}

export default async function Navbar({
  name,
  logo,
  navLinks,
  user
}: NavbarProps) {
  return (
    <nav className="sticky top-0 bg-dark z-40 transition-all duration-150 h-16 md:h-20 shadow-sm shadow-white/60">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>

      <div className="container px-4 lg:px-24 mx-auto h-full">
        <div className="relative flex flex-row justify-between align-center h-full">
          <div className="flex items-center flex-1 justify-between">
            <Link href="/" aria-label="Logo">
              {logo ? (
                <Image
                  src={logo}
                  width={200}
                  height={54}
                  alt={name || 'Pup Erase'}
                />
              ) : (
                <h1 className="">{name || 'Pup Erase'}</h1>
              )}
            </Link>

            <NavbarMobile user={user} navLinks={navLinks} />

            <div className="items-center justify-between gap-6 hidden lg:flex">
              <nav className="mx-6 flex gap-7">
                {navLinks?.map((nav, index) => (
                  <Link
                    key={index}
                    href={nav.link ?? ''}
                    className="text-white hover:text-white/80"
                  >
                    {nav.name}
                  </Link>
                ))}
              </nav>

              {user && !user.is_anonymous ? (
                <>
                  <Button variant="secondary" className="h-12 px-6" asChild>
                    <Link href="/dashboard" className="font-semibold">
                      Dashboard
                    </Link>
                  </Button>
                </>
              ) : (
                <div className="flex gap-3">
                  <Button variant="outline" className="h-12" asChild>
                    <Link href="/auth/login" className="font-semibold">
                      Login
                    </Link>
                  </Button>

                  <Button variant="default" className="h-12" asChild>
                    <Link href="/auth/register" className="font-semibold">
                      Create Account
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
