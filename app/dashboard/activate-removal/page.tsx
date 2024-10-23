import Title from '@/components/modules/Title'
import StripePricingTable from '@/components/stripe/StripeTable'
import { getUser } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Index() {
  const supabase = createClient()
  const [user] = await Promise.all([getUser(supabase)])

  if (!user) {
    return redirect('/signin')
  }

  return (
    <>
      <section className="mb-16 bg-white">
        <Title
          title="Activate Privacy Protection"
          subtitle="Pay for personal data removal service activation"
        />

        <div className="p-4 my-8">
          <StripePricingTable user={user} />
        </div>
      </section>
    </>
  )
}
