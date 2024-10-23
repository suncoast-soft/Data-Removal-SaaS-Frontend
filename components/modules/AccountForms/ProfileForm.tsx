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
import { Tables } from '@/types_db'
import { updateUser } from '@/utils/auth-helpers/server'
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
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/utils/cn'
import { format } from 'date-fns'
import { useState } from 'react'

type Profile = Tables<'profiles'>

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
  city: z.string({ required_error: 'City is required.' }),
  state: z.string({ required_error: 'State is required.' })
})

export default function ProfileForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(searchParams.get('new') === 'true')

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const transformedData = {
      ...data,
      birthDate: data.birthDate.toISOString()
    }
    await handleRequest(transformedData, updateUser, router)

    setOpen(false)
  }

  return (
    <div className="flex justify-end">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Submit New Profile</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary font-semibold">
              Submit Profile
            </DialogTitle>
            <DialogDescription>
              Profile can not be changed once created. You can create up to 3
              free profiles.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              id="profileForm"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 py-6"
            >
              <div className="flex gap-4 md:gap-2 flex-col md:flex-row">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="First Name"
                          {...form.register('firstName')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Last Name"
                          {...form.register('lastName')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-8 md:gap-2 flex-col md:flex-row">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <ToggleGroup
                          type="single"
                          className="justify-start"
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <ToggleGroupItem
                            value="male"
                            {...form.register('gender')}
                            aria-label="Toggle Male"
                            className="border border-primary data-[state=on]:bg-primary data-[state=on]:text-white"
                          >
                            <span className="h-5 w-4">M</span>
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="female"
                            {...form.register('gender')}
                            aria-label="Toggle Female"
                            className="border border-primary data-[state=on]:bg-primary data-[state=on]:text-white"
                          >
                            <span className="h-5 w-4">F</span>
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Date of birth</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-[240px] pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                                {...form.register('birthDate')}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
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
              </div>

              <div className="flex gap-4 md:gap-2 flex-col md:flex-row">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="City"
                          {...form.register('city')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="State"
                          {...form.register('state')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button variant="default" type="submit" form="profileForm">
                Submit
              </Button>
            </form>
          </Form>
          <DialogFooter>
            <p className="text-sm">All fields are required</p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
