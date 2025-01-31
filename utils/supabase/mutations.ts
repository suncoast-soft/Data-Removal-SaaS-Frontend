'use server'

import { SupabaseClient } from '@supabase/supabase-js'
import { cache } from 'react'
import { getBrokers, getUser } from './queries'
import { getErrorRedirect, getStatusRedirect } from '../helpers'
import { createClient } from './server'

interface FormData {
  [key: string]: string | number | boolean
}

export async function createProfile(
  formData: FormData
): Promise<string | void> {
  const supabase = await createClient()

  const user = await getUser(supabase)
  if (!user) return

  const email = String(formData['email']).trim()
  const phone = String(formData['phone']).trim()
  const ssn = String(formData['ssn']).trim()
  const first_name = String(formData['first_name']).trim()
  const last_name = String(formData['last_name']).trim()
  const alternative_names = String(formData['alternative_names']).trim()
  const birth_date = String(formData['birth_date']).trim()
  const gender = String(formData['gender'])
  const address = String(formData['address']).trim()
  const city = String(formData['city']).trim()
  const state = String(formData['state']).trim()
  const zip = String(formData['zip']).trim()
  const bio = String(formData['bio']).trim()
  const is_primary = Boolean(formData['is_primary'])

  const { error: insertError } = await supabase.from('profiles').insert({
    user_id: user.id,
    email,
    phone,
    ssn,
    first_name,
    last_name,
    alternative_names,
    birth_date,
    gender,
    address,
    city,
    state,
    zip,
    bio,
    is_primary
  })

  if (insertError) {
    return getErrorRedirect(
      '/dashboard/account',
      'Your profile could not be submitted. Please try again.',
      insertError.message
    )
  }

  return getStatusRedirect(
    '/dashboard/account',
    'Success!',
    'Your profile has been created.'
  )
}

export async function updateProfile(
  formData: FormData
): Promise<string | void> {
  const supabase = await createClient()

  const user = await getUser(supabase)
  if (!user) return

  const id = String(formData['id']).trim()
  const email = String(formData['email']).trim()
  const phone = String(formData['phone']).trim()
  const ssn = String(formData['ssn']).trim()
  const first_name = String(formData['first_name']).trim()
  const last_name = String(formData['last_name']).trim()
  const alternative_names = String(formData['alternative_names']).trim()
  const birth_date = String(formData['birth_date']).trim()
  const gender = String(formData['gender'])
  const address = String(formData['address']).trim()
  const city = String(formData['city']).trim()
  const state = String(formData['state']).trim()
  const zip = String(formData['zip']).trim()
  const bio = String(formData['bio']).trim()
  const is_primary = Boolean(formData['is_primary'])

  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      email,
      phone,
      ssn,
      first_name,
      last_name,
      alternative_names,
      birth_date,
      gender,
      address,
      city,
      state,
      zip,
      bio,
      is_primary
    })
    .eq('id', id)

  if (updateError) {
    return getErrorRedirect(
      '/dashboard/account',
      'Your profile could not be updated. Please try again.',
      updateError.message
    )
  }

  return getStatusRedirect(
    '/dashboard/account',
    'Success!',
    'Your profile has been updated.'
  )
}

export async function updateUserSettings(
  formData: FormData
): Promise<string | void> {
  const supabase = await createClient()

  const user = await getUser(supabase)
  if (!user) return

  const id = String(formData['id']).trim()
  const status_update_method = String(formData['status_update_method']).trim()
  const receive_marketing_emails = Boolean(formData['receive_marketing_emails'])
  const allow_multi_device_login = Boolean(formData['allow_multi_device_login'])
  const enable_mfa = Boolean(formData['enable_mfa'])
  const deleted = Boolean(formData['deleted'])

  const { error: insertError } = await supabase
    .from('settings')
    .update({
      status_update_method: status_update_method ?? 'email',
      receive_marketing_emails: Boolean(receive_marketing_emails),
      allow_multi_device_login: Boolean(allow_multi_device_login),
      enable_mfa: Boolean(enable_mfa),
      deleted: Boolean(deleted)
    })
    .eq('id', id)
    .select()

  if (insertError) {
    return getErrorRedirect(
      '/dashboard/account',
      'Your settings could not be updated. Please try again.',
      insertError.message
    )
  }

  if (deleted) {
    await supabase.auth.signOut()
    return '/signin'
  }

  return getStatusRedirect(
    '/dashboard/account',
    'Success!',
    'User settings updated successfully'
  )
}

export const createJobs = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase)
  if (!user) return null

  // Delete Existing Jobs
  const { error } = await supabase.from('jobs').delete().eq('user', user.id)

  if (error) {
    console.log(error)
    return null
  }

  // Create New Jobs
  const brokers = await getBrokers(supabase)
  if (!brokers) {
    return null
  }

  const { data: jobs } = await supabase
    .from('jobs')
    .insert(
      brokers.map((broker) => ({
        broker: broker.id,
        user: user.id,
        status: 'queued'
      }))
    )
    .select()

  return jobs
})
