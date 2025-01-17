'use client'

import MenuIcon from '@/components/icons/MenuIcon'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

interface NavLink {
  name: string
  link: string
}

export default function Menu({ navLinks }: { navLinks: NavLink[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Hamburger Menu Button */}
      <Button
        variant="link"
        className="lg:hidden p-0 hover:no-underline"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label="Toggle Menu"
      >
        <MenuIcon />
      </Button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-darkMain/90 flex flex-col items-start gap-6 px-4 py-5 lg:hidden pt-12 z-50">
          {/* Close Button */}
          <X
            className="text-orangeMain text-xl absolute right-4 top-4 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close Menu"
          />

          {/* Navigation Links */}
          <nav className="ml-6 flex flex-col gap-7">
            {navLinks.map((nav, index) => (
              <Link
                key={index}
                href={nav.link}
                className="text-lg font-medium leading-[18px] text-white transition hover:text-gray-300 rounded-md p-1"
                onClick={() => setIsMenuOpen(false)} // Close menu on link click
              >
                {nav.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <Button variant="default" asChild className="h-14 w-full">
            <Link href="/signin/signup" className="no-underline">
              Get started
            </Link>
          </Button>
          <Button variant="secondary" asChild className="h-14 w-full">
            <Link href="/signin" className="no-underline">
              Sign In
            </Link>
          </Button>
        </div>
      )}
    </>
  )
}
