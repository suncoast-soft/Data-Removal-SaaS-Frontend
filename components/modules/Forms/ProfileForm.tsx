'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { handleRequest } from '@/utils/auth-helpers/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Building2,
  CalendarRange,
  Mail,
  MapPin,
  Pencil,
  PhoneCall,
  User
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { format } from 'date-fns'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { updateProfile, updateUser } from '@/utils/supabase/mutations'

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

        <DialogContent className="bg-dark text-white border-none max-w-5xl max-h-[90vh] overflow-y-auto">
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
              <div className="flex flex-wrap items-center justify-between gap-4 text-white mb-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full min-w-[28%] lg:flex-1">
                      <FormLabel className="text-white font-bold text-lg">
                        First Name <sup className="text-secondary pt-1">*</sup>
                      </FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                            <User className="w-5 text-primary" />
                          </div>
                          <Input
                            type="text"
                            placeholder="First Name"
                            {...field}
                            {...form.register('firstName')}
                            className="pl-[52px] py-2 h-[46px] bg-transparent border-2 border-white [&::placeholder]:text-white [&::placeholder]:opacity-60 text-white"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full min-w-[28%] lg:flex-1">
                      <FormLabel className="text-white font-bold text-lg">
                        Last Name <sup className="text-secondary pt-1">*</sup>
                      </FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                            <User className="w-5 text-primary" />
                          </div>
                          <Input
                            type="text"
                            placeholder="Last Name"
                            {...field}
                            {...form.register('lastName')}
                            className="pl-[52px] py-2 h-[46px] bg-transparent border-2 border-white [&::placeholder]:text-white [&::placeholder]:opacity-60 text-white"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="w-full min-w-[28%] lg:flex-1">
                      <FormLabel className="text-white font-bold text-lg">
                        Phone <sup className="text-secondary pt-1">*</sup>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                            <PhoneCall className="w-5 text-primary" />
                          </div>
                          <Input
                            type="tel"
                            placeholder="(123) 456 - 789"
                            {...field}
                            {...form.register('phone')}
                            className="pl-[52px] py-2 h-[46px] bg-transparent border-2 border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full min-w-[28%] lg:flex-1">
                      <FormLabel className="text-white font-bold text-lg">
                        Email <sup className="text-secondary pt-1">*</sup>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                            <Mail className="w-5 text-primary" />
                          </div>
                          <Input
                            type="email"
                            placeholder="example@email.com"
                            {...field}
                            {...form.register('email')}
                            className="pl-[52px] py-2 h-[46px] bg-transparent border-2 border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="alternativeNames"
                  render={({ field }) => (
                    <FormItem className="w-full min-w-[48%] lg:flex-1">
                      <FormLabel className="text-white font-bold text-lg">
                        Alternative Names
                      </FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                            <Building2 className="w-5 text-primary" />
                          </div>
                          <Input
                            type="text"
                            placeholder="Joseph Smith, Joseph Andrew Smith"
                            {...field}
                            {...form.register('alternativeNames')}
                            className="pl-[52px] py-2 h-[46px] bg-transparent border-2 border-white [&::placeholder]:text-white [&::placeholder]:opacity-60 text-white"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="social_security_number"
                  render={({ field }) => (
                    <FormItem className="w-full min-w-[28%] lg:flex-1">
                      <FormLabel className="text-white font-bold text-lg">
                        Social Security Number
                      </FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                            <Building2 className="w-5 text-primary" />
                          </div>
                          <Input
                            type="text"
                            placeholder="123-XX-XXXX"
                            {...field}
                            {...form.register('social_security_number')}
                            className="pl-[52px] py-2 h-[46px] bg-transparent border-2 border-white [&::placeholder]:text-white [&::placeholder]:opacity-60 text-white"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem className="w-full min-w-[28%] lg:flex-1">
                      <FormLabel className="text-white font-bold text-lg">
                        Birth Year <sup className="text-secondary pt-1">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <div className="relative w-full">
                              <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                                <CalendarRange className="w-5 text-primary" />
                              </div>
                              <Button
                                type="button"
                                variant={'outline'}
                                className={cn(
                                  'w-full pl-[52px] py-2 h-[46px] bg-transparent border-2 border-white [&::placeholder]:text-white [&::placeholder]:opacity-60 hover:bg-transparent font-normal text-white justify-start',
                                  !field.value && 'text-muted-foreground'
                                )}
                                {...form.register('birthDate')}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span className="opacity-60">
                                    Pick a date
                                  </span>
                                )}
                              </Button>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              defaultMonth={new Date('1990-01-01')}
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date('1900-01-01')
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full min-w-[28%] lg:flex-1">
                      <FormLabel className="text-white font-bold text-lg">
                        City
                      </FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                            <Building2 className="w-5 text-primary" />
                          </div>
                          <Input
                            type="text"
                            placeholder="City"
                            {...field}
                            {...form.register('city')}
                            className="pl-[52px] py-2 h-[46px] bg-transparent border-2 border-white [&::placeholder]:text-white [&::placeholder]:opacity-60 text-white"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="w-full min-w-[28%] lg:flex-1">
                      <FormLabel className="text-white font-bold text-lg">
                        State
                      </FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                            <Building2 className="w-5 text-primary" />
                          </div>
                          <Input
                            type="text"
                            placeholder="State"
                            {...field}
                            {...form.register('state')}
                            className="pl-[52px] py-2 h-[46px] bg-transparent border-2 border-white [&::placeholder]:text-white [&::placeholder]:opacity-60 text-white"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-full min-w-[28%] lg:flex-1">
                      <FormLabel className="text-white font-bold text-lg">
                        Address <sup className="text-secondary pt-1">*</sup>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                            <MapPin className="w-5 text-primary" />
                          </div>
                          <Input
                            type="text"
                            placeholder="Abc, Street, 123"
                            {...field}
                            {...form.register('address')}
                            className="pl-[52px] py-2 h-[46px] bg-transparent border-2 border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="w-full min-w-[28%] lg:flex-1">
                      <FormLabel className="text-white font-bold text-lg">
                        Gender <sup className="text-secondary pt-1">*</sup>
                      </FormLabel>
                      <FormControl>
                        <ToggleGroup
                          type="single"
                          className="justify-start gap-4"
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <ToggleGroupItem
                            value="male"
                            {...form.register('gender')}
                            aria-label="Toggle Male"
                            className="border-2 h-[46px] w-[46px] border-white data-[state=on]:bg-white data-[state=on]:text-dark"
                          >
                            <span className="font-bold text-xl">M</span>
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="female"
                            {...form.register('gender')}
                            aria-label="Toggle Female"
                            className="border-2 h-[46px] w-[46px] border-white data-[state=on]:bg-white data-[state=on]:text-dark"
                          >
                            <span className="font-bold text-xl">F</span>
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem className="w-full min-w-[28%] lg:flex-1">
                      <FormLabel className="text-white font-bold text-lg">
                        Bio
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-6 top-3.5">
                            <Pencil className="w-5 text-primary" />
                          </div>
                          <Textarea
                            placeholder="Tell us a little bit about your request"
                            {...field}
                            className="pl-[52px] py-2 h-[46px] resize-none bg-transparent border-2 border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                variant="default"
                type="submit"
                form="profileForm"
                className="w-full lg:w-[200px]"
              >
                {props.defaultValues ? 'Update' : 'Submit'}
              </Button>
            </form>
          </Form>
          <DialogFooter>
            <p className="text-sm text-white/40">All fields are required</p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
