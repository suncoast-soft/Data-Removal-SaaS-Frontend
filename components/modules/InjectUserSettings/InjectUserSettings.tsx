'use client'
import { handleRequest } from '@/utils/auth-helpers/client'
import { createUserSettings } from '@/utils/auth-helpers/server'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function InjectUserSettings({ user }: { user: User }) {
  const router = useRouter()
  useEffect(() => {
    if (user) injectSettings()
  }, [user])

  const injectSettings = async () => {
    await handleRequest({ id: user?.id ?? '' }, createUserSettings, router)
  }

  return null
}
