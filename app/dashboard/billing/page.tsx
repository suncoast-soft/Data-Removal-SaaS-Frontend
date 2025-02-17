import SectionHeader from '@/components/modules/SectionHeader'
import CustomerPortalForm from '@/components/sections/Forms/CustomerPortalForm'
import { isPremiumUser } from '@/utils/helpers'
import { listInvoices, listPaymentMethods } from '@/utils/stripe/server'
import { getPricingPlan } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'

export default async function Billing() {
  const supabase = await createClient()

  const [invoices, paymentMethods, pricing] = await Promise.all([
    listInvoices(supabase),
    listPaymentMethods(supabase),
    getPricingPlan(supabase)
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
