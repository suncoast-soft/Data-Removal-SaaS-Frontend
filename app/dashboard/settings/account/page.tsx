import { createClient } from '@/utils/supabase/server'
import {
  getPrimaryProfile,
  getProfiles,
  getSettings,
  getUser
} from '@/utils/supabase/queries'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import Link from 'next/link'
import { Accordion } from '@/components/ui/accordion'
import { cn } from '@/utils/cn'
import AccountSettings from '@/components/modules/Dashboard/AccountSettings/AccountSettings'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { formatDate } from 'date-fns'
import ProfileForm from '@/components/modules/AccountForms/ProfileForm'
import DeleteAccountModel from '@/components/modules/DeleteAccountModel/DeleteAccountModel'
import ProfileAccordion from '@/components/modules/Dashboard/ProfileAccordion/ProfileAccordion'
import { Tables } from '@/types_db'

type Setting = Tables<'settings'>

const SectionHeader = ({
  title,
  addProfile,
  deleteAccount,
  settings
}: {
  title: string
  addProfile?: boolean
  deleteAccount?: boolean
  settings?: Setting
}) => {
  return (
    <div className="flex gap-6 flex-col lg:flex-row lg:justify-between mb-6">
      <h1 className="text-[34px] leading-3 lg:text-[50px] lg:leading-[55px] font-bold text-darkMain">
        {title}
      </h1>
      {addProfile ? (
        <ProfileForm>
          <Button
            variant="outline"
            type="button"
            className={cn(
              'w-full lg:w-[178px] h-11 text-sm font-bold text-darkMain border-[1.4px]'
            )}
          >
            Add another profile
          </Button>
        </ProfileForm>
      ) : deleteAccount ? (
        <DeleteAccountModel settings={settings}>
          <Button
            variant="outline"
            type="button"
            className={cn(
              'w-full lg:w-[178px] h-11 text-sm font-bold text-darkMain border-[1.4px]',
              'border-orangeMain hover:bg-orangeMain/90'
            )}
          >
            Delete My Account
          </Button>
        </DeleteAccountModel>
      ) : null}
    </div>
  )
}

export default async function Account() {
  const supabase = createClient()
  const user = await getUser(supabase)
  const profiles = await getProfiles(supabase)
  const settings = await getSettings(supabase)
  const primaryProfile = await getPrimaryProfile(supabase)
  return (
    <div>
      <SectionHeader title="Account" addProfile />
      <div className="bg-darkMain rounded-[20px] p-4 lg:p-8">
        <div className="flex justify-between flex-wrap items-center mb-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-xl lg:text-2xl text-white">
              Primary Account Holder: Joe Smith
            </h3>
            <p className="font-normal text-base leading-[22px] text-white">
              Profile created: 11/12/24
            </p>
          </div>
          <ProfileForm defaultValues={null}>
            <Button
              variant="outline"
              type="submit"
              className="w-full lg:w-[282px] h-[56px] text-sm font-semibold text-white border-2 my-4 lg:my-0 border-orangeMain hover:bg-orangeMain/90 pl-0 items-center [&>svg]:text-orangeMain"
            >
              <Pencil className="mr-2 pl-2" /> Edit your profile to run a new
              scan
            </Button>
          </ProfileForm>
        </div>
        <div className="flex lg:flex-wrap flex-col lg:flex-row gap-4 lg:gap-8">
          <h3 className="font-semibold text-xl lg:text-2xl text-white min-w-[45%] lg:max-w-[45%] border-b border-white/20 py-2.5">
            <span className="text-greenMain font-normal mr-2">Name:</span>{' '}
            {`${primaryProfile?.first_name} ${primaryProfile?.last_name}`}
          </h3>
          <h3 className="font-semibold text-xl lg:text-2xl text-white min-w-[45%] lg:max-w-[45%] border-b border-white/20 py-2.5">
            <span className="text-greenMain font-normal mr-2">
              Social Security Number:
            </span>
            {primaryProfile?.social_security_number}
          </h3>
          <h3 className="font-semibold text-xl lg:text-2xl text-white min-w-[45%] lg:max-w-[45%] border-b border-white/20 py-2.5">
            <span className="text-greenMain font-normal mr-2">
              Alternative Names:
            </span>
            {primaryProfile?.alternative_names}
          </h3>
          <h3 className="font-semibold text-xl lg:text-2xl text-white min-w-[45%] lg:max-w-[45%] border-b border-white/20 py-2.5">
            <span className="text-greenMain font-normal mr-2">
              Phone Number:
            </span>
            {primaryProfile?.phone}
          </h3>
          <h3 className="font-semibold text-xl lg:text-2xl text-white min-w-[45%] lg:max-w-[45%] border-b border-white/20 py-2.5">
            <span className="text-greenMain font-normal mr-2">Birthdate:</span>

            {primaryProfile?.birth_date}
          </h3>
          <h3 className="font-semibold text-xl lg:text-2xl text-white min-w-[45%] lg:max-w-[45%] border-b border-white/20 py-2.5">
            <span className="text-greenMain font-normal mr-2">Email:</span>

            {primaryProfile?.email}
          </h3>
          <h3 className="font-semibold text-xl lg:text-2xl text-white min-w-[45%] lg:max-w-[45%]">
            <span className="text-greenMain font-normal mr-2">Gender:</span>
            {primaryProfile?.gender}
          </h3>
          <div className="flex flex-1 flex-wrap lg:flex-nowrap gap-[34px] lg:gap-[23px]">
            <h3 className="font-semibold text-xl lg:text-2xl text-white min-w-[45%] lg:max-w-[45%]">
              <span className="text-greenMain font-normal mr-2">Address:</span>

              {primaryProfile?.address}
            </h3>
            <div className="p-2.5 bg-white/20 lg:max-w-[282px] rounded-[10px] h-fit">
              <p className="text-sm font-normal text-white">
                Note: Profile edits are only available 3 times per day Why?
              </p>

              <Link
                href={'?why-profile-edit=true'}
                className="text-sm font-bold transition ease-in-out duration-75 cursor-pointer text-orangeMain hover:text-orangeMain/90 border-b border-orangeMain"
              >
                Why
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="my-6 flex flex-col gap-4">
        <Accordion type="single" collapsible className="w-full">
          {profiles?.map((profile) => (
            <ProfileAccordion key={profile.id} profile={profile} />
          ))}
        </Accordion>
      </div>
      <div className="mt-[60px]">
        <SectionHeader
          title="Account Settings"
          deleteAccount
          settings={settings}
        />
        <div className="mt-6 mb-[60px] rounded-2xl p-6 lg:p-8 border border-darkMain/20 bg-[#342E3705]">
          <AccountSettings user={user} settings={settings} />
        </div>
      </div>
      <div className="mt-[60px]">
        <SectionHeader title="Log In History" />
        <div className="mt-6 mb-[60px] rounded-2xl border border-darkMain/20 bg-[#342E3705]">
          <Table className="">
            <TableHeader>
              <TableRow className="bg-darkMain hover:bg-transparent h-[60px]">
                <TableHead className="bg-darkMain hover:bg-darkMain h-[60px] font-bold text-sm lg:text-lg text-white rounded-tl-2xl">
                  Date
                </TableHead>
                <TableHead className="bg-darkMain hover:bg-darkMain h-[60px] font-bold text-sm lg:text-lg text-white">
                  Time
                </TableHead>
                <TableHead className="bg-darkMain hover:bg-darkMain h-[60px] font-bold text-sm lg:text-lg text-white">
                  Device
                </TableHead>
                <TableHead className="bg-darkMain hover:bg-darkMain h-[60px] font-bold text-sm lg:text-lg text-white rounded-tr-2xl">
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
      {/* <EmailForm userEmail={user?.email} /> */}
    </div>
  )
}
