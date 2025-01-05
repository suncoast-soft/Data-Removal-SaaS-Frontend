import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const socialLinks = [
    'facebook.png',
    'twitter.png',
    'instagram.png',
    'linked-in.png',
    'youtube.png'
  ]
  return (
    <footer className="bg-lp-footer-bg text-darkMain py-10 lg:pt-[89px] lg:pb-[80px]">
      <div className="container mx-auto px-2 lg:px-[110px]">
        <div className="flex flex-wrap items-center lg:items-start justify-center gap-6 pb-8 lg:pb-[60px] transition-colors duration-150 border-b border-dashed border-gray-300">
          <div className="w-[340px]">
            <div className="flex flex-col gap-4 items-center lg:items-start justify-center lg:justify-start">
              <Link
                href="/"
                className="flex items-center flex-initial font-bold md:mr-24 no-underline"
              >
                <Image
                  src={'/lp-footer-logo.png'}
                  width={261}
                  height={34}
                  alt={`Logo`}
                />
              </Link>

              <p className="text-base lg:text-lg opacity-50 text-center lg:text-left">
                Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
                mauris sed ma
              </p>
              <div className="gap-2 hidden lg:flex">
                {socialLinks.map((item) => (
                  <Image
                    src={`/footer-social-icons/${item}`}
                    width={36}
                    height={36}
                    alt={item}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="lg:flex-1 px-5 lg:px-0">
            <ul className="flex flex-col flex-initial md:flex-1">
              <li className="pb-4 lg:pb-6">
                <p className="font-bold text-xl transition duration-150 ease-in-out hover:text-gray-700">
                  Product
                </p>
              </li>
              <li className="pb-2 lg:pb-[18px]">
                <Link
                  href="/"
                  className=" transition duration-150 ease-in-out hover:text-gray-700 no-underline border-b border-darkMain text-base lg:text-lg leading-[18px]"
                >
                  Features
                </Link>
              </li>
              <li className="pb-2 lg:pb-[18px]">
                <Link
                  href="/"
                  className=" transition duration-150 ease-in-out hover:text-gray-700 no-underline border-b border-darkMain text-base lg:text-lg leading-[18px]"
                >
                  Pricing
                </Link>
              </li>
              <li className="pb-2 lg:pb-[18px]">
                <Link
                  href="/"
                  className=" transition duration-150 ease-in-out hover:text-gray-700 no-underline border-b border-darkMain text-base lg:text-lg leading-[18px]"
                >
                  Case studies
                </Link>
              </li>
              <li className="pb-2 lg:pb-[18px]">
                <Link
                  href="/"
                  className=" transition duration-150 ease-in-out hover:text-gray-700 no-underline border-b border-darkMain text-base lg:text-lg leading-[18px]"
                >
                  Reviews
                </Link>
              </li>
              <li className="">
                <Link
                  href="/"
                  className=" transition duration-150 ease-in-out hover:text-gray-700 no-underline border-b border-darkMain text-base lg:text-lg leading-[18px]"
                >
                  Updates
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:flex-1 px-5 lg:px-0">
            <ul className="flex flex-col flex-initial md:flex-1">
              <li className="pb-4 lg:pb-6">
                <p className="font-bold text-xl transition duration-150 ease-in-out hover:text-gray-700">
                  COMPANY
                </p>
              </li>
              <li className="pb-2 lg:pb-[18px]">
                <Link
                  href="/about"
                  className=" transition duration-150 ease-in-out hover:text-gray-700 no-underline border-b border-darkMain text-base lg:text-lg leading-[18px]"
                >
                  About
                </Link>
              </li>
              <li className="pb-2 lg:pb-[18px]">
                <Link
                  href="/contact"
                  className=" transition duration-150 ease-in-out hover:text-gray-700 no-underline border-b border-darkMain text-base lg:text-lg leading-[18px]"
                >
                  Contact us
                </Link>
              </li>
              <li className="pb-2 lg:pb-[18px]">
                <Link
                  href="/"
                  className=" transition duration-150 ease-in-out hover:text-gray-700 no-underline border-b border-darkMain text-base lg:text-lg leading-[18px]"
                >
                  Careers
                </Link>
              </li>
              <li className="pb-2 lg:pb-[18px]">
                <Link
                  href="/"
                  className=" transition duration-150 ease-in-out hover:text-gray-700 no-underline border-b border-darkMain text-base lg:text-lg leading-[18px]"
                >
                  Culture
                </Link>
              </li>
              <li className="">
                <Link
                  href="/"
                  className=" transition duration-150 ease-in-out hover:text-gray-700 no-underline border-b border-darkMain text-base lg:text-lg leading-[18px]"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:flex-1 px-5 lg:px-0">
            <ul className="flex flex-col flex-initial md:flex-1">
              <li className="pb-4 lg:pb-6">
                <p className="font-bold text-xl transition duration-150 ease-in-out hover:text-gray-700">
                  Support
                </p>
              </li>
              <li className="pb-2 lg:pb-[18px]">
                <Link
                  href="/"
                  className=" transition duration-150 ease-in-out hover:text-gray-700 no-underline border-b border-darkMain text-base lg:text-lg leading-[18px]"
                >
                  Getting started
                </Link>
              </li>
              <li className="pb-2 lg:pb-[18px]">
                <Link
                  href="/"
                  className=" transition duration-150 ease-in-out hover:text-gray-700 no-underline border-b border-darkMain text-base lg:text-lg leading-[18px]"
                >
                  Help center
                </Link>
              </li>
              <li className="pb-2 lg:pb-[18px]">
                <Link
                  href="/"
                  className=" transition duration-150 ease-in-out hover:text-gray-700 no-underline border-b border-darkMain text-base lg:text-lg leading-[18px]"
                >
                  Server status
                </Link>
              </li>
              <li className="pb-2 lg:pb-[18px]">
                <Link
                  href="/"
                  className=" transition duration-150 ease-in-out hover:text-gray-700 no-underline border-b border-darkMain text-base lg:text-lg leading-[18px]"
                >
                  Report a bug
                </Link>
              </li>
              <li className="">
                <Link
                  href="/"
                  className=" transition duration-150 ease-in-out hover:text-gray-700 no-underline border-b border-darkMain text-base lg:text-lg leading-[18px]"
                >
                  Chat support
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:flex-1 px-5 lg:px-0">
            <ul className="flex flex-col flex-initial md:flex-1">
              <li className="pb-4 lg:pb-6">
                <p className="font-bold text-xl transition duration-150 ease-in-out hover:text-gray-700">
                  Downloads
                </p>
              </li>
              <li className="pb-2 lg:pb-[18px]">
                <Link
                  href="/"
                  className=" transition duration-150 ease-in-out hover:text-gray-700 no-underline border-b border-darkMain text-base lg:text-lg leading-[18px]"
                >
                  iOS
                </Link>
              </li>
              <li className="pb-2 lg:pb-[18px]">
                <Link
                  href="/"
                  className=" transition duration-150 ease-in-out hover:text-gray-700 no-underline border-b border-darkMain text-base lg:text-lg leading-[18px]"
                >
                  Android
                </Link>
              </li>
              <li className="pb-2 lg:pb-[18px]">
                <Link
                  href="/"
                  className=" transition duration-150 ease-in-out hover:text-gray-700 no-underline border-b border-darkMain text-base lg:text-lg leading-[18px]"
                >
                  Mac
                </Link>
              </li>
              <li className="pb-2 lg:pb-[18px]">
                <Link
                  href="/"
                  className=" transition duration-150 ease-in-out hover:text-gray-700 no-underline border-b border-darkMain text-base lg:text-lg leading-[18px]"
                >
                  Windows
                </Link>
              </li>
              <li className="">
                <Link
                  href="/"
                  className=" transition duration-150 ease-in-out hover:text-gray-700 no-underline border-b border-darkMain text-base lg:text-lg leading-[18px]"
                >
                  Chrome
                </Link>
              </li>
            </ul>
          </div>
          <div className="gap-2 flex lg:hidden mt-2">
            {socialLinks.map((item) => (
              <Image
                src={`/footer-social-icons/${item}`}
                width={36}
                height={36}
                alt={item}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pt-6 text-center text-sm">
          <div>
            <p className="text-sm">
              Copyright &copy; {new Date().getFullYear()} Pup Erase <br />
              All Rights Reserved
            </p>
            <Link
              href="/"
              className=" transition duration-150 ease-in-out hover:text-gray-700 no-underline border-b border-darkMain text-sm leading-[18px] font-semibold mt-1"
            >
              Terms and Conditions | Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
