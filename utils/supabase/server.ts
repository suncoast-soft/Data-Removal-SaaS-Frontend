'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import {
  createMessage,
  createProfile,
  updateNotification,
  updateProfile,
  updateUserSettings
} from './mutations'
import { getErrorRedirect, getStatusRedirect } from '../helpers'

interface FormData {
  [key: string]: string | number | boolean
}

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        }
      }
    }
  )
}

export async function createProfileAction(
  formData: FormData
): Promise<string | void> {
  const supabase = await createClient()

  const { error } = await createProfile(supabase, formData)

  if (error) {
    return getErrorRedirect(
      '/dashboard/account',
      'Your profile could not be submitted. Please try again.',
      error.message
    )
  }

  return getStatusRedirect(
    '/dashboard/account',
    'Success!',
    'Your profile has been created.'
  )
}

export async function updateProfileAction(
  formData: FormData
): Promise<string | void> {
  const supabase = await createClient()

  const { error } = await updateProfile(supabase, formData)

  if (error) {
    return getErrorRedirect(
      '/dashboard/account',
      'Your profile could not be updated. Please try again.',
      error.message
    )
  }

  return getStatusRedirect(
    '/dashboard/account',
    'Success!',
    'Your profile has been updated.'
  )
}

export async function updateUserSettingsAction(
  formData: FormData
): Promise<string | void> {
  const supabase = await createClient()

  const { error } = await updateUserSettings(supabase, formData)

  if (error) {
    return getErrorRedirect(
      '/dashboard/account',
      'Your settings could not be updated. Please try again.',
      error.message
    )
  }

  if (formData['deleted']) {
    await supabase.auth.signOut()
    return getStatusRedirect(
      '/auth/login',
      'Success!',
      'You are now signed out'
    )
  }

  return getStatusRedirect(
    '/dashboard/account',
    'Success!',
    'User settings updated successfully'
  )
}

export async function createMessageAction(
  formData: FormData
): Promise<string | void> {
  const supabase = await createClient()

  const { error } = await createMessage(supabase, formData)

  if (error) {
    return getErrorRedirect(
      '/contact',
      'Your message could not be sent. Please try again.',
      error.message
    )
  }

  return getStatusRedirect(
    '/contact',
    'Success!',
    'We got your request! Someone from our team will reach out to you soon.'
  )
}

export async function updateNotificationAction(notificationId: number) {
  const supabase = await createClient()

  const { data, error } = await updateNotification(supabase, notificationId)

  return { data, error }
}
