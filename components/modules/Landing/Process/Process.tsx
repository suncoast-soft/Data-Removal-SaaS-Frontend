import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

export default function Process() {
  const cards = [
    {
      icon: '/lp-process-1.png',
      title: 'Create an account',
      description:
        'Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalar consectur elementum tempus hac.'
    },
    {
      icon: '/lp-process-2.png',
      title: 'Run a quick search',
      description:
        'Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalar consectur elementum tempus hac.'
    },
    {
      icon: '/lp-process-3.png',
      title: 'We remove your info',
      description:
        'Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalar consectur elementum tempus hac.'
    }
  ]

  return (
    <>
      <div className="text-center max-w-[706px] mx-auto">
        <h6 className="text-orangeMain text-xl tracking-widest uppercase">
          Our process
        </h6>
        <h2 className="text-4xl lg:text-[45px] lg:leading-[55px] font-bold text-center text-darkMain">
          Get started as easy as 1, 2, 3
        </h2>
        <p className="text-base mt-4 text-darkMain lg:text-lg text-center opacity-60">
          Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu
          egestas morbi sem vulputate etiam facilisis pellentesque ut quis.
        </p>
      </div>

      <div className="mt-6 gap-6 lg:mt-10 lg:gap-10 flex items-center flex-col lg:flex-row">
        {cards.map((card, index) => (
          <Card
            key={index}
            className="bg-transparent shadow-none border-none p-0 max-w-[364px]"
          >
            <CardHeader className="p-0">
              <CardTitle>
                <div className="flex flex-col items-center">
                  <Image
                    src={card.icon}
                    width={200}
                    height={200}
                    alt={`Feature ${index + 1}`}
                  />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-darkMain">
              <h3 className="text-[28px] leading-[38px] font-bold text-center mt-2 lg:mt-4">
                {card.title}
              </h3>
              <p className="mt-4 text-center text-lg opacity-60">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
