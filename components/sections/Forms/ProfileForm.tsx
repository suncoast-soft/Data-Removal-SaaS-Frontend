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
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Building2, Mail, MapPin, PhoneCall, User } from 'lucide-react'
import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { updateProfile, updateUser } from '@/utils/supabase/mutations'
import FormInput from '@/components/modules/FormInput'
import FormDate from '@/components/modules/FormDate'
import FormToggle from '@/components/modules/FormToggle'
import FormTextarea from '@/components/modules/FormTextarea'

const FormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.'
    })
    .max(32, {
      message: 'Name can not be longer than 300 characters.'
    }),
  lastName: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.'
    })
    .max(32, {
      message: 'Name can not be longer than 300 characters.'
    }),
  gender: z.string({ required_error: 'Gender is required.' }),
  birthDate: z.date({
    required_error: 'A date of birth is required.'
  }),
  city: z.string({ required_error: 'City is required.' }).optional(),
  state: z.string({ required_error: 'State is required.' }).optional(),
  alternativeNames: z
    .string({ required_error: 'Alternative Names is required.' })
    .optional(),
  social_security_number: z
    .string({ required_error: 'Social Security Number is required.' })
    .optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
  is_primary: z.boolean().optional()
})

export default function ProfileForm({ ...props }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(
    props.defaultOpen || searchParams.get('new') === 'true'
  )

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: props.defaultValues?.first_name,
      lastName: props.defaultValues?.last_name,
      birthDate: props.defaultValues?.birth_date
        ? new Date(props.defaultValues?.birth_date)
        : new Date('1990-01-01'),
      gender: props.defaultValues?.gender,
      city: props.defaultValues?.city,
      state: props.defaultValues?.state,
      address: props.defaultValues?.address,
      phone: props.defaultValues?.phone,
      bio: props.defaultValues?.bio,
      alternativeNames: props.defaultValues?.alternative_names,
      social_security_number: props.defaultValues?.social_security_number,
      email: props.defaultValues?.email,
      is_primary: props.defaultValues?.is_primary
    }
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (props.defaultValues) {
      const transformedData = {
        ...data,
        id: props.defaultValues?.id,
        birthDate: data.birthDate.toISOString()
      }
      await handleRequest(transformedData, updateProfile, router)
    } else {
      const transformedData = {
        ...data,
        birthDate: data.birthDate.toISOString()
      }
      await handleRequest(transformedData, updateUser, router)
    }

    setOpen(false)
  }

  const handleChangePrimary = async (checked: boolean) => {
    if (checked) form.setValue('is_primary', checked)
  }

  return (
    <div className="flex justify-end w-full">
      <Dialog
        open={open}
        onOpenChange={(state) => setOpen(props.defaultOpen ? true : state)}
      >
        {!props.defaultOpen ? (
          <DialogTrigger asChild>
            {props.children || (
              <Button variant="default">Submit New Profile</Button>
            )}
          </DialogTrigger>
        ) : null}

        <DialogContent className="bg-dark text-white border-none max-w-5xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl lg:text-3xl text-white leading-[55px] flex items-center">
              {props.defaultValues ? 'Edit Profile' : 'Submit Profile'}
              <div className="flex gap-2">
                <Switch
                  className="ml-10 lg:ml-12"
                  defaultChecked={form.getValues().is_primary}
                  onCheckedChange={(checked) => handleChangePrimary(checked)}
                  disabled={form.getValues().is_primary}
                />
                <label className="text-xs lg:text-sm font-normal opacity-70">
                  {props?.defaultValues?.is_primary
                    ? 'Before change this you need to make other primary profile.'
                    : 'Make it primary?'}
                </label>
              </div>
            </DialogTitle>
            <DialogDescription className="text-white/50">
              {props.defaultValues
                ? 'Profile edits are only available 3 times per day'
                : 'Profile can not be changed once created. You can create up to 3 free profiles.'}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              id="profileForm"
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
                  icon={<Mail className="w-5 text-primary" />}
                  required={true}
                />

                <FormInput
                  control={form.control}
                  name="phone"
                  label="Phone Number"
                  placeholder="(123) 456 7890"
                  icon={<PhoneCall className="w-5 text-primary" />}
                  required={true}
                />

                <FormInput
                  control={form.control}
                  name="ssn"
                  label="Social Security Number"
                  placeholder="***-**-***"
                  icon={<Building2 className="w-5 text-primary" />}
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <FormInput
                  control={form.control}
                  name="first_name"
                  label="First Name"
                  placeholder="Joe"
                  icon={<User className="w-5 text-primary" />}
                  required={true}
                />

                <FormInput
                  control={form.control}
                  name="last_name"
                  label="Last Name"
                  placeholder="Smith"
                  icon={<User className="w-5 text-primary" />}
                  required={true}
                />

                <FormInput
                  control={form.control}
                  name="alternative_names"
                  label="Alternative Names"
                  placeholder="Joseph Smith, Joseph Andrew Smith"
                  icon={<Building2 className="w-5 text-primary" />}
                  className="col-span-2"
                />
              </div>

              <div className="grid grid-cols-5 gap-4">
                <FormInput
                  control={form.control}
                  name="address"
                  label="Address"
                  placeholder="123 ABC street"
                  icon={<MapPin className="w-5 text-primary" />}
                  className="col-span-2"
                />

                <FormInput
                  control={form.control}
                  name="city"
                  label="City"
                  placeholder="Chicago"
                  icon={<MapPin className="w-5 text-primary" />}
                  required={true}
                />

                <FormInput
                  control={form.control}
                  name="state"
                  label="State"
                  placeholder="IL"
                  icon={<MapPin className="w-5 text-primary" />}
                  required={true}
                />

                <FormInput
                  control={form.control}
                  name="zip"
                  label="Zip"
                  placeholder="12345"
                  icon={<MapPin className="w-5 text-primary" />}
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
                {props.defaultValues ? 'Update Profile' : 'Submit Profile'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
