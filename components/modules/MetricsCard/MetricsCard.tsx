import { cn } from '@/utils/cn'
import { ReactNode } from 'react'

interface CardProps {
  icon: ReactNode
  count: string
  text: string
  color: string
}

interface ModuleProps {
  card: CardProps
}

export default function MetricsCard({ card }: ModuleProps) {
  return (
    <div
      className={cn(
        'px-4 py-2 h-24 flex items-center justify-start border border-dark/40 text-center rounded-2xl gap-4',
        card.color
      )}
    >
      {card.icon}
      <div className="text-left">
        <strong className="text-2xl">{card.count}</strong>
        <span className="ml-1 font-light">{card.text}</span>
      </div>
    </div>
  )
}
