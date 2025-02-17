'use server'

import { stripe } from '@/utils/stripe/config'
import { createClient } from '@/utils/supabase/server'
import { createOrRetrieveCustomer } from '@/utils/supabase/admin'
import { getURL, getErrorRedirect } from '@/utils/helpers'
import { getUser } from '../supabase/queries'
import { cache } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'

export async function createStripePortal(currentPath: string) {
  try {
    const supabase = await createClient()
    const {
      error,
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      if (error) {
        console.error(error)
      }
      throw new Error('Could not get user session.')
    }

    let customer
    try {
      customer = await createOrRetrieveCustomer({
        uuid: user.id || '',
        email: user.email || ''
      })
    } catch (err) {
      console.error(err)
      throw new Error('Unable to access customer record.')
    }

    if (!customer) {
      throw new Error('Could not get customer.')
    }

    try {
      const { url } = await stripe.billingPortal.sessions.create({
        customer,
        return_url: getURL('/dashboard/billing')
      })
      if (!url) {
        throw new Error('Could not create billing portal')
      }
      return url
    } catch (err) {
      console.error(err)
      throw new Error('Could not create billing portal')
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      return getErrorRedirect(
        currentPath,
        error.message,
        'Please try again later or contact a system administrator.'
      )
    } else {
      return getErrorRedirect(
        currentPath,
        'An unknown error occurred.',
        'Please try again later or contact a system administrator.'
      )
    }
  }
}

export const listInvoices = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase)
  if (!user) return null

  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!data?.stripe_customer_id) {
    return null
  }

  const invoices = await stripe.invoices.list({
    limit: 50,
    customer: data?.stripe_customer_id
  })

  return invoices
})

export const listPaymentMethods = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase)
  if (!user) return null

  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!data?.stripe_customer_id) {
    return
  }

  const paymentMethods = await stripe.customers.listPaymentMethods(
    data.stripe_customer_id,
    {
      limit: 3
    }
  )

  return paymentMethods
})
