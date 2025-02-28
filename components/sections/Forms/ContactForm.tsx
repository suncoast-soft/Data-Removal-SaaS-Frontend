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
import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'

const FormSchema = z.object({
  name: z.string(),
  email: z.string(),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(300, { message: 'Message cannot be longer than 300 characters.' })
})

interface ContactFormProps {
  user?: User | null
  theme?: 'dark' | 'white'
}

export default function ContactForm({
  user,
  theme = 'white'
}: ContactFormProps) {
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

  // Pre-fill form with user data if available
  useEffect(() => {
    if (user) {
      form.setValue('email', user.email || '')
      // If user has a name in metadata, use it
      if (user.user_metadata?.full_name) {
        form.setValue('name', user.user_metadata.full_name)
      }
    }
  }, [user, form])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true)
    try {
      await handleRequest(data, createMessageAction, router)
      form.reset() // Reset form after successful submission
      setIsSubmitting(false)
    } catch (error) {
      console.error('messaging failed:', error)
      setIsSubmitting(false)
    }
  }

  // Different placeholder text based on user login status
  const messagePlaceholder = user
    ? 'How can we help you today? Ask us about your account, our services, or any issues you are experiencing.'
    : 'Tell us a little bit about yourself'

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 lg:gap-6"
      >
        {user && (
          <>
            <input type="hidden" {...form.register('email')} />
            <input type="hidden" {...form.register('name')} />
          </>
        )}

        {!user && (
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">
            <FormInput
              control={form.control}
              name="name"
              label="Name"
              placeholder="Your Name"
              icon={<UserIcon className="w-5 text-primary" />}
              required={true}
              theme={theme}
            />

            <FormInput
              control={form.control}
              type="email"
              name="email"
              label="Email"
              placeholder="example@email.com"
              icon={<MailIcon className="w-5 text-primary" />}
              required={true}
              theme={theme}
            />
          </div>
        )}

        <FormTextarea
          control={form.control}
          name="message"
          label="Leave us a message"
          placeholder={messagePlaceholder}
          className="col-span-2"
          theme={theme}
        />

        <Button
          type="submit"
          variant="secondary"
          className="w-full lg:w-52"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </Form>
  )
}
