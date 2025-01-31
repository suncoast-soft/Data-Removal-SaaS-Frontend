'use client'

import * as React from 'react'
import { Pencil, Check, X } from 'lucide-react'
import Link from 'next/link'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User } from '@supabase/supabase-js'
import { handleRequest } from '@/utils/auth-helpers/client'
import { updateUserField } from '@/utils/auth-helpers/server'
import { useRouter } from 'next/navigation'
import { Tables } from '@/types_db'
import { updateUserSettings } from '@/utils/supabase/mutations'

type Setting = Tables<'users'>

interface ContactDetail {
  email: string
  phone: string
}

export default function AccountSettings({
  user,
  settings
}: {
  user: User | null
  settings: Setting
}) {
  const router = useRouter()
  const [contactDetails, setContactDetails] = React.useState<ContactDetail>({
    email: user?.email || '',
    phone: user?.phone || ''
  })
  const [editingField, setEditingField] = React.useState<
    'email' | 'phone' | null
  >(null)
  const [tempValue, setTempValue] = React.useState('')
  const [_settings, setSettings] = React.useState({
    id: settings?.id,
    status_update_method: settings?.status_update_method || '',
    receive_marketing_emails: Boolean(settings?.receive_marketing_emails),
    allow_multi_device_login: Boolean(settings?.allow_multi_device_login),
    enable_mfa: Boolean(settings?.enable_mfa)
  })

  const handleEdit = (field: 'email' | 'phone') => {
    setEditingField(field)
    setTempValue(contactDetails[field])
  }

  const handleSave = async () => {
    try {
      if (editingField) {
        const data = { field: editingField, value: tempValue }
        await handleRequest(data, updateUserField, router)
        if (editingField === 'phone')
          setContactDetails((prev) => ({ ...prev, [editingField]: tempValue }))
        setEditingField(null)
      }
    } catch {}
  }

  const handleCancel = () => {
    setEditingField(null)
  }
  const {
    status_update_method,
    receive_marketing_emails,
    allow_multi_device_login,
    enable_mfa
  } = _settings

  const updateSettings = async (field: string, value: string | boolean) => {
    await handleRequest(
      {
        ..._settings
      },
      updateUserSettings,
      router
    )
    setSettings({
      ..._settings,
      [field]: value
    })
  }

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-6 text-2xl font-bold text-dark">Preferences:</h2>

          <div className="flex flex-col gap-6">
            <div className="flex gap-4 flex-col">
              <p className="text-base font-bold text-dark">
                Receive status updates
              </p>
              <div className="flex gap-6">
                <div className="flex items-center gap-2.5">
                  <Checkbox
                    id="status-email"
                    checked={status_update_method === 'email'}
                    onClick={() =>
                      updateSettings('status_update_method', 'email')
                    }
                  />
                  <label
                    htmlFor="status-email"
                    className="text-base font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    By email
                  </label>
                </div>
                <div className="flex items-center gap-2.5">
                  <Checkbox
                    id="status-sms"
                    checked={status_update_method === 'sms'}
                    onClick={() =>
                      updateSettings('status_update_method', 'sms')
                    }
                  />
                  <label
                    htmlFor="status-sms"
                    className="text-base font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    By SMS
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-4 flex-col">
              <p className="text-base text-dark font-bold">
                Receive marketing emails?
              </p>
              <div className="flex gap-6">
                <div className="flex items-center gap-2.5">
                  <Checkbox
                    id="marketing-yes"
                    checked={receive_marketing_emails === true}
                    onClick={() =>
                      updateSettings('receive_marketing_emails', true)
                    }
                  />
                  <label
                    htmlFor="marketing-yes"
                    className="text-base font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center gap-2.5">
                  <Checkbox
                    id="marketing-no"
                    checked={receive_marketing_emails === false}
                    onClick={() =>
                      updateSettings('receive_marketing_emails', false)
                    }
                  />
                  <label
                    htmlFor="marketing-no"
                    className="text-base font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    No thanks
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-4 flex-col">
              <p className="text-base text-dark font-bold">
                Allow multi-device log-in?
              </p>
              <div className="flex gap-6">
                <div className="flex items-center gap-2.5">
                  <Checkbox
                    id="mode-light"
                    checked={allow_multi_device_login === true}
                    onClick={() =>
                      updateSettings('allow_multi_device_login', true)
                    }
                  />
                  <label
                    htmlFor="mode-light"
                    className="text-base font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center gap-2.5">
                  <Checkbox
                    id="mode-dark"
                    checked={allow_multi_device_login === false}
                    onClick={() =>
                      updateSettings('allow_multi_device_login', false)
                    }
                  />
                  <label
                    htmlFor="mode-dark"
                    className="text-base font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-4 flex-col">
              <p className="text-base text-dark font-bold">
                Require Multi-Factor Verification?
              </p>
              <div className="flex gap-6">
                <div className="flex items-center gap-2.5">
                  <Checkbox
                    id="mfa-yes"
                    checked={enable_mfa === true}
                    onClick={() => updateSettings('enable_mfa', true)}
                  />
                  <label
                    htmlFor="mfa-yes"
                    className="text-base font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center gap-2.5">
                  <Checkbox
                    id="mfa-no"
                    checked={enable_mfa === false}
                    onClick={() => updateSettings('enable_mfa', false)}
                  />
                  <label
                    htmlFor="mfa-no"
                    className="text-base font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>

            <Link
              href="#"
              className="no-underline border-b border-secondary h-fit text-base text-secondary hover:text-secondary/60 w-fit"
            >
              Learn how to set it up
            </Link>
          </div>
        </section>

        <section>
          <div className="flex flex-col justify-between h-full">
            <div>
              <h2 className="mb-6 text-2xl font-bold text-dark">
                Contact Details:
              </h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between w-fit gap-4">
                    <p className="text-base text-dark font-bold">
                      Contact email:
                    </p>
                    {editingField !== 'email' && (
                      <Button
                        variant={'link'}
                        onClick={() => handleEdit('email')}
                        className="text-secondary hover:text-secondary/60 p-0 h-fit"
                      >
                        <Pencil className="h-5 w-5" />
                        <span className="sr-only">Edit email</span>
                      </Button>
                    )}
                  </div>
                  {editingField === 'email' ? (
                    <div className="flex items-center gap-2.5">
                      <Input
                        type="email"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="w-full border-primary border px-3 py-2"
                      />
                      <Button
                        variant={'link'}
                        onClick={handleSave}
                        className="text-green-500 hover:text-green-600 hover:no-underline p-0 h-fit"
                        disabled={!tempValue}
                      >
                        <Check className="h-5 w-5" />
                      </Button>
                      <Button
                        variant={'link'}
                        onClick={handleCancel}
                        className="text-red-500 hover:text-red-600 hover:no-underline p-0 h-fit"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  ) : (
                    <p className="text-dark/80">{contactDetails.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between w-fit gap-4">
                    <p className="text-base text-dark font-bold">
                      Contact phone number:
                    </p>
                    {editingField !== 'phone' && (
                      <Button
                        variant={'link'}
                        onClick={() => handleEdit('phone')}
                        className="text-secondary hover:text-secondary/60 hover:no-underline p-0 h-fit"
                      >
                        <Pencil className="h-5 w-5" />
                        <span className="sr-only">Edit phone number</span>
                      </Button>
                    )}
                  </div>
                  {editingField === 'phone' ? (
                    <div className="flex items-center gap-2.5">
                      <Input
                        type="tel"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="w-full border-primary border px-3 py-2"
                      />
                      <Button
                        variant={'link'}
                        onClick={handleSave}
                        className="text-green-500 hover:text-green-600 hover:no-underline"
                        disabled={!tempValue}
                      >
                        <Check className="h-5 w-5" />
                      </Button>
                      <Button
                        variant={'link'}
                        onClick={handleCancel}
                        className="text-red-500 hover:text-red-600 hover:no-underline p-0 h-fit"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  ) : (
                    <p className="text-dark/80">{contactDetails.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Go to Billing Button */}
            <div className="mt-6 lg:mt-0 flex justify-end">
              <Button
                variant={'default'}
                type="button"
                className="bg-dark w-full lg:w-[200px] hover:bg-dark/90 text-white text-lg"
                asChild
              >
                <Link href="/dashboard/billing" className="no-underline">
                  Go to Billing
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
