import Analytics from '@/components/modules/Analytics/AnalyticsList'
import GoogleReport from '@/components/modules/Google/Google'
import Title from '@/components/modules/Title'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  getProfiles,
  getBrokerSearches,
  getGoogleSearches
} from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'

export default async function Search() {
  const supabase = createClient()

  const [profiles, searches, google] = await Promise.all([
    getProfiles(supabase),
    getBrokerSearches(supabase),
    getGoogleSearches(supabase)
  ])

  console.log(google)

  return (
    <section className="mb-16 bg-white">
      <Title
        title="Search Reports"
        subtitle="View analytics reports about your personal information found on Google, Yahoo, DuckDuckGo, Microsoft Bing, and 17 data brokers."
      />

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
          <GoogleReport
            profiles={profiles ?? []}
            searches={google.result ?? []}
          />
        </TabsContent>
        <TabsContent value="brokers">
          <Analytics profiles={profiles ?? []} searches={searches ?? []} />
        </TabsContent>
      </Tabs>
    </section>
  )
}
