'use client'

import { Tables } from '@/types_db'
import { useState } from 'react'
import SearchSummary from './SearchSummary'
import SearchResults from './SearchResults'
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

export default function SearchReport({ searches }: SectionProps) {
  const [selectedSearch, setSelectedSearch] = useState(searches[0])

  return (
    <>
      <ProfileDropdown
        searches={searches}
        selectedSearch={selectedSearch}
        setSelectedSearch={setSelectedSearch}
      />

      <SearchSummary
        googleSearches={selectedSearch.googleSearches}
        brokerSearches={selectedSearch.brokerSearches}
      />

      <SearchResults
        googleSearches={selectedSearch.googleSearches}
        brokerSearches={selectedSearch.brokerSearches}
      />
    </>
  )
}
