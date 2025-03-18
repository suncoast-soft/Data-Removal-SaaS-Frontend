'use client'

import { useRouter, usePathname } from 'next/navigation'
import { createStripePortal } from '@/utils/stripe/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import OrangeCircleCheck from '@/components/icons/OrangeCircleCheck'
import { Mail } from 'lucide-react'
import Stripe from 'stripe'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getBuyLink } from '@/utils/stripe/client'
import { Tables } from '@/types_db'
import { isPremiumUser } from '@/utils/helpers'
import { addYears, format } from 'date-fns'
import { createPricingPlanAction } from '@/utils/supabase/server'

type Pricing = Tables<'pricing_plans'>

interface BillingPortalProps {
  paymentMethods: Stripe.PaymentMethod[]
  pricing: Pricing
  basicFeatures: string[]
  pupGuardFeatures: string[]
  test: boolean
}

export default function BillingPortal({
  paymentMethods,
  pricing,
  basicFeatures,
  pupGuardFeatures,
  test
}: BillingPortalProps) {
  const router = useRouter()
  const currentPath = usePathname()

  const isPremium = pricing ? isPremiumUser(pricing) : false

  const [buyLink, setBuyLink] = useState('')
  useEffect(() => {
    async function handle() {
      const link = await getBuyLink()
      setBuyLink(link)
    }
    handle()
  }, [])

  const handleStripePortalRequest = async () => {
    const redirectUrl = await createStripePortal(currentPath)
    router.push(redirectUrl)
  }

  const handleManualUpgrade = async () => {
    await createPricingPlanAction()
    router.refresh()
  }

  return (
    <>
      <div className="mt-6 lg:mt-10 flex flex-col lg:flex-row gap-6 mb-20">
        {isPremium ? (
          <Card className="bg-white p-6 max-w-xl border-2 border-dark rounded-3xl flex-1">
            <CardHeader>
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div>
                  <span className="text-lg font-medium">Current Plan:</span>

                  <CardTitle className="text-2xl lg:text-4xl font-bold">
                    PupGuard
                  </CardTitle>

                  <h4 className="font-bold text-base my-4">
                    Billed Annually, NO Auto-renew
                  </h4>

                  <p className="text-base">
                    <span className="font-bold">Next Billing Begins:</span>{' '}
                    <span className="font-normal">
                      {format(
                        addYears(
                          new Date(
                            pricing?.updated_at ?? pricing?.created_at ?? null
                          ),
                          1
                        ),
                        'PPP'
                      )}
                    </span>
                  </p>
                </div>

                <Image
                  src="/billing-pro-card-image.png"
                  width={203}
                  height={170}
                  alt={`Pro Plan`}
                  className="min-w-[153px]"
                />
              </div>
            </CardHeader>

            <CardContent>
              <h4 className="font-bold text-base">Premium Benefits:</h4>

              <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                {pupGuardFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <OrangeCircleCheck />
                    <p className="font-bold text-sm">{feature}</p>
                  </div>
                ))}
              </div>

              <Button variant="default" onClick={handleStripePortalRequest}>
                Cancel membership
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white lg:p-6 max-w-xl border-2 border-dark rounded-3xl flex-1">
            <CardHeader>
              <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-6">
                <div className="flex flex-row lg:flex-col items-center lg:items-start lg:flex-shrink-0 gap-2">
                  <span className="text-lg font-medium">Current Plan:</span>

                  <CardTitle className="text-2xl lg:text-4xl font-bold">
                    Free
                  </CardTitle>
                </div>

                <Image
                  src="/billing-free-card-image.png"
                  width={203}
                  height={170}
                  alt={`Free Plan`}
                  className="w-full h-44 object-contain lg:object-right"
                />
              </div>
            </CardHeader>

            <CardContent>
              <div className="mt-4 grid gap-4 mb-8">
                {basicFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <OrangeCircleCheck />
                    <p className="font-bold text-sm">{feature}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {isPremium ? (
          <Card className="bg-dark p-6 lg:p-8 border-2 border-dark rounded-3xl flex-1">
            <CardHeader>
              <CardTitle className="text-2xl lg:text-4xl font-bold text-white">
                Payment Method
              </CardTitle>
            </CardHeader>

            <CardContent className="mt-6">
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div>
                  {paymentMethods.length > 0 ? (
                    <>
                      {paymentMethods.map((method, index) => (
                        <div
                          key={index}
                          className="flex gap-4 items-center text-white mb-5"
                        >
                          <Image
                            src={'/cards/visa-card-image.png'}
                            width={75}
                            height={48}
                            alt="Card Image"
                            className="h-fit"
                          />

                          <div className="flex-1">
                            <h4 className="font-bold capitalize">
                              {method.card?.brand} ending in{' '}
                              {method.card?.last4}
                            </h4>
                            <p className="text-sm">
                              Expiry {method.card?.exp_month}/
                              {method.card?.exp_year}
                            </p>
                            {method.billing_details.email && (
                              <p className="text-sm flex items-center gap-2">
                                <Mail className="w-5 h-5 text-primary" />
                                {method.billing_details.email}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p className="text-xl font-bold text-white">
                      No Payment Methods
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <Button variant="ghost" onClick={handleStripePortalRequest}>
                    {paymentMethods.length > 0 ? 'Edit' : 'Add'}
                  </Button>

                  <p className="text-sm text-right text-white mt-4">
                    Powered by{' '}
                    <a
                      href="https://stripe.com/"
                      className="text-primary font-bold border-b border-primary"
                    >
                      Stripe
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-dark lg:p-6 border-2 border-dark rounded-3xl flex-1 text-white">
            <CardHeader>
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <CardTitle className="text-xl lg:text-3xl font-bold">
                  Upgrade to PupGuard for comprehensive privacy protection
                </CardTitle>

                <Image
                  src="/lp-pro-pricing-image.png"
                  width={154}
                  height={175}
                  alt={`Pro Plan`}
                  className="w-full h-44 object-contain lg:object-right"
                />
              </div>
            </CardHeader>

            <CardContent>
              <div className="mt-4 grid grid-cols-1 gap-4 mb-8">
                {pupGuardFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <OrangeCircleCheck />
                    <p className="font-bold text-sm">{feature}</p>
                  </div>
                ))}
              </div>

              {test ? (
                <>
                  <Button variant="default" onClick={handleManualUpgrade}>
                    Upgrade Now
                  </Button>
                  <p className="mt-2 text-sm">
                    * Test User: clicking this button will automatically upgrade
                    your account without payment. Access is valid until August
                    31, 2025.
                  </p>
                </>
              ) : (
                <Button variant="default" asChild>
                  <Link href={buyLink}>Upgrade Now</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
