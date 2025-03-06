'use client'

import { useState } from 'react'
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
import { Tables } from '@/types_db'
import { handleRequest } from '@/utils/auth-helpers/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { updateUserSettingsAction } from '@/utils/supabase/server'

type UserSettings = Tables<'users'>

interface ModuleProps {
  settings: UserSettings
}

interface FormData {
  [key: string]: string | number | boolean
}

export default function DeleteAccountForm({ settings }: ModuleProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(searchParams.get('new') === 'true')

  const form = useForm()

  const onSubmit = async () => {
    await handleRequest(
      { ...settings, deleted: true } as FormData,
      updateUserSettingsAction,
      router
    )
  }

  return (
    <div className="flex justify-end">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            type="button"
            size="small"
            className="border-secondary hover:bg-secondary/90 text-secondary hover:text-white"
          >
            Delete My Account
          </Button>
        </DialogTrigger>

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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 py-6"
              >
                <Button
                  type="submit"
                  variant={'default'}
                  className="bg-red-600 h-11 hover:bg-red-600/90 text-white"
                >
                  Confirm
                </Button>
              </form>
            </Form>

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
