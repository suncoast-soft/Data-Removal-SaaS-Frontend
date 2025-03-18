import Image from 'next/image'
import PasswordForgotForm from '@/components/sections/Forms/PasswordForgotForm'

export default async function ForgotPassword({
  searchParams
}: {
  searchParams: Promise<{ disable_button: string }>
}) {
  const disable_button = (await searchParams).disable_button === 'true'

  return (
    <div className="bg-lp-hero-section-bg bg-cover bg-bottom py-10 lg:py-24">
      <div className="container mx-auto px-4 lg:px-24">
        <div className="flex items-center flex-col lg:flex-row justify-between gap-8 lg:gap-16">
          <div className="rounded-3xl bg-dark p-4 py-6 lg:pb-10 lg:p-10 lg:w-1/2 flex-shrink-0">
            <h1 className="font-bold text-3xl lg:text-5xl leading-tight text-white mb-4">
              Reset Password
            </h1>

            <PasswordForgotForm disable_button={disable_button} />
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
