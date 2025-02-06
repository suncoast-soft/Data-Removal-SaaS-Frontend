'use server'

import { createClient } from '@/utils/supabase/server'
import { getErrorRedirect, getStatusRedirect } from 'utils/helpers'
import { redirect } from 'next/navigation'
import { createProfile } from '../supabase/mutations'
import { getUser } from '../supabase/queries'

interface FormData {
  [key: string]: string | number | boolean
}

export async function redirectToPath(path: string) {
  return redirect(path)
}

export async function SignOut(formData: FormData) {
  const pathName = String(formData['pathName']).trim()

  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    return getErrorRedirect(
      pathName,
      'Hmm... Something went wrong.',
      'You could not be signed out.'
    )
  }

  return '/signin'
}

export async function signInWithOtp(formData: FormData) {
  const email = String(formData['email']).trim()
  const origin = String(formData['origin']).trim()

  const supabase = await createClient()
  const user = await getUser(supabase)

  if (user) {
    const { data, error } = await supabase.auth.updateUser({
      email: email
    })

    if (error)
      return getErrorRedirect(
        origin || '/signin',
        'Sign up failed.',
        error.message
      )

    return data.user
      ? getStatusRedirect(
          origin || '/signin',
          'Success!',
          'Please check your email for a confirmation link. You may now close this tab.'
        )
      : getStatusRedirect('/dashboard', 'Success!', 'You are now signed in.')
  } else {
    const { error, data } = await supabase.auth.signInWithOtp({
      email: email
    })

    if (error) {
      return getErrorRedirect('/signin', 'Sign ip failed.', error.message)
    }

    return data.user
      ? getStatusRedirect(
          '/signin',
          'Success!',
          'Please check your email for a confirmation link. You may now close this tab.'
        )
      : getStatusRedirect('/dashboard', 'Success!', 'You are now signed in.')
  }
}

export async function anonymousSignin(formData: FormData) {
  const first_name = String(formData['first_name']).trim()
  const last_name = String(formData['last_name']).trim()
  const city = String(formData['city']).trim()
  const state = String(formData['state']).trim()

  const supabase = await createClient()
  const user = await getUser(supabase)

  // Only create a new account when the user is not signed in
  if (!user) {
    const { error } = await supabase.auth.signInAnonymously({
      options: { data: { full_name: `${first_name} ${last_name}` } }
    })

    if (error) {
      return getErrorRedirect('/scan/address', 'Error', error.message)
    }
  }

  // Create profile for the user
  const {
    data: profile,
    error: profileError,
    is_new
  } = await createProfile(supabase, {
    first_name,
    last_name,
    city,
    state
  })

  if (profileError) {
    return getErrorRedirect(
      '/scan/address',
      'Internal server error. Please try again later.',
      profileError.message
    )
  }

  return getStatusRedirect(
    '/scan/result',
    'Success!',
    'Your scan has been initiated.',
    false,
    `profile=${profile.id}&is_new=${is_new}`
  )
}
