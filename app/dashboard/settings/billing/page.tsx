import CustomerPortalForm from '@/components/modules/AccountForms/CustomerPortalForm'
import { isRemovalActive } from '@/utils/helpers'
import { listInvoices, listPaymentMethods } from '@/utils/stripe/server'
import { getPricingPlan, getUser } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'

export default async function Billing() {
  const supabase = createClient()
  const user = await getUser(supabase)

  const invoices = await listInvoices(user?.id ?? '')

  const paymentMethods = await listPaymentMethods(user?.id ?? '')

  const pricing = await getPricingPlan(supabase)
  const removalActivated = pricing ? isRemovalActive(pricing) : false

  const isPaidUser = true || removalActivated

  return (
    <div className="pt-0 px-0 container mx-auto">
      <h1 className="my-6 lg:my-0 text-[34px] lg:text-[50px] lg:leading-[55px] font-bold text-darkMain text-center lg:text-left">
        Billing Information
      </h1>
      <CustomerPortalForm
        user={user}
        invoicesData={invoices?.data}
        paymentMethodsData={paymentMethods?.data}
        isPaidUser={isPaidUser}
      />
    </div>
  )
}
