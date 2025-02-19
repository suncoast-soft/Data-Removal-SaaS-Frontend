import { Button } from '@/components/ui/button'
import { urlFor } from '@/utils/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface FooterProps {
  name: string | undefined
  description: string | undefined
  logo: string | undefined
  footerLinks:
    | {
        title?: string
        links?: Array<{
          label?: string
          href?: string
        }>
      }[]
    | undefined
  socialLinks:
    | {
        icon?: any
        link?: string
      }[]
    | undefined
}

export default function Footer({
  name,
  description,
  logo,
  footerLinks,
  socialLinks
}: FooterProps) {
  return (
    <footer className="bg-lp-footer-bg text-dark py-10 lg:pt-[89px] lg:pb-[80px]">
      <div className="container mx-auto px-4 lg:px-[110px]">
        <div className="flex flex-wrap items-start justify-center gap-6 pb-8 lg:pb-[60px] border-b border-dashed border-gray-300">
          <div className="w-[340px] flex flex-col gap-4 items-center lg:items-start">
            <Link href="/" className="flex items-center font-bold no-underline">
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

            <p className="text-sm lg:text-base opacity-50 text-center lg:text-left">
              {description}
            </p>

            <div className="hidden lg:flex gap-2">
              {socialLinks?.map((socialLink, index) => (
                <Button
                  key={index}
                  variant="destructive"
                  size="icon"
                  className="rounded-full"
                  asChild
                >
                  <Link
                    href={socialLink.link ?? ''}
                    target="_blank"
                    className="no-underline"
                  >
                    <Image
                      src={urlFor(socialLink.icon).width(64).url()}
                      width={64}
                      height={64}
                      alt={socialLink.icon}
                      className="w-full h-full object-contain"
                    />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks?.map((section, index) => (
            <div key={index} className="lg:flex-1 px-5 lg:px-0">
              <ul className="flex flex-col">
                <li className="pb-4 lg:pb-6">
                  <p className="font-bold text-xl transition hover:text-dark">
                    {section.title}
                  </p>
                </li>

                {section.links?.map((link, linkIndex) => (
                  <li key={linkIndex} className="pb-2 lg:pb-[18px]">
                    <Link href={link.href ?? ''} className="underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Links for Small Screens */}
          <div className="flex gap-2 lg:hidden mt-2">
            {socialLinks?.map((socialLink, index) => (
              <Button
                key={index}
                variant="destructive"
                size="icon"
                className="rounded-full"
                asChild
              >
                <Link
                  href={socialLink.link ?? ''}
                  target="_blank"
                  className="no-underline"
                >
                  <Image
                    src={urlFor(socialLink.icon).width(64).url()}
                    width={64}
                    height={64}
                    alt={socialLink.icon}
                    className="w-full h-full object-contain"
                  />
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-center pt-6 text-center text-sm">
          <p className="text-sm">
            Copyright &copy; {new Date().getFullYear()} Pup Erase
          </p>

          <p className="text-sm">All Rights Reserved</p>

          <div className="flex gap-1">
            <Link href="/terms-and-conditions">Terms and Conditions</Link>
            <div className="border-r"></div>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
