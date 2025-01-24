'use client'

import { Tables } from '@/types_db'
import { useState } from 'react'
import SearchSummary from './SearchSummary'
import SearchResults from './SearchResults'
import ProfileDropdown from '@/components/modules/ProfileDropdown'
import Image from 'next/image'

type Profile = Tables<'profiles'>
type Search = Tables<'searches'>

interface SectionProps {
  searches: {
    profile: Profile
    searches: Search[]
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

      <Image
        width={233}
        height={185}
        src={'/free-dashboard-image.png'}
        className="mx-auto mb-4"
        alt="Vector"
      />

      <h1 className="text-2xl lg:text-4xl font-bold text-center mb-2">
        We found your personal data on {searches.length}
      </h1>

      <p className="text-lg lg:text-xl text-dark/70 text-center mb-8">
        Don’t worry, we’re here to erase them for you
      </p>

      <SearchSummary searches={selectedSearch.searches as any} />

      <SearchResults searches={selectedSearch.searches as any} />
    </>
  )
}
