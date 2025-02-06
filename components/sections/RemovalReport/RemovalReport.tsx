import RemovalSummary from './RemovalSummary'
import RemovalResults from './RemovalResults'
import { getBrokerSearches, getGoogleSearches } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'

export default async function RemovalReport({ profile }: { profile: string }) {
  const supabase = await createClient()

  const brokerSearches = (await getBrokerSearches(supabase, profile)) ?? []
  const googleSearches = (await getGoogleSearches(supabase, profile)) ?? []

  return (
    <>
      <RemovalSummary
        googleSearches={googleSearches}
        brokerSearches={brokerSearches}
      />

      <RemovalResults
        googleSearches={googleSearches}
        brokerSearches={brokerSearches}
      />
    </>
  )
}
