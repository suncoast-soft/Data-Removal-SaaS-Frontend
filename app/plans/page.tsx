'use client'
import OrangeCircleCheck from '@/components/icons/OrangeCircleCheck'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utils/cn'
import React from 'react'

export default function PlansPage() {
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
    <div className="pt-4 pb-[47px] lg:pt-[100px] lg:pb-[40px] text-darkMain">
      <div className="container mx-auto px-4">
        <div>
          <div className="text-center mx-auto">
            <h1 className="text-[34px] lg:text-[50px] leading-[55px] font-bold text-center ">
              Choose A Plan
            </h1>
            <p className="opacity-60 text-[22px] leading-[26px] mt-4 text-center mb-6 lg:mb-[32px]">
              Viewing your search reports is free for everyone, forever
            </p>
          </div>
          <div className="flex  gap-4 flex-wrap justify-center">
            <PlanCard varient="free" data={proPlanList} />
            <PlanCard varient="pro_1" data={proPlanList} />
            <PlanCard varient="pro_2" data={['Everything on Growth plan']} />
          </div>
        </div>
      </div>
    </div>
  )
}

const PlanCard = ({ varient, data = [] }: any) => {
  const cardHeader = () => {
    if (varient === 'free') {
      return (
        <>
          <h3 className="text-2xl lg:text-[32px] lg:leading-[30px] font-bold text-center lg:text-left">
            Free <br />
            <span className="text-[30px] leading-[35px]">forever</span>
          </h3>
        </>
      )
    }
    if (varient === 'pro_1') {
      return (
        <>
          <p className="mb-6 text-lg font-normal">
            Most Popular: <span className="font-bold">Pup Premium</span>
          </p>
          <h3 className="text-center text-2xl lg:text-[32px] lg:leading-[30px] font-bold">
            $99 <br />
            <span className="text-[30px] leading-[35px]">for 1 year</span>
          </h3>

          <p className="mt-4 text-lg font-normal">With Pup Premium you get:</p>
        </>
      )
    }
    if (varient === 'pro_2') {
      return (
        <>
          <p className="mb-6 text-lg font-normal text-white">
            Best Value with{' '}
            <span className="font-bold text-greenMain">Pup Premium</span>
          </p>
          <h3 className="text-center text-2xl lg:text-[32px] lg:leading-[30px] font-bold text-greenMain">
            $$179 <br />
            <span className="text-[30px] leading-[35px] text-white">
              for 2 year
            </span>
          </h3>
        </>
      )
    }
  }
  return (
    <Card
      className={cn(
        'bg-white p-4 max-w-[422px] border-2 border-darkMain relative rounded-3xl !text-darkMain flex-1 flex flex-col justify-between',
        varient === 'pro_1'
          ? 'bg-greenMain text-white border-greenMain'
          : varient === 'pro_2'
            ? 'bg-darkMain text-white'
            : ''
      )}
    >
      <CardHeader className="p-0">
        <CardTitle>
          <div className="flex items-center flex-col justify-center min-h-[200px]">
            {cardHeader()}
          </div>
        </CardTitle>
        {varient === 'pro_2' && (
          <div className="mt-4 mb-6 lg:mb-[30px] flex flex-col flex-wrap lg:flex-row justify-between gap-4">
            {data.map((item: any) => (
              <div
                className={cn(
                  'flex gap-[14px] items-center min-w-[45%] [&>svg>g>path]:stroke-darkMain [&>svg>g>path]:fill-greenMain'
                )}
              >
                <OrangeCircleCheck />
                <p className="font-bold text-sm text-white">{item}</p>
              </div>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {varient !== 'pro_2' && (
          <div className="mt-4 mb-6 lg:mb-[30px] flex flex-col flex-wrap lg:flex-row justify-between gap-4">
            {data.map((item: any) => (
              <div
                className={cn(
                  'flex gap-[14px] items-center min-w-[45%] [&>svg>g>path]:stroke-greenMain [&>svg>g>path]:fill-darkMain',
                  varient === 'pro_2'
                    ? '[&>svg>g>path]:!fill-greenMain [&>svg>g>path]:!stroke-darkMain'
                    : varient === 'free'
                      ? '[&>svg>g>path]:stroke-white'
                      : ''
                )}
              >
                <OrangeCircleCheck />
                <p className="font-bold text-sm">{item}</p>
              </div>
            ))}
          </div>
        )}

        <Button
          variant="default"
          color="white"
          className={cn(
            'w-full lg:w-[303px] whitespace-nowrap z-10 flex items-center text-white border-darkMain bg-darkMain hover:bg-darkMain/90 font-semibold capitalize text-sm mx-auto',
            (varient === 'pro_1' || varient === 'pro_2') &&
              'border-white !bg-white hover:bg-white/90 text-darkMain shadow'
          )}
          type="submit"
        >
          {varient === 'free'
            ? 'I just want to see my digital footprint'
            : varient === 'pro_1'
              ? 'I want an annual plan'
              : 'I want 2 years of data protection'}
        </Button>
      </CardContent>
    </Card>
  )
}
