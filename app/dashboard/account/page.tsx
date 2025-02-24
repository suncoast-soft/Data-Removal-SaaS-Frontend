import { createClient } from '@/utils/supabase/server'
import { getProfiles, getUser, getUserSettings, getLoginHistory } from '@/utils/supabase/queries'
import { Button } from '@/components/ui/button'
import { Accordion } from '@/components/ui/accordion'
import SignoutForm from '@/components/sections/Forms/SignoutForm'
import ProfileForm from '@/components/sections/Forms/ProfileForm'
import ProfileAccordion from '@/components/sections/Dashboard/ProfileAccordion'
import SectionHeader from '@/components/modules/SectionHeader'
import { User } from '@supabase/supabase-js'
import SettingsForm from '@/components/sections/Forms/SettingsForm'
import DeleteAccountForm from '@/components/sections/Forms/DeleteAccountForm'
import LoginHistory from '@/components/modules/LoginHistory/LoginHistory'

export default async function Account() {
  const supabase = await createClient()
  const user = await getUser(supabase)
  const profiles = (await getProfiles(supabase)) ?? []
  const settings = await getUserSettings(supabase)
  const loginHistory = await getLoginHistory(supabase) ?? []

  return (
    <div className="relative">
      <SectionHeader title="Account" />

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
        <div className="my-6">
          <ProfileForm user={user as User}>
            <Button
              variant="outline"
              size="small"
              type="button"
              className="border-primary hover:bg-primary"
            >
              Add Profile
            </Button>
          </ProfileForm>
        </div>
      )}

      <div className="mt-16 mb-20">
        <SectionHeader
          title="Account Settings"
          cta1={<SignoutForm />}
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
