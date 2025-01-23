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
import { format } from 'date-fns'
import { Mail } from 'lucide-react'

interface PaymentMethod {
  card: {
    brand: string
    last4: string
    exp_month: number
    exp_year: number
  }
  billing_details: {
    email?: string
  }
}

interface Invoice {
  lines: {
    data: {
      currency: string
      amount: number
      description: string
    }[]
  }
  number: string
  created: number
  status: string
  invoice_pdf: string
}

interface CustomerPortalFormProps {
  paymentMethodsData: PaymentMethod[]
  invoicesData: Invoice[]
  isPaidUser?: boolean
}

export default function CustomerPortalForm({
  paymentMethodsData,
  invoicesData,
  isPaidUser = false
}: CustomerPortalFormProps) {
  const router = useRouter()
  const currentPath = usePathname()

  const handleStripePortalRequest = async () => {
    const redirectUrl = await createStripePortal(currentPath)
    router.push(redirectUrl)
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

  const billings = invoicesData.map((invoice) => ({
    ...invoice,
    amount: `${invoice.lines.data[0].currency.toUpperCase()} ${
      invoice.lines.data[0].currency === 'usd' ? '$' : ''
    }${invoice.lines.data[0].amount}`,
    name: `Invoice-${invoice.number}-${format(
      new Date(invoice.created),
      'dd, yyyy'
    )}`,
    date: format(new Date(invoice.created), 'MM/dd/yyyy'),
    status: invoice.status,
    plan: invoice.lines.data[0].description,
    invoice_pdf: invoice.invoice_pdf,
    user: 1
  }))

  return (
    <div>
      {/* Plan Details Section */}
      <div className="mt-6 lg:mt-10 flex flex-col lg:flex-row gap-6">
        <Card className="bg-white p-6 max-w-xl border-2 border-dark rounded-3xl flex-1">
          <CardHeader>
            <CardTitle>
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div>
                  <span className="text-lg font-medium">Current Plan:</span>
                  <h3 className="text-2xl lg:text-4xl font-bold">
                    {isPaidUser ? 'Pup Premium' : 'Free'}
                  </h3>
                  {!isPaidUser && (
                    <>
                      <p className="mt-2 text-base">
                        It will always be free to review your reports.
                      </p>
                      <div className="mt-4">
                        <p className="font-medium text-base">
                          Upgrade to start removing your reports
                        </p>
                        <h4 className="font-bold text-2xl">Pup Premium</h4>
                      </div>
                    </>
                  )}
                  <h4 className="font-bold text-base my-4">
                    Billed Annually, NO Auto-renew
                  </h4>
                  {isPaidUser && (
                    <p className="text-base">
                      <span className="font-bold">Next Billing Begins:</span>{' '}
                      <span className="font-normal">11 December 2025</span>
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
          <CardContent>
            <h4 className="font-bold text-base">Premium Benefits:</h4>
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {proPlanList.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <OrangeCircleCheck />
                  <p className="font-bold text-sm">{item}</p>
                </div>
              ))}
            </div>
            <Button
              variant="default"
              className={cn(
                'w-full lg:w-72 mt-6 font-bold text-sm capitalize',
                isPaidUser
                  ? 'bg-dark text-white hover:bg-dark/90'
                  : 'bg-white text-dark border-secondary hover:bg-gray-100'
              )}
            >
              <Link href="/checkout" className="no-underline">
                {isPaidUser ? 'Cancel membership' : 'Upgrade'}
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Payment Methods Section */}
        <Card className="bg-dark p-6 lg:p-8 border-2 border-dark rounded-3xl flex-1">
          <CardHeader>
            <CardTitle>
              <h3 className="text-2xl lg:text-4xl font-bold text-white">
                Payment Method
              </h3>
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-6">
            {paymentMethodsData.length > 0 ? (
              paymentMethodsData.map((method, index) => (
                <div key={index} className="flex gap-4 items-center text-white">
                  <Image
                    src={'/cards/visa-card-image.png'}
                    width={75}
                    height={48}
                    alt="Card Image"
                    className="h-fit"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold">
                      {method.card.brand} ending in {method.card.last4}
                    </h4>
                    <p className="text-sm">
                      Expiry {method.card.exp_month}/{method.card.exp_year}
                    </p>
                    {method.billing_details.email && (
                      <p className="text-sm flex items-center gap-2">
                        <Mail className="w-5 h-5 text-primary" />
                        {method.billing_details.email}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="default"
                    className="bg-white text-dark border-transparent"
                    onClick={handleStripePortalRequest}
                  >
                    Edit
                  </Button>
                </div>
              ))
            ) : (
              <>
                <Button variant="default" onClick={handleStripePortalRequest}>
                  Open Billing Manager Portal
                </Button>
                <p className="text-sm text-white/80 mt-2">
                  You will be redirected to your billing dashboard.
                </p>
              </>
            )}
            <p className="text-sm text-center mt-6 text-white">
              Powered by{' '}
              <a
                href="https://stripe.com/"
                className="text-primary font-bold border-b border-primary"
              >
                Stripe
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Billing History */}
      <div className="mt-16">
        <h3 className="text-2xl lg:text-4xl font-bold text-dark">
          Billing History
        </h3>
        <BillingHistoryTable data={billings} />
      </div>
    </div>
  )
}
