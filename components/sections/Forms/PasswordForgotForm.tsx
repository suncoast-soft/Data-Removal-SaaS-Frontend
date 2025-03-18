'use client'

import { Button } from '@/components/ui/button'
import { handleRequest } from '@/utils/auth-helpers/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { requestPasswordUpdate } from '@/utils/auth-helpers/server'
import FormInput from '@/components/modules/FormInput'
import { MailIcon } from 'lucide-react'
import Link from 'next/link'

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' })
})

export default function PasswordForgotForm({
  disable_button
}: {
  disable_button: boolean
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error_description')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true)

    await handleRequest(data, requestPasswordUpdate, router)

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
          label="Email"
          placeholder="Your Email Address"
          icon={<MailIcon className="w-5 text-primary" />}
        />

        <Button
          variant="secondary"
          type="submit"
          className="w-full"
          disabled={isSubmitting || disable_button}
        >
          Send Password Reset Link
        </Button>

        {error && <p className="text-secondary text-center">{error}</p>}

        <div className="text-center text-white font-semibold">
          <p>
            <span className="mr-2">Already have an account?</span>
            <Link href="/auth/login" className="underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </Form>
  )
}
