'use client'

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { signUp } from '@/utils/auth-helpers/server'
import { handleRequest } from '@/utils/auth-helpers/client'
import { useRouter } from 'next/navigation'
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
import { Mail, PhoneCall, User } from 'lucide-react'
import { phoneRegex } from '@/utils/helpers'

interface SignUpProps {
  redirectMethod: 'client' | 'server'
}

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  first_name: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters.' })
    .optional(),
  last_name: z.string().min(1, { message: 'Last name is required' }),
  phone: z.string().regex(phoneRegex, 'Invalid Number!')
})

export default function SignUp({ redirectMethod }: SignUpProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      phone: ''
    }
  })

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = redirectMethod === 'client' ? useRouter() : null
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Submit Handler
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true)
    try {
      const transformedData = {
        ...data
      }
      await handleRequest(transformedData, signUp, router)
      setIsSubmitting(false)
    } catch (error) {
      console.error('Sign-up failed:', error)
      setIsSubmitting(false)
    }
  }

  // Helper to Render a Single Input Field
  const renderInputField = (
    name: keyof z.infer<typeof FormSchema>,
    label: string,
    placeholder: string,
    icon: React.ReactNode,
    type: 'text' | 'email' | 'tel' = 'text',
    isRequired = false
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-white font-semibold text-lg">
            {label}
            {isRequired && <sup className="text-secondary pt-1"> *</sup>}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                {icon}
              </div>
              <Input
                type={type}
                placeholder={placeholder}
                {...field}
                value={field.value}
                className="bg-transparent text-white [&::placeholder]:text-white/60 py-3"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  return (
    <>
      <p className="font-light text-xl leading-relaxed tracking-wide mb-4 text-white/60">
        All details to your profile to ensure correct results.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 lg:gap-6"
        >
          {renderInputField(
            'email',
            'Email',
            'example@email.com',
            <Mail className="w-5 text-primary" />,
            'email',
            true
          )}

          <div className="grid lg:grid-cols-2 gap-3">
            {renderInputField(
              'first_name',
              'First Name',
              'John',
              <User className="w-5 text-primary" />,
              'text',
              true
            )}
            {renderInputField(
              'last_name',
              'Last Name',
              'Doe',
              <User className="w-5 text-primary" />,
              'text',
              true
            )}
          </div>

          {renderInputField(
            'phone',
            'Phone',
            '(123) 456-7890',
            <PhoneCall className="w-5 text-primary" />,
            'tel',
            true
          )}

          <Button
            type="submit"
            variant="secondary"
            className="w-full"
            disabled={isSubmitting}
          >
            Done
          </Button>
        </form>
      </Form>
    </>
  )
}
