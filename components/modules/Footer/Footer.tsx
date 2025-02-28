import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SanityImage from '../SanityImage'
import { Settings } from '@/sanity.types'

interface FooterProps {
  name: string | undefined
  description: string | undefined
  logo: string | undefined
  footerLinks: Settings['footerLinks']
  socialLinks: Settings['socialLinks']
}

export default function Footer({
  name,
  description,
  logo,
  footerLinks,
  socialLinks
}: FooterProps) {
  return (
    <footer className="bg-lp-footer-bg text-dark py-10 lg:pt-20">
      <div className="container max-w-6xl px-4 lg:px-28">
        <Link href="/" className="flex font-bold mb-4">
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

        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-16 pb-8 lg:pb-20 border-b border-dashed border-gray-300">
          <div className="w-full lg:w-2/5 max-w-96 flex flex-col gap-4 items-start">
            <p className="text-sm lg:text-base opacity-50">{description}</p>
          </div>

          {/* Footer Links */}
          <div className="flex-grow">
            <div className="flex flex-col lg:flex-row justify-center lg:justify-start gap-3 lg:gap-12 mb-8">
              {footerLinks?.map((link, index) => (
                <Link key={index} href={`${link.link}`} className="underline">
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex gap-4">
              {socialLinks?.map((socialLink, index) => (
                <Button
                  key={index}
                  variant="destructive"
                  size="icon"
                  className="rounded-full"
                  asChild
                >
                  <Link href={socialLink.link ?? ''} target="_blank">
                    <SanityImage
                      src={socialLink.icon}
                      width={64}
                      height={64}
                      alt={`${socialLink.icon}`}
                      className="w-full h-full object-contain"
                    />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-center pt-6 text-center text-sm">
          <p className="text-sm">
            Copyright &copy; {new Date().getFullYear()} Pup Erase
          </p>

          <p className="text-sm">All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}
