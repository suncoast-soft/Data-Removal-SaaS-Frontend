import { Button } from '@/components/ui/button'
import UpgradeSection from '@/components/sections/Dashboard/UpgradeSection'
import HowToProtectSection from '@/components/sections/Dashboard/HowToProtectSection'
import ArticlesSection from '@/components/sections/Dashboard/ArticlesSection'
import HelpBanner from '@/components/sections/Dashboard/HelpBanner'
import { splitName } from '@/utils/helpers'
import PrivateFAQs from '@/components/sections/PrivateFAQs'
import SearchSummary from '@/components/sections/SearchReport/SearchSummary'
import SearchResults from '@/components/sections/SearchReport/SearchResults'
import GenReportLoader from '@/components/modules/Landing/GenReportLoader/GenReportLoader'
import Link from 'next/link'

export default async function ResultPage({
  searchParams
}: {
  searchParams: Promise<{ name: string }>
}) {
  const name = (await searchParams).name
  const { firstName, lastName } = splitName(name)

  const response = await fetch(
    `https://api.puperase.com/api/check?type=google&first_name=${firstName}&last_name=${lastName}&location=${'United States'}`
  )
  const data = await response.json()
  const googleResults = data.results

  if (!googleResults) {
    return <GenReportLoader searchTerm={name} />
  }

  const searches = [
    {
      broker_type: 'google',
      search_result: googleResults.slice(0, 5)
    }
  ]

  return (
    <div className="container max-w-6xl">
      <h1 className="text-2xl lg:text-4xl font-bold text-center mt-20 mb-4">
        Your Scan Results
      </h1>

      <h3 className="text-lg lg:text-xl text-center mb-3">
        <span>We found your personal data on 137 sites</span>{' '}
        <span className="text-primary">just through your phone number.</span>
      </h3>

      <p className="text-dark/70 text-center mb-8">
        Don’t worry, we’re here to get them offline for you{' '}
      </p>

      <SearchSummary searches={searches} />

      <SearchResults searches={searches} />

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
  )
}
