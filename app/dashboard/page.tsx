import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { cn } from '@/utils/cn'
import { getAgeFromBirth } from '@/utils/helpers'
import { getCredits, getUser, getUserDetails } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import { BadgeCheck, TriangleAlert } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const supabase = createClient()
  const [user, userDetails, credits] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase),
    getCredits(supabase)
  ])

  if (!user) {
    return redirect('/signin')
  }

  const profileComplete =
    userDetails &&
    userDetails.first_name &&
    userDetails.last_name &&
    userDetails.birth_date &&
    userDetails.gender &&
    userDetails.city &&
    userDetails.state

  return (
    <section className="mb-16 bg-white">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-primary sm:text-center sm:text-6xl">
            {profileComplete
              ? `Welcome, ${userDetails.first_name} ${userDetails.last_name}`
              : `Welcome, ${user.email}`}
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-primary sm:text-center sm:text-2xl">
            Effortlessly Protect Your Privacy
          </p>
        </div>
      </div>

      <div className="p-4 grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
        <Card
          className={cn(
            'bg-primary/5',
            profileComplete ? 'border-primary' : 'border-yellow-600'
          )}
        >
          <CardHeader className="relative">
            <CardTitle>Your Information</CardTitle>
            {profileComplete ? (
              <BadgeCheck className="absolute right-2 top-1 text-primary" />
            ) : (
              <TriangleAlert className="absolute right-2 top-1 text-yellow-600" />
            )}
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2">
              <p>
                Name:{' '}
                <span className="font-semibold text-primary">
                  {userDetails?.first_name ?? 'Unknown'}{' '}
                  {userDetails?.last_name ?? ''}
                </span>
              </p>

              <p>
                Gender:{' '}
                <span className="font-semibold text-primary">
                  {userDetails?.gender === 'male'
                    ? 'Male'
                    : userDetails?.gender === 'female'
                      ? 'Female'
                      : 'Unknown'}
                </span>
              </p>

              <p>
                Age:{' '}
                <span className="font-semibold text-primary">
                  {userDetails?.birth_date
                    ? getAgeFromBirth(userDetails.birth_date)
                    : 'Unknown'}
                </span>
              </p>

              <p>
                Location:{' '}
                <span className="font-semibold text-primary">
                  {userDetails?.city && userDetails?.state
                    ? `${userDetails.city}, ${userDetails.state}`
                    : 'Unknown'}
                </span>
              </p>
            </div>
          </CardContent>

          <CardFooter>
            <Button asChild>
              <Link href="/dashboard/settings" className="no-underline">
                Update Profile
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card
          className={cn(
            'bg-primary/5',
            credits?.credits > 0 ? 'border-primary' : 'border-yellow-600'
          )}
        >
          <CardHeader className="relative">
            <CardTitle>Available Credits</CardTitle>
            {credits?.credits > 0 ? (
              <BadgeCheck className="absolute right-2 top-1 text-primary" />
            ) : (
              <TriangleAlert className="absolute right-2 top-1 text-yellow-600" />
            )}
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Your current available credits are:{' '}
              <span className="text-red-700 font-semibold text-lg px-2">
                {credits?.credits ?? 0}
              </span>
            </p>
          </CardContent>

          <CardFooter>
            <Button asChild>
              <Link href="/dashboard/get-credits" className="no-underline">
                Buy Removal Credits
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
