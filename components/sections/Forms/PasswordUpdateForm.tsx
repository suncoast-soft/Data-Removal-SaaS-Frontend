'use client'

import { Button } from '@/components/ui/button'
import { handleRequest } from '@/utils/auth-helpers/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { updatePassword } from '@/utils/auth-helpers/server'
import FormInput from '@/components/modules/FormInput'
import { KeyIcon } from 'lucide-react'
import Link from 'next/link'

const FormSchema = z.object({
  password1: z.string(),
  password2: z.string()
})

export default function PasswordUpdateForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error_description')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password1: '',
      password2: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true)

    await handleRequest(data, updatePassword, router)

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
          type="password"
          name="password1"
          label="New Password"
          placeholder="Enter Your New Password"
          icon={<KeyIcon className="w-5 text-primary" />}
        />

        <FormInput
          control={form.control}
          type="password"
          name="password2"
          label="Confirm New Password"
          placeholder="Enter Your Password Again"
          icon={<KeyIcon className="w-5 text-primary" />}
        />

        <Button
          variant="secondary"
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          Reset Password
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
