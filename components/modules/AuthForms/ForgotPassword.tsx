'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { requestPasswordUpdate } from '@/utils/auth-helpers/server'
import { handleRequest } from '@/utils/auth-helpers/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'

interface ForgotPasswordProps {
  allowEmail: boolean
  redirectMethod: string
}

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' })
})

export default function ForgotPassword({
  allowEmail,
  redirectMethod
}: ForgotPasswordProps) {
  const router = redirectMethod === 'client' ? useRouter() : null
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true)
    await handleRequest(data, requestPasswordUpdate, router)
    setIsSubmitting(false)
  }

  return (
    <>
      <Form {...form}>
        <form
          noValidate={true}
          className="mb-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              Send Email
            </Button>
          </div>
        </form>
      </Form>

      <div className="mt-4">
        <p>
          <Link
            href="/signin/password_signin"
            className="font-medium text-sm text-primary"
          >
            Sign in with email and password
          </Link>
        </p>
        {allowEmail && (
          <p>
            <Link
              href="/signin/email_signin"
              className="font-medium text-sm text-primary"
            >
              Sign in via magic link
            </Link>
          </p>
        )}
        <p>
          <Link
            href="/signin/signup"
            className="font-medium text-sm text-primary"
          >
            Don't have an account? Sign up
          </Link>
        </p>
      </div>
    </>
  )
}
