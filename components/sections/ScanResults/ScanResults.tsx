'use client'

import { Button } from '@/components/ui/button'
import UpgradeSection from '@/components/sections/Dashboard/UpgradeSection'
import HowToProtectSection from '@/components/sections/Dashboard/HowToProtectSection'
import ArticlesSection from '@/components/sections/Dashboard/ArticlesSection'
import HelpBanner from '@/components/sections/Dashboard/HelpBanner'
import PrivateFAQs from '@/components/sections/PrivateFAQs'
import SearchSummary from '@/components/sections/SearchReport/SearchSummary'
import SearchResults from '@/components/sections/SearchReport/SearchResults'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Tables } from '@/types_db'
import { createClient } from '@/utils/supabase/client'
import {
  getBroker,
  getBrokerSearches,
  getGoogleSearches
} from '@/utils/supabase/queries'
import { redirect } from 'next/navigation'

type GoogleSearch = Tables<'google_searches'>
type BrokerSearch = Tables<'broker_searches'> & {
  broker: Tables<'brokers'>
}

export default function ScanResults({
  profile,
  is_new
}: {
  profile: string
  is_new: string
}) {
  const [scanning, setScanning] = useState(true)
  const [completions, setCompletions] = useState<any[]>([])

  const [loading, setLoading] = useState(false)
  const [googleSearches, setGoogleSearches] = useState<GoogleSearch[]>([])
  const [brokerSearches, setBrokerSearches] = useState<BrokerSearch[]>([])

  const supabase = createClient()

  useEffect(() => {
    if (is_new) {
      setScanning(true)

      const channel = supabase
        .channel(`schema-db-changes=${profile}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public'
          },
          async (payload) => {
            if (parseInt(profile) === parseInt(payload.new.profile_id)) {
              if (
                payload.new.search_status === 'failed' ||
                payload.new.search_status === 'completed'
              ) {
                const broker = await getBroker(supabase, payload.new.broker_id)
                if (broker) {
                  setCompletions((brokers) => [...brokers, broker])
                }
              }
            }
          }
        )
        .subscribe()

      return () => {
        channel.unsubscribe()
      }
    } else {
      setScanning(false)
    }
  }, [supabase, profile, is_new])

  useEffect(() => {
    if (completions.length > 25) {
      setScanning(false)
    }
  }, [completions])

  useEffect(() => {
    if (is_new) {
      const timeoutId = setTimeout(() => {
        setCompletions((prevCompletions) => {
          if (prevCompletions.length === 0) {
            const channel = supabase.channel('schema-db-changes')
            channel.unsubscribe()
            redirect(`/scan/result?profile=${profile}`)
          }
          return prevCompletions
        })
      }, 10000)

      return () => clearTimeout(timeoutId)
    }
  }, [supabase, completions, profile, is_new])

  useEffect(() => {
    async function fetch() {
      setLoading(true)

      const brokerSearches = await getBrokerSearches(supabase, profile)
      setBrokerSearches(brokerSearches as BrokerSearch[])

      const googleSearches = await getGoogleSearches(supabase, profile)
      setGoogleSearches(googleSearches as GoogleSearch[])

      setLoading(false)
    }

    if (!scanning) {
      fetch()
    }
  }, [supabase, profile, scanning])

  return (
    <>
      <div className="container max-w-6xl py-12">
        {scanning || loading ? (
          <div className="bg-lp-hero-section-bg bg-cover bg-bottom p-8 mb-12">
            <div className="grid lg:grid-cols-2 items-center gap-4">
              <div className="overflow-hidden h-96 flex flex-col justify-end px-8">
                {completions.map((completion) => (
                  <p key={completion.id}>... Searching {completion.name} ...</p>
                ))}
              </div>

              <div className="text-center">
                <Image
                  src="/loaders/hero-image.png"
                  width={309}
                  height={358}
                  alt="Report Loader"
                  className="w-40 mx-auto mb-8"
                />
                <h1 className="text-2xl lg:text-4xl font-bold">
                  Generating your report
                </h1>
                <p className="mt-4 text-lg lg:text-xl text-dark/60">
                  This will only take a few second
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <SearchSummary
              googleSearches={googleSearches as any[]}
              brokerSearches={brokerSearches}
            />

            <SearchResults
              googleSearches={googleSearches as any[]}
              brokerSearches={brokerSearches}
            />
          </>
        )}

        <HelpBanner />

        <UpgradeSection />

        <PrivateFAQs />

        <HowToProtectSection />

        <ArticlesSection />

        <div className="text-center my-12">
          <Button variant="secondary" asChild>
            <Link href="/signin/signup" className="no-underline">
              Register and protect yourself today
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
