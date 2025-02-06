'use client'

import { createClient } from '@/utils/supabase/client'
import { type Provider } from '@supabase/supabase-js'
import { redirectToPath } from './server'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { getUser } from '../supabase/queries'
import { getURL } from '../helpers'

interface FormData {
  [key: string]: string | number | boolean
}

export async function handleRequest(
  data: FormData,
  // eslint-disable-next-line no-unused-vars
  requestFunc: (data: FormData) => Promise<string | void>,
  router: AppRouterInstance | null = null
): Promise<boolean | void> {
  const redirectUrl: string | void = await requestFunc(data)

  if (router && redirectUrl) {
    return router.push(redirectUrl, { scroll: false })
  } else {
    if (redirectUrl) {
      return await redirectToPath(redirectUrl)
    }
  }
}

export async function signInWithOAuth(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
  const provider = String(formData.get('provider')).trim() as Provider

  const supabase = createClient()
  const user = await getUser(supabase)

  if (user) {
    await supabase.auth.linkIdentity({
      provider: provider,
      options: {
        redirectTo: getURL('/auth/callback')
      }
    })
  } else {
    await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: getURL('/auth/callback')
      }
    })
  }
}
