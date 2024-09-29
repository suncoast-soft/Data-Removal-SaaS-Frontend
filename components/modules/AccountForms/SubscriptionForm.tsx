'use client'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useState } from 'react'

export default function SubscriptionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmitting(true)
    console.log(email) // Todo: Integrate with Email Marketing platform
    setIsSubmitting(false)
  }

  return (
    <form id="emailForm" onSubmit={(e) => handleSubmit(e)}>
      <Input
        variant="black"
        type="email"
        placeholder="Your Email Address"
        value={email}
        onChange={(value) => setEmail(value)}
      />
      <Button
        variant="slim"
        color="white"
        type="submit"
        form="emailForm"
        loading={isSubmitting}
        className="w-full mt-1"
      >
        Subscribe
      </Button>
    </form>
  )
}
