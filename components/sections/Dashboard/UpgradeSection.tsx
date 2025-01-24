import { Button } from '@/components/ui/button'
import { getUser } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function UpgradeSection() {
  const supabase = await createClient()
  const user = await getUser(supabase)

  return (
    <div className="flex flex-col gap-6 lg:gap-8 items-center my-12">
      <h2 className="text-2xl lg:text-[32px] lg:leading-[38px] font-bold text-left text-dark">
        Start removing your digital footprint today
      </h2>
      <div className="flex flex-col lg:flex-row items-center gap-[36px] lg:gap-[65px]">
        <div>
          <p className="text-xl text-dark/70 mb-4">
            Relevant information about removals Relevant information about
            removals Relevant information about removals
          </p>

          <p className="text-xl text-dark/70 mb-4">
            Relevant information about removals Relevant information about
            removals Relevant information about removals Relevant information
            about removals Relevant information about removals
          </p>

          <div className="mt-7 flex justify-start">
            <Button variant="default" className="w-48" asChild>
              {user ? (
                <Link href={'/checkout'} className="no-underline">
                  Upgrade
                </Link>
              ) : (
                <Link href={'/signin/signup'} className="no-underline">
                  Get Started
                </Link>
              )}
            </Button>
          </div>
        </div>

        <Image
          src={'/results-remove-data-image.png'}
          width={511}
          height={458}
          alt={`Vector`}
        />
      </div>
    </div>
  )
}
