import { Metadata } from 'next'
import Footer from '@/components/modules/Footer'
import Navbar from '@/components/modules/Navbar'
import { Toaster } from '@/components/ui/toaster'
import { PropsWithChildren, Suspense } from 'react'
import { getURL } from '@/utils/helpers'
import { createClient } from '@/utils/supabase/server'
import { getUser } from '@/utils/supabase/queries'
import 'styles/main.css'
import { redirect } from 'next/navigation'

const title = 'Pup Erase'
const description = 'Removal of unwanted data from the internet'

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description
  }
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const supabase = createClient()
  const user = await getUser(supabase)

  if (user) {
    return redirect('/dashboard/reports')
  }

  return (
    <>
      <Navbar user={user} />

      <main id="skip" className="min-h-[calc(100dvh-40rem)]">
        {children}
      </main>

      {!user && <Footer />}

      <Suspense>
        <Toaster />
      </Suspense>
    </>
  )
}
