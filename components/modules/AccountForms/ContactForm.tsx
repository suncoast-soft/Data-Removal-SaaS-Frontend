'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { toast } from '@/hooks/use-toast'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

const FormSchema = z.object({
  name: z.string(),
  email: z.string(),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(300, { message: 'Message cannot be longer than 300 characters.' })
})

export default function ContactForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  function onSubmit() {
    toast({
      title: 'Your request has been received successfully!'
    })
  }

  const inputContainerStyles =
    'relative w-full bg-transparent border-2 border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60'
  const iconStyles =
    'absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 object-contain'

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 lg:gap-6"
      >
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 text-white">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full lg:w-auto lg:flex-1">
                <FormLabel className="text-white font-bold text-lg">
                  Name
                </FormLabel>
                <FormControl>
                  <div className={inputContainerStyles}>
                    <Image
                      src="/green-user.png"
                      width={20}
                      height={20}
                      alt="Name"
                      className={iconStyles}
                    />
                    <Input
                      type="text"
                      placeholder="John Carter"
                      {...field}
                      className="pl-12"
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
              <FormItem className="w-full lg:w-auto lg:flex-1">
                <FormLabel className="text-white font-bold text-lg">
                  Email
                </FormLabel>
                <FormControl>
                  <div className={inputContainerStyles}>
                    <Image
                      src="/green-email.png"
                      width={20}
                      height={20}
                      alt="Email"
                      className={iconStyles}
                    />
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      {...field}
                      className="pl-12"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Message Field */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-white font-bold text-lg">
                Leave us a message
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Image
                    src="/green-pen.png"
                    width={20}
                    height={20}
                    alt="Message"
                    className="absolute left-6 top-8 w-5 h-4 object-contain"
                  />
                  <Textarea
                    placeholder="Tell us a little bit about your request"
                    {...field}
                    className="pl-12 resize-none bg-transparent border-2 border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="secondary"
          className="w-full lg:w-52 text-center"
        >
          Send Message
        </Button>
      </form>
    </Form>
  )
}
