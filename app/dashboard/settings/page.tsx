import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import {
  getUserDetails,
  getSubscription,
  getUser
} from '@/utils/supabase/queries'
import CustomerPortalForm from '@/components/modules/AccountForms/CustomerPortalForm'
import NameForm from '@/components/modules/AccountForms/NameForm'
import EmailForm from '@/components/modules/AccountForms/EmailForm'

export default async function Account() {
  const supabase = createClient()
  const [user, userDetails, subscription] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase),
    getSubscription(supabase)
  ])

  if (!user) {
    return redirect('/signin')
  }

  return (
    <section className="mb-32 bg-white">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-primary sm:text-center sm:text-6xl">
            Account
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-primary sm:text-center sm:text-2xl">
            Manage your account details
          </p>
        </div>
      </div>

      <div className="p-4">
        <NameForm userName={userDetails?.full_name ?? ''} />
        <CustomerPortalForm subscription={subscription} />

        <EmailForm userEmail={user.email} />
      </div>
    </section>
  )
}
