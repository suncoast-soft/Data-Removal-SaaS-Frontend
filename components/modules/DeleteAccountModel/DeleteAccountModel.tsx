'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { handleRequest } from '@/utils/auth-helpers/client'
import { updateUserSettings } from '@/utils/auth-helpers/server'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function DeleteAccountModel({ ...props }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(searchParams.get('new') === 'true')

  const handleDeleteAccount = async () => {
    await handleRequest(
      { ...props.settings, deleted: true },
      updateUserSettings,
      router
    )
    setOpen(false)
  }

  return (
    <div className="flex justify-end">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{props.children}</DialogTrigger>

        <DialogContent className="bg-dark text-white border-none max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl lg:text-3xl text-red-600 leading-[55px]">
              Delete Account
            </DialogTitle>
            <DialogDescription className="text-white/50 my-5">
              Your account will be deleted permanently and you will be logged
              out from the app.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-4 flex-col lg:flex-row">
            <Button
              variant={'default'}
              onClick={handleDeleteAccount}
              className="bg-red-600 h-11 hover:bg-red-600/90 text-white"
            >
              Confirm
            </Button>
            <Button
              variant={'outline'}
              className="bg-dark h-11 hover:bg-dark/90 text-white border-white"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
