import { Dispatch, SetStateAction } from 'react'
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

type Profile = Tables<'profiles'>
type Search = Tables<'searches'>

interface SearchItem {
  profile: Profile
  searches: Search[]
}

interface ModuleProps {
  searches: SearchItem[]
  selectedSearch: SearchItem
  setSelectedSearch: Dispatch<SetStateAction<SearchItem>>
}

export default function ProfileDropdown({
  searches,
  selectedSearch,
  setSelectedSearch
}: ModuleProps) {
  const { profile } = selectedSearch

  return (
    <div className="p-1">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="w-full border rounded-xl px-4 py-2">
          <div className="flex flex-row justify-between items-center">
            <div>
              Profile:{' '}
              <strong>
                {profile.first_name} {profile.last_name}
              </strong>
            </div>
            <ChevronDown />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] text-left">
          <DropdownMenuLabel>Select Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {searches.map((search, index) => (
            <DropdownMenuItem
              key={index}
              onClick={
                search !== selectedSearch
                  ? () => setSelectedSearch(search)
                  : undefined
              }
            >
              {search.profile.first_name} {search.profile.last_name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
