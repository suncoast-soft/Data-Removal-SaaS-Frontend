'use client'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useState } from 'react'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmitting(true)
    console.log(email) // Todo: Integrate with Email Marketing platform
    setIsSubmitting(false)
  }

  return (
    <form id="contactForm" onSubmit={(e) => handleSubmit(e)}>
      <Input
        variant="white"
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(value) => setName(value)}
        className="mb-3"
      />

      <Input
        variant="white"
        type="email"
        placeholder="Your Email Address"
        value={email}
        onChange={(value) => setEmail(value)}
        className="mb-3"
      />

      <Input
        variant="white"
        type="textarea"
        placeholder="Message"
        value={message}
        onChange={(value) => setMessage(value)}
        className="mb-3"
      />

      <Button
        variant="slim"
        type="submit"
        form="contactForm"
        loading={isSubmitting}
        className="w-full mt-1"
      >
        Send Message
      </Button>
    </form>
  )
}
