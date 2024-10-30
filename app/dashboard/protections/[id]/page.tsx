import Loading from '@/components/modules/Loading'
import BrokerRemoval from '@/components/modules/Removal/BrokerRemoval'
import Title from '@/components/modules/Title'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getRemovals, getUser } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Protection({
  params
}: {
  params: { id: string }
}) {
  const supabase = createClient()
  const [user, removals] = await Promise.all([
    getUser(supabase),
    getRemovals(supabase)
  ])

  if (!user) {
    return redirect('/signin')
  }

  return (
    <>
      <section className="mb-16 bg-white">
        <Title
          title="Removal Status"
          subtitle="Review the updates on the progress of your privacy protection."
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
            <div className="py-8">
              <Loading />
            </div>
          </TabsContent>
          <TabsContent value="brokers">
            {Array.isArray(removals) && removals.length > 0 ? (
              <BrokerRemoval removals={removals!} />
            ) : (
              <div className="py-8">
                <Loading />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </>
  )
}
