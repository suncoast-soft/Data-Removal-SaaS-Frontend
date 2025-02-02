'use client'

import HelpBanner from '@/components/sections/Dashboard/HelpBanner'
import { Tables } from '@/types_db'
import { isValidUrl } from '@/utils/helpers'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type BrokerSearch = Tables<'broker_searches'> & {
  broker: Tables<'brokers'>
}

const renderValue = (value: any): string | React.ReactNode => {
  if (typeof value === 'object' && value !== null) {
    if (Array.isArray(value)) {
      return value.map(renderValue).join(', ')
    }
    return (
      <ul className="pl-4 list-none">
        {Object.entries(value)
          .filter(([, nestedValue]) => nestedValue !== null)
          .map(([nestedKey, nestedValue]) => (
            <li key={nestedKey}>
              <strong>{nestedKey}:</strong> {renderValue(nestedValue)}
            </li>
          ))}
      </ul>
    )
  }

  if (isValidUrl(value)) {
    return (
      <Link href={value} target="_blank">
        {value}
      </Link>
    )
  }

  return String(value)
}

export default function BrokerSearchResults({
  searches
}: {
  searches: BrokerSearch[]
}) {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      if (supabase.auth) {
        const {
          data: { user },
          error
        } = await supabase.auth.getUser()
        if (error) console.error('Error fetching user:', error)
        setUser(user)
      }
    }

    getUser()
  }, [supabase.auth])

  return (
    <div className="border border-gray/20 rounded-lg grid lg:grid-cols-2">
      <div className="overflow-clip">
        {searches
          .filter((search) => search.search_status === 'completed')
          .map((search, index) => (
            <div key={index} className="px-8 py-6 border-b border-b-gray/20">
              <h3 className="font-semibold text-primary">
                <Link href={search.broker.site_url ?? ''} target="_blank">
                  {search.broker?.name ?? 'Unknown Broker'}
                </Link>
              </h3>
              <div>
                <ul>
                  {Object.entries(
                    flattenData(Object(search.search_result) ?? {})
                  )
                    .filter(([, value]) => value !== null)
                    .map(([key, value]) => (
                      <li key={key}>
                        <span className="font-semibold">{key}: </span>
                        <span>{renderValue(value)}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
      </div>

      <div className="relative px-4 py-12">
        {user ? (
          <div className="mx-auto sticky top-12 text-center max-w-xs">
            <HelpBanner />
          </div>
        ) : (
          <div className="mx-auto sticky top-12 text-center max-w-xs">
            <h4 className="text-2xl font-bold mb-2">
              Start removing your digital footprint with pup premium
            </h4>
            <p className="text-lg text-gray/60 mb-4">
              Create an account to access your full report (free to view,
              forever)
            </p>
            <Image
              src="/pup-premium-upsell.png"
              width={191}
              height={155}
              alt="Pup Premium Upsell"
              className="mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  )
}

function flattenData(data: object): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(data)) {
    if (value === null) continue

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenData(value))
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        if (typeof item === 'object') {
          Object.assign(result, flattenData(item))
        } else {
          result[key] = value
        }
      })
    } else {
      result[key] = value
    }
  }

  return result
}
