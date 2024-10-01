import Link from 'next/link'
import LogoText from '@/components/icons/LogoText'
import { Button } from '@/components/ui/button'

export default async function Navbar() {
  const navLinks = [
    {
      link: '#pricing-plans',
      name: 'Pricing'
    },
    {
      link: '#features',
      name: 'Features'
    },
    {
      link: '#how-it-works',
      name: 'How It Works'
    },
    {
      link: '#faq',
      name: 'FAQs'
    },
    {
      link: '#contact',
      name: 'Contact'
    }
  ]
  return (
    <nav className="sticky top-0 bg-white z-40 transition-all duration-150 h-16 md:h-20">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>

      <div className="max-w-6xl px-6 mx-auto">
        <div className="relative flex flex-row justify-between py-3 align-center md:py-4">
          <div className="flex items-center flex-1">
            <Link
              href="/"
              className="cursor-pointer rounded-full transform duration-100 ease-in-out no-underline"
              aria-label="Logo"
            >
              <LogoText />
            </Link>

            <nav className="ml-6 space-x-2 lg:block">
              {navLinks.map((nav, index) => (
                <Link
                  key={index}
                  href={nav.link}
                  className="inline-flex items-center leading-6 font-medium transition ease-in-out duration-75 cursor-pointer text-slate-700 rounded-md p-1 hover:text-slate-900"
                >
                  {nav.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex justify-end items-center space-x-8">
            <Button variant="default" asChild>
              <Link href="/signin" className="no-underline">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
