'use client'

// import { Button } from '@/components/ui/button'
// import UpgradeSection from '@/components/sections/Dashboard/UpgradeSection'
// import HowToProtectSection from '@/components/sections/Dashboard/HowToProtectSection'
// import ArticlesSection from '@/components/sections/Dashboard/ArticlesSection'
// import HelpBanner from '@/components/sections/Dashboard/HelpBanner'
import { splitName } from '@/utils/helpers'
// import PrivateFAQs from '@/components/sections/PrivateFAQs'
import SearchSummary from '@/components/sections/SearchReport/SearchSummary'
import SearchResults from '@/components/sections/SearchReport/SearchResults'
// import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Json } from '@/types_db'

export default function ScanResults() {
  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()
  const name = searchParams.get('name')
  const { firstName, lastName } = splitName(name ?? '')

  const [searches, setSearches] = useState<
    { broker_type: string; search_result: Json }[]
  >([])

  useEffect(() => {
    async function fetchIPAPI() {
      let city = ''
      let state = ''
      let zip = ''

      try {
        const ipResponse = await fetch('http://ip-api.com/json')
        const ipData = await ipResponse.json()

        if (ipData.status === 'success') {
          city = ipData.city
          state = ipData.regionName
          zip = ipData.zip
        }
      } catch (error) {
        console.log(error)
      }

      try {
        const googleResponse = await fetch(
          `https://api.puperase.com/api/check?type=google&first_name=${firstName}&last_name=${lastName}&city=${city}&state=${state}&zip=${zip}`
        )
        const googleData = await googleResponse.json()

        const brokerResponse = await fetch(
          `https://api.puperase.com/api/check?type=broker&first_name=${firstName}&last_name=${lastName}&city=${city}&state=${state}&zip=${zip}`
        )
        const brokerData = await brokerResponse.json()

        setSearches([
          {
            broker_type: 'google',
            search_result: googleData.slice(0, 20)
          },
          {
            broker_type: 'broker',
            search_result: brokerData.slice(0, 20)
          }
        ])
      } catch (error) {
        console.log(error)
      }

      setLoading(false)
    }
    fetchIPAPI()
  }, [firstName, lastName])

  if (loading) {
    return (
      <div className="bg-lp-hero-section-bg bg-cover bg-bottom fixed inset-0 z-[9999] text-dark h-screen">
        <div className="container mx-auto px-4 lg:px-28 h-full flex items-center justify-center">
          <div className="text-center max-w-lg flex flex-col items-center gap-6">
            <Image
              src="/loaders/hero-image.png"
              width={309}
              height={358}
              alt="Report Loader"
              className="order-2 lg:order-1"
            />
            <div className="order-1 lg:order-2">
              <h1 className="text-2xl lg:text-5xl font-bold">
                Generating your report
              </h1>
              <p className="mt-4 text-lg lg:text-xl opacity-60">
                This will only take a second
              </p>
              <p className="mt-4 text-lg lg:text-xl font-semibold">
                Searching: ...{name}...
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="container max-w-6xl">
        <h1 className="text-2xl lg:text-4xl font-bold text-center mt-20 mb-4">
          Your Scan Results
        </h1>

        <h3 className="text-lg lg:text-xl text-center mb-3">
          <span>We found your personal data on 137 sites</span>{' '}
          <span className="text-primary">just through your name.</span>
        </h3>

        <p className="text-dark/70 text-center mb-8">
          Don’t worry, we’re here to get them offline for you{' '}
        </p>

        <SearchSummary searches={searches} />

        <SearchResults searches={searches} />

        {/* <HelpBanner />

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
        </div> */}
      </div>
    </>
  )
}
