'use client'

import { Button } from '@/components/ui/button'
import { handleRequest } from '@/utils/auth-helpers/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  signInWithPassword,
  signUpWithPassword
} from '@/utils/auth-helpers/server'
import FormInput from '@/components/modules/FormInput'
import { KeyIcon, MailIcon } from 'lucide-react'
import Link from 'next/link'
import Separator from '@/components/modules/Separator'
import FormCheck from '@/components/modules/FormCheck'

interface PasswordAuthProps {
  register: boolean
}

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string(),
  term: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' })
  })
})

export default function PasswordAuthForm({ register }: PasswordAuthProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true)
    if (register) {
      await handleRequest(data, signUpWithPassword, router)
    } else {
      await handleRequest(data, signInWithPassword, router)
    }
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
          placeholder="Your Email Address"
          icon={<MailIcon className="w-5 text-primary" />}
        />

        <FormInput
          control={form.control}
          type="password"
          name="password"
          placeholder="Your Password"
          icon={<KeyIcon className="w-5 text-primary" />}
        />

        <Button
          variant="secondary"
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {register ? 'Register' : 'Login'}
        </Button>

        <div className="text-center text-white font-semibold">
          {register ? (
            <p>
              <span className="mr-2">Already have an account?</span>
              <Link href="/auth/login" className="underline">
                Login
              </Link>
            </p>
          ) : (
            <>
              <Link
                href="/auth/forgot-password"
                className="block underline mb-3"
              >
                Forgot your password?
              </Link>
              <p>
                <span className="mr-2">Don&apos;t have an account?</span>
                <Link href="/auth/register" className="underline">
                  Register
                </Link>
              </p>
            </>
          )}
        </div>

        <Separator />

        <FormCheck
          control={form.control}
          name="term"
          label={
            <>
              I have read and accept the{' '}
              <Link
                href="/terms-and-conditions"
                className="font-normal underline"
              >
                Terms and conditions
              </Link>
              {', '}
              <Link href="/privacy-policy" className="font-normal underline">
                Privacy Policy
              </Link>
              {', '}
              and all associated policies. *
            </>
          }
        />
      </form>
    </Form>
  )
}
