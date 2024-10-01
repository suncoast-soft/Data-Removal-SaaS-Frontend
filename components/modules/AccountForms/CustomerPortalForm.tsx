'use client'

import { useRouter, usePathname } from 'next/navigation'
import { createStripePortal } from '@/utils/stripe/server'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tables } from '@/types_db'
import { Button } from '@/components/ui/button'

type Subscription = Tables<'subscriptions'>
type Price = Tables<'prices'>
type Product = Tables<'products'>

type SubscriptionWithPriceAndProduct = Subscription & {
  prices:
    | (Price & {
        products: Product | null
      })
    | null
}

interface Props {
  subscription: SubscriptionWithPriceAndProduct | null
}

export default function CustomerPortalForm({ subscription }: Props) {
  const router = useRouter()
  const currentPath = usePathname()

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100)

  const handleStripePortalRequest = async () => {
    const redirectUrl = await createStripePortal(currentPath)
    return router.push(redirectUrl)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Plan</CardTitle>
        <CardDescription>
          {subscription
            ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
            : 'You are not currently subscribed to any plan.'}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-8 mb-4 text-xl font-semibold">
        {subscription ? (
          `${subscriptionPrice}/${subscription?.prices?.interval}`
        ) : (
          <Link href="/">Choose your plan</Link>
        )}
      </CardContent>

      <CardFooter>
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">Manage your subscription on Stripe.</p>
          <Button variant="default" onClick={handleStripePortalRequest}>
            Open customer portal
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
