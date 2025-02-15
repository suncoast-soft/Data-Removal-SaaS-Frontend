import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { ChevronDown, Pencil } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Tables } from '@/types_db'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import ProfileForm from '../Forms/ProfileForm'
import SSNDisplay, { assembleAddress, displayDate } from '@/utils/helpers'
import { cn } from '@/utils/cn'

type Profile = Tables<'profiles'>

export default function ProfileAccordion({
  user,
  profile
}: {
  user: User
  profile: Profile
}) {
  return (
    <AccordionItem
      value={String(profile.id)}
      className="p-4 rounded-[14px] border-[1.4px] border-dark/90 mb-4 [&[data-state='open']]:bg-dark [&[data-state='open']]:text-white [&[data-state='closed']]:text-dark shrink-0 transition duration-200"
    >
      <AccordionTrigger className="w-full text-left p-0 no-underline hover:no-underline [&[data-state='closed']]:text-dark [&[data-state='open']]:text-white [&>.default-trigger-icon]:hidden">
        <div className="flex-1 flex justify-between items-center">
          <h3 className="font-normal text-base lg:text-lg">
            Profile:{' '}
            <span className="font-bold ml-2">
              {profile.first_name} {profile.last_name}
            </span>
            {profile.is_primary && (
              <span className="py-1 px-2 text-xs rounded-full bg-secondary ml-4 font-medium text-white">
                primary
              </span>
            )}
          </h3>

          <h4 className="font-bold text-sm">View or edit profile</h4>
        </div>

        <div className="h-8 w-8 items-center flex justify-center shrink-0 transition-transform duration-200 [&[data-state=open]>div]:rotate-45">
          <ChevronDown className="h-5 w-5" />
        </div>
      </AccordionTrigger>

      <AccordionContent className="py-4 mt-4 border-t border-white/20">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="">
            <p className="font-semibold text-lg lg:text-xl text-white mb-2">
              <span>Primary Account Holder:</span>
              <span className="text-xl lg:text-2xl ml-2">
                {user?.identities?.[0]?.identity_data?.full_name}
              </span>
            </p>

            <p className="text-sm font-light text-white">
              <span>Profile created:</span>
              <span className="ml-2">{displayDate(user.created_at)}</span>
            </p>
          </div>

          <ProfileForm user={user} profile={profile}>
            <Button
              variant="outline"
              type="submit"
              size="small"
              className="border-secondary text-white"
            >
              <Pencil className="mr-2 pl-2" />
              <span>Edit your profile</span>
            </Button>
          </ProfileForm>
        </div>

        <div className="grid lg:grid-cols-2 lg:w-11/12 gap-x-8 gap-y-5">
          {[
            {
              label: 'Name',
              value: `${profile.first_name} ${profile.last_name}`
            },
            {
              label: 'Social Security Number',
              value: SSNDisplay(profile.ssn) ?? ''
            },
            {
              label: 'Alternative Names',
              value: profile.alternative_names ?? ''
            },
            {
              label: 'Phone Number',
              value: profile.phone ?? ''
            },
            {
              label: 'Birthdate',
              value: displayDate(profile.birth_date)
            },
            {
              label: 'Email',
              value: profile.email ?? ''
            },
            {
              label: 'Sex',
              value: profile.gender ?? ''
            },
            {
              label: 'Address',
              value: assembleAddress(profile)
            }
          ].map(({ label, value }, index) => (
            <p key={index} className="border-b border-white/20 py-2">
              <span className="text-primary text-lg">{label}: </span>
              <span
                className={cn(
                  'text-white text-xl font-semibold',
                  label === 'Sex' && 'capitalize'
                )}
              >
                {value}
              </span>
            </p>
          ))}
        </div>

        <div className="relative float-end mt-2">
          <div className="p-2.5 bg-white/20 lg:max-w-[282px] rounded-[10px] h-fit">
            <p className="text-sm font-normal text-white">
              Note: Profile edits are only available 3 times per day Why?
            </p>

            <Link
              href={'?why-profile-edit=true'}
              className="text-sm font-bold transition ease-in-out duration-75 cursor-pointer text-secondary hover:text-secondary/90 border-b border-secondary"
            >
              Why
            </Link>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
