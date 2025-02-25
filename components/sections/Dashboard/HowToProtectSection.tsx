import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function HowToProtectSection() {
  return (
    <>
      <div className="my-12 text-center">
        <h2 className="text-2xl lg:text-3xl font-bold mb-5">
          How can I protect my data online?
        </h2>

        <Button variant="outline" asChild>
          <Link href={'/blog'}>Check out our blog for more tips</Link>
        </Button>
      </div>

      <hr className="text-dark/15" />
    </>
  )
}
