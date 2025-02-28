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
      const userId = checkoutSessionCompleted.client_reference_id
      const customerId = checkoutSessionCompleted.customer as string

      if (!userId) {
        return NextResponse.json(
          {
            message: `Missing client_reference_id`
          },
          { status: 400 }
        )
      }

      // Get Existing profile from profile_id
      const { error: updateError } = await supabase
        .from('users')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId)
        .single()

      if (updateError) {
        return NextResponse.json(
          {
            message: `User Not Found`
          },
          { status: 400 }
        )
      }

      const { data, error } = await supabase.from('pricing_plans').upsert({
        user_id: userId
      })

      if (error) {
        console.log(error)
        return NextResponse.json(
          {
            message: `Error updating database: ${error}\n ${data}`
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
