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

interface NavlinksProps {
  user?: any
  userDetails?: any
}

export default function UserDropdown({ user, userDetails }: NavlinksProps) {
  const router = getRedirectMethod() === 'client' ? useRouter() : null

  const name =
    userDetails.firstName && userDetails.lastName
      ? `${userDetails.firstName} ${userDetails.lastName}`
      : user.email

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
          <Link href="/dashboard/support" className={'no-underline'}>
            Support
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem>
            <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
              <Input type="hidden" name="pathName" value={usePathname()} />
              <button
                type="submit"
                className="inline-flex items-center leading-6 font-medium transition ease-in-out duration-75 cursor-pointer text-slate-900 rounded-md p-1"
              >
                <LogOut size={16} />
                <span className="ml-1">Sign out</span>
              </button>
            </form>
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
