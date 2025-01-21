import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const socialLinks = [
  {
    icon: 'Facebook.svg',
    link: 'https://www.facebook.com'
  },
  {
    icon: 'Twitter.svg',
    link: 'https://www.twitter.com'
  },
  {
    icon: 'Instagram.svg',
    link: 'https://www.instagram.com'
  },
  {
    icon: 'LinkedIn.svg',
    link: 'https://www.linkedin.com'
  },
  {
    icon: 'YouTube.svg',
    link: 'https://www.youtube.com'
  }
]

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/' },
      { label: 'Pricing', href: '/' },
      { label: 'Case studies', href: '/' },
      { label: 'Reviews', href: '/' },
      { label: 'Updates', href: '/' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact us', href: '/contact' },
      { label: 'Careers', href: '/' },
      { label: 'Culture', href: '/' },
      { label: 'Blog', href: '/' }
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Getting started', href: '/' },
      { label: 'Help center', href: '/' },
      { label: 'Server status', href: '/' },
      { label: 'Report a bug', href: '/' },
      { label: 'Chat support', href: '/' }
    ]
  },
  {
    title: 'Downloads',
    links: [
      { label: 'iOS', href: '/' },
      { label: 'Android', href: '/' },
      { label: 'Mac', href: '/' },
      { label: 'Windows', href: '/' },
      { label: 'Chrome', href: '/' }
    ]
  }
]

export default function Footer() {
  return (
    <footer className="bg-lp-footer-bg text-dark py-10 lg:pt-[89px] lg:pb-[80px]">
      <div className="container mx-auto px-4 lg:px-[110px]">
        {/* Top Section */}
        <div className="flex flex-wrap items-start justify-center gap-6 pb-8 lg:pb-[60px] border-b border-dashed border-gray-300">
          {/* Logo and Social Links */}
          <div className="w-[340px] flex flex-col gap-4 items-center lg:items-start">
            <Link href="/" className="flex items-center font-bold no-underline">
              <Image
                src="/lp-footer-logo.png"
                width={261}
                height={34}
                alt="Logo"
              />
            </Link>
            <p className="text-base lg:text-lg opacity-50 text-center lg:text-left">
              Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
              mauris sed ma.
            </p>
            <div className="hidden lg:flex gap-2">
              {socialLinks.map((socialLink, index) => (
                <Button
                  key={index}
                  variant="destructive"
                  size="icon"
                  className="rounded-full"
                  asChild
                >
                  <Link
                    href={socialLink.link}
                    target="_blank"
                    className="no-underline"
                  >
                    <Image
                      src={`/footer-social-icons/${socialLink.icon}`}
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
          {footerLinks.map((section, index) => (
            <div key={index} className="lg:flex-1 px-5 lg:px-0">
              <ul className="flex flex-col">
                <li className="pb-4 lg:pb-6">
                  <p className="font-bold text-xl transition hover:text-slate-700">
                    {section.title}
                  </p>
                </li>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="pb-2 lg:pb-[18px]">
                    <Link href={link.href} className="underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Links for Small Screens */}
          <div className="flex gap-2 lg:hidden mt-2">
            {socialLinks.map((socialLink, index) => (
              <Button
                key={index}
                variant="destructive"
                size="icon"
                className="rounded-full"
                asChild
              >
                <Link
                  href={socialLink.link}
                  target="_blank"
                  className="no-underline"
                >
                  <Image
                    src={`/footer-social-icons/${socialLink.icon}`}
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
