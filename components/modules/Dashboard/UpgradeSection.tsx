import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function UpgradeSection() {
  return (
    <>
      <div className="flex flex-col gap-6 lg:gap-[32px] items-center">
        <h2 className="text-2xl lg:text-[32px] lg:leading-[38px] font-bold text-left text-darkMain">
          Start removing your digital footprint today
        </h2>
        <div className="flex flex-col lg:flex-row items-center gap-[36px] lg:gap-[65px]">
          <div>
            <p className="opacity-60 font-normal text-[22px] leading-[26px] max-w-[556px]">
              Relevant information about removals Relevant information about
              removals Relevant information about removals
              <br /> <br /> Relevant information about removals Relevant
              information about removals Relevant information about removals
              Relevant information about removals Relevant information about
              removals
            </p>
            <div className="mt-7 flex justify-start">
              <Button
                variant="default"
                color="white"
                className="w-full lg:w-[280px] z-10 font-semibold text-lg text-darkMain border-orangeMain border-2"
                type="button"
                asChild
              >
                <Link href={'/checkout'} className="no-underline">
                  Upgrade
                </Link>
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
    </>
  )
}
