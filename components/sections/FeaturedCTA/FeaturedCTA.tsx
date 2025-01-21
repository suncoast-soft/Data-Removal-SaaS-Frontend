import ArrowRight from '@/components/icons/ArrowRight'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function FeaturedCTA() {
  return (
    <div className="text-center flex items-center flex-col lg:flex-row gap-[56px]">
      <div className="order-2 lg:order-1">
        <Image
          src={'/lp-create-account-image.png'}
          width={623}
          height={557}
          alt={`Create Account`}
        />
      </div>

      <div className="order-1 lg:order-2 max-w-[531px] px-2">
        <h2 className="text-4xl lg:text-[55px] lg:leading-[55px] font-bold lg:text-left text-dark text-center">
          Create your account today and get started for free!
        </h2>

        <div className="flex items-center gap-4 lg:gap-6 mt-4 lg:mt-10">
          <Button variant="secondary" asChild>
            <Link href="/signin/signup" className="no-underline">
              <span className="mr-2">GET STARTED</span>
              <ArrowRight />
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/contact-us" className="no-underline">
              TALK TO SALES
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
