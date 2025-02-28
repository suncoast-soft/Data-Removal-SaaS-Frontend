'use client'

import SearchSummary from '@/components/sections/SearchReport/SearchSummary'
import SearchResults from '@/components/sections/SearchReport/SearchResults'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Tables } from '@/types_db'
import { createClient } from '@/utils/supabase/client'
import { getBroker, getBrokerSearches } from '@/utils/supabase/queries'

type Broker = Tables<'brokers'>
type BrokerSearch = Tables<'broker_searches'> & {
  broker: Broker
}

interface SectionProps {
  profileId: string
  brokerSearches: BrokerSearch[]
  completedSearches: Broker[]
  hasAccount?: boolean
  isPremium?: boolean
}

export default function SearchReport({
  profileId,
  brokerSearches: initialBrokerSearches,
  completedSearches,
  hasAccount = false,
  isPremium = false
}: SectionProps) {
  const [brokerSearches, setBrokerSearches] = useState<BrokerSearch[]>(
    initialBrokerSearches
  )
  const [completions, setCompletions] = useState<Broker[]>(completedSearches)

  const scanCompleted =
    initialBrokerSearches.length > 0 &&
    completedSearches.length >= initialBrokerSearches.length - 3
  const [scanning, setScanning] = useState(!scanCompleted)

  const supabase = createClient()
  const lastUpdateRef = useRef(Date.now())

  useEffect(() => {
    const channel = supabase
      .channel(`schema-db-changes-${profileId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'broker_searches'
        },
        async (payload) => {
          if (parseInt(profileId) === parseInt(payload.new.profile_id)) {
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
  }, [supabase, profileId])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (Date.now() - lastUpdateRef.current > 15000) {
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
      const brokerSearches =
        (await getBrokerSearches(supabase, profileId)) ?? []
      setBrokerSearches(brokerSearches as BrokerSearch[])
    }

    if (!scanning) {
      fetchSearches()
    }
  }, [supabase, profileId, scanning])

  return (
    <div className="container max-w-6xl py-12">
      {scanning ? (
        <div className="bg-lp-hero-section-bg bg-cover bg-bottom p-8 mb-12">
          <div className="grid lg:grid-cols-2 items-center gap-4">
            <div className="overflow-hidden h-96 flex flex-col justify-end px-8">
              {[...completions].map((borker) => (
                <p key={borker.id}>
                  Scanning
                  <span className="text-secondary font-semibold ml-1.5">
                    {borker.name}...
                  </span>
                </p>
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
            brokerSearches={brokerSearches}
            hasAccount={hasAccount}
            isPremium={isPremium}
          />
          <SearchResults
            brokerSearches={brokerSearches}
            hasAccount={hasAccount}
            isPremium={isPremium}
          />
        </>
      )}
    </div>
  )
}
