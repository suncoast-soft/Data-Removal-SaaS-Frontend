import GoogleReport from '@/components/modules/Analytics/Google'
import Searches from '@/components/modules/Analytics/Searches'
import Title from '@/components/modules/Title'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  getBrokerSearches,
  getGoogle,
  getProfile
} from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'

export default async function Report({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const [profile, searches, google] = await Promise.all([
    getProfile(supabase, params.id),
    getBrokerSearches(supabase, params.id),
    getGoogle(supabase, params.id)
  ])

  return (
    <section className="mb-16 bg-white">
      <Title
        title={`${profile.first_name} ${profile.last_name}`}
        subtitle={`${profile.gender}, ${profile.birth_date}, ${profile.city}, ${profile.state}`}
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
          <GoogleReport results={google.results} />
        </TabsContent>
        <TabsContent value="brokers">
          <Searches searches={searches ?? []} />
        </TabsContent>
      </Tabs>
    </section>
  )
}
