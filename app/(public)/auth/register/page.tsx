import OAuthForm from '@/components/sections/Forms/OAuthForm'
import Image from 'next/image'
import Separator from '@/components/modules/Separator'
import PasswordAuthForm from '@/components/sections/Forms/PasswordAuthForm'
import Link from 'next/link'

export default async function SignUp() {
  return (
    <div className="bg-lp-hero-section-bg bg-cover bg-bottom py-[40px] lg:py-[100px]">
      <div className="container mx-auto px-4 lg:px-[110px]">
        <div className="flex items-center flex-col lg:flex-row justify-between gap-8 lg:gap-16">
          <div className="rounded-[30px] bg-dark p-4 py-6 lg:pb-10 lg:p-10 lg:w-1/2 flex-shrink-0">
            <h1 className="font-bold text-3xl lg:text-[44px] leading-tight text-white mb-4">
              Create Account
            </h1>

            <PasswordAuthForm register={true} />

            <div className="w-full mt-4">
              <Separator text="Or continue with" />
              <OAuthForm />
            </div>

            <p className="text-white text-sm mt-4">
              By clicking sign up, you agree to our{' '}
              <Link
                href="/terms-and-conditions"
                className="font-normal underline"
              >
                Terms and conditions
              </Link>
              {', '}
              <Link href="/privacy-policy" className="font-normal underline">
                Privacy Policy
              </Link>
              {', '}
              and all associated policies. *
            </p>
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
