'use client'

import { Button } from '@/components/ui/button'
import { updatePassword } from '@/utils/auth-helpers/server'
import { handleRequest } from '@/utils/auth-helpers/client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
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

interface UpdatePasswordProps {
  redirectMethod: string
}

const FormSchema = z.object({
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  }),
  passwordConfirm: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  })
})

export default function UpdatePassword({
  redirectMethod
}: UpdatePasswordProps) {
  const router = redirectMethod === 'client' ? useRouter() : null
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true)
    await handleRequest(data, updatePassword, router)
    setIsSubmitting(false)
  }

  return (
    <Form {...form}>
      <form
        noValidate={true}
        className="mb-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
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

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
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
            Update Password
          </Button>
        </div>
      </form>
    </Form>
  )
}
