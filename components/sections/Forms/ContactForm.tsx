'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { MailIcon, UserIcon } from 'lucide-react'
import FormInput from '@/components/modules/FormInput'
import FormTextarea from '@/components/modules/FormTextarea'
import { handleRequest } from '@/utils/auth-helpers/client'
import { createMessageAction } from '@/utils/supabase/server'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const FormSchema = z.object({
  name: z.string(),
  email: z.string(),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(300, { message: 'Message cannot be longer than 300 characters.' })
})

export default function ContactForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true)
    try {
      await handleRequest(data, createMessageAction, router)
      setIsSubmitting(false)
    } catch (error) {
      console.error('messaging failed:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 lg:gap-6"
      >
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 text-white">
          <FormInput
            control={form.control}
            name="name"
            label="Name"
            placeholder="Your Name"
            icon={<UserIcon className="w-5 text-primary" />}
            required={true}
          />

          <FormInput
            control={form.control}
            type="email"
            name="email"
            label="Email"
            placeholder="example@email.com"
            icon={<MailIcon className="w-5 text-primary" />}
            required={true}
          />
        </div>

        <FormTextarea
          control={form.control}
          name="message"
          label="Leave us a message"
          placeholder="Tell us a little bit about yourself"
          className="col-span-2"
        />

        <Button
          type="submit"
          variant="secondary"
          className="w-full lg:w-52"
          disabled={isSubmitting}
        >
          Send Message
        </Button>
      </form>
    </Form>
  )
}
