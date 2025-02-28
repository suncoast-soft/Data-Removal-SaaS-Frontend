/* eslint-disable @next/next/no-img-element */
'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tables } from '@/types_db'
import { getKeysInData, isValidUrl } from '@/utils/helpers'
import { getBuyLink } from '@/utils/stripe/client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type BrokerSearch = Tables<'broker_searches'> & {
  broker: Tables<'brokers'>
}

interface SectionProps {
  searches: BrokerSearch[]
  hasAccount: boolean
  isPremium: boolean
}

export default function BrokerSearchResults({
  searches,
  hasAccount,
  isPremium
}: SectionProps) {
  const [buyLink, setBuyLink] = useState('')
  useEffect(() => {
    async function handle() {
      const link = await getBuyLink()
      setBuyLink(link)
    }
    handle()
  }, [])

  return (
    <div className="border border-b-0 border-gray/10">
      <div className="hidden lg:flex w-full bg-gray/10 text-dark font-bold">
        <div className="w-1/4 px-4 py-2.5 text-center">Website</div>
        <div className="w-1/2 px-4 py-2.5 text-center">
          Personal Information Included
        </div>
        <div className="w-1/4 px-4 py-2.5"></div>
      </div>

      <Accordion type="multiple">
        {searches
          .filter((search) => search.search_status === 'completed')
          .map((search, index) => {
            const result = processSearchResult(search.search_result)
            const tags = getKeysInData(search.search_result)

            return (
              <AccordionItem
                key={index}
                value={String(index)}
                className="border-none"
              >
                <div className="flex flex-col lg:flex-row w-full border-b border-dark/10">
                  <div className="p-4 lg:w-1/4 min-h-24 flex items-center justify-center">
                    {search.broker.logo_url ? (
                      <img
                        src={search.broker.logo_url}
                        width="auto"
                        height="auto"
                        alt={search.broker?.name ?? 'Unknown Broker'}
                        className="max-w-48 max-h-16 object-contain"
                      />
                    ) : (
                      <span className="font-semibold text-xl text-center">
                        {search.broker?.name}
                      </span>
                    )}
                  </div>

                  <div className="p-4 lg:w-1/2 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={
                          tag.includes('Name')
                            ? 'primary'
                            : ['Address', 'Location'].includes(tag)
                              ? 'secondary'
                              : ['Email', 'Phone'].includes(tag)
                                ? 'destructive'
                                : 'default'
                        }
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="p-4 lg:w-1/4 flex flex-col justify-center">
                    {hasAccount ? (
                      <AccordionTrigger className="justify-center hover:no-underline">
                        <span className="mr-2 text-primary font-bold">
                          View More Info
                        </span>
                      </AccordionTrigger>
                    ) : (
                      <>
                        <Button variant="link" className="w-full p-1" asChild>
                          <Link href="/signin" className="mr-1 underline">
                            Create a free account
                          </Link>
                        </Button>
                        <p className="text-sm text-center">
                          to access your full report
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <AccordionContent className="bg-gray/5 p-0">
                  <div className="flex flex-col lg:flex-row w-full">
                    <div className="p-4 lg:w-1/4">
                      {isPremium && (
                        <>
                          <h5 className="font-bold text-left">Memo:</h5>
                          <p className="text-left">
                            {search.removal_note ?? 'In progress'}
                          </p>
                        </>
                      )}
                    </div>

                    <div className="p-4 lg:w-1/2">
                      <ul>
                        {Object.entries(result)
                          .filter(
                            ([, value]) =>
                              value &&
                              (!Array.isArray(value) || value.length > 0)
                          )
                          .map(([key, value]) => (
                            <li key={key}>
                              <span className="font-semibold">{key}: </span>
                              <span>{renderValue(value)}</span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className="p-4 lg:w-1/4">
                      <h3 className="text-lg font-bold text-center mb-3">
                        Removal Status
                      </h3>

                      {isPremium ? (
                        <p className="text-white font-bold bg-secondary text-center px-2 py-1">
                          {search.removal_status ?? 'In progress'}
                        </p>
                      ) : (
                        <>
                          <Button variant="link" className="p-1 w-full" asChild>
                            <Link href={buyLink} className="text-secondary">
                              Upgrade to PUP Premium
                            </Link>
                          </Button>

                          <p className="text-sm text-center">
                            and begin erasing your data today
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
      </Accordion>
    </div>
  )
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

const processSearchResult = (search_result: any): object[] => {
  if (!search_result || typeof search_result !== 'object') return []

  if (Array.isArray(search_result.results)) {
    return search_result.results[0]
  }

  return search_result
}
