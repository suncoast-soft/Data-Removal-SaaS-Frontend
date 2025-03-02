import { SupabaseClient } from '@supabase/supabase-js'
import { cache } from 'react'

export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user }
  } = await supabase.auth.getUser()
  return user
})

export const getBrokers = cache(async (supabase: SupabaseClient) => {
  const { data: brokers } = await supabase.from('brokers').select('*')
  return brokers
})

export const getBroker = cache(async (supabase: SupabaseClient, id: number) => {
  const { data: broker } = await supabase
    .from('brokers')
    .select('*')
    .eq('id', id)
    .single()
  return broker
})

export const getProfiles = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase)
  if (!user) return null

  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
  return profiles
})

export const getProfile = cache(
  async (supabase: SupabaseClient, id: string) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()
    return profile
  }
)

export const getPrimaryProfile = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase)
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .match({ user_id: user.id, is_primary: true })
    .single()
  return profile
})

export const getUserSettings = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase)
  if (!user) return null

  const { data: settings } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()
  return settings
})

export const getGoogleSearches = cache(
  async (supabase: SupabaseClient, id: string) => {
    const { data: google_searches } = await supabase
      .from('google_searches')
      .select('*')
      .eq('profile_id', id)
    return google_searches
  }
)

export const getBrokerSearches = cache(
  async (supabase: SupabaseClient, id: string) => {
    const { data: broker_searches } = await supabase
      .from('broker_searches')
      .select('*, broker:brokers(*)')
      .eq('profile_id', id)
    return broker_searches
  }
)

export const getPricingPlan = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase)
  if (!user) return null

  const { data: pricing } = await supabase
    .from('pricing_plans')
    .select('*')
    .eq('user_id', user.id)
    .single()
  return pricing
})

export const getLoginHistory = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase)
  if (!user) return null

  const { data: loginHistory, error } = await supabase
    .from('login_history')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    console.error('Error fetching login history:', error)
    return null
  }

  return loginHistory
})

export const getNotifications = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase)
  if (!user) return []

  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at')

  return notifications
})
