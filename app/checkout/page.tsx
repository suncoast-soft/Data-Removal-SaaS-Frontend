import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { getUser } from '@/utils/supabase/queries'
import StripeRoot from '@/components/stripe/StripeRoot'

export default async function page() {
  const supabase = await createClient()
  const user = await getUser(supabase)
  return <StripeRoot user={user} />
}
