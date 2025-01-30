'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { handleRequest } from '@/utils/auth-helpers/client'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import {
  Building2Icon,
  MailIcon,
  MapPinIcon,
  PhoneCallIcon,
  UserIcon
} from 'lucide-react'
import { useState } from 'react'
import { createProfile, updateProfile } from '@/utils/supabase/mutations'
import FormInput from '@/components/modules/FormInput'
import FormDate from '@/components/modules/FormDate'
import FormToggle from '@/components/modules/FormToggle'
import FormTextarea from '@/components/modules/FormTextarea'
import { Tables } from '@/types_db'
import { User } from '@supabase/supabase-js'
import { splitName } from '@/utils/helpers'

const FormSchema = z.object({
  email: z.string(),
  phone: z.string(),
  ssn: z.string().optional(),
  first_name: z.string(),
  last_name: z.string(),
  alternative_names: z.string().optional(),
  birth_date: z.date(),
  gender: z.string().optional(),
  address: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zip: z.string().optional(),
  bio: z.string().optional()
})

interface SectionProps {
  user: User
  profile?: Tables<'profiles'>
  isPrimary?: boolean
  children: React.ReactNode
}

export default function ProfileForm({
  user,
  profile,
  isPrimary = false,
  children
}: SectionProps) {
  const router = useRouter()
  const [open, setOpen] = useState(isPrimary)

  const defaultValues = profile
    ? {
        email: profile.email ?? '',
        phone: profile.phone ?? '',
        ssn: profile.ssn ?? '',
        first_name: profile.first_name ?? '',
        last_name: profile.last_name ?? '',
        alternative_names: profile.alternative_names ?? '',
        birth_date: new Date(profile.birth_date ?? '1990-01-11'),
        gender: profile.gender ?? 'male',
        address: profile.address ?? '',
        city: profile.city ?? '',
        state: profile.state ?? '',
        zip: profile.zip ?? '',
        bio: profile.bio ?? ''
      }
    : {
        email: user.email ?? '',
        phone: user.user_metadata.phone ?? '',
        ssn: '',
        first_name: splitName(user.user_metadata.full_name).firstName ?? '',
        last_name: splitName(user.user_metadata.full_name).lastName ?? '',
        alternative_names: '',
        birth_date: undefined,
        gender: 'male',
        address: '',
        city: '',
        state: '',
        zip: '',
        bio: ''
      }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (profile) {
      const transformedData = {
        ...data,
        birth_date: data.birth_date.toISOString(),
        id: profile.id
      }
      await handleRequest(transformedData, updateProfile, router)
    } else {
      const transformedData = {
        ...data,
        birth_date: data.birth_date.toISOString(),
        is_primary: isPrimary
      }
      await handleRequest(transformedData, createProfile, router)
    }

    setOpen(false)
  }

  return (
    <div className="flex justify-end w-full">
      <Dialog
        open={open}
        onOpenChange={(state) => setOpen(isPrimary ? true : state)}
      >
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent className="bg-dark text-white border-none max-w-5xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl lg:text-3xl text-white leading-[55px] flex items-center">
              {profile ? 'Edit Profile' : 'Create New Profile'}
            </DialogTitle>

            <DialogDescription className="text-white/50">
              Profile edits are only available 3 times per month
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 py-6"
            >
              <div className="grid grid-cols-3 gap-4">
                <FormInput
                  control={form.control}
                  type="email"
                  name="email"
                  label="Email Address"
                  placeholder="example@gmail.com"
                  icon={<MailIcon className="w-5 text-primary" />}
                  required={true}
                />

                <FormInput
                  control={form.control}
                  name="phone"
                  label="Phone Number"
                  placeholder="(123) 456 7890"
                  icon={<PhoneCallIcon className="w-5 text-primary" />}
                  required={true}
                />

                <FormInput
                  control={form.control}
                  name="ssn"
                  label="Social Security Number"
                  placeholder="***-**-***"
                  icon={<Building2Icon className="w-5 text-primary" />}
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <FormInput
                  control={form.control}
                  name="first_name"
                  label="First Name"
                  placeholder="Joe"
                  icon={<UserIcon className="w-5 text-primary" />}
                  required={true}
                />

                <FormInput
                  control={form.control}
                  name="last_name"
                  label="Last Name"
                  placeholder="Smith"
                  icon={<UserIcon className="w-5 text-primary" />}
                  required={true}
                />

                <FormInput
                  control={form.control}
                  name="alternative_names"
                  label="Alternative Names"
                  placeholder="Joseph Smith, Joseph Andrew Smith"
                  icon={<Building2Icon className="w-5 text-primary" />}
                  className="col-span-2"
                />
              </div>

              <div className="grid grid-cols-5 gap-4">
                <FormInput
                  control={form.control}
                  name="address"
                  label="Address"
                  placeholder="123 ABC street"
                  icon={<MapPinIcon className="w-5 text-primary" />}
                  className="col-span-2"
                />

                <FormInput
                  control={form.control}
                  name="city"
                  label="City"
                  placeholder="Chicago"
                  icon={<MapPinIcon className="w-5 text-primary" />}
                  required={true}
                />

                <FormInput
                  control={form.control}
                  name="state"
                  label="State"
                  placeholder="IL"
                  icon={<MapPinIcon className="w-5 text-primary" />}
                  required={true}
                />

                <FormInput
                  control={form.control}
                  name="zip"
                  label="Zip"
                  placeholder="12345"
                  icon={<MapPinIcon className="w-5 text-primary" />}
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <FormDate
                  control={form.control}
                  name="birth_date"
                  label="Birth Date"
                  required={true}
                />

                <FormToggle
                  control={form.control}
                  name="gender"
                  label="Gender"
                  options={[
                    { label: 'M', value: 'male' },
                    { label: 'F', value: 'female' }
                  ]}
                />

                <FormTextarea
                  control={form.control}
                  name="bio"
                  label="Bio"
                  placeholder="Tell us a little bit about yourself"
                  className="col-span-2"
                />
              </div>

              <Button variant="default" type="submit">
                {profile ? 'Update Profile' : 'Submit Profile'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
