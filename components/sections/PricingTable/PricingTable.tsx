import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ArrowRight from '@/components/icons/ArrowRight'
import GreenCircleCheck from '@/components/icons/GreenCircleCheck'
import OrangeCircleCheck from '@/components/icons/OrangeCircleCheck'
import Link from 'next/link'
import Title from '@/components/modules/Title'

const basicPlanFeatures = [
  'All analytics features',
  'Up to 250,000 tracked visits',
  'Normal support',
  'Mobile app'
]

const proPlanFeatures = [
  'Everything on Growth plan',
  'Up to 50 team members',
  'Up to 5,000,000 tracked visits',
  'Unlimited updates',
  'Dedicated support',
  'Collaboration tools',
  'Mobile app',
  'All integrations included'
]

export default function PricingTable() {
  return (
    <>
      <Title
        title="Affordable pricing plans"
        subtitle="Pricing"
        description="Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu egestas morbi sem vulputate etiam facilisis pellentesque ut quis."
      />

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-5">
          <Card className="border-2 border-dark rounded-3xl h-full">
            <CardHeader>
              <p className="text-right text-2xl lg:text-3xl font-bold text-dark lg:mb-8">
                Free
              </p>

              <div className="flex flex-col lg:flex-row lg:gap-12 items-center">
                <Image
                  src="/lp-basic-pricing-image.png"
                  width={150}
                  height={150}
                  alt="Basic Plan"
                  className="object-contain max-h-[124px]"
                />

                <div>
                  <CardTitle className="text-3xl lg:text-4xl font-bold text-dark">
                    Basic Plan
                  </CardTitle>

                  <p className="mt-4 text-dark/80">
                    Vitae commodo consectetur volutpat aolme atolmerol euismod
                    amet at arcu volutpa.
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <ul className="mt-4 lg:mt-10 mb-8 space-y-4">
                {basicPlanFeatures.map((feature, index) => (
                  <li key={index} className="flex gap-4 items-center">
                    <GreenCircleCheck />
                    <p className="font-bold text-lg text-dark">{feature}</p>
                  </li>
                ))}
              </ul>

              <Button variant="outline" asChild>
                <Link
                  href="/signin"
                  className="no-underline inline-block w-fit"
                >
                  <span className="mr-2">START FOR FREE</span>
                  <ArrowRight />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <Card className="bg-dark border-2 border-dark rounded-3xl">
            <CardHeader>
              <p className="text-right text-2xl lg:text-3xl font-bold text-secondary lg:mb-8">
                $99/year
              </p>

              <div className="flex flex-col lg:flex-row lg:gap-12 items-center">
                <Image
                  src="/lp-pro-pricing-image.png"
                  width={150}
                  height={150}
                  alt="Pro Plan"
                  className="flex-shrink-0 object-contain max-h-[124px]"
                />

                <div>
                  <CardTitle className="text-3xl lg:text-4xl font-bold text-white">
                    Full Protection Plan
                  </CardTitle>

                  <p className="mt-4 text-white">
                    Vitae commodo consectetur volutpat aolme atolmerol euismod
                    amet at arcu volutpa.
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <ul className="mt-4 lg:mt-10 mb-8 space-y-4 lg:columns-2">
                {proPlanFeatures.map((feature, index) => (
                  <li key={index} className="flex gap-4 items-center">
                    <OrangeCircleCheck />
                    <p className="font-medium text-lg text-white">{feature}</p>
                  </li>
                ))}
              </ul>

              <Button asChild>
                <Link
                  href="/signin"
                  className="no-underline inline-block w-fit"
                >
                  <span className="mr-2">GET STARTED</span>
                  <ArrowRight />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
