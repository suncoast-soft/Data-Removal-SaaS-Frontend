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

export default function EmailForm({
  userEmail
}: {
  userEmail: string | undefined
}) {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e.currentTarget.newEmail.value === userEmail) {
      e.preventDefault()
      return
    }
    handleRequest(e, updateEmail, router)
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
        <form id="emailForm" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            name="newEmail"
            className="w-1/2 p-3 rounded-md bg-zinc-800"
            defaultValue={userEmail ?? ''}
            placeholder="Your email"
            maxLength={64}
          />
        </form>
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
