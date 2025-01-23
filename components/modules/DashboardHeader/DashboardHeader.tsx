import { Button } from '@/components/ui/button'
import { BellIcon } from 'lucide-react'

export default function DashboardHeader() {
  const notifications = 2

  return (
    <div className="flex gap-6 justify-between items-center mt-8 mb-4">
      <h1 className="text-3xl lg:text-4xl font-bold text-dark">Dashboard</h1>

      <Button variant="link" type="button" className={'no-underline p-0'}>
        {notifications > 0 ? (
          <div className="relative text-dark">
            <div className="absolute -right-1 -top-1 min-w-[18px] rounded-full min-h-[18px] text-white bg-secondary text-xs font-normal">
              {notifications}
            </div>
            <BellIcon className="h-6 w-6 " />
          </div>
        ) : (
          <BellIcon className="w-6 h-6" />
        )}
      </Button>
    </div>
  )
}
