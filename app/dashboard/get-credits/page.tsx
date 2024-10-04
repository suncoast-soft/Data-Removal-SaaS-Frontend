import StripePricingTable from '@/components/stripe/StripeTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCredits, getUser } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Index() {
  const supabase = createClient()
  const [user, credits] = await Promise.all([
    getUser(supabase),
    getCredits(supabase)
  ])

  if (!user) {
    return redirect('/signin')
  }

  return (
    <>
      <section className="mb-16 bg-white">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
          <div className="sm:align-center sm:flex sm:flex-col">
            <h1 className="text-4xl font-extrabold text-primary sm:text-center sm:text-6xl">
              Buy Removal Credits
            </h1>
            <p className="max-w-2xl m-auto mt-5 text-xl text-primary sm:text-center sm:text-2xl">
              The greater the number of removal credits you possess, the more
              secure your personal information becomes.
            </p>
          </div>
        </div>

        <div className="p-4 my-8">
          <StripePricingTable user={user} />
        </div>

        <div className="py-4">
          <hr />
        </div>

        <Card className="max-w-md mx-auto bg-primary/10 mt-8">
          <CardHeader>
            <CardTitle>Available Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Your current available credits are:{' '}
              <span className="text-red-700 font-semibold text-lg px-2">
                {credits?.credits ?? 0}
              </span>
            </p>
          </CardContent>
        </Card>
      </section>
    </>
  )
}
