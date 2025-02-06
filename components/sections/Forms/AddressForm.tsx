'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

import { usePlacesWidget } from 'react-google-autocomplete'
import { useEffect, useState } from 'react'
import { cn } from '@/utils/cn'
import { getStateCode, splitName } from '@/utils/helpers'
import { Button } from '@/components/ui/button'
import ArrowRight from '@/components/icons/ArrowRight'
import { handleRequest } from '@/utils/auth-helpers/client'
import { anonymousSignin } from '@/utils/auth-helpers/server'

interface Address {
  city: string
  state: string
}

const FormSchema = z.object({
  address: z.string().min(4, {
    message: 'City and State is required'
  })
})

export default function AddressForm({ name }: { name: string }) {
  const { firstName, lastName } = splitName(name ?? '')

  const [loading, setLoading] = useState(true)
  const [city, setCity] = useState('')
  const [state, setState] = useState('')

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address: ''
    }
  })

  useEffect(() => {
    async function fetchIPAPI() {
      try {
        const ipResponse = await fetch(
          `https://ipinfo.io?token=${process.env.NEXT_PUBLIC_IPINFO_TOKEN}`
        )
        const ipData = await ipResponse.json()

        setCity(ipData.city)
        setState(getStateCode(ipData.region))
        form.setValue(
          'address',
          `${ipData.city}, ${getStateCode(ipData.region)}`,
          { shouldValidate: true }
        )
      } catch (error) {
        console.log(error)
      }

      setLoading(false)
    }
    fetchIPAPI()
  }, [form])

  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onSubmit() {
    setIsSubmitting(true)
    try {
      const transformedData = {
        first_name: firstName,
        last_name: lastName,
        city: city,
        state: state
      }
      await handleRequest(transformedData, anonymousSignin, router)
      setIsSubmitting(false)
    } catch (error) {
      console.error('Sign-up failed:', error)
      setIsSubmitting(false)
    }
  }

  function onAddressSelect({ city, state }: Address) {
    setCity(city)
    setState(state)
    form.setValue('address', `${city}, ${state}`, { shouldValidate: true })
  }

  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY,
    onPlaceSelected: (place) => {
      let city = ''
      let state = ''

      if (place.address_components) {
        for (const component of place.address_components) {
          if (component.types.includes('locality')) {
            city = component.long_name
          }
          if (component.types.includes('administrative_area_level_1')) {
            state = component.short_name
          }
        }
      }

      onAddressSelect({ city, state })
    },
    options: {
      types: ['geocode'],
      componentRestrictions: { country: 'us' }
    }
  })

  return (
    <>
      {loading ? (
        <p>Validating Your Address...</p>
      ) : (
        <div className="relative text-3xl lg:text-5xl leading-wide font-bold">
          <h1>
            <p className="px-2 mb-2">{firstName}, are you from</p>
            <span className="bg-dark leading-[55px] text-white px-2 relative">
              {city}, {state}
            </span>
            ?
          </h1>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-col flex lg:flex-row mt-[50px] lg:mt-10 gap-4 lg:gap-6 flex-wrap"
        >
          <div className="z-10">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full lg:w-fit">
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter your Location"
                      className={cn('lg:w-80 placeholder:text-dark/60')}
                      ref={ref}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            variant="default"
            type="submit"
            className="z-10 w-full lg:w-auto"
            disabled={isSubmitting}
          >
            <span className="mr-2">SEARCH</span>
            <ArrowRight />
          </Button>
        </form>
      </Form>

      <p className="mt-2">
        Please confirm your location. We will use this data to scan 37 data
        broker sites to find those that expose your personal information.
      </p>
    </>
  )
}
