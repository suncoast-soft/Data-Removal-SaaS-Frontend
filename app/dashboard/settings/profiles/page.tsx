import { createClient } from '@/utils/supabase/server'
import { getProfiles } from '@/utils/supabase/queries'
import ProfileForm from '@/components/modules/Forms/ProfileForm'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Profiles() {
  const supabase = await createClient()
  const profiles = await getProfiles(supabase)

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <ProfileForm />

      <div className="pt-8 pb-4">
        {profiles?.map((profile, index) => (
          <Card key={index} className="mb-5">
            <CardContent>
              <div className="flex justify-between items-center pt-6">
                <h4 className="text-lg font-semibold">
                  {profile.first_name} {profile.last_name}
                </h4>
                <Button variant="outline" asChild>
                  <Link
                    href={`/dashboard/reports/${profile.id}`}
                    className="no-underline"
                  >
                    View Report
                  </Link>
                </Button>
              </div>
              <div>
                <p>
                  {profile.gender === 'male' ? 'Male' : 'Female'}
                  {', '}
                  {profile.birth_date}
                  {', '}
                  {profile.city}
                  {', '}
                  {profile.state}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
