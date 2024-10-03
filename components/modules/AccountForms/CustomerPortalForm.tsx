'use client'

import { useRouter, usePathname } from 'next/navigation'
import { createStripePortal } from '@/utils/stripe/server'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function CustomerPortalForm() {
  const router = useRouter()
  const currentPath = usePathname()

  const handleStripePortalRequest = async () => {
    const redirectUrl = await createStripePortal(currentPath)
    return router.push(redirectUrl)
  }

  return (
    <Card className="mb-8 bg-primary/10">
      <CardHeader>
        <CardTitle>Manage Billing</CardTitle>
        <CardDescription>
          Manage your billing methods, billing address, and invoices.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Button variant="default" onClick={handleStripePortalRequest}>
          Open Billing Manager Portal
        </Button>
      </CardContent>

      <CardFooter>
        <p className="text-sm">
          You will be redirected to your dedicated billing management dashboard.
        </p>
      </CardFooter>
    </Card>
  )
}
