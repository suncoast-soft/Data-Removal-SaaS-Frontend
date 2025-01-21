import { cn } from '@/utils/cn'
import React from 'react'

interface ResultItemProps {
  item: {
    url: string
    name: string
    subUrl?: string
    date: string
  }
  isLast: boolean
}

export default function ResultItem({ isLast, item }: ResultItemProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 pb-4 mb-4 border-b border-dark/10',
        isLast && 'border-none'
      )}
    >
      <a
        href={item.url}
        className="text-base font-normal text-dark no-underline hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.url}
      </a>

      <b className="text-base font-bold">{item.name}</b>

      {item.subUrl && (
        <a
          href={item.subUrl}
          className="text-base font-normal text-dark no-underline hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.subUrl}
        </a>
      )}

      <p className="text-base mt-4 text-slate-600">{item.date}</p>
    </div>
  )
}
