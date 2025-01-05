import Image from 'next/image'
import React from 'react'

export default function BrokersTabContent({ data }: any) {
  return (
    <div className="border border-darkMain/10 bg-[#342E3705] rounded-[20px] pb-[26px] lg:pb-[15px] py-[15px] flex flex-wrap gap-6">
      <div className="min-w-[50%]">
        {data?.map((item: any, i: number) => (
          <>
            <div className="px-[30px] flex flex-col gap-2">
              <div className="flex flex-wrap gap-2 justify-between">
                <a
                  href={item.url}
                  className="font-bold text-greenMain text-base leading-[18px] border-b-2 border-greenMain no-underline w-fit"
                >
                  {item.url}
                </a>
              </div>
              {item.phone ? (
                <div className="flex flex-wrap gap-2 lg:gap-14">
                  {item.name && <b className="text-base">{item.name}</b>}
                  <p className="text-base">{item.phone}</p>
                </div>
              ) : (
                <b className="text-base">{item.name}</b>
              )}
              {item.data?.map((d: any) => <p className="text-base">{d}</p>)}

              <a
                href="#"
                className="text-base font-medium no-underline border-b leading-[18px] w-fit border-darkMain"
              >
                Not my info
              </a>
            </div>
            <br className="border-[1.4px] border-darkMain/10 my-[15px]" />
          </>
        ))}
      </div>
      <div className="max-w-[421px] flex flex-col gap-4 items-center lg:mt-11">
        <h1 className="text-[24px] lg:text-[32px] leading-[35px] font-bold text-center ">
          Start removing your digital footprint with pup premium
        </h1>
        <p className="text-[22px] leading-[26px] text-center">
          Create an account to access your full report (free to view, forever){' '}
        </p>

        <Image
          src={'/results-image-2.png'}
          width={191}
          height={155}
          alt={`Vector`}
        />
      </div>
    </div>
  )
}
