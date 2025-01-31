'use client'

import { Tables } from '@/types_db'
import { useState } from 'react'
import RemovalSummary from './RemovalSummary'
import RemovalResults from './RemovalResults'
import ProfileDropdown from '@/components/modules/ProfileDropdown'

type Profile = Tables<'profiles'>
type GoogleSearch = Tables<'google_searches'>
type BrokerSearch = Tables<'broker_searches'> & {
  broker: Tables<'brokers'>
}

interface SectionProps {
  searches: {
    profile: Profile
    googleSearches: GoogleSearch[]
    brokerSearches: BrokerSearch[]
  }[]
}

export default function RemovalReport({ searches }: SectionProps) {
  const [selectedSearch, setSelectedSearch] = useState(searches[0])

  return (
    <>
      <ProfileDropdown
        searches={searches}
        selectedSearch={selectedSearch}
        setSelectedSearch={setSelectedSearch}
      />

      <RemovalSummary
        googleSearches={selectedSearch.googleSearches}
        brokerSearches={selectedSearch.brokerSearches}
      />

      <RemovalResults
        googleSearches={selectedSearch.googleSearches}
        brokerSearches={selectedSearch.brokerSearches}
      />
    </>
  )
}
