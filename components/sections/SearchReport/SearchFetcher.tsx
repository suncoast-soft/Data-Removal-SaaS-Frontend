'use client'

import { useEffect, useState } from 'react'
import {
  getBrokerSearches,
  getGoogleSearches,
  getProfiles
} from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/client' // Ensure this is a client import
import SearchReport from '@/components/sections/SearchReport'
import RemovalReport from '@/components/sections/RemovalReport'
import { Tables } from '@/types_db'

type Profile = Tables<'profiles'>
type GoogleSearch = Tables<'google_searches'>
type BrokerSearch = Tables<'broker_searches'> & { broker: Tables<'brokers'> }

export default function SearchFetcher({ isPaidUser }: { isPaidUser: boolean }) {
  const [searches, setSearches] = useState<
    {
      profile: Profile
      googleSearches: GoogleSearch[]
      brokerSearches: BrokerSearch[]
    }[]
  >([])

  async function fetchSearches() {
    const supabase = createClient()

    const profiles = await getProfiles(supabase)

    if (!profiles || profiles.length === 0) return

    const newSearches = await Promise.all(
      profiles.map(async (profile) => ({
        profile: profile as Profile,
        googleSearches: (await getGoogleSearches(
          supabase,
          profile.id
        )) as GoogleSearch[],
        brokerSearches: (await getBrokerSearches(
          supabase,
          profile.id
        )) as BrokerSearch[]
      }))
    )

    setSearches(newSearches)
  }

  useEffect(() => {
    fetchSearches()

    const interval = setInterval(() => {
      fetchSearches()
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  if (searches.length === 0) {
    return <></>
  }

  return isPaidUser ? (
    <RemovalReport searches={searches} />
  ) : (
    <SearchReport searches={searches} />
  )
}
