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
import { MailIcon, UserIcon } from 'lucide-react'

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

  const renderInputField = (
    name: keyof z.infer<typeof FormSchema>,
    label: string,
    placeholder: string,
    icon: React.ReactNode,
    type: 'text' | 'email',
    isRequired = false
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full min-w-[48%] lg:flex-1">
          <FormLabel className="text-white font-semibold text-lg">
            {label}
            {isRequired && <sup className="text-secondary pt-1"> *</sup>}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                {icon}
              </div>
              <Input
                type={type}
                placeholder={placeholder}
                {...field}
                value={field.value}
                className="bg-white text-dark [&::placeholder]:text-dark/60 py-3"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 lg:gap-6"
      >
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 text-white">
          {renderInputField(
            'name',
            'Name',
            'Your Name',
            <UserIcon className="w-5 text-primary" />,
            'text',
            true
          )}

          {renderInputField(
            'email',
            'Email',
            'example@email.com',
            <MailIcon className="w-5 text-primary" />,
            'email',
            true
          )}
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-white font-semibold text-lg">
                Leave us a message
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Image
                    src="/green-pen.png"
                    width={20}
                    height={20}
                    alt="Message"
                    className="absolute left-2 top-5 w-5 h-4 object-contain"
                  />
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    {...field}
                    className="px-4 py-4 pl-8 resize-none bg-transparent border border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60 ring-offset-white focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-white"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" variant="secondary" className="w-full lg:w-52">
          Send Message
        </Button>
      </form>
    </Form>
  )
}
