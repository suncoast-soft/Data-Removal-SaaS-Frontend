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
    <Card className="mb-8 bg-primary/10">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Please enter the email address you want to use to login.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            id="emailForm"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Email Address"
                      defaultValue={userEmail ?? ''}
                      {...form.register('email')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant="default" type="submit" form="emailForm">
              Update Email
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <p className="text-sm">We will email you to verify the change.</p>
      </CardFooter>
    </Card>
  )
}
