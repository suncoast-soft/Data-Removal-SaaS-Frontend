import CustomerPortalForm from '@/components/modules/AccountForms/CustomerPortalForm'
import { Tables } from '@/types_db'
import { isRemovalActive } from '@/utils/helpers'
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
  const supabase = createClient()

  const user = await getUser(supabase)

  const [invoices, paymentMethods, pricing] = await Promise.all([
    listInvoices(user?.id ?? '') as Promise<{ data: Invoice[] }>,
    listPaymentMethods(user?.id ?? '') as Promise<{ data: PaymentMethod[] }>,
    getPricingPlan(supabase) as Promise<PricingPlan | null>
  ])

  const isPaidUser = pricing ? isRemovalActive(pricing) : false

  return (
    <div className="container mx-auto pt-0 px-0">
      <h1 className="my-6 text-2xl lg:text-4xl font-bold text-dark text-center lg:text-left">
        Billing Information
      </h1>
      <CustomerPortalForm
        invoicesData={invoices?.data ?? []}
        paymentMethodsData={paymentMethods?.data ?? []}
        isPaidUser={isPaidUser}
      />
    </div>
  )
}
