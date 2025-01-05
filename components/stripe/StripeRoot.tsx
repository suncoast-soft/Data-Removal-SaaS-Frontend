'use client'

import StripeCheckout from '@/components/stripe/StripeCheckout'
import { Elements } from '@stripe/react-stripe-js'
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js'
import { User } from '@supabase/supabase-js'
import React from 'react'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function StripeRoot({ user }: { user: User | null }) {
  const appearance = {
    theme: 'night',
    variables: {
      colorPrimary: '#055fab',
      colorBackground: '#342E37',
      colorText: '#FFFFFF',
      colorDanger: '#FF5733',
      fontFamily: 'Figtree',
      borderRadius: '9999px',
      colorTextPlaceholder: '#FFFFFF99'
    }
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{ appearance } as StripeElementsOptions}
    >
      <StripeCheckout user={user} />
    </Elements>
  )
}
