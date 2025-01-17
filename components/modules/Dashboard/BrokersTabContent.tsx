import Image from 'next/image'
import React from 'react'

interface BrokerData {
  url: string
  phone?: string
  name?: string
  data?: string[]
}

interface BrokersTabContentProps {
  data: BrokerData[]
}

export default function BrokersTabContent({ data }: BrokersTabContentProps) {
  return (
    <div className="border border-darkMain/10 bg-darkMain/5 rounded-2xl py-4 lg:py-6 flex flex-wrap gap-6">
      <div className="w-full lg:w-1/2">
        {data?.map((item, i) => (
          <article key={i} className="px-6 flex flex-col gap-4">
            {/* URL Link */}
            <div className="flex flex-wrap gap-2 justify-between">
              <a
                href={item.url}
                className="font-bold text-greenMain text-sm lg:text-base border-b-2 border-greenMain no-underline w-fit"
              >
                {item.url}
              </a>
            </div>

            {/* Name and Phone */}
            {item.phone ? (
              <div className="flex flex-wrap gap-2 lg:gap-8">
                {item.name && (
                  <b className="text-sm lg:text-base">{item.name}</b>
                )}
                <p className="text-sm lg:text-base">{item.phone}</p>
              </div>
            ) : (
              item.name && <b className="text-sm lg:text-base">{item.name}</b>
            )}

            {/* Additional Data */}
            {item.data?.map((d, index) => (
              <p key={index} className="text-sm lg:text-base">
                {d}
              </p>
            ))}

            {/* Not My Info Link */}
            <a
              href="#"
              className="text-sm lg:text-base font-medium no-underline border-b border-darkMain w-fit"
            >
              Not my info
            </a>

            {/* Divider */}
            {i < data.length - 1 && <hr className="border-darkMain/10 my-4" />}
          </article>
        ))}
      </div>

      {/* Right-Side Content */}
      <div className="w-full lg:max-w-md flex flex-col gap-4 items-center lg:mt-8 text-center">
        <h1 className="text-xl lg:text-2xl font-bold leading-snug">
          Start removing your digital footprint with Pup Premium
        </h1>
        <p className="text-base lg:text-lg">
          Create an account to access your full report (free to view, forever)
        </p>
        <Image
          src="/results-image-2.png"
          width={191}
          height={155}
          alt="Results Illustration"
        />
      </div>
    </div>
  )
}
