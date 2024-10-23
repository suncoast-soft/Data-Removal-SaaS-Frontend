import { createClient } from '@/utils/supabase/server'
import { getUser } from '@/utils/supabase/queries'
import EmailForm from '@/components/modules/AccountForms/EmailForm'

export default async function Account() {
  const supabase = createClient()
  const user = await getUser(supabase)

  return (
    <div className="p-4 max-w-xl mx-auto">
      <EmailForm userEmail={user?.email} />
    </div>
  )
}
