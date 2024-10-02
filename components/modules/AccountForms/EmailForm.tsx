'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { updateEmail } from '@/utils/auth-helpers/server'
import { handleRequest } from '@/utils/auth-helpers/client'
import { useRouter } from 'next/navigation'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' })
})

export default function EmailForm({
  userEmail
}: {
  userEmail: string | undefined
}) {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (data.email === userEmail) {
      return
    }
    handleRequest(data, updateEmail, router)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Email</CardTitle>
        <CardDescription>
          Please enter the email address you want to use to login.
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-8 mb-4 text-xl font-semibold">
        <Form {...form}>
          <form id="emailForm" onSubmit={form.handleSubmit(onSubmit)}>
            <input
              type="text"
              name="email"
              className="w-1/2 p-3 rounded-md bg-slate-800"
              defaultValue={userEmail ?? ''}
              placeholder="Your email"
              maxLength={64}
            />
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">
            We will email you to verify the change.
          </p>
          <Button variant="default" type="submit" form="emailForm">
            Update Email
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
