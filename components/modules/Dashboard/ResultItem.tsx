import { cn } from '@/utils/cn'
import React from 'react'

export default function ResultItem({
  isLast,
  item
}: {
  item: any
  isLast: boolean
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1 border-b-[1.8px] border-darkMain/10 mb-[15px] pb-[15px] social-platform-result',
        isLast ? 'border-none' : ''
      )}
    >
      <a
        href={item.url}
        className="font-normal text-darkMain text-base leading-[18px] no-underline"
      >
        {item.url}
      </a>
      <b className="text-base font-bold leading-[18px]">{item.name}</b>
      <a
        href={item.subUrl}
        className="font-normal text-darkMain text-base leading-[18px] no-underline"
      >
        {item.subUrl}
      </a>
      <p className="text-base mt-6">{item.date}</p>
    </div>
  )
}
