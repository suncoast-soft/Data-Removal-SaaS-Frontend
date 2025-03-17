import SectionHeader from '@/components/modules/SectionHeader'
import BillingHistory from '@/components/sections/BillingHistory'
import BillingPortal from '@/components/sections/BillingPortal'
import { Settings } from '@/sanity.types'
import { displayDate, formatPrice } from '@/utils/helpers'
import { sanityClient } from '@/utils/sanity/lib/client'
import { listInvoices, listPaymentMethods } from '@/utils/stripe/server'
import { getPricingPlan } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Stripe from 'stripe'

export default async function Billing() {
  const cookieStore = await cookies()
  const test = cookieStore.get('test')?.value === 'true'

  const supabase = await createClient()

  const [invoices, paymentMethods, pricing] = await Promise.all([
    listInvoices(supabase),
    listPaymentMethods(supabase),
    getPricingPlan(supabase)
  ])

  const billings =
    invoices?.data.map((invoice: Stripe.Invoice) => ({
      name: `${invoice.number}`,
      date: displayDate(invoice.created * 1000),
      amount: `${formatPrice(invoice.lines.data[0].amount / 100)} ${invoice.lines.data[0].currency.toUpperCase()}`,
      status: invoice.status?.toUpperCase(),
      plan: invoice.lines.data[0].description,
      invoice_pdf: invoice.invoice_pdf
    })) ?? []

  // Features from Sanity CMS
  const settings = (await sanityClient.fetch(
    `*[_type == "settings"][0]`
  )) as Settings
  const basicFeatures = settings?.basicFeatures ?? []
  const pupGuardFeatures = settings?.pupGuardFeatures ?? []

  return (
    <div className="container mx-auto pt-0 px-0">
      <SectionHeader title="Billing Information" />

      <BillingPortal
        paymentMethods={paymentMethods?.data ?? []}
        pricing={pricing}
        basicFeatures={basicFeatures}
        pupGuardFeatures={pupGuardFeatures}
        test={test}
      />

      <SectionHeader title="Payment History" />

      <BillingHistory billings={billings} />
    </div>
  )
}
