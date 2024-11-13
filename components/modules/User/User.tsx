import { createClient } from '@/utils/supabase/server'
import UserDropdown from './UserDropdown'
import { getProfiles, getUser } from '@/utils/supabase/queries'

export async function User() {
  const supabase = createClient()

  const [user, profiles] = await Promise.all([
    getUser(supabase),
    getProfiles(supabase)
  ])

  return <UserDropdown user={user} profile={profiles?.[0]} />
}
