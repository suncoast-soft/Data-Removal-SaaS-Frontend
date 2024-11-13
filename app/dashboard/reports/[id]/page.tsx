import GoogleSearches from '@/components/modules/Analytics/GoogleSearches'
import BrokerSearches from '@/components/modules/Analytics/BrokerSearches'
import Loading from '@/components/modules/Loading'
import Title from '@/components/modules/Title'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { isRemovalActive } from '@/utils/helpers'
import {
  getSearches,
  getPricingPlans,
  getProfile
} from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import { Info } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function Report({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const [profile, searches, pricing] = await Promise.all([
    getProfile(supabase, params.id),
    getSearches(supabase, params.id),
    getPricingPlans(supabase, Number(params.id))
  ])

  const brokerSearches = searches?.filter(
    (search) => search.type === 'broker_site'
  )
  const googleSearches = searches?.filter(
    (search) => search.type === 'google'
  )[0]

  const removalActivated = pricing ? isRemovalActive(pricing) : false

  return (
    <section className="mb-16 bg-white">
      <Title
        title={`${profile.first_name} ${profile.last_name}`}
        subtitle={`${profile.gender}, ${profile.birth_date}, ${profile.city}, ${profile.state}`}
      />

      {removalActivated ? (
        <Alert className="max-w-3xl mx-auto mb-8">
          <Info className="h-4 w-4" />
          <AlertTitle>Your privacy is protected</AlertTitle>
          <AlertDescription>
            <div className="flex justify-between items-center">
              <p>We are committed to continually safeguarding your privacy.</p>
              <Button asChild>
                <Link
                  href={`/dashboard/removals/${profile.id}`}
                  className="no-underline"
                >
                  Check Improvements
                </Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ) : (
        <Alert variant="destructive" className="max-w-3xl mx-auto mb-8">
          <Info className="h-4 w-4" />
          <AlertTitle>Activate removal service for your profile</AlertTitle>
          <AlertDescription>
            <div className="flex justify-between items-center">
              <p className="">Your Privacy is not protected!</p>
              <Button asChild>
                <Link
                  href={`/dashboard/activate-removal/${profile.id}`}
                  className="no-underline"
                >
                  Activate Removal
                </Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="google" className="w-full max-w-3xl mx-auto">
        <TabsList className="h-16">
          {[
            { value: 'google', image: '/google.svg', name: 'Google' },
            { value: 'bing', image: '/bing.svg', name: 'Bing' },
            { value: 'yahoo', image: '/yahoo.svg', name: 'Yahoo' },
            {
              value: 'duckduckgo',
              image: '/duckduckgo.svg',
              name: 'DuckDuckGo'
            },
            { value: 'brokers', image: '/bing.svg', name: 'Brokers' }
          ].map((tablist, index) => (
            <TabsTrigger
              key={index}
              value={tablist.value}
              className="p-4 flex gap-2"
            >
              <Image
                src={tablist.image}
                width={14}
                height={14}
                alt={tablist.name}
              />
              <span>{tablist.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="google">
          {googleSearches?.search_result ? (
            <GoogleSearches results={googleSearches.results} />
          ) : (
            <div className="py-8">
              <Loading />
            </div>
          )}
        </TabsContent>
        <TabsContent value="brokers">
          {Array.isArray(brokerSearches) && brokerSearches.length > 0 ? (
            <BrokerSearches searches={brokerSearches!} />
          ) : (
            <div className="py-8">
              <Loading />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  )
}
