import { Button } from '@/components/ui/button'
import Link from 'next/link'
import SearchReport from '@/components/sections/SearchReport'
import UpgradeSection from '@/components/sections/Dashboard/UpgradeSection'
import HowToProtectSection from '@/components/sections/Dashboard/HowToProtectSection'
import ArticlesSection from '@/components/sections/Dashboard/ArticlesSection'
import PrivateFAQs from '@/components/sections/PrivateFAQs'

export default async function ScanResultPage({
  searchParams
}: {
  searchParams: Promise<{
    profile: string
  }>
}) {
  const { profile } = await searchParams

  return (
    <div className="container max-w-6xl">
      <SearchReport profile={profile} />

      <UpgradeSection />

      <PrivateFAQs />

      <HowToProtectSection />

      <ArticlesSection />

      <div className="text-center my-12">
        <Button variant="secondary" asChild>
          <Link href="/signin" className="no-underline">
            Register and protect yourself today
          </Link>
        </Button>
      </div>
    </div>
  )
}
