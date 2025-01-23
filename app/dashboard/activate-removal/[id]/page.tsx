import Title from '@/components/modules/Title'
import StripePricingTable from '@/components/stripe/StripeTable'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getProfile, getUser } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import { Info } from 'lucide-react'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ActivateRemoval({
  params
}: {
  params: { id: string }
}) {
  const supabase = await createClient()
  const [user, profile] = await Promise.all([
    getUser(supabase),
    getProfile(supabase, params.id)
  ])

  if (!user) {
    return redirect('/signin')
  }

  return (
    <>
      <section className="mb-16 bg-white">
        <Title
          title="Activate Privacy Removal Service"
          subtitle="Pay for personal data removal service activation"
        />

        <Alert variant="destructive" className="max-w-3xl mx-auto">
          <Info className="h-4 w-4" />
          <AlertTitle>{`Activating Removal Service for ${profile?.first_name} ${profile?.last_name}`}</AlertTitle>
          <AlertDescription>
            You cannot swap profiles once the service is activated.
          </AlertDescription>
        </Alert>

        <div className="p-4 my-8">
          <StripePricingTable user={user} profile={profile} />
        </div>
      </section>
    </>
  )
}
