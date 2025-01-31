'use client'

import { Tables } from '@/types_db'
import { useState } from 'react'
import RemovalSummary from './RemovalSummary'
import RemovalResults from './RemovalResults'
import ProfileDropdown from '@/components/modules/ProfileDropdown'

type Broker = Tables<'brokers'>
type Profile = Tables<'profiles'>
type GoogleSearch = Tables<'google_searches'>
type BrokerSearch = Tables<'broker_searches'>

interface SectionProps {
  brokers: Broker[]
  searches: {
    profile: Profile
    googleSearches: GoogleSearch[]
    brokerSearches: BrokerSearch[]
  }[]
}

export default function RemovalReport({ brokers, searches }: SectionProps) {
  const [selectedSearch, setSelectedSearch] = useState(searches[0])

  return (
    <>
      <ProfileDropdown
        searches={searches}
        selectedSearch={selectedSearch}
        setSelectedSearch={setSelectedSearch}
      />

      <RemovalSummary brokers={brokers} search={selectedSearch} />

      <RemovalResults search={selectedSearch} />
    </>
  )
}
