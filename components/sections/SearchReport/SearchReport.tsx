'use client'

import { Tables } from '@/types_db'
import { useState } from 'react'
import SearchSummary from './SearchSummary'
import SearchResults from './SearchResults'
import ProfileDropdown from '@/components/modules/ProfileDropdown'

type Broker = Tables<'brokers'>
type Profile = Tables<'profiles'>
type Search = Tables<'searches'>

interface SectionProps {
  brokers: Broker[]
  searches: {
    profile: Profile
    searches: Search[]
  }[]
}

export default function SearchReport({ brokers, searches }: SectionProps) {
  const [selectedSearch, setSelectedSearch] = useState(searches[0])

  return (
    <>
      <ProfileDropdown
        searches={searches}
        selectedSearch={selectedSearch}
        setSelectedSearch={setSelectedSearch}
      />

      <SearchSummary brokers={brokers} search={selectedSearch} />

      <SearchResults search={selectedSearch} />
    </>
  )
}
