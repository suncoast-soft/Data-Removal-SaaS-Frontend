import OrangeCircleCheck from '@/components/icons/OrangeCircleCheck'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utils/cn'
import React from 'react'

// Define reusable types for plan data
type PlanVariant = 'free' | 'pro_1' | 'pro_2'

interface PlanCardProps {
  variant: PlanVariant
  features: string[]
}

const PlansPage = () => {
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

  return (
    <div className="pt-4 pb-12 lg:pt-24 lg:pb-10 text-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mx-auto">
          <h1 className="text-2xl lg:text-4xl font-bold">Choose A Plan</h1>
          <p className="opacity-60 text-lg mt-4 mb-6 lg:mb-8">
            Viewing your search reports is free for everyone, forever
          </p>
        </div>
        <div className="flex gap-4 flex-wrap justify-center">
          <PlanCard variant="free" features={['Limited features']} />
          <PlanCard variant="pro_1" features={proPlanFeatures} />
          <PlanCard variant="pro_2" features={['Everything on Growth plan']} />
        </div>
      </div>
    </div>
  )
}

const PlanCard: React.FC<PlanCardProps> = ({ variant, features }) => {
  // Header rendering logic
  const renderHeader = () => {
    switch (variant) {
      case 'free':
        return (
          <div className="text-center">
            <h3 className="text-xl lg:text-2xl font-bold">Free</h3>
            <span className="text-lg leading-8">forever</span>
          </div>
        )
      case 'pro_1':
        return (
          <div className="text-center">
            <p className="mb-4 text-base font-normal">
              Most Popular: <span className="font-bold">Pup Premium</span>
            </p>
            <h3 className="text-xl lg:text-2xl font-bold">$99</h3>
            <span className="text-lg leading-8">for 1 year</span>
            <p className="mt-4 text-base font-normal">
              With Pup Premium you get:
            </p>
          </div>
        )
      case 'pro_2':
        return (
          <div className="text-center">
            <p className="mb-4 text-base font-normal text-white">
              Best Value with{' '}
              <span className="font-bold text-primary">Pup Premium</span>
            </p>
            <h3 className="text-xl lg:text-2xl font-bold text-primary">$179</h3>
            <span className="text-lg text-white">for 2 years</span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card
      className={cn(
        'flex flex-col justify-between p-6 max-w-md rounded-3xl text-dark border-2 flex-1',
        {
          'bg-primary text-white border-primary': variant === 'pro_1',
          'bg-dark text-white': variant === 'pro_2'
        }
      )}
    >
      <CardHeader>
        <CardTitle className="flex justify-center items-center min-h-[12.5rem]">
          {renderHeader()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="my-6 flex flex-wrap gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                'flex items-center gap-3',
                variant === 'pro_2'
                  ? '[&>svg>g>path]:fill-primary [&>svg>g>path]:stroke-dark'
                  : '[&>svg>g>path]:fill-dark [&>svg>g>path]:stroke-primary'
              )}
            >
              <OrangeCircleCheck />
              <p className="text-sm font-bold">{feature}</p>
            </div>
          ))}
        </div>
        <Button
          variant="default"
          className={cn(
            'w-full lg:w-72 mx-auto text-sm font-semibold capitalize',
            {
              'bg-white text-dark border-white shadow':
                variant === 'pro_1' || variant === 'pro_2',
              'bg-dark text-white border-dark hover:bg-dark/90':
                variant === 'free'
            }
          )}
        >
          {variant === 'free'
            ? 'I just want to see my digital footprint'
            : variant === 'pro_1'
              ? 'I want an annual plan'
              : 'I want 2 years of data protection'}
        </Button>
      </CardContent>
    </Card>
  )
}

export default PlansPage
