import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function HowToProtectSection() {
  return (
    <>
      <div className="mt-[45px] mb-[23px] lg:my-[45px] flex justify-center mx-auto  px-4 lg:px-0 flex-col gap-[23px] lg:gap-4 items-center">
        <h2 className="text-2xl lg:text-[32px] lg:leading-[35px] font-bold text-center ">
          How can I protect my data online?
        </h2>
        <Button
          variant="secondary"
          color="white"
          className="w-full lg:w-[371px] z-10 font-semibold text-lg bg-transparent text-darkMain border-darkMain hover:bg-darkMain hover:text-white border-2"
          type="button"
          asChild
        >
          <Link href={'/blog'} className="no-underline">
            Check out our blog for more tips
          </Link>
        </Button>
      </div>
      <hr className="my-4 border-darkMain/10 border-[1.4px] mt-[23px] hidden lg:block mb-[50px] " />
    </>
  )
}
