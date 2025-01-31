import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  getAuthTypes,
  getViewTypes,
  getDefaultSignInView,
  getRedirectMethod
} from '@/utils/auth-helpers/settings'
import EmailSignIn from '@/components/sections/Forms/EmailSignIn'
import OauthSignIn from '@/components/sections/Forms/OauthSignIn'
import SignUp from '@/components/sections/Forms/Signup'
import Image from 'next/image'
import { getUser } from '@/utils/supabase/queries'
import Separator from '@/components/modules/Separator'

export default async function SignIn(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params

  const { allowOauth } = getAuthTypes()
  const viewTypes = getViewTypes()
  const redirectMethod = getRedirectMethod()

  // Declare 'viewProp' and initialize with the default value
  let viewProp: string

  // Assign url id to 'viewProp' if it's a valid string and ViewTypes includes it
  if (typeof params.id === 'string' && viewTypes.includes(params.id)) {
    viewProp = params.id
  } else {
    const preferredSignInView =
      (await cookies()).get('preferredSignInView')?.value || null
    viewProp = getDefaultSignInView(preferredSignInView)
    return redirect(`/signin/${viewProp}`)
  }

  // Check if the user is already logged in and redirect to the account page if so
  const supabase = await createClient()
  const user = await getUser(supabase)

  if (user && viewProp !== 'update_password') {
    return redirect('/')
  } else if (!user && viewProp === 'update_password') {
    return redirect('/signin')
  }

  return (
    <div className="bg-lp-hero-section-bg bg-cover bg-bottom py-[40px] lg:py-[100px]">
      <div className="container mx-auto px-4 lg:px-[110px]">
        <div className="flex items-center flex-col lg:flex-row justify-between gap-8 lg:gap-16">
          <div className="rounded-[30px] bg-dark p-4 py-6 lg:pb-10 lg:p-10 lg:w-1/2 flex-shrink-0">
            <h1 className="font-bold text-3xl lg:text-[44px] leading-tight text-white mb-4">
              {viewProp === 'forgot_password'
                ? 'Reset Password'
                : viewProp === 'update_password'
                  ? 'Update Password'
                  : viewProp === 'signup'
                    ? 'Welcome to Pup Erase!'
                    : 'Login'}
            </h1>

            {viewProp === 'email_signin' && (
              <EmailSignIn redirectMethod={redirectMethod} />
            )}

            {viewProp === 'signup' && (
              <SignUp redirectMethod={redirectMethod} />
            )}

            {(viewProp === 'signup' || viewProp === 'email_signin') &&
              allowOauth && (
                <div className="w-full mt-4">
                  <Separator text="Third-party sign-in" />
                  <OauthSignIn />
                </div>
              )}
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
