import AddressForm from '@/components/sections/Forms/AddressForm'
import { Settings } from '@/sanity.types'
import { sanityClient } from '@/utils/sanity/lib/client'
import Image from 'next/image'

export default async function ScanAddressPage({
  searchParams
}: {
  searchParams: Promise<{ name: string }>
}) {
  const name = (await searchParams).name

  const settings = ((await sanityClient.fetch(`*[_type == "settings"][0]`)) ??
    {}) as Settings
  const { consent } = settings

  return (
    <section className="bg-lp-hero-section-bg bg-cover bg-bottom py-6 lg:py-28">
      <div className="container max-w-sm lg:max-w-7xl px-4 lg:px-16">
        <div className="flex-col flex justify-between items-center lg:flex-row gap-10 lg:gap-4">
          <div className="max-w-fit lg:max-w-xl">
            <AddressForm name={name} consent={consent} />
          </div>

          <div className="relative">
            <Image
              src={'/hero-image.png'}
              width={634}
              height={530}
              alt={'Take a Look'}
              className="hidden lg:block"
            />
            <Image
              src={'/hero-image-mb.png'}
              width={398}
              height={370}
              alt={'Take a Look'}
              className="lg:hidden"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
