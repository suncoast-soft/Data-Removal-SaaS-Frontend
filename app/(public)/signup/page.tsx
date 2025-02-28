import OauthSignIn from '@/components/sections/Forms/OauthSignIn'
import Image from 'next/image'
import Separator from '@/components/modules/Separator'
import { createClient } from '@/utils/supabase/server'
import { getUser } from '@/utils/supabase/queries'
import EmailSignup from '@/components/sections/Forms/EmailSignup'

export default async function SignUp() {
  const supabase = await createClient()
  const user = await getUser(supabase)

  const hasAnonymousUser = user?.is_anonymous ?? false

  return (
    <div className="bg-lp-hero-section-bg bg-cover bg-bottom py-[40px] lg:py-[100px]">
      <div className="container mx-auto px-4 lg:px-[110px]">
        <div className="flex items-center flex-col lg:flex-row justify-between gap-8 lg:gap-16">
          <div className="rounded-[30px] bg-dark p-4 py-6 lg:pb-10 lg:p-10 lg:w-1/2 flex-shrink-0">
            <h1 className="font-bold text-3xl lg:text-[44px] leading-tight text-white mb-4">
              Register
            </h1>

            <EmailSignup hasAnonymousUser={hasAnonymousUser} />

            <div className="w-full mt-4">
              <Separator text="Third-party sign-in" />
              <OauthSignIn />
            </div>
          </div>

          <div>
            <Image
              src={'/signup-image.png'}
              width={554}
              height={708}
              alt="Singup"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
