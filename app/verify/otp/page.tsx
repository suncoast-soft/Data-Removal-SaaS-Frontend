import VerifyOTPForm from '@/components/modules/VerifyOTPForm/VerifyOTPForm'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export default async function VerifyOTPPage(props: {
  searchParams: Promise<{ success: string }>
}) {
  const searchParams = await props.searchParams

  const isPhoneVerified = searchParams.success

  return (
    <div className="bg-lp-hero-section-bg bg-cover bg-bottom pt-12 pb-16 lg:pb-20 text-dark h-[calc(100vh-60px)]">
      <div className="container mx-auto px-4 lg:px-24 h-full">
        <div className="text-center max-w-lg mx-auto h-full flex flex-col justify-center items-center gap-16 lg:gap-6">
          <Image
            src={
              isPhoneVerified
                ? '/phone-otp-verified-image.png'
                : '/phone-otp-image.png'
            }
            width={309}
            height={358}
            alt={isPhoneVerified ? 'Phone Verified' : 'Phone Verification'}
            className="order-2 lg:order-1"
          />
          <div className="order-1 lg:order-2">
            <h1 className="text-2xl lg:text-4xl font-bold text-center">
              {isPhoneVerified ? 'Phone Verified!' : 'Phone Verification'}
            </h1>
            <p className="mt-4 text-lg lg:text-xl text-center opacity-60">
              {isPhoneVerified
                ? 'One step closer to removing your digital footprint'
                : 'Help us make sure it’s really you'}
            </p>
            {isPhoneVerified ? (
              <div className="my-4">
                <Button
                  variant="secondary"
                  type="submit"
                  className="w-full lg:w-72 text-lg"
                >
                  Create Your Profile
                </Button>
              </div>
            ) : (
              <VerifyOTPForm />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
