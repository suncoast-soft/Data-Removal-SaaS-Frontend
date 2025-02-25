import { loadStripe, Stripe } from '@stripe/stripe-js'
import { createClient } from '../supabase/client'
import { getUser } from '../supabase/queries'

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE ??
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ??
        ''
    )
  }

  return stripePromise
}

export const getBuyLink = async () => {
  const supabase = createClient()
  const user = await getUser(supabase)

  return `${process.env.NEXT_PUBLIC_STRIPE_BUY_LINK ?? ''}?client_reference_id=${user?.id}`
}
