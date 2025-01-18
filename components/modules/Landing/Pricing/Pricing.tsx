import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ArrowRight from '@/components/icons/ArrowRight'
import GreenCircleCheck from '@/components/icons/GreenCircleCheck'
import OrangeCircleCheck from '@/components/icons/OrangeCircleCheck'

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

export default function Pricing() {
  return (
    <div className="container mx-auto px-4 lg:px-12">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h6 className="text-secondary text-xl tracking-widest uppercase">
          Pricing
        </h6>
        <h2 className="text-4xl lg:text-5xl font-bold text-dark">
          Affordable pricing plans
        </h2>
        <p className="mt-4 text-lg text-dark opacity-60">
          Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu
          egestas morbi sem vulputate etiam facilisis pellentesque ut quis.
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Basic Plan */}
        <Card className="bg-transparent p-6 lg:p-8 border-2 border-dark rounded-3xl flex-1">
          <CardHeader className="p-0">
            <CardTitle>
              <p className="text-right text-2xl lg:text-3xl font-bold text-dark lg:mb-8">
                Free
              </p>
              <div className="flex flex-col lg:flex-row lg:gap-6 items-center">
                <Image
                  src="/lp-basic-pricing-image.png"
                  width={200}
                  height={200}
                  alt="Basic Plan"
                  className="min-w-[153px]"
                />
                <div className="mt-6 lg:mt-0">
                  <p className="text-4xl lg:text-5xl font-bold text-dark">
                    Basic Plan
                  </p>
                  <p className="mt-4 text-lg text-dark opacity-80">
                    Vitae commodo consectetur volutpat aolme atolmerol euismod
                    amet at arcu volutpa.
                  </p>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-6">
            <ul className="mb-6 space-y-4">
              {basicPlanFeatures.map((feature, index) => (
                <li key={index} className="flex gap-4 items-center">
                  <GreenCircleCheck />
                  <p className="font-bold text-lg text-dark">{feature}</p>
                </li>
              ))}
            </ul>
            <Button
              variant="outline"
              className="w-full font-bold uppercase flex items-center gap-2 text-dark border-dark border-2 hover:bg-dark hover:text-white"
            >
              Start for Free <ArrowRight />
            </Button>
          </CardContent>
        </Card>

        {/* Pro Plan */}
        <Card className="bg-dark p-6 lg:p-8 border-2 border-dark rounded-3xl flex-1">
          <CardHeader className="p-0">
            <CardTitle>
              <p className="text-right text-2xl lg:text-3xl font-bold text-secondary lg:mb-8">
                $99/year
              </p>
              <div className="flex flex-col lg:flex-row lg:gap-6 items-center">
                <Image
                  src="/lp-pro-pricing-image.png"
                  width={200}
                  height={200}
                  alt="Pro Plan"
                  className="min-w-[153px]"
                />
                <div className="mt-6 lg:mt-0">
                  <p className="text-4xl lg:text-5xl font-bold text-white">
                    Full Protection Plan
                  </p>
                  <p className="mt-4 text-lg text-white opacity-80">
                    Vitae commodo consectetur volutpat a atolmerol euismod amet
                    at arcu volutpat aliquet justo.
                  </p>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-6">
            <ul className="mb-6 space-y-4 lg:space-y-0 lg:space-x-4 lg:flex lg:flex-wrap">
              {proPlanFeatures.map((feature, index) => (
                <li key={index} className="flex gap-4 items-center lg:w-1/2">
                  <OrangeCircleCheck />
                  <p className="font-bold text-lg text-white">{feature}</p>
                </li>
              ))}
            </ul>
            <Button
              variant="default"
              className="w-full font-bold uppercase flex items-center gap-2 text-dark border-dark border-2 bg-white hover:bg-gray-200"
            >
              Get Started <ArrowRight />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
