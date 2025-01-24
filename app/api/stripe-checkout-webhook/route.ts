import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types_db'
import { streamToString } from '@/utils/helpers'

export const dynamic = 'force-dynamic'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error('MISSING NEXT_PUBLIC_SUPABASE_URL!')
}

if (!supabaseServiceRoleKey) {
  throw new Error('MISSING SUPABASE_SERVICE_ROLE_KEY!')
}

const yearlyPriceId = process.env.STRIPE_PRICE_ID_YEARLY as string
const oneyearPriceId = process.env.STRIPE_PRICE_ID_ONE_YEAR as string
const twoyearPriceId = process.env.STRIPE_PRICE_ID_TWO_YEAR as string

const typeFromPriceId: {
  [key: string]: 'one_year' | 'two_year' | 'annual_recurring'
} = {
  [yearlyPriceId]: 'annual_recurring',
  [oneyearPriceId]: 'one_year',
  [twoyearPriceId]: 'two_year'
}

export async function POST(request: Request) {
  console.log('Request from: ', request.url)
  console.log('Request: ', request)
  const headersObj = await headers()
  const sig = headersObj.get('stripe-signature')

  if (!stripeSecretKey) {
    return NextResponse.json(
      {
        message: `Missing stripeSecretKey`
      },
      { status: 400 }
    )
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-12-18.acacia',
    typescript: true
  })

  if (!sig) {
    return NextResponse.json(
      {
        message: `Missing signature`
      },
      { status: 400 }
    )
  }

  if (!request.body) {
    return NextResponse.json(
      {
        message: `Missing body`
      },
      { status: 400 }
    )
  }

  const rawBody = await streamToString(request.body)

  let event

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret!)
  } catch (err) {
    const error = err as Error
    console.log('Error verifying webhook signature: ' + error.message)
    return NextResponse.json(
      {
        message: `Webhook Error: ${error?.message}`
      },
      { status: 400 }
    )
  }

  const supabase = createClient<Database>(
    supabaseUrl as string,
    supabaseServiceRoleKey as string,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
      }
    }
  )

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data
        .object as Stripe.Checkout.Session
      const profileId = Number(checkoutSessionCompleted.client_reference_id)

      if (!profileId) {
        return NextResponse.json(
          {
            message: `Missing client_reference_id`
          },
          { status: 400 }
        )
      }

      const lineItems = await stripe.checkout.sessions.listLineItems(
        checkoutSessionCompleted.id
      )
      const priceId = lineItems.data[0].price!.id
      const type = typeFromPriceId[priceId]

      // Get Existing profile from profile_id
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', profileId)
        .single()

      if (!profile) {
        return NextResponse.json(
          {
            message: `User Profile Not Found`
          },
          { status: 400 }
        )
      }

      // Insert into Pricing
      const { data, error } = await supabase.from('pricing_plans').insert({
        profile_id: profileId,
        type: type
      })

      if (error) {
        console.log(error)
        return NextResponse.json(
          {
            message: `Error creating credits: ${error}\n ${data}`
          },
          {
            status: 400
          }
        )
      }

      return NextResponse.json(
        {
          message: 'success'
        },
        { status: 200 }
      )

    default:
      return NextResponse.json(
        {
          message: `Unhandled event type ${event.type}`
        },
        { status: 400 }
      )
  }
}
