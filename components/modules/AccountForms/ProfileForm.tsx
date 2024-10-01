'use client'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { handleRequest } from '@/utils/auth-helpers/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Input from '@/components/ui/Input'
import { Tables } from '@/types_db'
import { updateUser } from '@/utils/auth-helpers/server'

type User = Tables<'users'>

export default function ProfileForm({ userDetails }: { userDetails: User }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    handleRequest(e, updateUser, router)
    setIsSubmitting(false)
  }

  return (
    <Card
      title="Your Name"
      description="Please enter your full name, or a display name you are comfortable with."
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">64 characters maximum</p>
          <Button
            variant="slim"
            type="submit"
            form="profileForm"
            loading={isSubmitting}
          >
            Update Profile
          </Button>
        </div>
      }
    >
      <div className="mt-8 mb-4 text-xl font-semibold">
        <form id="profileForm" onSubmit={(e) => handleSubmit(e)}>
          <Input
            variant="white"
            type="text"
            name="firstName"
            defaultValue={userDetails.first_name ?? ''}
            placeholder="First Name"
            maxLength={64}
            required
          />

          <Input
            variant="white"
            type="text"
            name="lastName"
            defaultValue={userDetails.first_name ?? ''}
            placeholder="Last Name"
            maxLength={64}
            required
          />

          <Input
            variant="white"
            type="date"
            name="firstName"
            defaultValue={userDetails.first_name ?? ''}
            placeholder="Birth Date"
            maxLength={64}
            required
          />

          <Input
            variant="white"
            type="text"
            name="firstName"
            defaultValue={userDetails.first_name ?? ''}
            placeholder="First Name"
            maxLength={64}
            required
          />

          <Input
            variant="white"
            type="text"
            name="firstName"
            defaultValue={userDetails.first_name ?? ''}
            placeholder="First Name"
            maxLength={64}
            required
          />

          <Input
            variant="white"
            type="text"
            name="firstName"
            defaultValue={userDetails.first_name ?? ''}
            placeholder="First Name"
            maxLength={64}
            required
          />
        </form>
      </div>
    </Card>
  )
}
