import { createClient } from '@/utils/supabase/server'
import { getUser } from '@/utils/supabase/queries'
import SectionHeader from '@/components/modules/SectionHeader'
import ContactForm from '@/components/sections/Forms/ContactForm'

export default async function DashboardContact() {
  const supabase = await createClient()
  const user = await getUser(supabase)

  return (
    <div className="relative">
      <SectionHeader title="Contact Us" />
      
      <div className="my-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Have a question or need assistance?
          </h2>
          <p className="text-gray-600 mt-2">
            Our team is here to help. Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <ContactForm user={user} theme="dark" />
        </div>
      </div>
    </div>
  )
} 