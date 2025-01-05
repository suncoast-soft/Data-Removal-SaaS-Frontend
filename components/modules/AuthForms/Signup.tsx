'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import {
  createUser,
  signInWithPhone,
  signUp
} from '@/utils/auth-helpers/server'
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
import Image from 'next/image'
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
  redirectMethod: string
}

const FormSchema = z.object({
  first_name: z
    .string()
    .min(2, {
      message: 'First name must be at least 3 characters.'
    })
    .optional(),
  last_name: z.string().min(1, {
    message: 'Last name is required'
  }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  }),
  address: z.string().min(1, {
    message: 'Address is required'
  }),
  message: z.string().optional(),
  phone: z.string().regex(phoneRegex, 'Invalid Number!'),
  birthDate: z.date({
    required_error: 'A date of birth is required.'
  })
})

export default function SignUp({ allowEmail, redirectMethod }: SignUpProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  const router = redirectMethod === 'client' ? useRouter() : null
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAdditional, setShowAdditional] = useState(false)

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true)
    try {
      const transformedData = {
        ...data,
        birthDate: data.birthDate.toISOString()
      }
      await handleRequest(transformedData, signUp, router)
      // await handleRequest(transformedData, signInWithPhone, router)
      // await handleRequest(transformedData, createUser, router)
      setIsSubmitting(false)
    } catch {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4  lg:gap-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 text-white mb-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-full min-w-[48%] lg:flex-1">
                <FormLabel className="text-white font-bold text-lg">
                  First Name <sup className="text-orangeMain pt-1">*</sup>
                </FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                      <User className="w-5 text-greenMain" />
                    </div>
                    <Input
                      type="text"
                      placeholder="John"
                      {...field}
                      className="pl-[52px] bg-transparent border-2 border-white [&::placeholder]:text-white [&::placeholder]:opacity-60 text-white"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="w-full min-w-[48%] lg:flex-1">
                <FormLabel className="text-white font-bold text-lg">
                  Last Name <sup className="text-orangeMain pt-1">*</sup>
                </FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                      <User className="w-5 text-greenMain" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Carter"
                      {...field}
                      className="pl-[52px] bg-transparent border-2 border-white [&::placeholder]:text-white [&::placeholder]:opacity-60 text-white"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="w-full min-w-[48%] lg:flex-1">
                <FormLabel className="text-white font-bold text-lg">
                  Birth Year <sup className="text-orangeMain pt-1">*</sup>
                </FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="relative w-full">
                        <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                          <CalendarRange className="w-5 text-greenMain" />
                        </div>
                        <Button
                          type="button"
                          variant={'outline'}
                          className={cn(
                            'w-full pl-[52px] bg-transparent border-2 border-white [&::placeholder]:text-white [&::placeholder]:opacity-60 hover:bg-transparent font-normal text-white justify-start',
                            !field.value && 'text-muted-foreground'
                          )}
                          {...form.register('birthDate')}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span className="opacity-60">Pick a date</span>
                          )}
                        </Button>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
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
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full min-w-[48%] lg:flex-1">
                <FormLabel className="text-white font-bold text-lg">
                  Address <sup className="text-orangeMain pt-1">*</sup>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                      <MapPin className="w-5 text-greenMain" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Abc, Street, 123"
                      {...field}
                      className="pl-[52px] bg-transparent border-2 border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full min-w-[48%] lg:flex-1">
                <FormLabel className="text-white font-bold text-lg">
                  Phone <sup className="text-orangeMain pt-1">*</sup>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                      <PhoneCall className="w-5 text-greenMain" />
                    </div>
                    <Input
                      type="tel"
                      placeholder="(123) 456 - 789"
                      {...field}
                      className="pl-[52px] bg-transparent border-2 border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full min-w-[48%] lg:flex-1">
                <FormLabel className="text-white font-bold text-lg">
                  Email <sup className="text-orangeMain pt-1">*</sup>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                      <Mail className="w-5 text-greenMain" />
                    </div>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      {...field}
                      className="pl-[52px] bg-transparent border-2 border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full min-w-[48%] lg:flex-1">
                <FormLabel className="text-white font-bold text-lg">
                  Email <sup className="text-orangeMain pt-1">*</sup>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                      <Mail className="w-5 text-greenMain" />
                    </div>
                    <Input
                      type="password"
                      placeholder="*******"
                      {...field}
                      className="pl-[52px] bg-transparent border-2 border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {showAdditional ? (
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full min-w-[48%] lg:flex-1">
                <FormLabel className="text-white font-bold text-lg">
                  Bio
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-6 top-8">
                      <Image
                        src={'/green-pen.png'}
                        width={20}
                        height={20}
                        alt={`Name`}
                        className="w-5 h-[15.7px] object-contain"
                      />
                    </div>
                    <Textarea
                      placeholder="Tell us a little bit about your request"
                      {...field}
                      className="pl-[52px] resize-none bg-transparent border-2 border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}
        {!showAdditional ? (
          <Button
            onClick={() => setShowAdditional(true)}
            variant={'outline'}
            type="button"
            className="w-full border-white text-white"
          >
            Add Additional Details
          </Button>
        ) : null}
        <Button
          type="submit"
          variant={'secondary'}
          className="w-full"
          disabled={isSubmitting}
        >
          Done
        </Button>
        <div className="mt-4">
          <h5 className="text-md text-white/80 font-medium">
            Already have an account?
          </h5>
          <Link
            href="/signin/password_signin"
            className="font-medium text-sm text-white"
          >
            Sign in with email and password
          </Link>{' '}
          {allowEmail && (
            <Link
              href="/signin/email_signin"
              className="font-medium text-sm text-white"
            >
              Sign in via magic link
            </Link>
          )}
        </div>
      </form>
    </Form>
  )

  // return (
  //   <>
  //     <Form {...form}>
  //       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
  //         <FormField
  //           control={form.control}
  //           name="email"
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>Email</FormLabel>
  //               <FormControl>
  //                 <Input
  //                   type="email"
  //                   placeholder="Your email address"
  //                   {...field}
  //                 />
  //               </FormControl>
  //               <FormMessage />
  //             </FormItem>
  //           )}
  //         />

  //         <FormField
  //           control={form.control}
  //           name="password"
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>Password</FormLabel>
  //               <FormControl>
  //                 <Input
  //                   type="password"
  //                   placeholder="Your Password"
  //                   {...field}
  //                 />
  //               </FormControl>
  //               <FormMessage />
  //             </FormItem>
  //           )}
  //         />

  //         <Button type="submit" disabled={isSubmitting}>
  //           Sign Up
  //         </Button>
  //       </form>
  //     </Form>

  //     <div className="mt-4">
  //       <h5 className="text-md">Already have an account?</h5>
  //       <Link
  //         href="/signin/password_signin"
  //         className="font-medium text-sm text-primary"
  //       >
  //         Sign in with email and password
  //       </Link>
  //       {allowEmail && (
  //         <Link
  //           href="/signin/email_signin"
  //           className="font-medium text-sm text-primary"
  //         >
  //           Sign in via magic link
  //         </Link>
  //       )}
  //     </div>
  //   </>
  // )
}
