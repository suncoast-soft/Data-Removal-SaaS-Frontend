import ArticlesSection from '@/components/modules/Dashboard/ArticlesSection'
import FaqsSection from '@/components/modules/Dashboard/FaqsSection'
import HowToProtectSection from '@/components/modules/Dashboard/HowToProtectSection'
import UpgradeSection from '@/components/modules/Dashboard/UpgradeSection'
import ResultRoot from '@/components/modules/Result/ResultRoot'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default async function ResultsPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div className="pt-4 pb-[47px] lg:pt-[100px] lg:pb-[40px] text-darkMain">
      <div className="container mx-auto px-4 lg:px-[110px] max-w-[1288px]">
        <ResultRoot name={(searchParams.name ?? '') as string} />

        <div className="my-[60px] lg:my-[50px]">
          <UpgradeSection />
        </div>
        <FaqsSection />
        <HowToProtectSection />
      </div>
      <ArticlesSection />
      <div className="mt-4 lg:mt-[45px] flex justify-center mx-auto  px-4 lg:px-0">
        <Button
          variant="secondary"
          color="white"
          className="w-full lg:w-[371px] z-10 font-semibold text-lg text-darkMain border-greenMain hover:bg-greenMain hover:text-white border-2"
          type="button"
        >
          <Link href="/checkout" className="no-underline">
            Upgrade and protect yourself today
          </Link>
        </Button>
      </div>
    </div>
  )
}
