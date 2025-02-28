import Footer from '@/components/modules/Footer'
import Navbar from '@/components/modules/Navbar'
import { Toaster } from '@/components/ui/toaster'
import { PropsWithChildren, Suspense } from 'react'
import { createClient } from '@/utils/supabase/server'
import { getUser } from '@/utils/supabase/queries'
import 'styles/main.css'
import { redirect } from 'next/navigation'
import { sanityClient } from '@/utils/sanity/lib/client'
import { Settings } from '@/sanity.types'
import { urlFor } from '@/utils/sanity/lib/image'

export default async function RootLayout({ children }: PropsWithChildren) {
  const supabase = await createClient()
  const user = await getUser(supabase)

  if (user && !user.is_anonymous) {
    return redirect('/dashboard/account')
  }

  const settings = await sanityClient.fetch(`*[_type == "settings"][0]`)

  const {
    name,
    description,
    logo_dark,
    logo_white,
    navLinks,
    footerLinks,
    socialLinks
  } = settings as Settings

  return (
    <>
      <Navbar
        name={name}
        logo={logo_white ? urlFor(logo_white).width(200).url() : undefined}
        navLinks={navLinks}
        user={user}
      />

      <main id="skip">{children}</main>

      <Footer
        name={name}
        description={description}
        logo={logo_dark ? urlFor(logo_dark).width(200).url() : undefined}
        footerLinks={footerLinks}
        socialLinks={socialLinks}
      />
      <Suspense>
        <Toaster />
      </Suspense>
    </>
  )
}
