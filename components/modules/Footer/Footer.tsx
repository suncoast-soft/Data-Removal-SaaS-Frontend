import LogoIcon from '@/components/icons/LogoIcon'
import Link from 'next/link'
import SubscriptionForm from '../AccountForms/SubscriptionForm'

export default function Footer() {
  return (
    <footer className="px-6 bg-slate-900">
      <div className="max-w-6xl px-6 mx-auto">
        <div className="grid grid-cols-1 gap-8 py-12 text-white transition-colors duration-150 border-b lg:grid-cols-8 border-slate-600 bg-slate-900">
          <div className="col-span-1 lg:col-span-2">
            <Link
              href="/"
              className="flex items-center flex-initial font-bold md:mr-24 no-underline"
            >
              <span className="mr-2 border rounded-full border-slate-700">
                <LogoIcon />
              </span>
            </Link>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <ul className="flex flex-col flex-initial md:flex-1">
              <li className="py-3 md:py-0 md:pb-4">
                <p className="font-bold text-white transition duration-150 ease-in-out hover:text-slate-200">
                  COMPANY
                </p>
              </li>
              <li className="py-3 md:py-0 md:pb-4">
                <Link
                  href="/"
                  className="text-white transition duration-150 ease-in-out hover:text-slate-200"
                >
                  About
                </Link>
              </li>
              <li className="py-3 md:py-0 md:pb-4">
                <Link
                  href="/"
                  className="text-white transition duration-150 ease-in-out hover:text-slate-200"
                >
                  Careers
                </Link>
              </li>
              <li className="py-3 md:py-0 md:pb-4">
                <Link
                  href="/"
                  className="text-white transition duration-150 ease-in-out hover:text-slate-200"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <ul className="flex flex-col flex-initial md:flex-1">
              <li className="py-3 md:py-0 md:pb-4">
                <p className="font-bold text-white transition duration-150 ease-in-out hover:text-slate-200">
                  LEGAL
                </p>
              </li>
              <li className="py-3 md:py-0 md:pb-4">
                <Link
                  href="/"
                  className="text-white transition duration-150 ease-in-out hover:text-slate-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="py-3 md:py-0 md:pb-4">
                <Link
                  href="/"
                  className="text-white transition duration-150 ease-in-out hover:text-slate-200"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <ul className="flex flex-col flex-initial md:flex-1">
              <li className="py-3 md:py-0 md:pb-4">
                <p className="font-bold text-white transition duration-150 ease-in-out hover:text-slate-200">
                  NEWSLETTER
                </p>
              </li>
              <li className="py-3 md:py-0 md:pb-4">
                <SubscriptionForm />
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between py-6 space-y-2 md:flex-row bg-slate-900 text-white">
          <div>
            <small>
              &copy; {new Date().getFullYear()} Pup Erase, Inc. All rights
              reserved.
            </small>
          </div>
        </div>
      </div>
    </footer>
  )
}
