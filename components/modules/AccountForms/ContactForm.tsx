'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ContactForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form id="contactForm" onSubmit={(e) => handleSubmit(e)}>
      <Input type="text" placeholder="Full Name" className="mb-3" />

      <Input type="email" placeholder="Your Email Address" className="mb-3" />

      <Input type="textarea" placeholder="Message" className="mb-3" />

      <Button
        variant="default"
        type="submit"
        form="contactForm"
        className="w-full mt-1"
      >
        Send Message
      </Button>
    </form>
  )
}
