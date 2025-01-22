import { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { getURL } from '@/utils/helpers'
import { Figtree } from 'next/font/google'
import 'styles/main.css'

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

const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree'
})

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={`${figtree.variable}`}>
      <body className="bg-white">{children}</body>
    </html>
  )
}
