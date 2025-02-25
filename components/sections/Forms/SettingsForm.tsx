'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { handleRequest } from '@/utils/auth-helpers/client'
import { useRouter } from 'next/navigation'
import { Tables } from '@/types_db'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { updateUserSettingsAction } from '@/utils/supabase/server'
import FormToggle from '@/components/modules/FormToggle'
import FormInput from '@/components/modules/FormInput'
import { MailIcon, PhoneCallIcon } from 'lucide-react'
import { User } from '@supabase/supabase-js'

type Setting = Tables<'users'>

const FormSchema = z.object({
  email: z.string(),
  phone: z.string().optional(),
  status_update_method: z.string(),
  receive_marketing_emails: z.string(),
  allow_multi_device_login: z.string(),
  enable_mfa: z.string()
})

interface SectionProps {
  user: User
  profile?: Tables<'profiles'>
  settings: Setting
}

export default function SettingsForm({
  user,
  profile,
  settings
}: SectionProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: settings.email ?? profile?.email ?? user.email ?? '',
      phone: settings.phone ?? profile?.phone ?? user.phone ?? '',
      status_update_method: settings.status_update_method ?? 'email',
      receive_marketing_emails: settings.receive_marketing_emails
        ? 'yes'
        : 'no',
      allow_multi_device_login: settings.allow_multi_device_login
        ? 'yes'
        : 'no',
      enable_mfa: settings.enable_mfa ? 'yes' : 'no'
    }
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const transformedData = {
      ...data,
      receive_marketing_emails: data.receive_marketing_emails === 'yes',
      allow_multi_device_login: data.allow_multi_device_login === 'yes',
      enable_mfa: data.enable_mfa === 'yes'
    }
    await handleRequest(transformedData, updateUserSettingsAction, router)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-8 lg:grid-cols-2 border border-dark/20 bg-gray/5 rounded-2xl">
          <div className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-dark">Preferences:</h2>

            <FormToggle
              control={form.control}
              name="status_update_method"
              label="Receive status updates"
              options={[
                { label: 'Email', value: 'email' },
                { label: 'Phone', value: 'phone' }
              ]}
              theme="dark"
            />

            <FormToggle
              control={form.control}
              name="receive_marketing_emails"
              label="Receive marketing emails?"
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No thanks', value: 'no' }
              ]}
              theme="dark"
            />

            <FormToggle
              control={form.control}
              name="allow_multi_device_login"
              label="Allow multi-device log-in?"
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No thanks', value: 'no' }
              ]}
              theme="dark"
            />

            <FormToggle
              control={form.control}
              name="enable_mfa"
              label="Require Multi-Factor Verification?"
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No thanks', value: 'no' }
              ]}
              theme="dark"
            />
          </div>

          <div className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-dark">Contact Details:</h2>

            <FormInput
              control={form.control}
              type="email"
              name="email"
              label="Contact email"
              placeholder="example@gmail.com"
              icon={<MailIcon className="w-5 text-primary" />}
              required={true}
              theme="dark"
            />

            <FormInput
              control={form.control}
              name="phone"
              label="Contact phone Number"
              placeholder="(123) 456 7890"
              icon={<PhoneCallIcon className="w-5 text-primary" />}
              required={true}
              theme="dark"
            />

            <div className="flex flex-row justify-end gap-4 py-8">
              <Button type="submit" size="small" className="font-bold">
                Update settings
              </Button>
              <Button
                type="submit"
                size="small"
                className="bg-dark hover:bg-gray text-white font-bold"
                asChild
              >
                <Link href="/dashboard/billing">Go to billing</Link>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}
