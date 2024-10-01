import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartBarBig, IdCard, MessageCircleQuestion } from 'lucide-react'

export default function Steps() {
  const cards = [
    {
      icon: <IdCard className="mx-auto text-white w-auto h-10" />,
      title: 'Data Removal',
      description:
        'We help you remove your personal information from various websites, safeguarding your privacy.'
    },
    {
      icon: <ChartBarBig className="mx-auto text-white w-auto h-10" />,
      title: 'Regular Monitoring',
      description:
        'Our regular monitoring ensures that your private information doesn`t reappear on the internet.'
    },
    {
      icon: (
        <MessageCircleQuestion className="mx-auto text-white w-auto h-10" />
      ),
      title: 'Customer Support',
      description:
        'Get access to our dedicated customer support team who are ready to assist you 24/7.'
    }
  ]

  return (
    <>
      <h2 className="text-4xl font-bold text-center">Features</h2>
      <p className="mt-4 text-xl text-center">
        Discover how our service can help safeguard your privacy.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-16 w-16 bg-primary rounded-full">
                    {card.icon}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-2xl font-semibold text-center">
                {card.title}
              </h3>
              <p className="mt-4 text-center">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
