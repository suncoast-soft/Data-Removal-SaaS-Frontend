import VerifyOTPForm from '@/components/modules/VerifyOTPForm/VerifyOTPForm'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export default function VerifyOTPPage(props: any) {
  const isPhoneVerified = props.searchParams.success
  return (
    <div className="bg-lp-hero-section-bg bg-cover bg-bottom pt-12 pb-[61px] lg:pb-[71px] text-darkMain h-[calc(100vh-60px)]">
      <div className="container mx-auto px-4 lg:px-[110px] h-full">
        <div className="text-center max-w-[543px] mx-auto h-full flex flex-col justify-center items-center gap-[67px] lg:gap-6">
          <Image
            src={
              isPhoneVerified
                ? '/phone-otp-verified-image.png'
                : '/phone-otp-image.png'
            }
            width={309}
            height={358}
            alt={`Vector`}
            className="order-2 lg:order-1"
          />
          <div className="order-1 lg:order-2">
            <h1 className="text-[34px] lg:text-[50px] leading-[55px] font-bold text-center ">
              {isPhoneVerified ? 'Phone Verified!' : 'Phone Verification'}
            </h1>
            <p className="mt-4 text-[22px] leading-[26px]  text-center opacity-60">
              {isPhoneVerified
                ? 'One step closer to removing your digital footprint'
                : 'Help us make sure it’s really you'}
            </p>
            {isPhoneVerified ? (
              <div className="my-4">
                <Button
                  variant="secondary"
                  type="submit"
                  className="w-full lg:w-[350px] text-lg"
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
