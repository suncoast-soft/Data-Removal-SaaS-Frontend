'use client'

import { Tables } from '@/types_db'
import { useEffect, useState } from 'react'
import SearchSummary from './SearchSummary'
import SearchResults from './SearchResults'
import ProfileDropdown from '@/components/modules/ProfileDropdown'
import Image from 'next/image'

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
  const [loading, setLoading] = useState(true)
  const [selectedSearch, setSelectedSearch] = useState(searches[0])

  useEffect(() => {
    const isLoading = selectedSearch.brokerSearches.some(
      (item) =>
        item.search_status === 'queued' || item.search_status === 'completed'
    )
    setLoading(isLoading)
  }, [selectedSearch])

  return (
    <>
      <ProfileDropdown
        searches={searches}
        selectedSearch={selectedSearch}
        setSelectedSearch={setSelectedSearch}
      />

      {loading ? (
        <div className="bg-lp-hero-section-bg bg-cover bg-bottom">
          <div className="container mx-auto px-4 lg:px-28 py-20 h-full flex items-center justify-center">
            <div className="text-center max-w-lg flex flex-col items-center gap-6">
              <Image
                src="/loaders/hero-image.png"
                width={200}
                height={358}
                alt="Report Loader"
                className="order-2 lg:order-1"
              />
              <div className="order-1 lg:order-2">
                <h2 className="text-2xl lg:text-4xl font-bold">
                  Regenerating your report
                </h2>
                <p className="mt-4 text-lg lg:text-xl opacity-60">
                  This will only take a few second
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <SearchSummary
            googleSearches={selectedSearch.googleSearches}
            brokerSearches={selectedSearch.brokerSearches}
          />

          <SearchResults
            googleSearches={selectedSearch.googleSearches}
            brokerSearches={selectedSearch.brokerSearches}
          />
        </>
      )}
    </>
  )
}
