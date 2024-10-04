import Analytics from '@/components/modules/Analytics/AnalyticsList'
import IncompleteProfile from '@/components/modules/Dashboard/IncompleteProfile'
import { getJobs, getUser, getUserDetails } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { createJobsAction } from './actions'
import { validateProfile } from '@/utils/helpers'

export default async function Search() {
  const supabase = createClient()
  const [user, userDetails, jobs] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase),
    getJobs(supabase)
  ])

  if (!user) {
    return redirect('/signin')
  }

  const profileComplete = validateProfile(userDetails)

  return (
    <section className="mb-16 bg-white">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-primary sm:text-center sm:text-6xl">
            Search Report
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-primary sm:text-center sm:text-2xl">
            Search Your Personal Information from Internet Data Brokers
          </p>
        </div>
      </div>

      {profileComplete ? (
        <Analytics createJobsAction={createJobsAction} jobs={jobs ?? []} />
      ) : (
        <IncompleteProfile />
      )}
    </section>
  )
}
