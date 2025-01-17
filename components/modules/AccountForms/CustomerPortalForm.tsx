'use client'

import { useRouter, usePathname } from 'next/navigation'
import { createStripePortal } from '@/utils/stripe/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import OrangeCircleCheck from '@/components/icons/OrangeCircleCheck'
import { cn } from '@/utils/cn'
import BillingHistoryTable from '../Billing/BillingHistoryTable'
import Link from 'next/link'
import { useState } from 'react'
import { User } from '@supabase/supabase-js'
import { formatDate } from 'date-fns'
import { Mail } from 'lucide-react'

export default function CustomerPortalForm({
  user,
  paymentMethodsData,
  invoicesData,
  isPaidUser
}: {
  user: User | null
  paymentMethodsData: any
  invoicesData: any
  isPaidUser?: boolean
}) {
  const router = useRouter()
  const currentPath = usePathname()

  const handleStripePortalRequest = async () => {
    const redirectUrl = await createStripePortal(currentPath)
    return router.push(redirectUrl)
  }

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
  const [billings] = useState<any>(
    invoicesData?.length
      ? invoicesData.map((li: any) => ({
          ...li,
          amount: `${li.lines.data[0].currency.toUpperCase()} ${li.lines.data[0].currency === 'usd' ? '$' : ''}${li.lines.data[0].amount}`,
          name: `Invoice-${li.number}-${formatDate(new Date(li.created), 'dd, yyyy')}`,
          date: formatDate(new Date(li.created), 'mm, dd, yyyy'),
          status: li.status,
          plan: li.lines.data[0].description,
          invoice_pdf: li.invoice_pdf,
          users: 1
        }))
      : []
  )
  const [paymentMethods] = useState<any>(paymentMethodsData)

  return (
    <div>
      <div className="mt-6 gap-6 lg:mt-10 lg:gap-4 flex flex-col lg:flex-row">
        <Card className="bg-white p-4 max-w-[544px min-w-[398px] border-2 border-darkMain relative rounded-3xl !text-darkMain flex-1">
          <CardHeader className="p-0">
            <CardTitle>
              <div className="flex flex-col lg:flex-row lg:gap-[22px] items-center">
                <div className=" max-w-[300px]">
                  <span className="text-lg font-medium">Current Plan: </span>
                  <h3 className="text-2xl lg:text-[32px] lg:leading-[30px] font-bold text-center lg:text-left">
                    {isPaidUser ? 'Pup Premium' : 'Free'}
                  </h3>
                  {!isPaidUser && (
                    <div>
                      <p className="mt-2 mb-4 text-base font-normal">
                        It will always be free to review your reports
                      </p>
                      <div className="mb-[21px]">
                        <p className="font-medium text-base">
                          Upgrade to start removing your reports{' '}
                        </p>
                        <h4 className="font-bold text-2xl text-left">
                          Pup Premium
                        </h4>
                      </div>
                    </div>
                  )}
                  <h4 className="font-bold text-base my-4">
                    Billed Annually, NO Auto-renew
                  </h4>
                  {isPaidUser && (
                    <p className="text-base my-4">
                      <span className="font-bold">Next Billing Begins:</span>{' '}
                      <span className="font-normal"> 11 December 2025</span>
                    </p>
                  )}
                </div>
                <Image
                  src={
                    isPaidUser
                      ? '/billing-pro-card-image.png'
                      : '/billing-free-card-image.png'
                  }
                  width={203}
                  height={170}
                  alt={`Pro Plan`}
                  className="min-w-[153px]"
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <h4 className="font-bold text-base">Premium Benefits:</h4>
            <div className="mt-4 mb-6 lg:mb-[30px] flex flex-col flex-wrap lg:flex-row justify-between gap-4">
              {proPlanList.map((item) => (
                <div className="flex gap-[14px] items-center min-w-[45%] [&>svg>g>path]:stroke-white [&>svg>g>path]:fill-darkMain">
                  <OrangeCircleCheck />
                  <p className="font-bold text-sm">{item}</p>
                </div>
              ))}
            </div>

            <Button
              variant="default"
              color="white"
              className={cn(
                'w-full lg:w-[271px] z-10 font-bold flex items-center gap-2 text-darkMain border-darkMain border-2 capitalize',
                isPaidUser
                  ? 'border-darkMain bg-darkMain hover:bg-darkMain/90 text-white'
                  : ' border-secondary'
              )}
              type="button"
              asChild
            >
              <Link href="/checkout" className="no-underline">
                {isPaidUser ? 'Cancel membership' : 'Upgrade'}
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-darkMain p-4 lg:p-[32px] border-2 border-darkMain relative rounded-3xl flex-1">
          <CardHeader className="p-0">
            <CardTitle>
              <h3 className="text-2xl text-white lg:text-[32px] lg:leading-[30px] font-bold text-center lg:text-left">
                Payment Method
              </h3>
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-[39px] pl-0 flex flex-col justify-center items-center">
            {paymentMethods?.length ? (
              paymentMethods.map((item: any, i: number) => (
                <div className="flex gap-3 text-white w-full lg:items-center">
                  <Image
                    src={'/cards/visa-card-image.png'}
                    width={75}
                    height={48}
                    alt={'Card Image'}
                    className="h-fit mt-5 lg:mt-0 "
                  />

                  <div className="flex flex-wrap gap-8 items-center flex-1 justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center gap-4">
                        <h3 className="font-bold text-base lg:text-lg">
                          <span className="capitalize">{item.card.brand}</span>{' '}
                          ending in {item.card.last4}
                        </h3>
                        {i === 0 ? (
                          <span className="text-sm p-2 font-bold border-white border rounded-full text-center">
                            Default
                          </span>
                        ) : null}
                      </div>
                      <p className="font-normal text-xs  lg:text-sm">
                        Expiry {item.card.exp_month}/{item.card.exp_year}
                      </p>
                      {item.billing_details.email ? (
                        <div className="flex gap-2 items-center">
                          <Mail className="w-5 h-5 text-primary" />{' '}
                          {item.billing_details.email}
                        </div>
                      ) : null}
                    </div>
                    <Button
                      type="button"
                      variant={'default'}
                      className="bg-white hover:bg-secondary text-darkMain border-transparent w-full lg:w-[140px]"
                      onClick={handleStripePortalRequest}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <>
                <Button
                  type="button"
                  variant="default"
                  onClick={handleStripePortalRequest}
                >
                  Open Billing Manager Portal
                </Button>

                <p className="text-sm text-white/80 ml-2 mt-2">
                  You will be redirected to your dedicated billing management
                  dashboard.
                </p>
              </>
            )}

            <p className="text-sm text-center lg:text-right mt-2 lg:mt-10 text-white w-full">
              Powered by{' '}
              <a
                className="text-primary font-bold no-underline border-b border-primary leading-3"
                href="https://stripe.com/"
              >
                Stripe
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-[60px] lg:mt-[50px]">
        <h3 className="text-2xl text-darkMain lg:text-[32px] lg:leading-[30px] font-bold text-center lg:text-left">
          Billing History
        </h3>
        <BillingHistoryTable data={billings} />
      </div>
    </div>
  )
}
