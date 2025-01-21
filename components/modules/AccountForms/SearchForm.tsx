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
import { Info } from 'lucide-react'
import Link from 'next/link'
import ArrowRight from '@/components/icons/ArrowRight'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters.'
  })
})

export default function SearchForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: ''
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    router.push(`/result?name=${data.name}`)
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
                    className="lg:w-[340px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-2 mt-4 lg:mt-3 z-10">
            <Info className="w-[18px] h-[18px]" />
            <Link
              href={'/'}
              className="text-sm leading-[18px] font-semibold transition ease-in-out duration-75 cursor-pointer text-dark hover:text-slate-700 w-fit no-underline border-b border-dark"
            >
              How we use your information?
            </Link>
          </div>
        </div>

        <Button variant="default" type="submit" className="z-10">
          <span className="mr-2">SEARCH</span>
          <ArrowRight />
        </Button>
      </form>
    </Form>
  )
}
