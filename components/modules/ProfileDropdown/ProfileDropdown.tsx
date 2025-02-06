'use client'

import { Tables } from '@/types_db'
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'

type Profile = Tables<'profiles'>

interface ModuleProps {
  profiles: Profile[]
  selectedProfileId: string
}

export default function ProfileDropdown({
  profiles,
  selectedProfileId
}: ModuleProps) {
  const router = useRouter()

  const profile = profiles.find(
    (profile) => String(profile.id) === selectedProfileId
  )

  return (
    <div className="mb-5">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="w-full border rounded-xl px-4 py-2">
          <div className="flex flex-row justify-between items-center">
            <div>
              Profile:{' '}
              <strong>
                {profile?.first_name ?? 'Unknown'} {profile?.last_name ?? ''}
              </strong>
            </div>
            <ChevronDown />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] text-left">
          <DropdownMenuLabel>Select Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {profiles.map((profile) => (
            <DropdownMenuItem
              key={profile.id}
              onClick={() => {
                if (String(profile.id) !== selectedProfileId) {
                  router.push(`/dashboard?profile=${profile.id}`)
                }
              }}
            >
              {profile.first_name} {profile.last_name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
