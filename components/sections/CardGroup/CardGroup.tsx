import { CalendarRangeIcon, ChevronRightIcon, Clock5Icon } from 'lucide-react'
import Link from 'next/link'

interface Card {
  category: string
  title: string
  date: string
  read: string
  image: string
  link: string
}

interface SectionProps {
  title: string
  cards: Card[]
  link: string
}

const Card = ({ card }: { card: Card }) => (
  <div className="border rounded-2xl p-4">
    <div className="w-full h-28 bg-gray rounded-xl"></div>

    <h4 className="font-bold my-4 text-base">{card.title}</h4>
    <div className="flex justify-between">
      <div className="flex gap-1 items-center text-xs font-normal">
        <Clock5Icon className="w-3 text-primary" />
        <span>{card.date}</span>
      </div>
      <div className="flex gap-1 items-center text-xs font-normal">
        <CalendarRangeIcon className="w-3 text-primary" />
        <span>{card.read}</span>
      </div>
    </div>
  </div>
)

export default function CardGroup({ title, cards, link }: SectionProps) {
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <span className="px-3 py-2 bg-primary text-center rounded-full text-xs font-semibold text-dark">
          {title}
        </span>

        <Link
          href={link}
          className="flex items-center gap-1 text-sm font-medium group"
        >
          <span className="group-hover:border-b">View all</span>
          <ChevronRightIcon className="h-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </div>
  )
}
