import s from './Navbar.module.css'
import Link from 'next/link'
import LogoText from '@/components/icons/LogoText'
import { cn } from '@/utils/cn'

export default async function Navbar() {
  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>

      <div className="max-w-6xl px-6 mx-auto">
        <div className="relative flex flex-row justify-between py-3 align-center md:py-4">
          <div className="flex items-center flex-1">
            <Link
              href="/"
              className={cn(s.logo, 'disable-underline')}
              aria-label="Logo"
            >
              <LogoText />
            </Link>

            <nav className="ml-6 space-x-2 lg:block">
              <Link href="#pricing-plans" className={s.link}>
                Pricing
              </Link>
              <Link href="#features" className={s.link}>
                Features
              </Link>
              <Link href="#how-it-works" className={s.link}>
                How It Works
              </Link>
              <Link href="#faq" className={s.link}>
                FAQs
              </Link>
              <Link href="#contact" className={s.link}>
                Contact
              </Link>
            </nav>
          </div>

          <div className="flex justify-end items-center space-x-8">
            <Link href="/signin" className={s.link}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
