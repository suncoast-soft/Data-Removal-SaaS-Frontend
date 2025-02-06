'use client'

import SearchSummary from '@/components/sections/SearchReport/SearchSummary'
import SearchResults from '@/components/sections/SearchReport/SearchResults'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Tables } from '@/types_db'
import { createClient } from '@/utils/supabase/client'
import {
  getBroker,
  getBrokerSearches,
  getGoogleSearches
} from '@/utils/supabase/queries'

type Broker = Tables<'brokers'>
type GoogleSearch = Tables<'google_searches'>
type BrokerSearch = Tables<'broker_searches'> & {
  broker: Broker
}

export default function SearchReport({ profile }: { profile: string }) {
  const [scanning, setScanning] = useState(true)
  const [completions, setCompletions] = useState<Broker[]>([])
  const [loading, setLoading] = useState(true)
  const [googleSearches, setGoogleSearches] = useState<GoogleSearch[]>([])
  const [brokerSearches, setBrokerSearches] = useState<BrokerSearch[]>([])
  const supabase = createClient()
  const lastUpdateRef = useRef(Date.now())

  useEffect(() => {
    const fetchSearches = async () => {
      setLoading(true)

      const brokerSearches = (await getBrokerSearches(supabase, profile)) ?? []
      const googleSearches = (await getGoogleSearches(supabase, profile)) ?? []

      setBrokerSearches(brokerSearches as BrokerSearch[])
      setGoogleSearches(googleSearches as GoogleSearch[])

      const completedSearches = await Promise.all(
        brokerSearches
          .filter((s) => ['failed', 'completed'].includes(s.search_status))
          .map((s) => getBroker(supabase, s.broker_id))
      )
      setCompletions(completedSearches)

      await new Promise((resolve) => setTimeout(resolve, 10))
      setLoading(false)
    }

    fetchSearches()
  }, [supabase, profile])

  useEffect(() => {
    const channel = supabase
      .channel(`schema-db-changes-${profile}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'broker_searches'
        },
        async (payload) => {
          if (parseInt(profile) === parseInt(payload.new.profile_id)) {
            if (['failed', 'completed'].includes(payload.new.search_status)) {
              const broker = await getBroker(supabase, payload.new.broker_id)
              setCompletions((prev) => [...prev, broker])
            }
            lastUpdateRef.current = Date.now()
          }
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [supabase, profile])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (Date.now() - lastUpdateRef.current > 10000) {
        setScanning(false)
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (
      brokerSearches.length > 0 &&
      completions.length >= brokerSearches.length - 3
    ) {
      setScanning(false)
    }
  }, [completions, brokerSearches])

  useEffect(() => {
    const fetchSearches = async () => {
      const brokerSearches = (await getBrokerSearches(supabase, profile)) ?? []
      const googleSearches = (await getGoogleSearches(supabase, profile)) ?? []

      setBrokerSearches(brokerSearches as BrokerSearch[])
      setGoogleSearches(googleSearches as GoogleSearch[])
    }

    if (!scanning) {
      fetchSearches()
    }
  }, [supabase, profile, scanning])

  return (
    <div className="container max-w-6xl py-12">
      {!loading &&
        (scanning ? (
          <div className="bg-lp-hero-section-bg bg-cover bg-bottom p-8 mb-12">
            <div className="grid lg:grid-cols-2 items-center gap-4">
              <div className="overflow-hidden h-96 flex flex-col justify-end px-8">
                {[...completions].map((borker) => (
                  <p key={borker.id}>... Searching {borker.name} ...</p>
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
                  This will only take a few seconds
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
        ))}
    </div>
  )
}
