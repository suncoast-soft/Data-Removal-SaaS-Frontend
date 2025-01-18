'use client'

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import Link from 'next/link'
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
import { Textarea } from '@/components/ui/textarea'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/utils/cn'
import { format } from 'date-fns'
import { CalendarRange, Mail, MapPin, PhoneCall, User } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { phoneRegex } from '@/utils/helpers'

interface SignUpProps {
  allowEmail: boolean
  redirectMethod: 'client' | 'server'
}

const FormSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters.' })
    .optional(),
  last_name: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
  address: z.string().min(1, { message: 'Address is required' }),
  message: z.string().optional(),
  phone: z.string().regex(phoneRegex, 'Invalid Number!'),
  birthDate: z.date({ required_error: 'A date of birth is required.' })
})

export default function SignUp({ allowEmail, redirectMethod }: SignUpProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = redirectMethod === 'client' ? useRouter() : null
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAdditional, setShowAdditional] = useState(false)

  // Submit Handler
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true)
    try {
      const transformedData = {
        ...data,
        birthDate: data.birthDate.toISOString()
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
    type: 'text' | 'email' | 'password' | 'tel' = 'text',
    isRequired = false
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full min-w-[48%] lg:flex-1">
          <FormLabel className="text-white font-bold text-lg">
            {label} {isRequired && <sup className="text-secondary pt-1">*</sup>}
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
                value={
                  field.value instanceof Date
                    ? field.value.toISOString()
                    : field.value
                }
                className="pl-12 bg-transparent border-2 border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 lg:gap-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 text-white mb-4">
          {renderInputField(
            'first_name',
            'First Name',
            'John',
            <User className="w-5 text-primary" />
          )}
          {renderInputField(
            'last_name',
            'Last Name',
            'Doe',
            <User className="w-5 text-primary" />,
            'text',
            true
          )}
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="w-full min-w-[48%] lg:flex-1">
                <FormLabel className="text-white font-bold text-lg">
                  Birth Year <sup className="text-secondary pt-1">*</sup>
                </FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <CalendarRange className="w-5 text-primary" />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            'w-full pl-12 bg-transparent border-2 border-white text-white justify-start',
                            !field.value && 'opacity-60'
                          )}
                        >
                          {field.value
                            ? format(field.value, 'PPP')
                            : 'Pick a date'}
                        </Button>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {renderInputField(
            'address',
            'Address',
            '123 Main St',
            <MapPin className="w-5 text-primary" />,
            'text',
            true
          )}
          {renderInputField(
            'phone',
            'Phone',
            '(123) 456-7890',
            <PhoneCall className="w-5 text-primary" />,
            'tel',
            true
          )}
          {renderInputField(
            'email',
            'Email',
            'example@email.com',
            <Mail className="w-5 text-primary" />,
            'email',
            true
          )}
          {renderInputField(
            'password',
            'Password',
            '*******',
            <Mail className="w-5 text-primary" />,
            'password',
            true
          )}
        </div>

        {showAdditional ? (
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-white font-bold text-lg">
                  Bio
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    {...field}
                    className="pl-12 resize-none bg-transparent border-2 border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ) : (
          <Button
            type="button"
            variant="outline"
            className="w-full border-white text-white"
            onClick={() => setShowAdditional(true)}
          >
            Add Additional Details
          </Button>
        )}
        <Button
          type="submit"
          variant="secondary"
          className="w-full"
          disabled={isSubmitting}
        >
          Done
        </Button>
        <div className="mt-4 text-white">
          <p className="text-sm">
            Already have an account?{' '}
            <Link href="/signin/password_signin" className="font-medium">
              Sign in with email and password
            </Link>{' '}
            {allowEmail && (
              <Link href="/signin/email_signin" className="font-medium">
                Sign in via magic link
              </Link>
            )}
          </p>
        </div>
      </form>
    </Form>
  )
}
