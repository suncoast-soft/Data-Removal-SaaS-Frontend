import Image from 'next/image'

export default async function Success({
  searchParams
}: {
  searchParams: Promise<{ status_description: string }>
}) {
  const description = (await searchParams).status_description

  return (
    <div className="bg-lp-hero-section-bg bg-cover bg-bottom py-10 lg:py-24">
      <div className="container mx-auto px-4 lg:px-24">
        <div className="flex items-center flex-col lg:flex-row justify-between gap-8 lg:gap-16">
          <div className="rounded-3xl bg-dark p-4 py-6 lg:pb-10 lg:p-10 lg:w-1/2 flex-shrink-0">
            <h1 className="font-bold text-3xl lg:text-5xl leading-tight text-white mb-4">
              Success
            </h1>

            <p className="text-white text-2xl">{description}</p>
          </div>

          <div>
            <Image
              src={'/phone-otp-verified-image.png'}
              width={652}
              height={558}
              alt="Singup"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
