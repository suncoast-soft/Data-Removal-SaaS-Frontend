'use client'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'
import { useState } from 'react'

export default function DashboardHeader() {
  const [notifications] = useState(2)
  return (
    <div className="flex gap-6 justify-between mb-6 items-center">
      <h1 className="text-[34px] leading-3 lg:text-[50px] lg:leading-[55px] font-bold text-dark">
        Dashboard
      </h1>
      <Button variant="link" type="button" className={'no-underline p-0'}>
        {notifications > 0 ? (
          <div className="relative text-dark">
            <div className="absolute -right-1 -top-1 min-w-[18px] rounded-full min-h-[18px] text-white bg-secondary text-xs font-normal">
              {notifications}
            </div>
            <Bell className="h-6 w-6 " />
          </div>
        ) : (
          <Bell className="w-6 h-6" />
        )}
      </Button>
    </div>
  )
}
