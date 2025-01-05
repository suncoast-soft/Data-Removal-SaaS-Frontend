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

export const getPrimaryProfile = cache(
  async (supabase: SupabaseClient, id: string) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .match({ user_id: id, isPrimary: true })
      .single()
    return profile
  }
)

export const getSettings = cache(
  async (supabase: SupabaseClient, id: string) => {
    const { data: setting } = await supabase
      .from('settings')
      .select('*')
      .eq('user_id', id)
      .single()
    return setting
  }
)

export const getSearches = cache(
  async (supabase: SupabaseClient, id: string) => {
    const { data: searches } = await supabase
      .from('searches')
      .select('*, profiles(*), brokers(*)')
      .eq('profile_id', id)
    return searches
  }
)

export const getPricingPlans = cache(
  async (supabase: SupabaseClient, id: number) => {
    const { data: pricing } = await supabase
      .from('pricing')
      .select('*')
      .eq('profile_id', id)
      .single()
    return pricing
  }
)
