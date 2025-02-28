'use client'

import { createClient } from '@/utils/supabase/client'
import { getUser } from '@/utils/supabase/queries'
import { User } from '@supabase/supabase-js'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import EmailSignIn from '../Forms/EmailSignIn'
import Separator from '@/components/modules/Separator'
import OauthSignIn from '../Forms/OauthSignIn'

export default function HelpBanner() {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetcher = async () => {
      const user = await getUser(supabase)
      setUser(user)
    }

    fetcher()
  }, [supabase])

  if (user && !user.is_anonymous) {
    return (
      <div className="flex gap-6 flex-col items-end">
        <a
          href="#"
          className="leading-[18px] border-b border-dark text-[20px] font-bold"
        >
          Some of these aren’t my results
        </a>
        <Image
          src={'/help-banner-image.png'}
          width={289}
          height={110}
          alt="Help"
        />
      </div>
    )
  } else {
    return (
      <div className="mx-auto sticky top-12 max-w-xs">
        <h4 className="text-2xl font-bold mb-2 text-center">
          Start removing your digital footprint with pup premium
        </h4>
        <p className="text-lg text-gray/60 mb-4 text-center">
          Create an account to access your full report (free to view, forever)
        </p>
        <Image
          src="/pup-premium-upsell.png"
          width={191}
          height={155}
          alt="Pup Premium Upsell"
          className="mx-auto mb-8"
        />

        <div className="rounded-xl bg-dark p-4 py-6 text-left">
          <EmailSignIn />

          <div className="w-full mt-4">
            <Separator text="Third-party sign-in" />
            <OauthSignIn />
          </div>
        </div>
      </div>
    )
  }
}
