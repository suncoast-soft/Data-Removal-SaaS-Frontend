import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  getAuthTypes,
  getViewTypes,
  getDefaultSignInView,
  getRedirectMethod
} from '@/utils/auth-helpers/settings'
import PasswordSignIn from '@/components/modules/AuthForms/PasswordSignIn'
import EmailSignIn from '@/components/modules/AuthForms/EmailSignIn'
import Separator from '@/components/modules/AuthForms/Separator'
import OauthSignIn from '@/components/modules/AuthForms/OauthSignIn'
import ForgotPassword from '@/components/modules/AuthForms/ForgotPassword'
import UpdatePassword from '@/components/modules/AuthForms/UpdatePassword'
import SignUp from '@/components/modules/AuthForms/Signup'
import LogoText from '@/components/icons/LogoText'
import Image from 'next/image'

export default async function SignIn({ params }: { params: { id: string } }) {
  const { allowOauth, allowEmail, allowPassword } = getAuthTypes()
  const viewTypes = getViewTypes()
  const redirectMethod = getRedirectMethod()

  // Declare 'viewProp' and initialize with the default value
  let viewProp: string

  // Assign url id to 'viewProp' if it's a valid string and ViewTypes includes it
  if (typeof params.id === 'string' && viewTypes.includes(params.id)) {
    viewProp = params.id
  } else {
    const preferredSignInView =
      cookies().get('preferredSignInView')?.value || null
    viewProp = getDefaultSignInView(preferredSignInView)
    return redirect(`/signin/${viewProp}`)
  }

  // Check if the user is already logged in and redirect to the account page if so
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (user && viewProp !== 'update_password') {
    return redirect('/')
  } else if (!user && viewProp === 'update_password') {
    return redirect('/signin')
  }

  return (
    <div className="bg-lp-hero-section-bg bg-cover bg-bottom py-[40px] lg:py-[100px]">
      <div className="container mx-auto px-4 lg:px-[110px]">
        <div className="flex items-center flex-col lg:flex-row gap-[39px] lg:gap-[50px]">
          <div className="rounded-[30px] bg-darkMain p-4 py-6 lg:pb-10 lg:p-10 max-w-[616px]">
            <h1 className="font-bold text-[43px] lg:text-[50px] text-white leading-[55px] mb-4 lg:mb-6">
              {viewProp === 'forgot_password'
                ? 'Reset Password'
                : viewProp === 'update_password'
                  ? 'Update Password'
                  : viewProp === 'signup'
                    ? 'Welcome to Pup Erase!'
                    : 'Sign In'}
            </h1>
            <p className="font-normal text-lg lg:text-[22px] leading-[26px] mb-4 lg:mb-6 text-white opacity-60">
              All details to your profile to ensure correct results.
            </p>
            {viewProp === 'password_signin' && (
              <PasswordSignIn
                allowEmail={allowEmail}
                redirectMethod={redirectMethod}
              />
            )}
            {viewProp === 'email_signin' && (
              <EmailSignIn
                allowPassword={allowPassword}
                redirectMethod={redirectMethod}
              />
            )}
            {viewProp === 'forgot_password' && (
              <ForgotPassword
                allowEmail={allowEmail}
                redirectMethod={redirectMethod}
              />
            )}
            {viewProp === 'update_password' && (
              <UpdatePassword redirectMethod={redirectMethod} />
            )}
            {viewProp === 'signup' && (
              <SignUp allowEmail={allowEmail} redirectMethod={redirectMethod} />
            )}
            {viewProp !== 'update_password' &&
              viewProp !== 'signup' &&
              allowOauth && (
                <div className="w-full">
                  <Separator text="Third-party sign-in" />
                  <OauthSignIn />
                </div>
              )}
          </div>
          <div className="">
            <Image
              src={'/signup-image.png'}
              width={554}
              height={708}
              alt={`Vector`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
