import { createClient } from '@/utils/supabase/server'
import {
  getProfiles,
  getUser,
  getUserSettings,
  getLoginHistory
} from '@/utils/supabase/queries'
import { Button } from '@/components/ui/button'
import ProfileForm from '@/components/sections/Forms/ProfileForm'
import SectionHeader from '@/components/modules/SectionHeader'
import { User } from '@supabase/supabase-js'
import SettingsForm from '@/components/sections/Forms/SettingsForm'
import DeleteAccountForm from '@/components/sections/Forms/DeleteAccountForm'
import LoginHistory from '@/components/modules/LoginHistory/LoginHistory'
import Link from 'next/link'
import { displayDate } from '@/utils/helpers'
import { ArrowBigRightIcon, PencilIcon } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Tables } from '@/types_db'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

type Profile = Tables<'profiles'>

export default async function Account() {
  const supabase = await createClient()
  const user = (await getUser(supabase)) as User

  const profiles = (await getProfiles(supabase)) ?? []
  const profile = profiles[0] as Profile

  const settings = await getUserSettings(supabase)
  const loginHistory = (await getLoginHistory(supabase)) ?? []

  return (
    <div className="relative">
      <SectionHeader title="Your Profile" />

      {profile ? (
        <div className="bg-dark p-8 rounded-xl">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-4">
            <p className="lg:flex-shrink-0 text-sm font-light text-white">
              <span>Profile created:</span>
              <span className="ml-2">{displayDate(user.created_at)}</span>
            </p>

            <div className="w-full flex lg:justify-end text-sm font-light text-white">
              <p className="max-w-64">
                The more information you include, the more accurate the search
                results will be.
              </p>
            </div>

            <ProfileForm user={user} profile={profile} className="w-fit">
              <Button
                variant="outline"
                type="submit"
                size="small"
                className="border-secondary text-white"
              >
                <PencilIcon className="mr-2 pl-2" />
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
                value: profile.address ?? ''
              },
              {
                label: 'City',
                value: profile.city ?? ''
              },
              {
                label: 'State',
                value: profile.state ?? ''
              },
              {
                label: 'Zip Code',
                value: profile.zip ?? ''
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
        </div>
      ) : (
        <div className="my-6">
          <ProfileForm user={user as User}>
            <div className="flex gap-4">
              <Alert variant="destructive">
                <AlertTitle>
                  <div className="flex justify-between items-center w-full">
                    <strong>Profile</strong>
                    <ArrowBigRightIcon size={24} />
                  </div>
                </AlertTitle>

                <AlertDescription>
                  Add a profile to begin your first data broker scan
                </AlertDescription>
              </Alert>

              <Button
                variant="outline"
                size="small"
                type="button"
                className="border-primary hover:bg-primary"
              >
                Add Profile
              </Button>
            </div>
          </ProfileForm>
        </div>
      )}

      <div className="mt-16 mb-20">
        <SectionHeader
          title="Account Settings"
          cta1={
            <Button variant="outline" type="button" size="small" asChild>
              <Link href="/dashboard/account/update-password">
                Change Password
              </Link>
            </Button>
          }
          cta2={<DeleteAccountForm settings={settings} />}
        />

        <SettingsForm
          user={user as User}
          profile={profiles[0]}
          settings={settings}
        />
      </div>

      <LoginHistory loginHistory={loginHistory} />
    </div>
  )
}
