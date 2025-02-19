import Head from 'next/head'
import { PropsWithChildren } from 'react'
import { Figtree } from 'next/font/google'
import 'styles/main.css'
import { Settings } from '@/sanity.types'
import { sanityClient } from '@/utils/sanity/lib/client'

const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree'
})

export default async function RootLayout({ children }: PropsWithChildren) {
  const settings = await sanityClient.fetch(`*[_type == "settings"][0]`)
  const { name, description } = settings as Settings

  return (
    <html lang="en" className={`${figtree.variable}`}>
      <Head>
        <title>{name}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={description} />
      </Head>

      <body className="bg-white">{children}</body>
    </html>
  )
}
