'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SubscriptionForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form id="emailForm" onSubmit={(e) => handleSubmit(e)}>
      <Input type="email" placeholder="Your Email Address" />
      <Button
        variant="default"
        color="white"
        type="submit"
        form="emailForm"
        className="w-full mt-1"
      >
        Subscribe
      </Button>
    </form>
  )
}
