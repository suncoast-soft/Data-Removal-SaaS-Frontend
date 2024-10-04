import { SupabaseClient } from '@supabase/supabase-js'
import { cache } from 'react'

export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user }
  } = await supabase.auth.getUser()
  return user
})

export const getSubscription = cache(async (supabase: SupabaseClient) => {
  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle()

  return subscription
})

export const getProducts = cache(async (supabase: SupabaseClient) => {
  const { data: products, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { referencedTable: 'prices' })

  return products
})

export const getUserDetails = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase)
  if (!user) return null

  const { data: userDetails } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()
  return userDetails
})

export const getCredits = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase)
  if (!user) return null

  const { data: credits } = await supabase
    .from('credits')
    .select('*')
    .eq('user', user.id)
    .single()
  return credits
})

export const getBrokers = cache(async (supabase: SupabaseClient) => {
  const { data: brokers } = await supabase.from('brokers').select('*')
  return brokers
})

export const getJobs = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase)
  if (!user) return null

  const { data: jobs } = await supabase
    .from('jobs')
    .select('*, broker(*)')
    .eq('user', user.id)
  return jobs
})
