'use client'

import RenderHTML from '@/components/modules/RenderHTML'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Tables } from '@/types_db'
import { cn } from '@/utils/cn'
import { createClient } from '@/utils/supabase/client'
import { getNotifications } from '@/utils/supabase/queries'
import { updateNotificationAction } from '@/utils/supabase/server'
import { format } from 'date-fns'
import { ChevronDownIcon, TriangleAlertIcon } from 'lucide-react'
import { useState } from 'react'

type Notification = Tables<'notifications'>

export default function Notifications({
  notifications: initialNotifications
}: {
  notifications: Notification[]
}) {
  const [notifications, setnotifications] = useState(initialNotifications)

  const handleRead = async (notificationId: string) => {
    if (notificationId) {
      const notification = notifications.filter(
        (notification) => String(notification.id) === notificationId
      )[0]

      if (notification) {
        await updateNotificationAction(notification.id)
        await fetchNotifications()
      }
    }
  }

  const supabase = createClient()
  const fetchNotifications = async () => {
    const notifications = (await getNotifications(supabase)) as Notification[]
    setnotifications(notifications)
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      onValueChange={(value) => handleRead(value)}
    >
      {notifications?.map((notification) => (
        <AccordionItem
          key={notification.id}
          value={String(notification.id)}
          className="p-4 rounded-xl border border-dark/10 bg-gray/5 shadow mb-4 [&[data-state='open']]:bg-dark [&[data-state='open']]:text-white [&[data-state='closed']]:text-dark shrink-0 transition duration-200"
        >
          <AccordionTrigger className="w-full text-left p-0 [&[data-state='closed']]:text-dark [&[data-state='open']]:text-white [&>.default-trigger-icon]:hidden">
            <div className="flex-1 flex justify-start gap-3">
              <div
                className={cn(
                  'w-2 h-2 border border-blue rounded-full my-2.5',
                  notification.read ? 'bg-blue/10' : 'bg-blue'
                )}
              ></div>

              <div>
                <h3 className="font-normal text-base lg:text-lg">
                  {notification.title}
                </h3>
                <p className="text-sm">
                  {format(new Date(notification.created_at), 'PPP')}
                </p>
              </div>

              {notification.important && (
                <TriangleAlertIcon
                  size={16}
                  className="text-yellow-600 my-1.5"
                />
              )}
            </div>

            <div className="h-8 w-8 items-center flex justify-center shrink-0 transition-all duration-200 [&[data-state='open']]:rotate-90">
              <ChevronDownIcon className="h-5 w-5" />
            </div>
          </AccordionTrigger>

          <AccordionContent className="py-4 mt-4 border-t border-white/20">
            <div className="grid pl-5">
              <RenderHTML html={notification.description ?? ''} />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
