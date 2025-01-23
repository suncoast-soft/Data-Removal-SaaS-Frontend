'use client'

import { SignOut } from '@/utils/auth-helpers/server'
import { handleRequest } from '@/utils/auth-helpers/client'
import { usePathname, useRouter } from 'next/navigation'
import { getRedirectMethod } from '@/utils/auth-helpers/settings'
import { Input } from '@/components/ui/input'
import { LogOutIcon } from 'lucide-react'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const FormSchema = z.object({
  pathName: z.string()
})

export default function SignoutForm() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = getRedirectMethod() === 'client' ? useRouter() : null
  const [isSubmitting, setIsSubmitting] = useState(false)

  const pathname = usePathname()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true)
    try {
      await handleRequest(data, SignOut, router)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="pathName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="hidden"
                  {...field}
                  defaultValue={pathname || '/'}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="outline"
          size="small"
        >
          <LogOutIcon size={16} />
          <span className="ml-2">Sign out</span>
        </Button>
      </form>
    </Form>
  )
}
