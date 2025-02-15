import SectionHeader from '@/components/modules/SectionHeader'
import CustomerPortalForm from '@/components/sections/Forms/CustomerPortalForm'
import { Tables } from '@/types_db'
import { isPremiumUser } from '@/utils/helpers'
import { listInvoices, listPaymentMethods } from '@/utils/stripe/server'
import { getPricingPlan, getUser } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'

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

type PricingPlan = Tables<'pricing_plans'>

export default async function Billing() {
  const supabase = await createClient()

  const user = await getUser(supabase)

  const [invoices, paymentMethods, pricing] = await Promise.all([
    listInvoices(user?.id ?? '') as Promise<{ data: Invoice[] }>,
    listPaymentMethods(user?.id ?? '') as Promise<{ data: PaymentMethod[] }>,
    getPricingPlan(supabase) as Promise<PricingPlan | null>
  ])

  const isPaidUser = pricing ? isPremiumUser(pricing) : false

  return (
    <div className="container mx-auto pt-0 px-0">
      <SectionHeader title="Billing Information" />

      <CustomerPortalForm
        invoicesData={invoices?.data ?? []}
        paymentMethodsData={paymentMethods?.data ?? []}
        isPaidUser={isPaidUser}
      />
    </div>
  )
}
