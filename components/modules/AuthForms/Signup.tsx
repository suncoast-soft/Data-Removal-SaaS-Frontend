'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import { signUp } from '@/utils/auth-helpers/server'
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

interface SignUpProps {
  allowEmail: boolean
  redirectMethod: string
}

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  })
})

export default function SignUp({ allowEmail, redirectMethod }: SignUpProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  const router = redirectMethod === 'client' ? useRouter() : null
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true)
    await handleRequest(data, signUp, router)
    setIsSubmitting(false)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Your Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            Sign Up
          </Button>
        </form>
      </Form>

      <div className="mt-4">
        <h5 className="text-md">Already have an account?</h5>
        <Link
          href="/signin/password_signin"
          className="font-medium text-sm text-primary"
        >
          Sign in with email and password
        </Link>
        {allowEmail && (
          <Link
            href="/signin/email_signin"
            className="font-medium text-sm text-primary"
          >
            Sign in via magic link
          </Link>
        )}
      </div>
    </>
  )
}
