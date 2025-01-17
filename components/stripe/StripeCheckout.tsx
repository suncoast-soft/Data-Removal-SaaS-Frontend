'use client'

import { useMemo, useState } from 'react'
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js'
import {
  Mail,
  User as UserIcon,
  MapPin,
  CreditCard,
  CalendarDays,
  PhoneCall,
  MoveLeft
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize: '16px',
          color: 'white',
          fontFamily: 'Figtree',
          '::placeholder': {
            color: '#FFFFFF99'
          }
        },
        invalid: {
          color: '#9e2146'
        }
      }
    }),
    []
  )

  return options
}

export default function StripeCheckout({ user }: { user?: User | null }) {
  const [loading, setLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const options = useOptions()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `/`
      }
    })

    if (error) {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-blue-dots-bg bg-cover bg-no-repeat p-4 lg:p-8 pt-0 flex justify-center items-center"
      style={{ paddingTop: !user ? '40px' : 0 }}
    >
      <div className="flex flex-wrap lg:flex-nowrap gap-6 lg:gap-[64px]">
        <div className="space-y-6">
          <Link
            href="#"
            className="inline-flex text-darkMain hover:no-underline"
            onClick={() => router.back()}
          >
            <MoveLeft className="w-6 h-6" />
          </Link>
          <div>
            <div className="text-lg">Annual Plan</div>
            <div className="text-[32px] lg:text-[55px] font-semibold mt-0">
              $99.00
            </div>
            <Image
              src={'/checkout-image.png'}
              width={644}
              height={571}
              alt={'Checkout image'}
              className="mt-[49px] lg:mt-[31px]"
            />
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-darkMain rounded-3xl p-8 text-white w-full max-w-full lg:min-w-[514px] lg:max-w-[514px]"
        >
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-white font-bold text-lg">Email</label>
              <div className="relative">
                <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                  <Mail className="w-5 text-greenMain" />
                </div>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  className="pl-[52px] bg-transparent border-2 h-[60px] border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60"
                />
              </div>
            </div>

            {/* Card Information */}
            <div className="space-y-1">
              <label className="text-white font-bold text-lg">
                Card Information
              </label>
              <div className="relative">
                <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                  <CreditCard className="w-5 text-greenMain" />
                </div>
                <CardNumberElement
                  options={options}
                  onReady={() => {
                    console.log('CardNumberElement [ready]')
                  }}
                  onChange={(event) => {
                    console.log('CardNumberElement [change]', event)
                  }}
                  onBlur={() => {
                    console.log('CardNumberElement [blur]')
                  }}
                  onFocus={() => {
                    console.log('CardNumberElement [focus]')
                  }}
                  className="pl-[52px] bg-transparent border-2 h-[60px] border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60 py-[20.5px] rounded-[999px] pr-3 [&input]:!bg-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                  <CalendarDays className="w-5 text-greenMain" />
                </div>
                <CardExpiryElement
                  options={options}
                  onReady={() => {
                    console.log('CardNumberElement [ready]')
                  }}
                  onChange={(event) => {
                    console.log('CardNumberElement [change]', event)
                  }}
                  onBlur={() => {
                    console.log('CardNumberElement [blur]')
                  }}
                  onFocus={() => {
                    console.log('CardNumberElement [focus]')
                  }}
                  className="pl-[52px] bg-transparent border-2 h-[60px] border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60 py-[20.5px] rounded-[999px] pr-3 [&input]:!bg-transparent"
                />
              </div>
              <div className="relative">
                <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                  <Mail className="w-5 text-greenMain" />
                </div>
                <CardCvcElement
                  options={options}
                  onReady={() => {
                    console.log('CardNumberElement [ready]')
                  }}
                  onChange={(event) => {
                    console.log('CardNumberElement [change]', event)
                  }}
                  onBlur={() => {
                    console.log('CardNumberElement [blur]')
                  }}
                  onFocus={() => {
                    console.log('CardNumberElement [focus]')
                  }}
                  className="pl-[52px] bg-transparent border-2 h-[60px] border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60 py-[20.5px] rounded-[999px] pr-3 [&input]:!bg-transparent"
                />
              </div>
            </div>
            <div className="space-y-1 w-full">
              <label className="text-white font-bold text-lg">
                Cardholder Name
              </label>
              <div className="relative">
                <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                  <UserIcon className="w-5 text-greenMain" />
                </div>
                <Input
                  type="text"
                  placeholder="John Carter"
                  className="pl-[52px] bg-transparent border-2 h-[60px] border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-white font-bold text-lg">
                  Country or Region
                </label>
                <div className="relative">
                  <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                    <MapPin className="w-5 text-greenMain" />
                  </div>
                  <Input
                    type="text"
                    placeholder="United States"
                    className="pl-[52px] bg-transparent border-2 h-[60px] border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-white font-bold text-lg">ZIP</label>
                <div className="relative">
                  <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                    <MapPin className="w-5 text-greenMain" />
                  </div>
                  <Input
                    type="text"
                    placeholder="United States"
                    className="pl-[52px] bg-transparent border-2 h-[60px] border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <label className="flex flex-col items-start">
                <span className="text-white font-bold text-lg">
                  Securely save my information for 1-click checkout
                </span>
                <p className="text-base mt-2 text-white/60">
                  Enter your phone number to create a Link account and pay
                  faster on LEADER ADS LTD and everywhere Link is accepted.
                </p>
              </label>
            </div>

            <div className="space-y-1">
              <label className="text-white font-bold text-lg">
                Phone <sup className="text-orangeMain pt-1">*</sup>
              </label>
              <div className="relative">
                <div className="absolute left-5 top-[50%] -translate-y-[50%]">
                  <PhoneCall className="w-5 text-greenMain" />
                </div>
                <Input
                  type="tel"
                  placeholder="(123) 456 - 789"
                  className="pl-[52px] bg-transparent border-2 h-[60px] border-white text-white [&::placeholder]:text-white [&::placeholder]:opacity-60"
                />
              </div>
            </div>
            <div className="text-center">
              <a
                href="#"
                className="text-orangeMain text-sm no-underline border-b border-orangeMain hover:no-underline font-bold"
              >
                More Info
              </a>
            </div>
            <Button
              variant={'secondary'}
              type="submit"
              disabled={!stripe || loading}
              className="w-full font-normal transition-colors"
            >
              {loading ? 'Processing...' : 'Pay'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
