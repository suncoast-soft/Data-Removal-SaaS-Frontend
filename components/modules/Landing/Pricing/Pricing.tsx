import ArrowRight from '@/components/icons/ArrowRight'
import GreenCircleCheck from '@/components/icons/GreenCircleCheck'
import OrangeCircleCheck from '@/components/icons/OrangeCircleCheck'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

export default function Pricing() {
  const cards = [
    {
      icon: '/lp-pricing-1.png',
      title: 'Create an account',
      description:
        'Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalar consectur elementum tempus hac.'
    },
    {
      icon: '/lp-pricing-2.png',
      title: 'Run a quick search',
      description:
        'Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalar consectur elementum tempus hac.'
    },
    {
      icon: '/lp-pricing-3.png',
      title: 'We remove your info',
      description:
        'Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalar consectur elementum tempus hac.'
    }
  ]

  const basicPlanList = [
    'All analytics features',
    'Up to 250,000 tracked visits',
    'Normal support',
    'Mobile app'
  ]
  const proPlanList = [
    'Everything on Growth plan',
    'Up to 50 team members',
    'Up to 5,000,000 tracked visits',
    'Unlimited updates',
    'Dedicated support',
    'Collaboration tools',
    'Mobile app',
    'All integrations included'
  ]

  return (
    <>
      <div className="text-center max-w-[706px] mx-auto">
        <h6 className="text-orangeMain text-xl tracking-widest uppercase">
          Pricing
        </h6>
        <h2 className="text-4xl lg:text-[45px] lg:leading-[55px] font-bold text-center text-darkMain">
          Affordable pricing plans
        </h2>
        <p className="mt-4 text-base text-darkMain lg:text-lg text-center opacity-60">
          Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu
          egestas morbi sem vulputate etiam facilisis pellentesque ut quis.
        </p>
      </div>

      <div className="mt-6 gap-6 lg:mt-10 lg:gap-4 flex flex-col lg:flex-row">
        <Card className="bg-transparent p-4 lg:p-[32px] border-2 border-darkMain relative rounded-3xl min-w-[40%]">
          <CardHeader className="p-0">
            <CardTitle>
              <h3 className="absolute right-5 top-5 lg:relative text-right text-2xl lg:text-[32px] leading-[18px] font-bold text-darkMain lg:mb-[66px]">
                Free
              </h3>
              <div className="flex flex-col lg:flex-row lg:gap-[22px] items-center">
                <Image
                  src={'/lp-basic-pricing-image.png'}
                  width={200}
                  height={200}
                  alt={`Basic Plan`}
                  className="min-w-[153px]"
                />
                <div className="">
                  <h3 className="text-4xl lg:text-[45px] lg:leading-[30px] font-bold text-center lg:text-left mt-6 lg:mt-0 text-darkMain">
                    Basic Plan
                  </h3>
                  <p className="mt-4 text-base lg:mt-6 text-center lg:text-left lg:text-lg text-darkMain font-normal">
                    Vitae commodo consectetur volutpat aolme atolmerol euismod
                    amet at arcu volutpa.
                  </p>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="mt-4 mb-6 lg:mt-[52px] lg:mb-[30px] flex flex-col gap-4">
              {basicPlanList.map((item) => (
                <div className="flex gap-[14px] items-center">
                  <GreenCircleCheck />
                  <p className="font-bold text-lg text-darkMain">{item}</p>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              color="white"
              className="w-full lg:w-[271px] z-10 font-bold uppercase flex items-center gap-2 text-darkMain border-darkMain border-2  hover:bg-darkMain"
              type="submit"
            >
              Start for Free <ArrowRight />
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-darkMain p-4 lg:p-[32px] border-2 border-darkMain relative rounded-3xl">
          <CardHeader className="p-0">
            <CardTitle>
              <h3 className="absolute right-5 top-5 lg:relative text-right text-2xl lg:text-[32px] leading-[18px] font-bold text-orangeMain lg:mb-[30px]">
                $99/year
              </h3>
              <div className="flex flex-col lg:flex-row lg:gap-[22px] items-center">
                <Image
                  src={'/lp-pro-pricing-image.png'}
                  width={200}
                  height={200}
                  alt={`Pro Plan`}
                  className="min-w-[153px]"
                />
                <div className="">
                  <h3 className="text-4xl lg:text-[45px] lg:leading-[30px] font-bold text-center lg:text-left mt-6 text-white lg:mt-[30px]">
                    Full Protection Plan
                  </h3>
                  <p className="mt-4 text-base lg:mt-6 text-center lg:text-left lg:text-lg text-white font-normal">
                    Vitae commodo consectetur volutpat a atolmerol euismod amet
                    at arcu volutpat aliquet justo.
                  </p>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="mt-4 mb-6 lg:mt-[52px] lg:mb-[30px] flex flex-col flex-wrap lg:flex-row justify-between gap-4">
              {proPlanList.map((item) => (
                <div className="flex gap-[14px] items-center min-w-[48%]">
                  <OrangeCircleCheck />
                  <p className="font-bold text-lg text-white">{item}</p>
                </div>
              ))}
            </div>

            <Button
              variant="default"
              color="white"
              className="w-full lg:w-[271px] z-10 font-bold uppercase flex items-center gap-2 text-darkMain border-darkMain border-2"
              type="submit"
            >
              GET started <ArrowRight />
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
