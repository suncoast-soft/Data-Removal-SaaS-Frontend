import Image from 'next/image'
import React from 'react'

export default function HelpBanner() {
  return (
    <div className="flex gap-6 flex-col items-end">
      <a
        href="#"
        className="no-underline leading-[18px] border-b border-dark text-[20px] font-bold"
      >
        Some of these aren’t my results
      </a>
      <Image
        src={'/help-banner-image.png'}
        width={289}
        height={110}
        alt="Help"
      />
    </div>
  )
}
