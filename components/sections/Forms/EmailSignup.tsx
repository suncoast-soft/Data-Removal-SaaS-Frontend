'use client'

import { Button } from '@/components/ui/button'
import { handleRequest } from '@/utils/auth-helpers/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithOtp } from '@/utils/auth-helpers/server'
import FormInput from '@/components/modules/FormInput'
import { MailIcon } from 'lucide-react'

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional()
})

export default function EmailSignup() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true)
    await handleRequest(data, signInWithOtp, router)
    setIsSubmitting(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-xl"
      >
        <FormInput
          control={form.control}
          type="email"
          name="email"
          label="Email Address"
          placeholder="Your email address"
          icon={<MailIcon className="w-5 text-primary" />}
          required={false}
        />

        <Button
          variant="secondary"
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          Register
        </Button>
      </form>
    </Form>
  )
}
