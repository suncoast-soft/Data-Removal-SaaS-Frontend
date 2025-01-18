import Image from 'next/image'

interface GenReportLoaderProps {
  searchTerm: string
}

export default function GenReportLoader({ searchTerm }: GenReportLoaderProps) {
  return (
    <div className="bg-lp-hero-section-bg bg-cover bg-bottom fixed inset-0 z-[9999] text-dark h-screen">
      <div className="container mx-auto px-4 lg:px-28 h-full flex items-center justify-center">
        <div className="text-center max-w-lg flex flex-col items-center gap-6">
          <Image
            src="/loaders/hero-image.png"
            width={309}
            height={358}
            alt="Report Loader"
            className="order-2 lg:order-1"
          />
          <div className="order-1 lg:order-2">
            <h1 className="text-2xl lg:text-5xl font-bold">
              Generating your report
            </h1>
            <p className="mt-4 text-lg lg:text-xl opacity-60">
              This will only take a second
            </p>
            <p className="mt-4 text-lg lg:text-xl font-semibold">
              Searching: ...{searchTerm}...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
