'use server'

import { PostgrestError, SupabaseClient } from '@supabase/supabase-js'
import { cache } from 'react'
import { getUser } from './queries'

interface RowData {
  [key: string]: string | number | boolean
}

export const createProfile = cache(
  async (supabase: SupabaseClient, row: RowData) => {
    const user = await getUser(supabase)
    if (!user) {
      return {
        data: null,
        error: { message: 'Authentication failed' } as PostgrestError,
        is_new: false
      }
    }

    // Fetch existing profiles and check if the given profile exists
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select()
      .eq('user_id', user.id)

    if (profileError) return { data: null, error: profileError, is_new: false }

    const is_primary = profiles.length === 0

    const existingProfile = profiles.find(
      (p) =>
        p.first_name === row.first_name &&
        p.last_name === row.last_name &&
        p.city === row.city &&
        p.state === row.state
    )

    if (existingProfile) {
      return { data: existingProfile, error: null, is_new: false }
    }

    // Insert new profile
    const { data: profile, error } = await supabase
      .from('profiles')
      .insert({ ...row, user_id: user.id, is_primary })
      .select()
      .single()

    return { data: profile, error, is_new: true }
  }
)

export const updateProfile = cache(
  async (supabase: SupabaseClient, row: RowData) => {
    const user = await getUser(supabase)
    if (!user) {
      return {
        data: null,
        error: { message: 'Authentication failed' } as PostgrestError
      }
    }

    // Create profile
    const { data, error } = await supabase
      .from('profiles')
      .update(row)
      .eq('id', row.id)
      .select()

    return { data, error }
  }
)

export const updateUserSettings = cache(
  async (supabase: SupabaseClient, row: RowData) => {
    const user = await getUser(supabase)
    if (!user) {
      return {
        data: null,
        error: { message: 'Authentication failed' } as PostgrestError
      }
    }

    // Create profile
    const { data, error } = await supabase
      .from('settings')
      .update(row)
      .eq('id', row.id)
      .select()

    return { data, error }
  }
)
