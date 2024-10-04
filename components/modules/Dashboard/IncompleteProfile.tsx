import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Link from 'next/link'

export default function IncompleteProfile() {
  return (
    <div className="max-w-3xl mx-auto">
      <Card className={'bg-red-50 border-red-700'}>
        <CardHeader className="relative">
          <CardTitle>Complete your Profile</CardTitle>
          <CardDescription>
            Your profile is incomplete. Please complete your profile to start
            the free analytics.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button asChild>
            <Link href="/dashboard/settings" className="no-underline">
              Update Profile
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
