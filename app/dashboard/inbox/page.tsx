import SectionHeader from '@/components/modules/SectionHeader'
import Notifications from '@/components/sections/Notifications'
import { Tables } from '@/types_db'
import { getNotifications } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'

type Notification = Tables<'notifications'>

export default async function Inbox() {
  const supabase = await createClient()
  const notifications = (await getNotifications(supabase)) as Notification[]

  return (
    <div className="container mx-auto pt-0 px-0">
      <SectionHeader title="Inbox" />

      {notifications?.length > 0 ? (
        <Notifications notifications={notifications} />
      ) : (
        <div className="min-h-40 flex items-center justify-center">
          <h4 className="text-dark text-xl">Your Inbox is empty</h4>
        </div>
      )}
    </div>
  )
}
