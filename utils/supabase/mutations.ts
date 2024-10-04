import { SupabaseClient } from '@supabase/supabase-js'
import { cache } from 'react'
import { getBrokers, getUser } from './queries'

export const createJobs = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase)
  if (!user) return null

  // Delete Existing Jobs
  const { error } = await supabase.from('jobs').delete().eq('user', user.id)

  if (error) {
    console.log(error)
    return null
  }

  // Create New Jobs
  const brokers = await getBrokers(supabase)
  if (!brokers) {
    return null
  }

  const { data: jobs } = await supabase
    .from('jobs')
    .insert(
      brokers.map((broker) => ({
        broker: broker.id,
        user: user.id,
        status: 'queued'
      }))
    )
    .select()

  return jobs
})
