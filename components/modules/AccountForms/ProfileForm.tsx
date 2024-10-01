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

type User = Tables<'users'>

export default function ProfileForm({ userDetails }: { userDetails: User }) {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    handleRequest(e, updateUser, router)
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
        <form id="profileForm" onSubmit={(e) => handleSubmit(e)}>
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
            name="firstName"
            defaultValue={userDetails.first_name ?? ''}
            placeholder="Birth Date"
            maxLength={64}
            required
          />

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
            name="firstName"
            defaultValue={userDetails.first_name ?? ''}
            placeholder="First Name"
            maxLength={64}
            required
          />

          <Input
            type="text"
            name="firstName"
            defaultValue={userDetails.first_name ?? ''}
            placeholder="First Name"
            maxLength={64}
            required
          />
        </form>
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
