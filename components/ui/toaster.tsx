'use client'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { getURL } from '@/utils/helpers'
import { createClient } from '@/utils/supabase/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function Toaster() {
  const { toast, toasts } = useToast()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const status = searchParams.get('status')
    const status_description = searchParams.get('status_description')
    const error = searchParams.get('error')
    const error_description = searchParams.get('error_description')

    if (error || status) {
      if (
        error === 'Auth Error' &&
        error_description === 'Identity is already linked to another user'
      ) {
        const supabase = createClient()

        supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: getURL('/auth/callback')
          }
        })
      } else {
        toast({
          title: error
            ? (error ?? 'Hmm... Something went wrong.')
            : (status ?? 'Alright!'),
          description: error ? error_description : status_description,
          variant: error ? 'destructive' : undefined
        })

        const newSearchParams = new URLSearchParams(searchParams.toString())
        const paramsToRemove = [
          'error',
          'status',
          'status_description',
          'error_description'
        ]
        paramsToRemove.forEach((param) => newSearchParams.delete(param))
        const redirectPath = `${pathname}?${newSearchParams.toString()}`
        router.replace(redirectPath, { scroll: false })
      }
    }
  }, [pathname, router, searchParams, toast])

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} duration={30000} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
