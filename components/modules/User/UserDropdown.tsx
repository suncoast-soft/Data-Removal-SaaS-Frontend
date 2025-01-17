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
import { Tables } from '@/types_db'

interface NavlinksProps {
  user?: {
    email: string
  }
  profile?: Tables<'profiles'>
}

const FormSchema = z.object({
  pathName: z.string()
})

export default function UserDropdown({ user, profile }: NavlinksProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = getRedirectMethod() === 'client' ? useRouter() : null
  const [isSubmitting, setIsSubmitting] = useState(false)

  const pathname = usePathname()

  const name =
    profile?.first_name && profile?.last_name
      ? `${profile.first_name} ${profile.last_name}`
      : user?.email || 'Guest'

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
    <DropdownMenu modal={false}>
      {/* Dropdown Trigger */}
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="default"
          className="rounded-full overflow-hidden"
          aria-label="User menu"
        >
          <Avatar>
            <AvatarFallback className="text-white bg-secondary">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/dashboard/settings/account" className="no-underline">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/dashboard/support" className="no-underline">
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
                          defaultValue={pathname || '/'}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center w-full text-slate-700 hover:text-slate-500"
                >
                  <LogOut size={16} />
                  <span className="ml-2">Sign out</span>
                </button>
              </form>
            </Form>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link
              href="/signin"
              className="text-slate-200 hover:text-slate-400 transition"
            >
              Sign In
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
