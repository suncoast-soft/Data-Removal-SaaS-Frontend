import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  getAuthTypes,
  getViewTypes,
  getDefaultSignInView,
  getRedirectMethod
} from '@/utils/auth-helpers/settings'
import Card from '@/components/ui/Card'
import PasswordSignIn from '@/components/modules/AuthForms/PasswordSignIn'
import EmailSignIn from '@/components/modules/AuthForms/EmailSignIn'
import Separator from '@/components/modules/AuthForms/Separator'
import OauthSignIn from '@/components/modules/AuthForms/OauthSignIn'
import ForgotPassword from '@/components/modules/AuthForms/ForgotPassword'
import UpdatePassword from '@/components/modules/AuthForms/UpdatePassword'
import SignUp from '@/components/modules/AuthForms/Signup'
import LogoText from '@/components/icons/LogoText'

export default async function SignIn({
  params,
  searchParams
}: {
  params: { id: string }
  searchParams: { disable_button: boolean }
}) {
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
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-96">
        <div className="flex justify-center my-6">
          <LogoText />
        </div>
        <Card
          color="black"
          title={
            viewProp === 'forgot_password'
              ? 'Reset Password'
              : viewProp === 'update_password'
                ? 'Update Password'
                : viewProp === 'signup'
                  ? 'Sign Up'
                  : 'Sign In'
          }
        >
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
              disableButton={searchParams.disable_button}
            />
          )}
          {viewProp === 'forgot_password' && (
            <ForgotPassword
              allowEmail={allowEmail}
              redirectMethod={redirectMethod}
              disableButton={searchParams.disable_button}
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
              <>
                <Separator text="Third-party sign-in" />
                <OauthSignIn />
              </>
            )}
        </Card>
      </div>
    </div>
  )
}
