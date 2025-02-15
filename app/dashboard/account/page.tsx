import { createClient } from '@/utils/supabase/server'
import { getProfiles, getUser, getUserSettings } from '@/utils/supabase/queries'
import { Button } from '@/components/ui/button'
import { Accordion } from '@/components/ui/accordion'
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

      <SettingsForm
        user={user as User}
        profile={profiles[0]}
        settings={settings}
      />
    </div>
  )
}
