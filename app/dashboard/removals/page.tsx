import Title from '@/components/modules/Title'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Tables } from '@/types_db'
import { cn } from '@/utils/cn'
import { getAgeFromBirth, isRemovalActive } from '@/utils/helpers'
import { getPricingPlan, getProfiles, getUser } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import { BadgeCheck, TriangleAlert } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

type Profile = Tables<'profiles'>

export default async function Dashboard() {
  const supabase = await createClient()
  const [user, profiles] = await Promise.all([
    getUser(supabase),
    getProfiles(supabase)
  ])

  if (!user) {
    return redirect('/signin')
  }

  if (profiles?.length === 0) {
    return redirect('/dashboard/account')
  }

  const ProfileCard = async ({ profile }: { profile: Profile }) => {
    const pricing = await getPricingPlan(supabase)
    const removalActivated = pricing && isRemovalActive(pricing)

    return (
      <Card
        className={cn(
          '',
          removalActivated
            ? 'bg-primary/5 border-primary'
            : 'bg-yellow-100/10 border-yellow-500'
        )}
      >
        <CardHeader className="relative">
          <CardTitle>
            {profile.first_name} {profile.last_name}
          </CardTitle>
          {removalActivated ? (
            <BadgeCheck className="absolute right-2 top-1 text-primary" />
          ) : (
            <TriangleAlert className="absolute right-2 top-1 text-yellow-600" />
          )}
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-3 gap-16">
            <div>
              <Table className="w-56">
                <TableBody>
                  {[
                    { label: 'First Name', value: profile?.first_name },
                    { label: 'Last Name', value: profile?.last_name },
                    { label: 'Gender', value: profile?.gender },
                    {
                      label: 'Age',
                      value: getAgeFromBirth(profile.birth_date!)
                    },
                    { label: 'City', value: profile?.city },
                    { label: 'State', value: profile?.state }
                  ].map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="px-1 py-2 w-24">
                        {row.label}:
                      </TableCell>
                      <TableCell className="px-1 py-2 font-semibold text-primary capitalize">
                        {row.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="">
              <h4 className="font-semibold text-lg">Found on:</h4>
              <div className="flex gap-4 mb-5">
                {[
                  { src: '/google.svg', alt: 'Google' },
                  { src: '/bing.svg', alt: 'Bing' },
                  { src: '/yahoo.svg', alt: 'Yahoo' },
                  { src: '/duckduckgo.svg', alt: 'DuckDuckGo' }
                ].map((image, index) => (
                  <span key={index}>
                    <Image
                      src={image.src}
                      width={24}
                      height={24}
                      alt={image.alt}
                      className="h-12 text-white"
                    />
                  </span>
                ))}
              </div>

              <h4 className="font-semibold text-lg">Searched By:</h4>
              <div className="mb-5">17 Data brokers</div>
              <Button asChild>
                <Link
                  href={`/dashboard/reports/${profile.id}`}
                  className="no-underline"
                >
                  View Search Reports
                </Link>
              </Button>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">Removal Service</h4>
              {removalActivated ? (
                <p className="font-semibold text-primary mb-5">
                  Your Privacy is protected!
                </p>
              ) : (
                <>
                  <p className="font-semibold text-red-600 mb-5">
                    Your Privacy is not protected!
                  </p>
                  <Button asChild>
                    <Link
                      href={`/dashboard/activate-removal/${profile.id}`}
                      className="no-underline"
                    >
                      Activate Removal
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <div className="flex"></div>
        </CardFooter>
      </Card>
    )
  }

  return (
    <section className="mb-16 bg-white">
      <Title
        title="Privacy Removal Services"
        subtitle="Protect your privacy by activating the privacy removal service in a few steps."
      />

      <div className="p-4 grid gap-16 max-w-5xl mx-auto">
        {profiles?.map((profile, index) => (
          <ProfileCard key={index} profile={profile} />
        ))}
      </div>
    </section>
  )
}
