import { createClient } from '@/utils/supabase/server'
import { getProfiles, getUser, getUserSettings } from '@/utils/supabase/queries'
import { Button } from '@/components/ui/button'
import { Accordion } from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { formatDate } from 'date-fns'
import SignoutForm from '@/components/sections/Forms/SignoutForm'
import ProfileForm from '@/components/sections/Forms/ProfileForm'
import ProfileAccordion from '@/components/sections/Dashboard/ProfileAccordion'
import SectionHeader from '@/components/modules/SectionHeader'
import { User } from '@supabase/supabase-js'
import SettingsForm from '@/components/sections/Forms/SettingsForm'
import DeleteAccountForm from '@/components/sections/Forms/DeleteAccountForm'

export default async function Account() {
  const supabase = await createClient()
  const user = await getUser(supabase)
  const profiles = (await getProfiles(supabase)) ?? []
  const settings = await getUserSettings(supabase)

  return (
    <div className="relative">
      <SectionHeader
        title="Account"
        cta1={
          <ProfileForm user={user as User}>
            <Button
              variant="outline"
              size="small"
              type="button"
              className="border-primary hover:bg-primary"
            >
              Add a new profile
            </Button>
          </ProfileForm>
        }
      />

      {profiles.length > 0 ? (
        <div className="my-6 space-y-4">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue={String(profiles[0].id)}
          >
            {profiles?.map((profile) => (
              <ProfileAccordion
                key={profile.id}
                user={user as User}
                profile={profile}
              />
            ))}
          </Accordion>
        </div>
      ) : (
        <p className="text-secondary">
          You don&apos;t have any profiles yet. Add a new profile to start scan
        </p>
      )}

      <SectionHeader
        title="Account Settings"
        cta1={<SignoutForm />}
        cta2={<DeleteAccountForm settings={settings} />}
      />

      <SettingsForm settings={settings} />

      <SectionHeader title="Log In History" />

      <div className="mt-6 mb-[60px] rounded-2xl border border-dark/20 bg-[#342E3705]">
        <Table className="">
          <TableHeader>
            <TableRow className="bg-dark hover:bg-transparent h-[60px]">
              <TableHead className="bg-dark hover:bg-dark h-[60px] font-bold text-sm lg:text-lg text-white rounded-tl-2xl">
                Date
              </TableHead>
              <TableHead className="bg-dark hover:bg-dark h-[60px] font-bold text-sm lg:text-lg text-white">
                Time
              </TableHead>
              <TableHead className="bg-dark hover:bg-dark h-[60px] font-bold text-sm lg:text-lg text-white">
                Device
              </TableHead>
              <TableHead className="bg-dark hover:bg-dark h-[60px] font-bold text-sm lg:text-lg text-white rounded-tr-2xl">
                Location
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                {formatDate(Date.now(), 'MM/dd/yyy')}
              </TableCell>
              <TableCell className="font-medium">
                {formatDate(Date.now(), 'HH:MM:SS')}
              </TableCell>
              <TableCell className="font-medium ">Test Device</TableCell>
              <TableCell className="font-medium ">GB, Test</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
