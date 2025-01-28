'use server'

import { SupabaseClient } from '@supabase/supabase-js'
import { cache } from 'react'
import { getBrokers, getUser } from './queries'
import { getErrorRedirect, getStatusRedirect } from '../helpers'
import { createClient } from './server'

interface FormData {
  [key: string]: string | number | boolean
}

export const createProfile = cache(
  async (
    supabase: SupabaseClient,
    formData: FormData,
    primary: boolean = false
  ) => {
    const user = await getUser(supabase)
    if (!user) {
      return getErrorRedirect(
        '/signin/signup',
        'Your profile could not be submitted. Please try again.'
      )
    }

    const first_name = String(formData['first_name']).trim()
    const last_name = String(formData['last_name']).trim()
    const birth_date = String(formData['birth_date']).trim()
    const email = String(formData['email']).trim()
    const address = String(formData['address']).trim()
    const phone = String(formData['phone']).trim()
    const bio = String(formData['bio']).trim()

    const { error: insertError } = await supabase.from('profiles').insert({
      user_id: user.id,
      first_name,
      last_name,
      birth_date,
      email,
      address,
      phone,
      bio,
      is_primary: primary
    })

    if (insertError) {
      return getErrorRedirect(
        '/signin/signup',
        'Your profile could not be submitted. Please try again.',
        insertError.message
      )
    }

    return getStatusRedirect('/', 'Success!', 'User signed up successfully')
  }
)

export async function updateUser(formData: FormData): Promise<string | void> {
  const supabase = await createClient()

  const user = await getUser(supabase)
  if (!user) return

  const firstName = String(formData['firstName']).trim()
  const lastName = String(formData['lastName']).trim()
  const gender = String(formData['gender'])
  const birthDate = String(formData['birthDate']).trim()
  const city = String(formData['city']).trim()
  const state = String(formData['state']).trim()
  const bio = String(formData['bio']).trim()
  const address = String(formData['address']).trim()
  const alternativeNames = String(formData['alternativeNames']).trim()
  const social_security_number = String(
    formData['social_security_number']
  ).trim()
  const phone = String(formData['phone']).trim()
  const email = String(formData['email']).trim()
  const is_primary = Boolean(formData['is_primary'])

  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)

  const isFistProfile = (profiles || []).length < 1

  const { data, error: insertError } = await supabase
    .from('profiles')
    .insert({
      user_id: user?.id,
      first_name: firstName ?? undefined,
      last_name: lastName ?? undefined,
      gender: gender ?? undefined,
      birth_date: birthDate ?? undefined,
      city: city ?? undefined,
      state: state ?? undefined,
      bio: bio ?? undefined,
      address: address ?? undefined,
      alternative_names: alternativeNames ?? undefined,
      social_security_number: social_security_number ?? undefined,
      phone: phone ?? undefined,
      email: email ?? undefined,
      is_primary: isFistProfile ? true : (Boolean(is_primary) ?? undefined)
    })
    .select('id')
    .maybeSingle()

  if (!isFistProfile) {
    await supabase
      .from('profiles')
      .update({ is_primary: false })
      .neq('id', data?.id)
      .select()
  }

  if (insertError) {
    return getErrorRedirect(
      '/dashboard/settings/account',
      'Your profile could not be submitted. Please try again.',
      insertError.message
    )
  }

  return getStatusRedirect(
    '/dashboard/settings/account',
    'Success!',
    'Your profile has been submitted.'
  )
}

export async function updateProfile(
  formData: FormData
): Promise<string | void> {
  const supabase = await createClient()

  const user = await getUser(supabase)
  if (!user) return

  const id = String(formData['id']).trim()
  const firstName = String(formData['firstName']).trim()
  const lastName = String(formData['lastName']).trim()
  const gender = String(formData['gender'])
  const birthDate = String(formData['birthDate']).trim()
  const city = String(formData['city']).trim()
  const state = String(formData['state']).trim()
  const bio = String(formData['bio']).trim()
  const address = String(formData['address']).trim()
  const alternativeNames = String(formData['alternativeNames']).trim()
  const social_security_number = String(
    formData['social_security_number']
  ).trim()
  const phone = String(formData['phone']).trim()
  const email = String(formData['email']).trim()
  const is_primary = String(formData['is_primary']).trim()

  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)

  const isFistProfile = (profiles || []).length < 1

  const { error: insertError } = await supabase
    .from('profiles')
    .update({
      first_name: firstName ?? undefined,
      last_name: lastName ?? undefined,
      gender: gender ?? undefined,
      birth_date: birthDate ?? undefined,
      city: city ?? undefined,
      state: state ?? undefined,
      bio: bio ?? undefined,
      address: address ?? undefined,
      alternative_names: alternativeNames ?? undefined,
      social_security_number: social_security_number ?? undefined,
      phone: phone ?? undefined,
      email: email ?? undefined,
      is_primary: isFistProfile ? true : (Boolean(is_primary) ?? undefined)
    })
    .eq('id', id)

  if (!isFistProfile) {
    await supabase
      .from('profiles')
      .update({ is_primary: false })
      .neq('id', id)
      .select()
  }

  if (insertError) {
    return getErrorRedirect(
      '/dashboard/settings/account',
      'Your profile could not be updated. Please try again.',
      insertError.message
    )
  }

  return getStatusRedirect(
    '/dashboard/settings/account',
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
      '/dashboard/settings/account',
      'Your settings could not be updated. Please try again.',
      insertError.message
    )
  }

  if (deleted) {
    await supabase.auth.signOut()
    return '/signin'
  }

  return getStatusRedirect(
    '/dashboard/settings/account',
    'Success!',
    'User settings updated successfully'
  )
}

export async function createUserSettings(
  formData: FormData
): Promise<string | void> {
  const supabase = await createClient()

  const user_id = String(formData['id']).trim()
  const { data } = await supabase
    .from('settings')
    .select('*')
    .eq('user_id', user_id)
    .maybeSingle()
  if (data) {
    return
  }

  const { error } = await supabase.from('settings').insert({
    user_id,
    status_update_method: 'email',
    receive_marketing_emails: true,
    allow_multi_device_login: true,
    enable_mfa: false
  })

  console.log(error, 'error')
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
