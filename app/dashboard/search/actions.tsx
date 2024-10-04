'use server'

import { createJobs } from '@/utils/supabase/mutations'
import { createClient } from '@/utils/supabase/server'

export async function createJobsAction() {
  const supabase = createClient()
  const jobs = await createJobs(supabase)
  return jobs
}
