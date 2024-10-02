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
import { handleRequest } from '@/utils/auth-helpers/client'
import { useRouter } from 'next/navigation'
import { Tables } from '@/types_db'
import { updateUser } from '@/utils/auth-helpers/server'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { Form, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

type User = Tables<'users'>

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' })
})

export default function ProfileForm({ userDetails }: { userDetails: User }) {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    handleRequest(data, updateUser, router)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>
          Please enter your name, gender, birth date, and address information in
          the below form.
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-8 mb-4 text-xl font-semibold">
        <Form {...form}>
          <form id="profileForm" onSubmit={form.handleSubmit(onSubmit)}>
            <Input
              type="text"
              name="firstName"
              defaultValue={userDetails.first_name ?? ''}
              placeholder="First Name"
              maxLength={64}
              required
            />

            <Input
              type="text"
              name="lastName"
              defaultValue={userDetails.first_name ?? ''}
              placeholder="Last Name"
              maxLength={64}
              required
            />

            <Input
              type="date"
              name="birthDate"
              defaultValue={userDetails.first_name ?? ''}
              placeholder="Birth Date"
              maxLength={64}
              required
            />

            <Input
              type="text"
              name="gender"
              defaultValue={userDetails.first_name ?? ''}
              placeholder="Gender"
              maxLength={64}
              required
            />

            <Input
              type="text"
              name="city"
              defaultValue={userDetails.first_name ?? ''}
              placeholder="City"
              maxLength={64}
              required
            />

            <Input
              type="text"
              name="state"
              defaultValue={userDetails.first_name ?? ''}
              placeholder="State"
              maxLength={64}
              required
            />
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">64 characters maximum</p>
          <Button variant="default" type="submit" form="profileForm">
            Update Profile
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
