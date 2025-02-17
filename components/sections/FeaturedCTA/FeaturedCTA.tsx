import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface SectionProps {
  image: string
  title: string
  buttons: {
    name: string
    link: string
  }[]
}

export default function FeaturedCTA({ image, title, buttons }: SectionProps) {
  return (
    <div className="text-center flex items-center flex-col lg:flex-row gap-8">
      <div className="order-2 lg:order-1 w-full lg:w-5/12 flex-shrink-0">
        <Image src={image} width={500} height={500} alt={title} />
      </div>

      <div className="order-1 lg:order-2 px-2">
        <h2 className="text-3xl lg:text-5xl font-bold lg:text-left text-dark text-center">
          {title}
        </h2>

        <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2 lg:gap-6 mt-4 lg:mt-10">
          {buttons.map((button, index) => (
            <Button
              key={index}
              variant={index === 0 ? 'secondary' : 'outline'}
              asChild
            >
              <Link href={button.link} className="no-underline">
                <span>{button.name}</span>
                {index === 0 && <ArrowRightIcon className="ml-2" />}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
