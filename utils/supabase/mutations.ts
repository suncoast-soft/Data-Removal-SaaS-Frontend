'use server'

import { PostgrestError, SupabaseClient } from '@supabase/supabase-js'
import { cache } from 'react'
import { getUser } from './queries'
import { supabaseAdmin } from './admin'

interface RowData {
  [key: string]: string | number | boolean
}

export const createProfile = cache(
  async (supabase: SupabaseClient, row: RowData) => {
    const user = await getUser(supabase)
    if (!user) {
      return {
        data: null,
        error: { message: 'Authentication failed' } as PostgrestError
      }
    }

    // Fetch existing profiles and check if the given profile exists
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select()
      .eq('user_id', user.id)

    if (profileError) return { data: null, error: profileError }

    const is_primary = profiles.length === 0

    const existingProfile = profiles.find(
      (p) =>
        p.first_name === row.first_name &&
        p.last_name === row.last_name &&
        p.city === row.city &&
        p.state === row.state
    )

    if (existingProfile) {
      return { data: existingProfile, error: null }
    }

    // Insert new profile
    const { data: profile, error } = await supabase
      .from('profiles')
      .insert({ ...row, user_id: user.id, is_primary })
      .select()
      .single()

    return { data: profile, error }
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
      .from('users')
      .update(row)
      .eq('id', user.id)
      .select()

    return { data, error }
  }
)

export const createMessage = cache(
  async (supabase: SupabaseClient, row: RowData) => {
    const user = await getUser(supabase)

    const { data, error } = await supabase
      .from('messages')
      .insert({
        ...row,
        user_id: user?.id
      })
      .select()

    return { data, error }
  }
)

export const createLoginHistory = cache(
  async (supabase: SupabaseClient, user_id: string, request: Request) => {
    try {
      // Get location from ipinfo.io
      const ipResponse = await fetch(
        `https://ipinfo.io?token=${process.env.NEXT_PUBLIC_IPINFO_TOKEN}`
      )
      const ipData = await ipResponse.json()

      // Get user agent from request
      const userAgent = request.headers.get('user-agent')

      // Determine device type from user agent
      const deviceType = userAgent?.toLowerCase().includes('mobile')
        ? 'mobile'
        : 'desktop'

      const { data, error } = await supabaseAdmin
        .from('login_history')
        .insert({
          user_id,
          device_type: deviceType,
          user_agent: userAgent,
          location: ipData,
          success: true
        })
        .select()
        .single()

      return { data, error }
    } catch (error) {
      console.error('Error creating login history:', error)
      return {
        data: null,
        error: { message: 'Failed to create login history' } as PostgrestError
      }
    }
  }
)

export const updateNotification = cache(
  async (supabase: SupabaseClient, notificationId: number) => {
    const { data, error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)
      .select()

    return { data, error }
  }
)
