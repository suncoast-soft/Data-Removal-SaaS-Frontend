import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartBarBig, IdCard, ListChecks, Shapes } from 'lucide-react'

export default function Steps() {
  const cards = [
    {
      icon: <IdCard className="mx-auto text-white w-auto h-10" />,
      title: 'Step 1: Sign Up',
      description:
        'Create a free account by providing your basic information. It`s quick and easy!'
    },
    {
      icon: <ChartBarBig className="mx-auto text-white w-auto h-10" />,
      title: 'Step 2: Free Analysis',
      description:
        'Get a free analysis of your personal data across various data brokers.'
    },
    {
      icon: <ListChecks className="mx-auto text-white w-auto h-10" />,
      title: 'Step 3: Select Brokers',
      description:
        'Choose the data brokers you want to remove your personal data from.'
    },
    {
      icon: <Shapes className="mx-auto text-white w-auto h-10" />,
      title: 'Step 4: Pay As You Go',
      description:
        'Pay based on the number of brokers you selected, and our team will handle the rest.'
    }
  ]

  return (
    <>
      <h2 className="text-4xl font-bold text-center">How It Works</h2>
      <p className="mt-4 text-xl text-center">
        Follow these simple steps to start protecting your privacy.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center mb-6 h-16 w-16 bg-primary rounded-full">
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
