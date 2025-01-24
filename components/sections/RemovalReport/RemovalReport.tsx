'use client'

import { Tables } from '@/types_db'

type Broker = Tables<'brokers'>
type Profile = Tables<'profiles'>
type Search = Tables<'searches'>

interface SectionProps {
  brokers: Broker[]
  searches: {
    profile: Profile
    searches: Search[]
  }[]
}

export default function RemovalReport({ brokers, searches }: SectionProps) {
  return <></>
}
