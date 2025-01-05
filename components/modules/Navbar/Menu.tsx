'use client'
import MenuIcon from '@/components/icons/MenuIcon'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Menu({ navLinks }: any) {
  const [toggle, setToggle] = useState(false)
  return (
    <>
      <Button
        variant={'link'}
        className="lg:hidden hover:no-underline p-0"
        onClick={() => setToggle(!toggle)}
      >
        <MenuIcon />
      </Button>
      {toggle && (
        <div className="fixed left-0 top-0 flex flex-col px-4 py-5 gap-6 lg:hidden bg-darkMain/90 w-full h-screen pt-12">
          <X
            className="text-orangeMain text-xl cursor-pointer absolute right-4 top-4"
            onClick={() => setToggle(false)}
          />
          <nav className="ml-6 flex flex-col gap-7">
            {navLinks.map((nav: any, index: number) => (
              <Link
                key={index}
                href={nav.link}
                className="inline-flex items-center text-lg leading-[18px] font-medium transition ease-in-out duration-75 cursor-pointer text-white rounded-md p-1 hover:text-gray-300"
              >
                {nav.name}
              </Link>
            ))}
          </nav>
          <Button variant="default" asChild className="h-[54px]">
            <Link href="/signin/signup" className="no-underline">
              Get started
            </Link>
          </Button>
          <Button variant="secondary" asChild className="h-[54px]">
            <Link href="/signin" className="no-underline">
              Sign In
            </Link>
          </Button>
        </div>
      )}
    </>
  )
}
