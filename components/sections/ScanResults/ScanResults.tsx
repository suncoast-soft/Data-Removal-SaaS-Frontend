import { Button } from '@/components/ui/button'
import UpgradeSection from '@/components/sections/Dashboard/UpgradeSection'
import HowToProtectSection from '@/components/sections/Dashboard/HowToProtectSection'
import ArticlesSection from '@/components/sections/Dashboard/ArticlesSection'
import HelpBanner from '@/components/sections/Dashboard/HelpBanner'
import { splitName } from '@/utils/helpers'
import PrivateFAQs from '@/components/sections/PrivateFAQs'
import SearchSummary from '@/components/sections/SearchReport/SearchSummary'
import SearchResults from '@/components/sections/SearchReport/SearchResults'
import Link from 'next/link'

export default async function ScanResults({
  name,
  city,
  state
}: {
  name: string
  city: string
  state: string
}) {
  const { firstName, lastName } = splitName(name ?? '')

  const googleResponse = await fetch(
    `https://api.puperase.com/api/check?type=google&first_name=${firstName}&last_name=${lastName}&city=${city}&state=${state}`
  )
  const googleSearches = [{ search_result: await googleResponse.json() }]

  const brokerResponse = await fetch(
    `https://api.puperase.com/api/check?type=broker&first_name=${firstName}&last_name=${lastName}&city=${city}&state=${state}`
  )
  const brokerSearches = await brokerResponse.json()

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

        <SearchSummary
          googleSearches={googleSearches as any[]}
          brokerSearches={brokerSearches}
        />

        <SearchResults
          googleSearches={googleSearches as any[]}
          brokerSearches={brokerSearches}
        />

        <HelpBanner />

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
        </div>
      </div>
    </>
  )
}
