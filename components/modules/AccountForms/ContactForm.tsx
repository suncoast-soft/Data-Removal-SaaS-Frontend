'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { toast } from '@/hooks/use-toast'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

const FormSchema = z.object({
  name: z.string(),
  email: z.string(),
  message: z
    .string()
    .min(10, {
      message: 'Message must be at least 10 characters.'
    })
    .max(300, {
      message: 'Message can not be longer than 300 characters.'
    })
})

export default function ContactForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'Your request has been received successfully!'
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4  lg:gap-6"
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
                  <div className="relative w-full">
                    <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                      <Image
                        src={'/green-user.png'}
                        width={20}
                        height={20}
                        alt={`Name`}
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                    <Input
                      type="text"
                      placeholder="John Carter"
                      {...field}
                      className="pl-[52px] bg-transparent border-2 border-white [&::placeholder]:text-white [&::placeholder]:opacity-60 text-white"
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
                  <div className="relative">
                    <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                      <Image
                        src={'/green-email.png'}
                        width={20}
                        height={20}
                        alt={`Name`}
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      {...field}
                      className="pl-[52px] bg-transparent border-2 border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full lg:w-auto lg:flex-1">
              <FormLabel className="text-white font-bold text-lg">
                Leave us a message
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="absolute left-6 top-8">
                    <Image
                      src={'/green-pen.png'}
                      width={20}
                      height={20}
                      alt={`Name`}
                      className="w-5 h-[15.7px] object-contain"
                    />
                  </div>
                  <Textarea
                    placeholder="Tell us a little bit about your request"
                    {...field}
                    className="pl-[52px] resize-none bg-transparent border-2 border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant={'secondary'}
          className="w-full lg:w-[200px]"
        >
          Send Message
        </Button>
      </form>
    </Form>
  )
}
