'use client'

import { createClient } from '@/utils/supabase/client'
import { type Provider } from '@supabase/supabase-js'
import { getURL } from '@/utils/helpers'
import { redirectToPath } from './server'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export async function handleRequest(
  data: {
    [key: string]: string | number | boolean
  },
  // eslint-disable-next-line no-unused-vars
  requestFunc: (data: {
    [key: string]: string | number | boolean
  }) => Promise<string | void>,
  router: AppRouterInstance | null = null
): Promise<boolean | void> {
  const redirectUrl: string | void = await requestFunc(data)

  if (router && redirectUrl) {
    // If client-side router is provided, use it to redirect
    return router.push(redirectUrl, { scroll: false })
  } else {
    // Otherwise, redirect server-side
    if (redirectUrl) return await redirectToPath(redirectUrl)
  }
}

export async function signInWithOAuth(e: React.FormEvent<HTMLFormElement>) {
  // Prevent default form submission refresh
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
  const provider = String(formData.get('provider')).trim() as Provider

  // Create client-side supabase client and call signInWithOAuth
  const supabase = await createClient()
  const redirectURL = getURL('/auth/callback')
  await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: redirectURL
    }
  })
}
