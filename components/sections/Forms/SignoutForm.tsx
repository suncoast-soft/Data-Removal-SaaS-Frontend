'use client'

import { SignOut } from '@/utils/auth-helpers/server'
import { handleRequest } from '@/utils/auth-helpers/client'
import { usePathname, useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { LogOutIcon } from 'lucide-react'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const FormSchema = z.object({
  pathName: z.string()
})

export default function SignoutForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

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
        <Input
          type="hidden"
          defaultValue={usePathname()}
          {...form.register('pathName')}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="link"
          className="px-2 py-4 border-none"
        >
          <div className="flex justify-start items-center gap-2">
            <span className="w-6 h-6 text-primary">
              <LogOutIcon />
            </span>
            <span>Sign out</span>
          </div>
        </Button>
      </form>
    </Form>
  )
}
