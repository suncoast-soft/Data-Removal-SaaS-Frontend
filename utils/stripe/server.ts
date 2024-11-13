'use server'

import { stripe } from '@/utils/stripe/config'
import { createClient } from '@/utils/supabase/server'
import { createOrRetrieveCustomer } from '@/utils/supabase/admin'
import { getURL, getErrorRedirect } from '@/utils/helpers'

export async function createStripePortal(currentPath: string) {
  try {
    const supabase = createClient()
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
        return_url: getURL('/dashboard/settings/billing')
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
