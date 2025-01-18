import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

export default function Steps() {
  const cards = [
    {
      icon: '/lp-features-1.png',
      title: 'Data Removal',
      description:
        'We help you remove your personal information from various websites, safeguarding your privacy.'
    },
    {
      icon: '/lp-features-2.png',
      title: 'Regular Monitoring',
      description:
        'Our regular monitoring ensures that your private information doesn`t reappear on the internet.'
    },
    {
      icon: '/lp-features-3.png',
      title: 'Customer Support',
      description:
        'Get access to our dedicated customer support team who are ready to assist you 24/7.'
    }
  ]

  return (
    <>
      <div className="text-center max-w-[706px] mx-auto">
        <h2 className="text-4xl lg:text-[45px] lg:leading-[55px] font-bold text-center text-dark">
          Prying eyes are eager to access your information
        </h2>
        <p className="mt-4 text-base text-dark lg:text-lg text-center opacity-60">
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
            <CardContent className="p-0">
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
