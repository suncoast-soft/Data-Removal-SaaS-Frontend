'use client'

import Link from 'next/link'
import { SignOut } from '@/utils/auth-helpers/server'
import { handleRequest } from '@/utils/auth-helpers/client'
import { usePathname, useRouter } from 'next/navigation'
import { getRedirectMethod } from '@/utils/auth-helpers/settings'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { getInitials } from '@/utils/helpers'
import { LogOut } from 'lucide-react'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

interface NavlinksProps {
  user?: any
  userDetails?: any
}

const FormSchema = z.object({
  pathName: z.string()
})

export default function UserDropdown({ user, userDetails }: NavlinksProps) {
  const router = getRedirectMethod() === 'client' ? useRouter() : null
  const [isSubmitting, setIsSubmitting] = useState(false)

  const name =
    userDetails?.firstName && userDetails?.lastName
      ? `${userDetails.firstName} ${userDetails.lastName}`
      : user.email

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true)
    await handleRequest(data, SignOut, router)
    setIsSubmitting(false)
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="default"
          color="primary"
          className="overflow-hidden rounded-full"
        >
          <Avatar>
            <AvatarFallback className="text-white bg-secondary">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/dashboard/settings" className={'no-underline'}>
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/dashboard/get-credits" className={'no-underline'}>
            Get Credits
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/dashboard/support" className={'no-underline'}>
            Support
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem>
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
                          defaultValue={usePathname()}
                          {...form.register('pathName')}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center"
                >
                  <LogOut size={16} />
                  <span className="ml-1">Sign out</span>
                </button>
              </form>
            </Form>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link
              href="/signin"
              className="inline-flex items-center leading-6 font-medium transition ease-in-out duration-75 cursor-pointer text-slate-200 rounded-md p-1"
            >
              Sign In
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
