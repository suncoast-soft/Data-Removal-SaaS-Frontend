import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { ChevronDown, Pencil } from 'lucide-react'
import React from 'react'
import ProfileForm from '../../../modules/Forms/ProfileForm'
import { Button } from '@/components/ui/button'
import { Tables } from '@/types_db'

type Profile = Tables<'profiles'>

export default function ProfileAccordion({ profile }: { profile: Profile }) {
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
            {profile.isPrimary ? (
              <span className="py-1 px-2 text-xs rounded-full bg-secondary ml-4 font-medium text-white">
                primary
              </span>
            ) : null}
          </h3>
          <h4 className="font-bold text-sm">View or edit profile </h4>
        </div>
        <div className="h-8 w-8 items-center flex justify-center  shrink-0 transition-transform duration-200 [&[data-state=open]>div]:rotate-45">
          <ChevronDown className="h-5 w-5" />
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-0  mt-2 text-base  leading-[22px] lg:text-[22px] lg:leading-[26px]">
        <hr className="my-4 border-white/20 border-[1.4px]" />
        <div className="flex lg:flex-wrap flex-col lg:flex-row gap-4 lg:gap-8">
          <h3 className="font-semibold text-base lg:text-lg text-white min-w-[45%] lg:max-w-[45%] border-b border-white/20 py-2.5">
            <span className="text-primary font-normal mr-2">First Name:</span>{' '}
            {profile.first_name}
          </h3>
          <h3 className="font-semibold text-base lg:text-lg text-white min-w-[45%] lg:max-w-[45%] border-b border-white/20 py-2.5">
            <span className="text-primary font-normal mr-2">Last Name:</span>{' '}
            {profile.last_name}
          </h3>
          <h3 className="font-semibold text-base lg:text-lg text-white min-w-[45%] lg:max-w-[45%] border-b border-white/20 py-2.5">
            <span className="text-primary font-normal mr-2">Gender:</span>
            {profile.gender || '---'}
          </h3>
          <h3 className="font-semibold text-base lg:text-lg text-white min-w-[45%] lg:max-w-[45%] border-b border-white/20 py-2.5">
            <span className="text-primary font-normal mr-2">Birthdate:</span>
            {profile.birth_date || '---'}
          </h3>
          <h3 className="font-semibold text-base lg:text-lg text-white min-w-[45%] lg:max-w-[45%] border-b border-white/20 py-2.5">
            <span className="text-primary font-normal mr-2">City:</span>
            {profile.city || '---'}
          </h3>
          <h3 className="font-semibold text-base lg:text-lg text-white min-w-[45%] lg:max-w-[45%] border-b border-white/20 py-2.5">
            <span className="text-primary font-normal mr-2">State:</span>
            {profile.state || '---'}
          </h3>
          <h3 className="font-semibold text-base lg:text-lg text-white min-w-[45%] lg:max-w-[45%] border-b border-white/20 py-2.5">
            <span className="text-primary font-normal mr-2">Phone Number:</span>
            {profile.phone || '---'}
          </h3>
          <h3 className="font-semibold text-base lg:text-lg text-white min-w-[45%] lg:max-w-[45%]">
            <span className="text-primary font-normal mr-2">Bio:</span>
            {profile.bio || '---'}
          </h3>
          <h3 className="font-semibold text-base lg:text-lg text-white min-w-[45%] lg:max-w-[45%]">
            <span className="text-primary font-normal mr-2">Address:</span>
            {profile.address || '---'}
          </h3>
        </div>
        <ProfileForm defaultValues={profile}>
          <Button
            variant="outline"
            type="submit"
            className="w-full lg:w-[282px] h-[56px] text-sm font-semibold text-white border-2 my-4 lg:my-0 border-secondary hover:bg-secondary/90 pl-0 items-center [&>svg]:text-secondary"
          >
            <Pencil className="mr-2 pl-2" /> Edit your profile to run a new scan
          </Button>
        </ProfileForm>
      </AccordionContent>
    </AccordionItem>
  )
}
