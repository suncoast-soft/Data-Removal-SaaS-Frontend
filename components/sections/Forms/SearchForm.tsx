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
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ArrowRight from '@/components/icons/ArrowRight'
import { useRouter } from 'next/navigation'
import InformationConsent from '@/components/modules/InformationConsent'
import { BlockContent } from '@/sanity.types'

const FormSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters.'
  })
})

interface FormProps {
  consent?: {
    title?: string | undefined
    description?: BlockContent
  }
}

export default function SearchForm({ consent }: FormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: ''
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    router.push(`/scan/address?name=${data.name}`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-col flex lg:flex-row mt-[50px] lg:mt-10 gap-4 lg:gap-6 flex-wrap"
      >
        <div className="z-10">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full lg:w-fit">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your Full Name..."
                    className="lg:w-80 placeholder:text-dark/60"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <InformationConsent
            title={consent?.title}
            description={consent?.description}
          />
        </div>

        <Button
          variant="default"
          type="submit"
          className="z-10 w-full lg:w-auto"
        >
          <span className="mr-2">SEARCH</span>
          <ArrowRight />
        </Button>
      </form>
    </Form>
  )
}
