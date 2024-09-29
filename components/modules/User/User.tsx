import { createClient } from '@/utils/supabase/server'
import UserDropdown from './UserDropdown'
import { getUserDetails } from '@/utils/supabase/queries'

export async function User() {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  const userDetails = await getUserDetails(supabase)

  return <UserDropdown user={user} userDetails={userDetails} />
}
