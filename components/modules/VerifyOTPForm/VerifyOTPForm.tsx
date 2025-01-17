'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { InputOTP, InputOTPGroup, InputOTPSlot } from './helper-components'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: 'Must be 6 digits.'
  })
})

export default function VerifyOTPForm() {
  const [isResending, setIsResending] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const [isVerified, setIsVerified] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  async function onSubmit() {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsVerified(true)
    setIsSubmitting(false)
  }

  const handleResend = async () => {
    setIsResending(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsResending(false)
  }

  useEffect(() => {
    if (isVerified) {
      router.push('/verify/otp?success=true')
    }
  }, [isVerified, router])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="my-6">
              <FormControl>
                <InputOTP
                  maxLength={6}
                  render={({ slots }) => (
                    <InputOTPGroup className="flex gap-2">
                      {slots.map((slot, index) => (
                        <InputOTPSlot
                          key={index}
                          {...slot}
                          className="w-[60px] h-[60px] lg:w-[120px] lg:h-[120px] text-2xl font-bold border bg-white text-darkMain border-darkMain/15 rounded-[10px] lg:rounded-[20px] focus:border-orange-500 focus:ring-orange-500"
                        />
                      ))}
                    </InputOTPGroup>
                  )}
                  {...field}
                  onChange={(value) => {
                    field.onChange(value)
                    if (value.length === 6) {
                      form.handleSubmit(onSubmit)()
                    }
                  }}
                  disabled={isSubmitting || isResending || isVerified}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="button"
          variant="link"
          className="text-orangeMain hover:text-orangeMain/90 text-lg p-0 h-fit"
          disabled={isResending || isSubmitting}
          onClick={handleResend}
        >
          {isResending ? 'Resending...' : 'Resend SMS code'}
        </Button>
      </form>
    </Form>
  )
}
