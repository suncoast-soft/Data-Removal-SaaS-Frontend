import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Contact } from 'lucide-react'

export default function Testimonials() {
  const cards = [
    {
      image: <Contact className="mx-auto text-slate-900 w-auto h-10" />,
      name: 'Sarah F.',
      text: 'The free analysis was eye-opening, and the process was seamless. I feel much safer now!',
      role: 'Marketing Manager'
    },
    {
      image: <Contact className="mx-auto text-slate-900 w-auto h-10" />,
      name: 'David K.',
      text: 'Choosing and paying only for the brokers I wanted made it very affordable.',
      role: 'Software Engineer'
    },
    {
      image: <Contact className="mx-auto text-slate-900 w-auto h-10" />,
      name: 'Michelle T.',
      text: 'The pay-as-you-go model is perfect. Great customer support and effective results!',
      role: 'HR Specialist'
    }
  ]

  return (
    <>
      <h2 className="text-4xl font-bold text-center">What Our Users Say</h2>
      <p className="mt-4 text-xl text-center">
        See how our service has helped others protect their personal data.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {cards.map((card, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{card.image}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg italic text-center">"{card.text}"</p>
              <p className="mt-3 text-base font-bold text-center">
                - {card.name}
              </p>
              <p className="text-sm text-slate-600 text-center">{card.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
